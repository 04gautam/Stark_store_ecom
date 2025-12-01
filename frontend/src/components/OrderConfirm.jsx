function OrderConfirm() {
  return ( <>
  
    <div className="min-h-screen bg-linear-to-r from-green-400 to-emerald-600 flex justify-center items-center p-6">
  <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl p-10 text-center">

    {/* Success Icon */}
    <div className="flex justify-center mb-6">
      <div className="w-20 h-20 bg-green-100 rounded-full flex justify-center items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2.5"
          stroke="green"
          className="w-12 h-12"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>
    </div>

    <h1 className="text-3xl font-bold text-gray-800 mb-2">
      Order Confirmed!
    </h1>

    <p className="text-gray-600 mb-6">
      Thank you for your purchase. Your order has been successfully placed.
      A confirmation email has been sent to your registered email address.
    </p>

    {/* Order Summary Card */}
    <div className="bg-gray-100 rounded-xl p-6 text-left mb-6 shadow-inner">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Order Summary
      </h2>

      <div className="flex justify-between mb-2">
        <span className="text-gray-700">Product:</span>
        <span className="font-medium text-gray-800">Sample Product Name</span>
      </div>

      <div className="flex justify-between mb-2">
        <span className="text-gray-700">Quantity:</span>
        <span className="font-medium text-gray-800">1</span>
      </div>

      <div className="flex justify-between mb-2">
        <span className="text-gray-700">Price:</span>
        <span className="font-medium text-gray-800">₹ 1299</span>
      </div>

      <div className="flex justify-between border-t pt-3 mt-3">
        <span className="font-semibold text-gray-800">Total:</span>
        <span className="font-semibold text-gray-800">₹ 1299</span>
      </div>
    </div>

    {/* Continue Shopping Button */}
    <a
      href="/"
      className="inline-block w-full bg-emerald-600 text-white py-3 rounded-xl font-semibold text-lg hover:bg-emerald-700 transition duration-200"
    >
      Continue Shopping
    </a>
  </div>
</div>

  
  
  </> );
}

export default OrderConfirm;