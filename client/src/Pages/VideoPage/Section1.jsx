// Section2.jsx
import React, { useState } from "react";

import StartupPitch from "./StartupPitch";

const ProductDemo = () => <p className="text-center py-10">Product Demo</p>;
const BuisnessIdea = () => <p className="text-center py-10">Buisness Idea</p>;
const Promotional = () => <p className="text-center py-10">Promotional</p>;
const Podcast = () => <p className="text-center py-10">Podcast</p>;
const Other = () => <p className="text-center py-10">Other</p>;

const Section1 = () => {
  const [activeTab, setActiveTab] = useState("Videos");

  const renderActiveSection = () => {
    switch (activeTab) {
      case "StartupPitch":
        return <StartupPitch />;
      case "ProductDemo":
        return <ProductDemo />;
      case "BuisnessIdea":
        return <BuisnessIdea />;
      case "Promotional":
        return <Promotional />;
      case "Podcast":
        return <Podcast />;
      case "Other":
        return <Other />;
      default:
        return null;
    }
  };

  return (
    <>
      {/* Tab Nav */}
      <div className="py-10 px-4">
        <p className="text-center font-bold md:text-4xl text-3xl md:mb-10 mb-6">
          Find Content You Love
        </p>

        <ul className="flex flex-wrap justify-center gap-3 md:gap-4">
          {[
            "StartupPitch",
            "ProductDemo",
            "BuisnessIdea",
            "Promotional",
            "Podcast",
            "Other",
          ].map((tab) => (
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

      {/* Active Tab Content */}
      <div>{renderActiveSection()}</div>
    </>
  );
};

export default Section1;
