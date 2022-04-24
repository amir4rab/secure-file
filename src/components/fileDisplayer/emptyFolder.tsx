import { Text, Center, Title } from '@mantine/core';
import useTranslation from 'next-translate/useTranslation';
import { IoAddCircle } from 'react-icons/io5';

const EmptyFolder = () => {
  const { t } = useTranslation('file-displayer');

  return (
    <Center pt='md' sx={{ flexDirection: 'column', width: '100%' }}>
      <Title pb='sm' order={3}>
        { t('emptyFolder') }
      </Title>
      
      <Center sx={(theme) => ({ opacity: .7, flexWrap: 'wrap', [theme.fn.smallerThan('md')]: { justifyContent: 'flex-start' } })}>
        <Text mr='sm'>
          { t('addHelpPrompt1') }
        </Text>
        <IoAddCircle />
        <Text sx={(theme) => ({ [theme.fn.smallerThan('md')]: { width: '100%', margin: 0 } })} ml='sm'>
          { t('addHelpPrompt2') }
        </Text>
      </Center>
    </Center>
  )
}

export default EmptyFolder;