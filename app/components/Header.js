import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock } from '@fortawesome/free-regular-svg-icons'

export default function Header() {
    return (
        <main className="max-w-7xl m-auto flex justify-between pt-12">
            <div>
                <p className='text-2xl'>LEONIDA CASINO</p>
                <p className='text-9xl font-black'>45125 MATIC</p>
                <p className='text-2xl'>STAKED BY 142 ROCKERS</p>
            </div>
            <div>
            <button type="button" class="border focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 bg-gray-800 text-white border-gray-600 :hover:bg-gray-700 hover:border-gray-600 focus:ring-gray-700">Connect Wallet</button>
            </div>
        </main>
    )
}