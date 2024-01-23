import React from "react";
import { deleteBooking } from "../../lib/apis";
import { toast } from "react-hot-toast";
const BookingCard = ({ detail, refetch }) => {
  const handleDeleteBooking = async () => {
    const res = await deleteBooking(detail._id);
    if (res.deletedCount) {
      toast.success("Booking Deleted Successfully");
      refetch();
    } else {
      toast.error("Something went wrong");
    }
  };
  return (
    <div className="bg-fill w-[300px] mx-auto rounded-md p-4 space-y-1">
      <h3 className="font-medium text-xl">{detail.title}</h3>
      <h3>Address: {detail.address}</h3>
      <h3>Rent: {detail.rent} BDT</h3>
      <button
        className="p-2 bg-secondary hover:bg-secondary hover:text-primary rounded-md "
        onClick={handleDeleteBooking}
      >
        Delete
      </button>
    </div>
  );
};

export default BookingCard;
