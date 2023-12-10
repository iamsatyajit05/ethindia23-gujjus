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
        <div className="h-14 relative mx-auto sm:m-0" onMouseOver={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <button
                className="font-medium cursor-pointer rounded-lg text-sm px-5 py-2.5 bg-[#E964AC] text-white hover:bg-[#DF5E9A] transition active:scale-95"
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
        <main className="max-w-4xl p-12 sm:p-8 md:p-0 mx-auto">
            <div className='flex flex-col sm:flex-row justify-between space-y-4 sm:space-y-0 sm:pt-12'>
                <p className='flex flex-col items-center sm:flex-row sm:items-baseline space-x-0 sm:space-x-2 text-center sm:text-left'><span className='text-2xl'>LEONIDA CASINO</span><span>Predict GTA 6 Launch! Win Jackpot! Eazy!</span></p>
                <ConnectWalletButton />
            </div>
            <div>
                <p className='text-5xl sm:text-7xl md:text-9xl font-black'>{totalStakedAmount ? totalStakedAmount : '0'} MATIC</p>
                <p className='text-lg sm:text-2xl'>STAKED BY {totalStaker ? totalStaker : '0'} ROCKERS</p>
            </div>
        </main>
    )
}