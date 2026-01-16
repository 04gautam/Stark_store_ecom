// import axios from "axios";
// import React, { useState } from "react";
// import { FiMenu, FiX, FiShoppingCart, FiSearch } from "react-icons/fi";
// import { Link,NavLink } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

// const GlassNavbar = ({ cartCount = 0 }) => {
//   const [open, setOpen] = useState(false);
//   const [search, setSearch] = useState("");

//   const navigate = useNavigate();

//   const logoutHandler = async () => {
//     // Implement logout functionality here
    
    
//     const response = await axios.get("http://localhost:5000/api/auth/user/logout", {
//       withCredentials: true,
      
//     }); 
//     navigate("/login");
    
   

//   };

//   return (
//     <nav className="
//       w-full 
//       fixed 
//       top-0 
//       left-0 
//       z-50 
//       backdrop-blur-xl 
//       bg-white/50 
//       border-b 
//       border-white/20 
//       shadow-lg 
//       text-black 
//       px-6 
//       py-4 
//       flex 
//       items-center 
//       justify-between
//     ">
//       {/* Logo */}
//       <h1 className="text-2xl font-bold tracking-wide">
//        <Link to="/">STARK<span className="text-gray-500">Store</span></Link>
//       </h1>

//       {/* Search (Desktop) */}
//       <div className="hidden md:flex items-center lg:border-2 lg:border-gray-500  bg-white/20 backdrop-blur-xl px-4 py-2 rounded-xl border border-white/10">
//         <FiSearch size={20} />
//         <input
//           type="text"
//           placeholder="Search products..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="bg-transparent ml-2 focus:outline-none placeholder-gray-500 text-black w-64"
//         />
//       </div>

//       {/* Menu + Cart (Desktop) */}
//       <div className="hidden md:flex items-center gap-10">
//         <ul className="flex gap-8 text-lg font-medium">
//           <li className="hover:text-gray-300 cursor-pointer duration-200"><NavLink to="/" className={({ isActive }) => (isActive ? "text-orange-600" : "")}>Home</NavLink></li>
//           <li className="hover:text-gray-300 cursor-pointer duration-200">Products</li>
//           <li className="hover:text-gray-300 cursor-pointer duration-200"><NavLink to="/orderd/product" className={({ isActive }) => (isActive ? "text-orange-600" : "")}>Orders</NavLink></li>
//           <li onClick={() => logoutHandler()} className="hover:text-red-500 cursor-pointer duration-200">Logout</li>
//         </ul>

//         {/* Cart */}
//         <div className="relative cursor-pointer">
//           <Link to="/cart">
//             <FiShoppingCart size={25} />
//           </Link>
//           {cartCount > 0 && (
//             <span className="
//               bg-white 
//               text-black 
//               text-xs 
//               font-bold 
//               rounded-full 
//               px-1.5 
//               absolute 
//               -top-2 
//               -right-2
//             ">
//               {cartCount}
//             </span>
//           )}
//         </div>
//       </div>

//       {/* Mobile Menu Button */}
//       <div className="md:hidden cursor-pointer" onClick={() => setOpen(!open)}>
//         {open ? <FiX size={28} /> : <FiMenu size={28} />}
//       </div>

//       {/* Mobile Menu */}
//       {open && (
//         <div className="
//           absolute 
//           top-16 
//           left-0 
//           w-full 
//           bg-black/60 
//           backdrop-blur-lg 
//           text-white 
//           py-6 
//           flex 
//           flex-col 
//           items-center 
//           gap-6 
//           md:hidden 
//           border-b 
//           border-white/20
//         ">

//           {/* Mobile Search */}
//           <div className="flex items-center bg-white/20 px-4 py-2 rounded-xl w-11/12 border border-white/30">
//             <FiSearch size={20} />
//             <input
//               type="text"
//               placeholder="Search products..."
//               className="bg-transparent ml-2 focus:outline-none placeholder-white text-white w-full"
//             />
//           </div>

//           <ul className="flex flex-col items-center gap-4 text-lg font-medium">
//             <li className="hover:text-gray-300 cursor-pointer duration-200"><NavLink to="/" className={({ isActive }) => (isActive ? "text-orange-600" : "")}>Home</NavLink></li>
//             <li className="hover:text-gray-300 cursor-pointer duration-200">Products</li>
//             <li className="hover:text-gray-300 cursor-pointer duration-200"><NavLink to="/orderd/product" className={({ isActive }) => (isActive ? "text-orange-600" : "")}>Orders</NavLink></li>
//             <li onClick={() => logoutHandler()} className="hover:text-red-500 cursor-pointer duration-200">Logout</li>
//           </ul>

//           {/* Cart Mobile */}
//           <div className="flex items-center gap-2 cursor-pointer mt-3">
//             <FiShoppingCart size={25} />
//             {cartCount > 0 && (
//               <span className="bg-white text-black text-sm font-bold rounded-full px-2 py-0.5">
//                 {cartCount}
//               </span>
//             )}
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default GlassNavbar;



import axios from "axios";
import React, { useContext, useState } from "react";
import { FiMenu, FiX, FiShoppingCart, FiSearch } from "react-icons/fi";
import { Link, NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { productContext } from "../App";
import { showProductContext } from "./HomeProducts";

const GlassNavbar = ({ cartCount = 0 }) => {
  const [open, setOpen] = useState(false);

  // const {product, setSearchProduct } = useContext(showProductContext);

  // console.log(product)
  const navigate = useNavigate();


  const filter = (e)=>{
  //   const filtered = product.filter((item) => 
  
  // // item.name.toLowerCase().includes(searchProduct.toLowerCase()) 
  // item.name.toLowerCase().includes(e.target.value.toLowerCase()) 
  // );
  //   setSearchProduct(filtered);
    // console.log(filtered);
  }


  const logoutHandler = async () => {
    const response = await axios.get(
      "http://localhost:5000/api/auth/user/logout",
      { withCredentials: true }
    );
    navigate("/login");
  };

  return (
    <nav className="
      w-full 
      fixed 
      top-0 
      left-0 
      z-50 
      backdrop-blur-xl 
      bg-white/50 
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
        <Link to="/">STARK<span className="text-gray-500">Store</span></Link>
      </h1>

      {/* Search (Desktop) */}
      {/* <div className="hidden md:flex items-center lg:border-2 lg:border-gray-500 bg-white/20 backdrop-blur-xl px-4 py-2 rounded-xl border border-white/10">
        <FiSearch size={20} />
        <input
          type="text"
          placeholder="Search products..."
          // value={search}
          onChange={filter}
          className="bg-transparent ml-2 focus:outline-none placeholder-gray-500 text-black w-64"
        />
      </div> */}

      {/* Menu + Cart (Desktop) */}
      <div className="hidden md:flex items-center gap-10">
        <ul className="flex gap-8 text-lg font-medium">
          <li><NavLink to="/" className={({ isActive }) => (isActive ? "text-orange-600" : "")}>Home</NavLink></li>
          <li>Products</li>
          <li><NavLink to="/orderd/product" className={({ isActive }) => (isActive ? "text-orange-600" : "")}>Orders</NavLink></li>
          <li onClick={() => logoutHandler()} className="hover:text-red-500 cursor-pointer duration-200">Logout</li>
        </ul>

        {/* Cart */}
        <div className="relative cursor-pointer">
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
        </div>
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
          {/* <div className="flex items-center bg-white/20 px-4 py-2 rounded-xl w-11/12 border border-white/30">
            <FiSearch size={20} />
            <input
              type="text"
              placeholder="Search products..."
              // value={search}
              onChange={filter}
              className="bg-transparent ml-2 focus:outline-none placeholder-white text-white w-full"
            />
          </div> */}

          <ul className="flex flex-col items-center gap-4 text-lg font-medium">
            <li><NavLink to="/" className={({ isActive }) => (isActive ? "text-orange-600" : "")}>Home</NavLink></li>
            <li>Products</li>
            <li><NavLink to="/orderd/product" className={({ isActive }) => (isActive ? "text-orange-600" : "")}>Orders</NavLink></li>
            <li onClick={() => logoutHandler()} className="hover:text-red-500 cursor-pointer duration-200">Logout</li>
          </ul>

          <div className="flex items-center gap-2 cursor-pointer mt-3">
            <FiShoppingCart size={25} />
            {cartCount > 0 && (
              <span className="bg-white text-black text-sm font-bold rounded-full px-2 py-0.5">
                {cartCount}
              </span>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default GlassNavbar;
