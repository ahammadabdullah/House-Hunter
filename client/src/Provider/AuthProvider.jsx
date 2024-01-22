import useAxiosPublic from "../Hooks/useAxiosPublic";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const axiosPublic = useAxiosPublic();
  const getUser = async (email) => {
    const res = await axiosPublic.get(`/users/:${email}`);
    return res.data;
  };
  const loginWithEmail = async (email, password) => {
    try {
      const res = await axiosPublic.put("/login", { email, password });
      if (res.status === 200) {
        const uData = await axiosPublic.get(`/users/${email}`);
        localStorage.setItem("email", email);
        setUser(uData.data);
      }
      return res.data;
    } catch (err) {
      return err;
    }
  };
  const logout = async () => {
    try {
      const res = await axiosPublic.put("/logout");
      if (res.status === 200) {
        setUser(null);
        localStorage.removeItem("email");
      }
      return res.data;
    } catch (err) {
      return err;
    }
  };
  const registerWithEmail = async (email, password, name, number, role) => {
    try {
      const res = await axiosPublic.post("/register", {
        email,
        password,
        name,
        number,
        role,
      });
      if (res.status === 200) {
        const uData = await axiosPublic.get(`/users/${email}`);
        localStorage.setItem("email", email);
        setUser(uData.data);
      }
      return res.data;
    } catch (err) {
      return err;
    }
  };
  useEffect(() => {
    const email = localStorage.getItem("email");
    if (email) {
      const checkUser = async () => {
        const userData = await axiosPublic.get(`/users/${email}`);
        setUser(userData.data);
      };
      checkUser();
    }
  }, []);
  const value = { loginWithEmail, logout, registerWithEmail, user };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
