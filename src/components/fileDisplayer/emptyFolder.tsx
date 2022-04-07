import { Text, Center, Title } from '@mantine/core';
import { IoAddCircle } from 'react-icons/io5';

const EmptyFolder = () => {
  return (
    <Center pt='md' sx={{ flexDirection: 'column', width: '100%' }}>
      <Title pb='sm' order={3}>
        This folder is Empty
      </Title>
      
      <Center sx={(theme) => ({ opacity: .7, flexWrap: 'wrap', [theme.fn.smallerThan('md')]: { justifyContent: 'flex-start' } })}>
        <Text mr='sm'>
          Click on  
        </Text>
        <IoAddCircle />
        <Text sx={(theme) => ({ [theme.fn.smallerThan('md')]: { width: '100%', margin: 0 } })} ml='sm'>
          button on the Top right of screen, to add new Files/Folders
        </Text>
      </Center>
    </Center>
  )
}

export default EmptyFolder;