import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { FaChevronDown } from "react-icons/fa";
import axios from "../utils/axios";
import toast, { Toaster } from "react-hot-toast";

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

  useEffect(() => {
    const checkLogin = () => {
      const user = localStorage.getItem("user");
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    };
    checkLogin();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post("/auth/logout");

      localStorage.removeItem("user");

      setIsLoggedIn(false);
      setMenuOpen(false);
      toast.success("Logout Successfully!");

      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (err) {
      console.error("Logout failed:", err);
      toast.error("Logout failed");
    }
  };

  const isActive = (path) =>
    location.pathname === path ? "text-[#458C58] font-semibold" : "";

  const handleUploadClick = () => {
    if (isLoggedIn) {
      navigate("/upload");
    } else {
      toast.error("You are not logged in. Please login first to upload!");
    }
  };

  // ✅ Reusable profile dropdown
  const profileDropdown = (
    <div className="relative inline-block text-right" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="green-button flex items-center gap-1"
      >
        Profile <FaChevronDown size={12} />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-24 rounded-md shadow-lg bg-white ring-1 ring-gray-500 ring-opacity-5 z-50">
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
              className="block w-full text-right px-4 py-2 hover:bg-gray-100"
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
      <Toaster />
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
            <span
              onClick={handleUploadClick}
              className={`cursor-pointer hover:text-[#458C58] ${isActive(
                "/upload"
              )}`}
            >
              Upload
            </span>
          </li>
          <li>
            <Link
              to="/gallery"
              className={`hover:text-[#458C58] ${isActive("/gallery")}`}
            >
              Gallery
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
              <span
                onClick={handleUploadClick}
                className={`cursor-pointer hover:text-[#458C58] ${isActive(
                  "/upload"
                )}`}
              >
                Upload
              </span>
            </li>
            <li>
              <Link
                to="/gallery"
                className={`block hover:text-[#458C58] ${isActive("/gallery")}`}
                onClick={() => setMenuOpen(false)}
              >
                Gallery
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
