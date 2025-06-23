import React from "react";

const LoadingButton = ({ onClick, isLoading, label, className = "", disabled }) => {
  return (
    <button
      onClick={onClick}
      disabled={isLoading || disabled}
      className={`px-4 py-2 flex items-center justify-center gap-2 text-white text-sm rounded transition-all duration-300 ${
        isLoading ? "cursor-not-allowed opacity-70" : "hover:opacity-90"
      } ${className}`}
    >
      {isLoading ? (
        <svg
          className="animate-spin h-5 w-5 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 000 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z"
          />
        </svg>
      ) : (
        label
      )}
    </button>
  );
};

export default LoadingButton;
