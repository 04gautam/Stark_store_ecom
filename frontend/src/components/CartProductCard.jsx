import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";



const CartProductCard = ({ products }) =>{

  // const [products, setProducts] = useState([]);

 const [createMsg, setCreateMsg] = useState("")

  const deleteItem = async (item)=>{
    // console.log(item)

    // const res = await  axios.get(`http://localhost:5000/api/food/delete/cart?q=${item}`,{
    //     headers: {
    //       'Content-Type': 'application/json'
    //     },
    //     withCredentials: true
    //   })

       axios.get(
      `https://stark-store-ecom.vercel.app/api/food/delete/cart?q=${item}`
      // `http://localhost:5000/api/food/delete/cart?q=${item}`
  //  "http://localhost:5000/api/food/products?q=" + query
    ).then((res) => {
      // console.log(res);

      setCreateMsg(<div className="fixed top-8 left-1/2 transform -translate-x-1/2 z-50 animate-slide-down">
      <div className="bg-linear-to-r from-red-600 to-red-700 text-white px-8 py-5 rounded-2xl shadow-2xl flex items-center gap-4 min-w-80">
        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
        </svg>
        <div>
          <h3 className="text-xl font-bold">Success!</h3>
          <p className="text-sm opacity-90">Item deleted</p>
        </div>
        <button className="ml-auto text-white hover:text-gray-200">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>);

        setTimeout(() => {
          setCreateMsg("");
        }, 3000);

    });

      // console.log(res)


  }


  return ( <>


   <div className="w-full flex justify-center py-10 px-4">
      {createMsg}
      <div className="grid 
        grid-cols-1 
        sm:grid-cols-2 
        md:grid-cols-3 
        lg:grid-cols-4
       
        gap-8 
        w-full max-w-7xl">

        {products.map((item, index) => (
          
          
          <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl 
              duration-300 flex flex-col">

            {/* Product Image */}
            <Link to={`/product/${item._id}`} >
            <div className="overflow-hidden">
              <img
                src={item.photo}
                alt={item.name}
                className="w-full h-60 object-cover transform hover:scale-110 duration-300"
              />
            </div>
            </Link>
            {/* Product Details */}
            <div className="p-4 text-black flex flex-col gap-2">
              <h2 className="text-xl font-semibold">{item.name}</h2>
              <p className="text-sm text-gray-700">{item.description.slice(0, 45)}</p>

              <h3 className="text-lg font-bold mt-2">
                ₹ {item.price}
              </h3>
            </div>

            {/* Buttons */}
            <div className="px-4 pb-4 flex justify-between gap-3">
              <button onClick={()=>deleteItem(item._id)} className="w-1/2 bg-red-800 text-white py-2 rounded-xl hover:bg-red-700 duration-200">
               Delete Item
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

export default CartProductCard;