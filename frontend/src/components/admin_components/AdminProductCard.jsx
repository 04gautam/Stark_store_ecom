import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";



const AdminProductCard = ({ products }) =>{

  // const [products, setProducts] = useState([]);
const [product, setProduct] = useState([])

  const deleteItem = async (item) => {

    try {
      // console.log(item);
    //   const res = await axios.post('https://stark-store-ecom.vercel.app/api/food/cart', 
      const res = await axios.post('https://stark-store-ecom.vercel.app/api/food/delete/product', 
      // const res = await axios.post('http://localhost:5000/api/food/delete/product', 
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
      // console.log(res);

    } 
    catch (error) {
      console.error(error);
    }
  };


  return ( <>


   <div className="w-full flex justify-center py-4 px-4">
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
              <p className="text-sm text-gray-700">{item.description.slice(0, 45)}</p>

              <h3 className="text-lg font-bold mt-2">
                ₹ {item.price}
              </h3>
            </div>
            </Link>
            {/* Buttons */}
            <div className="px-4 pb-4 flex justify-between gap-3">
              <button onClick={()=>deleteItem(item._id)} className="w-1/2 bg-black text-white py-2 rounded-xl hover:bg-gray-800 duration-200">
                Delete Item
              </button>



<Link className="w-1/2 bg-white border text-center border-black py-2 rounded-xl hover:bg-gray-200 duration-200" to={`/product/${item._id}`} >
              <button >
                Edit Item
              </button>
</Link>
            </div>

          </div>
                
         
        ))}

      </div>

    </div>
    
  


  </> );
}

export default AdminProductCard;