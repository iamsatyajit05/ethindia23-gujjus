import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock } from '@fortawesome/free-regular-svg-icons'

export default function Stake() {
    return (
        <main className="max-w-7xl m-auto">
            {/* https://media-rockstargames-com.akamaized.net/mfe6/prod/__common/img/f7eab33a4989ce5f0cd89c70723909b3.jpg */}
            <div className="flex justify-between space-x-12">
                <div className="flex-1 bg-[#1e2a47] rounded-xl h-80 p-8">
                    <p className="text-3xl">120345</p>
                    <p>peope are exicted about GTA 6 launch</p>

                    <button type="button" className="w-full font-medium text-9xl px-5 py-2.5 active:scale-95">🔥</button>
                </div>
                <div className="flex-1 bg-[#1e2a47] flex flex-col justify-between h-80 rounded-2xl p-8">
                    <div className='flex items-center flex-col'>
                        <div>
                            <p>Congrats, You've staked <b>10 Matic</b></p>
                            <p>You think GTA 6 release in Week 2, 2025?</p>
                        </div>
                        {/* <div>
                                <p>Your jackpot journey hasn't begun!</p>
                                <p>Make predition and start the journey</p>
                            </div> */}
                    </div>
                    <div className='space-y-2'>
                        <input id="week" type="week" name="week" className='w-full border focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 bg-gray-800 text-white border-gray-600 :hover:bg-gray-700 hover:border-gray-600 focus:ring-gray-700' />

                        <button type="button" className="w-full border focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 bg-gray-800 text-white border-gray-600 :hover:bg-gray-700 hover:border-gray-600 focus:ring-gray-700">Stake 10 MATIC</button>
                        {/* Already Staked */}
                    </div>

                </div>
                <div className="flex-1 bg-[#1e2a47] rounded-2xl h-80 p-8 space-y-8">
                    <p>You can win ~120 Matic if your pridiction about launch on Week 2, 2025 becomes true</p>
                    <div className="space-y-4">
                        <div className='flex justify-center space-x-2'>
                            <div className="h-5 w-5">
                                <FontAwesomeIcon icon={faClock} />
                            </div>
                            <span>Not Announced Yet</span>
                        </div>
                        <div>
                            <button type="button" className="w-full cursor-pointer font-medium rounded-lg text-sm px-5 py-2.5 bg-blue-500 text-white hover:bg-blue-700 transition active:scale-95" disabled>Withdraw Jackpot</button>
                            {/* Already Withdrawn */}
                        </div>
                    </div>

                </div>
            </div>
        </main>
    )
}