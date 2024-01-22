import { useQuery } from "@tanstack/react-query";
import { getAllHouses } from "../../lib/apis";
import HouseCard from "./HouseCard";
const Home = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["all-houses"],
    queryFn: () => getAllHouses(),
  });
  console.log(data);
  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid gap-5 grid-cols-3 p-5">
        {data?.map((house) => (
          <HouseCard key={house._id} house={house} />
        ))}
      </div>
    </div>
  );
};

export default Home;
