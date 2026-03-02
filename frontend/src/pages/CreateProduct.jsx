import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { FiUpload, FiPackage, FiDollarSign, FiPercent, FiTag, FiImage } from "react-icons/fi";
import AdminNavbar from "../components/admin_components/AdminNavbar";

const AddProduct = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    discount: "",
    category: "",
  });

  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [createMsg, setCreateMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("image", image);
    formData.append("name", product.name);
    formData.append("description", product.description);
    formData.append("price", product.price);
    formData.append("discount", product.discount);
    formData.append("category", product.category);

    try {
      const res = await axios.post(
        // "http://localhost:5000/api/food/upload",
        "https://stark-store-ecom.vercel.app/api/food/upload",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setCreateMsg(
        <div className="fixed top-8 left-1/2 transform -translate-x-1/2 z-50 animate-slide-down">
          <div className="bg-linear-to-r from-orange-500 to-orange-600 text-white px-8 py-5 rounded-2xl shadow-2xl flex items-center gap-4 min-w-80 backdrop-blur-lg border border-white/30">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
            </svg>
            <div>
              <h3 className="text-xl font-bold">Success!</h3>
              <p className="text-sm opacity-90">Product added successfully</p>
            </div>
          </div>
        </div>
      );

      setTimeout(() => {
        setCreateMsg("");
      }, 3000);

      setProduct({ name: "", description: "", price: "", discount: "", category: "" });
      setImage(null);
      setImagePreview(null);
      setLoading(false);
    } catch (error) {
      if (error) {
        navigate("/admin/login");
      }
      setLoading(false);
    }
  };

  return (
    <>
    <AdminNavbar />
      <div className="min-h-screen bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 flex justify-center items-center p-4 lg:p-8 relative overflow-hidden mt-8">
        
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-orange-600/10 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        </div>

        {createMsg}

        <div className="w-full max-w-4xl bg-white/10 backdrop-blur-xl rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.3)] border border-white/20 overflow-hidden relative z-10">
          
          {/* Header with linear */}
          <div className="bg-linear-to-r from-orange-500 to-orange-600 px-8 py-6 text-center relative">
            <div className="absolute inset-0 bg-white/10 backdrop-blur-sm" />
            <div className="relative z-10">
              <h1 className="text-4xl font-extrabold text-white tracking-wide mb-2">
                STARK<span className="text-gray-900 font-medium">Store</span>
              </h1>
              <p className="text-orange-100 text-lg font-medium flex items-center justify-center gap-2">
                <FiPackage />
                Add New Product to Inventory
              </p>
            </div>
          </div>

          <div className="p-8 lg:p-10">
            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* Image Upload Section with Preview */}
              <div className="space-y-4">
                <label className=" text-md font-semibold text-white/90 flex items-center gap-2">
                  <FiImage className="text-orange-400" />
                  Product Image
                </label>
                
                <div className="relative group">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full text-white/80 file:mr-4 file:py-3 file:px-6 
                    file:rounded-xl file:border-0 file:text-md file:font-bold 
                    file:bg-linear-to-r file:from-orange-500 file:to-orange-600 
                    file:text-white hover:file:from-orange-600 hover:file:to-orange-700 
                    cursor-pointer transition duration-300 bg-white/5 backdrop-blur-sm
                    border border-white/10 rounded-xl p-2"
                  />
                </div>

                {/* Image Preview with Glass Effect */}
                {imagePreview && (
                  <div className="mt-6 flex justify-center">
                    <div className="relative group">
                      <div className="absolute inset-0 bg-linear-to-r from-orange-500/20 to-orange-600/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500" />
                      <img
                        src={imagePreview}
                        alt="Product preview"
                        className="relative max-h-96 rounded-2xl shadow-2xl border-4 border-white/20 
                        object-cover transition-all duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                        <p className="text-white font-bold text-lg backdrop-blur-sm bg-black/30 px-4 py-2 rounded-full">
                          ✓ Ready to upload
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Product Name with Icon */}
              <div className="relative group">
                <label className="text-md font-semibold text-white/90 mb-2 flex items-center gap-2">
                  <FiPackage className="text-orange-400" />
                  Product Name
                </label>
                <div className="absolute inset-0 bg-linear-to-r from-orange-500/20 to-orange-600/20 rounded-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300" />
                <input
                  type="text"
                  name="name"
                  value={product.name}
                  onChange={handleChange}
                  required
                  placeholder="Enter product name"
                  className="w-full px-5 py-4 text-lg bg-white/5 backdrop-blur-sm 
                  border border-white/10 rounded-xl text-white placeholder-gray-400
                  focus:outline-none focus:border-orange-500/50 focus:bg-white/10
                  transition-all duration-300"
                />
              </div>

              {/* Description */}
              <div className="relative group">
                <label className="block text-md font-semibold text-white/90 mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={product.description}
                  onChange={handleChange}
                  rows="5"
                  required
                  placeholder="Describe your product..."
                  className="w-full px-5 py-4 text-lg bg-white/5 backdrop-blur-sm 
                  border border-white/10 rounded-xl text-white placeholder-gray-400
                  focus:outline-none focus:border-orange-500/50 focus:bg-white/10
                  transition-all duration-300 resize-none"
                />
              </div>

              {/* Price and Discount Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Price */}
                <div className="relative group">
                  <label className="text-md font-semibold text-white/90 mb-2 flex items-center gap-2">
                    <FiDollarSign className="text-orange-400" />
                    Price (₹)
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={product.price}
                    onChange={handleChange}
                    required
                    placeholder="0.00"
                    min="0"
                    className="w-full px-5 py-4 text-lg bg-white/5 backdrop-blur-sm 
                    border border-white/10 rounded-xl text-white placeholder-gray-400
                    focus:outline-none focus:border-orange-500/50 focus:bg-white/10
                    transition-all duration-300
                    appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [-moz-appearance:textfield]
                    "
                  />
                </div>

                {/* Discount */}
                <div className="relative group">
                  <label className="text-md font-semibold text-white/90 mb-2 flex items-center gap-2">
                    <FiPercent className="text-orange-400" />
                    Discount (%)
                  </label>
                  <input
                    type="number"
                    name="discount"
                    value={product.discount}
                    onChange={handleChange}
                    placeholder="0"
                    min="0"
                    max="100"
                    className="w-full px-5 py-4 text-lg bg-white/5 backdrop-blur-sm 
                    border border-white/10 rounded-xl text-white placeholder-gray-400
                    focus:outline-none focus:border-orange-500/50 focus:bg-white/10
                    transition-all duration-300
                    appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [-moz-appearance:textfield]
                    "
                  />
                </div>
              </div>

              {/* Category */}
              <div className="relative group">
                <label className="text-md font-semibold text-white/90 mb-2 flex items-center gap-2">
                  <FiTag className="text-orange-400" />
                  Category
                </label>
                <select
                  name="category"
                  value={product.category}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-4 text-lg bg-white/5 backdrop-blur-sm 
                  border border-white/10 rounded-xl text-white
                  focus:outline-none focus:border-orange-500/50 focus:bg-white/10
                  transition-all duration-300"
                >
                  <option value="" disabled className="bg-gray-800">Select category</option>
                  <option value="Electronics" className="bg-gray-800">Electronics</option>
                  <option value="Fashion" className="bg-gray-800">Fashion</option>
                  <option value="Footwear" className="bg-gray-800">Footwear</option>
                  <option value="Watches" className="bg-gray-800">Watches</option>
                  <option value="Accessories" className="bg-gray-800">Accessories</option>
                  <option value="Sports" className="bg-gray-800">Sports</option>
                </select>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-linear-to-r from-orange-500 to-orange-600 text-white 
                py-5 rounded-xl font-bold text-xl hover:from-orange-600 hover:to-orange-700 
                transform hover:scale-[1.02] active:scale-95 transition-all duration-300 
                shadow-[0_8px_30px_rgba(249,115,22,0.3)] border border-white/20
                disabled:opacity-50 disabled:cursor-not-allowed
                flex items-center justify-center gap-3 group"
              >
                {loading ? (
                  <>
                    <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                    Adding Product...
                  </>
                ) : (
                  <>
                    <FiUpload className="text-xl group-hover:rotate-12 transition-transform duration-300" />
                    Add Product to Store
                  </>
                )}
              </button>

              {/* Form Footer Note */}
              <p className="text-center text-sm text-gray-400 mt-6">
                All fields are required • Product will be visible immediately after addition
              </p>
            </form>
          </div>
        </div>
      </div>

     
      
    </>
  );
};

export default AddProduct;