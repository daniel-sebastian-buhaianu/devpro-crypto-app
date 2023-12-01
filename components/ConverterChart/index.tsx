import { Coin } from "@/types";
import CoinPriceChart from "@/components/CoinPriceChart";

const ConverterChart = ({fromCoin, toCoin}: {fromCoin: Coin, toCoin: Coin}) => {
  const fromCoinPrices:  number[] = fromCoin.sparkline_in_7d.price;
  const toCoinPrices:  number[]  = toCoin.sparkline_in_7d.price;

  const dataSet: number[] = fromCoinPrices.reduce((acc: number[], fromCoinPrice: number, index: number) => {
    acc.push(fromCoinPrice / toCoinPrices[index]);
    return acc;
  }, []);

  return (
    <div className="w-full dark:bg-[#191932] bg-white px-6 pt-6 pb-5 rounded-lg min-h-[250px] max-h-[400px] flex justify-between flex-col mb-4">
      <div className="mb-2">
       <h3 className="text-xl mb-2">{fromCoin.name} <span className="uppercase">({fromCoin.symbol})</span>
         <span className="dark:text-[#D1D1D1] text-[#424286] mx-3">to</span>
         {toCoin.name} <span className="uppercase">({toCoin.symbol})</span>
       </h3>
      </div>
      <div className="w-full">
        <CoinPriceChart prices={dataSet} priceChange={1} showDefaultColor={true} reduceBy={2}/>
      </div>
    </div>
  )
}

export default ConverterChart;