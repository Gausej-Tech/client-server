import React from "react";
import { Link } from "react-router-dom";
import { TbBrandLinkedin } from "react-icons/tb";
import { FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#373737] text-white px-6 py-10 md:px-8">
      <div className="max-w-screen-lg mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        <div className="text-center sm:text-left">
          <p className="text-2xl font-semibold mb-4">Company</p>
          <ul className="space-y-2 text-sm">
            <li>
              <Link
                to="/about"
                className="hover:text-[#A3A3A3] transition-all duration-300"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                to="/career"
                className="hover:text-[#A3A3A3] transition-all duration-300"
              >
                Careers
              </Link>
            </li>
            <li>
              <Link
                to="/press"
                className="hover:text-[#A3A3A3] transition-all duration-300"
              >
                Press
              </Link>
            </li>
            <li>
              <Link
                to="/blog"
                className="hover:text-[#A3A3A3] transition-all duration-300"
              >
                Blog
              </Link>
            </li>
          </ul>
        </div>

        <div className="text-center sm:text-left">
          <p className="text-2xl font-semibold mb-4">Follow Us</p>
          <ul className="flex justify-center sm:justify-start gap-6">
            <li className="text-2xl cursor-pointer font-semibold hover:-translate-y-2 mb-4 transition-all duration-300 hover:text-[#A3A3A3]">
              <TbBrandLinkedin />
            </li>
            <li className="text-2xl cursor-pointer font-semibold hover:-translate-y-2 mb-4 transition-all duration-300 hover:text-[#A3A3A3]">
              <FaInstagram />
            </li>
          </ul>
        </div>

        <div className="text-center sm:text-left">
          <p className="text-2xl font-semibold mb-4">Contact Us</p>
          <p>ceo@gausej.tech</p>
        </div>
      </div>

      <hr className="mt-10 border-[#A3A3A3]" />
      <div className="text-center mt-10 text-sm text-[#A3A3A3]">
        © {new Date().getFullYear()} GausejTech. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
