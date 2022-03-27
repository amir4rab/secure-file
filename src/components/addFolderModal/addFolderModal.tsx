import React, { ChangeEvent, ChangeEventHandler, useRef, useState } from 'react'
import { Modal, InputWrapper, Input, Button, Center } from '@mantine/core';

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
      setError('Folder name should be shorter than 12 char');
      return;
    };


    submit(currentValue);
    setIsOpen(false);
    setCurrentValue('');
  }

  return (
    <Modal
      transition='pop'
      radius='md'
      opened={ isOpen }
      onClose={() => setIsOpen(false) }
      title='Add Folder'
      centered
    >
      <InputWrapper
        id='folder-name'
        required
        label='Folder name'
        description='Please select a name for your folder'
        error={ error }
      >
        <Input value={ currentValue } onChange={ (e : ChangeEvent< HTMLInputElement >) => setCurrentValue(e.target.value) } id='folder-name' placeholder='Some folder name' />
      </InputWrapper>
      <Center pt='lg' sx={{ justifyContent: 'flex-end' }}>
        <Button onClick={ submitEvent } color='green' ml='auto'>
          Submit
        </Button>
      </Center>
    </Modal>
  )
}

export default AddFolderModal