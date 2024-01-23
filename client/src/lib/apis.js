import useAxiosPublic from "../Hooks/useAxiosPublic";
import useAxiosSecure from "../Hooks/useAxiosSecure";
const axiosPublic = useAxiosPublic();
const axiosSecure = useAxiosSecure();

export const getAllHouses = async (pageParam, query) => {
  const { data } = await axiosPublic(`/houses?cursor=${pageParam}&${query}`);
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

export const AddHouse = async (houseData) => {
  const { data } = await axiosSecure.post(`/houses`, houseData);
  return data;
};

export const bookHouse = async (bookingData) => {
  const { data } = await axiosSecure.post(`/bookings`, bookingData);
  return data;
};

export const getBookings = async (email) => {
  const { data } = await axiosSecure.get(`/bookings/${email}`);
  return data;
};

export const deleteBooking = async (id) => {
  const { data } = await axiosSecure.delete(`/bookings/${id}`);
  return data;
};

export const logout = async (email) => {
  try {
    const res = await axiosPublic.put("/logout", { email });
    if (res.data.success === true) {
      localStorage.removeItem("email");
    }
    return res.data;
  } catch (err) {
    return err;
  }
};
