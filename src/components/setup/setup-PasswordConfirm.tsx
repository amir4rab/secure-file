import { useState, ChangeEventHandler } from 'react';
import { Box, PasswordInput, Text, Center, Button, Title } from '@mantine/core';
import { IoCheckmark, IoClose } from 'react-icons/io5';

function PasswordRequirement({ meets, label }: { meets: boolean; label: string }) {
  return (
    <Text color={meets ? 'teal' : 'red'} mt={5} size="sm">
      <Center inline>
        {meets ? <IoCheckmark size={14} /> : <IoClose size={14} />}
        <Box ml={7}>{label}</Box>
      </Center>
    </Text>
  );
}

function isValid(password: string, passwordRepeat: string) {
  return passwordRepeat === password;
}

const PasswordInputElement = ({ value, setValue, isValid }:{ isValid: boolean, value: string, setValue: ( a: string ) => void }) => {
  const onChangeHandler: ChangeEventHandler<HTMLInputElement> = (e): void => {
    setValue(e.target.value)
  }

  return (
    <div>
      <PasswordInput
        value={value}
        onChange={onChangeHandler}
        placeholder="Your password"
        label="Password repeat"
        required
      />
      <PasswordRequirement label='Rightly repeated!' meets={ isValid } />
    </div>
  )
}
function SetupPasswordConfirm({ originalPassword, confirmEvent }:{ originalPassword: string, confirmEvent: () => void }) {
  const [ value, setValue ] = useState('');
  const validRepeat = isValid(originalPassword, value);

  return (
    <div>
      <Title order={3} my='md'>Password confirm</Title>
      <Box sx={(theme) => ({ [theme.fn.largerThan('md')]: { maxWidth: '500px', margin: '0 auto' }})}>
        <PasswordInputElement value={ value } setValue={ setValue } isValid={ validRepeat } />
        <Center pt='md' sx={{ justifyContent: 'flex-end' }}>
          <Button disabled={ !validRepeat } onClick={ confirmEvent }>
            Confirm
          </Button>
        </Center>
      </Box>
    </div>
  )
}

export default SetupPasswordConfirm