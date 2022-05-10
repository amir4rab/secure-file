import { Title, TypographyStylesProvider, Box, ScrollArea, Center, Checkbox, Button, Text } from '@mantine/core'
import useTranslation from '@/translation/useTranslation';;
import React, { useState } from 'react'

const SetupTos = ({ goNext, tosContent= '' }:{ goNext: () => void, tosContent?: string }) => {
  const [ accepted, setAccepted ] = useState(false);
  const { t: commonT } = useTranslation('common');

  return (
    <Box py='md'>
      <Title order={3} my='md'>{ commonT('termsOfService') }</Title>
      <ScrollArea p='lg' style={{ height: '30vh' }}>
        {
          tosContent !== '' ?
          <TypographyStylesProvider>
            <div dangerouslySetInnerHTML={{ __html: tosContent }} />
          </TypographyStylesProvider> : null
        }
        {
          tosContent === '' ?
          <TypographyStylesProvider>
            {'Application is Currently on pre alpha Release, and has been released AS IS and without any Warranty, use with caution and in your own risk!.'}
          </TypographyStylesProvider> : null
        }
      </ScrollArea>
      <Center sx={{ justifyContent: 'flex-start' }}>
        <Checkbox checked={accepted} onChange={ () => setAccepted(!accepted) } label={ commonT('acceptedTos') } />
      </Center>
      <Center mt='md' sx={{ justifyContent: 'flex-end' }}>
        <Button disabled={ !accepted } onClick={ goNext }>
          { commonT('next') }
        </Button>
      </Center>
    </Box>
  )
}

export default SetupTos