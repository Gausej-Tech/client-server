import React, { useState } from "react";
import { GoDotFill } from "react-icons/go";
import { FaTwitter, FaLinkedin } from "react-icons/fa";
import { TbWorld } from "react-icons/tb";
import { Link } from "react-router-dom";
import EditProfile from "./EditProfile";
import axios from "../../utils/axios";
import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

const Section1 = () => {
  const [showModal, setShowModal] = useState(false);

  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("/user/profile");
        setProfileData(res.data.user);
      } catch (error) {
        console.error(
          "Failed to fetch profile:",
          error.response?.data || error.message
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleSave = async (formData) => {
  try {
    const res = await axios.put("/user/update-profile", formData, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    // Update UI with latest profile
    setProfileData(res.data.user);
    setShowModal(false);
    toast.success("Profile updated!");
  } catch (error) {
    console.error("Profile update failed:", error.response?.data || error.message);
    toast.error("Failed to update profile.");
  }
};

  if (loading) return <p className="px-8">Loading...</p>;

  if (!profileData)
    return <p className="px-8">Profile not found or unauthorized.</p>;

  return (
    <div className="md:px-20 px-8">
      <Toaster/>
      <div className="w-full text-sm md:text-base flex flex-col md:flex-row md:items-center justify-between container px-4 py-6 gap-6 md:gap-0">
        {/* Profile and Info Group */}
        <div className="flex flex-col sm:flex-row items-center  sm:items-start gap-4">
          {/* profilePic */}
          <div className="w-20 h-20 rounded-full bg-gray-300 flex-shrink-0 overflow-hidden">
            <img
              src={
                profileData.profilePhoto
                  ? profileData.profilePhoto
                  : "https://randomuser.me/api/portraits/lego/2.jpg"
              }
              alt="Profile"
              className="w-full h-full object-cover rounded-full"
            />
          </div>

          {/* info */}
          <div className="flex flex-col text-center sm:text-left">
            <p className="font-semibold text-xl md:text-3xl">
              {profileData.fullName}
            </p>
            <p className="text-gray-500 text-sm md:text-base">
              {profileData.title}
            </p>

            <div className="flex flex-wrap justify-center sm:justify-start items-center text-gray-500 gap-1 mt-1">
              <p>
                Joined{" "}
                {new Date(profileData.createdAt).toLocaleString("en-US", {
                  month: "long",
                  year: "numeric",
                })}
              </p>

              <GoDotFill className="" />
              <p> {profileData.videoCount} <span>Videos</span></p>

              {/* followers */}
              {/* <GoDotFill className=" " />
              <p>24.1k Followers</p> */}
            </div>
          </div>
        </div>

        {/* buttons */}
        <div className="flex gap-3 justify-center md:justify-end">

          {/* follow and message button */}
          {/* <button type="submit" className="green-button">
            Follow
          </button>
          <button
            type="submit"
            className="border border-gray-300 hover:bg-gray-100 cursor-pointer transition-all duration-300 px-4 py-2 rounded"
          >
            Message
          </button> */}
          <div>
            {/* edit but you have to chage it  */}
            <div>
              <button
                onClick={() => setShowModal(true)}
                className="green-button"
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
      <p className="text-gray-600 text-sm md:text-lg mb-4">{profileData.bio}</p>
      <div className=" flex md:flex-row flex-col text-sm md:text-lg gap-2   text-center md:gap-10 sm:text-left">
        {profileData.twitterLink && (
          <Link
            to="/profile"
            className="flex gap-1 text-gray-500 hover:text-gray-800 transition-all duration-300"
          >
            <FaTwitter className="mt-1" /> {profileData.twitterLink}
          </Link>
        )}
        {profileData.linkedinLink && (
          <Link
            to="/profile"
            className="flex gap-1 text-gray-500 hover:text-gray-800 transition-all duration-300"
          >
            <FaLinkedin className="mt-1" /> {profileData.linkedinLink}
          </Link>
        )}

        {profileData.websiteUrl && (
          <Link
            to="/profile"
            className="flex gap-1 text-gray-500 hover:text-gray-800 transition-all duration-300"
          >
            <TbWorld className="mt-1" /> {profileData.websiteUrl}
          </Link>
        )}
      </div>
    </div>
  );
};

export default Section1;
