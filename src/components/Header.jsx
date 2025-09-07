import { ConnectButton } from "@rainbow-me/rainbowkit"
import { Logo, WalletIcon } from "../utils/icons"

export const Header = () => {

    return (
      <header className='flex justify-between items-center px-3'>
        <div className='flex items-center gap-2 px-2 py-1 cursor-pointer'>
          <Logo />
          <p className='text-white font-medium'>Token Portfolio</p>
        </div>
  

        <ConnectWallet />
      </header>
    )
  }

  function ConnectWallet () {
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
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted && authenticationStatus !== 'loading';
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus ||
            authenticationStatus === 'authenticated');

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