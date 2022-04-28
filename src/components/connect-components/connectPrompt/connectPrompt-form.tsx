import React from 'react';
import { TextInput, Checkbox, Button, Group, Box } from '@mantine/core';
import { useForm } from '@mantine/form';
import { validate } from 'uuid';

interface Props {
  onSubmit: ({ id, secret }:{ id: string, secret: string }) => void
}
function ConnectPromptForm( { onSubmit }: Props ) {
  const form = useForm({
    initialValues: {
      id: '',
      secret: ''
    },

    validate: {
      id: (value) => (value.length < 36 ? 'shortSecret' : validate(value) ? null : 'invalidSecret' ),
      secret: (value) => (value.length === 16 ? null : 'invalidSecret'),
    },
  });

  return (
    <form onSubmit={form.onSubmit((values) => onSubmit(values))}>
      <TextInput
        mb='xl'
        required
        label="Id"
        placeholder="Something like b18faa7a-1baf-4afd-833b-add2f5683e6a"
        error={ form.errors?.id }
        {...form.getInputProps('id')}
      />
      
      <TextInput
        mb='xl'
        required
        label="Secret"
        placeholder="Something like 7cd6fcc6dba9c6f5"
        error={ form.errors?.secret }
        {...form.getInputProps('secret')}
      />

      <Group position="right" mt="md">
        <Button type="submit">Connect</Button>
      </Group>
    </form>
  )
}

export default ConnectPromptForm