import React, { useState, useEffect } from "react";
import { formatDistanceToNow } from "date-fns";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Card from "./Card";
import axios from "../../utils/axios";

const VideoSection = () => {
  const visiblePages = 5;
  const [cardsPerPage, setCardsPerPage] = useState(4); // Default for desktop

  const [videos, setVideos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageWindowStart, setPageWindowStart] = useState(0);

  useEffect(() => {
    const updateCardsPerPage = () => {
      setCardsPerPage(window.innerWidth < 640 ? 1 : 4);
    };

    updateCardsPerPage(); // Initial check
    window.addEventListener("resize", updateCardsPerPage);
    return () => window.removeEventListener("resize", updateCardsPerPage);
  }, []);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await axios.get("/user/my-videos");
        if (res.data.success) {
          setVideos(res.data.videos);
        }
      } catch (err) {
        console.error("Error fetching videos:", err);
      }
    };

    fetchVideos();
  }, []);

  useEffect(() => {
    const windowEnd = pageWindowStart + visiblePages;
    if (currentPage - 1 < pageWindowStart) {
      setPageWindowStart(Math.max(currentPage - 1, 0));
    } else if (currentPage > windowEnd) {
      setPageWindowStart(currentPage - visiblePages);
    }
  }, [currentPage]);

  const totalCards = videos.length;
  const totalPages = Math.ceil(totalCards / cardsPerPage);
  const startIndex = (currentPage - 1) * cardsPerPage;
  const endIndex = Math.min(startIndex + cardsPerPage, totalCards);
  const currentCards = videos.slice(startIndex, endIndex);

  return (
    <>
      <p className="text-center md:text-start md:ms-20 py-5 text-xl md:text-3xl font-semibold">
        Videos
      </p>

      <div className="grid grid-cols-1 p-10 text-sm md:text-base sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4 md:px-20">
        {Array.isArray(currentCards) &&
          currentCards.map((video, index) => (
            <Card
              key={video._id || index}
              image={video.cloudinaryUrl}
              tag={video.category}
              title={video.title}
              description={video.description}
              posted={formatDistanceToNow(new Date(video.createdAt), {
                addSuffix: true,
              })}
              status={video.isApproved}
            />
          ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex flex-col md:flex-row justify-between items-center px-4 md:px-20 pb-10 gap-4">
          <p className="text-gray-600 text-sm md:text-base">
            Showing {startIndex + 1}–{endIndex} of {totalCards} videos
          </p>

          <div className="flex gap-1 md:gap-2 items-center flex-wrap">
            <button
              onClick={() =>
                setPageWindowStart(Math.max(pageWindowStart - visiblePages, 0))
              }
              disabled={pageWindowStart === 0}
              className="px-2 py-1 text-sm md:text-base rounded disabled:opacity-20"
            >
              <FaChevronLeft />
            </button>

            {[
              ...Array(Math.min(visiblePages, totalPages - pageWindowStart)),
            ].map((_, i) => {
              const page = pageWindowStart + i + 1;
              return (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-2 py-1 text-sm md:text-base rounded ${
                    currentPage === page
                      ? "bg-green-600 text-white"
                      : "bg-gray-200 hover:bg-gray-300"
                  }`}
                >
                  {page}
                </button>
              );
            })}

            <button
              onClick={() =>
                setPageWindowStart((prev) =>
                  Math.min(prev + visiblePages, totalPages - visiblePages)
                )
              }
              disabled={pageWindowStart + visiblePages >= totalPages}
              className="px-2 py-1 text-sm md:text-base rounded disabled:opacity-20"
            >
              <FaChevronRight />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default VideoSection;
