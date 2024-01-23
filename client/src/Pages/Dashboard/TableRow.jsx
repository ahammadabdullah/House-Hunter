import { useState } from "react";
import EditModal from "../../Components/Modals/EditModal";
import { deleteHouse } from "../../lib/apis";
import toast from "react-hot-toast";

const TableRow = ({ house, refetch }) => {
  const { title, address, imgURL, _id } = house;
  let [isOpen, setIsOpen] = useState(false);

  const handleDelete = async () => {
    const res = await deleteHouse(_id);
    refetch();
    if (res.deletedCount !== 0) {
      toast.success("Deleted Successfully");
      refetch();
    } else {
      toast.error("Something Went Wrong");
    }
  };
  function closeEditModal() {
    setIsOpen(false);
  }

  function openEditModal() {
    setIsOpen(true);
  }
  return (
    <>
      <tr class="border-b bg-fill text-black">
        <th scope="row" class="px-6 py-4 font-medium whitespace-nowrap ">
          {title}
        </th>
        <td class="px-6 py-4">
          <img className="w-14" src={imgURL} alt="" />
        </td>
        <td class="px-6 py-4">{address}</td>
        <td class="px-6 py-4">
          <button className="bg-secondary p-2 rounded" onClick={openEditModal}>
            Edit
          </button>
        </td>
        <td class="px-6 py-4">
          <button onClick={handleDelete}>Delete</button>
        </td>
      </tr>
      <EditModal
        refetch={refetch}
        house={house}
        isOpen={isOpen}
        closeEditModal={closeEditModal}
      />
    </>
  );
};

export default TableRow;
