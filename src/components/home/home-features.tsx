import { Center, Title, Text, SimpleGrid, ThemeIcon, Box, TypographyStylesProvider } from '@mantine/core';
import { IoCodeSlash, IoLogoEuro, IoEyeOff, IoLockClosed, IoHardwareChip } from 'react-icons/io5';
import useTranslation from '@/translation/useTranslation';;

const featuresArray = [
  {
    title: 'openSource',
    text: 'openSourceText',
    icon: <IoCodeSlash />
  },
  {
    title: 'free',
    text: 'freeText',
    icon: <IoLogoEuro />
  },
  {
    title: 'private',
    text: 'privateText',
    icon: <IoEyeOff />
  },
  {
    title: 'secure',
    text: 'secureText',
    icon: <IoLockClosed />
  },
  {
    title: 'fast',
    text: 'fastText',
    icon: <IoHardwareChip />
  }
];

interface FeaterProp {
  title: string;
  text: string;
  icon: JSX.Element;
}
const Feater = ( { icon, text, title }: FeaterProp ) => {
  const { t } = useTranslation('home');

  return (
    <Box p='md'>
      <ThemeIcon my='md' variant="light" radius="xl" size="xl">
        { icon }
      </ThemeIcon>
      <Text pb='sm'>
        { t(title) }
      </Text>
      <Text sx={(theme) => ({ opacity: .7, [theme.fn.smallerThan('md')]: { fontSize: theme.fontSizes.xs } })}>
        <TypographyStylesProvider>
          <div dangerouslySetInnerHTML={{ __html: `<span>${t(text)}</span>` }} />
        </TypographyStylesProvider>
      </Text>
    </Box>
  )
}

function HomeFeatures() {
  const { t } = useTranslation('home');

  return (
    <Center py='lg' sx={{ flexDirection: 'column', minHeight: '100vh', width: '100%' }}>
      <Title align='center' order={2} sx={(theme) => ({ fontWeight: 600, [theme.fn.largerThan('md')]: { fontSize: theme.fontSizes.xl * 1.5 }})}>
        { t('featureTitle') }
      </Title>
      <Text py='xl'>
        { t('featureSubtitle') }
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