"use client"

import Image from "next/image";
import { useEffect, useState } from "react";
import CurrencyIcon from "@/components/CurrencyIcon";
import { Coin } from "@/types";
import CaretIcon from "@/public/caret.svg";

interface CoinRowProps {
  coinOptions: Coin[];
  currentCoin: Coin | null;
  currency: string;
  amount: number;
  handleCoinSelect: (coin: Coin) => void;
  handleAmountChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CoinRow = ({coinOptions, currentCoin, currency, amount, handleCoinSelect, handleAmountChange}: CoinRowProps ) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [coinSearch, setCoinSearch] = useState('');

  const coinResults: Coin[] = coinOptions.filter((coin) => coin.name.toLowerCase().includes(coinSearch.toLowerCase()));

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCoinSearch(e.target.value);
    setShowDropdown(true);
  }

  const onCoinSelect = (coin: Coin) => {
    handleCoinSelect(coin);
    setShowDropdown(false);
    setCoinSearch(coin.name);
  }

  useEffect(() => {
    if (currentCoin) {
      setCoinSearch(currentCoin.name);
    }
  }, [currentCoin]);

  return (
    <div className="w-1/2 dark:bg-[#191932] bg-white px-6 pt-6 pb-5 rounded-lg relative min-h-[140px] mr-2 last:mr-0 last:ml-2">
      <div className="flex justify-between">
        <div className="w-[60%]  relative">
          {currentCoin && <Image src={currentCoin.image} alt={currentCoin.name} width={25} height={25} className="top-1/2 -translate-y-1/2 left-2 absolute"/>}
          <input className="dark:bg-[#1d1d39] bg-white placeholder:text-indigo dark:placeholder:text-white py-3 pl-10 pr-3 focus:outline-none rounded-md w-full"
                 onChange={handleSearchChange} value={coinSearch}
                 onFocus={() => setShowDropdown(true)}/>
          <button className="w-[25px] h-full flex items-center justify-end top-1/2 -translate-y-1/2 right-2 absolute" onClick={() => setShowDropdown(!showDropdown)}>
            <CaretIcon className={`${showDropdown ? "" : "rotate-180"} w-[12px] h-[6px] fill-white`}/>
          </button>
        </div>
        <input className="dark:bg-[#191932] bg-white placeholder:text-indigo dark:placeholder:text-white py-3 px-3 focus:outline-none w-[40%] text-right"
          value={amount}
          onChange={handleAmountChange}/>
      </div>
      {showDropdown && (
        <div className="max-h-[300px] inline-flex flex-col overflow-y-scroll dark:bg-blackberry bg-white absolute z-10 left-5 top-[72px] border border-1 dark:border-[#232336] border-lilac rounded-md">
          {coinResults.map((coin) => (
            <button key={coin.id} className="px-4 py-2 flex gap-2" onClick={() => onCoinSelect(coin)}>
              <Image src={coin.image} alt={coin.name} width={30} height={30}/>
              {coin.name}
            </button>
          ))}
        </div>
      )}
      <hr className="dark:border-[#D1D1D1] border-[#424286] mt-3 mb-3"/>
      {currentCoin !== null && (
        <p className="flex items-center px-3 dark:text-[#D1D1D1] text-[#424286] text-sm">
          <span className="uppercase mr-1">1 {currentCoin.symbol} </span> =
          <CurrencyIcon currency={currency} inverted={false}/> {currentCoin.current_price}
        </p>
      )}
    </div>
  )
}

export default CoinRow;