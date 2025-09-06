import { useState } from "react";
import { Sparkline } from "../Charts/Sparkline";
import { DeleteIcon, EditIcon, ThreeDots } from "../utils/icons";

export const Table = () => {
    const data = [
        {
          token: "Ethereum (ETH)",
          icon: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
          price: "$43,250.67",
          change: "+2.30%",
          changePositive: true,
          sparklineData: [143, 50, 147, 55, 260, 258, 62, 164, 166, 66, 67, 89, 378],
          holdings: "0.0500",
          value: "$2,162.53",
        },
        {
          token: "Bitcoin (BTC)",
          icon: "https://cryptologos.cc/logos/bitcoin-btc-logo.png",
          price: "$2,654.32",
          change: "-1.20%",
          changePositive: false,
          sparklineData: [80, 76, 74, 70, 68, 72, 69],
          holdings: "2.5000",
          value: "$6,635.80",
        },
        {
          token: "Solana (SOL)",
          icon: "https://cryptologos.cc/logos/solana-sol-logo.png",
          price: "$98.45",
          change: "+4.70%",
          changePositive: true,
          sparklineData: [15, 18, 22, 20, 25, 27, 30],
          holdings: "2.5000",
          value: "$1,476.75",
        },
      ];

    const [openMenu, setOpenMenu] = useState(null);

    const handleToggleMenu = (index) => {
      setOpenMenu(prev => prev === index ? null : index);
    };

    return (
      <div>
      <div className="border border-white/20 rounded-t-lg shadow-md overflow-auto">
        <table className="w-full text-sm">
          <thead className="bg-[#27272a] text-left border-b border-white/20">
            <tr className='h-12'>
              <th className="max-w-36 p-4" align="">Token</th>
              <th className="max-w-36" align="">Price</th>
              <th className="max-w-36" >24h %</th>
              <th className="max-w-36"> Sparkline (7d)</th>
              <th className="max-w-36"> Holdings</th>
              <th className="max-w-36 ">Value</th>
              <th></th>
            </tr>
          </thead>
  
          <tbody>
            {data.map((item, index) => (
              <tr
                key={index}
                className="hover:bg-[#27272a] transition"
              >
                <td className="flex items-center gap-3 p-4 min-w-52 pr-12">
                  <img
                    src={item.icon}
                    alt={item.token}
                    className="w-8 h-8 rounded-md"
                  />
                  <span className="font-medium">{item.token}</span>
                </td>
  
                <td className="max-w-36 pr-12">{item.price}</td>
  
                <td className="max-w-36 pr-12">
                  {item.change}
                </td>
  
                <td className="max-w-36 pr-12">
                  <Sparkline
                    series={item.sparklineData}
                    positive={item.changePositive}
                  />
                </td>

                <td className="max-w-36 pr-12">{item.holdings}</td>
  
                <td className="max-w-36 pr-12">{item.value}</td>
  
                <td className=' align-center cursor-pointer relative max-w-36 pr-12'>
                    <button 
                    className="cursor-pointer"
                    onClick={()=>handleToggleMenu(index)}
                    onBlur={()=> handleToggleMenu(index)}>
                    <ThreeDots />
                    </button>
                    
                    {openMenu === index && (
                  <div className="absolute right-0 mt-2 w-fit bg-[#27272a] rounded-md shadow-lg z-50">
                    <button className="flex gap-2 items-center w-full text-nowrap px-3 py-2 text-left hover:bg-[#212124] rounded-md cursor-pointer">
                      <EditIcon />
                       Edit Holdings
                    </button>
                    <hr className="text-white/20"/>
                    <button className="flex gap-2 items-center w-full text-nowrap px-3 py-2 text-left text-red-400 rounded-md hover:bg-[#212124] cursor-pointer">
                      <DeleteIcon />
                       Remove
                    </button>
                  </div>
                )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className=" w-full flex justify-between items-center h-12 bg-[#27272a] text-sm px-6 py-3 rounded-b-lg border border-white/20 border-t-0">
          <span>1 - 10 of 100 results</span>
          <div className="flex items-center gap-4">
            <span>1 of 10 pages</span>
            <button className="cursor-pointer" disabled>Prev</button>
            <button className="cursor-pointer">Next</button>
          </div>
        </div>
      </div>

    );
  };