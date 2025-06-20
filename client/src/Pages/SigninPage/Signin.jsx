import React, { useState } from "react";
import { IoMdHome } from "react-icons/io";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaLinkedin } from "react-icons/fa";

const Signin = ({ isOpen, onClose }) => {
  const [view, setView] = useState("login"); // login | signup | forgotEmail | forgotOTP | forgotNew

  const isSignup = view === "signup";
  const isForgot = view.startsWith("forgot");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex text-sm md:text-base px-3 justify-center items-center z-50">
      <div className="bg-[#458c58] rounded-2xl w-full max-w-sm p-6 relative shadow-xl">
        {/* Close Button */}
        <button
          className="absolute top-2 right-3 text-white text-2xl cursor-pointer"
          onClick={() => {
            setView("login");
            onClose();
          }}
        >
          &times;
        </button>

        {/* Header Icon */}
        <div className="flex justify-center">
          <IoMdHome className="text-white text-4xl md:text-5xl" />
        </div>

        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">
          {isSignup ? "Sign Up" : isForgot ? "Reset Password" : "Sign In"}
        </h2>

        {/* Form Section */}
        <form className="flex flex-col gap-4">
          {view === "signup" && (
            <>
              <label className="text-white">Full Name</label>
              <input
                type="text"
                placeholder="Your Name"
                className="border px-4 py-2 rounded border-gray-300 text-gray-800"
              />
            </>
          )}

          {(view === "login" ||
            view === "signup" ||
            view === "forgotEmail") && (
            <>
              <label className="text-white">Email</label>
              <input
                type="email"
                placeholder="Email"
                className="border px-4 py-2 rounded border-gray-300 text-gray-800"
              />
            </>
          )}

          {(view === "login" || view === "signup") && (
            <>
              <label className="text-white">Password</label>
              <input
                type="password"
                placeholder="Password"
                className="border px-4 py-2 rounded border-gray-300 text-gray-800"
              />
            </>
          )}

          {view === "forgotOTP" && (
            <>
              <label className="text-white">Enter OTP</label>
              <input
                type="text"
                placeholder="6-digit OTP"
                className="border px-4 py-2 rounded border-gray-300 text-gray-800"
              />
            </>
          )}

          {view === "forgotNew" && (
            <>
              <label className="text-white">New Password</label>
              <input
                type="password"
                placeholder="New Password"
                className="border px-4 py-2 rounded border-gray-300 text-gray-800"
              />
              <label className="text-white">Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm Password"
                className="border px-4 py-2 rounded border-gray-300 text-gray-800"
              />
            </>
          )}

          <button
            type="submit"
            className="bg-white py-2 hover:bg-gray-200 transition-all duration-300 cursor-pointer rounded text-[#458c58] w-full"
            onClick={(e) => {
              e.preventDefault();
              if (view === "forgotEmail") setView("forgotOTP");
              else if (view === "forgotOTP") setView("forgotNew");
              else if (view === "forgotNew") setView("login");
            }}
          >
            {view === "signup"
              ? "Sign Up"
              : view === "login"
              ? "Login"
              : view === "forgotEmail"
              ? "Send OTP"
              : view === "forgotOTP"
              ? "Verify OTP"
              : "Reset Password"}
          </button>
          {view === "login" && (
            <button
              onClick={() => setView("forgotEmail")}
              className="font-medium cursor-pointer text-white text-end hover:text-gray-200 transition-all duration-300 text-sm mt-2 block"
            >
              Forgot Password?
            </button>
          )}
        </form>

        {/* OR & Social Login */}
        {!isForgot && (
          <>
            <div className="flex items-center gap-4 my-2">
              <hr className="flex-grow border-white opacity-30" />
              <span className="text-white text-sm">or</span>
              <hr className="flex-grow border-white opacity-30" />
            </div>

            <div className="flex justify-center gap-4 mb-2">
              <button className="bg-white p-2 rounded-full hover:scale-110 transition">
                <FcGoogle size={24} />
              </button>
              <button className="bg-white text-[#3b5998] p-2 rounded-full hover:scale-110 transition">
                <FaFacebook size={24} />
              </button>
              <button className="bg-white text-[#0a66c2] p-2 rounded-full hover:scale-110 transition">
                <FaLinkedin size={24} />
              </button>
            </div>
          </>
        )}

        {/* Toggle Links */}
        <div className="text-white text-center mt-4 text-sm">
          {view === "login" && (
            <>
              Don’t have an account?{" "}
              <button
                onClick={() => setView("signup")}
                className="cursor-pointer font-semibold"
              >
                Sign Up
              </button>
              <br />
            </>
          )}
          {view === "signup" && (
            <>
              Already have an account?{" "}
              <button
                onClick={() => setView("login")}
                className="cursor-pointer font-semibold"
              >
                Login
              </button>
            </>
          )}
          {isForgot && (
            <button
              onClick={() => setView("login")}
              className="cursor-pointer font-semibold"
            >
              Back to Login
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Signin;
