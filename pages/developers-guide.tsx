import { NextPage, GetStaticProps, InferGetStaticPropsType } from 'next';
import HeadDetails from '@/components/headDetails';
import Guide from '@/components/guide';

import readMarkdown from '@/utils/backend/readMarkdown';
import readFile from '@/utils/backend/readFile';

interface Props {
  info: string,
  markdownContent: string
}
const DevelopersGuide: NextPage<Props> = ({ markdownContent, info }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <HeadDetails title='Developer Guide' />
      <Guide title='Developer Guide' text={ info } markdownContent={ markdownContent } />
    </>
  )
}

export const getStaticProps:GetStaticProps = async () => {
  const textInfo = await readMarkdown('/guides/developers-guide.md');
  const markdownText = await readFile('/docs/self-hosting.md');

  return {
    props: {
      info: textInfo,
      markdownContent: markdownText
    }
  }
}


export default DevelopersGuide