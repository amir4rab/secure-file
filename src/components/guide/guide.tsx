import { Title, TypographyStylesProvider } from '@mantine/core';
import MarkdownProvider from '@/components/markdownProvider';

function Guide({ markdownContent, title, text }:{ markdownContent?: string, title: string, text: string }) {
  return (
    <>
      <Title order={1} pb='lg'>
        { title }
      </Title>
      <TypographyStylesProvider>
        <div dangerouslySetInnerHTML={{ __html: text }} />
      </TypographyStylesProvider>
      {
        markdownContent && <MarkdownProvider markdown={ markdownContent } />
      }
    </>
  )
}

export default Guide