import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  ScriptableContext
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

const CoinPriceChart = ({prices, priceChange, showDefaultColor, reduceBy}: {prices: number[], priceChange: number, showDefaultColor: boolean, reduceBy: number}) => {
  const dataSet: number[] = getReducedArray(prices, reduceBy);
  const isPositive: boolean = priceChange >= 0;

  const getBorderColor = (): string => {
    if (showDefaultColor) {
      return "#7878FA";
    } else if (isPositive) {
      return "rgba(0,245,228,1)"
    }
    return "rgba(255,0,97,1)"
  }

  const getBackgroundColor = (context: ScriptableContext<"line">): CanvasGradient => {
    const ctx: CanvasRenderingContext2D = context.chart.ctx;
    const height: number = ctx.canvas.clientHeight;
    const gradientFill: CanvasGradient = ctx.createLinearGradient(0, 0, 0, height);

    if (showDefaultColor) {
      gradientFill.addColorStop(0, "rgba(116, 116, 250, 0.5)");
      gradientFill.addColorStop(0.7, "rgba(116, 116, 250, 0.1)")
    } else if (isPositive) {
      gradientFill.addColorStop(0, "rgba(0,245,228,.5)");
      gradientFill.addColorStop(0.7, "rgba(0,245,228,.1)");
    } else {
      gradientFill.addColorStop(0, "rgba(255,0,97,.5)");
      gradientFill.addColorStop(0.7, "rgba(255,0,97,.1)");
    }

    gradientFill.addColorStop(1, "transparent");
    return gradientFill;
  }

  const data = {
    labels: getNumArray(dataSet.length),
    datasets: [
      {
        data: dataSet,
        backgroundColor: getBackgroundColor,
        borderColor: getBorderColor,
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

  return (
    <Line options={options} data={data} />
  )
}

export default CoinPriceChart;