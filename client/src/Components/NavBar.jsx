import { Link, NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="bg-fill">
      <div className="py-5  flex items-center justify-between max-w-7xl mx-auto">
        <div>
          <Link
            className="text-primary text-3xl font-bold cursor-default"
            to={"/"}
          >
            House Hunter
          </Link>
        </div>
        <div className=" flex justify-center gap-5 ">
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "bg-secondary text-primary p-2 rounded-md font-medium"
                : "p-2 hover:text-primary hover:bg-secondary hover:font-medium rounded-md"
            }
            to="/"
          >
            Home
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "bg-secondary text-primary p-2 rounded-md font-medium"
                : "p-2 hover:text-primary hover:bg-secondary hover:font-medium rounded-md"
            }
            to="/dashboard"
          >
            Dashboard
          </NavLink>
        </div>
        <div>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "bg-secondary text-primary p-2 rounded-md font-medium"
                : "p-2 hover:text-primary hover:bg-secondary hover:font-medium rounded-md"
            }
            to="/login"
          >
            Login
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
