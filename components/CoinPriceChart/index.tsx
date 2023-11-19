"use client"

import { useState, useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler
} from "chart.js";
import { Line } from "react-chartjs-2";
import getNumArray from "@/utils/getNumArray";
import getReducedArray from "@/utils/getReducedArray";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler
);

const CoinPriceChart = ({prices, priceChange}: {prices: number[], priceChange: number}) => {
  const [background, setBackground] = useState<CanvasGradient | string>("transparent");
  const [borderColor, setBorderColor] = useState<string>("rgba(0,245,228,1)");
  const chartRef =  useRef<ChartJS<"line", number[], number>>(null);
  const { theme} = useTheme();

  const dataSet: number[] = getReducedArray(prices, 6);
  const isPositive: boolean = priceChange >= 0;

  const data = {
    labels: getNumArray(dataSet.length),
    datasets: [
      {
        data: dataSet,
        backgroundColor: background,
        borderColor: borderColor,
        borderWidth: 2,
        tension: 0.3,
        pointRadius: 0,
        fill: true
      }
    ]
  };

  const options = {
    fill: true,
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        display: false
      },
      y: {
        display: false
      }
    }
  };


  const getThemeBg = (): string => {
    if (theme === "dark") {
      return "rgba(25,25,37,.2)";
    } else {
      return "rgba(255,255,255,.3)";
    }
  };

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.canvas.getContext("2d");

      if (ctx) {
        const gradient: CanvasGradient = ctx.createLinearGradient(0, 0, 0, 42);

        if (isPositive) {
          gradient.addColorStop(0, "rgba(0,245,228,.5)");
        } else {
          setBorderColor("rgba(255,0,97,1)");
          gradient.addColorStop(0, "rgba(255,0,97,.5)");
        }

        gradient.addColorStop(1, getThemeBg());
        setBackground(gradient);
      }
    }
  },[theme])

  return (
    <Line ref={chartRef} options={options} data={data} />
  )
}

export default CoinPriceChart;