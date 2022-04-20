import { useState, useEffect} from 'react';
import useAuth from '@/hooks/useAuth';

import { Title, Box, LoadingOverlay, Text } from '@mantine/core';
import { useRouter } from 'next/router';
import { useInputState } from '@mantine/hooks';
import useTranslation from 'next-translate/useTranslation';

//** custom elements **//
import SetupStepper from './setup-stepper';
import SetupPasswordInput from './setup-passwordInput';
import SetupTos from './setup-tos';
import SetupPasswordConfirm from './setup-PasswordConfirm';
import useIsSupported from '@/hooks/useIsSupported';
import SetupError from './setup-error';
import useIsPwa from '@/hooks/useIsPwa';
import SetupSuggestPwa from './setup-suggestPwa';

const Setup = () => {
  const { error, isSupported, userBrowser, browserVersion, isLoading: useSupportLoading } = useIsSupported();
  const { isPwa } = useIsPwa();

  const [ currentStep, setCurrentStep ] = useState(0);
  const [ isLoading, setIsLoading ] = useState(false);
  const router = useRouter();
  const [ password, setPassword ] = useInputState('')
  const { setup } = useAuth();
  const [ setupState, setSetupState ] = useState< 'loading' | 'error' | 'setup' | 'pwaInstall' >('loading');
  const { t } = useTranslation('setup')

  
  const setPasswordEvent = ( input: string ) => {
    setPassword(input);
    setCurrentStep(2)
  }

  const submitEvent = async () => {
    setIsLoading(true);

    await setup( 'unknown', password );

    router.push('/app');
  };

  useEffect(() => {
    if ( !isSupported && !useSupportLoading ) {
      setSetupState('error')
    } else if ( !isPwa ) {
      setSetupState('pwaInstall')
    } else {
      setSetupState('setup')
    }
  }, [ isSupported, isPwa, useSupportLoading ]);


  return (
    <Box sx={{ position: 'relative', minHeight: '60vh' }}>
      <Title order={1} mb='xl'>
        { t('title') }
      </Title>
      {
        setupState === 'loading' ?
        <LoadingOverlay visible={ isLoading } /> : null
      }
      {
        setupState === 'error' && process.env.NEXT_PUBLIC_IS_APP_BUILD !== 'true' ?
        <SetupError 
          skipError={ () => setSetupState('pwaInstall') } // lets user skip error in case of browser limitation or storage limitation //
          error={ error } 
          userBrowser={ userBrowser } 
          browserVersion={ browserVersion } 
        /> : null 
      }
      {
        setupState === 'pwaInstall' && process.env.NEXT_PUBLIC_IS_APP_BUILD !== 'true' ?
        <SetupSuggestPwa doneFn={ () => setSetupState('setup') } /> : null
      }
      {
        setupState === 'setup' || process.env.NEXT_PUBLIC_IS_APP_BUILD === 'true' ?
        <>
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
        </> : null
      }
    </Box>
  )
}

export default Setup