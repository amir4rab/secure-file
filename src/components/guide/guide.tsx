import { Loader, Title, TypographyStylesProvider, Center, Space } from '@mantine/core';

import dynamic from 'next/dynamic';
const DynamicMarkdownProvider = dynamic(
  () => import('@/components/markdownProvider'),
  { loading: () => (<Center><Loader /></Center>) }
)

function Guide({ markdownContents= [], title, text }:{ markdownContents?: string[], title: string, text: string }) {
  return (
    <>
      <Title order={1} pb='lg'>
        { title }
      </Title>
      <TypographyStylesProvider>
        <div dangerouslySetInnerHTML={{ __html: text }} />
      </TypographyStylesProvider>
      {
        markdownContents.map((content, i) => (
          <div key={ i }>
            <DynamicMarkdownProvider markdown={ content } />
            <Space h='xl' />
          </div>
        ))
      }
    </>
  )
}

export default Guide