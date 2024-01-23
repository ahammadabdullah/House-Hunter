import { useState } from "react";
import BookModal from "../../Components/Modals/BookModal";
import useAuth from "../../Hooks/useAuth";
import toast from "react-hot-toast";
import useGetBooking from "../../Hooks/useGetBooking";
import { useNavigate } from "react-router-dom";

const HouseCard = ({ house }) => {
  const { user } = useAuth();
  const { data, refetch } = useGetBooking();
  let [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  function closeBookModal() {
    setIsOpen(false);
  }

  function openBookModal() {
    setIsOpen(true);
  }
  const handleOpenBookModal = () => {
    if (!user) {
      toast.error("You need to login first");
      navigate("/login");
    } else if (user?.email === house?.email) {
      toast.error("You can't book your own house");
    } else if (user?.role === "owner") {
      toast.error("You can't book a house as an owner");
    } else if (user?.email === house?.email) {
      toast.error("You can't book your own house");
    } else if (data.length === 2) {
      toast.error("You can't book more than 2 houses");
    } else {
      openBookModal();
    }
  };
  const {
    email,
    name,
    address,
    city,
    bedrooms,
    bathrooms,
    roomSize,
    imgURL,
    availabilityDate,
    rent,
    number,
    title,
    description,
  } = house || {};
  return (
    <div className="p-5 bg-fill rounded-md flex flex-col justify-between w-[385px] md:w-[350px] lg:w-[400px] mx-auto">
      <img className="rounded-md" src={imgURL} alt="" />
      <h3 className="text-primary text-2xl pt-1 font-medium">{title}</h3>
      <div>
        <div className="flex gap-1 justify-between">
          <p>Bedrooms: {bedrooms}</p>
          <p>Bathrooms: {bathrooms}</p>
          <p>Size: {roomSize}</p>
        </div>

        <div className="flex">
          <p>{address}</p>
          <p>, {city}</p>
        </div>
        <div className="flex justify-between">
          <p>Date: {availabilityDate}</p>
          <p>Rent: {rent} BDT</p>
        </div>
        <div className="flex justify-between">
          <p>Owner Info: </p>
          <p>{name}</p>
          <p>{number}</p>
        </div>
        <div className="flex justify-center pt-3">
          <button
            // disabled={email === user?.email}
            className="p-2 bg-secondary hover:bg-secondary hover:text-primary rounded-md "
            onClick={handleOpenBookModal}
          >
            Book
          </button>
        </div>
      </div>
      <BookModal
        closeBookModal={closeBookModal}
        isOpen={isOpen}
        house={house}
      />
    </div>
  );
};

export default HouseCard;
