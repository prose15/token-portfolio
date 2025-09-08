import { useEffect, useState } from 'react'
import './App.css'
import Home from './components/Home'
import TokenSearchModal from './Modal'
import { useDispatch, useSelector } from 'react-redux'
import { addToken } from "./redux/slices/PortfolioSlice.js";

function App() {

  const [data, setdata] = useState([])
  const [loading, setLoading] = useState(false)

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      "x-cg-demo-api-key": import.meta.env.VITE_API_KEY,
    }
  };

  const fetchApi = async () => {
    try {
      setLoading(true)
      const res = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=true', options)
      const apiData = await res.json()
      setdata(apiData)
      setLoading(false)
    } catch (error) {
      console.log('error', error)
    }
  }
  useEffect(() => {
    fetchApi()
  }, [])

  const myAddedTokens = JSON.parse(localStorage.getItem("portfolioState"))


  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();


  const filtered = data.filter(
    (t) =>
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.symbol.toLowerCase().includes(search.toLowerCase())
  );
  const [selected, setSelected] = useState([]);
  const handleSelect = (item) => {
    setSelected((prev) => {
      if (prev.some(t => t.symbol === item.symbol)) {
        return prev.filter(t => t.symbol !== item.symbol)
      }

      return [...prev, item]
    })
  }

  const handleSubmit = () => {
    dispatch(addToken(selected))
    setSelected([])
    setOpen(prev => !prev)
  }

  const portfolio = useSelector((state) => state.portfolio)
  useEffect(() => {
    const updatedItem = JSON.parse(localStorage.getItem("portfolioState"));

    if (updatedItem?.watchlist && updatedItem.watchlist.length > 0) {
      setSelected(updatedItem.watchlist);
    }
  }, [portfolio]);


  return (
    <main>
      <Home
        setOpen={setOpen}
        data={myAddedTokens}
        loading={loading}
        fetchApi={fetchApi} />
      {open &&
        <TokenSearchModal
          open={open}
          search={search}
          setOpen={setOpen}
          setSearch={setSearch}
          filtered={filtered}
          selected={selected}
          handleSelect={handleSelect}
          handleSubmit={handleSubmit}
          loading={loading} />
      }
    </main>
  )
}

export default App