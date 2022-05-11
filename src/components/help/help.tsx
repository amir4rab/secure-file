import { Box, Title, Container, Text, UnstyledButton, Overlay, SimpleGrid, createStyles } from '@mantine/core';
import useTranslation from '@/translation/useTranslation';;
import { useRouter } from 'next/router';
import React from 'react'
import HelpFaq from './help-faq';

const useStyles = createStyles((theme) => ({
  head: {
    position: 'relative',
    backgroundColor: theme.colors.blue[7],
    borderRadius: theme.radius.md,
    overflow: 'hidden',
    minHeight: '25vh',
    width: '100%',
    margin: 0
  },
  title: {
    lineHeight: '100%',
    position: 'absolute',
    color: theme.colors.dark[7],
    bottom: theme.spacing.md,
    left: theme.spacing.md,
    fontSize: '5rem',
    [ theme.fn.smallerThan('md') ] : {
      fontSize: '3rem'
    }
  },
  titleOverlay: {
    lineHeight: '100%',
    fontSize: '12rem', color: theme.colors.blue[6], position: 'absolute', right: theme.spacing.sm, top: theme.spacing.sm , userSelect: 'none', pointerEvents: 'none',
    [ theme.fn.smallerThan('md') ] : {
      fontSize: '8rem'
    }
  },
  button: {
    height: '10vh',
    position: 'relative',
    backgroundSize: '100%',
    backgroundPosition: 'center',
    color: theme.white,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.xl,
    overflow: 'hidden',
    transition: 'background-size 300ms ease',

    '&:hover': {
      backgroundSize: '105%',
    },
  },
  buttonOverlay: {
    transition: 'opacity 300ms ease-in-out',
    '&:hover': {
      opacity: .7,
    },
  },
  buttonText: {
    pointerEvents: 'none',
    position: 'relative',
    zIndex: 2,
  }
}));



const GridButton = ({ title, imageUrl, url }:{ title: string, imageUrl: string, url: string }) => {
  const { classes } = useStyles();
  const router = useRouter();
  const { t } = useTranslation('help');

  return (
    <UnstyledButton onClick={() => { router.push(url) }} style={{ backgroundImage: `url(${ imageUrl })` }} className={ classes.button } >
      <Overlay className={ classes.buttonOverlay } color="#000" opacity={0.6} zIndex={1} />
      <Text className={ classes.buttonText } size="xl" align="center" weight={700}>
        { t(title) }
      </Text>
    </UnstyledButton>
  );
}

function HelpComponent() {
  const { classes } = useStyles();
  const { t } = useTranslation('help');
  
  return (
    <>
      <div className={ classes.head }>
        <Title order={ 3 } className={ classes.titleOverlay }>{ t('titleFadedBg') }</Title>
        <Title order={ 1 } className={ classes.title }>{ t('title') }</Title>
      </div>
      <SimpleGrid pt='xl' cols={2} breakpoints={[{ maxWidth: 'md', cols: 1 }]}>
        {
          [
            {
              title: 'devGuide',
              image: 'images/developer-guides.jpg',
              url: '/developers-guide'
            },
            {
              title: 'userGuide',
              image: 'images/users-guides.jpg',
              url: '/users-guide'
            }
          ].map( item => (
            <GridButton title={ item.title } imageUrl={ item.image } key={ item.title } url={ item.url } />
          ))
        }
      </SimpleGrid>
      <HelpFaq />
    </>
  )
}

export default HelpComponent