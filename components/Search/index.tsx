import SearchIcon from "@/public/search.svg";

const Search = () => {
  return (
    <div className="relative">
      <SearchIcon className="absolute top-1/2 -translate-y-1/2 left-3 dark:fill-[#D1D1D6] fill-indigo"/>
      <input placeholder="Search..." className="dark:bg-blackberry bg-lilac placeholder:text-indigo dark:placeholder:text-white py-3 pl-10 pr-3 border border-1 dark:border-[#232336] border-lilac rounded-md focus:outline-none"/>
    </div>
  )
}

export default Search;