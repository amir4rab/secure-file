import HeadDetails from '@/components/headDetails'
import Help from '@/components/help'
import { NextPage } from 'next';

const HelpPage: NextPage = () => {
  return (
    <>
      <HeadDetails title='help' />
      <Help />
    </>
  )
}

export default HelpPage