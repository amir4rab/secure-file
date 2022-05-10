import React, { useRef, useState } from 'react';

import { Box, Title,  Stepper, createStyles, LoadingOverlay  } from '@mantine/core';
import { IoKey, IoDocumentLock, IoLockOpen } from 'react-icons/io5';

import useTranslation from '@/translation/useTranslation';;

import BackToButton from '@/components/backToButton';

import useFileParser from '@/hooks/useFileParser';
import useMediaQuery from '@/hooks/useMediaQuery';

import ParserDecryptPassword from './parserDecrypt-password';
import ParserDecryptDropzone from './parserDecrypt-dropzone';
import ParserDecryptDone from './parserDecrypt-done';

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

function ParserDecrypt() {
  // visual hooks //
  const isDesktop = useMediaQuery('(min-width: 992px)');
  const { classes } = useStyles();

  // translation hooks //
  const { t } = useTranslation('parser-decrypt')

  // logic hooks //
  const { decryptFile, verifyFilePassword } = useFileParser();

  // state hooks //
  const [ file, setFile ] = useState< null | File >(null)
  // const [ password, setPassword ] = useState< null | string >(null);
  const [ fileName, setFileName ] = useState< null | string >(null);
  const [ fileUrl, setFileUrl ] = useState< null | string >(null);
  const [ stepperPosition, setStepperPosition ] = useState(0);
  const [ isLoading, setIsLoading ] = useState(false);
  const [ passwordIsFalse, setPasswordIsFalse ] = useState(false)
  
  // ref hooks //
  const hiddenDownloadRef = useRef< HTMLAnchorElement >(null)

  // stepper events //
  const submitPassword = async ( password: string ) => {
    setIsLoading(true);

    if ( file === null ) return;
    const isPasswordCorrect = await verifyFilePassword( file, password );

    // checks for password correctness
    if ( !isPasswordCorrect ) {
      setPasswordIsFalse(true);
      setIsLoading(false); 
      return;
    }
    setPasswordIsFalse(false);

    const { error, head, url } = await decryptFile(file, password);

    error && console.log(error);

    if ( head !== null && url !== null ) {
      setFileUrl(url);
      setFileName(head.name);
      hiddenDownloadRef.current?.click();

      URL.revokeObjectURL(url);
      setFileUrl(null);
      setFileName(null);
    }  

    setStepperPosition(2)
    setIsLoading(false);  
  }

  const submitEncryptedFile = async ( file: File ) => {
    setFile( file );
    setStepperPosition(1);
  }

  const reset = () => {
    setFileName(null);
    setFile(null);
    setFileUrl(null);
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
          <Stepper.Step icon={ <IoDocumentLock /> } label={ t('choseFile') } />
          <Stepper.Step icon={ <IoKey /> } label={ t('insertPassword') } />
          <Stepper.Step icon={ <IoLockOpen /> } label={ t('wait') } />
        </Stepper>
        <Box className={ classes.stepperRes }>
          { stepperPosition === 0 ? <ParserDecryptDropzone submit={ submitEncryptedFile } /> : null }
          { stepperPosition === 1 ? <ParserDecryptPassword passwordIsFalse={ passwordIsFalse } submit={ submitPassword } /> : null }
          { stepperPosition === 2 ? <ParserDecryptDone reset={ reset } /> : null }
        </Box>
      </Box>
    </div>
  )
}

export default ParserDecrypt