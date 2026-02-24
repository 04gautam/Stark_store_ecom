import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, NavLink } from "react-router-dom";

// import { Link } from 'react-router-dom';



function AdminAllOrders() {
  const [orders, setOrders] = useState([]);



  
  useEffect(() => {
   
 try {      
       axios.get('https://stark-store-ecom.vercel.app/api/food/orders', {
      //  axios.get('http://localhost:5000/api/food/orders', {
        withCredentials: true
      }).then(response => {
        setOrders(response.data.data);
        // console.log(response);
      }).catch(error => {
        console.error('Error fetching orders:', error);
      });
      
        // setOrders(res.data.orders);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }


  }, []);

// console.log(orders);

  return ( <>
  {/* <Navbar /> */}

  <div className="min-h-screen bg-gray-100 p-6 ">
  <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">   
      Your Orders ADMIN  </h1>
   <div className="max-w-4xl mx-auto space-y-6">

    {/* ----- Single Order Card ----- */}
{ orders.length === 0 && (

  <div className="flex flex-col items-center justify-center space-y-4">
    <h2 className="text-center ring mt-20 text-black">No orders found</h2>
    
    <Link to="/" className="text-blue-500 underline" >Browse Products</Link>

  </div>
 
) }
    {orders.reverse().map((order, index) => (

    

  <div key={index} className="max-w-6xl mx-auto space-y-6">

    {/* ===== Single Order Card ===== */}
    <div className="bg-white rounded-2xl shadow-md border p-6">
      
      {/* Order Header */}
      <div className="flex flex-wrap justify-between items-center mb-4 gap-3">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">
            Order ID: <span className="text-indigo-600">{order._id}</span>
          </h2>
          <p className="text-sm text-gray-500">
          Created At: {new Date(order.createdAt).toLocaleDateString('en-IN', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
              
            })}
          </p>
        </div>

        <span >
          {order.ispaid ? <div className='bg-green-300 px-4 py-1 rounded-full text-sm font-medium text-green-700'>Paid</div> :
           <div className="text-red-500 bg-red-200 px-4 py-1 rounded-full text-sm font-medium" >Pending Payment</div> }
        </span>
      </div>

      {/* User & Address Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <h3 className="font-semibold text-gray-800 mb-2">
            User Details
          </h3>
          <p className="text-gray-700">Name: <span className="font-medium">{order.name}</span></p>
          <p className="text-gray-700">Email: <span className="font-medium">{order.email}</span></p>
          <p className="text-gray-700">Phone: <span className="font-medium">{order.phone}</span></p>
        </div>

        <div>
          <h3 className="font-semibold text-gray-800 mb-2">
            Shipping Address
          </h3>
          <p className="text-gray-700">
            {order.address}, {order.state}
          </p>
          <p className="text-gray-700">
            City: {order.city}
          </p>
          <p className="text-gray-700">
            Pincode: {order.pincode}
          </p>
        </div>
      </div>

      {/* Product Info */}

        {order.product ? (
              
        <div className="border rounded-xl p-4 bg-gray-50 flex flex-col sm:flex-row gap-4 items-center">
        <img
          src={order.product?.photo}
          alt="product"
          className="w-24 h-24 rounded-lg object-cover border"
        />

        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-800">
            {order.product?.name}
          </h3>
          <p className="text-gray-600 text-sm mb-1">
            {order.product?.description}
          </p>
          <p className="text-gray-800 font-semibold">
            Price: ₹{order.product?.price}
          </p>
        </div>
         </div>

            ): <p className="text-gray-600 text-sm bg-red-200 p-2 rounded-xl">Product details not available</p>}

  

    </div>  
    {/* ===== End Order Card ===== */}

  </div>

  
    ))}

  </div>
</div>

  </> );
}

export default AdminAllOrders;

