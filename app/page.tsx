"use client"

import {useState} from "react";
import CoinCharts from "@/components/CoinCharts";
import CoinsTable from "../components/CoinsTable";
import Converter from "@/components/Converter";

const Home = () => {
  const [showConverter, setShowConverter] = useState(false);

  return (
    <div className="px-2 pb-14 pt-5 max-w-[1296px] w-full mx-auto">
      <div className="dark:bg-[#232336] p-1 rounded-md inline-flex mb-8">
        <button onClick={() => setShowConverter(!showConverter)}
                className={`${!showConverter && "bg-[#7878FA]"} opacity-70 p-2 mr-2 rounded-md min-w-[230px] `}>Coins</button>
        <button onClick={() => setShowConverter(!showConverter)}
                className={`${showConverter && "bg-[#7878FA]"} opacity-70 p-2 rounded-md min-w-[230px]`}>Converter</button>
      </div>
      {!showConverter && <CoinCharts />}
      {showConverter && <Converter />}
      <CoinsTable />
    </div>
  )
}

export default Home;