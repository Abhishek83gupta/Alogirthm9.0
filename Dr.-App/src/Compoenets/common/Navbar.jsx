import React, { useState } from "react";
import logo from "../../assets/assets_frontend/logo.svg";
import profile_pic from "../../assets/assets_frontend/profile_pic.png";
import dropdown from "../../assets/assets_frontend/dropdown_icon.svg";
import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Appcontext } from "../../Context/Context";

function Navbar() {
  const navigate = useNavigate();
  const { token, settoken } = useContext(Appcontext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  const logout = () => {
    settoken("");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      <div className="flex flex-row justify-between items-center p-4 m-4 border-b-2 border-gray-700 shadow-lg bg-[#1e293b]">
        {/* Logo */}
        <img
          onClick={() => navigate("/")}
          src={logo}
          alt="logo"
          className="w-28 cursor-pointer"
        />

        {/* Desktop Menu */}
        <div className="hidden md:flex">
          <ul className="flex flex-row items-center justify-between p-3 m-2 gap-6 lg:gap-14">
            {["/", "/prediction", "/Doctor", "/about", "/contact"].map((path, index) => (
              <NavLink
                key={index}
                to={path}
                className={({ isActive }) =>
                  isActive
                    ? "text-[#3b82f6]"
                    : "text-gray-300 hover:text-[#3b82f6]"
                }
              >
                <li className="text-lg lg:text-xl font-semibold select-none transition-colors duration-300">
                  {path === "/" ? "HOME" : path.replace("/", "").toUpperCase()}
                </li>
              </NavLink>
            ))}
          </ul>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="focus:outline-none"
          >
            <svg
              className="w-8 h-8 text-gray-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>

        {/* Profile Menu */}
        {token ? (
          <div className="relative hidden md:block">
            <div
              className="flex flex-row gap-2 cursor-pointer"
              onClick={() => setProfileMenuOpen(!profileMenuOpen)}
            >
              <img
                src={profile_pic}
                className="rounded-full w-12 lg:w-14"
                alt="profile"
              />
              <img src={dropdown} className="w-6 lg:w-7" alt="dropdown icon" />
            </div>

            {/* Profile Dropdown */}
            {profileMenuOpen && (
              <div className="absolute z-20 right-0 w-48 lg:w-56 bg-[#2d3748] p-4 rounded-lg border border-gray-700">
                <p
                  onClick={() => navigate("/Myprofile")}
                  className="hover:text-[#3b82f6] cursor-pointer text-lg lg:text-xl text-gray-300 select-none transition-colors duration-300"
                >
                  My Profile
                </p>
                <p
                  onClick={() => navigate("/My_Appoiment")}
                  className="hover:text-[#3b82f6] cursor-pointer text-lg lg:text-xl text-gray-300 select-none transition-colors duration-300"
                >
                  My Appointments
                </p>
                <p
                  onClick={logout}
                  className="hover:text-[#3b82f6] cursor-pointer text-lg lg:text-xl text-gray-300 select-none transition-colors duration-300"
                >
                  Logout
                </p>
              </div>
            )}
          </div>
        ) : (
          <button
            className="bg-[#3b82f6] text-lg lg:text-xl p-2 lg:p-3 text-white rounded-full select-none hidden md:block hover:bg-[#1e3a8a] transition-colors duration-300"
            onClick={() => navigate("/login")}
          >
            Create account
          </button>
        )}
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden flex flex-col bg-[#1e293b] shadow-lg px-4 py-4 space-y-4">
          {["/", "/Doctor", "/about", "/contact", "/prediction"].map((path, index) => (
            <NavLink
              key={index}
              to={path}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                isActive ? "text-[#3b82f6]" : "text-gray-300"
              }
            >
              <li className="text-lg font-semibold">
                {path === "/" ? "HOME" : path.replace("/", "").toUpperCase()}
              </li>
            </NavLink>
          ))}

          {/* Conditional Login/Logout in Mobile View */}
          {token ? (
            <div className="flex flex-col gap-4 bg-[#2d3748] p-4 rounded-lg border border-gray-700">
              <p
                onClick={() => navigate("/Myprofile")}
                className="hover:text-[#3b82f6] cursor-pointer text-lg text-gray-300 transition-colors duration-300"
              >
                My Profile
              </p>
              <p
                onClick={() => navigate("/My_Appoiment")}
                className="hover:text-[#3b82f6] cursor-pointer text-lg text-gray-300 transition-colors duration-300"
              >
                My Appointments
              </p>
              <p
                onClick={logout}
                className="hover:text-[#3b82f6] cursor-pointer text-lg text-gray-300 transition-colors duration-300"
              >
                Logout
              </p>
            </div>
          ) : (
            <button
              className="bg-[#3b82f6] text-lg p-2 text-white rounded-full hover:bg-[#1e3a8a] transition-colors duration-300"
              onClick={() => navigate("/login")}
            >
              Create account
            </button>
          )}
        </div>
      )}
    </>
  );
}

export default Navbar;
