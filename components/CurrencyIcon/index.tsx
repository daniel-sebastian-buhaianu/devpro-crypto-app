import React from "react";
import USDIcon from "@/public/usd.svg";
import EURIcon from "@/public/eur.svg";
import JPYIcon from "@/public/jpy.svg";

type CurrencyIconProps = {
  currency: string;
  inverted: boolean;
  size?: string;
};

const CurrencyIcon = ({currency, inverted, size = "w-4 h-4"}: CurrencyIconProps) => {
  let icon;

  switch (currency) {
    case "usd":
      icon = <USDIcon className={`${size} ${inverted ? "dark:fill-indigo fill-white" : "fill-indigo dark:fill-white"}`} />;
      break;
    case "eur":
      icon = <EURIcon className={`${inverted ? "dark:fill-indigo dark:stroke-indigo fill-white stroke-white": "fill-indigo stroke-indigo dark:fill-white dark:stroke-white"} ${size}`}/>;
      break;
    case "jpy":
      icon = <JPYIcon className={`${inverted ? "dark:fill-indigo dark:stroke-indigo fill-white stroke-white": "fill-indigo stroke-indigo dark:fill-white dark:stroke-white"} ${size}`}/>;
      break;
    default:
      icon = <USDIcon className={`${size} ${inverted ? "dark:fill-indigo fill-white" : "fill-indigo dark:fill-white"}`} />;
  }
  return (
    <>
      {icon}
    </>
  )
}

export default CurrencyIcon;