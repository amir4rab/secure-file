import { NextPage, GetStaticProps, InferGetStaticPropsType } from 'next';
import HeadDetails from '@/components/headDetails';
import Guide from '@/components/guide';

import readMarkdown from '@/utils/backend/readMarkdown';
import readFile from '@/utils/backend/readFile';

interface Props {
  info: string,
  markdownContents: string[]
}
const DevelopersGuide: NextPage<Props> = ({ markdownContents, info }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <HeadDetails title='Developer Guide' />
      <Guide title='Developer Guide' text={ info } markdownContents={ markdownContents } />
    </>
  )
}

export const getStaticProps:GetStaticProps = async () => {
  const textInfo = await readMarkdown('/guides/developers-guide.md');
  
  const selfHosting = await readFile('/docs/self-hosting.md');
  const appBuilds = await readFile('/docs/app-builds.md');

  return {
    props: {
      info: textInfo,
      markdownContents: [ selfHosting, appBuilds ]
    }
  }
}


export default DevelopersGuide