import { smartContractAddress } from "./ABI"

export default function Footer() {
    return (
        <div className="p-4 mt-10 text-white space-y-2">
            <p className="opacity-80 transition hover:opacity-100 text-center">Made by <a href="https://twitter.com/0xSatyajit" target='_blank' className="underline hover:opacity-100">Satyajit</a> & Team <a target='_blank' className="underline hover:opacity-100" href="https://devfolio.co/projects/leonida-casino-7df2">TheGujjus</a> for GTA Fans</p>
            <a href="https://mumbai.polygonscan.com/address/0xbb86FA6E15f34bA16C52368C8614b2A8dAaacB78" className="block w-full text-center" target="_blank">{smartContractAddress.substring(0, 5)}....{smartContractAddress.substring(smartContractAddress.length - 4)}</a>
        </div>
    )
}