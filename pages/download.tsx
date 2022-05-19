import HeadDetails from '@/components/headDetails'
import { GetStaticProps, NextPage } from 'next';

import Download from '@/components/download';
import { GhReleases } from '@/types/ghReleases';
import getReleases from '@/utils/backend/getReleases';


interface Props {
  releases: GhReleases;
}
const DownloadPage: NextPage< Props > = ({ releases }) => {
  return (
    <>
      <HeadDetails title='Download' />
      <Download releases={ releases }/>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {

  const data = await getReleases();

  return {
    props: {
      releases: data !== null ? data : [] as GhReleases
    },
    revalidate: 60
  }
}

export default DownloadPage