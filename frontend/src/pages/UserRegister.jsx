import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [successMsg, setSuccessMsg] = useState("");
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        // "http://localhost:5000/api/auth/user/register",
        "https://stark-store-ecom.vercel.app/api/auth/user/register",
        formData,
        {
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true
        }
      );
      
      setSuccessMsg(res.data.message);
      setTimeout(() => {
        navigate("/");
      }, 2000);

    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
      setTimeout(() => {
        setError("");
      }, 4000);
    }
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      
      {/* Animated background elements - matching the glass theme */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-orange-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-orange-600/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
      </div>

      {/* Main Card - Enhanced glass effect matching navbar */}
      <div
        className="
          w-[90%]
          max-w-md
          bg-white/10
          backdrop-blur-xl
          border border-white/20
          rounded-3xl
          p-8
          text-white
          shadow-[0_8px_32px_rgba(0,0,0,0.3)]
          relative
          z-10
          transform
          hover:scale-[1.02]
          transition-all
          duration-500
        "
      >
        {/* Decorative top accent */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-1 bg-linear-to-r from-orange-500 to-orange-600 rounded-full" />

        {/* Brand with refined typography - matching navbar */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold mb-2 tracking-wide">
            STARK<span className="text-orange-500 font-medium">Store</span>
          </h1>
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="w-12 h-0.5 bg-orange-500/50 rounded-full" />
            <p className="text-gray-300 text-sm">Create new account</p>
            <div className="w-12 h-0.5 bg-orange-500/50 rounded-full" />
          </div>
        </div>

        {/* Alert Messages - Enhanced styling */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/10 backdrop-blur-sm border border-red-500/30 rounded-xl text-red-400 text-sm text-center animate-slideDown">
            <div className="flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {error}
            </div>
          </div>
        )}

        {successMsg && (
          <div className="mb-6 p-4 bg-green-500/10 backdrop-blur-sm border border-green-500/30 rounded-xl text-green-400 text-sm text-center animate-slideDown">
            <div className="flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              {successMsg} Redirecting...
            </div>
          </div>
        )}

        {/* Registration Form */}
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          {/* Full Name Input */}
          <div className="relative group">
            <div className="absolute inset-0 bg-linear-to-r from-orange-500/20 to-orange-600/20 rounded-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300" />
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              required
              onChange={handleChange}
              className="
                w-full
                bg-white/5 
                backdrop-blur-sm
                border border-white/10 
                p-4 
                rounded-xl 
                text-white 
                focus:outline-none 
                focus:border-orange-500/50
                focus:bg-white/10
                placeholder-gray-400
                transition-all
                duration-300
                group-hover:border-white/20
              "
            />
          </div>

          {/* Email Input */}
          <div className="relative group">
            <div className="absolute inset-0 bg-linear-to-r from-orange-500/20 to-orange-600/20 rounded-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300" />
            <input
              type="email"
              name="email"
              required
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="
                w-full
                bg-white/5 
                backdrop-blur-sm
                border border-white/10 
                p-4 
                rounded-xl 
                text-white 
                focus:outline-none 
                focus:border-orange-500/50
                focus:bg-white/10
                placeholder-gray-400
                transition-all
                duration-300
                group-hover:border-white/20
              "
            />
          </div>

          {/* Password Input */}
          <div className="relative group">
            <div className="absolute inset-0 bg-linear-to-r from-orange-500/20 to-orange-600/20 rounded-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength={6}
              className="
                w-full
                bg-white/5 
                backdrop-blur-sm
                border border-white/10 
                p-4 
                rounded-xl 
                text-white 
                focus:outline-none 
                focus:border-orange-500/50
                focus:bg-white/10
                placeholder-gray-400
                transition-all
                duration-300
                group-hover:border-white/20
              "
            />
          </div>

          {/* Password strength indicator (optional enhancement) */}
          {formData.password && (
            <div className="px-1">
              <div className="flex gap-1 h-1 mb-2">
                {[1, 2, 3].map((level) => (
                  <div
                    key={level}
                    className={`h-full flex-1 rounded-full transition-all duration-300 ${
                      formData.password.length >= level * 3
                        ? formData.password.length >= 8
                          ? 'bg-green-500'
                          : 'bg-orange-500'
                        : 'bg-white/20'
                    }`}
                  />
                ))}
              </div>
              <p className="text-xs text-gray-400">
                Password must be at least 6 characters
              </p>
            </div>
          )}

          {/* Register Button - Matching product card buttons */}
          <button
            type="submit"
            className="
              mt-2
              w-full
              bg-linear-to-r 
              from-orange-500 
              to-orange-600 
              text-white 
              font-semibold 
              p-4 
              rounded-xl 
              hover:shadow-lg 
              hover:scale-[1.02]
              active:scale-95
              transition-all 
              duration-300
              border
              border-white/20
              backdrop-blur-sm
              flex
              items-center
              justify-center
              gap-2
              group/btn
              text-lg
            "
          >
            <svg
              className="w-5 h-5 transition-transform group-hover/btn:rotate-12"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
              />
            </svg>
            Create Account
          </button>
        </form>

        {/* Login Link */}
        <div className="text-center mt-8 pt-4 border-t border-white/10">
          <p className="text-gray-400 text-sm">
            Already have an account?{" "}
            <Link
              to="/login"
              className="
                text-orange-400 
                hover:text-orange-300 
                font-medium 
                transition-colors 
                duration-300
                relative
                group
                inline-flex
                items-center
                gap-1
              "
            >
              Login in here
              <svg
                className="w-4 h-4 transition-transform group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </p>
        </div>

        {/* Terms and conditions */}
        <p className="text-center text-xs text-gray-500 mt-6">
          By registering, you agree to our{" "}
          <span className="text-gray-400 hover:text-orange-400 cursor-pointer transition-colors">
            Terms of Service
          </span>{" "}
          and{" "}
          <span className="text-gray-400 hover:text-orange-400 cursor-pointer transition-colors">
            Privacy Policy
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
