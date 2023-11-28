import { useAppSelector, AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import { updateTimeStamp, getAllCoinsData } from "@/redux/features/selectedCoinsSlice";

interface timeStamp {
  value: string;
  days: string;
}

const timeStamps: timeStamp[] = [
  {
    value: "1D",
    days: "1"
  },
  {
    value: "7D",
    days: "7"
  },
  {
    value: "14D",
    days: "14"
  },
  {
    value: "1M",
    days: "30"
  },
  {
    value: "1Y",
    days: "365"
  },
  {
    value: "5Y",
    days: "1825"
  },
  {
    value: "Max",
    days: "max"
  }
]

const TimeSelector = () => {
  const dispatch: AppDispatch = useDispatch();
  const { timeStamp } = useAppSelector(state => state.selectedCoins);

  const handleTimeSelect = (days: string) => {
    dispatch(updateTimeStamp(days));
    dispatch(getAllCoinsData());
  }

  return (
    <div className="dark:bg-[#232336] p-1 rounded-md inline-flex mb-4">
      {timeStamps.map((item) =>
        <button key={item.value} className={`${item.days === timeStamp && "bg-[#7878FA]"} opacity-70 p-2 mr-2 rounded-md min-w-[54px] last:mr-0`}
          onClick={() => handleTimeSelect(item.days)}>
          {item.value}
        </button>
      )}
    </div>
  )
}

export default TimeSelector;