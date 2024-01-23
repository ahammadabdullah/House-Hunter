import { Navigate } from "react-router-dom";
import useAuth from "../Hooks/useAuth";

const AuthRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) {
    return <h3 className="text-center">Loading...</h3>;
  }
  if (user) {
    return <Navigate to="/" />;
  }
  return children;
};

export default AuthRoute;
