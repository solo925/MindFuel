import Cookies from "js-cookie";
import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { logout } from "../reducers/loginReducer";
import { RootState } from "../store";

const Navbar: React.FC = () => {
  const isAuthenticated = Cookies.get('token')
  const dispatch = useDispatch();

  const { loading } = useSelector((state: RootState) => state.login);

  // Logout handler
  const onLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(logout());
  };

  // Guest Links
  const guestLinks = (
    <ul className="flex space-x-6 text-black">
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `hover:text-blue-600 ${isActive ? "text-blue-600 font-semibold" : ""}`
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/register"
          className={({ isActive }) =>
            `hover:text-blue-600 ${isActive ? "text-blue-600 font-semibold" : ""}`
          }
        >
          Register
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/login"
          className={({ isActive }) =>
            `hover:text-blue-600 ${isActive ? "text-blue-600 font-semibold" : ""}`
          }
        >
          Login
        </NavLink>
      </li>
    </ul>
  );

  // Authenticated Links
  const authLinks = (
    <ul className="flex space-x-6 text-black">
      <li>
        <NavLink
          to="/goals"
          className={({ isActive }) =>
            `hover:text-blue-600 ${isActive ? "text-blue-600 font-semibold" : ""}`
          }
        >
          Goals
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/habits"
          className={({ isActive }) =>
            `hover:text-blue-600 ${isActive ? "text-blue-600 font-semibold" : ""}`
          }
        >
          Habits
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `hover:text-blue-600 ${isActive ? "text-blue-600 font-semibold" : ""}`
          }
        >
          Profile
        </NavLink>
      </li>
      <li>
        <button
          onClick={onLogout}
          className="hover:text-blue-600 focus:outline-none"
        >
          Logout
        </button>
      </li>
    </ul>
  );

  return (
<nav className="fixed top-0 left-0 z-10 w-full bg-white shadow-md">
  <div className="container flex justify-between items-center px-6 py-4 mx-auto">
    
    <h1 className="text-2xl font-bold text-blue-600">
      <Link to="/">MindFuel</Link>
    </h1>

    
    {!loading && (
      <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
    )}
  </div>
</nav>

  );
};

export default Navbar;
