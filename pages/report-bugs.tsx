import HeadDetails from '@/components/headDetails'
import ReportBugs from '@/components/reportBugs';
import { NextPage } from 'next';

const ReportBugsPage: NextPage = () => {
  return (
    <>
      <HeadDetails title='Bugs' />
      <ReportBugs />
    </>
  )
}

export default ReportBugsPage