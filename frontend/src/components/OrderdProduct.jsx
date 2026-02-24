// import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import { Image } from 'cloudinary-react';
import Navbar from "./Navbar"

function OrderdProduct() {

  const [orders, setOrders] = useState([]);

  const navigate = useNavigate()




  const response = async () => {
   
      const res = await axios.get('https://stark-store-ecom.vercel.app/api/food/orderd/product', {
      // const res = await axios.get('http://localhost:5000/api/food/orderd/product', {
        withCredentials: true
      });
      setOrders(res.data.orders);
      // console.log(res.data.orders)
      // console.log(res.data.orders[0].product.photo)
   
  };

 useEffect(() => {
    response();
  
  }, []);

  return ( <>
  <Navbar />
 <div className="min-h-screen bg-gray-100 p-6 mt-20">
  <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
    Your Orders
  </h1>

  <div className="max-w-4xl mx-auto space-y-6">

    {/* ----- Single Order Card ----- */}
{ orders.length === 0 && (
  <>
  <div>
    <h2 className="text-center ring mt-20 text-black">No orders found</h2>
    
    <Link to="/" className="text-blue-500 underline" >Browse Products</Link>

  </div>
  </>
) }
    {orders.reverse().map((order) => (

        <div key={order._id} className="bg-white p-6 rounded-2xl shadow-md border">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">
            Order #{order._id}
        </h2>
        {/* <span className="bg-green-100 text-green-700 px-4 py-1 rounded-full text-sm font-medium">
          Delivered
        </span> */}
      </div>

      {/* Product details */}
      {order.product ? <div className="flex gap-4 items-center">
        <img
          src={order.product?.photo}
          alt="product"
          className="w-20 h-20 rounded-lg object-cover border"
        />

        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-800">
            {order.product?.name}
          </h3>
          <p className="text-gray-600 text-sm mb-1">
            Quantity: 1
          </p>

          <p className="text-gray-800 font-semibold text-lg">
          ₹ {order.product?.price}
          </p>
        </div>
      </div> : <p className="text-gray-600 text-sm bg-red-200 p-2 rounded-xl">Product details not available</p>}
      

      <div className="border-t mt-4 pt-4 flex justify-between text-sm text-gray-600">
        <p>Ordered on: <span className="font-medium">{new Date(order.updatedAt).toLocaleString()}</span></p>
        {/* <p>Payment: <span className="font-medium">Paid</span></p> */}
      </div>
    </div>
  
    ))}

  </div>
  </div> 
  
  </>
  )
}

export default OrderdProduct;