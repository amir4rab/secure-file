import React from 'react'
import { Group, Text } from '@mantine/core';
import { IoCloudUpload, IoFileTray, IoClose } from 'react-icons/io5';
import { Dropzone, DropzoneStatus } from '@mantine/dropzone';

interface Props {
  onDrop: (file: File[]) => void;
  loading?: boolean;
  disabled?: boolean;
  acceptedFileTypes?: string[];
}

const ImageUploadIcon = ({ status }: { status: DropzoneStatus }) => {
  if (status.accepted) {
    return <IoCloudUpload style={{ fontSize: '2.5rem' }} />;
  }

  if (status.rejected) {
    return <IoClose style={{ fontSize: '2.5rem' }} />;
  }

  return <IoFileTray style={{ fontSize: '2.5rem' }} />;
}

export const dropzoneChildren = (status: DropzoneStatus) => (
  <Group position="center" spacing="xl" style={{ minHeight: 220, pointerEvents: 'none' }}>
    <ImageUploadIcon status={status}/>

    <div>
      <Text size="xl" inline>
        Drag your file here or click to select file
      </Text>
      <Text size="sm" color="dimmed" inline mt={7}>
        Attach your file here, max size is 1G
      </Text>
    </div>
  </Group>
);

const defaultAcceptedFileTypes = [
  'image/*',
  'video/*',
  'audio/*',
  'application/*'
]

const CustomDropzone = ({ onDrop, loading= false, disabled= false, acceptedFileTypes= defaultAcceptedFileTypes }: Props) => {

  return (
    <Dropzone
      onDrop={ onDrop }
      onReject={(files) => console.log('rejected files', files)}
      maxSize={ 1_073_741_824 }
      accept={acceptedFileTypes}
      loading={ loading }
      disabled={ disabled }
    >
      {(status) => dropzoneChildren(status)}
    </Dropzone>
  )
}

export default CustomDropzone