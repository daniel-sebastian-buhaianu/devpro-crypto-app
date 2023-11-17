'use client'

import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { getCoinMarketData } from "@/redux/features/coinMarketSlice";
import RowItem from "@/components/RowItem";
import CoinsTableSkeleton from "@/components/CoinsTableSkeleton";
import CoinsTableHeading from "@/components/CoinsTableHeading";
import Spinner from "@/public/spinner.svg";

const CoinsTable = () => {
  const dispatch: AppDispatch = useDispatch();
  const { currency } = useAppSelector(state => state.currency);
  const { coins, loading, hasError , currentPage} = useAppSelector(state => state.coins);
  const [spinnerRef, inView] = useInView();

  useEffect(() => {
    dispatch(getCoinMarketData({ currency, page: currentPage }));
  }, [currency]);

  useEffect(() => {
    if (inView) {
      dispatch(getCoinMarketData({ currency, page: currentPage }));
    }
  }, [inView]);

  const hasCoins: boolean = coins.length > 0 && !hasError;
  const showSkeleton: boolean = coins.length === 0 && loading === "pending" && !hasError;

  return (
    <div>
      <CoinsTableHeading />
      {hasCoins && (
        <>
          {coins.map((coin) => <RowItem coin={coin} currency={currency} key={coin.id}/>)}
          <div
            ref={spinnerRef}
            className='col-span-1 mt-16 flex items-center justify-center sm:col-span-2 md:col-span-3 lg:col-span-4'>
            <Spinner className='h-10 w-10 animate-spin fill-grape text-gray-200 dark:text-gray-600'/>
            <span className='sr-only'>Loading...</span>
          </div>
        </>
      )}
      {showSkeleton && <CoinsTableSkeleton />}
    </div>
  )
}

export default CoinsTable;
