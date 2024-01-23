import { useState } from "react";
import BookModal from "../../Components/Modals/BookModal";

const HouseCard = ({ house }) => {
  let [isOpen, setIsOpen] = useState(false);
  function closeBookModal() {
    setIsOpen(false);
  }

  function openBookModal() {
    setIsOpen(true);
  }
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
  } = house;
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
            className="p-2 bg-secondary hover:bg-secondary hover:text-primary rounded-md "
            onClick={openBookModal}
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
