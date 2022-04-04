import { NextPage, GetStaticProps, InferGetStaticPropsType } from 'next';
import HeadDetails from '@/components/headDetails';
import readMarkdown from '@/utils/backend/readMarkdown';
import Guide from '@/components/guide';

interface Props {
  markdownFile: string
}
const DevelopersGuide: NextPage<Props> = ({ markdownFile }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <HeadDetails title='Developer Guide' />
      <Guide title='Developer Guide' markdownContent={ markdownFile } />
    </>
  )
}

export const getStaticProps:GetStaticProps = async () => {
  const files = await readMarkdown('/guides/developers-guide.md');
  return {
    props: {
      markdownFile: files
    }
  }
}


export default DevelopersGuide