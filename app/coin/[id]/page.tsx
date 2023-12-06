"use client"

import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import { useAppSelector } from "@/redux/store";
import CurrencyIcon from "@/components/CurrencyIcon";
import PriceChange from "@/components/PriceChange";
import CoinPriceChart from "@/components/CoinPriceChart";
import formatDate from "@/utils/formatDate";
import formatNumber from "@/utils/formatNumber";
import { CoinInfo, NewsItem } from "@/types";

const CoinPage = ({ params }: { params: { id: string } }) => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [coin, setCoin] = useState<CoinInfo | null>(null);
  const [news, setNews] = useState<NewsItem[] | []>([]);
  const { currency} = useAppSelector(state => state.currency);

  const getCoinData = async () => {
    try {
      setIsLoading(true);
      setHasError(false);
      const { data } = await axios(`https://api.coingecko.com/api/v3/coins/${params.id}?localization=false&tickers=false&market_data=true&community_data=true&developer_data=false&sparkline=true`);
      const { data: newsData } = await axios(`https://newsapi.org/v2/everything?q=${params.id}&language=en&domains=coindesk.com,cointelegraph.com&pageSize=10&sortBy=popularity&apiKey=${process.env.NEXT_PUBLIC_NEWS_API_KEY}`)
      setNews(newsData.articles);
      setCoin(data);
      setIsLoading(false)
    } catch (err) {
      setHasError(true);
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (coin === null || coin.id !== params.id) {
      getCoinData();
    }
  }, [params.id]);

  const hasCoin = !isLoading && !hasError && coin !== null;
  const hasNews = !isLoading && !hasError && !!news.length;

  return (
    <div className="px-2 pb-14 pt-5 max-w-[1296px] w-full mx-auto">
      {hasCoin && (
        <>
          <div className="flex gap-3 mb-8">
            <div className="w-1/2 dark:bg-[#191932] bg-white px-6 py-6 rounded-lg">
              <div className="mb-5 flex items-center">
                <Image src={coin.image.small} alt={coin.name} height={40} width={40}/>
                <div className="ml-4">
                  <h1 className="text-2xl">{coin.name} <span className="uppercase">({coin.symbol})</span></h1>
                  <a href={coin.links.homepage[0]} className="text-sm hover:text-grape" target="_blank">Official website</a>
                </div>
              </div>
              <h2 className="text-3xl flex items-center">
                <CurrencyIcon currency={currency} inverted={false} size="w-[32px] h-[32px]"/>
                {coin.market_data.current_price[currency]}
                <span className="text-base ml-3"><PriceChange price={coin.market_data.price_change_percentage_24h} /></span>
              </h2>
              <h3 className="dark:text-[#D1D1D1] text-[#424286] mt-1">Profit: <span>$1,504</span></h3>

              <hr className="dark:border-[#D1D1D1] border-[#424286] mt-5 mb-5 opacity-10"/>
              <div className="flex justify-between items-center">
                <div>
                  <h2>All time High:</h2>
                  <h3 className="text-xs dark:text-[#D1D1D1] text-[#424286] mt-1">{formatDate(coin.market_data.ath_date[currency])}</h3>
                </div>
                <div>
                  <span className="text-xl flex items-center">
                    <CurrencyIcon currency={currency} inverted={false} size="w-6 h-6"/>{coin.market_data.ath[currency]}
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-center mt-5">
                <div>
                  <h2>All time Low:</h2>
                  <h3 className="text-xs dark:text-[#D1D1D1] text-[#424286] mt-1">{formatDate(coin.market_data.atl_date[currency])}</h3>
                </div>
                <div>
                  <span className="text-xl flex items-center">
                    <CurrencyIcon currency={currency} inverted={false} size="w-6 h-6"/>{coin.market_data.atl[currency]}
                  </span>
                </div>
              </div>
            </div>

            <div className="w-1/2 dark:bg-[#1E1932] bg-white px-6 py-6 rounded-lg flex flex-col justify-between">
              <h3 className="text-xl">Last 7 Days</h3>
              <div>
                <CoinPriceChart prices={coin.market_data.sparkline_7d.price} priceChange={1} showDefaultColor={true} reduceBy={6}/>
              </div>
            </div>
          </div>

          <h2 className="text-3xl mt-8 mb-4">Market</h2>
          <div className="w-full dark:bg-[#191932] bg-white px-6 py-6 rounded-lg flex flex-wrap">
            <div className="w-1/4 mb-3">
              <h3 className="text-sm dark:text-[#D1D1D1] text-[#424286] mb-1 uppercase">Market Cap</h3>
              <p className="flex items-center text-lg">
                <span className="uppercase mr-1">{currency}</span> {formatNumber(coin.market_data.market_cap[currency])}
              </p>
            </div>
            <div className="w-1/4 mb-3">
              <h3 className="text-sm dark:text-[#D1D1D1] text-[#424286] mb-1 uppercase">Fully Diluted Valuation</h3>
              <p className="flex items-center text-lg">
                <span className="uppercase mr-1">{currency}</span> {formatNumber(coin.market_data.fully_diluted_valuation[currency])}
              </p>
            </div>
            <div className="w-1/4 mb-3">
              <h3 className="text-sm dark:text-[#D1D1D1] text-[#424286] mb-1 uppercase">Total Volume (24h)</h3>
              <p className="flex items-center text-lg">
                <span className="uppercase mr-1">{currency}</span> {formatNumber(coin.market_data.total_volume[currency])}
              </p>
            </div>
            <div className="w-1/4 mb-3">
              <h3 className="text-sm dark:text-[#D1D1D1] text-[#424286] mb-1 uppercase">Volume/Market</h3>
              <p className="flex items-center text-lg">  <span className="uppercase mr-1">{currency}</span>
              {formatNumber(coin.market_data.total_volume[currency]/coin.market_data.market_cap[currency])}
              </p>
            </div>
            <div className="w-1/4">
              <h3 className="text-sm dark:text-[#D1D1D1] text-[#424286] mb-1 uppercase">Circulating Supply</h3>
              <p className="flex items-center text-lg">
                {formatNumber(coin.market_data.circulating_supply)} <span className="uppercase ml-1">{coin.symbol}</span>
              </p>
            </div>
            <div className="w-1/4">
              <h3 className="text-sm dark:text-[#D1D1D1] text-[#424286] mb-1 uppercase">Max Supply</h3>
              <p className="flex items-center text-lg">
                {formatNumber(coin.market_data.max_supply)} <span className="uppercase ml-1">{coin.symbol}</span>
              </p>
            </div>
          </div>
          <h2 className="text-3xl mt-8 mb-4">About</h2>
          <div className="w-full dark:bg-[#191932] bg-white px-6 py-6 rounded-lg">
            <div  className="text-sm" dangerouslySetInnerHTML={{__html: `${coin.description.en}`}} />
          </div>
        </>
      )}
      {hasNews && (
        <>
          <h2 className="text-3xl mt-8 mb-4">News</h2>
          <div className="flex flex-wrap">
            {news.map((item) => (
              <div key={item.title} className="w-1/2 odd:pr-2 even:pl-2 py-2">
                <div className="dark:bg-[#191932] bg-white rounded-lg h-full w-full px-4 py-4 flex">
                  <div className="flex flex-col mr-3">
                    <h2 className="mb-2">{item.title}</h2>
                    <p className="text-xs mb-3 dark:text-[#D1D1D1] text-[#424286]"> {item.description}</p>
                    <a href={item.url} target="_blank" className="text-grape mt-auto">Read more</a>
                  </div>
                  {item.urlToImage && (
                    <div className="min-w-[150px]">
                      <Image src={item.urlToImage} alt="news image" width={150} height={100} className="rounded-2xl"/>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default CoinPage;