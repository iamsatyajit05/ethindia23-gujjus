"use client"
import { useEffect, useState } from 'react';
import { useSDK } from '@metamask/sdk-react';
import { ABI } from './ABI';
import Web3 from 'web3';

const ConnectWalletButton = () => {
    const { sdk, connecting, account } = useSDK();

    const connect = async () => {
        console.log('Lag gayes');
        try {
            await sdk?.connect();
        } catch (err) {
            console.warn(`No accounts found`, err);
        }
    };

    return (
        <button className="font-medium cursor-pointer rounded-lg text-sm px-5 py-2.5 bg-blue-500 text-white hover:bg-blue-700 transition active:scale-95" disabled={connecting || account} onClick={connect}>
            {account ? `${account.substring(0, 5)}....${account.substring(account.length - 4)}` : 'Connect Wallet'}
        </button>
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

                    const contractAddress = '0x5Aefe4d7391379c0D0Ad24eb6B18b8F173872790';
                    const contractABI = ABI;

                    const contract = new window.web3.eth.Contract(contractABI, contractAddress);

                    const totalStaked = await contract.methods.totalStakedAmount.call().call();

                    console.log("totalStaked:", totalStaked);

                    setTotalStakedAmount(totalStaked);
                } catch (error) {
                    console.error('Error fetching totalStakedAmount:', error);
                    toast.error("Something went wrong!");
                }

                try {
                    await window.ethereum.enable();
                    const accounts = await window.web3.eth.getAccounts();

                    const contractAddress = '0x5Aefe4d7391379c0D0Ad24eb6B18b8F173872790';
                    const contractABI = ABI;

                    const contract = new window.web3.eth.Contract(contractABI, contractAddress);

                    const allAddresses = await contract.methods.totalStaker.call().call();

                    console.log("allAddresses:", allAddresses);

                    setTotalStaker(allAddresses);
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
        <main className="max-w-7xl m-auto flex justify-between pt-12">
            <div>
                <p className='text-2xl'>LEONIDA CASINO</p>
                <p className='text-9xl font-black'>{totalStakedAmount ? totalStakedAmount : '0'} MATIC</p>
                <p className='text-2xl'>STAKED BY {totalStaker ? totalStaker : '0'} ROCKERS</p>
            </div>
            <div>
                <ConnectWalletButton />
            </div>
        </main>
    )
}