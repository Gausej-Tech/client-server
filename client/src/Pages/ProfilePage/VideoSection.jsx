// VideoSection.jsx
import React, { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Card from "./Card";

const cardData = [...Array(100)].map((_, i) => ({
  image: `https://via.placeholder.com/150?text=Image+${i + 1}`,
  tag: "Category",
  title: `Video Title ${i + 1}`,
  description: "Short description",
  posted: "2 days ago",
  views: "1.2k",
  likes: "500",
}));

const VideoSection = () => {
  const cardsPerPage = 4;
  const totalCards = cardData.length;
  const totalPages = Math.ceil(totalCards / cardsPerPage);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageWindowStart, setPageWindowStart] = useState(0);
  const visiblePages = 5;

  const startIndex = (currentPage - 1) * cardsPerPage;
  const endIndex = Math.min(startIndex + cardsPerPage, totalCards);
  const currentCards = cardData.slice(startIndex, endIndex);

  useEffect(() => {
    const windowEnd = pageWindowStart + visiblePages;
    if (currentPage - 1 < pageWindowStart) {
      setPageWindowStart(Math.max(currentPage - 1, 0));
    } else if (currentPage > windowEnd) {
      setPageWindowStart(currentPage - visiblePages);
    }
  }, [currentPage]);

  return (
    <>
      <p className="text-center md:text-start md:ms-20 py-5 text-xl md:text-3xl font-semibold">
        Videos
      </p>

      <div className="grid grid-cols-1 p-10 text-sm md:text-base sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4 md:px-20">
        {currentCards.map((card, index) => (
          <Card
            key={index}
            image={card.image}
            tag={card.tag}
            title={card.title}
            description={card.description}
            posted={card.posted}
            views={card.views}
            likes={card.likes}
          />
        ))}
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center px-4 md:px-20 pb-10 gap-4">
        <p className="text-gray-600 text-sm md:text-base">
          Showing {startIndex + 1}–{endIndex} of {totalCards} videos
        </p>

        <div className="flex gap-1 md:gap-2 items-center flex-wrap">
          {/* Left Arrow */}
          <button
            onClick={() =>
              setPageWindowStart(Math.max(pageWindowStart - visiblePages, 0))
            }
            disabled={pageWindowStart === 0}
            className="px-2 py-1 text-sm md:text-base rounded disabled:opacity-20"
          >
            <FaChevronLeft />
          </button>

          {/* Page Numbers */}
          {[...Array(Math.min(visiblePages, totalPages - pageWindowStart))].map(
            (_, i) => {
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
            }
          )}

          {/* Right Arrow */}
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
    </>
  );
};

export default VideoSection;
