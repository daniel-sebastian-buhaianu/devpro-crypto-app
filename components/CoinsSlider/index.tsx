"use client"

import { useAppSelector } from "@/redux/store";
import { useState } from "react";
import { motion, MotionConfig } from "framer-motion";
import CoinItem from "@/components/CoinItem";
import CoinsSliderSkeleton from "@/components/CoinsSliderSkeleton";
import Arrow from "@/public/arrow.svg";

const CoinsSlider = () => {
  const [current, setCurrent] = useState(0);
  const { coins, loading, hasError } = useAppSelector(state => state.coins);
  const { currency } = useAppSelector(state => state.currency);

  const onPrevClick = () => {
    if (current > 0) {
      setCurrent(current - 1)
    }
  };

  const onNextClick = () => {
    if (current < coins.length - 4) {
      setCurrent(current + 1)
    }
  };

  const hasCoins: boolean = coins.length > 0 && !hasError;
  const lastCoinIndex: number = coins.length - 4;
  const showSkeleton: boolean = coins.length === 0 && loading === "pending" && !hasError;

  return (
    <MotionConfig transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}>
      <div className="relative w-full flex items-center max-w-[1296px] overflow-hidden before:content-[''] before:absolute
                      before:right-0 before:top-0 before:bottom-0 before:w-[200px] before:z-10 before:bg-gradient-to-r before:from-transparent
                      before:via-[#ffffff4d] dark:before:via-[#13121a80] before:to-[#F3F5F9] dark:before:to-[#13121A]">
        <div className="absolute left-0 right-0 flex justify-between">
          {current > 0 && (
            <button className="bg-[#7878FA] p-3 rounded-full flex justify-center items-center z-20 opacity-70 hover:opacity-90"
                    onClick={onPrevClick}>
            <Arrow className="stroke-white w-5 h-5 rotate-180"/>
          </button>
          )}

          {current < lastCoinIndex && (
            <button className="bg-[#7878FA] p-3 rounded-full flex justify-center items-center ml-auto z-20 opacity-70 hover:opacity-90"
                    onClick={onNextClick}>
              <Arrow className="stroke-white w-5 h-5"/>
            </button>
          )}
        </div>

        <motion.div animate={{ x: `calc(-${current * 250}px - ${current}rem)`}} className="flex gap-4 flex-nowrap">
          {showSkeleton && <CoinsSliderSkeleton />}
          {hasCoins && coins.map((coin) => <CoinItem key={coin.id} coin={coin} currency={currency} />)}
        </motion.div>
      </div>
    </MotionConfig>
  )
}

export default CoinsSlider;