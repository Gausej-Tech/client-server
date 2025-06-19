import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";

const Header = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const isLoggedIn = localStorage.getItem("token"); 

  const isActive = (path) =>
    location.pathname === path ? "text-[#458C58] font-semibold" : "";

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className="fixed top-0 left-0 w-full z-50 shadow-lg">

      <div className="px-6 py-4 md:px-16 flex items-center justify-between bg-[#F5FBF1]">
       
        <Link
          to="/"
          className="Goldman text-3xl md:text-4xl font-bold text-[#458C58]"
        >
          GausejTech
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden md:flex gap-6 items-center">
          <li>
            <Link to="/" className={`hover:text-[#458C58]  ${isActive("/")}`}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/explore" className={`hover:text-[#458C58] ${isActive("/explore")}`}>
              Explore
            </Link>
          </li>
          <li>
            <Link to="/upload" className={`hover:text-[#45800b16aC58]  ${isActive("/upload")}`}>
              Upload
            </Link>
          </li>
        </ul>

        {/* Desktop Auth Button */}
        <div className="hidden md:block">
          <Link to={isLoggedIn ? "/profile" : "/signin"} className="green-button">
            {isLoggedIn ? "Profile" : "Signin"}
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden text-2xl cursor-pointer" onClick={toggleMenu}>
          {menuOpen ? <FiX /> : <FiMenu />}
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden px-6 pb-4 overflow-auto bg-[#F5FBF1]">
            <hr className="mb-5 text-[#458C58] opacity-45"/>
          <ul className="flex flex-col gap-3 text-lg">
            <li>
              <Link
                to="/"
                className={`block hover:text-[#458C58] text-sm md:text-base ${isActive("/")}`}
                onClick={() => setMenuOpen(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/explore"
                className={`block hover:text-[#458C58] text-sm md:text-base ${isActive("/explore")}`}
                onClick={() => setMenuOpen(false)}
              >
                Explore
              </Link>
            </li>
            <li>
              <Link
                to="/upload"
                className={`block hover:text-[#458C58] text-sm md:text-base ${isActive("/upload")}`}
                onClick={() => setMenuOpen(false)}
              >
                Upload
              </Link>
            </li>
            <li>
              <Link
                to={isLoggedIn ? "/profile" : "/signin"}
                className="green-button inline-block mt-2 text-sm md:text-base"
                onClick={() => setMenuOpen(false)}
              >
                {isLoggedIn ? "Profile" : "Signin"}
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
