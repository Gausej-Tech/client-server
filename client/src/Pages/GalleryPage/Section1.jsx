import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import CategoryVideos from "./CategoryVideos";

const Section1 = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const queryCategory = queryParams.get("category");

  const categoryOptions = [
    "Startup Pitch",
    "Product Demo",
    "Business Idea",
    "Promotional",
    "Podcast",
    "Tutorial",
    "Other",
  ];

  // Find category match in any case
  const findMatchingCategory = (query) =>
    categoryOptions.find(
      (option) => option.toLowerCase() === query?.toLowerCase()
    );

  const defaultCategory = findMatchingCategory(queryCategory) || "Startup Pitch";

  const [activeTab, setActiveTab] = useState(defaultCategory);

  useEffect(() => {
    const match = findMatchingCategory(queryCategory);
    if (match) setActiveTab(match);
  }, [queryCategory]);

  return (
    <>
      <div className="py-10 px-4">
        <p className="text-center font-bold md:text-4xl text-3xl md:mb-10 mb-6">
          Find Content You Love
        </p>

        <ul className="flex flex-wrap md:text-base text-sm justify-center gap-3 md:gap-4">
          {categoryOptions.map((tab) => (
            <li key={tab}>
              <button
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2 rounded-full text-sm md:text-base transition-all duration-300 ${
                  activeTab === tab
                    ? "bg-green-700 text-white"
                    : "disable-button"
                }`}
              >
                {tab}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <CategoryVideos category={activeTab} />
    </>
  );
};

export default Section1;
