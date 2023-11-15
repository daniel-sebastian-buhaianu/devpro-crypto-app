import React from "react";
import USDIcon from "@/public/usd.svg";
import EURIcon from "@/public/eur.svg";
import JPYIcon from "@/public/jpy.svg";

type CurrencyIconProps = {
  currency: string,
};

const CurrencyIcon: React.FC<CurrencyIconProps>  = ({currency}) => {
  let icon;

  switch (currency) {
    case "USD":
      icon = <USDIcon className="dark:fill-indigo fill-white w-4 h-4"/>;
      break;
    case "EUR":
      icon = <EURIcon className="dark:fill-indigo dark:stroke-indigo fill-white stroke-white w-3"/>;
      break;
    case "JPY":
      icon = <JPYIcon className="dark:fill-indigo dark:stroke-indigo fill-white stroke-white w-3"/>;
      break;
    default:
      icon = <USDIcon className="dark:fill-indigo fill-white w-4 h-4"/>;
  }
  return (
    <>
      {icon}
    </>
  )
}

export default CurrencyIcon;