import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { bookHouse } from "../../lib/apis";
import { toast } from "react-hot-toast";
import useAuth from "../../Hooks/useAuth";
const BookModal = ({ house, isOpen, closeBookModal }) => {
  const { user } = useAuth();
  const { _id, title, rent, address, description } = house || {};
  const regex = /^(013|014|015|016|017|018|019)\d{8}$/;
  const handleAddHouse = async (e) => {
    e.preventDefault();
    const form = e.target;
    const number = form.number.value;
    const isValid = regex.test(number);
    if (!isValid) {
      toast.error("Provide a valid Bangladeshi Number");
      return;
    }
    const bookingData = {
      houseId: _id,
      title,
      rent,
      address,
      renterName: user?.name,
      renterNumber: number,
      renterEmail: user?.email,
    };
    const res = await bookHouse(bookingData);
    if (res.insertedId) {
      toast.success("House Added Successfully");
      refetch();
    } else {
      toast.error("Something Went Wrong");
    }
    closeAddModal();
    console.log(res);
  };
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeBookModal}>
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
                    Book House {title}
                  </Dialog.Title>
                  <div>
                    <p> {description} BDT</p>
                    <p>Rent: {rent} BDT</p>
                    <p>Address: {address} BDT</p>
                  </div>
                  <form onSubmit={handleAddHouse} className="space-y-2">
                    <label className="pr-2" htmlFor="number">
                      Name:
                    </label>
                    <input
                      disabled
                      defaultValue={user?.name}
                      className="bg-fill pl-2 py-1 rounded-md"
                      type="text"
                      name="name"
                      id="name"
                    />
                    <br />
                    <label className="pr-2" htmlFor="number">
                      Email:
                    </label>
                    <input
                      disabled
                      defaultValue={user?.email}
                      className="bg-fill pl-2 py-1 rounded-md"
                      type="text"
                      name="email"
                      id="email"
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
                      Confirm Booking
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

export default BookModal;
