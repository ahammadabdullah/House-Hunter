import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getAllHouses } from "../../lib/apis";
import HouseCard from "./HouseCard";
import { Fragment, useEffect } from "react";
import { useInView } from "react-intersection-observer";
const Home = () => {
  // const { data, isLoading } = useQuery({
  //   queryKey: ["all-houses"],
  //   queryFn: () => getAllHouses(),
  // });
  const { ref, inView } = useInView();
  const {
    status,
    data,
    error,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["all-houses"],
    queryFn: ({ pageParam = 0 }) => getAllHouses(pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      if (lastPage.data.length < 10) {
        return undefined;
      }
      return lastPageParam + 10;
    },
    getPreviousPageParam: (firstPage, allPages, firstPageParam) => {
      if (firstPageParam <= 10) {
        return undefined;
      }
      return firstPageParam - 10;
    },
  });
  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);
  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid gap-5 grid-cols-3 p-5">
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
