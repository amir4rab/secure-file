import React, { useRef, useState } from 'react';

import { Box, Title,  Stepper, createStyles, LoadingOverlay  } from '@mantine/core';
import { IoKey, IoDocument, IoLockClosed } from 'react-icons/io5';

import useTranslation from '@/translation/useTranslation';;

import BackToButton from '@/components/backToButton';

import useFileParser from '@/hooks/useFileParser';
import useMediaQuery from '@/hooks/useMediaQuery';

import ParserEncryptPassword from './parserEncrypt-password';
import ParserEncryptDropzone from './parserEncrypt-dropzone';
import ParserEncryptDone from './parserEncrypt-done';

const useStyles = createStyles((theme) => ({
  stepperWrapper: {
    display: 'flex',
    flexDirection: 'column',
    [ theme.fn.largerThan('md') ] : {
      flexDirection: 'row-reverse',
      justifyContent: 'space-between'
    }
  },
  stepper: {
    maxWidth: '100%',
    overflowX: 'scroll',
    marginBottom: theme.spacing.xl,
    minHeight: '4rem',
    [ theme.fn.largerThan('md') ] : {
      width: '30%',
      overflowX: 'hidden',
      marginBottom: 0,
    }
  },
  stepperRes: {
    [ theme.fn.largerThan('md') ] : {
      width: '60%'
    }
  }
}));

function ParserEncrypt() {
  // visual hooks //
  const isDesktop = useMediaQuery('(min-width: 992px)');
  const { classes } = useStyles();

  // translation hooks //
  const { t } = useTranslation('parser-encrypt')

  // logic hooks //
  const { encryptFile } = useFileParser();

  // state hooks //
  const [ password, setPassword ] = useState< null | string >(null);
  const [ fileName, setFileName ] = useState< null | string >(null);
  const [ fileUrl, setFileUrl ] = useState< null | string >(null);
  const [ stepperPosition, setStepperPosition ] = useState(0);
  const [ isLoading, setIsLoading ] = useState(false);
  
  // ref hooks //
  const hiddenDownloadRef = useRef< HTMLAnchorElement >(null)

  // stepper events //
  const submitPassword = ( password: string ) => {
    setPassword(password);
    setStepperPosition(1);
  }

  const submitFile = async ( file: File ) => {
    setStepperPosition(2);
    setIsLoading(true);

    if ( password !== null ) {
      const response = await encryptFile(file, password);
      if ( response !== null ) {
        setFileUrl(response);
        hiddenDownloadRef.current?.click();
  
        URL.revokeObjectURL(response);
        setFileUrl(null);
      }  
    }
    setStepperPosition(2);
    setIsLoading(false);
  }

  const reset = () => {
    setPassword(null);
    setFileName(null);
    setStepperPosition(0);
  }

  return (
    <div>
      <LoadingOverlay visible={ isLoading } />
      <Box sx={{ display: 'flex', alignItems: 'center' }} mt='sm' mb='xl'>
        <BackToButton route='/parser'/>
        <Title order={1} ml='sm'>
          { t('title') }
        </Title>
      </Box>
      <a 
        ref={ hiddenDownloadRef } 
        hidden 
        download={ fileName === null ? 'secure-file-encrypted.sce' : fileName } 
        href={ fileUrl === null ? '' : fileUrl } 
      />
      <Box className={ classes.stepperWrapper }>
        <Stepper size={ isDesktop ? 'md' : 'xs' } className={ classes.stepper } orientation={ isDesktop ? 'vertical' : 'horizontal' } active={ stepperPosition }>
          <Stepper.Step icon={ <IoKey /> } label={ t('chosePassword') } />
          <Stepper.Step icon={ <IoDocument /> } label={ t('choseFile') } />
          <Stepper.Step icon={ <IoLockClosed /> } label={ t('wait') } />
        </Stepper>
        <Box className={ classes.stepperRes }>
          { stepperPosition === 0 ? <ParserEncryptPassword submit={ submitPassword } /> : null }
          { stepperPosition === 1 ? <ParserEncryptDropzone submit={ submitFile } /> : null }
          { stepperPosition === 2 ? <ParserEncryptDone reset={ reset } /> : null }
        </Box>
      </Box>
    </div>
  )
}

export default ParserEncrypt