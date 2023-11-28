"use client"

import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { updateCurrency } from "@/redux/features/currencySlice";
import CurrencyIcon from "@/components/CurrencyIcon";
import DropdownCaret from "@/public/dropdownCaret.svg";
import USDIcon from "@/public/usd.svg";
import EURIcon from "@/public/eur.svg";
import JPYIcon from "@/public/jpy.svg";

const CurrencySelector = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dispatch: AppDispatch = useDispatch();
  const { currency } = useAppSelector(state => state.currency);

  const handleCurrency = (value: string) => {
    dispatch(updateCurrency(value));
    setShowDropdown(false)
  }

  return (
    <div className="relative">
      <button className="dark:bg-blackberry bg-lilac py-3 px-4 border border-1 dark:border-[#232336] border-lilac rounded-md flex items-center justify-between ml-4 min-w-[120px]"
              onClick={() => setShowDropdown(!showDropdown)}>
        <span className="w-[20px] h-[20px] dark:bg-white bg-indigo rounded-full text-[15px] text-plum flex justify-center items-center">
          <CurrencyIcon currency={currency} inverted={true}/>
        </span>
        <span className="uppercase dark:text-white text-indigo mr-2">{currency}</span>
        <DropdownCaret className="stroke-indigo dark:stroke-white" />
      </button>
      {showDropdown && (
        <div className="dark:bg-blackberry bg-lilac border border-1 dark:border-[#232336] border-lilac rounded-md ml-4 absolute right-0 overflow-hidden z-30">
          <button className="text-sm flex items-center py-1.5 px-4 hover:bg-grape w-full justify-between dark:text-white text-indigo" onClick={() => handleCurrency("usd")}>
            <USDIcon className="w-5 dark:fill-white fill-indigo"/> USD
          </button>
          <button className="text-sm flex items-center py-1.5 px-4 hover:bg-grape w-full justify-between dark:text-white text-indigo" onClick={() => handleCurrency("eur")}>
            <EURIcon className="dark:fill-white w-4 dark:stroke-white fill-indigo stroke-indigo"/> EUR
          </button>
          <button className="text-sm flex items-center py-1.5 px-4 hover:bg-grape w-full justify-between dark:text-white text-indigo" onClick={() => handleCurrency("jpy")}>
            <JPYIcon className="dark:fill-white w-4 dark:stroke-white fill-indigo stroke-indigo"/> JPY
          </button>
        </div>
      )}
    </div>
  )
}

export default CurrencySelector;