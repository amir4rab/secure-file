import React from 'react';
import { createStyles, Container, Title, Text, Button, Group } from '@mantine/core';
import ErrorWrapper from './errorWrapper';


function OfflineComponent() {

  return (
    <ErrorWrapper code='OFFLINE'>
      <Title sx={(theme) => ({ fontSize: '4rem', [theme.fn.smallerThan('md')]: { fontSize: '3rem' }})} pb='lg' align='center'>You are offline</Title>
      <Text color="dimmed" size="lg" align="center"  pb='lg'>
        {`Sorry it seem's like you have lost your internet connection, click at button to refresh the page :(`}
      </Text>
      <Group position="center">
        <Button onClick={() => { location.reload() }} size="md">Refresh</Button>
      </Group>
    </ErrorWrapper>
  )
}

export default OfflineComponent