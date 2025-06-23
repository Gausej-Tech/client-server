import React, { useState } from "react";

const Card = ({
  image, // now used as the video source
  tag,
  title,
  description,
  profileImage,
  profileName,
  // views,
  // likes,
}) => {
  const [showMore, setShowMore] = useState(false);
  const maxLength = 30;

  const toggleDescription = () => {
    setShowMore((prev) => !prev);
  };

  return (
    <div className="max-w-sm bg-white rounded-3xl shadow-lg overflow-hidden hover:-translate-y-2 transition-all duration-300">
      <div className="relative">
        <video
          src={image}
          controls
          className="w-full h-48 object-cover rounded-t-3xl"
        ></video>
        <button className="absolute bottom-3 left-3 bg-[#373737] text-white text-sm px-3 py-1 rounded-md shadow-md hover:bg-gray-400 transition">
          {tag}
        </button>
      </div>

      <div className="p-4">
        <h2 className="text-lg font-semibold mb-2">{title}</h2>

        <p className="text-sm text-gray-600 mb-4 break-words">
          {description.length > maxLength ? (
            <>
              {showMore ? description : `${description.slice(0, maxLength)}...`}
              <button
                onClick={toggleDescription}
                className="text-blue-600 text-xs ml-2 underline"
              >
                {showMore ? "Show less" : "Show more"}
              </button>
            </>
          ) : (
            description
          )}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img
              src={profileImage}
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover"
            />
            <p className="text-sm font-medium">{profileName}</p>
          </div>
          {/* 
          <div className="text-sm flex gap-2 text-gray-500 text-right">
            <p>👁️ {views}</p>
            <p>❤️ {likes}</p>
          </div> 
          */}
        </div>
      </div>
    </div>
  );
};

export default Card;
