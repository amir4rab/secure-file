import { PasswordInput, Title, Box, Button } from '@mantine/core'
import useTranslation from '@/translation/useTranslation';
import React, { useState } from 'react'

interface Props {
  submit: ( password: string ) => void
}
function ParserEncryptPassword({ submit }: Props) {
  const [ password, setPassword ] = useState< string >('');
  const { t } = useTranslation('parser-encrypt');
  const { t: commonT } = useTranslation('common');

  return (
    <Box>
      <Title mb='xl' order={3}>
        { t('chosePassword') }
      </Title>
      <PasswordInput
        placeholder={ commonT('password') }
        label={ commonT('password') }
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

export default ParserEncryptPassword