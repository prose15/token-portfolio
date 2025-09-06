import React from 'react'
import {  PlusIcon, } from '../utils/icons.jsx'
import starImage from '../../public/images/star.png'
import refershIcon from "../../public/images/cached.png"
import { Header } from './Header.jsx'
import { DonutChart } from '../Charts/DonutChart.jsx'
import { Table } from './Table.jsx'

const Home = ({setOpen}) => {

  function formatNumber(num) {
    return num.toLocaleString("en-US");
  }
  const amount = 10275.08
  return (
    <section className='bg-[#212124] flex flex-col gap-10 py-4'>
      <Header />

      <main className='bg-[#27272a] px-3 py-5 mx-8 flex max-md:flex-col max-md:gap-7 justify-between rounded-lg shadow-md'>
        <div className='flex flex-col'>
          <div className='h-full flex flex-col max-md:gap-4 justify-between'>
            <div className='flex flex-col gap-2'>
              <p className='text-sm font-medium'>Portfolio Total</p>
              <h1 className='text-white text-4xl font-medium'>${formatNumber(amount)}</h1>
            </div>
            <p className='text-sm'>Last updated: 3:42:12 PM</p>
          </div>
        </div>

        <div className='flex flex-col gap-3'>
          <p className='text-sm font-medium'>Portfolio Total</p>
          <DonutChart />
        </div>

        <div className='flex flex-col gap-3 mt-4 text-sm font-medium'>
          <p>{14}%</p>
          <p>{14}%</p>
          <p>{14}%</p>
          <p>{14}%</p>
          <p>{14}%</p>
          <p>{14}%</p>
        </div>
      </main>

      <div className='mx-8 flex flex-col gap-3'>
        <div className='flex justify-between'>
          <div className='flex items-center gap-2'>
            <img src={starImage} alt='star-image' className='w-4' />
            <h1 className='text-white text-lg'>Watchlist</h1>
          </div>

          <div className='flex gap-4 items-center'>
            <button className='flex items-center gap-2 bg-[#27272a] px-3 py-2 cursor-pointer rounded-md'>
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
          <Table />
        </div>
      </div>
    </section>
  )
}

export default Home