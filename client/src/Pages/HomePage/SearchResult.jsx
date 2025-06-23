import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "../../utils/axios";
import Card from "./Card";
import Layout from "../../Components/Layout";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const SearchResult = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get("category");

  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageWindowStart, setPageWindowStart] = useState(0);
  const [videosPerPage, setVideosPerPage] = useState(4); // default to desktop
  const visiblePages = 5;

  useEffect(() => {
    // Adjust videos per page based on screen width
    const handleResize = () => {
      setVideosPerPage(window.innerWidth < 640 ? 1 : 4); // sm: <640px
    };

    handleResize(); // run initially
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchSearchedVideos = async () => {
      if (!category) return;

      try {
        setLoading(true);
        const res = await axios.get(
          `/user?category=${encodeURIComponent(category)}`
        );
        setVideos(res.data);
        setCurrentPage(1);
        setPageWindowStart(0);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch videos:", err);
        setVideos([]);
        setLoading(false);
      }
    };

    fetchSearchedVideos();
  }, [category]);

  const totalCards = videos.length;
  const totalPages = Math.ceil(totalCards / videosPerPage);
  const startIndex = (currentPage - 1) * videosPerPage;
  const endIndex = Math.min(startIndex + videosPerPage, totalCards);
  const currentVideos = videos.slice(startIndex, endIndex);

  useEffect(() => {
    const windowEnd = pageWindowStart + visiblePages;
    if (currentPage - 1 < pageWindowStart) {
      setPageWindowStart(Math.max(currentPage - 1, 0));
    } else if (currentPage > windowEnd) {
      setPageWindowStart(currentPage - visiblePages);
    }
  }, [currentPage]);

  return (
    <Layout>
      <div className="py-10 px-6 md:px-20 text-sm md:text-base">
        <h2 className="text-center text-3xl md:text-4xl font-bold mb-10">
          Search Results for:{" "}
          <span className="text-green-700">"{category}"</span>
        </h2>

        {loading ? (
          <p className="text-center text-gray-500">Loading videos...</p>
        ) : videos.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6">
              {Array.isArray(categoryOptions) &&
                currentVideos.map((video) => (
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
                ))}
            </div>

            {totalPages > 1 && (
              <div className="flex flex-col md:flex-row justify-between items-center px-4 md:px-20 pb-10 gap-4 mt-10">
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
                    ...Array(
                      Math.min(visiblePages, totalPages - pageWindowStart)
                    ),
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
        ) : (
          <p className="text-center text-gray-500">
            No videos found for category: <strong>{category}</strong>
          </p>
        )}
      </div>
    </Layout>
  );
};

export default SearchResult;
