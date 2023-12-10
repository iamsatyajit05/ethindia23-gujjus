"use client"
import Stake from './components/Stake';
import Header from './components/Header';
import Footer from './components/Footer';
import { MetaMaskProvider } from '@metamask/sdk-react';
import { Toaster } from 'react-hot-toast';

// const provider = new ethers.BrowserProvider(window.ethereum);

export default function Home() {

  const host = typeof window !== "undefined" ? window.location.host : "defaultHost";
  const sdkOptions = {
    logging: { developerMode: false },
    checkInstallationImmediately: false,
    dappMetadata: {
      name: "Next-Metamask-Boilerplate",
      url: host,
    },
  };

  return (
    <>
      <MetaMaskProvider debug={false} sdkOptions={sdkOptions}>
        <Toaster
          position="top-center"
          reverseOrder={false}
        />
        <div className='sm:space-y-8'>
          <Header />
          <Stake />
          {/* <Waves /> */}
        </div>
        <Footer />
      </MetaMaskProvider>
    </>
  )
}