import React from 'react'
import { ActionIcon, createStyles } from '@mantine/core'
import { IoArrowBack, IoChevronBack } from 'react-icons/io5'
import { useRouter } from 'next/router';
import useMediaQuery from '@/hooks/useMediaQuery';

const useStyles = createStyles((theme) => ({
  mobileIcon: {
    fontSize: '1rem',
    [ theme.fn.largerThan('md') ] : {
      display: 'none'
    }
  },
  desktopIcon: {
    fontSize: '1.5rem',
    [ theme.fn.smallerThan('md') ] : {
      display: 'none'
    }
  }
}))

interface Props {
  route: string
}
function BackToMenu({ route }: Props ) {
  const router = useRouter();
  const { classes } = useStyles();
  const isDesktop = useMediaQuery('(min-width: 992px)');

  const goToSettings = () => {
    router.push(route)
  };

  return (
    <ActionIcon onClick={ goToSettings } size={ isDesktop ? 'xl' : 'md' }>
      <IoArrowBack className={ classes.desktopIcon }/>
      <IoChevronBack className={ classes.mobileIcon }/>
    </ActionIcon>
  )
}

export default BackToMenu