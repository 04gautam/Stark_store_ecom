
import axios from "axios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbark from "./Navbar";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import Footer from "./Footer";

function SingleProduct() {
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [createMsg, setCreateMsg] = useState("");
  const { id } = useParams();

  useEffect(() => {
    axios
      .post(
        // `http://localhost:5000/api/food/single/${id}`,
        `https://stark-store-ecom.vercel.app/api/food/single/${id}`,
        {},
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        setProduct(response.data.product);
      })
      .catch((error) => {
        if (error) {
          navigate("/login");
        }
      });
  }, [id]);

  const addInCart = async () => {
    try {
      const res = await axios.post(
        // "http://localhost:5000/api/food/cart",
        "https://stark-store-ecom.vercel.app/api/food/cart",
        {
          productId: product._id,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setCreateMsg(
        <div className="fixed top-8 left-1/2 transform -translate-x-1/2 z-50 animate-slide-down">
          <div className="bg-linear-to-r from-orange-500 to-orange-600 text-white px-8 py-5 rounded-2xl shadow-2xl flex items-center gap-4 min-w-80 backdrop-blur-lg border border-white/30">
            <svg
              className="w-10 h-10 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
                d="M5 13l4 4L19 7"
              />
            </svg>
            <div>
              <h3 className="text-xl font-bold">Success!</h3>
              <p className="text-sm opacity-90">Item added to cart</p>
            </div>
            <button className="ml-auto text-white hover:text-gray-200">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      );

      setTimeout(() => {
        setCreateMsg("");
      }, 3000);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Navbark />
      <div className="px-4 md:px-12 lg:px-24 pt-20 pb-16 bg-linear-to-b from-transparent to-gray-50/30 min-h-screen">
        {createMsg}
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb for better navigation */}
          {/* <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
            <Link to="/" className="hover:text-orange-600 transition-colors">
              Home
            </Link>
            <span>•</span>
            <span className="text-gray-800">Product Details</span>
          </div> */}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Image Section - Glass card effect */}
            <div className="space-y-4">
              <div
                className="
                  bg-white/70 
                  backdrop-blur-lg 
                  rounded-3xl 
                  overflow-hidden 
                  border 
                  border-white/40
                  shadow-[0_8px_30px_rgba(0,0,0,0.08)]
                  p-6
                  group
                "
              >
                <div className="relative rounded-2xl overflow-hidden bg-linear-to-br from-gray-50 to-white">
                  <img
                    src={product.photo}
                    alt={product.name}
                    className="
                      w-full
                      h-auto 
                      object-cover 
                      mix-blend-multiply 
                      transform 
                      group-hover:scale-110 
                      duration-700 
                      ease-out
                    "
                    width={1280}
                    height={720}
                  />
                  {/* Decorative linear overlay */}
                  <div className="absolute inset-0 bg-linear-to-t from-orange-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </div>

              {/* Thumbnail gallery placeholder - maintains future extensibility */}
              {/* <div className="flex gap-3 justify-center">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="
                      w-16 
                      h-16 
                      bg-white/50 
                      backdrop-blur-sm 
                      rounded-xl 
                      border 
                      border-white/30
                      shadow-sm
                      cursor-pointer
                      hover:bg-white/80
                      transition-all
                      duration-300
                    "
                  />
                ))}
              </div> */}
            </div>

            {/* Product Info Section - Glass card effect */}
            <div
              className="
                bg-white/70 
                backdrop-blur-lg 
                rounded-3xl 
                border 
                border-white/40
                shadow-[0_8px_30px_rgba(0,0,0,0.08)]
                p-4
                flex
                flex-col
                h-full
                
              "
            >
              {/* Product Title & Rating */}
              <div className="border-b border-gray-200/50 pb-2 ">
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
                  {product.name}
                </h1>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4].map((star) => (
                      <img
                        key={star}
                        className="h-5 w-5 filter drop-shadow-sm"
                        src="https://cdn-icons-png.flaticon.com/512/2107/2107957.png"
                        alt="star_icon"
                      />
                    ))}
                    <img
                      className="h-5 w-5 opacity-60"
                      src="https://cdn-icons-png.flaticon.com/512/2107/2107737.png"
                      alt="star_dull_icon"
                    />
                    <span className="ml-2 text-gray-600 font-medium">(4.5)</span>
                  </div>
                  <span className="text-sm text-gray-400">•</span>
                  <span className="text-sm text-green-600 font-medium">In Stock</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-600 leading-relaxed mt-6">
                {product.description}
              </p>

              {/* Pricing */}
              <div className="mt-6 bg-linear-to-r from-orange-50/50 to-transparent p-4 rounded-xl">
                <div className="flex items-baseline gap-4">
                  <span className="text-4xl font-bold text-gray-800">
                    ₹{product.price}
                  </span>
                  <span className="text-xl text-gray-400 line-through">
                    ₹{product.price ? Math.round(product.price * 1.25) : ""}
                  </span>
                  <span className="bg-orange-500/90 backdrop-blur-sm text-white text-sm font-bold px-3 py-1.5 rounded-full border border-white/30">
                    20% OFF
                  </span>
                </div>
              </div>

              {/* Product Specifications */}
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Specifications
                </h3>
                <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6 border border-white/30">
                  <table className="w-full">
                    <tbody className="divide-y divide-gray-200/50">
                      <tr>
                        <td className="py-3 text-gray-600 font-medium w-32">Brand</td>
                        <td className="py-3 text-gray-800">Generic</td>
                      </tr>
                      {/* <tr>
                        <td className="py-3 text-gray-600 font-medium">Color</td>
                        <td className="py-3 text-gray-800">Multi</td>
                      </tr> */}
                      {/* <tr>
                        <td className="py-3 text-gray-600 font-medium">Category</td>
                        <td className="py-3 text-gray-800">Food</td>
                      </tr> */}
                      <tr>
                        <td className="py-3 text-gray-600 font-medium">Delivery</td>
                        <td className="py-3 text-green-600">Free Shipping</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Action Buttons - matching navbar/product card theme */}
              <div className="flex items-center gap-4 mt-10">
                <button
                  onClick={addInCart}
                  className="
                    w-full 
                    py-4 
                    bg-linear-to-r 
                    from-orange-500 
                    to-orange-600 
                    text-white 
                    rounded-xl 
                    hover:shadow-lg 
                    hover:scale-105 
                    active:scale-95
                    transition-all 
                    duration-300
                    font-semibold
                    text-lg
                    border
                    border-white/20
                    backdrop-blur-sm
                    flex
                    items-center
                    justify-center
                    gap-3
                    group/btn
                  "
                >
                  <svg
                    className="w-5 h-5 transition-transform group-hover/btn:rotate-12"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                  Add to Cart
                </button>

                <Link
                  to={`/buy/${product._id}`}
                  className="
                    w-full
                    py-4
                    bg-white/80
                    backdrop-blur-sm
                    border
                    border-gray-400/80
                    text-gray-800
                    rounded-xl
                    hover:bg-white
                    hover:border-orange-300
                    hover:text-orange-600
                    hover:shadow-md
                    active:scale-95
                    transition-all
                    duration-300
                    font-semibold
                    text-lg
                    flex
                    items-center
                    justify-center
                    gap-3
                    group/btn
                  "
                >
                  <svg
                    className="w-5 h-5 transition-transform group-hover/btn:scale-110"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                  Buy Now
                </Link>
              </div>

              {/* Additional Info */}
              <div className="flex items-center justify-center gap-6 mt-6 text-sm text-gray-500">
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Secure Payment
                </span>
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                  Free Returns
                </span>
              </div>
            </div>
          </div>

          {/* You might also like section - commented as in original */}
          {/* <div className="flex flex-col items-center mt-20">
            <div className="flex flex-col items-center mb-8">
              <p className="text-3xl font-medium">You might also <span className="text-orange-600">like</span></p>
              <div className="w-28 h-0.5 bg-orange-600 mt-2 rounded-full" />
            </div>
          </div> */}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default SingleProduct;