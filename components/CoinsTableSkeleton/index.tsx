const CoinsTableSkeleton = () => {
  return (
    <>
      {[...Array(20)].map(() => (
        <div key={Math.random()} className="dark:bg-blackberry mb-2 px-5 py-8 rounded-lg animate-pulse"></div>
      ))}
    </>
  )
}

export default CoinsTableSkeleton;