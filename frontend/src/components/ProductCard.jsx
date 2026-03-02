
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ products }) => {
  const [createMsg, setCreateMsg] = useState("");

  const addInCart = async (item) => {
    try {
      const res = await axios.post(
        // "http://localhost:5000/api/food/cart",
        "https://stark-store-ecom.vercel.app/api/food/cart",
        {
          productId: item,
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
      <div className="w-full flex justify-center md:py-8 pt-4 px-6 bg-linear-to-b from-transparent to-gray-50/50">
      {/* <div className="flex  gap-4"> */}
        {createMsg}
        <div
          className="grid 
          grid-cols-1
          sm:grid-cols-2 
          md:grid-cols-3 
          lg:grid-cols-4
          gap-8 
          w-full
          max-w-7xl"
        >
          {products.map((item, index) => (
            <div
              key={index}
              className="
              group
                bg-white/70 
                backdrop-blur-lg 
                rounded-3xl 
                overflow-hidden 
                shadow-[0_8px_30px_rgba(0,0,0,0.08)]
                hover:shadow-[0_20px_40px_rgba(0,0,0,0.15)]
                border 
                border-white/40
                transition-all 
                duration-500 
                hover:-translate-y-1
                flex 
                flex-col
                relative
                before:absolute
                before:inset-0
                before:bg-linear-to-b
                before:from-transparent
                before:via-transparent
                before:to-white/10
                before:pointer-events-none
                
             
              "
            >
              <Link to={`/product/${item._id}`} className="block overflow-hidden relative">
                {/* Product Image with elegant overlay */}
                <div className="relative overflow-hidden aspect-square">
                  <img
                    src={item.photo}
                    alt={item.name}
                    className="w-full h-full object-cover transform group-hover:scale-110 duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Discount Badge - repositioned for glass effect */}
                <div className="absolute top-4 right-4 bg-orange-500/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full border border-white/30 shadow-lg">
                  20% OFF
                </div>

                {/* Product Details */}
                <div className="p-5 text-gray-800 flex flex-col gap-2 bg-white/40 backdrop-blur-[2px]">
                  <h2 className="text-xl font-bold line-clamp-1 group-hover:text-orange-600 transition-colors duration-300">
                    {item.name}
                  </h2>

                  {/* Rating with refined styling */}
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-0.5">
                      {[1, 2, 3, 4].map((star) => (
                        <img
                          key={star}
                          className="h-4 w-4 filter drop-shadow-sm"
                          src="https://cdn-icons-png.flaticon.com/512/2107/2107957.png"
                          alt="star_icon"
                        />
                      ))}
                      <img
                        className="h-4 w-4 opacity-60"
                        src="https://cdn-icons-png.flaticon.com/512/2107/2107737.png"
                        alt="star_dull_icon"
                      />
                    </div>
                    <p className="text-sm text-gray-600 font-medium">(4.5)</p>
                  </div>

                  <p className="text-sm text-gray-600/90 line-clamp-2 leading-relaxed">
                    {item.description.slice(0, 65)}...
                  </p>

                  <h3 className="text-2xl font-bold mt-2 flex items-baseline gap-2">
                    ₹ {item.price}
                    <span className="text-sm font-medium text-orange-600/80 line-through decoration-2 decoration-orange-600/50">
                      ₹ {Math.round(item.price * 1.25)}
                    </span>
                  </h3>
                </div>
              </Link>

              {/* Buttons - redesigned with glass effect */}
              <div className="px-5 pb-5 pt-1 flex justify-between gap-3 bg-white/30 backdrop-blur-sm border-t border-white/30">
                <button
                  onClick={() => addInCart(item._id)}
                  className="w-1/2 
                    bg-linear-to-r from-orange-500 to-orange-600 
                    text-white 
                    py-2.5 
                    rounded-xl 
                    hover:shadow-lg 
                    hover:scale-105 
                    active:scale-95
                    transition-all 
                    duration-300
                    font-medium
                    text-sm
                    border
                    border-white/20
                    backdrop-blur-sm
                    flex
                    items-center
                    justify-center
                    gap-2
                    group/btn"
                >
                  <svg
                    className="w-4 h-4 transition-transform group-hover/btn:rotate-12"
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
                  className="w-1/2 
                    bg-white/80 
                    backdrop-blur-sm
                    border 
                    border-gray-400/80
                    text-gray-800 
                    py-2.5 
                    rounded-xl 
                    hover:bg-white 
                    hover:border-orange-300
                    hover:text-orange-600
                    hover:shadow-md
                    active:scale-95
                    transition-all 
                    duration-300
                    font-medium
                    text-sm
                    flex
                    items-center
                    justify-center
                    gap-2
                    group/btn"
                  to={`/product/${item._id}`}
                >
                  <svg
                    className="w-4 h-4 transition-transform group-hover/btn:scale-110"
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
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductCard;