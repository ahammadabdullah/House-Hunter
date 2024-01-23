import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getAllHouses } from "../../lib/apis";
import HouseCard from "./HouseCard";
import { Fragment, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import FilterDropDown from "../../Components/FilterDropDown";
const Home = () => {
  const { ref, inView } = useInView();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("");
  const [range, setRange] = useState("");

  const {
    status,
    data,
    error,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["all-houses", query, filter, range],
    queryFn: ({ pageParam = 0 }) =>
      getAllHouses(pageParam, query, filter, range),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      if (lastPage.data.length < 10) {
        return undefined;
      }
      return lastPageParam + 10;
    },
  });

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);
  return (
    <div className="max-w-7xl mx-auto">
      <div className=" pt-5 mx-auto flex justify-between items-center flex-col md:flex-row w-[90%] gap-5 ">
        <div>
          <input
            onChange={(e) => setQuery("title=" + e.target.value)}
            type="text"
            className="w-[300px] bg-fill rounded-md p-2"
            placeholder="Search By Title"
          />
        </div>
        <FilterDropDown setFilter={setFilter} setRange={setRange} />
      </div>
      <div className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-5">
        {data?.pages?.map((group, i) => (
          <Fragment key={i}>
            {group?.data?.map((house) => (
              <HouseCard key={house._id} house={house} />
            ))}
          </Fragment>
        ))}
      </div>
      <div className="flex justify-center">
        <button
          ref={ref}
          onClick={() => fetchNextPage()}
          className="p-3 bg-secondary rounded-md"
          disabled={!hasNextPage || isFetchingNextPage || isFetching}
        >
          {isFetching
            ? "Loading..."
            : isFetchingNextPage
            ? "Loading more..."
            : hasNextPage
            ? "Load Newer"
            : "Nothing more to load"}
        </button>
      </div>
    </div>
  );
};

export default Home;
