import React, { useState } from 'react'
import { Modal } from '@mantine/core';
import { EncryptedFileHead } from "@/types/encryptedFile";

import { Text } from '@mantine/core'

import Video from '@/components/fileHandlers/video';
import Audio from '@/components/fileHandlers/audio';
import Image from '@/components/fileHandlers/image';
import Document from '@/components/fileHandlers/document';

import { getFamilyFormat } from '@/utils/frontend/mediaFormats'

interface Props {
  modalState: boolean;
  closeModal: () => void;
  fileUrl: string | null;
  fileHead: EncryptedFileHead | null;
}

const Media = ({ mediaHead, mediaUrl }:{ mediaHead: EncryptedFileHead, mediaUrl: string }) => {
  const [ format ] = useState< 'video' | 'audio' | 'image' | 'document' | 'unsupported'  >(getFamilyFormat(mediaHead.format))

  return (
    <>
      {
        format === 'video' ? <Video url={ mediaUrl } /> :
        format === 'audio' ? <Audio url={ mediaUrl } /> :
        format === 'document' ? <Document url={ mediaUrl } /> :
        format === 'image' ?  <Image url={ mediaUrl } alt="" /> :
        <Text sx={{ opacity: .9 }} size='sm'>
          { `Sorry, we can't open ${mediaHead.format} inside browser` }
        </Text>
      }
    </>
  )
}

function MediaPlayerModal({ modalState, closeModal, fileUrl, fileHead }: Props) {
  return (
    <Modal
      transition='pop'
      radius='md'
      opened={modalState}
      onClose={closeModal}
      title='Media player'
      size='xl'
      centered
    >
      {
        fileUrl !== null && fileHead !== null ? <Media mediaHead={ fileHead } mediaUrl={ fileUrl } /> : null
      }
    </Modal>
  )
}

export default MediaPlayerModal