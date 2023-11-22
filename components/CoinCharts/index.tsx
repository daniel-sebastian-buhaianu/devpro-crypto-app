"use client"

import { useAppSelector } from "@/redux/store";
import CoinsSlider from "@/components/CoinsSlider";

const CoinCharts = () => {
  const { selectedCoins } = useAppSelector(state => state.selectedCoins);

  return (
    <div>
      <CoinsSlider/>
      {selectedCoins.map( coin => <p key={coin.id}>{coin.id}</p>)}
    </div>
  )
}

export default CoinCharts;