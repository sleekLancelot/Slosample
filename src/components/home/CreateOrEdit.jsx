import { Box, Button, ButtonGroup, FormControl, FormLabel, HStack, IconButton, Input, Stack, Text, VStack } from '@chakra-ui/react'
import { DeleteIcon } from '@chakra-ui/icons'
import React, { useState } from 'react'
import { createTask, deleteTask, editTask } from '../../actions';
import { Mode } from '../../utils/contants';
import { convertHourAndMinutesIntoSec, convertTimeToSeconds, getCurrentTimeInSeconds } from '../../utils';
import { useDispatch } from 'react-redux';
import { getTasks } from '../../redux/slices/userSlice';

const CreateOrEdit = ({
    selectedTask,
    setSelectedTask,
    activeScreen,
    setActiveScreen,
    details,
    isEditing = false,
}) => {
    const [loading, setLoading] = useState(false);

    const [fields, setFields] = useState({
        description: selectedTask?.task_msg ?? '',
        date: selectedTask?.task_date ?? '',
        time: convertHourAndMinutesIntoSec(selectedTask?.task_time) ?? '',
        assignedUser: details?.user_id ?? '',
    })
    const [error, setError] = useState("");

    const dispatch = useDispatch()


    const onChange = (e) => {
        if (error) {
            setError('')
        }
        setFields(() => ({ ...fields, [e.target.id]: e.target.value }))
    }

    const create = async () => {
        setError('')
        setLoading(true)
        try {
            const resp = await createTask( details?.company_id, {
                assigned_user: fields.assignedUser,
                task_date: fields.date,
                task_time: convertTimeToSeconds(fields.time),
                is_completed: 0,
                time_zone: getCurrentTimeInSeconds(),
                task_msg: fields.description,
            })

            setLoading(false)

            if (resp.data?.status === 'success' ) {
                dispatch( getTasks() )
                setActiveScreen(Mode.ShowTasks)
            } else if (resp?.error) {
                setError(resp?.error)
            }
        } catch (err) {
            setLoading(false)
            setError(err)
        }
    }

    const edit = async (task_id) => {
        setError('')
        setLoading(true)
        try {
            const resp = await editTask( task_id, details?.company_id, {
                assigned_user: fields.assignedUser,
                task_date: fields.date,
                task_time: convertTimeToSeconds(fields.time),
                is_completed: 0,
                time_zone: getCurrentTimeInSeconds(),
                task_msg: fields.description,
            })

            setLoading(false)

            if (resp.data?.status === 'success' ) {
                dispatch( getTasks() )
                setActiveScreen(Mode.ShowTasks)
            } else if (resp?.error ?? resp?.data?.status === 'error') {
                setError(resp?.data?.message)
            }
        } catch (err) {
            setLoading(false)
            setError(err)
        }
    }

    const _delete = async () => {
        try {
            const resp = await deleteTask(selectedTask?.id, details?.company_id )

            if (resp.data?.status === 'success' ) {
                dispatch( getTasks() )
                setActiveScreen(Mode.ShowTasks)
            } else if (resp?.error ?? resp?.data?.status === 'error') {
                setError(resp?.data?.message)
            }
        } catch (err) {
            setError(err)
        }
    }

    const input_bg= 'white'
  return (
    <Box backgroundColor={'#EDF7FC'} p={2}>
        {
            error &&
            <Text 
                color={'red.500'}
                fontStyle='italic'
                textAlign={'center'}
                textTransform='capitalize'
                my={3}
            >{error}</Text>
        }
        <VStack spacing={1}>
            <FormControl id="description">
              <FormLabel>Task Description</FormLabel>
                <Input
                    backgroundColor={input_bg}
                    type="text"
                    name='description'
                    value={fields.description}
                    onChange={onChange}
                />
            </FormControl>

            <HStack justify={'space-between'}>
                <FormControl id="date">
                    <FormLabel>Date</FormLabel>
                        <Input
                            backgroundColor={input_bg}
                            type="date"
                            name='date'
                            value={fields.date}
                            onChange={onChange}
                        />
                </FormControl>
                <FormControl id="time">
                    <FormLabel>Time</FormLabel>
                        <Input
                            backgroundColor={input_bg}
                            type="time"
                            name='description'
                            value={fields.time}
                            onChange={onChange}
                        />
                </FormControl>
            </HStack>

            <FormControl id="assignedUser">
                <FormLabel>Assigned User</FormLabel>
                    <Input
                        backgroundColor={input_bg}
                        type="text"
                        name='assignedUser'
                        value={fields.assignedUser}
                        disabled={!!fields?.assignedUser}
                        onChange={onChange}
                    />
            </FormControl>
        </VStack>

        <Stack direction='row' spacing={4} align='center' justifyContent={'space-between'} marginY={4}>
            {
                isEditing &&
                <IconButton
                    aria-label='Add a task'
                    colorScheme={'#F9F9FA'}
                    color={'blackAlpha.700'}
                    icon={<DeleteIcon />}
                    onClick={_delete}
                />
            }

            <HStack width={'100%'} justifyContent={'flex-end'}>
                <Button
                    colorScheme='teal'
                    variant='ghost'
                    onClick={() => {
                        setActiveScreen(Mode.ShowTasks)
                    }}
                >Cancel</Button>
                <Button
                    colorScheme='teal'
                    background='#47BB7F'
                    color={'white'}
                    variant='solid'
                    borderRadius={3}
                    isLoading={loading}
                    onClick={() => {
                        switch (activeScreen) {
                            case Mode.CreateTask:
                                return create()

                            case Mode.EditTask:
                                return edit(selectedTask.id)
                        
                            default:
                                return () => {};
                        }
                    }}
                >Save</Button>
            </HStack>
        </Stack>
    </Box>
  )
}

export {CreateOrEdit}