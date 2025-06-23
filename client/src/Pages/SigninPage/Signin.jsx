import React, { useState } from "react";
import { IoMdHome } from "react-icons/io";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaLinkedin } from "react-icons/fa";
import { Helmet } from "react-helmet-async";
import axios from "../../utils/axios";
import toast, { Toaster } from "react-hot-toast";
import LoadingButton from "../../Components/LoadingButton";

const Signin = ({ isOpen, onClose }) => {
  const [view, setView] = useState("login");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    otp: "",
    newPassword: "",
    confirmPassword: "",
  });
  const resetForm = () => {
    setFormData({
      fullName: "",
      email: "",
      password: "",
      otp: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  const isSignup = view === "signup";
  const isForgot = view.startsWith("forgot");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (view === "signup") {
        const res = await axios.post("/auth/signup", {
          fullName: formData.fullName,
          email: formData.email,
          password: formData.password,
        });
        toast.success(res.data?.msg || "Signup successful!");

        resetForm();
        setTimeout(() => {
          setView("login");
        }, 2000);
      } else if (view === "login") {
        const res = await axios.post("/auth/login", {
          email: formData.email,
          password: formData.password,
        });
        toast.success(res.data?.message || "Login successful!");
        if (res.data?.user) {
          localStorage.setItem("user", JSON.stringify(res.data.user));
        }

        resetForm();
        setTimeout(() => {
          onClose();
          window.location.reload();
        }, 2000);
      } else if (view === "forgotEmail") {
        const res = await axios.post("/auth/forgot-password", {
          email: formData.email,
        });
        toast.success(res.data?.msg || "OTP sent!");

        resetForm();
        setTimeout(() => {
          setView("forgotOTP");
        }, 2000);
      } else if (view === "forgotOTP") {
        const res = await axios.post("/auth/verify-reset-otp", {
          otp: formData.otp,
        });
        toast.success(res.data?.message || "OTP verified!");

        const emailFromServer = res.data?.email || formData.email;

        resetForm();
        setFormData((prev) => ({
          ...prev,
          email: emailFromServer,
        }));

        setTimeout(() => {
          setView("forgotNew");
        }, 2000);
      } else if (view === "forgotNew") {
        if (formData.newPassword !== formData.confirmPassword) {
          toast.error("Passwords do not match");
          resetForm();
          return;
        }
        const res = await axios.post("/auth/reset-password", {
          email: formData.email,
          newPassword: formData.newPassword,
        });
        toast.success(res.data?.message || "Password reset successful!");

        resetForm();
        setTimeout(() => {
          setView("login");
        }, 2000);
      }
    } catch (err) {
      const msg =
        err.response?.data?.msg ||
        err.response?.data?.message ||
        "Something went wrong.";
      toast.error(msg);

      resetForm();
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    window.open(`${import.meta.env.VITE_BASE_URL}/auth/google`, "_self");
  };

  if (!isOpen) return null;

  return (
    <>
      <Helmet>
        <title>
          {isSignup
            ? "Gausej - SignUp"
            : isForgot
            ? "Gausej - Reset Password"
            : "Gausej - SignIn"}
        </title>
      </Helmet>
      <Toaster />

      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm px-3 flex justify-center items-center z-50">
        <div className="bg-[#458c58] rounded-2xl w-full max-w-sm  p-6 relative shadow-xl text-sm md:text-base px-3">
          <button
            className="absolute top-2 right-3 text-white text-2xl cursor-pointer"
            onClick={() => {
              setView("login");
              onClose();
            }}
          >
            &times;
          </button>

          <div className="flex justify-center">
            <IoMdHome className="text-white text-5xl" />
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">
            {isSignup ? "SignUp" : isForgot ? "Reset Password" : "SignIn"}
          </h2>

          <form className="flex flex-col gap-4">
            {view === "signup" && (
              <>
                <label className="text-white">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Your Name"
                  value={formData.fullName}
                  className="border px-4 py-2 rounded border-gray-300 text-gray-800"
                  onChange={handleChange}
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
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  className="border px-4 py-2 rounded border-gray-300 text-gray-800"
                  onChange={handleChange}
                />
              </>
            )}

            {(view === "login" || view === "signup") && (
              <>
                <label className="text-white">Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  className="border px-4 py-2 rounded border-gray-300 text-gray-800"
                  onChange={handleChange}
                />
              </>
            )}

            {view === "forgotOTP" && (
              <>
                <label className="text-white">Enter OTP</label>
                <input
                  type="text"
                  name="otp"
                  placeholder="6-digit OTP"
                  value={formData.otp}
                  className="border px-4 py-2 rounded border-gray-300 text-gray-800"
                  onChange={handleChange}
                />
              </>
            )}

            {view === "forgotNew" && (
              <>
                <label className="text-white">New Password</label>
                <input
                  type="password"
                  name="newPassword"
                  placeholder="New Password"
                  value={formData.newPassword}
                  className="border px-4 py-2 rounded border-gray-300 text-gray-800"
                  onChange={handleChange}
                />
                <label className="text-white">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  placeholder="Confirm Password"
                  className="border px-4 py-2 rounded border-gray-300 text-gray-800"
                  onChange={handleChange}
                />
              </>
            )}

            <LoadingButton
              onClick={handleSubmit}
              isLoading={loading}
              disabled={loading}
              className="bg-white py-2 hover:bg-gray-200 transition-all duration-300 cursor-pointer rounded !text-[#458c58] w-full flex justify-center items-center gap-2"
              label={
                view === "signup"
                  ? "Sign Up"
                  : view === "login"
                  ? "Login"
                  : view === "forgotEmail"
                  ? "Send OTP"
                  : view === "forgotOTP"
                  ? "Verify OTP"
                  : "Reset Password"
              }
            />

            {view === "login" && (
              <button
                type="button"
                onClick={() => setView("forgotEmail")}
                className="font-medium cursor-pointer text-white text-end hover:text-gray-200 transition-all duration-300 text-sm mt-2 block"
              >
                Forgot Password?
              </button>
            )}
          </form>

          {!isForgot && (
            <>
              <div className="flex items-center gap-4 my-2">
                <hr className="flex-grow border-white opacity-30" />
                <span className="text-white text-sm">or</span>
                <hr className="flex-grow border-white opacity-30" />
              </div>

              <div className="flex justify-center gap-4 mb-2">
                <button
                  onClick={handleGoogleLogin}
                  className="bg-white p-2 rounded-full hover:scale-110 transition"
                >
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

          <div className="text-white text-center mt-4 text-sm">
            {view === "login" && (
              <>
                Don’t have an account?{" "}
                <button
                  type="button"
                  onClick={() => setView("signup")}
                  className="cursor-pointer font-semibold"
                >
                  Sign Up
                </button>
              </>
            )}
            {view === "signup" && (
              <>
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => setView("login")}
                  className="cursor-pointer font-semibold"
                >
                  Login
                </button>
              </>
            )}
            {isForgot && (
              <button
                type="button"
                onClick={() => setView("login")}
                className="cursor-pointer font-semibold"
              >
                Back to Login
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Signin;
