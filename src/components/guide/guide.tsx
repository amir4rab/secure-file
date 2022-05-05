import { Loader, Title, TypographyStylesProvider, Center } from '@mantine/core';

import dynamic from 'next/dynamic';
const DynamicMarkdownProvider = dynamic(
  () => import('@/components/markdownProvider'),
  { loading: () => (<Center><Loader /></Center>) }
)

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
        markdownContent && <DynamicMarkdownProvider markdown={ markdownContent } />
      }
    </>
  )
}

export default Guide