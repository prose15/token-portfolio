import { useEffect, useState } from "react";
import { Sparkline } from "../Charts/Sparkline";
import { DeleteIcon, EditIcon, ThreeDots } from "../utils/icons";
import { formatNumber, sparklineResult } from "../utils/helpers.jsx";
import { useDispatch } from "react-redux";
import { deleteToken, setPrices, updateHoldings } from "../redux/slices/PortfolioSlice.js";

export const Table = ({ data }) => {
  const [openMenu, setOpenMenu] = useState(null);
  const dispatch = useDispatch()
  const [editing, setEditing] = useState({});
  const [newHolding, setNewHolding] = useState({})
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // calculate indexes
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // slice only the current page items
  const currentItems = data?.watchlist.slice(startIndex, endIndex) || [];

  const handleToggleMenu = (index) => {
    setOpenMenu(prev => prev === index ? null : index);
  };

  const handleEditHoldings = (item) => {
    dispatch(updateHoldings({ id: item?.id, amount: parseInt(newHolding[item?.id]) || 0 }))
    setEditing((prev) => ({ ...prev, [item?.id]: !prev[item?.id] }))
  }
  
  const handleUpdate = (item,index) => {
    setOpenMenu(prev => prev === index ? null : index)
    setEditing((prev) => ({ ...prev, [item?.id]: !prev[item?.id] }))
  }

  const handleDeleteToken = (item,index) => {
    setOpenMenu(prev => prev === index ? null : index)
    dispatch(deleteToken(item.id));
  }

  useEffect(() => {
    if (data?.watchlist && data?.holdings) {
      data.watchlist.forEach((item) => {
        const holding = data.holdings.find((h) => h.id === item.id);
        const value = item?.current_price * (holding?.holdingAmount ?? 0);
        dispatch(setPrices({ id: item.id, value }));
      });
    }
  }, [dispatch]);

  return (
    <div>
      <div className="border border-white/20 rounded-t-lg shadow-md overflow-auto">
        <table className="w-full text-sm">
          <thead className="bg-[#27272a] text-left border-b border-white/20">
            <tr className='h-12'>
              <th className="min-w-36 p-4" align="">Token</th>
              <th className="min-w-36" align="">Price</th>
              <th className="min-w-36" >24h %</th>
              <th className="min-w-36"> Sparkline (7d)</th>
              <th className="min-w-36"> Holdings</th>
              <th className="min-w-36 ">Value</th>
              <th></th>
            </tr>
          </thead>

          {!data || data.length == 0 ?
            <tbody className="">
              <tr>
                <td colSpan={7} className="p-6 text-gray-400">
                  Please select a token from the watchlist to see the data
                </td>
              </tr>
            </tbody>
            :
            <tbody>
              {data?.watchlist.map((item, index) => {
                const holding = data?.holdings?.find((h) => h.id === item.id);
                const value = item?.current_price * (holding?.holdingAmount ?? 0);


                return (
                  <tr key={index} className="hover:bg-[#27272a] transition">
                    <td className="flex items-center gap-3 p-4 min-w-52 pr-12">
                      <img
                        src={item?.image}
                        alt={item?.token}
                        className="w-8 h-8 rounded-md"
                      />
                      <span className="font-medium">{item?.name}</span>
                    </td>

                    <td className="min-w-36 pr-12">
                      ${formatNumber(item?.current_price)}
                    </td>

                    <td className="min-w-36 pr-12">
                      {item?.price_change_24h.toFixed(2)}
                    </td>

                    <td className="min-w-36 pr-12">
                      <Sparkline
                        series={item?.sparkline_in_7d?.price}
                        positive={sparklineResult(item?.sparkline_in_7d?.price)}
                      />
                    </td>

                    <td className="min-w-36 pr-12">
                      {
                        editing[item?.id] ?
                          <div className="flex items-center gap-2">
                            <input
                              type="number"
                              value={newHolding[item.id] ?? holding?.holdingAmount ?? 0}
                              onChange={(e) =>
                                setNewHolding({
                                  ...newHolding,
                                  [item.id]: e.target.value,
                                })
                              }
                              className="bg-[#27272a] border border-white/20 rounded-md text-white w-28 h-9 focus:border-[#A9E851] focus:ring-2 focus:ring-[#A9E851]/20 outline-none" />
                            <button
                              className="p-2 bg-[#A9E851] text-black rounded-md cursor-pointer"
                              onClick={() => handleEditHoldings(item)}>Save</button>
                          </div>
                          : <p>{holding?.holdingAmount ?? 0}</p>
                      }

                    </td>

                    <td className="min-w-36 pr-12">${formatNumber(value)}</td>

                    <td className="align-center cursor-pointer relative min-w-36 pr-12">
                      <button
                        className="cursor-pointer"
                        onClick={() => handleToggleMenu(index)}
                      >
                        <ThreeDots />
                      </button>

                      {openMenu === index && (
                      <div className="absolute top-[60%] -left-[180%] xl:-left-[150%] 2xl:-left-[130%] -translate-y-1/2 translate-x-full -ml-2 bg-[#27272a] rounded-md shadow-lg z-50">
                        <button
                          onClick={() => {handleUpdate(item,index)}}
                          className="flex gap-2 items-center w-full text-nowrap px-3 py-2 text-left hover:bg-[#212124] rounded-md cursor-pointer"
                        >
                          <EditIcon />
                          <p>Edit Holdings</p>
                        </button>
                        <hr className="text-white/20" />
                        <button
                          onClick={() => handleDeleteToken(item,index)}
                          className="flex gap-2 items-center w-full text-nowrap px-3 py-2 text-left text-red-400 rounded-md hover:bg-[#212124] cursor-pointer"
                        >
                          <DeleteIcon />
                          <p>Remove</p>
                        </button>
                      </div>
                      )}
                    </td>

                  </tr>
                );
              })}
            </tbody>

          }

        </table>
      </div>

      <div className="w-full flex justify-between items-center h-12 bg-[#27272a] text-sm px-6 py-3 rounded-b-lg border border-white/20 border-t-0">
  <span>
    {startIndex + 1} - {Math.min(endIndex, data?.watchlist.length)} of {data?.watchlist.length} results
  </span>
  
  <div className="flex items-center gap-4">
    <span>
      {currentPage} of {Math.ceil((data?.watchlist.length || 0) / itemsPerPage)} pages
    </span>

    <button
      className="cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
      disabled={currentPage === 1}
    >
      Prev
    </button>

    <button
      className="cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      onClick={() =>
        setCurrentPage((prev) =>
          Math.min(prev + 1, Math.ceil(data?.watchlist.length / itemsPerPage))
        )
      }
      disabled={endIndex >= (data?.watchlist.length || 0)}
    >
      Next
    </button>
  </div>
</div>

    </div>

  );
};