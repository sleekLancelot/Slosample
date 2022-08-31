import { Box, HStack, IconButton, Text } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllTasks } from '../../actions';

import { Body, PrivateRoute, SidebarWithHeader, Task } from '../../components'
import { getTasks } from '../../redux/slices/userSlice';
import { Mode } from '../../utils/contants';
import { useScreenMode } from '../../hooks';

const Home = () => {
    const { details, tasks, taskStatus, isAuthenticated } = useSelector((store) => store.user);
    const dispatch = useDispatch()

    const {
      activeScreen,
      setActiveScreen,
    } = useScreenMode()

    const fetchTasks = useCallback(() => {
      if ( isAuthenticated === true && details !== null ) {
        dispatch( getTasks() )
      }
    },[])

    useEffect(() => {
      fetchTasks()
    },[isAuthenticated, details])
  return (
    <PrivateRoute>
      <SidebarWithHeader>
        <Box marginTop={30}>
          <Box 
            width={[300, 350]}
            border={'1px solid #F2F2F2'}
            borderRadius={8}
          >
            <HStack
              backgroundColor={'#F9F9FA'}
              justifyContent={'space-between'}
              width={'100%'}
              height={50}
              border={'1px solid #F2F2F2'}
              borderTopLeftRadius={8}
              borderTopRightRadius={8}
              px={2}
            >
              <Text>Task {tasks?.length}</Text>
              <IconButton
                aria-label='Add a task'
                colorScheme={'#F9F9FA'}
                color={'black'}
                borderLeft={'1px solid #F2F2F2'}
                height={'100%'}
                icon={<AddIcon />}
                onClick={() => {
                  setActiveScreen(Mode.CreateTask)
                }}
              />
            </HStack>

            <Body
              activeScreen={activeScreen}
              setActiveScreen={setActiveScreen}
              tasks={tasks}
              taskStatus={taskStatus}
              details={details}
            />
          </Box>
        </Box>
      </SidebarWithHeader>
    </PrivateRoute>
  )
}

export default Home