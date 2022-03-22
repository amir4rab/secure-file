import React, { FormEventHandler, useEffect, useState } from 'react';
import { useForm } from '@mantine/form';
import useAuth from '@/hooks/useAuth';

import { IoEye, IoEyeOff, IoWarning } from 'react-icons/io5'
import { Title, TextInput, Text, Checkbox, Button, Group, Box, Space, PasswordInput, LoadingOverlay, Center } from '@mantine/core';
import Link from '@/components/link';
import { useRouter } from 'next/router';


const Setup = () => {
  const [ isLoading, setIsLoading ] = useState(false);
  const router = useRouter();
  const { setup, status } = useAuth();
  const form = useForm({
    initialValues: {
      name: 'unknown',
      password: '',
      passwordRepeat: '',
      termsOfService: false,
    },

    validate: {
      password: (value) => ( value.length > 8 ? null : 'Weak password'),
      passwordRepeat: ( value, values ) => ( value === values.password ? null : 'Password repeat is false'),
      name: ( value ) => ( value.length < 12 ? null : 'your name is to long')
    },
  });

  const submitEvent = async ({ name ,password }:{ name: string ,password: string }) => {
    setIsLoading(true);

    await setup( name, password );

    router.push('/app');
  };

  return (
    <Box>
      <LoadingOverlay visible={ isLoading } />
      <Title sx={{ paddingBottom: '5vh' }} order={1}>
        Setup
      </Title>
      <Center sx={{  justifyContent: 'space-between', alignItems: 'flex-start', '@media(max-width:992px)': { flexDirection: 'column' } }}>
        <Group p='md' sx={(theme) => ({ 
          borderRadius: theme.radius.md, width: '49%', border: `.1rem solid ${theme.colors.yellow[7]}`, 
          [`@media(max-width:${theme.breakpoints.md}px)`] : { 
            width: '100%', marginBottom: theme.spacing.lg 
          }
        })}>
          <Group>
            <IoWarning style={{ fontSize: '1.5rem', color: '#fcc419' }} />
            <Title order={3} sx={(theme) => ({ color: theme.colors.yellow[5] })}>Warning</Title>
          </Group>
          <Text color='gray'>
            In case you forgot your password, there is no-way to recover your files from Secure File, therefore keep your password in some place safe!
          </Text>
        </Group>
        <Box sx={(theme) => ({ width: '49%', [`@media(max-width:${theme.breakpoints.md}px)`]: { width: '100%' } })}>
          <form onSubmit={form.onSubmit(submitEvent)}>
            <TextInput
              label="Name"
              placeholder="your name"
              {...form.getInputProps('name')}
            />
            <Space h="md" />
            <PasswordInput
              required
              label="Password"
              placeholder="Some random strings"
              visibilityToggleIcon={({ reveal, size }) =>
                reveal ? <IoEyeOff style={{ fontSize: `${size}px` }} /> : <IoEye style={{ fontSize: `${size}px` }} />
              }
              {...form.getInputProps('password')}
            />
            <Space h="md" />
            <PasswordInput
              required
              label="Password Repeat"
              placeholder="Some random strings"
              visibilityToggleIcon={({ reveal, size }) =>
                reveal ? <IoEyeOff style={{ fontSize: `${size}px` }} /> : <IoEye style={{ fontSize: `${size}px` }} />
              }
              {...form.getInputProps('passwordRepeat')}
            />
            <Space h="md" />
            <Center sx={{ justifyContent: 'space-between', flexWrap: 'wrap' }}>
              <Checkbox
                required
                mt="md"
                label={
                  <Text>I have agreed to <Link path='/tos'>terms of service</Link></Text>
                }
                {...form.getInputProps('termsOfService', { type: 'checkbox' })}
              />
              <Group position="right" mt="md" sx={{ '@media(max-width: 768px)': { width: '100%' } }}>
                <Button type="submit">Signup</Button>
              </Group>
            </Center>
          </form>
        </Box>
      </Center>
    </Box>
  )
}

export default Setup