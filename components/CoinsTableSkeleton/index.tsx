const TableSkeleton = () => {
  return (
    <>
      {[...Array(20)].map((index) => (
        <div key={index} className="dark:bg-blackberry mb-2 px-5 py-8 rounded-lg flex items-center text-sm animate-pulse"></div>
      ))}
    </>
  )
}

export default TableSkeleton;