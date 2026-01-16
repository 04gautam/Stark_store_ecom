import axios from "axios";
import { useEffect, useState } from "react";

function Cart() {

  const [cart, setCart] = useState([])

// console.log(cart)

  useEffect(() => {

    const res = axios.get('http://localhost:5000/api/food/show/', {
      
     
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
     
    }).then(response => {
      setCart(response.data.cartItems);
    });

  }, []);

  // console.log(cart);

  
  return ( <>
  
   <div className="w-full flex justify-center py-10 px-4">
      <div className="grid 
        grid-cols-1 
        sm:grid-cols-2 
        md:grid-cols-3 
        lg:grid-cols-4
       
        gap-8 
        w-full max-w-7xl">
      {/* <Navbark /> */}


      {cart.map((item, index)=>(

        <div 
            key={index}
            className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl 
              duration-300 flex flex-col">

            {/* Product Image */}
            <div className="overflow-hidden">
              <img
                src={item.cartProduct.photo}
                alt={item.name}
                className="w-full h-60 object-cover transform hover:scale-110 duration-300"
              />
            </div>

            {/* Product Details */}
            <div className="p-4 text-black flex flex-col gap-2">
              <h2 className="text-xl font-semibold">{item.cartProduct.name}</h2>
              <p className="text-sm text-gray-700">{item.cartProduct.description}</p>

              <h3 className="text-lg font-bold mt-2">
                ₹ {item.cartProduct.price}
              </h3>
            </div>

            {/* Buttons */}
            <div className="px-4 pb-4 flex justify-between gap-3">
              <button className="w-1/2 bg-black text-white py-2 rounded-xl hover:bg-gray-800 duration-200">
                Add to Cart 
              </button>

              <button className="w-1/2 bg-white border border-black py-2 rounded-xl hover:bg-gray-200 duration-200">
                Buy Now
              </button>
            </div>

          </div>
       
      ))}
     
    </div>  
    </div>  

  
  </> );
}

export default Cart;