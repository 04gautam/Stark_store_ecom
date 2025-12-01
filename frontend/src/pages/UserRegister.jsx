import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Register = () => {
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
      console.log("Form Data:", formData);

      const res = await axios.post("http://localhost:5000/api/auth/user/register", formData,{
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });
      console.log("Server Response:", res);


  };


// value={formData.email}
//           onChange={handleChange}
//           name="email"


  return (
 <div className="w-full min-h-screen bg-linear-to-b from-gray-500 via-black to-gray-900  flex justify-center items-center bg-white relative">

      {/* Background Blur Box */}
      <div className="
        w-[90%] 
        max-w-md 
       bg-linear-to-b from-gray-500 via-black to-gray-900
        backdrop-blur-xl 
        border 
        border-white/20 
        rounded-2xl 
        p-8 
        text-white 
        shadow-2xl
      ">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Create Account
        </h1>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
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
          <span className="text-white underline cursor-pointer">
            <Link to="/login">Login</Link>
          </span>
        </p>
      </div>
    </div>

  );
};

export default Register;
