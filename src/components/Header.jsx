import { Logo, WalletIcon } from "../utils/icons"

export const Header = () => {
    return (
      <header className='flex justify-between items-center px-3'>
        <div className='flex items-center gap-2 px-2 py-1 cursor-pointer'>
          <Logo />
          <p className='text-white font-medium'>Token Portfolio</p>
        </div>
  
        <div className='flex items-center gap-2 bg-[#A9E851] rounded-full px-2 py-1 cursor-pointer'>
          <WalletIcon />
          <button className='text-black'>Connect Wallet</button>
        </div>
      </header>
    )
  }