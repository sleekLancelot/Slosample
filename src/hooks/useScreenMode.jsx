import {useState} from 'react'
import { Mode } from '../utils/contants'

const useScreenMode = () => {
    const [activeScreen, setActiveScreen] = useState(Mode.ShowTasks)

    // const setActiveScreen = (mode) => {
    //   setScreen( () => mode)
    // }
  return {
    activeScreen,
    setActiveScreen,
  }
}

export {useScreenMode}