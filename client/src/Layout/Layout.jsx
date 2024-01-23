import { Outlet } from "react-router-dom";
import NavBar from "../Components/NavBar";
import { Toaster } from "react-hot-toast";

const Layout = () => {
  return (
    <div>
      <Toaster />
      <NavBar />
      <div className="bg-white">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
