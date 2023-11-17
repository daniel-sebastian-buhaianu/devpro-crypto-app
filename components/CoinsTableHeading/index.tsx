const CoinsTableHeading = () => {
  return (
    <div className="mb-2 px-5 py-4 rounded-lg flex items-center text-sm dark:text-[#D1D1D1] text-[#424286]">
      <span className="mr-2 w-[3%] text-center">#</span>
      <span className="px-1 w-[18%] ">Name</span>
      <span className="w-[7%] px-1 flex items-center">Price</span>
      <span className="w-[7%] px-1">1h%</span>
      <span className="w-[7%] px-1">24h%</span>
      <span className="w-[7%] px-1">7d%</span>
      <span className="w-full max-w-[18%] px-1">24h volume/Market Cap</span>
      <span className="w-full max-w-[18%] px-1">Circulating/Total supply</span>
      <span className="w-full max-w-[14%] text-center">Last 7d</span>
    </div>
  )
}

export default CoinsTableHeading;