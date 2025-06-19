import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#373737] text-white px-6 py-10 md:px-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
      
        <div>
          <p className="text-2xl font-semibold Goldman mb-4">Company</p>
          <ul className="space-y-2 text-sm">
            <li><Link to="/about" className="hover:text-[#A3A3A3] transition-all duration-300">About Us</Link></li>
            <li><Link to="/career" className="hover:text-[#A3A3A3] transition-all duration-300">Careers</Link></li>
            <li><Link to="/press" className="hover:text-[#A3A3A3] transition-all duration-300">Press</Link></li>
            <li><Link to="/blog" className="hover:text-[#A3A3A3] transition-all duration-300">Blog</Link></li>
          </ul>
        </div>

       
        <div>
          <p className="text-2xl font-semibold Goldman mb-4">Product</p>
          <ul className="space-y-2 text-sm">
            <li><Link to="/features" className="hover:text-[#A3A3A3] transition-all duration-300">Features</Link></li>
            <li><Link to="/Pricing" className="hover:text-[#A3A3A3] transition-all duration-300">Pricing</Link></li>
            <li><Link to="/enterprise" className="hover:text-[#A3A3A3] transition-all duration-300">Enterprise</Link></li>
            <li><Link to="/security" className="hover:text-[#A3A3A3] transition-all duration-300">Security</Link></li>
          </ul>
        </div>

        <div>
          <p className="text-2xl font-semibold Goldman mb-4">Resources</p>
          <ul className="space-y-2 text-sm">
            <li><Link to="/documentation" className="hover:text-[#A3A3A3] transition-all duration-300">Documentation</Link></li>
            <li><Link to="/guides" className="hover:text-[#A3A3A3] transition-all duration-300">Guides</Link></li>
            <li><Link to="/apis" className="hover:text-[#A3A3A3] transition-all duration-300">APIs</Link></li>
            <li><Link to="/community" className="hover:text-[#A3A3A3] transition-all duration-300">Community</Link></li>
          </ul>
        </div>

        
        <div>
          <p className="text-2xl font-semibold Goldman mb-4">Support</p>
          <ul className="space-y-2 text-sm">
            <li><Link to="/helpCenter" className="hover:text-[#A3A3A3] transition-all duration-300">Help Center</Link></li>
            <li><Link to="/contact" className="hover:text-[#A3A3A3] transition-all duration-300">Contact Us</Link></li>
            <li><Link to="/status" className="hover:text-[#A3A3A3] transition-all duration-300">Status</Link></li>
            <li><Link to="/faqs" className="hover:text-[#A3A3A3] transition-all duration-300">FAQs</Link></li>
          </ul>
        </div>
      </div>

      <hr className="mt-10 text-[#A3A3A3]"/>
      <div className="text-center mt-10 text-sm text-[#A3A3A3]">
        © {new Date().getFullYear()} GausejTech. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
