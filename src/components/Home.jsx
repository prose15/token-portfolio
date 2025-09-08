import React, { useEffect, useState } from 'react'
import { PlusIcon, } from '../utils/icons.jsx'
import starImage from '../../public/images/star.png'
import refershIcon from "../../public/images/cached.png"
import { Header } from './Header.jsx'
import { DonutChart } from '../Charts/DonutChart.jsx'
import { Table } from './Table.jsx'
import { formatNumber } from '../utils/helpers.jsx'
import { useSelector } from 'react-redux'

const Home = ({ data, setOpen, fetchApi, loading }) => {

  const portfolio = useSelector((state) => state.portfolio)
  const totalPrice = useSelector((state) => state.portfolio.totalPrice)
  const updatedAt = portfolio?.lastUpdated || 'Nan'
  const [extractPriceChanges, setExtractPriceChanges] = useState([]);
  const [extractCoinName, setExtractCoinName] = useState([]);
  const [listData, setListData] = useState([])

  useEffect(() => {
    if (data?.watchlist?.length > 0) {
      const priceChanges = data.watchlist.map((item) => item.price_change_percentage_24h);
      const coinNames = data.watchlist.map((item) => item.name);
      setExtractPriceChanges(priceChanges);
      setExtractCoinName(coinNames);
      const combineData = () => {
        return data?.watchlist.map((percentage) => ({
          name: percentage.name,
          value: percentage.price_change_percentage_24h
        }))
      }
      setListData(combineData())
    }
  }, [data?.watchlist, portfolio]);

  const colors = [
    "text-red-500",
    "text-blue-500",
    "text-green-500",
    "text-yellow-500",
    "text-purple-500",
    "text-pink-500",
    "text-orange-500",
    "text-violet-500",
    "text-amber-500"
  ];

  const coloredList = listData?.map((item) => ({
    ...item,
    color: colors[Math.floor(Math.random() * colors.length)]
  }));

  return (
    <section className='relative bg-[#212124] flex flex-col gap-10 py-4'>
      <Header />
      {!data || data?.length == 0 || data?.watchlist == 0 ||loading ?
        <div className='flex flex-col gap-7 relative top-12'>
          <div className='flex justify-center bg-[#27272a] p-6 md:w-8/12 max-md:mx-3 mx-auto rounded-md shadow-md text-[#A9E851]'><p>Add items from your Watchlist to view the UI</p></div>
          <main className='bg-[#27272a] p-5 md:mx-8 grid grid-cols-1 md:grid-cols-[1fr_0.8fr_1.2fr] md:gap-3 gap-7 justify-between rounded-lg shadow-md'>
            <div className="flex flex-col justify-between">
              <div className="space-y-3">
                <p className='text-sm font-medium'>Portfolio Total</p>
                <div className="h-10 w-56 rounded shimmer" />
              </div>
              <div className="h-3 w-40 rounded shimmer mt-6" />
            </div>

            <div className="flex flex-col gap-4 items-center">
              <p className="text-sm font-medium">Portfolio Total</p>
              <div className="relative grid place-items-center">
                <div className="h-32 w-32 rounded-full shimmer" />
                <div className="absolute h-16 w-16 rounded-full bg-[#27272a]" />
              </div>
            </div>

            <div className="flex flex-col justify-center gap-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex justify-between gap-3">
                  <div className="w-24 h-6 rounded shimmer" />
                  <div className="h-6 w-12 rounded shimmer" />
                </div>
              ))}
            </div>
          </main>
        </div>
        :
        <main className='bg-[#27272a] relative top-12 p-5 md:mx-8 grid grid-cols-1 md:grid-cols-[1fr_0.8fr_1.2fr] md:gap-3 gap-7 justify-between rounded-lg shadow-md'>
          <div className='flex flex-col w-full'>
            <div className='h-full flex flex-col max-md:gap-4 justify-between'>
              <div className='flex flex-col gap-2'>
                <p className='text-sm font-medium'>Portfolio Total</p>
                <h1 className='text-white text-4xl font-medium'>${formatNumber(totalPrice)}</h1>
              </div>
              <p className='text-sm'>Last updated: {updatedAt}</p>
            </div>
          </div>

          <div className="flex flex-col md:items-end">
            <div className="w-fit flex flex-col gap-3 items-start">
              <p className="text-sm font-medium">Portfolio Total</p>
              <DonutChart
                data={extractPriceChanges}
                labels={extractCoinName}
              />
            </div>
          </div>

          <div className='flex flex-col w-full justify-between gap-3 text-sm font-medium max-h-44 py-4 overflow-auto'>
            {coloredList.map((item) =>
              <div className='flex justify-between'>
                <p className={item.color}>{item?.name}</p>
                <p>{(item?.value).toFixed(2)}%</p>
              </div>
            )}
          </div>
        </main>
      }

      <div className=' mt-5 mx-2 md:mx-8 flex flex-col gap-3'>
        <div className='flex justify-between'>
          <div className='flex items-center gap-2'>
            <img src={starImage} alt='star-image' className='w-4' />
            <h1 className='text-white text-lg'>Watchlist</h1>
          </div>

          <div className='flex gap-4 items-center'>
            <button
              onClick={fetchApi}
              className='flex items-center gap-2 bg-[#27272a] px-3 py-2 cursor-pointer rounded-md'>
              <img src={refershIcon} alt='refersh-icon' className='w-5 md:w-4' />
              <p className='hidden md:inline-block text-white'>Refresh Prices</p>
            </button>

            <button className='flex items-center gap-2 bg-[#A9E851] px-3 py-2 cursor-pointer rounded-md' onClick={() => setOpen(true)}>
              <PlusIcon />
              <p className='text-black'>Add Tokens</p>
            </button>
          </div>

        </div>

        <div className='w-full'>
          <Table
            data={data}
            loading={loading} />
        </div>
      </div>
    </section>
  )
}

export default Home