
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from "./Navbar";

function OrderdProduct() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const response = async () => {
    try {
      // const res = await axios.get('http://localhost:5000/api/food/orderd/product', {
      const res = await axios.get('https://stark-store-ecom.vercel.app/api/food/orderd/product', {
        withCredentials: true
      });
      setOrders(res.data.orders);
    } catch (error) {
      console.error("Failed to fetch orders", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    response();
  }, []);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-linear-to-b from-transparent to-gray-50/30 pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Header with glass effect */}
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-3 sm:mb-4">
              Your <span className="text-orange-600">Orders</span>
            </h1>
            <div className="w-20 sm:w-24 h-1 bg-linear-to-r from-orange-500 to-orange-600 mx-auto rounded-full" />
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex justify-center items-center py-16 sm:py-20">
              <div className="relative">
                <div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-orange-200 border-t-orange-600 rounded-full animate-spin" />
                <div className="absolute inset-0 bg-white/30 backdrop-blur-sm rounded-full" />
              </div>
            </div>
          )}

          {/* No Orders State */}
          {!loading && orders.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 sm:py-16 px-4">
              <div
                className="
                  bg-white/70 
                  backdrop-blur-lg 
                  rounded-2xl sm:rounded-3xl 
                  border 
                  border-white/40
                  shadow-[0_8px_30px_rgba(0,0,0,0.08)]
                  p-8 sm:p-12
                  text-center
                  max-w-md
                  w-full
                "
              >
                {/* Empty state illustration */}
                <div className="w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-4 sm:mb-6 rounded-full bg-linear-to-br from-orange-100 to-orange-50 flex items-center justify-center">
                  <svg
                    className="w-12 h-12 sm:w-16 sm:h-16 text-orange-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    />
                  </svg>
                </div>
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-2 sm:mb-3">
                  No orders yet
                </h2>
                <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8 px-2">
                  Looks like you haven't placed any orders. Start shopping to see your orders here!
                </p>
                <Link
                  to="/"
                  className="
                    inline-block
                    w-full sm:w-auto
                    bg-linear-to-r 
                    from-orange-500 
                    to-orange-600 
                    text-white 
                    px-6 sm:px-8 
                    py-2.5 sm:py-3 
                    rounded-xl 
                    hover:shadow-lg 
                    hover:scale-105 
                    active:scale-95
                    transition-all 
                    duration-300
                    font-medium
                    text-sm sm:text-base
                    border
                    border-white/20
                    backdrop-blur-sm
                  "
                >
                  Browse Products
                </Link>
              </div>
            </div>
          )}

          {/* Orders List */}
          {!loading && orders.length > 0 && (
            <div className="space-y-4 sm:space-y-6">
              {orders.reverse().map((order, index) => (
                <div
                  key={order._id}
                  className="
                    group
                    bg-white/70 
                    backdrop-blur-lg 
                    rounded-xl sm:rounded-2xl 
                    overflow-hidden
                    border 
                    border-white/40
                    shadow-[0_8px_30px_rgba(0,0,0,0.08)]
                    hover:shadow-[0_20px_40px_rgba(0,0,0,0.12)]
                    transition-all
                    duration-500
                    hover:-translate-y-1
                  "
                >
                  {/* Order Header */}
                  <div className="
                    px-4 sm:px-6 py-3 sm:py-4 
                    bg-linear-to-r from-orange-50/50 to-transparent
                    border-b border-white/30
                    flex flex-col xs:flex-row sm:flex-row justify-between items-start xs:items-center sm:items-center
                    gap-2 sm:gap-3
                  ">
                    <div className="flex items-center gap-2 sm:gap-3 w-full xs:w-auto">
                      <div className="
                        w-8 h-8 sm:w-10 sm:h-10 
                        rounded-full 
                        bg-white/80 
                        backdrop-blur-sm
                        border border-white/50
                        flex items-center justify-center
                        text-orange-600 font-semibold
                        text-sm sm:text-base
                        shrink-0
                      ">
                        #{index + 1}
                      </div>
                      <h2 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-800 truncate max-w-45 xs:max-w-[200px] sm:max-w-full">
                        Order #{order._id.slice(-8)}
                      </h2>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3 w-full xs:w-auto justify-end">
                      <span className="
                        bg-green-100/80 
                        backdrop-blur-sm
                        text-green-700 
                        px-3 sm:px-4 
                        py-1 sm:py-1.5 
                        rounded-full 
                        text-xs sm:text-sm 
                        font-medium
                        border border-green-200/50
                        whitespace-nowrap
                      ">
                        Delivered
                      </span>
                    </div>
                  </div>

                  {/* Product Details */}
                  <div className="p-4 sm:p-6">
                    {order.product ? (
                      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start">
                        {/* Product Image - Fixed sizing for mobile */}
                        <div className="
                          w-full sm:w-28 lg:w-32 
                          h-48 xs:h-56 sm:h-28 lg:h-32 
                          rounded-xl 
                          overflow-hidden
                          bg-white/50
                          backdrop-blur-sm
                          border border-white/30
                          shadow-sm
                          shrink-0
                        ">
                          <img
                            src={order.product.photo}
                            alt={order.product.name}
                            className="w-full h-full object-contain sm:object-cover transform group-hover:scale-110 transition-transform duration-700"
                          />
                        </div>

                        {/* Product Info */}
                        <div className="flex-1 w-full">
                          <div className="flex flex-col sm:flex-row sm:justify-between gap-3 sm:gap-4">
                            <div className="w-full">
                              <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-800 mb-1 sm:mb-2 group-hover:text-orange-600 transition-colors duration-300 wrap-break-words pr-2">
                                {order.product.name}
                              </h3>
                              <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm">
                                <span className="text-gray-600 bg-gray-50/50 px-2 py-1 rounded-lg">
                                  Qty: <span className="font-medium text-gray-800">1</span>
                                </span>
                                <span className="text-gray-300 hidden xs:inline">|</span>
                                <span className="text-gray-600 bg-gray-50/50 px-2 py-1 rounded-lg">
                                  Price: <span className="font-medium text-gray-800">₹{order.product.price}</span>
                                </span>
                              </div>
                            </div>
                            <div className="text-left sm:text-right mt-2 sm:mt-0">
                              <p className="text-xl sm:text-2xl font-bold text-gray-800">
                                ₹{order.product.price}
                              </p>
                              <p className="text-xs text-green-600 font-medium mt-1 flex items-center sm:justify-end gap-1">
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                                Free Shipping
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="
                        bg-red-50/80 
                        backdrop-blur-sm
                        border border-red-200/50
                        text-red-600 
                        p-3 sm:p-4 
                        rounded-xl
                        text-xs sm:text-sm
                      ">
                        Product details not available
                      </div>
                    )}
                  </div>

                  {/* Order Footer */}
                  <div className="
                    px-4 sm:px-6 py-3 sm:py-4 
                    bg-white/40 
                    backdrop-blur-sm
                    border-t border-white/30
                    flex flex-col sm:flex-row justify-between items-start sm:items-center
                    gap-3 sm:gap-4
                    text-xs sm:text-sm
                  ">
                    <div className="flex flex-col xs:flex-row xs:items-center gap-2 xs:gap-4 flex-wrap w-full sm:w-auto">
                      <span className="text-gray-600 flex flex-wrap items-center gap-1">
                        <span className="font-medium">Ordered:</span> 
                        <span className="text-gray-800">
                          {new Date(order.updatedAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </span>
                      </span>
                      <span className="text-gray-300 hidden xs:inline">•</span>
                      <span className="text-green-600 font-medium flex items-center gap-1">
                        <svg className="w-3 h-3 sm:w-4 sm:h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        Paid
                      </span>
                    </div>

                    {/* Action Buttons - Stack on mobile */}
                    <div className="flex flex-col xs:flex-row gap-2 w-full sm:w-auto">
                      {order.product && (
                        <>
                          <Link
                            to={`/product/${order.product._id}`}
                            className="
                              flex-1 xs:flex-none
                              px-3 sm:px-5 
                              py-2 
                              bg-white/80 
                              backdrop-blur-sm
                              border 
                              border-gray-200/80
                              text-gray-700 
                              rounded-lg 
                              hover:bg-white 
                              hover:border-orange-300
                              hover:text-orange-600
                              hover:shadow-md
                              active:scale-95
                              transition-all 
                              duration-300
                              text-xs sm:text-sm
                              font-medium
                              text-center
                              whitespace-nowrap
                            "
                          >
                            View
                          </Link>
                          <Link to={`/product/${order.product._id}`} 
                          className="
                              flex-1 xs:flex-none
                              px-3 sm:px-5 
                              py-2 
                              bg-linear-to-r 
                              from-orange-500 
                              to-orange-600 
                              text-white 
                              rounded-lg 
                              hover:shadow-lg 
                              hover:scale-105 
                              active:scale-95
                              transition-all 
                              duration-300
                              text-xs sm:text-sm
                              font-medium
                              border
                              text-center
                              border-white/20
                              backdrop-blur-sm
                              whitespace-nowrap
                            "
                          >
                          
                            Buy Again
                          </Link>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default OrderdProduct;