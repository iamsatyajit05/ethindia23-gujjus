"use client"
import { useEffect, useState } from 'react';
import Image from 'next/image'
import Stake from './components/Stake';
import Waves from './components/Waves';
import Header from './components/Header';
import Footer from './components/Footer';
const ethers = require("ethers");
import { useSDK, MetaMaskProvider } from '@metamask/sdk-react';
import { Toaster } from 'react-hot-toast';

// const provider = new ethers.BrowserProvider(window.ethereum);

export default function Home() {
  const [userAddress, setUserAddress] = useState('');

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
        <div className='space-y-8'>
          <Header />
          <Stake />
          {/* <Waves /> */}
        </div>
        <Footer />
      </MetaMaskProvider>
    </>
  )
}