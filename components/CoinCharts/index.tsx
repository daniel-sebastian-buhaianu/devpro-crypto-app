"use client"

import { AppDispatch, useAppSelector } from "@/redux/store";
import { useEffect, useRef } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler, BarElement
} from "chart.js";
import { Line, Bar } from "react-chartjs-2";
import CoinsSlider from "@/components/CoinsSlider";
import TimeSelector from "@/components/TimeSelector";
import prepareChartData from "@/utils/prepareChartData";
import CurrencyIcon from "@/components/CurrencyIcon";
import { DataSet, Coin, CoinData } from "@/types";
import formatNumber from "@/utils/formatNumber";
import { getCoinData } from "@/redux/features/selectedCoinsSlice";
import { useDispatch } from "react-redux";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Filler
);

const options = {
  responsive: true,
  scales: {
    x: {
      grid: {
        display: false,
      },
      ticks: {
        display: true,
        color: '#ffffff',
      },
      border: {
        display: false,
      },
      stacked: true,
    },
    "y-axis-1": {
      display: false,
      beginAtZero: false
    },
    "y-axis-2": {
      display: false,
      beginAtZero: false
    },
    "y-axis-3": {
      display: false,
      beginAtZero: false
    },
  },
  pointRadius: 0,
  borderWidth: 0,
};

const coinBG: string[] = [
  "bg-[#7878FA]",
  "bg-[#D878FA]",
  "bg-[#F5AC37]"
];

const CoinCharts = () => {
  const dispatch: AppDispatch = useDispatch();
  const { selectedCoins, timeStamp } = useAppSelector(state => state.selectedCoins);
  const { coins } = useAppSelector(state => state.coins);
  const { currency } = useAppSelector(state => state.currency);
  const lineChartRef =  useRef<ChartJS<"line", number[], string>>(null);
  const barChartRef = useRef<ChartJS<"bar", number[], string>>(null)

  const { datasets: lineDataSet, labels } = prepareChartData("prices", selectedCoins, timeStamp, lineChartRef);
  const { datasets: barDataSet } = prepareChartData("total_volumes", selectedCoins, timeStamp, barChartRef);

  const lineData: DataSet = {
    labels: labels[0],
    datasets: lineDataSet,
  };
  const barData: DataSet = {
    labels: labels[0],
    datasets: barDataSet,
  }

  const todayDate: string = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric"});
  const selectedCoinsInfo: Coin[] = selectedCoins.reduce((acc: Coin[], curr: CoinData) => {
    const coinInfo: Coin | undefined = coins.find((coin: Coin) => coin.id === curr.id);
    if (coinInfo) {
      acc.push(coinInfo);
    }
    return acc;
  } ,[])

  useEffect(() => {
    if (!selectedCoins.length) {
      dispatch(getCoinData({currency, timeStamp, coinId: 'bitcoin'}));
    }
  }, []);

  return (
    <>
      <CoinsSlider/>
      <div className="flex gap-3 my-8">
        <div className="w-1/2 dark:bg-[#191932] bg-white px-6 pt-6 pb-5 rounded-lg min-h-[350px] max-h-[450px] flex justify-between flex-col">
          <div className="mb-2">
            <h3 className="text-2xl mb-2">{todayDate}</h3>
            <div className="flex">
              {selectedCoinsInfo.map((coin, index) => (
                <div key={coin.id} className="flex mr-4 items-center">
                  <span className={`${coinBG[index]} w-[18px] h-[18px] mr-2 block rounded-sm`}></span>
                  <span className="dark:text-[#D1D1D1] text-[#424286] text-sm flex items-center">
                    {coin.name} <CurrencyIcon currency={currency} inverted={false}/> {formatNumber(coin.current_price)}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <Line ref={lineChartRef} options={options} data={lineData} />
        </div>

        <div className="w-1/2 dark:bg-[#1E1932] bg-white px-6 pt-6 pb-5 rounded-lg min-h-[350px] max-h-[450px] flex justify-between flex-col">
          <div className="mb-2">
            <h3 className="text-3xl mb-2">Volume 24h</h3>
            <h4 className="dark:text-[#D1D1D1] text-[#424286] text-sm">{todayDate}</h4>
          </div>
          <Bar ref={barChartRef} options={options} data={barData} />
        </div>
      </div>
      <TimeSelector />
    </>
  )
}

export default CoinCharts;