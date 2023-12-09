"use client"
import { useEffect, useState } from 'react';
import { useSDK } from '@metamask/sdk-react';
import { ABI, smartContractAddress } from './ABI';
import Web3 from 'web3';

const ConnectWalletButton = () => {
    const { sdk, connecting, account, disconnect } = useSDK();
    const [showLogout, setShowLogout] = useState(false);
    
    const connect = async () => {
        try {
            await sdk?.connect();
        } catch (err) {
            console.warn(`No accounts found`, err);
        }
    };

    const handleMouseEnter = () => {
        setShowLogout(true);
    };

    const handleMouseLeave = () => {
        setShowLogout(false);
    };

    const handleLogout = async () => {
        try {
            await sdk?.terminate();
        } catch (err) {
            console.warn(`Issue in logout`, err);
        }
    };

    return (
        <div className="h-14 relative" onMouseOver={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <button
                className="font-medium cursor-pointer rounded-lg text-sm px-5 py-2.5 bg-blue-500 text-white hover:bg-blue-700 transition active:scale-95"
                disabled={connecting || account}
                onClick={connect}               
            >
                {account ? `${account.substring(0, 5)}....${account.substring(account.length - 4)}` : 'Connect Wallet'}
            </button>

            {showLogout && account && (
                <button
                    className="absolute top-5 right-0 mt-8 mr-5 font-medium cursor-pointer rounded-lg text-sm px-5 py-2.5 bg-red-500 text-white hover:bg-red-700 transition active:scale-95"
                    onClick={handleLogout}
                >
                    Logout
                </button>
            )}
        </div>
    )
}

export default function Header() {
    const [totalStakedAmount, setTotalStakedAmount] = useState(0);
    const [totalStaker, setTotalStaker] = useState(0);
    const { account } = useSDK();

    useEffect(() => {
        const fetchTotalStakedAmount = async () => {
            if (window.ethereum) {
                window.web3 = new Web3(window.ethereum);
                try {
                    await window.ethereum.enable();
                    const accounts = await window.web3.eth.getAccounts();

                    const contractAddress = smartContractAddress;
                    const contractABI = ABI;

                    const contract = new window.web3.eth.Contract(contractABI, contractAddress);

                    const totalStaked = await contract.methods.totalStakedAmount.call().call();
                    const totalStakedInEther = web3.utils.fromWei(totalStaked, 'ether');

                    console.log("totalStaked:", totalStaked);

                    setTotalStakedAmount(totalStakedInEther);
                } catch (error) {
                    console.error('Error fetching totalStakedAmount:', error);
                    toast.error("Something went wrong!");
                }

                try {
                    console.log('lets go');
                    await window.ethereum.enable();
                    const accounts = await window.web3.eth.getAccounts();

                    const contractAddress = smartContractAddress;
                    const contractABI = ABI;

                    const contract = new window.web3.eth.Contract(contractABI, contractAddress);

                    const allAddresses = await contract.methods.totalStaker.call().call();

                    console.log("allAddresses:", allAddresses);

                    setTotalStaker(parseInt(allAddresses));
                } catch (error) {
                    console.error('Error fetching allAddresses:', error);
                    toast.error("Something went wrong!");
                }
            } else {
                console.error('Web3 not detected. Please install MetaMask.');
                toast.error("Please install MetaMask.");
            }
        };

        fetchTotalStakedAmount();
    }, []);

    return (
        <main className="max-w-4xl m-auto pt-12">
            <div className='flex justify-between '>
                <p className='text-2xl'>LEONIDA CASINO</p>
                <ConnectWalletButton />
            </div>
            <div>
                <p className='text-9xl font-black'>{totalStakedAmount ? totalStakedAmount : '0'} MATIC</p>
                <p className='text-2xl'>STAKED BY {totalStaker ? totalStaker : '0'} ROCKERS</p>
            </div>
        </main>
    )
}