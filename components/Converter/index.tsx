"use client"

import { useState, useEffect } from "react";
import { useAppSelector } from "@/redux/store";
import CoinRow from "@/components/CoinRow";
import ConverterChart from "@/components/ConverterChart";
import { Coin } from "@/types";
import Switch from "@/public/switch.svg";

const Converter = () => {
  const { coins } = useAppSelector(state => state.coins);
  const { currency} = useAppSelector(state => state.currency);
  const [fromCoin, setFromCoin] = useState<Coin | null>(null);
  const [toCoin, setToCoin] = useState<Coin | null>(null);
  const [amount, setAmount] = useState(1);
  const [amountInFromCoin, setAmountInFromCoin] = useState(true);
  const [conversionRate, setConversionRate] = useState(1);

  useEffect(() => {
    if (coins.length !== 0) {
      const firstCoin: Coin = coins[0];
      const secondCoin: Coin = coins[1];
      const rate: number = firstCoin.current_price / secondCoin.current_price;
      setConversionRate(rate);
      setFromCoin(firstCoin);
      setToCoin(secondCoin);
    }
  }, []);

  useEffect(() => {
    if (fromCoin !== null && toCoin !== null) {
      const rate: number = fromCoin.current_price / toCoin.current_price;
      setConversionRate(rate);
    }
  }, [fromCoin, toCoin]);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>, flag: boolean) => {
    if (e.target.value === "") {
      setAmount(0);
    } else {
      setAmount(parseFloat(e.target.value));
    }
    setAmountInFromCoin(flag);
  }

  const handleCoinSwitch = () => {
    const firstCoin = fromCoin;
    const secondCoin = toCoin;
    setToCoin(firstCoin);
    setFromCoin(secondCoin);
    setAmountInFromCoin(!amountInFromCoin);
  }

  let toAmount, fromAmount;

  if (amountInFromCoin) {
    fromAmount = amount;
    toAmount = amount * conversionRate;
  } else {
    toAmount = amount;
    fromAmount= amount / conversionRate;
  }

  return (
    <>
      <div className="flex gap-3 mb-8 relative">
        <CoinRow
          bgColor="dark:bg-[#191932]"
          currency={currency}
          coinOptions={coins}
          currentCoin={fromCoin}
          amount={fromAmount}
          handleCoinSelect={(coin: Coin) => setFromCoin(coin)}
          handleAmountChange={(e) => handleAmountChange(e, true)}
        />
        <button className="dark:bg-white bg-lilac w-[40px] h-[40px] rounded-full absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 z-10 flex items-center justify-center"
          onClick={handleCoinSwitch}>
          <Switch width={25} height={25}/>
        </button>
        <CoinRow
          bgColor="dark:bg-[#1E1932]"
          currency={currency}
          coinOptions={coins}
          currentCoin={toCoin}
          amount={toAmount}
          handleCoinSelect={(coin: Coin) => setToCoin(coin)}
          handleAmountChange={(e) => handleAmountChange(e, false)}
        />
      </div>
      {fromCoin !== null && toCoin !== null && <ConverterChart fromCoin={fromCoin} toCoin={toCoin}/>}
    </>
  )
}

export default Converter;