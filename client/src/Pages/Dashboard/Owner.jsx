import useAuth from "../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { getOwnerHouses } from "../../lib/apis";
import TableRow from "./TableRow";
import AddModal from "../../Components/Modals/AddModal";
import { useState } from "react";

const Owner = () => {
  let [isOpen, setIsOpen] = useState(false);

  const { user } = useAuth();
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["owner-houses"],
    queryFn: () => getOwnerHouses(user?.email),
  });
  function closeAddModal() {
    setIsOpen(false);
  }

  function openAddModal() {
    setIsOpen(true);
  }
  console.log(data);
  return (
    <div>
      <h3 className="text-center text-2xl py-5">Owner's Dashboard</h3>
      <div className="flex justify-center">
        <button
          className="p-2 bg-fill hover:bg-secondary hover:text-primary rounded-md mb-5"
          onClick={openAddModal}
        >
          Add House
        </button>
      </div>
      <div class="relative overflow-x-auto rounded-md mb-10">
        {data?.length > 0 && (
          <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
            <thead class="text-xs text-primary uppercase  bg-secondary ">
              <tr className="">
                <th scope="col" class="px-6 py-3">
                  Title
                </th>
                <th scope="col" class="px-6 py-3">
                  Image
                </th>
                <th scope="col" class="px-6 py-3">
                  Address
                </th>
                <th scope="col" class="px-6 py-3">
                  Edit
                </th>
                <th scope="col" class="px-6 py-3">
                  Delete
                </th>
              </tr>
            </thead>
            <tbody>
              {isLoading && <h3>Loading....</h3>}
              {data?.map((house) => (
                <TableRow key={house._id} house={house} refetch={refetch} />
              ))}
            </tbody>
          </table>
        )}
      </div>
      <AddModal
        closeAddModal={closeAddModal}
        openAddModal={openAddModal}
        refetch={refetch}
        isOpen={isOpen}
      />
    </div>
  );
};

export default Owner;
