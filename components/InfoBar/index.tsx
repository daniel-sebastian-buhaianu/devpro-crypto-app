'use client';

import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/redux/store";
import  Image from "next/image";
import { getGlobalData } from "@/redux/features/globalSlice";
import MarketVolumeBar from "@/components/MarketVolumeBar";
import formatNumber from "@/utils/formatNumber";
import getPercentage from "@/utils/getPercentage";
import coin from "@/public/coin.svg";
import recoveryConvert from "@/public/recoveryConvert.svg";
import caret from "@/public/caret.svg";
import bitcoinIcon from "@/public/bitcoinIcon.svg";
import ethereumIcon from "@/public/ethereumIon.svg";

const InfoBar: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { globalData, isLoading, hasError} = useAppSelector(state => state.globalData);

  useEffect(() => {
    dispatch(getGlobalData());
  }, []);
  
  const hasData: boolean = !isLoading && !hasError;
  const currencyPercentage: number = getPercentage(globalData.total_volume.usd, globalData.total_market_cap.usd);
  const btcPercentage: number = Math.floor(globalData.market_cap_percentage.btc);
  const ethPercentage: number = Math.floor(globalData.market_cap_percentage.eth);

  return (
    <div className="bg-plum py-4 text-xs flex justify-center items-center">
      {hasData &&
        <>
          <div className="flex px-3">
            <Image src={coin} alt="coin icon" width={14} height={14}/>
            <span className="ml-1.5">Coins: {globalData.active_cryptocurrencies}</span>
          </div>
          <div className="flex px-3">
            <Image src={recoveryConvert} alt="coin icon" width={14} height={14}/>
            <span className="ml-1.5">Exchange: {globalData.markets}</span>
          </div>
          <div className="flex px-3">
            <Image src={caret} alt="coin icon" width={8} height={8}/>
            <span className="ml-1.5">{formatNumber(globalData.total_volume.usd)}</span>
          </div>
          <div className="flex px-3 items-center">
            <span className="ml-1.5">${formatNumber(globalData.total_market_cap.usd)}</span>
            <div className="w-[50px] ml-1.5">
              <MarketVolumeBar fill="bg-white" percentage={currencyPercentage}/>
            </div>
          </div>
          <div className="flex px-3 items-center">
            <span className="ml-1.5">
              <Image src={bitcoinIcon} alt="bitcoin icon" width={24} height={24}/>
            </span>
            <span className="ml-1.5">{btcPercentage}%</span>
            <div className="w-[50px] ml-1.5">
              <MarketVolumeBar fill="bg-apricot" percentage={btcPercentage}/>
            </div>
          </div>
          <div className="flex px-3 items-center">
            <span className="ml-1.5">
              <Image src={ethereumIcon} alt="bitcoin icon" width={24} height={24}/>
            </span>
            <span className="ml-1.5">{ethPercentage}%</span>
            <div className="w-[50px] ml-1.5">
              <MarketVolumeBar fill="bg-grape" percentage={ethPercentage}/>
            </div>
          </div>
        </>
      }
    </div>
  )
}

export default InfoBar;