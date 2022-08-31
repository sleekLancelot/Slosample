import { Avatar, Box, ButtonGroup, HStack, IconButton, Text, VStack } from '@chakra-ui/react'
import {BellIcon, CheckIcon} from '@chakra-ui/icons'
import {GrFormEdit} from 'react-icons/gr'
import React from 'react'
import { useScreenMode } from '../../hooks'
import { Mode } from '../../utils/contants'

const Task = ({
    avatar,
    date,
    description,
    id,
    setActiveScreen,
    onEdit,
}) => {
  return (
    <Box
        py={1}
        borderBottom={'1px solid #E9E9E9'}
        paddingX={2}
        backgroundColor={'EAEAEA'}
    >
        <HStack
            alignItems={'center'}
            justifyContent={'space-between'}
        >
            <Box>
                <HStack>
                    <Avatar
                        size={'sm'}
                        borderRadius='none'
                        src={avatar}
                    />
                    <VStack alignItems={'flex-start'}>
                        <Text fontSize={14}>{description}</Text>
                        <Text fontSize={14} color='red.500'>{date}</Text>
                    </VStack>
                </HStack>
            </Box>

            <Box>
                <HStack>
                    <IconButton
                        aria-label='Add a task'
                        colorScheme={'#F9F9FA'}
                        color={'black'}
                        border={'1px solid #E9E9E9'}
                        // height={'100%'}
                        icon={<GrFormEdit />}
                        onClick={() => {
                            onEdit()
                            setActiveScreen(Mode.EditTask)
                        }}
                    />
                    <ButtonGroup spacing={0}>
                        <IconButton
                            aria-label='Add a task'
                            colorScheme={'#F9F9FA'}
                            color={'black'}
                            border={'1px solid #E9E9E9'}
                            borderRightRadius={'none'}
                            icon={<BellIcon />}
                            onClick={() => { }}
                        />
                        <IconButton
                            aria-label='Add a task'
                            colorScheme={'#F9F9FA'}
                            color={'black'}
                            border={'1px solid #E9E9E9'}
                            borderLeftRadius={'none'}
                            icon={<CheckIcon />}
                            onClick={() => { }}
                        />
                    </ButtonGroup>
                </HStack>
            </Box>
        </HStack>
    </Box>
  )
}

export {Task}