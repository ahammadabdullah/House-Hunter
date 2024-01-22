import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <div className=" flex justify-center gap-5 pt-5">
      <NavLink
        className={({ isActive }) =>
          isActive ? "bg-blue-500 p-2 rounded-md" : "p-2"
        }
        to="/"
      >
        Home
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive ? "bg-blue-500 p-2 rounded-md" : "p-2"
        }
        to="/dashboard"
      >
        Dashboard
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive ? "bg-blue-500 p-2 rounded-md" : "p-2"
        }
        to="/login"
      >
        Login
      </NavLink>
    </div>
  );
};

export default Header;
