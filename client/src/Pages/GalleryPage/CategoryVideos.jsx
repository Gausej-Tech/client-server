import React, { useEffect, useState } from "react";
import Card from "../HomePage/Card";
import axios from "../../utils/axios";
import { formatDistanceToNow } from "date-fns";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const CategoryVideos = ({ category }) => {
  const visiblePages = 5;

  const [videos, setVideos] = useState([]);
  const [cardsPerPage, setCardsPerPage] = useState(4); // default for desktop
  const [currentPage, setCurrentPage] = useState(1);
  const [pageWindowStart, setPageWindowStart] = useState(0);
  const [loading, setLoading] = useState(true);

  // Responsive cards per page
  useEffect(() => {
    const updateCardsPerPage = () => {
      setCardsPerPage(window.innerWidth < 640 ? 1 : 4);
    };

    updateCardsPerPage();
    window.addEventListener("resize", updateCardsPerPage);
    return () => window.removeEventListener("resize", updateCardsPerPage);
  }, []);

  // Fetch videos
  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true);
      try {
        const endpoint =
          category === "All"
            ? "/user"
            : `/user?category=${encodeURIComponent(category)}`;
        const res = await axios.get(endpoint);
        setVideos(Array.isArray(res.data) ? res.data : []);

        setCurrentPage(1);
        setPageWindowStart(0);
      } catch (err) {
        console.error("Error fetching videos:", err);
        setVideos([]);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [category]);

  const totalCards = videos.length;
  const totalPages = Math.ceil(totalCards / cardsPerPage);
  const startIndex = (currentPage - 1) * cardsPerPage;
  const endIndex = Math.min(startIndex + cardsPerPage, totalCards);
  const currentCards = videos.slice(startIndex, endIndex);

  // Adjust page window
  useEffect(() => {
    const windowEnd = pageWindowStart + visiblePages;
    if (currentPage - 1 < pageWindowStart) {
      setPageWindowStart(Math.max(currentPage - 1, 0));
    } else if (currentPage > windowEnd) {
      setPageWindowStart(currentPage - visiblePages);
    }
  }, [currentPage]);

  if (loading) {
    return <p className="text-center py-10">Loading videos...</p>;
  }

  if (videos.length === 0) {
    return <p className="text-center py-10">No videos found in "{category}"</p>;
  }

  return (
    <>
      <div className="grid grid-cols-1 p-10 text-sm md:text-base sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4 md:px-20">
        {Array.isArray(currentCards) &&
          currentCards.map((video) => (
            <Card
              key={video._id}
              image={video.cloudinaryUrl}
              tag={video.category}
              title={video.title}
              description={video.description}
              posted={formatDistanceToNow(new Date(video.createdAt), {
                addSuffix: true,
              })}
              profileImage={
                video.userId?.profilePhoto ||
                "https://randomuser.me/api/portraits/lego/2.jpg"
              }
              profileName={video.userId?.fullName}
              views={video.views}
              status={video.isApproved}
            />
          ))}
      </div>

      {/* Pagination Controls */}
      {Array.isArray(videos) &&
        videos.length > cardsPerPage &&
        currentCards.length > 0 && (
          <div className="flex flex-col md:flex-row justify-between items-center px-4 md:px-20 pb-10 gap-4">
            <p className="text-gray-600 text-sm md:text-base">
              Showing {startIndex + 1}–{endIndex} of {totalCards} videos
            </p>

            <div className="flex gap-1 md:gap-2 items-center flex-wrap">
              <button
                onClick={() =>
                  setPageWindowStart(
                    Math.max(pageWindowStart - visiblePages, 0)
                  )
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

export default CategoryVideos;
