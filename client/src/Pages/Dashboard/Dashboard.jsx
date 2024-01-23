import useAuth from "../../Hooks/useAuth";
import Owner from "./Owner";
import Renter from "./Renter";

const Dashboard = () => {
  const { user } = useAuth();
  return (
    <div className="max-w-7xl mx-auto">
      {user?.role === "owner" ? (
        <Owner />
      ) : user?.role === "renter" ? (
        <Renter />
      ) : (
        ""
      )}
    </div>
  );
};

export default Dashboard;
