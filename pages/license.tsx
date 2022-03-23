import { NextPage, GetStaticProps, InferGetStaticPropsType } from 'next';
import HeadDetails from '@/components/headDetails';
import readMarkdown from '@/utils/backend/readMarkdown';
import License from '@/components/license';

interface Props {
  markdownFile: string
}

const LicensePage: NextPage<Props> = ({ markdownFile }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <HeadDetails title='License' />
      <License htmlContent={ markdownFile }/>
    </>
  )
}

export const getStaticProps:GetStaticProps = async () => {
  const files = await readMarkdown('gpl-3.0.md');
  return {
    props: {
      markdownFile: files
    }
  }
}

export default LicensePage