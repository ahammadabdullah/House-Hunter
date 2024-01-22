const HouseCard = ({ house }) => {
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
    <div className="p-5 bg-fill rounded-md flex flex-col justify-between">
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
      </div>
    </div>
  );
};

export default HouseCard;
