import Reset from '@/components/reset'
import { NextPage } from 'next';
import HeadDetails from '@/components/headDetails';

const ResetPage: NextPage = () => {
  return (
    <>
      <HeadDetails title='Reset Page' />
      <Reset />
    </>
  )
}

export default ResetPage