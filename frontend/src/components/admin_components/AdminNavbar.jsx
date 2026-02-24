
import axios from "axios";
import React, { use, useContext, useState } from "react";
import { FiMenu, FiX, FiShoppingCart, FiSearch } from "react-icons/fi";
import { Link, NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// import { productContext } from "../App";
// import { showProductContext } from "./HomeProducts";
// import ProductCard from "./ProductCard";
import { useEffect } from "react";
// import { set } from "mongoose";


const AdminNavbar = (props) => {
  const { cartCount, setResults } = props;
 
  const [open, setOpen] = useState(false);

  const [query, setQuery] = useState("");
  const [errors, setErrors] = useState("");
  
const searchProducts = () => {

  if(query.length === 0){
    setErrors("Please enter something...");
     setResults([]);
     return;
  }
   

     axios.get(
       `https://stark-store-ecom.vercel.app/api/food/search/products?q=${query}`
       // `http://localhost:5000/api/food/search/products?q=${query}`
  //  "http://localhost:5000/api/food/products?q=" + query
    ).then((res) => {
      setResults(res.data.products);
    });
    // console.log(res.data.products);
    // console.log(res.data.products);

  }
   
  // }, [query, setResults]);

  const navigate = useNavigate();



  const logoutHandler = async () => {
    // const response = await axios.get(
    //   // "https://stark-store-ecom.vercel.app/api/auth/user/logout",
    //   "http://localhost:5000/api/auth/user/logout",
    //   { withCredentials: true }
    // );
    navigate("/admin/login");
  };

  return (
    <nav className="
      w-full 
      fixed 
      top-0 
      left-0 
      z-50 
      backdrop-blur-xl 
      bg-white/40 
      border-b 
      border-white/20 
      shadow-lg 
      text-black 
      px-6 
      py-4 
      flex 
      items-center 
      justify-between
    ">
      {/* Logo */}
      <h1 className="text-2xl font-bold tracking-wide">
        <Link to="/">STARK<span className="text-gray-500">Store</span> <span className="text-orange-500">Admin</span></Link>
      </h1>

      {/* Search (Desktop) */}
       {/* <div className="hidden md:flex items-center lg:border-2 lg:border-gray-500 bg-white/20 backdrop-blur-xl px-4 py-2 rounded-xl border border-white/10">
        <FiSearch size={20} />
        <input
          type="text"
          placeholder={errors ? errors : "Search products..."}
          // value={search}
          
          onChange={(e) => setQuery(e.target.value)}
          className="bg-transparent ml-2 focus:outline-none placeholder-gray-500 text-black w-70"
        />

        <button className="bg-black text-white px-4 py-1 rounded-lg hover:bg-gray-700 transition-colors duration-200" onClick={searchProducts}>Search</button>
      </div>  */}
      <div>
 

      </div>

      {/* Menu + Cart (Desktop) */}
      <div className="hidden md:flex items-center gap-10 mr-8">
        <ul className="flex gap-8 text-lg font-medium">
          <li><NavLink to="/admin/create" className={({ isActive }) => (isActive ? "text-orange-600" : "")}>Create Product</NavLink></li>
          {/* <li>Products</li> */}
          <li><NavLink to="/admin/allorders" className={({ isActive }) => (isActive ? "text-orange-600" : "")}>Orders</NavLink></li>
          <li onClick={() => logoutHandler()} className="hover:text-red-500 cursor-pointer duration-200">Logout</li>
        </ul>

        {/* Cart */}
        {/* <div className="relative cursor-pointer">
          <Link to="/cart">
            <FiShoppingCart size={25} />
          </Link>
          {cartCount > 0 && (
            <span className="
              bg-white 
              text-black 
              text-xs 
              font-bold 
              rounded-full 
              px-1.5 
              absolute 
              -top-2 
              -right-2
            ">
              {cartCount}
            </span>
          )}
        </div> */}
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden cursor-pointer" onClick={() => setOpen(!open)}>
        {open ? <FiX size={28} /> : <FiMenu size={28} />}
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="
          absolute 
          top-16 
          left-0 
          w-full 
          bg-black/60 
          backdrop-blur-lg 
          text-white 
          py-6 
          flex 
          flex-col 
          items-center 
          gap-6 
          md:hidden 
          border-b 
          border-white/20
        ">

          {/* Mobile Search */}
          {/* <div className="flex items-center justify-space-between ring bg-white/20 px-4 py-2 rounded-xl  border border-white/30">
          
            <FiSearch size={20} />
            <input
          type="text"
          placeholder="Search products..."
          // value={search}
          onChange={(e) => setQuery(e.target.value)}
          className="bg-transparent ml-2 focus:outline-none placeholder-gray-500 text-black w-64"
        />

        <button className="bg-black text-white px-4 py-1 rounded-lg hover:bg-gray-700 transition-colors duration-200" onClick={searchProducts}>Search</button>
          </div>  */}

          <ul className="flex flex-col items-center gap-4 text-lg font-medium">
            <li><NavLink to="/admin/create" className={({ isActive }) => (isActive ? "text-orange-600" : "")}>Create Product</NavLink></li>
            {/* <li>Products</li> */}
            <li><NavLink to="/admin/allorders" className={({ isActive }) => (isActive ? "text-orange-600" : "")}>All Orders</NavLink></li>
            <li onClick={() => logoutHandler()} className="hover:text-red-500 cursor-pointer duration-200">Logout</li>
          </ul>

          {/* <div className="flex items-center gap-2 cursor-pointer mt-3">
            <Link to="/cart">
            <FiShoppingCart size={25} />
            </Link>
            {cartCount > 0 && (
              <span className="bg-white text-black text-sm font-bold rounded-full px-2 py-0.5">
                {cartCount}
              </span>
            )}
          </div> */}
        </div>
      )}

{/* <ProductCard products={results} /> */}

    </nav>
  );
};

export default AdminNavbar;
