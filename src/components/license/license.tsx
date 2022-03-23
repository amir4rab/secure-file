import { Box, TypographyStylesProvider, Title, Group } from '@mantine/core'
import { SiGnu } from 'react-icons/si'

interface Props { 
  htmlContent: string
}
function License({ htmlContent }: Props) {
  return (
    <Box>
      <Group>
        <SiGnu style={{ fontSize: '2rem' }}/>
        <Title order={ 1 }>License</Title>
      </Group>
      <TypographyStylesProvider>
        <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
      </TypographyStylesProvider>
    </Box>
  )
}

export default License