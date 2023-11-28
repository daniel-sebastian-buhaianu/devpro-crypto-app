import { RefObject } from "react";
import { Chart as ChartJS } from "chart.js";
import getReducedArray from "@/utils/getReducedArray";
import getLabelsAndData from "@/utils/getLabelsAndData";
import getDatesList from "@/utils/getDatesList";
import { CoinData, ReduceByType } from "@/types";

const reduceBy: ReduceByType = {
  "1": 16,
  "7": 12,
  "14": 18,
  "30": 22,
  "365": 16,
  "1825": 55,
  "max": 92
}

const borderColors: string[] = [
  "#7878FA",
  "#D878FA",
  "#F5AC37"
];

const bgColors: [string, string][] = [
  [
    "rgba(116, 116, 250, 0.5)",
    "rgba(116, 116, 250, 0.1)"
  ],
  [
    "rgba(231, 114, 255, 0.5)",
    "rgba(231, 114, 255, 0.1)"
  ],
  [
    "rgba(253 ,181, 43, 0.5)",
    "rgba(253 ,181, 43, 0.1)"
  ]
];


const prepareChartData = (type: string, selectedCoins: CoinData[], timeStamp: string, chartRef: RefObject<ChartJS<"line" | "bar", number[], string>>) => {
  const formattedData = selectedCoins.map((coin, i) => {
    const reducedArray = getReducedArray(coin[type] as [string, number][], reduceBy[timeStamp]);
    const { labels, dataSet } = getLabelsAndData(reducedArray as [string, number][]);
    let formattedLabels: string[] = [];

    if (parseFloat(timeStamp) > 1 && parseFloat(timeStamp) < 365) {
      formattedLabels = getDatesList(labels);
    } else {
      formattedLabels = labels.map((item, index) =>
        (index === 0 || index === (labels.length - 1) || (index + 1) % 3 === 0) ? item : ""
      )
    }

    let gradientFill: string | CanvasGradient = bgColors[i][0];

    if (chartRef.current) {
      const canvasHeight = chartRef.current.canvas.clientHeight;
      const ctx = chartRef.current.canvas.getContext("2d");

      if (ctx) {
        gradientFill = ctx.createLinearGradient(0, 0, 0, canvasHeight);
        gradientFill.addColorStop(0, bgColors[i][0]);
        gradientFill.addColorStop(0.7, bgColors[i][1])
        gradientFill.addColorStop(1, "transparent");
      }
    }

    const dataset = {
      fill: true,
      data: dataSet,
      backgroundColor: gradientFill,
      borderColor: borderColors[i],
      borderWidth: type === "prices" ? 2 : 0,
      tension: 0.3,
      order: i + 1,
      yAxisID: `y-axis-${i + 1}`
    };

    return { formattedLabels, dataset };
  });

  const datasets = formattedData.map(({ dataset }) => dataset);
  const labels = formattedData.map(({ formattedLabels }) => formattedLabels);

  return { datasets, labels };
}

export default prepareChartData;