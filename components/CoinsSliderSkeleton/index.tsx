const CoinsSliderSkeleton = () => {
  return (
    <>
      {[...Array(5)].map(() => (
        <div key={Math.random()} className="dark:bg-blackberry bg-white rounded-lg min-w-[250px] min-h-[104px] animate-pulse"></div>
      ))}
    </>
  )
}

export default CoinsSliderSkeleton;