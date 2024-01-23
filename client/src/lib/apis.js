import useAxiosPublic from "../Hooks/useAxiosPublic";
import useAxiosSecure from "../Hooks/useAxiosSecure";
const axiosPublic = useAxiosPublic();
const axiosSecure = useAxiosSecure();
export const getAllHouses = async (pageParam) => {
  const { data } = await axiosPublic(`/houses?cursor=${pageParam}`);
  return data;
};

export const getOwnerHouses = async (email) => {
  const { data } = await axiosSecure(`/houses/owner/${email}`);
  return data;
};

export const editHouse = async (id, updatedData) => {
  const { data } = await axiosSecure.put(`/houses/${id}`, updatedData);
  return data;
};

export const deleteHouse = async (id) => {
  const { data } = await axiosSecure.delete(`/houses/${id}`);
  return data;
};
