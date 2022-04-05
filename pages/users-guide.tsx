import { NextPage, GetStaticProps, InferGetStaticPropsType } from 'next';
import HeadDetails from '@/components/headDetails';
import readMarkdown from '@/utils/backend/readMarkdown';
import Guide from '@/components/guide';

interface Props {
  markdownFile: string
}
const UsersGuide: NextPage<Props> = ({ markdownFile }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <HeadDetails title='Users Guide' />
      <Guide title='Users Guide' text={ markdownFile } />
    </>
  )
}

export const getStaticProps:GetStaticProps = async () => {
  const files = await readMarkdown('/guides/users-guide.md');
  return {
    props: {
      markdownFile: files
    }
  }
}


export default UsersGuide