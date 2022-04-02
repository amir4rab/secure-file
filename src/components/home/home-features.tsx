import { Center, Title, Text, SimpleGrid, ThemeIcon, Box, TypographyStylesProvider } from '@mantine/core';
import { IoCodeSlash, IoLogoEuro, IoEyeOff, IoLockClosed, IoHardwareChip } from 'react-icons/io5';

const featuresArray = [
  {
    title: 'Open source',
    text: '<span>Secure File is fully open source and source code is accessible for every one</span>',
    icon: <IoCodeSlash />
  },
  {
    title: 'Free',
    text: '<span>Secure File is completely free for every one.</span>',
    icon: <IoLogoEuro />
  },
  {
    title: 'Private',
    text: '<span>Secure File is completely private, there are no trackers or data collection scripts included.</span>',
    icon: <IoEyeOff />
  },
  {
    title: 'Secure',
    text: '<span>Your data is completely encrypted!</span>',
    icon: <IoLockClosed />
  },
  {
    title: 'Fast',
    text: '<span>Secure File is multi threaded, therefore performance will be great on most of systems</span>',
    icon: <IoHardwareChip />
  }
];

interface FeaterProp {
  title: string;
  text: string;
  icon: JSX.Element;
}
const Feater = ( { icon, text, title }: FeaterProp ) => {
  return (
    <Box p='md'>
      <ThemeIcon my='md' variant="light" radius="xl" size="xl">
        { icon }
      </ThemeIcon>
      <Text pb='sm'>
        { title }
      </Text>
      <Text sx={(theme) => ({ opacity: .7, [theme.fn.smallerThan('md')]: { fontSize: theme.fontSizes.xs } })}>
        <TypographyStylesProvider>
          <div dangerouslySetInnerHTML={{ __html: text }} />
        </TypographyStylesProvider>
      </Text>
    </Box>
  )
}

function HomeFeatures() {
  return (
    <Center py='lg' sx={{ flexDirection: 'column', minHeight: '100vh', width: '100%' }}>
      <Title align='center' order={2} sx={(theme) => ({ fontWeight: '600', [theme.fn.largerThan('md')]: { fontSize: theme.fontSizes.xl * 1.5 }})}>
        Secure File is more than you think
      </Title>
      <Text py='xl'>
        Some of Secure File Features
      </Text>
      <SimpleGrid pt='xl' cols={3} spacing='xl' breakpoints={[{ maxWidth: 'md', cols: 2 },{ maxWidth: 'sm', cols: 1 }]}>
        {
          featuresArray.map(({ icon, text, title }) => (
            <Feater icon={ icon }  text={ text } title={ title }  key={ title }/>
          ))
        }
      </SimpleGrid>
    </Center>
  )
}

export default HomeFeatures