import { useState } from "react";
import EditModal from "../../Components/Modals/EditModal";

const TableRow = ({ house }) => {
  const { title, address, imgURL } = house;
  let [isOpen, setIsOpen] = useState(true);

  function closeEditModal() {
    setIsOpen(false);
  }

  function openEditModal() {
    setIsOpen(true);
  }
  return (
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
        <button>Delete</button>
      </td>
      <EditModal
        house={house}
        isOpen={isOpen}
        closeEditModal={closeEditModal}
      />
    </tr>
  );
};

export default TableRow;
