import { Outlet } from "react-router-dom";
import NavBar from "../Components/NavBar";

const Layout = () => {
  return (
    <div>
      <NavBar />
      <div className="bg-orange-200">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
