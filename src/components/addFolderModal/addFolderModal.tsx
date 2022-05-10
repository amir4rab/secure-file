import React, { ChangeEvent, useState } from 'react'

// mantine components
import { Modal, InputWrapper, Input, Button, Center } from '@mantine/core';

// icons
import { IoFolder } from 'react-icons/io5'

// translation
import Trans from '@/translation/Trans';

interface Props {
  isOpen: boolean,
  setIsOpen: ( value: boolean ) => void;
  submit: ( a: string ) => void;
}
function AddFolderModal({ isOpen, setIsOpen, submit }: Props) {
  const [ currentValue, setCurrentValue ] = useState('');
  const [ error, setError ] = useState('');

  const submitEvent = () => {
    setError('');

    if ( currentValue.length > 12 ) {
      setError('maxFolderNameLength');
      return;
    };


    submit(currentValue);
    setIsOpen(false);
    setCurrentValue('');
  }

  return (
    // <DynamicNamespaces namespaces={[ 'add-folder-modal' ]}>
      <Modal
        transition='pop'
        radius='md'
        opened={ isOpen }
        onClose={() => setIsOpen(false) }
        title={ <Trans ns='add-folder-modal' i18nKey='addFolder' /> }
        centered
      >
        <InputWrapper
          id='folder-name'
          required
          label={ <Trans ns='add-folder-modal' i18nKey='folderName' /> }
          description={ <Trans ns='add-folder-modal' i18nKey='selectNamePrompt' /> }
          error={ error && <Trans ns='add-folder-modal' i18nKey={`${error}`} /> }
        >
          <Input value={ currentValue } icon={ <IoFolder /> } onChange={ (e : ChangeEvent< HTMLInputElement >) => setCurrentValue(e.target.value) } id='folder-name' />
        </InputWrapper>
        <Center pt='lg' sx={{ justifyContent: 'flex-end' }}>
          <Button onClick={ submitEvent } color='green' ml='auto'>
            <Trans ns='submit' i18nKey='common' />
          </Button>
        </Center>
      </Modal>
    // </DynamicNamespaces>
  )
}

export default AddFolderModal