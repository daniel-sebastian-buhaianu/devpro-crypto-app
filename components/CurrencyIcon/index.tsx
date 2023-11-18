import React from "react";
import USDIcon from "@/public/usd.svg";
import EURIcon from "@/public/eur.svg";
import JPYIcon from "@/public/jpy.svg";

type CurrencyIconProps = {
  currency: string;
  inverted: boolean
};

const CurrencyIcon: React.FC<CurrencyIconProps>  = ({currency, inverted}) => {
  let icon;

  switch (currency) {
    case "usd":
      icon = <USDIcon className={`w-4 h-4 ${inverted ? "dark:fill-indigo fill-white" : "fill-indigo dark:fill-white"}`} />;
      break;
    case "eur":
      icon = <EURIcon className={`${inverted ? "dark:fill-indigo dark:stroke-indigo fill-white stroke-white": "fill-indigo stroke-indigo dark:fill-white dark:stroke-white"} w-3`}/>;
      break;
    case "jpy":
      icon = <JPYIcon className={`${inverted ? "dark:fill-indigo dark:stroke-indigo fill-white stroke-white": "fill-indigo stroke-indigo dark:fill-white dark:stroke-white"} w-3`}/>;
      break;
    default:
      icon = <USDIcon className={`w-4 h-4 ${inverted ? "dark:fill-indigo fill-white" : "fill-indigo dark:fill-white"}`} />;
  }
  return (
    <>
      {icon}
    </>
  )
}

export default CurrencyIcon;