"use client"

import SearchIcon from "@/public/search.svg";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from 'next/navigation'
import { Coin } from "@/types";
import useClickOutside from "@/utils/useClickOutside";

const Search = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [coins, setCoins] = useState<Coin[] | []>([]);
  const [coinSearch, setCoinSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const router = useRouter();
  const searchRef = useClickOutside(() => setShowDropdown(false));

  const getCoins = async () => {
    try {
      const { data } = await axios("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false&locale=en");
      setCoins(data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    if(!coins.length) {
      getCoins();
    }
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCoinSearch(e.target.value);
    setShowDropdown(true);
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      const newIndex: number = (selectedIndex + (e.key === 'ArrowDown' ? 1 : -1) + coinResults.length) % coinResults.length;
      setSelectedIndex(newIndex);
    } else if (e.key === "Enter") {
      const selectedCoin: Coin = coinResults[selectedIndex];
      router.push(`/coin/${selectedCoin.id}`)
      setShowDropdown(false);
    }
  };

  const handleMouseEnter = (index: number) => {
    setSelectedIndex(index);
  };

  const coinResults: Coin[] = coins.filter((coin: Coin) => coin.name.toLowerCase().includes(coinSearch.toLowerCase()));

  return (
    <div className="relative" ref={searchRef}>
      <SearchIcon className="absolute top-1/2 -translate-y-1/2 left-3 dark:fill-[#D1D1D6] fill-indigo"/>
      <input placeholder="Search..."
             className="dark:bg-blackberry bg-lilac placeholder:text-indigo dark:placeholder:text-white py-3 pl-10 pr-3 border border-1 dark:border-[#232336] border-lilac rounded-md focus:outline-none min-w-[250px]"
             onChange={handleSearchChange}
             onFocus={() => setShowDropdown(true)}
             value={coinSearch}
             onKeyDown={handleKeyDown}
      />
      {showDropdown && (
        <div className="max-h-[300px] inline-flex flex-col overflow-y-scroll dark:bg-blackberry bg-white absolute z-10 left-0 top-[55px] border border-1 dark:border-[#232336] border-lilac rounded-md min-w-[250px]">
          {coinResults.map((coin, index) => (
            <Link href={`/coin/${coin.id}`} key={coin.id}
                  className={`px-4 py-2 flex gap-2 ${index === selectedIndex && 'bg-grape'}`}
                  onClick={() => setShowDropdown(false)}
                  onMouseEnter={() => handleMouseEnter(index)}>
              {coin.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default Search;