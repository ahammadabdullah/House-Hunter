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
      <tr className="border-b bg-fill text-black">
        <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap ">
          {title}
        </th>
        <td className="px-6 py-4">
          <img className="w-14" src={imgURL} alt="" />
        </td>
        <td className="px-6 py-4">{address}</td>
        <td className="px-6 py-4">
          <button
            className="bg-secondary p-2 rounded hover:text-primary"
            onClick={openEditModal}
          >
            Edit
          </button>
        </td>
        <td className="px-6 py-4">
          <button
            className="bg-secondary p-2 rounded hover:text-primary"
            onClick={handleDelete}
          >
            Delete
          </button>
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
