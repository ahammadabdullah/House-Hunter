import { Outlet } from "react-router-dom";
import NavBar from "../Components/NavBar";

const Layout = () => {
  return (
    <div>
      <NavBar />
      <div className="bg-white">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
