// Section2.jsx
import React, { useState } from "react";
import VideoSection from "./VideoSection";

const About = () => <p className="text-center py-10">About Section</p>;
const Playlists = () => <p className="text-center py-10">Playlists Section</p>;
const Followers = () => <p className="text-center py-10">Followers Section</p>;
const Following = () => <p className="text-center py-10">Following Section</p>;

const Section2 = () => {
  const [activeTab, setActiveTab] = useState("Videos");

  const renderActiveSection = () => {
    switch (activeTab) {
      case "Videos":
        return <VideoSection />;
      case "About":
        return <About />;
      case "Playlists":
        return <Playlists />;
      case "Followers":
        return <Followers />;
      case "Following":
        return <Following />;
      default:
        return null;
    }
  };

  return (
    <>
      {/* Tab Nav */}
      <div className="shadow py-4">
        <ul className="flex md:gap-16 gap-3 md:ms-20 ms-7 md:text-base text-sm text-gray-500">
          {["Videos", "About", "Playlists", "Followers", "Following"].map(
            (tab) => (
              <li key={tab}>
                <button
                  onClick={() => setActiveTab(tab)}
                  className={`hover:text-green-700 cursor-pointer ${
                    activeTab === tab ? "!text-green-700 font-semibold" : ""
                  }`}
                >
                  {tab}
                </button>
              </li>
            )
          )}
        </ul>
      </div>

      {/* Active Tab Content */}
      <div>{renderActiveSection()}</div>
    </>
  );
};

export default Section2;
