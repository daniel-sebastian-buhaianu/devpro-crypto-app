'use client';

import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { getGlobalData } from "@/redux/features/globalSlice";
import MarketVolumeBar from "@/components/MarketVolumeBar";
import formatNumber from "@/utils/formatNumber";
import getPercentage from "@/utils/getPercentage";
import CoinIcon from "@/public/coin.svg";
import RecoveryConvertIcon from "@/public/recoveryConvert.svg";
import CaretIcon from "@/public/caret.svg";
import BitcoinIcon from "@/public/bitcoinIcon.svg";
import EthereumIcon from "@/public/ethereumIon.svg";

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
    <div className="dark:bg-plum bg-indigo py-4 text-xs flex justify-center items-center text-white">
      {hasData &&
        <>
          <div className="flex px-3">
            <CoinIcon className="w-[14px] h-[14px]"/>
            <span className="ml-1.5">Coins: {globalData.active_cryptocurrencies}</span>
          </div>
          <div className="flex px-3">
            <RecoveryConvertIcon className="w-[14px] h-[14px]"/>
            <span className="ml-1.5">Exchange: {globalData.markets}</span>
          </div>
          <div className="flex px-3 items-center">
            <CaretIcon className="w-[8px] h-[4px]"/>
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
              <BitcoinIcon className="w-[24px] h-[24px]"/>
            </span>
            <span className="ml-1.5">{btcPercentage}%</span>
            <div className="w-[50px] ml-1.5">
              <MarketVolumeBar fill="bg-apricot" percentage={btcPercentage}/>
            </div>
          </div>
          <div className="flex px-3 items-center">
            <span className="ml-1.5">
              <EthereumIcon className="w-[24px] h-[24px]"/>
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