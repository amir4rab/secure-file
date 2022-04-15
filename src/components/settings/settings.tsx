import React, { ChangeEventHandler, useState } from 'react';
import { Title, Input, UnstyledButton, Group, Text, ThemeIcon, MantineTheme, CSSObject, Box, MediaQuery, Center } from '@mantine/core';
import { IoSearch, IoPerson, IoGlobe, IoLogoGithub, IoInformation, IoHelpBuoy, IoSad } from 'react-icons/io5';
import { useRouter } from 'next/router';

const buttonStyle: (theme:MantineTheme) => CSSObject = (theme) => ({
  width: '100%', backgroundColor: theme.colors.dark[5], borderRadius: theme.radius.md, padding: theme.spacing.md, transition: 'background .15s ease-in-out',
  '&:hover, &:focus-visible': { backgroundColor: theme.colors.dark[4] },
  '&:active': { backgroundColor: theme.colors.dark[3] },
  '&:not(:last-child)': { marginBottom: '.75rem' }
});

const generatePastelColors = (hue: number) => 'hsl(' + hue + ', 100%, 87.5%)';

type SettingsArray = {
  name: string,
  path: string,
  about: string,
  icon: JSX.Element,
  color: string,
  tags: string[]
}[]
const settingsArray: SettingsArray = [
  {
    name: 'Account',
    path: '/app/settings/account',
    about: 'Local accounts settings',
    icon: <IoPerson />,
    color: generatePastelColors(250),
    tags: [ 'reset-account', 'logout', 'change-name', 'account' ]
  },
  {
    name: 'Connect',
    path: '/app/settings/connect',
    about: 'Connect server config',
    icon: <IoGlobe />,
    color: generatePastelColors(150),
    tags: [ 'connect-server', 'connect' ]
  },
  {
    name: 'Help',
    path: '/help',
    about: 'Having any problem check here',
    icon: <IoHelpBuoy />,
    color: generatePastelColors(200),
    tags: [ 'help', 'trouble-shooting' ]
  },
  {
    name: 'Source code',
    path: '/open-source',
    about: 'Secure file source code',
    icon: <IoLogoGithub />,
    color: generatePastelColors(50),
    tags: [ 'source-code', 'github', 'open-source' ]
  },
  {
    name: 'About',
    path: '/about',
    about: 'About secure code',
    icon: <IoInformation />,
    color: generatePastelColors(300),
    tags: [ 'about' ]
  }
];

function Settings() {
  const [ filteredSettings, setFilteredOptions ] = useState< SettingsArray >(settingsArray);
  const [ searchInputValue, setSearchInputValue ] = useState< string >('');

  const router = useRouter();

  const filterSetting: ChangeEventHandler< HTMLInputElement > = ( e ) => {
    setSearchInputValue(e.target?.value)
    if ( e.target?.value.length === 0 ) {
      setFilteredOptions(settingsArray)
      return;
    }

    const filteredArray = settingsArray.filter(element => {
      const stringTags = element.tags.toString();
      if( stringTags.includes( e.target?.value.toLocaleLowerCase().replaceAll(' ', '-') ) ) return element;
    });
    setFilteredOptions(filteredArray)
  }

  return (
    <div>
      <Center sx={(theme) => ({ justifyContent: 'space-between', marginBottom: theme.spacing.md, [`@media(max-width:${theme.breakpoints.md}px)`]: { flexDirection: 'column', alignItems: 'flex-start' }})}>
        <Title order={1}>
          Settings
        </Title>
        <Input
          sx={(theme) => ({ [`@media(max-width:${theme.breakpoints.md}px)`]: { width: '100%', marginTop: theme.spacing.sm }})}
          icon={<IoSearch />}
          placeholder="Search"
          radius="xl"
          onChange={ filterSetting }
        />
      </Center>
      <Box my='md'>
        {
          filteredSettings.map(item => (
            <UnstyledButton key={item.path} sx={buttonStyle} onClick={() => router.push(item.path)}>
              <Group>
                <ThemeIcon radius="md" size="xl" sx={(theme) => ({ backgroundColor: item.color, color: theme.colors.dark[7] })}>
                  { item.icon }
                </ThemeIcon>
                <div>
                  <Text size='xl'>{ item.name }</Text>
                  <MediaQuery smallerThan='md' styles={{ display: 'none' }}>
                    <Text size='xs' color='gray'>{ item.about }</Text>
                  </MediaQuery>
                </div>
              </Group>
            </UnstyledButton>
          ))
        }
        {
          filteredSettings.length === 0 ?
          <Center my='md' sx={{ flexDirection: 'column' }}>
            <IoSad style={{ fontSize: '2rem', marginBottom: '1rem' }} />
            <Text>
              {`Sorry, we could'nt found anything with "${ searchInputValue }"!`}
            </Text>
          </Center>
          : null
        }
      </Box>
    </div>
  )
}

export default Settings