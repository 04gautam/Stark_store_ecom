import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminRegister = () => {
  const navigate = useNavigate();

  const [successMsg, setSuccessMsg] = useState("");
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    // adminKey: "", // 🔐 admin secret key
  });

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
        "https://stark-store-ecom.vercel.app/api/auth/admin/register",
        // "http://localhost:5000/api/auth/admin/register",
        {
          ...formData,
          role: "admin", // 👑 admin role
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      setSuccessMsg(res.data.message);

      // setTimeout(() => {
      //   navigate("/admin/login");
      // }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");

      setTimeout(() => {
        setError("");
      }, 4000);
    }
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-linear-to-b from-gray-600 to-gray-900">
      <div
        className="
        w-[90%]
        max-w-md
        bg-white/10
        backdrop-blur-2xl
        border border-white/20
        rounded-2xl
        p-8
        text-white
        shadow-2xl
      "
      >
        {/* Brand */}
        <h1 className="text-4xl font-extrabold mb-2 text-center tracking-wide">
          STARK<span className="text-red-400">store</span>
        </h1>

        <p className="text-center text-gray-300 mb-6">
          Admin Registration Panel
        </p>

        {error && (
          <p className="text-red-400 bg-red-900/30 border border-red-700/40 px-3 py-2 rounded-lg text-center mb-4">
            {error}
          </p>
        )}

        {successMsg && (
          <p className="text-green-400 bg-green-900/30 border border-green-700/40 px-3 py-2 rounded-lg text-center mb-4">
            {successMsg}
          </p>
        )}

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Admin Name"
            value={formData.name}
            required
            onChange={handleChange}
            className="bg-white/10 border border-white/20 p-3 rounded-xl text-white focus:outline-none placeholder-gray-200"
          />

          <input
            type="email"
            name="email"
            placeholder="Admin Email"
            value={formData.email}
            required
            onChange={handleChange}
            className="bg-white/10 border border-white/20 p-3 rounded-xl text-white focus:outline-none placeholder-gray-200"
          />

          <input
            type="password"
            name="password"
            placeholder="Admin Password"
            value={formData.password}
            required
            onChange={handleChange}
            className="bg-white/10 border border-white/20 p-3 rounded-xl text-white focus:outline-none placeholder-gray-200"
          />

          {/* <input
            type="password"
            name="adminKey"
            placeholder="Admin Secret Key"
            value={formData.adminKey}
            required
            onChange={handleChange}
            className="bg-white/10 border border-red-400/40 p-3 rounded-xl text-white focus:outline-none placeholder-gray-200"
          /> */}

          <button
            type="submit"
            className="bg-red-500 text-white font-semibold p-3 rounded-xl hover:bg-red-600 duration-200"
          >
            Register Admin
          </button>
        </form>

        <p className="text-center mt-4 text-gray-300">
          Already an admin?{" "}
          <span className="text-red-400 underline cursor-pointer">
            <Link to="/admin/login">Admin Login</Link>
          </span>
        </p>
      </div>
    </div>
  );
};

export default AdminRegister;
