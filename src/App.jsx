import { useState } from 'react'
import './App.css'
import Home from './components/Home'
import TokenSearchModal from './Modal'

function App() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState([]);
  const [open, setOpen] = useState(false);

  const tokens = [
    { name: "Not Coin", symbol: "NOT", icon: "https://cryptologos.cc/logos/not-coin-logo.png" },
    { name: "Ethereum", symbol: "ETH", icon: "https://cryptologos.cc/logos/ethereum-eth-logo.png" },
    { name: "Hyperliquid", symbol: "HYPE", icon: "https://cryptologos.cc/logos/ethereum-eth-logo.png" },
    { name: "PinLink", symbol: "PIN", icon: "https://cryptologos.cc/logos/bitcoin-btc-logo.png" },
    { name: "Stader", symbol: "SD", icon: "https://cryptologos.cc/logos/solana-sol-logo.png" },
  ];

  const filtered = tokens.filter(
    (t) =>
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.symbol.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (item) =>{
    setSelected((prev) => { 
      if(prev.some(t => t.symbol === item.symbol)){
       return prev.filter(t => t.symbol !== item.symbol)
      }

      return [...prev, item]})
  }

  const handleSubmit = () => {
    setSelected([])
    setOpen(prev => !prev)
  }
  

  return (
    <main>
      <Home setOpen={setOpen}/>
      {open &&
      <TokenSearchModal 
      open={open} 
      search={search} 
      setOpen={setOpen} 
      setSearch={setSearch} 
      filtered={filtered} 
      selected={selected} 
      handleSelect={handleSelect} 
      handleSubmit={handleSubmit}/>
      }
    </main>
  )
}

export default App
