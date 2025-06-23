import React, { useEffect, useState } from "react";
import axios from "../../utils/axios";
import { formatDistanceToNow } from "date-fns";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";

const AdminSectionForPendingVideos = () => {
  const visiblePages = 5;
  const [cardsPerPage, setCardsPerPage] = useState(4);

  const [pendingVideos, setPendingVideos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageWindowStart, setPageWindowStart] = useState(0);
  const [expanded, setExpanded] = useState({});

  useEffect(() => {
    const handleResize = () => {
      setCardsPerPage(window.innerWidth < 640 ? 1 : 4);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    fetchPendingVideos();
  }, []);

  const fetchPendingVideos = async () => {
    try {
      const res = await axios.get("/admin/videos/pending");
      if (res.data.success) {
        setPendingVideos(res.data.pendingVideos);
      }
    } catch (err) {
      console.error("Error fetching pending videos:", err);
    }
  };

  const handleApprove = async (id) => {
    try {
      await axios.put(`/admin/videos/approve/${id}`);
      toast.success("Video approved successfully");
      fetchPendingVideos();
    } catch (err) {
      toast.error("Failed to approve video");
      console.error("Failed to approve video", err);
    }
  };

  const handleReject = async (id) => {
    try {
      await axios.delete(`/admin/videos/reject/${id}`);
      toast.success("Video rejected successfully");
      fetchPendingVideos();
    } catch (err) {
      toast.error("Failed to reject video");
      console.error("Failed to reject video", err);
    }
  };

  const toggleExpanded = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const totalCards = pendingVideos.length;
  const totalPages = Math.ceil(totalCards / cardsPerPage);
  const startIndex = (currentPage - 1) * cardsPerPage;
  const endIndex = Math.min(startIndex + cardsPerPage, totalCards);
  const currentCards = pendingVideos.slice(startIndex, endIndex);

  useEffect(() => {
    const windowEnd = pageWindowStart + visiblePages;
    if (currentPage - 1 < pageWindowStart) {
      setPageWindowStart(Math.max(currentPage - 1, 0));
    } else if (currentPage > windowEnd) {
      setPageWindowStart(currentPage - visiblePages);
    }
  }, [currentPage]);

  return (
    <div className="py-10 px-4 md:px-20">
      <Toaster />
      <h2 className="text-2xl md:text-3xl font-semibold mb-6">Pending Videos</h2>

      {currentCards.length === 0 ? (
        <p className="text-gray-600">No pending videos.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {currentCards.map((video) => (
            <div
              key={video._id}
              className="border rounded-xl p-4 shadow-md bg-white"
            >
              <video
                src={video.cloudinaryUrl}
                controls
                className="w-full rounded-lg mb-3"
              ></video>
              <p className="text-sm text-gray-500">{video.category}</p>
              <h3 className="font-bold text-base mt-1">{video.title}</h3>
              <p className="text-gray-600 text-sm break-words overflow-hidden">
                {video.description.length > 20 ? (
                  <>
                    {expanded[video._id]
                      ? video.description
                      : video.description.slice(0, 20) + "..."}
                    <button
                      onClick={() => toggleExpanded(video._id)}
                      className="text-blue-600 text-xs ml-1"
                    >
                      {expanded[video._id] ? "Show less" : "Show more"}
                    </button>
                  </>
                ) : (
                  video.description
                )}
              </p>
              <div className="flex items-center gap-2 mt-3">
                <img
                  src={
                    video.userId?.profilePhoto ||
                    "https://randomuser.me/api/portraits/lego/2.jpg"
                  }
                  alt="profile"
                  className="w-8 h-8 rounded-full"
                />
                <span className="text-sm">{video.userId?.fullName}</span>
              </div>
              <p className="text-xs text-gray-400 mt-1">
                Uploaded{" "}
                {formatDistanceToNow(new Date(video.createdAt), {
                  addSuffix: true,
                })}
              </p>
              <div className="flex justify-between mt-4 gap-2">
                <button
                  onClick={() => handleApprove(video._id)}
                  className="px-4 py-1 bg-green-600 hover:bg-green-700 text-white text-sm rounded"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleReject(video._id)}
                  className="px-4 py-1 bg-red-500 hover:bg-red-600 text-white text-sm rounded"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-8 gap-2 flex-wrap">
          <button
            onClick={() =>
              setPageWindowStart(Math.max(pageWindowStart - visiblePages, 0))
            }
            disabled={pageWindowStart === 0}
            className="px-2 py-1 rounded disabled:opacity-30"
          >
            <FaChevronLeft />
          </button>

          {[...Array(Math.min(visiblePages, totalPages - pageWindowStart))].map(
            (_, i) => {
              const page = pageWindowStart + i + 1;
              return (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-1 rounded ${
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

          <button
            onClick={() =>
              setPageWindowStart((prev) =>
                Math.min(prev + visiblePages, totalPages - visiblePages)
              )
            }
            disabled={pageWindowStart + visiblePages >= totalPages}
            className="px-2 py-1 rounded disabled:opacity-30"
          >
            <FaChevronRight />
          </button>
        </div>
      )}

      <hr className="mt-10 text-gray-300" />
    </div>
  );
};

export default AdminSectionForPendingVideos;
