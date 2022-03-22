import Link from '@/components/link';
import { HeaderProps, Header, Center, Title, MediaQuery, Container, Burger, Loader } from '@mantine/core';
import { useContext } from 'react'
import { LayoutContext } from '@/layouts/layout.provider';
import useAuth from '@/hooks/useAuth';

const WebHeader = (props: Omit<HeaderProps, 'children'>) => {
  const { status } = useAuth();
  const {
    isOpen,
    setIsOpen
  } = useContext(LayoutContext);

  return (
    <Header {...props}>
      <Container sx={{ justifyContent: 'space-between', alignItems: 'center', alignContent: 'center', display: 'flex', height: '100%' }}>
        <Title order={3}>
          Secure File
        </Title>
          <MediaQuery smallerThan="md" styles={{ display: 'none' }}>
            <Center>
              <Link sx={{ ':not(:last-child)':{ marginRight: '2vw' } }} path='/'>
                Home
              </Link>
              <Link sx={{ ':not(:last-child)':{ marginRight: '2vw' } }} path='/about'>
                About
              </Link>
              <Link 
                sx={{ ':not(:last-child)':{ marginRight: '2vw' } }} 
                path={ 
                  status === 'authenticated' ? '/app' :
                  status === 'newUser' ? '/setup' :
                  status === 'unauthenticated' ? '/login' : '/'
                }
              >
                { 
                  status === 'authenticated' ? 'App' :
                  status === 'newUser' ? 'Setup' :
                  status === 'unauthenticated' ? 'Login' : <Loader size='sm'/>
                }
              </Link>
            </Center>
          </MediaQuery>
          <MediaQuery largerThan="md" styles={{ display: 'none' }}>
            <Burger
              opened={isOpen}
              onClick={() => setIsOpen(!isOpen)}
              title='Burger'
            />
          </MediaQuery>
      </Container>
    </Header>
  );
};

export default WebHeader;