import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import logo from "/logo.png";
const Header = ({ onSigninClick }) => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const isActive = (path) =>
    location.pathname === path ? "text-[#458C58] font-semibold" : "";

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className="fixed top-0 left-0 w-full z-50 shadow bg-white">
      <div className="px-6 py-4 md:px-16 flex items-center justify-between">
        <Link
          to="/"
          className="Segoe flex gap-3 text-3xl md:text-4xl font-bold text-gray-800"
        >
          <img src="/logo.png" alt="Logo" className="w-12 h-12" />
          GausejTech
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden md:flex gap-6 items-center">
          <li>
            <Link to="/" className={`hover:text-[#458C58] ${isActive("/")}`}>
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/upload"
              className={`hover:text-[#458C58] ${isActive("/upload")}`}
            >
              Upload
            </Link>
          </li>
          <li>
            <Link
              to="/profile"
              className={`hover:text-[#458C58] ${isActive("/profile")}`}
            >
              Profile
            </Link>
          </li>
        </ul>

        {/* Desktop Auth Button */}
        <div className="hidden md:block">
          {isLoggedIn ? (
            <Link to="/profile" className="green-button">
              Profile
            </Link>
          ) : (
            <button onClick={onSigninClick} className="green-button">
              Signin
            </button>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden text-2xl cursor-pointer" onClick={toggleMenu}>
          {menuOpen ? <FiX /> : <FiMenu />}
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden px-6 pb-4 overflow-auto bg-white">
          <hr className="mb-5 text-[#458C58] opacity-45" />
          <ul className="flex flex-col gap-3 text-lg">
            <li>
              <Link
                to="/"
                className={`block hover:text-[#458C58] text-sm md:text-base ${isActive(
                  "/"
                )}`}
                onClick={() => setMenuOpen(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/upload"
                className={`block hover:text-[#458C58] text-sm md:text-base ${isActive(
                  "/upload"
                )}`}
                onClick={() => setMenuOpen(false)}
              >
                Upload
              </Link>
            </li>
            <li>
              <Link
                to="/profile"
                className={`block hover:text-[#458C58] text-sm md:text-base ${isActive(
                  "/profile"
                )}`}
                onClick={() => setMenuOpen(false)}
              >
                Profile
              </Link>
            </li>
            <li>
              {isLoggedIn ? (
                <Link
                  to="/profile"
                  className="green-button inline-block mt-2 text-sm md:text-base"
                  onClick={() => setMenuOpen(false)}
                >
                  Profile
                </Link>
              ) : (
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    onSigninClick();
                  }}
                  className="green-button inline-block mt-2 text-sm md:text-base"
                >
                  Signin
                </button>
              )}
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
