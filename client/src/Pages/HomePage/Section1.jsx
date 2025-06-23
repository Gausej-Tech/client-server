import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../utils/axios"; // your axios instance

const Section1 = () => {
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();
  const inputRef = useRef(null);

  const handleSearch = (value = search) => {
    const trimmed = value.trim();
    if (trimmed) {
      navigate(`/video?category=${encodeURIComponent(trimmed)}`);
      setShowSuggestions(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleSuggestionClick = (text) => {
    setSearch(text);
    handleSearch(text);
  };

  useEffect(() => {
    const fetchSuggestions = async () => {
      const trimmed = search.trim();
      if (!trimmed) {
        setSuggestions([]);
        return;
      }

      try {
        const res = await axios.get(`/user/suggestions?query=${encodeURIComponent(trimmed)}`);
        setSuggestions(res.data || []);
        setShowSuggestions(true);
      } catch (err) {
        console.error("Failed to fetch suggestions", err);
      }
    };

    const delayDebounce = setTimeout(fetchSuggestions, 300); // debounce input

    return () => clearTimeout(delayDebounce);
  }, [search]);

  // Hide suggestions on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (inputRef.current && !inputRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="text-sm md:text-base md:p-16 p-10" ref={inputRef}>
      <p className="text-3xl text-center md:text-4xl font-bold mb-5">
        Share Your Vision
      </p>
      <p className="text-md text-gray-500 text-center md:text-lg max-w-xl mx-auto mb-8">
        Discover and share business ideas, startup pitches, product demos, and
        innovative solutions in one place.
      </p>

      <div className="flex justify-center relative">
        <div className="flex w-[600px]">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Search for videos, creators, or topics..."
            className="border-t border-b border-l border-[#458C58] px-4 py-2 rounded-l-3xl w-full focus:!outline-none"
          />
          <button
            onClick={() => handleSearch()}
            className="bg-white border-t border-b border-r cursor-pointer px-5 py-2 border-[#458C58] rounded-r-3xl hover:!border-[#458C58] transition-all duration-300"
          >
            🔍
          </button>
        </div>

        {/* Suggestions dropdown */}
        {showSuggestions && suggestions.length > 0 && (
          <ul className="absolute top-full mt-1 bg-white border border-gray-200 rounded-md w-[600px] max-h-60 overflow-y-auto shadow-lg z-10">
            {suggestions.map((sugg, index) => (
              <li
                key={index}
                onClick={() => handleSuggestionClick(sugg)}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-left text-sm"
              >
                {sugg}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Section1;
