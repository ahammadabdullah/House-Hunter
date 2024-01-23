import useAuth from "../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { getOwnerHouses } from "../../lib/apis";
import TableRow from "./TableRow";

const Owner = () => {
  const { user } = useAuth();
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["owner-houses"],
    queryFn: () => getOwnerHouses(user?.email),
  });
  console.log(isLoading);
  return (
    <div>
      <h3>Owner Dashboard</h3>

      <div class="relative overflow-x-auto">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-primary uppercase  bg-secondary">
            <tr>
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
      </div>
    </div>
  );
};

export default Owner;
