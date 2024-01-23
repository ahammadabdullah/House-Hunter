import ProfileDropDown from "../../Components/ProfileDropDown";
import Owner from "./Owner";
import Renter from "./Renter";

const Dashboard = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <Owner />
      <Renter />
    </div>
  );
};

export default Dashboard;
