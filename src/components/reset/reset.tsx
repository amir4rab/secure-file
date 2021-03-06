import { Box, Title, Text, Button, Checkbox } from '@mantine/core';
import { useState } from 'react';
import useAuth from '@/hooks/useAuth';

function Reset() {
  const [ acceptedRisks, setAcceptedRisks ] = useState(false);
  const { singout } = useAuth();

  const resetAction = async () => {
    singout('complete');
  }

  return (
    <Box>
      <Title data-testid='resetTitle' pb='lg'>
        Reset
      </Title>
      <Box 
        sx={(theme) => ({
          borderRadius: theme.radius.md, padding: theme.spacing.md, marginBottom: theme.spacing.md, border: `.1rem solid ${theme.colors.red[6]}`, 
          [`@media(max-width:${theme.breakpoints.md}px)`] : { 
            width: '100%'
          }
        })}
      >
        <Title mb='sm' order={3}>
          Warning!
        </Title>
        <Text color='gray' data-testid='resetWarning'>
          Keep in mind, by resetting your Secure File, you will permanently lose all of your files, which are stored inside the web application!
        </Text>
      </Box>
      <Box my='lg'>
        <Checkbox
          checked={acceptedRisks} onChange={(event) => setAcceptedRisks(event.currentTarget.checked)}
          label='I have no problem with losing my files'
          color='red'
        />
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button onClick={ resetAction } disabled={ !acceptedRisks } data-testid='resetButton' color='red'>
          reset all
        </Button>
      </Box>
    </Box>
  )
}

export default Reset