import React from "react";

const Section1 = () => {
  return (
    <div className="text-sm md:text-base  md:p-16 p-10">
      <p className="Goldman text-3xl text-center md:text-4xl font-bold mb-5">
        Share Your Professional Vision
      </p>
      <p className="font-segoe text-md text-center md:text-lg max-w-2xl mx-auto mb-8">
        Discover and share business ideas, startup pitches, product demos, and
        innovative solutions in one place.
      </p>
      <div className="flex justify-center">
        <div className="flex w-[600px]">
          <input
            type="text"
            placeholder="Search for videos, creators, or topics..."
            className="border border-green-700 px-4 py-2 rounded-l-3xl w-full focus:!outline-none"
          />
          <button className="bg-[#458C58] text-white px-5 py-2 rounded-r-3xl hover:bg-green-800 transition-all duration-300">
            Search
          </button>
        </div>
      </div>
      <div>
        <ul>
            <button><li>All</li></button>
            <button><li>Startup Pitch</li></button>
            <button><li>Product Demo</li></button>
            <button><li>Business Idea</li></button>
            <button><li>Promotional</li></button>
            <button><li>Podcast</li></button>
            <button><li>Other</li></button>
        </ul>
      </div>
    </div>
  );
};

export default Section1;
