import axios from "axios";
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import Navbar from "./Navbar";
import Footer from "./Footer";
import HeaderSlider from "./HeaderSlider";
import SingleProduct from "./SingleProduct";
import { useNavigate } from "react-router-dom";
const HomeProducts = () =>{

  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

useEffect(() => {

    
        axios.get('http://localhost:5000/api/food/products',{
        // headers: {
        //   'Content-Type': 'application/json'
        // },
        withCredentials: true
      }).then(response => { 

        setProducts(response.data.products);
        // console.log(response.data.products);
      } ).catch(error => {
        console.error('Error fetching products:', error);
        if(error){
        return navigate("/login");
      } 

      });
      
    }, []);
    

  return ( <>

    
     <Navbar cartCount={2} />
      
      <div className="pt-10">
        <HeaderSlider />
    
    <ProductCard products={products} />
    <Footer />

    </div>



  </> );
}

export default HomeProducts;