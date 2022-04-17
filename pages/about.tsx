import About from '@/components/about';
import HeadDetails from '@/components/headDetails'
import { NextPage } from 'next';

const AboutPage: NextPage = () => {
  return (
    <>
      <HeadDetails title='About' />
      <About />
    </>
  )
}

export default AboutPage