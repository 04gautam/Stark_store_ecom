import { useState } from "react"; 
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Login = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
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
      

      const res = await axios.post("http://localhost:5000/api/auth/user/login", formData,{
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      }).then(()=>{
        navigate("/");

      });
      


  };
  return (
    
    <div className="w-full min-h-screen  flex justify-center items-center bg-linear-to-b from-gray-500 via-black to-gray-900">

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
          Welcome Back
        </h1>

        <form className="flex flex-col gap-4">

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
            onClick={handleSubmit}
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
            Login
          </button>

        </form>

        <p className="text-center mt-4 text-gray-300">
          Don't have an account?{" "}
          <span className="text-white underline cursor-pointer">
          <Link to="/register">Register</Link>
          </span>
        </p>
      </div>
    </div>

  );
};

export default Login;
