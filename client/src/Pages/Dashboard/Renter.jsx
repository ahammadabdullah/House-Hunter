import useGetBooking from "../../Hooks/useGetBooking";
import BookingCard from "./BookingCard";

const Renter = () => {
  const { data, refetch } = useGetBooking();
  return (
    <div>
      <h3 className="text-center text-2xl py-5">Renter's Dashboard</h3>
      <h3 className="text-center pb-5">Total Bookings: {data?.length}</h3>
      <div className="flex justify-center gap-5 flex-col md:flex-row ">
        {data?.map((detail) => (
          <BookingCard refetch={refetch} key={detail?._id} detail={detail} />
        ))}
      </div>
    </div>
  );
};

export default Renter;
