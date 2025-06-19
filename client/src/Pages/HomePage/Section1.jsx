import React from "react";

const Section1 = () => {
  return (
    <div className="text-sm md:text-base  md:p-16 p-10">
      <p className=" text-3xl text-center md:text-4xl font-bold mb-5">
        Share Your Professional Vision
      </p>
      <p className=" text-md text-gray-500 text-center md:text-lg max-w-xl mx-auto mb-8">
        Discover and share business ideas, startup pitches, product demos, and
        innovative solutions in one place.
      </p>
      <div className="flex justify-center">
        <div className="flex w-[600px] ">
          <input
            type="text"
            placeholder="Search for videos, creators, or topics..."
            className="border-t border-b border-l border-[#458C58] px-4 py-2 rounded-l-3xl w-full focus:!outline-none"
          />
          <button className="bg-white border-t border-b border-r cursor-pointer px-5 py-2 !border-text-[#458C58] rounded-r-3xl hover:!border-[#458C58] transition-all duration-300">
            🔍
          </button>
        </div>
      </div>
      
    </div>
  );
};

export default Section1;
