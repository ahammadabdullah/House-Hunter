import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { editHouse } from "../../lib/apis";
import { toast } from "react-hot-toast";
const EditModal = ({ isOpen, closeEditModal, house, refetch }) => {
  const {
    _id,
    address,
    city,
    bedrooms,
    bathrooms,
    roomSize,
    imgURL,
    availabilityDate,
    rent,
    title,
    description,
  } = house;

  const handleEdit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const address = form.address.value;
    const city = form.city.value;
    const bedrooms = form.bedrooms.value;
    const bathrooms = form.bathrooms.value;
    const roomSize = form.roomSize.value;
    const imgURL = form.imgURL.value;
    const availabilityDate = form.availabilityDate.value;
    const rent = form.rent.value;
    const description = form.description.value;
    const updatedData = {
      address,
      city,
      bedrooms,
      bathrooms,
      roomSize,
      imgURL,
      availabilityDate,
      rent,
      title,
      description,
    };
    const res = await editHouse(_id, updatedData);
    if (res.modifiedCount !== 0) {
      toast.success("Updated Successfully");
      refetch();
    } else {
      toast.error("Something Went Wrong");
    }
    closeEditModal();
  };
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeEditModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Edit House: {title}
                  </Dialog.Title>
                  <form onSubmit={handleEdit} className="space-y-2">
                    <label htmlFor="title">Title: </label>
                    <input
                      className="bg-fill pl-2 py-1 rounded-md"
                      defaultValue={title}
                      type="text"
                      name="title"
                      id="title"
                    />
                    <br />
                    <label htmlFor="description">Description: </label>
                    <input
                      className="bg-fill pl-2 py-1 rounded-md"
                      defaultValue={description}
                      type="text"
                      name="description"
                      id="description"
                    />
                    <br />
                    <label htmlFor="imgURL">Image URL: </label>
                    <input
                      className="bg-fill pl-2 py-1 rounded-md"
                      defaultValue={imgURL}
                      type="text"
                      name="imgURL"
                      id="imgURL"
                    />
                    <br />
                    <label htmlFor="address">Address: </label>
                    <input
                      className="bg-fill pl-2 py-1 rounded-md"
                      defaultValue={address}
                      type="text"
                      name="address"
                      id="address"
                    />
                    <br />
                    <label htmlFor="city">City: </label>
                    <input
                      className="bg-fill pl-2 py-1 rounded-md"
                      defaultValue={city}
                      type="text"
                      name="city"
                      id="city"
                    />
                    <br />
                    <label htmlFor="bedrooms">Bedrooms: </label>
                    <input
                      className="bg-fill pl-2 py-1 rounded-md"
                      defaultValue={bedrooms}
                      type="number"
                      name="bedrooms"
                      id="bedrooms"
                    />
                    <br />
                    <label htmlFor="Bathrooms">Bathrooms: </label>
                    <input
                      className="bg-fill pl-2 py-1 rounded-md"
                      defaultValue={bathrooms}
                      type="number"
                      name="bathrooms"
                      id="bathrooms"
                    />
                    <br />
                    <label htmlFor="roomSize">Room Size: </label>
                    <input
                      className="bg-fill pl-2 py-1 rounded-md"
                      defaultValue={roomSize}
                      type="text"
                      name="roomSize"
                      id="roomSize"
                    />
                    <br />
                    <label htmlFor="rent">Rent: </label>
                    <input
                      className="bg-fill pl-2 py-1 rounded-md"
                      defaultValue={rent}
                      type="number"
                      name="rent"
                      id="rent"
                    />
                    <br />
                    <label htmlFor="availabilityDate">
                      Availability Date:{" "}
                    </label>
                    <input
                      className="bg-fill pl-2 py-1 rounded-md"
                      defaultValue={availabilityDate}
                      type="date"
                      name="availabilityDate"
                      id="availabilityDate"
                    />
                    <br />
                    <button
                      type="submit"
                      className="inline-flex justify-center rounded-md border border-transparent bg-fill px-4 py-2 text-sm font-medium text-primary hover:bg-secondary focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    >
                      Submit
                    </button>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default EditModal;
