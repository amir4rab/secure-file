import React from 'react'
import { ActionIcon, MediaQuery } from '@mantine/core'
import { IoArrowBack, IoChevronBack } from 'react-icons/io5'
import { useRouter } from 'next/router'

function BackToMenu() {
  const router = useRouter();

  const goToSettings = () => {
    router.push('/app/settings')
  };

  return (
    <>
      <MediaQuery smallerThan='md' styles={{ display: 'none' }}>
        <ActionIcon onClick={ goToSettings } size='xl'>
          <IoArrowBack style={{ fontSize: '1.5rem' }}/>
        </ActionIcon>
      </MediaQuery>
      <MediaQuery largerThan='md' styles={{ display: 'none' }}>
        <ActionIcon onClick={ goToSettings } size='sm'>
          <IoChevronBack style={{ fontSize: '1.5rem' }} />
        </ActionIcon>
      </MediaQuery>
    </>
  )
}

export default BackToMenu