import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { FaChevronDown } from "react-icons/fa";
import axios from "../utils/axios";

const Header = ({ onSigninClick }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dropdownRef = useRef();

  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [open, setOpen] = useState(false);

  // ✅ Detect click outside dropdown to close
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ✅ Check login on mount (enable this)
  useEffect(() => {
    const checkLogin = async () => {
      try {
        const res = await axios.get("/user/me");
        setIsLoggedIn(!!res.data);
      } catch (err) {
        setIsLoggedIn(false);
      }
    };

    checkLogin();
  }, []);

  // ✅ Logout handler
  const handleLogout = async () => {
    try {
      await axios.post("/auth/logout");
      setIsLoggedIn(false);
      setMenuOpen(false);
      navigate("/");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const isActive = (path) =>
    location.pathname === path ? "text-[#458C58] font-semibold" : "";

  // ✅ Reusable profile dropdown
  const profileDropdown = (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="green-button flex items-center gap-1"
      >
        Profile <FaChevronDown size={12} />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
          <div className="py-1 text-sm text-gray-700">
            <Link
              to="/profile"
              className="block px-4 py-2 hover:bg-gray-100"
              onClick={() => {
                setOpen(false);
                setMenuOpen(false);
              }}
            >
              My Profile
            </Link>
            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-2 hover:bg-gray-100"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <header className="fixed top-0 left-0 w-full z-50 shadow bg-white text-sm md:text-base">
      <div className="px-6 py-4 md:px-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="Segoe flex gap-3 text-3xl md:text-4xl font-bold text-gray-800"
        >
          <img src="/logo.png" alt="Logo" className="w-12 h-12" />
          Gausej
        </Link>

        {/* Desktop Navigation */}
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
              to="/video"
              className={`hover:text-[#458C58] ${isActive("/video")}`}
            >
              Videos
            </Link>
          </li>
        </ul>

        {/* Desktop Auth */}
        <div className="hidden md:block">
          {isLoggedIn ? (
            profileDropdown
          ) : (
            <button onClick={onSigninClick} className="green-button">
              Signin
            </button>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div
          className="md:hidden text-2xl cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden px-6 pb-4 bg-white">
          <hr className="mb-5 text-[#458C58] opacity-45" />
          <ul className="flex flex-col gap-3 text-sm">
            <li>
              <Link
                to="/"
                className={`block hover:text-[#458C58] ${isActive("/")}`}
                onClick={() => setMenuOpen(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/upload"
                className={`block hover:text-[#458C58] ${isActive("/upload")}`}
                onClick={() => setMenuOpen(false)}
              >
                Upload
              </Link>
            </li>
            <li>
              <Link
                to="/video"
                className={`block hover:text-[#458C58] ${isActive("/video")}`}
                onClick={() => setMenuOpen(false)}
              >
                Videos
              </Link>
            </li>
            <li>
              {isLoggedIn ? (
                profileDropdown
              ) : (
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    onSigninClick();
                  }}
                  className="green-button inline-block text-sm"
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
