import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import { getBookings } from "../lib/apis";

const useGetBooking = () => {
  const { user } = useAuth();
  console.log(user);
  const { data, refetch } = useQuery({
    queryKey: ["renter-houses"],
    queryFn: () => getBookings(user?.email),
    enabled: user !== null,
  });
  return { data, refetch };
};

export default useGetBooking;
