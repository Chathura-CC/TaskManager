import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle, faBars } from "@fortawesome/free-solid-svg-icons";
import PasswordResetPopup from "./PasswordResetPopup";
const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, user } = useSelector((state) => state.auth);
  const [showMenu, setShowMenu] = useState(false);
  const [showPasswordReset, setShowPasswordReset] = useState(false);
  const [showNavbar, setShowNavbar] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const handleUserIconClick = () => {
    setShowMenu(!showMenu);
  };

  const handleNavbarToggle = () => {
    setShowNavbar(!showNavbar);
  };

  return (
    <header className="bg-gray-800 text-white p-4 shadow-lg">
      <nav className="flex justify-between items-center flex-wrap">
        <div className="font-bold text-xl mb-2 sm:mb-0">
          Serendip Task Manager
        </div>

        <div className="sm:hidden">
          <FontAwesomeIcon
            icon={faBars}
            size="lg"
            className="cursor-pointer text-white"
            onClick={handleNavbarToggle}
          />
        </div>

        <div className="hidden sm:flex space-x-4">
          <Link to="/" className="text-white hover:text-gray-300">
            Home
          </Link>
          <Link to="/dashboard" className="text-white hover:text-gray-300">
            Dashboard
          </Link>

          {token ? (
            <div className="relative">
              <FontAwesomeIcon
                icon={faUserCircle}
                size="2x"
                className="cursor-pointer text-white hover:text-gray-300"
                onClick={handleUserIconClick}
              />
              {showMenu && (
                <div className="absolute right-0 mt-2 bg-white text-black rounded shadow-lg w-48">
                  <div className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                    {user?.username || "User"}
                  </div>
                  <div
                    onClick={() => setShowPasswordReset(true)}
                    className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                  >
                    Reset Password
                  </div>
                  <div
                    onClick={handleLogout}
                    className="px-4 py-2 text-red-500 hover:bg-gray-200 cursor-pointer"
                  >
                    Logout
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="px-4 py-2 bg-blue-500 rounded text-white hover:bg-blue-600"
            >
              Login
            </Link>
          )}
        </div>
      </nav>

      {showNavbar && (
        <div className="sm:hidden flex flex-col items-center space-y-4 mt-4">
          <Link
            to="/"
            className="text-white hover:text-gray-300"
            onClick={() => setShowNavbar(false)}
          >
            Home
          </Link>
          <Link
            to="/dashboard"
            className="text-white hover:text-gray-300"
            onClick={() => setShowNavbar(false)}
          >
            Dashboard
          </Link>

          {token ? (
            <div className="relative">
              <FontAwesomeIcon
                icon={faUserCircle}
                size="2x"
                className="cursor-pointer text-white hover:text-gray-300"
                onClick={handleUserIconClick}
              />

              {showMenu && (
                <div className="absolute right-0 mt-2 bg-white text-black rounded shadow-lg w-48">
                  <div className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                    {user?.username || "User"}
                  </div>
                  <div
                    onClick={() => setShowPasswordReset(true)}
                    className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                  >
                    Reset Password
                  </div>
                  <div
                    onClick={handleLogout}
                    className="px-4 py-2 text-red-500 hover:bg-gray-200 cursor-pointer"
                  >
                    Logout
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="px-4 py-2 bg-blue-500 rounded text-white hover:bg-blue-600"
              onClick={() => setShowNavbar(false)}
            >
              Login
            </Link>
          )}
        </div>
      )}

      {showPasswordReset && (
        <PasswordResetPopup closePopup={() => setShowPasswordReset(false)} />
      )}
    </header>
  );
};

export default Header;
