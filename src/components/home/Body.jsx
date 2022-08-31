import React, { useState } from 'react'
import { Tasks } from './Tasks'
import { Mode } from '../../utils/contants'
import { CreateOrEdit } from './CreateOrEdit'

const Body = ({
    activeScreen,
    setActiveScreen,
    tasks,
    taskStatus,
    details,
}) => {
    const [ selectedTask, setSelectedTask ] = useState(null)

  switch (activeScreen) {
    case Mode.CreateTask:
        return <CreateOrEdit
                    activeScreen={activeScreen}
                    setActiveScreen={setActiveScreen}
                    details={details}
                />

    case Mode.EditTask:
        return <CreateOrEdit
                    selectedTask={selectedTask}
                    setSelectedTask={setSelectedTask}
                    activeScreen={activeScreen}
                    setActiveScreen={setActiveScreen}
                    details={details}
                    isEditing
                />
  
    default:
        return <Tasks
                    tasks={tasks}
                    taskStatus={taskStatus}
                    details={details}
                    setActiveScreen={setActiveScreen}
                    setSelectedTask={setSelectedTask}
                />
  }
}

export {Body}