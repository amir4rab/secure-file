import Link from '@/components/link';
import { HeaderProps, Header, Center, Title, MediaQuery, Container, Burger, Loader, Button, createStyles, Group } from '@mantine/core';
import { useContext, useEffect, useRef, useState } from 'react'
import { LayoutContext } from '@/layouts/layout.provider';
import useAuth from '@/hooks/useAuth';
import { useRouter } from 'next/router';

const HEADER_HEIGHT = '6rem'

const useStyles = createStyles((theme) => ({
  header: {
    backgroundColor: theme.colors.dark[5],
    borderBottom: 0,
    minHeight: HEADER_HEIGHT,
    [theme.fn.smallerThan('md')]: {
      minHeight: '3rem',
    },
  },

  inner: {
    height: HEADER_HEIGHT,
    [theme.fn.smallerThan('md')]: {
      height: '3rem',
    },
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  burger: {
    [theme.fn.largerThan('md')]: {
      display: 'none',
    },
  },

  links: {
    paddingTop: theme.spacing.lg,
    height: HEADER_HEIGHT,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',

    [theme.fn.smallerThan('md')]: {
      display: 'none',
    },
  },

  mainLinks: {
    marginRight: -theme.spacing.sm,
  },

  mainLink: {
    textTransform: 'uppercase',
    fontSize: theme.fontSizes.xs,
    color: theme.colors.gray[5],
    padding: `${theme.spacing.sm}px ${theme.spacing.md}px`,
    transition: 'border-color .5s ease',
    opacity: 0.7,
    borderBottom: '.1rem solid transparent',
    marginRight: theme.spacing.sm,

    '&:hover': {
      textDecoration: 'none',
      opacity: 1,
      borderBottomColor: theme.colors.blue[7],
    },
  },
  
  mainLinkActive: {
    color: theme.colors.gray[1],
    opacity: 1,
    borderBottomColor: theme.colors.blue[7],
  },

  secondaryLink: {
    color: theme.colors.gray[1],
    opacity: 0.7,
    fontSize: theme.fontSizes.xs,
    transition: 'opacity 100ms ease',

    '&:hover': {
      textDecoration: 'none',
      opacity: 1,
    },
  },

}));

export const mainLinks = [
  {
    title: 'home', 
    url: '/'
  },
  {
    title: 'about',
    url: '/about'
  },
  {
    title: 'help',
    url: '/help'
  },
  {
    title: 'open source',
    url: '/open-source'
  }
];

const secLinks = [
  {
    title: 'license',
    url: '/license'
  },
  {
    title: 'privacy',
    url: '/privacy'
  },
  {
    title: 'bugs',
    url: '/report-bugs'
  },
];

interface LinkProps {
  title: string;
  url: string;
  className: string;
  onClick?: () => void;
}

const MainLink = ({ title, url, className, onClick }: LinkProps) => {
  return (
    <Link
      path={ url }
      className={ className }
      onClick={ onClick }
    >
      { title }
    </Link>
  );
}

const SecLink = ({ title, url, className, onClick }: LinkProps) => {
  return (
    <Link
      path={ url }
      className={ className }
      onClick={ onClick }
    >
      { title }
    </Link>
  );
}

const WebHeader = (props: Omit<HeaderProps, 'children'>) => {
  
  const [ activeLink, setActiveLink ] = useState(1000);
  const firstRender = useRef(true);
  const { classes, cx } = useStyles();
  const { status } = useAuth();
  const router = useRouter();
  const {
    isOpen,
    setIsOpen
  } = useContext(LayoutContext);

  useEffect(() => {
    if ( !firstRender.current ) return;
    switch( router.pathname ) {
      case '/': {
        setActiveLink(0);
        break;
      };
      case '/about': {
        setActiveLink(1);
        break;
      };
      case '/help': {
        setActiveLink(2);
        break;
      };
      case '/open-source': {
        setActiveLink(3);
        break;
      };
      default: {
        setActiveLink(100);
        break;
      }
    }

    firstRender.current = false;
  }, [ router ])

  return (
    <Header className={ classes.header } {...props}>
      <Container className={ classes.inner }>
        <Title order={3}>
          Secure File
        </Title>
        <div className={ classes.links }>
          <Group position='right' className={ classes.secondaryLink }>
            {
              secLinks.map(link => (<SecLink url={ link.url } key={ link.url } title={ link.title } className={ classes.secondaryLink } onClick={ () => { setActiveLink(100)}} />))
            }
          </Group>
          <Group spacing={0} position="right" className={classes.mainLinks}>
            {
              mainLinks.map(( link, index ) => (
                <MainLink 
                  title={ link.title }
                  url={ link.url }
                  onClick={ () => {
                    setActiveLink(index)
                  }}
                  className={ cx(classes.mainLink, { [classes.mainLinkActive]: index === activeLink }) }
                  key={ link.url }
                />
              ))
            }
            <Button 
              variant='light' sx={(theme) => ({ fontWeight: 'normal' })}
              onClick={ () => {
                const path =
                  status === 'authenticated' ? '/app' :
                  status === 'newUser' ? '/setup' :
                  status === 'unauthenticated' ? '/login' : '/'
                router.push(path);
              }}
              size='sm'
            >
              { 
                status === 'authenticated' ? 'App' :
                status === 'newUser' ? 'Setup' :
                status === 'unauthenticated' ? 'Login' : <Loader size='sm'/>
              }
            </Button>
          </Group>
        </div>
        <Burger
          opened={isOpen}
          onClick={() => setIsOpen(!isOpen)}
          title='Burger'
          className={ classes.burger }
        />
      </Container>
    </Header>
  );
};

export default WebHeader;