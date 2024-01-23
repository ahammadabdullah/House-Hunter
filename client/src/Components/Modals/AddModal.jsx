import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { AddHouse } from "../../lib/apis";
import { toast } from "react-hot-toast";
import useAuth from "../../Hooks/useAuth";
const AddModal = ({ isOpen, closeAddModal, refetch }) => {
  const { user } = useAuth();

  const regex = /^(013|014|015|016|017|018|019)\d{8}$/;
  const handleAddHouse = async (e) => {
    e.preventDefault();
    const form = e.target;
    const number = form.number.value;

    const title = form.title.value;
    const address = form.address.value;
    const city = form.city.value;
    const bedrooms = form.bedrooms.value;
    const bathrooms = form.bathrooms.value;
    const roomSize = form.roomSize.value;
    const imgURL = form.imgURL.value;
    const availabilityDate = form.availabilityDate.value;
    const rentStr = form.rent.value;
    const description = form.description.value;
    const isValid = regex.test(number);
    if (!isValid) {
      toast.error("Provide a valid Bangladeshi Number");
      return;
    }
    const houseData = {
      address,
      city,
      bedrooms,
      bathrooms,
      roomSize,
      imgURL,
      availabilityDate,
      rent: parseInt(rentStr),
      title,
      description,
      number,
      email: user.email,
      name: user.name,
    };
    const res = await AddHouse(houseData);
    if (res.insertedId) {
      toast.success("House Added Successfully");
      refetch();
    } else {
      toast.error("Something Went Wrong");
    }
    closeAddModal();
  };
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeAddModal}>
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
                    Add House
                  </Dialog.Title>
                  <form onSubmit={handleAddHouse} className="space-y-2">
                    <label className="pr-2" htmlFor="title">
                      Title:{" "}
                    </label>
                    <input
                      required
                      className="bg-fill pl-2 py-1 rounded-md"
                      type="text"
                      name="title"
                      id="title"
                    />
                    <br />
                    <label className="pr-2" htmlFor="description">
                      Description:{" "}
                    </label>
                    <input
                      className="bg-fill pl-2 py-1 rounded-md"
                      required
                      type="text"
                      name="description"
                      id="description"
                    />
                    <br />
                    <label className="pr-2" htmlFor="imgURL">
                      Image URL:{" "}
                    </label>
                    <input
                      className="bg-fill pl-2 py-1 rounded-md"
                      required
                      type="text"
                      name="imgURL"
                      id="imgURL"
                    />
                    <br />
                    <label className="pr-2" htmlFor="address">
                      Address:{" "}
                    </label>
                    <input
                      className="bg-fill pl-2 py-1 rounded-md"
                      required
                      type="text"
                      name="address"
                      id="address"
                    />
                    <br />
                    <label className="pr-2" htmlFor="city">
                      City:{" "}
                    </label>
                    <input
                      className="bg-fill pl-2 py-1 rounded-md"
                      required
                      type="text"
                      name="city"
                      id="city"
                    />
                    <br />
                    <label className="pr-2" htmlFor="bedrooms">
                      Bedrooms:{" "}
                    </label>
                    <input
                      className="bg-fill pl-2 py-1 rounded-md"
                      required
                      type="number"
                      name="bedrooms"
                      id="bedrooms"
                    />
                    <br />
                    <label className="pr-2" htmlFor="Bathrooms">
                      Bathrooms:{" "}
                    </label>
                    <input
                      className="bg-fill pl-2 py-1 rounded-md"
                      required
                      type="number"
                      name="bathrooms"
                      id="bathrooms"
                    />
                    <br />
                    <label className="pr-2" htmlFor="roomSize">
                      Room Size:{" "}
                    </label>
                    <input
                      className="bg-fill pl-2 py-1 rounded-md"
                      required
                      type="text"
                      name="roomSize"
                      id="roomSize"
                    />
                    <br />
                    <label className="pr-2" htmlFor="rent">
                      Rent:{" "}
                    </label>
                    <input
                      className="bg-fill pl-2 py-1 rounded-md"
                      required
                      type="number"
                      name="rent"
                      id="rent"
                    />
                    <br />
                    <label className="pr-2" htmlFor="availabilityDate">
                      Availability Date:{" "}
                    </label>
                    <input
                      className="bg-fill pl-2 py-1 rounded-md"
                      required
                      type="date"
                      name="availabilityDate"
                      id="availabilityDate"
                    />
                    <br />
                    <label className="pr-2" htmlFor="number">
                      Mobile:
                    </label>
                    <input
                      placeholder="01*********"
                      className="bg-fill pl-2 py-1 rounded-md"
                      required
                      type="number"
                      name="number"
                      id="number"
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

export default AddModal;
