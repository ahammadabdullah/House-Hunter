import useAxiosPublic from "../Hooks/useAxiosPublic";
const axiosPublic = useAxiosPublic();
export const getAllHouses = async (pageParam) => {
  const { data } = await axiosPublic(`/houses?cursor=${pageParam}`);
  return data;
};
