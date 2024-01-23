/* eslint-disable react/prop-types */
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) {
    return <h3 className="text-center">Loading...</h3>;
  }
  if (!user) {
    console.log(loading);
    return <Navigate to="/login" />;
  }
  return children;
};

export default PrivateRoute;
