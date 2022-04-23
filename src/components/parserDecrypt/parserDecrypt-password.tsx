import { PasswordInput, Title, Box, Button, Text } from '@mantine/core'
import useTranslation from 'next-translate/useTranslation'
import React, { useState } from 'react'

interface Props {
  submit: ( password: string ) => void;
  passwordIsFalse: boolean
}
function ParserDecryptPassword({ submit, passwordIsFalse }: Props) {
  const [ password, setPassword ] = useState< string >('');
  const { t } = useTranslation('parser-decrypt');
  const { t: commonT } = useTranslation('common');

  return (
    <Box>
      <Title mb='xl' order={3}>
        { t('insertPassword') }
      </Title>
      <PasswordInput
        placeholder={ commonT('password') }
        label={ commonT('password') }
        description={ 
          passwordIsFalse ? 
          <Text align='right' size='xs' color='red'>{ t('falsePassword') }</Text> :
          <Text align='right' size='xs' color='gray'>{ t('passwordPrompt') }</Text> 
        }
        value={ password === null ? '' : password }
        onChange={ (e) => setPassword(e.target.value)  }
        required
        autoComplete='autocomplete'
      />
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }} mt='md'>
        <Button onClick={ () =>  submit(password) } disabled={ password === '' }>
          Confirm
        </Button>
      </Box>
    </Box>
  )
}

export default ParserDecryptPassword