// next.js hooks
import { useRouter } from 'next/router';

// mantine components
import { Button, Title, Group, createStyles, Text, Center, Loader } from '@mantine/core';

// hooks
import useAuth from '@/hooks/useAuth';


// icons
import { IoCloudDownload, IoRocket } from 'react-icons/io5';

// translation
import useTranslation from '@/translation/useTranslation';
import Trans from '@/translation/Trans';

// styles
const useStyles = createStyles((theme) => ({
  wrapper: {
    flexDirection: 'column',
    minHeight: '80vh',
    [theme.fn.largerThan('md')]: {
      maxWidth: '700px',
      margin: '0 auto',
      minHeight: 'calc(100vh - 10rem)',
    },
    '&::before': {
      position: 'absolute',
      left: 0,
      top: 0,
      objectPosition: 'center',
      objectFit: 'contain',
      height: 'calc(80vh + 3rem)',
      width: '100%',
      content: '""',
      background: 'url(assets/background.svg)',
      opacity: .1,
      zIndex: -1,
      [theme.fn.largerThan('md')]: {
        height: 'calc(80vh + 7.5rem)',
      }
    }
  },
  title: {  
    fontSize: theme.fontSizes.xl * 1.5,
    marginBottom: theme.spacing.xl * 1.5,
    fontWeight: 900,
    color: theme.white,
    fontFamily: `Inter, ${theme.fontFamily}`,
    [theme.fn.largerThan('md')]: {
      fontSize: theme.fontSizes.xl * 2.75,
      marginBottom: theme.spacing.xl * 2
    },
  },
  highlightedText: {
    fontSize: theme.fontSizes.xl * 1.5,
    fontWeight: 900,
    fontFamily: `Inter, ${theme.fontFamily}`,
    color: theme.colors.blue[7],
    [theme.fn.largerThan('md')]: {
      fontSize: theme.fontSizes.xl * 2.75,
    }
  },
  subtitle: {
    paddingBottom: theme.spacing.lg * 1.5,
    fontWeight: 400,
    color: theme.colors.gray[6],
    [theme.fn.largerThan('md')]: {
      paddingBottom: theme.spacing.lg * 3,
    }
  },
  buttonsArea: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-start'
  },
  applicationInstall: {
    [theme.fn.smallerThan('md')]: {
      display: 'none'
    }
  }
}));

const HomeHero = () => {
  const { status } = useAuth();
  const router = useRouter();
  const { classes } = useStyles();
  const { t: commonT } = useTranslation('common');
  const { t: homeT } = useTranslation('home');

  const mainActionHandler = () => {
    if ( status === 'authenticated' ) {
      router.push('/app');
    } else if ( status !== 'loading' ) {
      router.push('/auth');
    }
  }

  return (
    <Center py='lg' className={ classes.wrapper }>
      <Trans
        ns='home'
        i18nKey="title"
        components={[
          <Title key={0} className={ classes.title } order={ 1 }/>,
          <Text key={1} component='span' className={ classes.highlightedText }/>,
          <Text key={1} component='span' className={ classes.highlightedText }/>,
          <Text key={1} component='span' className={ classes.highlightedText }/>,
        ]}
      />
      <Title className={ classes.subtitle } order={ 3 }>
        { homeT('subtitle') }
      </Title>
      <Group className={ classes.buttonsArea }>
        <Button 
          onClick={ mainActionHandler } 
          variant='gradient' 
          gradient={{ from: 'blue', to: 'cyan' }} 
          
          rightIcon={ 
            status === 'authenticated' ? <IoRocket /> : null
          }
        >
          {
            status === 'loading' ? <Loader /> : null
          }
          {
            status === 'authenticated' ? commonT('lunchApp') : null
          }
          {
            status === 'unauthenticated' ? commonT('login') : null
          }
          {
            status === 'newUser' ? commonT('getStarted') : null
          }
        </Button>
        <Button 
          hidden={ process.env.NEXT_PUBLIC_IS_APP === 'false' ? false : true } 
          leftIcon={ <IoCloudDownload /> } 
          onClick={() => { router.push('/download') }} 
          variant='light' 
          className={ classes.applicationInstall }
        >
          { commonT('getApplication') }
        </Button>
        <Button 
          onClick={() => { router.push('/about') }} 
          variant='light' 
          color='gray'
        >
          { commonT('learnMore') }
        </Button>
      </Group>
    </Center>
  )
}

export default HomeHero