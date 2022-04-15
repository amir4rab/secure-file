import useAuth from '@/hooks/useAuth';
import { Button, Title, Group, createStyles, Text, Center, Loader } from '@mantine/core'
import { useRouter } from 'next/router';
import { IoRocket } from 'react-icons/io5';


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
      background: 'url(/assets/background.svg)',
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
  }
}));

function HomeHero() {
  const { status } = useAuth();
  const router = useRouter();
  const { classes } = useStyles();

  const mainActionHandler = () => {
    if ( status === 'authenticated' ) {
      router.push('/app');
    } else if ( status !== 'loading' ) {
      router.push('/auth');
    }
  }

  return (
    <Center py='lg' className={ classes.wrapper }>
      <Title className={ classes.title } order={ 1 }>
        Secure File is a
        <Text component='span' className={ classes.highlightedText }>
          {` Private`}
        </Text>
        {`, `}
        <Text component='span' className={ classes.highlightedText }>
          {` Secure`}
        </Text>
        {`, `}
        <Text component='span' className={ classes.highlightedText }>
          {` Web Application`}
        </Text>
        .
      </Title>
      <Title className={ classes.subtitle } order={ 3 }>
        {`Secure File Help you to store your files in a secret place, fully encrypted and out of sight! it's completely free and open source.`}
      </Title>
      <Group className={ classes.buttonsArea }>
        <Button 
          onClick={ mainActionHandler } 
          variant='gradient' 
          gradient={{ from: 'blue', to: 'cyan' }} 
          size='xl' 
          rightIcon={ 
            status === 'authenticated' ? <IoRocket /> : null
          }
        >
          {
            status === 'loading' ? <Loader /> : null
          }
          {
            status === 'authenticated' ? 'Lunch App' : null
          }
          {
            status === 'unauthenticated' ? 'Login' : null
          }
          {
            status === 'newUser' ? 'Get started' : null
          }
        </Button>
        <Button onClick={() => { router.push('/faq') }} size='xl' variant='light' color='gray'>
          Learn more
        </Button>
      </Group>
    </Center>
  )
}

export default HomeHero