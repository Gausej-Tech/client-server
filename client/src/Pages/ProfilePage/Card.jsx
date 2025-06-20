
import React from "react";

const Card = ({
  image,
  tag,
  title,
  description,
  posted,
  views,
  likes,
}) => {
  return (
    <div className="max-w-sm bg-white rounded-xl shadow-lg overflow-hidden hover:-translate-y-2 transition-all duration-300">
      <div className="relative">
        <img src={image} alt= {tag} className="w-full h-40 object-cover" />
        <button className="absolute cursor-pointer bottom-3 left-3 bg-[#373737] text-white text-sm px-3 py-1 rounded-md shadow-md hover:bg-gray-400 transition">
          {tag}
        </button>
      </div>
      <div className="p-4">
        <p className="text-lg font-semibold mb-0">{title}</p>
        <p className="text-sm text-gray-600 mb-2">{description}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
             <p className="text-gray-500">👁️ {views}</p>
            <p className="text-gray-500">👍 {likes}</p>
          </div>
          <div className="text-sm flex gap-2 text-gray-500 text-right">
           <p>Almost {posted} ago</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
