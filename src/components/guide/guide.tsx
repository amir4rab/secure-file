import { Title, TypographyStylesProvider } from '@mantine/core';

function Guide({ markdownContent, title }:{ markdownContent: string, title: string }) {
  return (
    <>
      <Title order={1} pb='lg'>
        { title }
      </Title>
      <TypographyStylesProvider>
        <div dangerouslySetInnerHTML={{ __html: markdownContent }} />
      </TypographyStylesProvider>
    </>
  )
}

export default Guide