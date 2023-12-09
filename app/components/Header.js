import { useSDK } from '@metamask/sdk-react';

const ConnectWalletButton = () => {
    const { sdk, connected, connecting, account } = useSDK();

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
    console.log(ConnectWalletButton);
    return (
        <main className="max-w-7xl m-auto flex justify-between pt-12">
            <div>
                <p className='text-2xl'>LEONIDA CASINO</p>
                <p className='text-9xl font-black'>45125 MATIC</p>
                <p className='text-2xl'>STAKED BY 142 ROCKERS</p>
            </div>
            <div>
                    <ConnectWalletButton />
            </div>
        </main>
    )
}