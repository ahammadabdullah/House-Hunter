import useAxiosPublic from "../Hooks/useAxiosPublic";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const axiosPublic = useAxiosPublic();

  const loginWithEmail = async (loginInfo) => {
    try {
      setLoading(true);
      const res = await axiosPublic.put("/login", loginInfo);
      if (res.status === 200) {
        const uData = await axiosPublic.get(`/users/${loginInfo.email}`);
        localStorage.setItem("email", loginInfo.email);
        setUser(uData.data);
        setLoading(false);
      }
      return res.data;
    } catch (err) {
      return err;
    }
  };
  const logout = async (email) => {
    try {
      const res = await axiosPublic.put("/logout", { email });
      if (res.data.success === true) {
        setUser(null);
        localStorage.removeItem("email");
      }
      return res.data;
    } catch (err) {
      return err;
    }
  };
  const registerWithEmail = async (userData) => {
    try {
      setLoading(true);
      const res = await axiosPublic.post("/register", userData);
      if (res.status === 200) {
        const uData = await axiosPublic.get(`/users/${userData?.email}`);
        localStorage.setItem("email", userData.email);
        setUser(uData.data);
        setLoading(false);
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
        setLoading(false);
      };
      checkUser();
    }
  }, []);
  const value = { loginWithEmail, logout, registerWithEmail, user, loading };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
