import axios from "axios";
import { useEffect, useState } from "react";
// import ProductCard from "./ProductCard";
import CartProductCard from "./CartProductCard";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar"

function Cart() {

  const [cart, setCart] = useState([])

// console.log(cart)
try {
  const navigate = useNavigate();
  useEffect(() => {

    const res = axios.get('https://stark-store-ecom.vercel.app/api/food/show/cart', {
    // const res = axios.get('http://localhost:5000/api/food/show/cart', {
      
     
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
     
    }).then(response => {
      // setCart(response.data.cartItems);

      response.data.cartItems.map((ele)=>{
        // console.log(ele.cartProduct)
        setCart(prevCart => [...prevCart, ele.cartProduct])
      })


    }).catch(error => {
      console.error('Error fetching cart items:', error); 
     

    });
// console.log(cart)
  }, []); 
} catch (error) {
  console.error('Error fetching cart items:', error);

}



  // console.log(cart);

  
  return ( <>
  <Navbar ></Navbar>
  <div className="mt-24">
    {cart.length !=0 ? 
<h2 className="text-3xl font-bold text-center text-black">Your Cart</h2>
 :<div></div>}
       

  {cart.length === 0 ? (
    <div className="flex items-center justify-center min-h-[80vh] bg-gray-50 px-4">
  <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full text-center">
    
    <img
      src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
      alt="Empty Cart"
      className="w-28 mx-auto mb-6 opacity-80"
    />

    <h2 className="text-2xl font-semibold text-gray-800 mb-2">
      Your Cart is Empty
    </h2>

    <p className="text-gray-500 mb-6">
      Looks like you haven not added anything to your cart yet.
    </p>

    <Link
      to="/"
      className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
    >
      Continue Shopping
    </Link>

  </div>
</div>

  ) : (
    <div className="cart-container">
     <CartProductCard products={cart} />
    </div>
  )}

  </div>
         


     
   

  
  </> );
}

export default Cart;