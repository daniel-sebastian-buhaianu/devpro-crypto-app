import React from "react";

type MarketVolumeBarProps = {
  fill: string,
  percentage: number
};

const MarketVolumeBar: React.FC<MarketVolumeBarProps> = ({ fill, percentage }) => {
  return (
    <div className="w-full h-[6px] relative">
      <span className={`rounded-[6px] h-[6px] block bg-[#797585] relative`}></span>
      <span className={`w-full h-[6px] absolute left-0 top-0 rounded-[6px] ${fill}`} style={{ width: `${percentage}%`}}></span>
    </div>
  )
}

export default MarketVolumeBar;