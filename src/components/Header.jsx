import { ConnectButton } from "@rainbow-me/rainbowkit"
import { Logo, WalletIcon } from "../utils/icons"
import { toast } from "react-toastify"
import { useEffect, useState } from "react"

export const Header = () => {

    return (
      <header className='fixed w-full top-0 flex justify-between items-center px-3 py-2 bg-[#212124] z-[500]'>
        <div className='flex items-center gap-2 px-2 py-1 cursor-pointer'>
          <Logo />
          <p className='text-white font-medium'>Token Portfolio</p>
        </div>

        <ConnectWallet />
      </header>
    )
  }

  function ConnectWallet () {
    const [hasShownToast, setHasShownToast] = useState(false);
    return(
      <ConnectButton.Custom>
        {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        const ready = mounted && authenticationStatus !== 'loading';
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus ||
            authenticationStatus === 'authenticated');

            useEffect(() => {
              if (connected && !hasShownToast) {
                toast.success("Wallet connected successfully!", {
                  position: "top-center",
                  autoClose: 3000,
                  theme: "dark", 
                });
                setHasShownToast(true);
              } else if (!connected && hasShownToast) {
                setHasShownToast(false);
              }
            }, [connected, hasShownToast]);



        return (
          <div
            {...(!ready && {
              'aria-hidden': true,
              'style': {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                <div 
                  onClick={openConnectModal}
                  className='flex items-center gap-2 bg-[#A9E851] rounded-full px-2 py-1 cursor-pointer'>
                    <WalletIcon />
                <button className='text-black cursor-pointer'>Connect Wallet</button>
                </div>
                );
              }

              if (chain.unsupported) {
                return (
                  <button onClick={openChainModal} type="button">
                    Wrong network
                  </button>
                );
              }

              return (
                <div >

                  <button 
                  className='flex items-center gap-2 text-black bg-[#A9E851] rounded-full px-2 py-1 cursor-pointer'
                  onClick={openAccountModal} 
                  type="button">
                    {account.displayName}
                    {account.displayBalance
                      ? ` (${account.displayBalance})`
                      : ''}
                  </button>
                </div>
              );
            })()}
          </div>
        );
      }}
      </ConnectButton.Custom>
    )
  }