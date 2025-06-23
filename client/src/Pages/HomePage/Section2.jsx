import React, { useEffect, useState } from "react";
import Card from "./Card";
import axios from "../../utils/axios";

const categories = [
  "Startup Pitch",
  "Product Demo",
  "Business Idea",
  "Promotional",
  "Podcast",
  "Tutorial",
  "Other",
];

const Section2 = () => {
  const [videosByCategory, setVideosByCategory] = useState({});
  const [latestVideos, setLatestVideos] = useState([]);
  const [activeTab, setActiveTab] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true);
      const data = {};

      try {
        const res = await axios.get("/user/latest");
        setLatestVideos(res.data);
      } catch (err) {
        console.error("Error fetching all latest videos", err);
        setLatestVideos([]);
      }

      for (const category of categories) {
        try {
          const res = await axios.get(
            `/user/latest?category=${encodeURIComponent(category)}`
          );
          data[category] = res.data;
        } catch (err) {
          console.error(`Error fetching videos for ${category}`, err);
          data[category] = [];
        }
      }

      setVideosByCategory(data);
      setLoading(false);
    };

    fetchVideos();
  }, []);

  const videosToShow =
    activeTab === "All" ? latestVideos : videosByCategory[activeTab] || [];

  return (
    <div className="py-6">
      {/* Tabs */}
      <div className="px-4 py-10">
        <ul className="flex flex-wrap justify-center gap-3 md:gap-4">
          <li>
            <button
              onClick={() => setActiveTab("All")}
              className={`px-5 py-2 rounded-full transition-all duration-300 ${
                activeTab === "All"
                  ? "bg-green-700 text-white"
                  : "disable-button"
              }`}
            >
              All
            </button>
          </li>
          {Array.isArray(categories) &&
            categories.map((category) => (
              <li key={category}>
                <button
                  onClick={() => setActiveTab(category)}
                  className={`px-5 py-2 rounded-full transition-all duration-300 ${
                    activeTab === category
                      ? "bg-green-700 text-white"
                      : "disable-button"
                  }`}
                >
                  {category}
                </button>
              </li>
            ))}
        </ul>
      </div>

      {/* Video Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 md:px-32 pb-10">
        {loading ? (
          <p className="text-center text-gray-600 col-span-full">
            Loading videos...
          </p>
        ) : Array.isArray(videosToShow) && videosToShow.length > 0 ? (
          videosToShow.map((video) => (
            <Card
              key={video._id}
              image={video.cloudinaryUrl}
              tag={video.category}
              title={video.title}
              description={video.description}
              profileImage={
                video.userId?.profilePhoto ||
                "https://randomuser.me/api/portraits/lego/2.jpg"
              }
              profileName={video.userId?.fullName}
            />
          ))
        ) : (
          <p className="text-center text-gray-600 col-span-full">
            No videos found for this category.
          </p>
        )}
      </div>
    </div>
  );
};

export default Section2;
