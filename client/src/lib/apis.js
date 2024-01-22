import useAxiosPublic from "../Hooks/useAxiosPublic";
const axiosPublic = useAxiosPublic();
export const getAllHouses = async () => {
  const { data } = await axiosPublic("/houses");
  return data;
};
