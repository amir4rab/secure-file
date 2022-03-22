import { useContext } from 'react'
import { Transition, Navbar, Center, MediaQuery, NavbarProps } from '@mantine/core';
import { LayoutContext } from '@/layouts/layout.provider';
import Link from '@/components/link';
import useAuth from '@/hooks/useAuth';


function MobileNavbar(props: Omit<NavbarProps, 'children'>) {
  const { status } = useAuth();
  const {
    isOpen,
    setIsOpen
  } = useContext(LayoutContext);

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
                <Center sx={{ height: '50%', margin: 'auto', flexDirection: 'column' }}>
                  <Link onClick={ afterClick } sx={{ ':not(:last-child)':{ marginBottom: '5vh' }, fontSize: '1.25rem' }} path='/'>
                    Home
                  </Link>
                  <Link onClick={ afterClick } sx={{ ':not(:last-child)':{ marginBottom: '5vh' }, fontSize: '1.25rem' }} path='/about'>
                    About
                  </Link>
                  <Link 
                    onClick={ afterClick } sx={{ ':not(:last-child)':{ marginBottom: '5vh' }, fontSize: '1.25rem' }}
                    path={ 
                      status === 'authenticated' ? '/app' :
                      status === 'newUser' ? '/setup' :
                      status === 'unauthenticated' ? '/login' : '/'
                    }
                  >
                    { 
                      status === 'authenticated' ? 'App' :
                      status === 'newUser' ? 'Setup' :
                      status === 'unauthenticated' ? 'Login' : 'Loading'
                    }
                  </Link>
                </Center>
              </Navbar>
            </MediaQuery>
          )
        }
      </Transition>
  )
}

export default MobileNavbar