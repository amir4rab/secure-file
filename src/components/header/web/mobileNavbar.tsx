import { useContext } from 'react'
import { AppShell, Navbar, Center, MediaQuery, NavbarProps } from '@mantine/core';
import { LayoutContext } from '@/layouts/layout.provider';
import Link from '@/components/link';


function MobileNavbar(props: Omit<NavbarProps, 'children'>) {
  const {
    isOpen,
    setIsOpen
  } = useContext(LayoutContext);

  const afterClick = () => {
    setIsOpen(false);
  }

  return (
    <MediaQuery largerThan='sm' styles={{ display: 'none' }}>
      <Navbar
        {...props}
        hiddenBreakpoint="lg"
        hidden={!isOpen}
        width={{ sm: '100%' }}
      >
        <Center sx={{ height: '50%', margin: 'auto', flexDirection: 'column' }}>
          <Link onClick={ afterClick } sx={{ ':not(:last-child)':{ marginBottom: '5vh' }, fontSize: '1.25rem' }} path='/'>
            Home
          </Link>
          <Link onClick={ afterClick } sx={{ ':not(:last-child)':{ marginBottom: '5vh' }, fontSize: '1.25rem' }} path='/about'>
            About
          </Link>
          <Link onClick={ afterClick } sx={{ ':not(:last-child)':{ marginBottom: '5vh' }, fontSize: '1.25rem' }} path='/app'>
            App
          </Link>
        </Center>
      </Navbar>
    </MediaQuery>
  )
}

export default MobileNavbar