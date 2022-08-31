import React, {useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import {Box} from '@chakra-ui/react'

const PrivateRoute = ({children}) => {
    const { isAuthenticated } = useSelector((store) => store.user);
    const navigate = useNavigate()

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/auth/login')
        }
    },[isAuthenticated])


    return isAuthenticated && (
        <Box>
            {children}
        </Box>
    )
}

export {PrivateRoute}