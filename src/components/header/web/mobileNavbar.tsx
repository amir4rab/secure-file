import { useContext } from 'react'
import { Transition, Navbar, Center, MediaQuery, NavbarProps, createStyles, Button, Loader } from '@mantine/core';
import { LayoutContext } from '@/layouts/layout.provider';
import Link from '@/components/link';
import useAuth from '@/hooks/useAuth';
import { useRouter } from 'next/router';
import { mainLinks } from './webHeader'

const useStyles = createStyles((theme) => ({
  link: {
    ':not(:last-child)':{ marginBottom: '5vh' },
    fontSize: '1rem'
  }
}));

function MobileNavbar(props: Omit<NavbarProps, 'children'>) {
  const { status } = useAuth();
  const router = useRouter();
  const {
    isOpen,
    setIsOpen
  } = useContext(LayoutContext);
  const { classes } = useStyles();

  const afterClick = () => {
    setIsOpen(false);
  }

  return (
    <Transition mounted={isOpen} transition='slide-right' duration={400} timingFunction="ease">
        {
          (styles) => ( 
            <MediaQuery largerThan='sm' styles={{ display: 'none' }}>
              <Navbar
                {...props}
                hiddenBreakpoint="lg"
                hidden={false}
                style={styles}
                width={{ sm: '100%' }}
              >
                <Center sx={{ height: '100%', margin: 'auto', flexDirection: 'column' }}>
                  <Link onClick={ afterClick } className={ classes.link } path='/'>
                    Home
                  </Link>
                  <Link onClick={ afterClick } className={ classes.link } path='/about'>
                    About
                  </Link>
                  {
                    mainLinks.map(link => (
                      <Link onClick={ afterClick } className={ classes.link } path={ link.url } key={ link.url }>
                        { link.title }
                      </Link>
                    ))
                  }
                  <Button 
                    variant='light' sx={(theme) => ({ fontWeight: 'normal' })}
                    onClick={ async () => {
                      const path =
                        status === 'authenticated' ? '/app' :
                        status === 'newUser' ? '/setup' :
                        status === 'unauthenticated' ? '/login' : '/'
                      await router.push(path);
                      setIsOpen(false);
                    }}
                    size='lg'
                  >
                    { 
                      status === 'authenticated' ? 'App' :
                      status === 'newUser' ? 'Setup' :
                      status === 'unauthenticated' ? 'Login' : <Loader size='sm'/>
                    }
                  </Button>
                </Center>
              </Navbar>
            </MediaQuery>
          )
        }
      </Transition>
  )
}

export default MobileNavbar