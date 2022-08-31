import { Box, Center, Spinner } from '@chakra-ui/react'
import React from 'react'
import { Task } from '../task'

const Tasks = ({tasks, details, taskStatus, setActiveScreen, setSelectedTask}) => {
  return (
    <Box>
        {
            taskStatus === 'IDLE' ||
            taskStatus === 'PENDING' ?
                <Center width={'100%'}>
                    <Spinner mx={'auto'} />
                </Center> :
            taskStatus === 'RESOLVED' &&
            !!tasks?.length &&
            tasks?.map( (task, index) => (
                <Task
                    key={index}
                    avatar={details?.icon}
                    date={task?.task_date?.replaceAll('-', '/')}
                    description={task?.task_msg}
                    id={task?.id}
                    setActiveScreen={setActiveScreen}
                    onEdit={() => setSelectedTask(task)}
                />
            ))
        }
    </Box>
  )
}

export {Tasks}