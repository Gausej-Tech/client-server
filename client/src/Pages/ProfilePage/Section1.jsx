import React, { useState } from "react";
import { GoDotFill } from "react-icons/go";
import { FaTwitter, FaLinkedin } from "react-icons/fa";
import { TbWorld } from "react-icons/tb";
import { Link } from "react-router-dom";
import EditProfile from "./EditProfile";

const Section1 = () => {
  const [showModal, setShowModal] = useState(false);

  const [profileData, setProfileData] = useState({
    name: "Emma Thompson",
    title: "Digital Innovation Specialist",
    bio: "Tech enthusiast focused on AI solutions...",
    twitter: "@emmatechinnov",
    linkedin: "linkedin.com/in/emma-thompson",
    website: "emmatechnology.com",
    profilePic: null,
  });

  const handleSave = (updatedData) => {
    setProfileData(updatedData); 
    setShowModal(false);
  };

  return (
    <div className="md:px-20 px-8">
      <div className="w-full text-sm md:text-base flex flex-col md:flex-row md:items-center justify-between container px-4 py-6 gap-6 md:gap-0">
        {/* Profile and Info Group */}
        <div className="flex flex-col sm:flex-row items-center  sm:items-start gap-4">
          {/* profilePic */}
          <div className="w-20 h-20 rounded-full bg-gray-300 flex-shrink-0"></div>

          {/* info */}
          <div className="flex flex-col text-center sm:text-left">
            <p className="font-semibold text-xl md:text-3xl">{profileData.name}</p>
            <p className="text-gray-500 text-sm md:text-base">
             {profileData.title}
            </p>

            <div className="flex flex-wrap justify-center sm:justify-start items-center text-gray-500 gap-2 mt-1">
              <p>Joined April 2023</p>
              <GoDotFill className="" />
              <p>12 Videos</p>
              <GoDotFill className=" " />
              <p>24.1k Followers</p>
            </div>
          </div>
        </div>

        {/* buttons */}
        <div className="flex gap-3 justify-center md:justify-end">
          <button type="submit" className="green-button">
            Follow
          </button>
          <div>
            {/* edit but you have to chage it  */}
            <div>
              <button
                onClick={() => setShowModal(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md"
              >
                Edit Profile
              </button>

              {showModal && (
                <EditProfile
                  profile={profileData}
                  onClose={() => setShowModal(false)}
                  onSave={handleSave}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <hr className="text-gray-300 mb-5" />
      <p className="text-gray-600 text-sm md:text-lg mb-4">
        {profileData.bio}
      </p>
      <div className=" flex md:flex-row flex-col text-sm md:text-lg gap-2   text-center md:gap-10 sm:text-left">
        <Link
          to="/profile"
          className="flex gap-1 text-gray-500 hover:text-gray-800 transition-all duration-300"
        >
          <FaTwitter className="mt-1" /> {profileData.twitter}
        </Link>
        <Link
          to="/profile"
          className="flex gap-1 text-gray-500 hover:text-gray-800 transition-all duration-300"
        >
          <FaLinkedin className="mt-1" /> {profileData.linkedin}
        </Link>
        <Link
          to="/profile"
          className="flex gap-1 text-gray-500 hover:text-gray-800 transition-all duration-300"
        >
          <TbWorld className="mt-1" /> {profileData.website}
        </Link>
      </div>
    </div>
  );
};

export default Section1;
