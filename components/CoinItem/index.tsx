"use client"

import Image from "next/image";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { getCoinData, removeCoin } from "@/redux/features/selectedCoinsSlice";
import { Coin } from "@/types";
import formatNumber from "@/utils/formatNumber";
import PriceChange from "@/components/PriceChange";
import getFormattedPrice from "@/utils/getFormattedPrice";

const CoinItem = ({coin, currency}: {coin: Coin, currency: string}) => {
  const dispatch: AppDispatch = useDispatch();
  const { selectedCoins, timeStamp } = useAppSelector(state => state.selectedCoins);

  const indexOfItem: number = selectedCoins.findIndex((item) => item.id === coin.id);
  const isSelected: boolean = indexOfItem !== -1;
  const priceChange24h: number = getFormattedPrice(coin.price_change_percentage_24h_in_currency);

  const handleCoinSelect = (): void => {
    if (isSelected) {
      dispatch(removeCoin(coin.id));
    } else if (selectedCoins.length < 3) {
      dispatch(getCoinData({currency, timeStamp, coinId: coin.id}));
    }
  }

  return (
    <div className={`${isSelected ? "bg-[#6161de80]" : "dark:bg-blackberry bg-white"} p-4 rounded-lg flex items-center text-sm min-w-[250px] hover:cursor-pointer`}
         onClick={handleCoinSelect}>
      <div className="pr-3">
        <Image src={coin.image} alt={coin.name} width={40} height={40}/>
      </div>
      <div className="w-full">
        <h3 className="text-base">{coin.name} <span className="uppercase">({coin.symbol})</span></h3>
        <div className="flex w-full dark:text-[#D1D1D1] text-[#424286] mt-1">
          <h3 className="pr-2">{formatNumber(coin.current_price)} <span className="uppercase">{currency}</span></h3>
          <PriceChange price={priceChange24h} />
        </div>
      </div>
    </div>
  )
}

export default CoinItem;