
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

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
        "http://localhost:5000/api/auth/user/login",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      navigate("/");
    } catch (err) {
      setError("Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-linear-to-b from-gray-500 red to-gray-900">

      <div className="
        w-[90%]
        max-w-md
        bg-white/10
        backdrop-blur-2xl
        border border-white/20
        rounded-2xl
        p-8
        text-white
        shadow-2xl
        relative
      ">
        
        {/* Brand */}
        <h1 className="text-4xl font-extrabold mb-2 text-center tracking-wide">
          STARK<span className="text-red-400">store</span>
        </h1>

        <p className="text-center text-gray-300 mb-6">
          Welcome back, login to continue
        </p>

        {/* Error Message */}
        {error && (
          <p className="text-red-400 bg-red-900/30 border border-red-700/40 px-3 py-2 rounded-lg text-center mb-4">
            {error}
          </p>
        )}

        <form className="flex flex-col gap-5">
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="
              bg-white/10 
              border border-white/20 
              p-3 
              rounded-xl 
              text-white 
              focus:outline-none 
              placeholder-gray-300
              focus:ring-2 focus:ring-green-400
            "
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="
              bg-white/10 
              border border-white/20 
              p-3 
              rounded-xl 
              text-white 
              focus:outline-none 
              placeholder-gray-300
              focus:ring-2 focus:ring-green-400
            "
          />

          <button
            type="submit"
            onClick={handleSubmit}
            className="
              bg-red-500 
              text-white 
              font-semibold 
              p-3 
              rounded-xl 
              hover:bg-red-600 
              duration-200
              shadow-lg shadow-red-500/30
            "
          >
            Login
          </button>
        </form>

        <p className="text-center mt-5 text-gray-300">
          Don’t have an account?{" "}
          <span className="text-red-400 underline cursor-pointer">
            <Link to="/register">Register</Link>
          </span>
        </p>

      </div>
    </div>
  );
};

export default Login;
