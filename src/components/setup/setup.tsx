import { useState } from 'react';
import useAuth from '@/hooks/useAuth';

import { Title, Box, LoadingOverlay } from '@mantine/core';
import { useRouter } from 'next/router';
import { useInputState } from '@mantine/hooks';

//** custom elements **//
import SetupStepper from './setup-stepper';
import SetupPasswordInput from './setup-passwordInput';
import SetupTos from './setup-tos';
import SetupPasswordConfirm from './setup-PasswordConfirm';

const Setup = () => {
  const [ currentStep, setCurrentStep ] = useState(0);
  const [ isLoading, setIsLoading ] = useState(false);
  const router = useRouter();
  const [ password, setPassword ] = useInputState('')
  const { setup, status } = useAuth();

  const setPasswordEvent = ( input: string ) => {
    setPassword(input);
    setCurrentStep(2)
  }

  const submitEvent = async () => {
    setIsLoading(true);

    await setup( 'unknown', password );

    router.push('/app');
  };

  return (
    <Box>
      <LoadingOverlay visible={ isLoading } />
      <Title order={1} mb='xl'>
        Setup
      </Title>
      <SetupStepper active={ currentStep } setActive={ setCurrentStep } />
      {
        currentStep === 0 ?
        <SetupTos goNext={ () => setCurrentStep(1) } /> : null
      }
      {
        currentStep === 1 ?
        <SetupPasswordInput submitPassword={ setPasswordEvent } /> : null
      }
      {
        currentStep === 2 ?
        <SetupPasswordConfirm originalPassword={ password } confirmEvent={ submitEvent } /> : null
      }
    </Box>
  )
}

export default Setup