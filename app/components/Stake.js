"use client"
import { useEffect, useState } from 'react';
import { useSDK } from '@metamask/sdk-react';
import toast from 'react-hot-toast';
import { ABI, smartContractAddress } from './ABI';
import Web3 from 'web3';

export default function Stake() {
    const fixedStakeAmount = 0.1;

    const { account } = useSDK();
    const [stakeWeek, setStakeWeek] = useState('');
    const [isAlreadyStaked, setIsAlreadyStaked] = useState(false);
    const [stakedAmount, setStakedAmount] = useState(false);
    const [predictWeek, setPredictWeek] = useState(false);
    const [totalStakedAmount, setTotalStakedAmount] = useState(0);
    const [isWithdrawn, setIsWithdrawn] = useState(false);
    const [isDateAnnounced, setIsDateAnnounced] = useState(false);
    const [rewardAmount, setRewardAmount] = useState(0);

    const alreadyStakedChecked = async () => {
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum);
            try {
                await window.ethereum.enable();
                const accounts = await window.web3.eth.getAccounts();

                const contractAddress = smartContractAddress;
                const contractABI = ABI;

                const contract = new window.web3.eth.Contract(contractABI, contractAddress);

                const totalStaked = await contract.methods.getStakeInfo(accounts[0]).call();

                console.log("alreadyStakedChecked:", totalStaked);

                const stakedInEther = web3.utils.fromWei(totalStaked.stakedAmount, 'ether');

                setStakedAmount(stakedInEther);
                setPredictWeek(parseInt(totalStaked.predictWeek));
                setIsAlreadyStaked(totalStaked.stakedAmount && totalStaked.predictWeek);
            } catch (error) {
                console.error('Error fetching alreadyStakedChecked:', error);
                toast.error("Something went wrong!");
            }
        } else {
            console.error('Web3 not detected. Please install MetaMask.');
            toast.error("Please install MetaMask.");
        }
    };

    const checkDateAnnounced = async () => {
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum);
            try {
                await window.ethereum.enable();
                const accounts = await window.web3.eth.getAccounts();

                const contractAddress = smartContractAddress;
                const contractABI = ABI;

                const contract = new window.web3.eth.Contract(contractABI, contractAddress);

                const launchWeek = await contract.methods.finalLaunchWeek.call().call();

                console.log("launchWeek:", launchWeek, launchWeek ? true : false);

                setIsDateAnnounced(launchWeek ? true : false);
            } catch (error) {
                console.error('Error fetching checkDateAnnounced:', error);
                toast.error("Something went wrong!");
            }
        } else {
            console.error('Web3 not detected. Please install MetaMask.');
            toast.error("Please install MetaMask.");
        }
    };

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
        } else {
            console.error('Web3 not detected. Please install MetaMask.');
            toast.error("Please install MetaMask.");
        }
    };

    const calculateReward = async () => {
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum);
            try {
                await window.ethereum.enable();
                const accounts = await window.web3.eth.getAccounts();

                const contractAddress = smartContractAddress;
                const contractABI = ABI;

                const contract = new window.web3.eth.Contract(contractABI, contractAddress);

                const reward = await contract.methods.calculateReward(accounts[0]).call();
                const rewardInEther = web3.utils.fromWei(reward['1'], 'ether');

                console.log("calculateReward:", rewardInEther);

                setRewardAmount(rewardInEther)
            } catch (error) {
                console.error('Error fetching calculateReward:', error);
                toast.error("Something went wrong!");
            }
        } else {
            console.error('Web3 not detected. Please install MetaMask.');
            toast.error("Please install MetaMask.");
        }
    };

    const setDate = async () => {
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum);
            try {
                await window.ethereum.enable();
                const accounts = await window.web3.eth.getAccounts();

                const contractAddress = smartContractAddress;
                const contractABI = ABI;

                const contract = new window.web3.eth.Contract(contractABI, contractAddress);

                const owner = await contract.methods.owner.call().call();
                console.log(owner == accounts[0]);
                const reward = await contract.methods.setFinalLaunchWeek(19).call();

                console.log("setdate:", reward);
            } catch (error) {
                console.error('Error fetching setDate:', error);
                toast.error("Something went wrong!");
            }
        } else {
            console.error('Web3 not detected. Please install MetaMask.');
            toast.error("Please install MetaMask.");
        }
    };

    const checkAlreadyWithdraw = async () => {
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum);
            try {
                await window.ethereum.enable();
                const accounts = await window.web3.eth.getAccounts();

                const contractAddress = smartContractAddress;
                const contractABI = ABI;

                const contract = new window.web3.eth.Contract(contractABI, contractAddress);

                const status = await contract.methods.getAlreadyWithdrawn(accounts[0]).call();

                console.log("checkAlreadyWithdraw:", status);
                setIsWithdrawn(status)
            } catch (error) {
                console.error('Error fetching checkAlreadyWithdraw:', error);
                toast.error("Something went wrong!");
            }
        } else {
            console.error('Web3 not detected. Please install MetaMask.');
            toast.error("Please install MetaMask.");
        }
    }

    useEffect(() => {
        alreadyStakedChecked();

        checkDateAnnounced();

        fetchTotalStakedAmount();

        calculateReward();

        checkAlreadyWithdraw();
    }, []);

    const stakeAmount = async () => {
        toast('Transaction is pending...', {
            icon: '⌛',
        });

        const [predictYear, predictWeek] = stakeWeek.split('-W');
        if (isAlreadyStaked) {
            toast.error("You have staked, Already!");
            return;
        }

        if (account) { } else {
            toast.error("Connect Wallet First!");
            return;
        }

        if (stakeWeek.length == 0) {
            toast.error("Select the week before staking!");
            return;
        }

        if (predictYear != 2025) {
            toast.error("Year must be 2025!");
            return;
        }

        console.log('Predict Date:', predictYear, predictWeek);

        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum);
            try {
                await window.ethereum.enable();
                const accounts = await window.web3.eth.getAccounts();
                const account = accounts[0];

                const contractAddress = '0xEDf85CF5996b97c2c966eE68711b18560EeC7034';
                const contractABI = ABI;

                const gasPrice = await web3.eth.getGasPrice();
                const gasLimit = 300000;

                const amountToSend = web3.utils.toWei(fixedStakeAmount, 'ether');

                const contract = new window.web3.eth.Contract(contractABI, contractAddress);

                const transactionObject = {
                    from: account,
                    to: contractAddress,
                    gasPrice,
                    gas: gasLimit,
                    value: amountToSend,
                    data: contract.methods.stake(predictWeek).encodeABI(),
                };

                console.log("AMOUNT:", amountToSend);

                const receipt = await web3.eth.sendTransaction(transactionObject);

                if (parseInt(receipt.status) === 1) {
                    console.log('Transaction successful!');
                    toast.success("Transaction successful!");
                    alreadyStakedChecked();
                } else {
                    console.error('Transaction failed. Receipt:', receipt);
                    toast.error("Transaction failed!");
                }
            } catch (error) {
                console.error('Error staking amoun:', error);
                toast.error("Something went wrong!");
            }
        } else {
            console.error('Web3 not detected. Please install MetaMask.');
            toast.error("Please install MetaMask.");
        }
    };

    const claimReward = async () => {
        toast('Transaction is pending...', {
            icon: '⌛',
        });
        try {
            const contractAddress = '0xEDf85CF5996b97c2c966eE68711b18560EeC7034';
            const contractABI = ABI;

            const contract = new window.web3.eth.Contract(contractABI, contractAddress);

            const transactionObject = {
                from: account,
            };

            const result = await contract.methods.claimReward().send(transactionObject);

            if (result.status) {
                console.log('Reward claimed successfully!');
                toast.success("Reward claimed successfully!");
                setIsWithdrawn(true);
            } else {
                console.error('Transaction failed. Receipt:', result);
                toast.error("Transaction failed!");
            }
        } catch (error) {
            console.error('Error claiming reward:', error);
            toast.error("Something went wrong!");
        }
    };


    return (
        <main className="max-w-4xl m-auto">
            {/* https://media-rockstargames-com.akamaized.net/mfe6/prod/__common/img/f7eab33a4989ce5f0cd89c70723909b3.jpg */}
            <div className="flex justify-between space-x-12">
                {typeof account == "undefined"
                    ? <div className="flex-1 bg-[#1e2a47] flex justify-center items-center h-72 rounded-2xl p-8">
                        Connect the wallet first
                    </div>
                    //     : !isDateAnnounced && predictWeek == 0
                    //     ?  <div className="flex-1 bg-[#1e2a47] flex flex-col justify-center items-center h-72 rounded-2xl p-8">
                    //     <p>Sorry, but you cant use this now.</p>
                    //                     <p>Launch Date is Announced.</p>
                    // </div>
                    : <>
                        <div className="flex-1 bg-[#1e2a47] flex flex-col justify-between h-72 rounded-2xl p-8">

                            {isDateAnnounced
                                ? <div className={`${predictWeek == 0 ? 'flex-1' : ''} flex flex-col justify-center items-center h-full`}>
                                    <p className='text-lg'>Sorry, but you cant stake now.</p>
                                    <p className='text-lg'>Launch Date is Announced.</p>
                                </div>
                                : <>
                                    <div className='flex items-center flex-col'>
                                        {isAlreadyStaked
                                            ? <div>
                                                <p className='text-lg'>Congrats, You've staked <b>{stakedAmount} Matic</b></p>
                                                <p className='text-lg'>You think GTA 6 release in <b>Week {predictWeek}, 2025</b>?</p>
                                            </div>
                                            : <div>
                                                <p className='text-lg'>Your jackpot journey hasn't begun!</p>
                                                <p className='text-lg'>Make predition and start the journey</p>
                                            </div>
                                        }
                                    </div>
                                    <div className='space-y-2'>
                                        <input id="week" type="week" name="week"
                                            className='w-full font-medium rounded-lg text-sm px-5 py-2.5 bg-blue-500 text-white hover:bg-blue-700 transition' disabled={isAlreadyStaked}
                                            onChange={(e) => setStakeWeek(e.target.value)} />

                                        <button type="button"
                                            className="w-full font-medium rounded-lg text-sm px-5 py-2.5 bg-blue-500 text-white hover:bg-blue-700 transition active:scale-95"
                                            onClick={stakeAmount} disabled={isAlreadyStaked}>{isAlreadyStaked ? ' Already Staked' : `Stake ${fixedStakeAmount} MATIC`}</button>
                                    </div>
                                </>
                            }

                        </div>
                        <div className={`${predictWeek == 0 ? 'hidden' : ''} flex-1 bg-[#1e2a47] rounded-2xl h-72 p-8 space-y-4 flex flex-col justify-center items-center text-center`}>
                            {isDateAnnounced
                                ? rewardAmount != 0
                                    ? <div className='flex flex-col justify-center items-center text-center'>
                                        <p className='text-lg'>Your preidcation for release in <b>Week {predictWeek}, 2025</b> becomes reality.</p>
                                        <p className='text-lg'>You won the jackpot, your reward is <b>{rewardAmount} Matic</b>!</p>
                                    </div>
                                    : <div className='flex flex-col justify-center items-center text-center'>
                                        <p className='text-lg'>Your preidcation for release in <b>Week {predictWeek}, 2025</b> was not right.</p>
                                        <p className='text-lg'>You didn't won the jackpot!</p>
                                    </div>
                                : isAlreadyStaked
                                    ? <div>
                                        <p className='text-lg'>You will win <b>{rewardAmount} Matic</b>, <br /> If your pridiction about launch on <b>Week {predictWeek}, 2025</b> becomes true.</p>
                                    </div>
                                    : <div>
                                        <p className='text-lg'>Stake money to win jackpot!</p>
                                    </div>}
                            {isDateAnnounced
                                ? rewardAmount != 0
                                    ?
                                    <button type="button" className="w-full cursor-pointer font-medium rounded-lg text-sm px-5 py-2.5 bg-blue-500 text-white hover:bg-blue-700 transition active:scale-95" onClick={claimReward} disabled={isWithdrawn}>
                                        {isWithdrawn
                                            ? 'Already Withdrawn'
                                            : 'Withdraw Jackpot'}
                                    </button>
                                    : <button type="button" className="w-full cursor-pointer font-medium rounded-lg text-sm px-5 py-2.5 bg-blue-500 text-white hover:bg-blue-700 transition active:scale-95" disabled={true}>
                                        Better Luck Next Time
                                    </button>
                                : <div>
                                    <button type="button" className="w-full cursor-pointer font-medium rounded-lg text-sm px-5 py-2.5 bg-blue-500 text-white hover:bg-blue-700 transition active:scale-95" disabled={true}>
                                        Date Not Announced Yet
                                    </button>
                                </div>}
                        </div></>
                }
            </div>
            {account && account == "0x9740B274fe05bCD05C0557C96EB2C3993e39556a"
                ? <button onClick={setDate}>SET DATE</button>
                : ''}
        </main>
    )
}