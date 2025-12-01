import React, { useState } from "react";
import axios from "axios";

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    discount: "",
    category: ""
  });

  const [image, setImage] = useState(null);

  // Handle normal input fields
  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  // Handle image upload
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  // Form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", image);            // image buffer
    formData.append("name", product.name);
    formData.append("description", product.description);
    formData.append("price", product.price);
    formData.append("discount", product.discount);
    formData.append("category", product.category);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/food/upload",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      console.log(res);
      alert("Product added successfully!");
    } catch (error) {
      console.log(error);
      alert("Error uploading product");
    }
  };

  return (
    <div className="min-h-screen bg-black/10 flex justify-center items-center p-6">
      <div className="w-full bg-opacity-0 max-w-2xl bg-white opacity-80 rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Add New Product
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Product Image */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Product Image
            </label>
            <input
              type="file"
              onChange={handleImageChange}
              className="w-full text-gray-600 file:mr-4 file:py-2 file:px-4 
              file:rounded-lg file:border-0 file:text-sm 
              file:font-semibold file:bg-indigo-600 file:text-white 
              hover:file:bg-indigo-700 cursor-pointer"
            />
          </div>

          {/* Product Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Product Name
            </label>
            <input
              type="text"
              name="name"
              value={product.name}
              onChange={handleChange}
              placeholder="Enter product name"
              className="w-full px-4 py-2 border rounded-lg 
              focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={product.description}
              onChange={handleChange}
              rows="4"
              placeholder="Enter product description"
              className="w-full px-4 py-2 border rounded-lg 
              focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
            ></textarea>
          </div>

          {/* Price and Discount */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Price
              </label>
              <input
                type="number"
                name="price"
                value={product.price}
                onChange={handleChange}
                placeholder="₹ Price"
                className="w-full px-4 py-2 border rounded-lg 
                focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Discount (%)
              </label>
              <input
                type="number"
                name="discount"
                value={product.discount}
                onChange={handleChange}
                placeholder="e.g. 10"
                className="w-full px-4 py-2 border rounded-lg 
                focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Category
            </label>
            <select
              name="category"
              value={product.category}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg 
              focus:ring-2 focus:ring-indigo-500 outline-none"
            >
              <option>Select category</option>
              <option>Electronics</option>
              <option>Fashion</option>
              <option>Home & Kitchen</option>
              <option>Sports</option>
              <option>Other</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg 
            font-semibold text-lg hover:bg-indigo-700 transition duration-200"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
