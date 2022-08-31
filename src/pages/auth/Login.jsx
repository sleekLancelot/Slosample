import React,{ useState } from 'react'
import {Link as ReactRouterLink} from "react-router-dom"
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';

import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputRightElement,
    Checkbox,
    Stack,
    Link,
    Button,
    Heading,
    Text,
    useColorModeValue,
  } from '@chakra-ui/react';
  import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { login } from '../../actions';
import { setAuthentication, setProfile } from '../../redux/slices/userSlice';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [loginDetails, setLoginDetails] = useState({
        email: '',
        password: ''
    })
    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const { email, password } = loginDetails

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const onChange = (e) => {
        if (error) {
            setError('')
        }
        setLoginDetails(() => ({ ...loginDetails, [e.target.id]: e.target.value }))
    }

    const submit = async () => {
        setError('')
        setLoading(true)
        try {
            const response = await login(loginDetails)

            setLoading(false)

            if (response?.data?.status === 'success') {
                localStorage.setItem("auth", JSON.stringify({
                    accessToken: response?.data?.results?.token,
                }));
                dispatch( setAuthentication( true ) )
                dispatch( setProfile( response.data?.results ) )
                navigate('/')
            } else {
              setError(response?.data?.message)
            }
    
            return response
        } catch (err) {
            setLoading(false)

            setError(err?.response?.data?.message || err?.message)
    
            return err
        }
    }

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack 
        spacing={8}
        mx={'auto'}
        maxW={'lg'}
        py={12}
        px={6}
      >
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Log into your account</Heading>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
            {
                error &&
                <Text 
                color={'red.500'}
                fontStyle='italic'
                textAlign={'center'}
                textTransform='capitalize'
                >{error}</Text>
            }
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input 
                type="email"
                value={email}
                onChange={onChange}
            />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input 
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={onChange}
                />
                <InputRightElement h={'full'}>
                  <Button
                    variant={'ghost'}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }>
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={5}>
              <Stack
                    direction={{ base: 'column', sm: 'row' }}
                    align={'start'}
                    justify={'flex-end'}
                >
                <Link color={'blue.400'}>Forgot password?</Link>
              </Stack>
                <Button
                    bg={'blue.400'}
                    color={'white'}
                    _hover={{
                    bg: 'blue.500',
                    }}
                    isLoading={loading}
                    colorScheme='teal'
                    disabled={!email || !password}
                    onClick={submit}
                >
                        Log in
                </Button>
                <Stack pt={1}>
                    <Text align={'center'}>
                        Don&apos;t have an account yet? 
                            <Link as={ReactRouterLink} to={'#'} ml={2} color={'blue.400'}>Create account</Link>
                    </Text>
                </Stack>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  )
}

export default Login