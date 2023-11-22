import CoinCharts from "@/components/CoinCharts";
import CoinsTable from "../components/CoinsTable";

const Home = () => {
  return (
    <div className="px-2 pb-14 pt-5 max-w-[1296px] w-full mx-auto">
      <CoinCharts />
      <CoinsTable />
    </div>
  )
}

export default Home;