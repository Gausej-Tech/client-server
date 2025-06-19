import React from "react";
import { Link } from "react-router-dom";

const Section3 = () => {
  return (
    <div className="bg-[#458C58] text-md md:text-base text-white py-16 px-6 md:px-20 text-center ">
      <h2 className="Goldman text-4xl md:text-5xl font-bold mb-6">
        Ready to Share Your Vision?
      </h2>
      <p className="font-segoe text-md md:text-lg max-w-2xl mx-auto mb-8">
        Join thousands of entrepreneurs and business professionals showcasing
        their ideas on <strong>Gausej</strong>.
      </p>
      <Link
        to="/"
        className="bg-white text-[#458C58] px-7 py-4 rounded-lg text-lg font-semibold hover:bg-[#458C58] hover:text-white transition-all duration-300"
      >
        Get Started for Free
      </Link>
    </div>
  );
};

export default Section3;
