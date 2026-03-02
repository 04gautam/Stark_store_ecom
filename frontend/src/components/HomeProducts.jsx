import axios from "axios";
import { createContext, useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import Navbar from "./Navbar";
import Footer from "./Footer";
import HeaderSlider from "./HeaderSlider";
import SingleProduct from "./SingleProduct";
import { Link, useNavigate } from "react-router-dom";

export const showProductContext = createContext();


const HomeProducts = ({results}) =>{

  const [product, setProduct] = useState([]);
  const [searchProduct, setSearchProduct] = useState([]);
  const navigate = useNavigate();


    useEffect(() => {
      setSearchProduct(results);
      
    }, [results] );

      



// console.log(results);
  //I have to make here context here and have to put navbar in side context

useEffect(() => {

    
        axios.get('https://stark-store-ecom.vercel.app/api/food/products',{
        // axios.get('http://localhost:5000/api/food/products',{
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      }).then(response => { 

        setProduct(response.data.products);
        // console.log(response.data.products);
      } ).catch(error => {
        console.error('Error fetching products:', error);
        if(error){
        return navigate("/login");
      } 

      });
      

      

    }, [  navigate, setProduct, product]);
  
    

   

  return ( <>

     {/* <showProductContext.Provider value={{ product,setSearchProduct}}> */}
      
     {/* <Navbar cartCount={2} /> */}

     {/* </showProductContext.Provider> */}

      
      <div className="pt-10">
        <HeaderSlider />
  
    <ProductCard products={searchProduct} />
   {/* <ProductCard products={product} /> */}

{/* <Link to="/products" className="flex justify-center mt-10">
<div className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-colors duration-200">
  View All Products
</div>
</Link> */}
<section id="showproducts" className="mt-10">
    <ProductCard products={product} />
  
</section>
    <Footer />

    </div>



  </> );
}

export default HomeProducts;

