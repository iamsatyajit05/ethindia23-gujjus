import Image from 'next/image'
import Stake from './components/Stake';
import Waves from './components/Waves';
import Header from './components/Header';

export default function Home() {
  return (
    <>
      {/* <Hero /> */}
      <div className='w-screen h-screen space-y-8'>
        <Header />
        <Stake />
        {/* <Waves /> */}
      </div>
    </>
  )
}