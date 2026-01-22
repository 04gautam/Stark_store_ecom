import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Register = () => {

  const navigate = useNavigate();

  const [successMsg, setSuccessMsg] = useState("")
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
      // console.log("Form Data:", formData);

      try{

      const res = await axios.post("https://stark-store-ecom.vercel.app/api/auth/user/register", formData,{
        headers: { 
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });
      // console.log("Server Response:", res);
      setSuccessMsg(res.data.message)
  setTimeout(()=>{
    
    navigate("/");
    
      },2000)


} catch (err) {
  setError(err.response.data.message);
  
  setTimeout(()=>{
    setError("");
    
      },4000)
      // console.log(err.response.data.message)
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
          Welcome, New user register here
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
            placeholder="Full Name"
            value={formData.name}
            required
            onChange={handleChange}
            className="
              bg-white/10 
              border border-white/20 
              p-3 
              rounded-xl 
              text-white 
              focus:outline-none 
              placeholder-gray-200
            "
          />

          <input
            type="email"
            name="email"
            required
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
              placeholder-gray-200
            "
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="
              bg-white/10 
              border border-white/20 
              p-3 
              rounded-xl 
              text-white 
              focus:outline-none 
              placeholder-gray-200
            "
          />

          <button
            type="submit"
            className="
              bg-white 
              text-black 
              font-semibold 
              p-3 
              rounded-xl 
              hover:bg-gray-200 
              duration-200
            "
          >
            Register
          </button>

        </form>

        <p className="text-center mt-4 text-gray-300">
          Already have an account?{" "}
          <span className="text-red-400 underline cursor-pointer ">
            <Link to="/login">Login</Link>
          </span>
        </p>
      </div>
    </div>

  );
};

export default Register;
