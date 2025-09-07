import { useEffect, useRef } from "react";
import starImage from '../public/images/star.png'
import { TickIcon } from "./utils/icons";

export default function TokenSearchModal({ open, search, setOpen, setSearch, filtered, selected, handleSelect, handleSubmit }) {

  const modalRef = useRef(null)

  const disabled = !selected || selected.length == 0 ? true : false

  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setOpen(prev => !prev);
      }
    }

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/70 z-50" >
      <div
        ref={modalRef}
        className="bg-[#212124] w-1/2 rounded-lg shadow-lg overflow-hidden flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <input
            type="text"
            placeholder="Search tokens (e.g., ETH, SOL)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent outline-none text-sm"
          />

        </div>

        <div className="overflow-auto max-h-72 px-4 flex flex-col gap-1">
          <p className="text-xs py-4">Trending</p>
          <div className="py-4 flex flex-col gap-1">
            {filtered.map((token, idx) => (
              <button
                key={idx}
                onClick={() => handleSelect(token)}
                className={`flex items-center justify-between w-full  hover:bg-[#27272a] transition cursor-pointer p-3 rounded-md ${selected.some((t) => t.symbol === token.symbol) ? "bg-[#A9E851]/6" : ''}`}
              >
                <div className="flex items-center gap-3">
                  <img
                    src={token.image}
                    alt={token.name}
                    className="w-6 h-6 rounded-full"
                  />
                  <span className="text-sm text-gray-200">
                    {token.name} ({token.symbol})
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  {selected.some((t) => t.symbol === token.symbol) && <img src={starImage} alt='star-image' className='w-3' />}

                  <div
                    className={`w-3 h-3 flex items-center justify-center rounded-full border ${selected.some((t) => t.symbol === token.symbol)
                      ? "border-[#A9E851] bg-[#A9E851]"
                      : "border-gray-500"
                      }`}
                  >
                    {selected.some((t) => t.symbol === token.symbol) && (
                      <TickIcon className="w-3 h-3 text-black" />
                    )}
                  </div>
                </div>

              </button>
            ))}
          </div>
        </div>

        <div className="bg-[#27272a] p-2 flex justify-end">
          <button 
          className={`px-3 py-1 rounded-md ${disabled ? 'border border-white/20 cursor-not-allowed' : 'bg-[#A9E851] text-black cursor-pointer'}`} 
          onClick={!disabled && handleSubmit}>
            Add to WishList
          </button>
        </div>
      </div>
    </div>
  );
}