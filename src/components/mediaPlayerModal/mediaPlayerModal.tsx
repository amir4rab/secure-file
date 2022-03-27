import React from 'react'
import { Modal } from '@mantine/core';
import { EncryptedFileHead } from "@/types/encryptedFile";

import Video from '@/components/fileHandlers/video';
import Audio from '@/components/fileHandlers/audio';
import Image from '@/components/fileHandlers/image';
import Document from '@/components/fileHandlers/document';

interface Props {
  modalState: boolean;
  closeModal: () => void;
  fileUrl: string | null;
  fileHead: EncryptedFileHead | null;
}

const Media = ({ mediaHead, mediaUrl }:{ mediaHead: EncryptedFileHead, mediaUrl: string }) => {
  return (
    <>
      { mediaHead.format === 'mp4' ? <Video url={ mediaUrl } /> : null }
      { mediaHead.format === 'mp3' ? <Audio url={ mediaUrl } /> : null }
      { mediaHead.format === 'pdf' ? <Document url={ mediaUrl } /> : null }
      { mediaHead.format === 'jpg' ? <Image url={ mediaUrl } alt="" /> : null }
      { mediaHead.format === 'png' ? <Image url={ mediaUrl } alt="" /> : null }
      { mediaHead.format === 'svg' ? <Image url={ mediaUrl } alt="" /> : null }
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