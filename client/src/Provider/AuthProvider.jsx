import { createContext } from "react";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const loginWithEmail = async (email, password) => {
    try {
      const res = await axios.post("/login", { email, password });
      return res.data;
    } catch (err) {
      return err;
    }
  };
  const logout = async () => {
    try {
      const res = await axios.get("/logout");
      return res.data;
    } catch (err) {
      return err;
    }
  };
  const registerWithEmail = async (email, password, name, number, role) => {
    try {
      const res = await axios.post("/register", {
        email,
        password,
        name,
        number,
        role,
      });
      return res.data;
    } catch (err) {
      return err;
    }
  };
  const value = { loginWithEmail, logout, registerWithEmail };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
