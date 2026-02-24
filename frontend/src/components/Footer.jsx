import React from "react";
import { FiFacebook, FiInstagram, FiTwitter, FiMail } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

import { Link } from "react-router-dom";

const GlassFooter = () => {
  return (
    <footer
      className="
        w-full 
        mt-20 
        bg-linear-to-b from-gray-500 via-black to-gray-900      /* darker glass */
        backdrop-blur-xl 
        border-t 
        border-white/20 
        text-white 
        py-10 
        px-6
        
      "
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* Brand Section */}
        <div>
          <h1 className="text-3xl font-bold">
            STARK<span className="text-orange-500">Store</span>
          </h1>
          <p className="text-gray-300 mt-2">
            Premium products. Modern design.  
            Your trusted shopping partner.
          </p>

          {/* Social Icons */}
          <div className="flex gap-5 mt-4">
            <a href="https://www.facebook.com/Harshz0011">
             <FiFacebook className="text-2xl hover:text-gray-300 cursor-pointer duration-200" />
            </a>
            <a href="https://www.instagram.com/harshz0011/">
             <FiInstagram className="text-2xl hover:text-gray-300 cursor-pointer duration-200" />
            </a>
            <a href="https://x.com/Harsh_z01">
             <FiTwitter className="text-2xl hover:text-gray-300 cursor-pointer duration-200" />
            </a>
            <FiMail className="text-2xl hover:text-gray-300 cursor-pointer duration-200" />
              <a href="https://wa.me/6398971981?text=Hey I want contact to you I reached you by StarkStore.">
            <FaWhatsapp className="text-2xl hover:text-gray-300 cursor-pointer duration-200"/>
</a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-xl font-semibold mb-3">Quick Links</h2>
          <ul className="flex flex-col gap-2 text-gray-300">
            <li className="hover:text-white cursor-pointer duration-200"> <Link to={"/"}>Home</Link> </li>
            {/* <li className="hover:text-white cursor-pointer duration-200">Products</li> */}
            <li className="hover:text-white cursor-pointer duration-200">About</li>
            <li className="hover:text-white cursor-pointer duration-200">Contact: Upper social media links</li>
            <li className="hover:text-white cursor-pointer duration-200">Privacy Policy</li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h2 className="text-xl font-semibold mb-3">Stay Updated</h2>
          <p className="text-gray-300 mb-3">Subscribe to our newsletter</p>

          <div className="flex bg-white/20 backdrop-blur-lg px-3 py-2 rounded-xl border border-white/30">
            <input
              type="email"
              placeholder="Enter your email"
              className="bg-transparent text-white placeholder-white focus:outline-none w-full"
            />
            <button className="ml-2 bg-white text-black px-4 py-1 rounded-xl font-semibold hover:bg-gray-200 duration-200">
              Join
            </button>
          </div>
        </div>
      </div>

      {/* Admin panel link */}

      <div className="text-center mt-4">
      <Link to="/admin/login">STARK<span className="text-gray-500">Store</span> <span className="text-orange-500">Admin</span></Link>
      </div>
      {/* Footer Bottom */}
      <div className="text-center text-gray-300 mt-10 border-t border-white/20 pt-4">
        © {new Date().getFullYear()} STARK Technologies. All rights reserved.
      </div>

    </footer>
  );
};

export default GlassFooter;
