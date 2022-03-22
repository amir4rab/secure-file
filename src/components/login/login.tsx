import { FormEventHandler, useState } from 'react';
import { useForm } from '@mantine/form';
import useAuth from '@/hooks/useAuth';

import { IoEye, IoEyeOff, IoInformation } from 'react-icons/io5'
import { Title, Text, Button, Group, Box, PasswordInput, LoadingOverlay, Center } from '@mantine/core';
import Link from '@/components/link';
import { useRouter } from 'next/router';


const Login = () => {
  const [ isLoading, setIsLoading ] = useState(false);
  const router = useRouter();
  const { authenticate, verifyPassword } = useAuth();
  const form = useForm({
    initialValues: {
      password: '',
    },
    validate: {
      password: (value) => ( value.length > 8 ? null : 'Short password')
    },
  });

  const submitEvent: FormEventHandler = form.onSubmit( async ({ password }) => {
    const isPasswordValid = await verifyPassword(password);
    if (!isPasswordValid) {
      form.setErrors({ password: 'Password is False!' })
      return;
    };

    setIsLoading(true)

    await authenticate(password);
    router.push('/app')
  })

  return (
    <Box sx={{ minHeight: '100vh' }}>
      <LoadingOverlay visible={ isLoading } />
      <Title data-testid='loginTitle' sx={{ paddingBottom: '5vh' }} order={1}>
        Login
      </Title>
      <Center sx={(theme) => ({
        justifyContent: 'space-between',
        [`@media(max-width:${theme.breakpoints.md}px)`] : { 
          flexDirection: 'column'
        }
      })}>
        <Box sx={(theme) => ({ 
          minWidth: '49%',
          [`@media(max-width:${theme.breakpoints.md}px)`] : {
            width: '100%', marginBottom: theme.spacing.lg 
          }
        })}>
          <form onSubmit={ submitEvent }>
            <PasswordInput
              required
              label="Password"
              placeholder="Some random strings"
              visibilityToggleIcon={({ reveal, size }) =>
                reveal ? <IoEyeOff style={{ fontSize: `${size}px` }} /> : <IoEye style={{ fontSize: `${size}px` }} />
              }
              {...form.getInputProps('password')}
            />
            <Group position="right" mt="md">
              <Button data-testid='loginButton' type="submit">Login</Button>
            </Group>
          </form>
        </Box>
        <Box p='md' sx={(theme) => ({ 
          borderRadius: theme.radius.md, width: '49%', border: `.1rem solid ${theme.colors.gray[7]}`, 
          [`@media(max-width:${theme.breakpoints.md}px)`] : { 
            width: '100%'
          }
        })}>
          <Group>
            <IoInformation style={{ fontSize: '1.5rem' }} />
            <Title order={3} sx={(theme) => ({ color: theme.colors.gray[5] })}>Help</Title>
          </Group>
          <Text color='gray'>
            Have you forgot your password? click <Link path='/reset' data-testid='resetLink'>here</Link> to reset your password.
          </Text>
        </Box>
      </Center>
    </Box>
  )
}

export default Login