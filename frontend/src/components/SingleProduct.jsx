import axios from "axios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbark from "./Navbar";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";
// import HomeProducts from "./HomeProducts";
// import { addInCart } from "../../../backend/src/controllers/food.controller";
// import { productContext } from "../App";
function SingleProduct() {

    const navigate = useNavigate();
    

  const [product, setProduct] = useState({});
    // const { products } = useContext(productContext);
    const { id } = useParams();
    // console.log(id);
    

    useEffect(() => {
     axios.post(
    `https://stark-store-ecom.vercel.app/api/food/single/${id}`,
    {}, // body should be empty
    {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
  .then(response => {
   
    setProduct(response.data.product);

  })
  .catch(error => {
      
//    console.log(error)
    if(error){
      navigate("/login");
    }

  });


  
}, [id]);

  

const addInCart = async () => {

    // console.log(product._id);
    try {
      const res = await axios.post('https://stark-store-ecom.vercel.app/api/food/cart', 
      {
        productId: product._id,
    
      },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        }, 
      }
      );
    //   console.log(res.data);

        

    } catch (error) {
      console.error(error);
    }
  };


  return ( <>
  <Navbark />
    <div className="px-6 md:px-16 lg:px-32 pt-20 space-y-10 my-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                <div className="px-5 lg:px-16 xl:px-20">
                    <div className="rounded-lg overflow-hidden bg-gray-500/10 mb-4">
                        <img
                            src={product.photo}
                            alt="alt"
                            className="w-full h-auto object-cover mix-blend-multiply transform hover:scale-120 duration-300"
                            width={1280}
                            height={720}
                        />
                    </div>

                    {/* <div className="grid grid-cols-4 gap-4">
                        {productData.img.map((img, index) => (
                            <div
                                key={index}
                                onClick={() => setMainimg(img)}
                                className="cursor-pointer rounded-lg overflow-hidden bg-gray-500/10"
                            >
                                <img
                                    src={img}
                                    alt="alt"
                                    className="w-full h-auto object-cover mix-blend-multiply"
                                    width={1280}
                                    height={720}
                                />
                            </div>

                        ))}
                    </div> */}
                </div>

                <div className="flex flex-col">
                    <h1 className="text-3xl font-medium text-gray-800/90 mb-4">
                        {product.name}
                    </h1>
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
                    <p className="text-gray-600 mt-3">
                        {product.description}
                    </p>
                    <p className="text-3xl font-medium mt-6">
                        {/* ${product.offerPrice} */}
                        {/* 455 */}
                           ₹  {product.price}
                        <span className="text-base font-normal text-green-800/90  ml-2">
                        20% OFF
                        </span>
                    </p>
                    <hr className="bg-gray-600 my-6" />
                    <div className="overflow-x-auto">
                        <table className="table-auto border-collapse w-full max-w-72">
                            <tbody>
                                <tr>
                                    <td className="text-gray-600 font-medium">Brand</td>
                                    <td className="text-gray-800/50 ">Generic</td>
                                </tr>
                                <tr>
                                    <td className="text-gray-600 font-medium">Color</td>
                                    <td className="text-gray-800/50 ">Multi</td>
                                </tr>
                                <tr>
                                    <td className="text-gray-600 font-medium">Category</td>
                                    <td className="text-gray-800/50">
                                        {/* {productData.category} */}
                                        Food
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                   
                       <div className="flex items-center mt-10 gap-4">
                        
                        
                        <button onClick={addInCart} className="w-full py-3.5 bg-black rounded-2xl text-white hover:bg-gray-800 transition">
                           Add to Cart
                        </button>
                      
                        <button  className="w-full py-3.5 bg-orange-500 rounded-2xl text-white hover:bg-orange-600 transition">
                           <Link to={`/buy/${product._id}`}> Buy now</Link>
                        </button>
                    </div>


                </div>
            </div>
            {/* <div className="flex flex-col items-center">
                <div className="flex flex-col items-center mb-4 mt-16">
                    <p className="text-3xl font-medium">Featured <span className="font-medium text-orange-600">Products</span></p>
                    <div className="w-28 h-0.5 bg-orange-600 mt-2"></div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-6 pb-14 w-full">
                    {product.slice(0, 5).map((product, index) => <ProductCard key={index} product={product} />)}
                </div>
                <button className="px-8 py-2 mb-16 border rounded text-gray-500/70 hover:bg-slate-50/90 transition">
                    See more
                </button>
            </div> */}
        </div>

      
  
  </> );


}

export default SingleProduct;