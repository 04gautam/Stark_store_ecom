import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";



const ProductCard = ({ products }) =>{

  // const [products, setProducts] = useState([]);
 const [createMsg, setCreateMsg] = useState("")


  const addInCart = async (item) => {

    // console.log(item);
    try {
      const res = await axios.post('https://stark-store-ecom.vercel.app/api/food/cart', 
      // const res = await axios.post('http://localhost:5000/api/food/cart', 
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
      // console.log(res.data);

      setCreateMsg(<div className="fixed top-8 left-1/2 transform -translate-x-1/2 z-50 animate-slide-down">
      <div className="bg-linear-to-r from-green-600 to-emerald-600 text-white px-8 py-5 rounded-2xl shadow-2xl flex items-center gap-4 min-w-80">
        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
        </svg>
        <div>
          <h3 className="text-xl font-bold">Success!</h3>
          <p className="text-sm opacity-90">Item added to cart</p>
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

    } 
    catch (error) {
      console.error(error);
    }
  };


  return ( <>


   <div className="w-full flex justify-center py-4 px-4">
    {createMsg}
      <div className="grid 
        grid-cols-1 
        sm:grid-cols-2 
        md:grid-cols-3 
        lg:grid-cols-4
       
        gap-8 
        w-full max-w-7xl">

        {products.map((item, index) => (
          <div 
            key={index}
            className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl 
            duration-300 flex flex-col">
                <Link to={`/product/${item._id}`} >

            {/* Product Image */}
            <div className="overflow-hidden">
              <img
                src={item.photo}
                alt={item.name}
                className="w-full h-60 object-cover transform hover:scale-110 duration-300"
                />

            </div>
            {/* Product Details */}
            <div className="p-4 text-black flex flex-col gap-2">
              <h2 className="text-xl font-semibold">{item.name}</h2>

  <div className="flex items-center gap-2">
                        <div className="flex items-center gap-0.5">
                            <img className="h-4 w-4" src="https://cdn-icons-png.flaticon.com/512/2107/2107957.png" alt="star_icon" />
                            <img className="h-4 w-4" src="https://cdn-icons-png.flaticon.com/512/2107/2107957.png" alt="star_icon" />
                            <img className="h-4 w-4" src="https://cdn-icons-png.flaticon.com/512/2107/2107957.png" alt="star_icon" />
                            <img className="h-4 w-4" src="https://cdn-icons-png.flaticon.com/512/2107/2107957.png" alt="star_icon" />
                            <img
                                className="h-4 w-4"
                                src="https://cdn-icons-png.flaticon.com/512/2107/2107737.png"
                                alt="star_dull_icon"
                            />
                        </div>
                        <p>(4.5)</p>
                    </div>


              <p className="text-sm text-gray-700">{item.description.slice(0, 45)}</p>

              <h3 className="text-lg font-bold mt-2">
                ₹ {item.price}
                <span className="text-base font-normal text-green-800/90  ml-2">20% OFF</span>
              </h3>



            </div>
            </Link>
            {/* Buttons */}
            <div className="px-4 pb-4 flex justify-between gap-3 ">
              <button onClick={()=>addInCart(item._id)} className="w-1/2 bg-black cursor-pointer text-white py-2 rounded-xl hover:bg-gray-800 duration-200">
                Add to Cart 
              </button>



         <Link className="w-1/2 bg-white border text-center border-black py-2 rounded-xl hover:bg-gray-200 duration-200" to={`/product/${item._id}`} >
              <button className="cursor-pointer">
                Buy Now
              </button>
          </Link>
            </div>

          </div>
                
         
        ))}

      </div>

    </div>
    
  


  </> );
}

export default ProductCard;