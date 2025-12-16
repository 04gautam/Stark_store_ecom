import axios from "axios";
import { createContext, useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import Navbar from "./Navbar";
import Footer from "./Footer";
import HeaderSlider from "./HeaderSlider";
import SingleProduct from "./SingleProduct";
import { useNavigate } from "react-router-dom";

export const showProductContext = createContext();


const HomeProducts = () =>{

  const [product, setProduct] = useState([]);
  // const [searchProduct, setSearchProduct] = useState([]);
  const navigate = useNavigate();


  //I have to make here context here and have to put navbar in side context

useEffect(() => {

    
        axios.get('http://localhost:5000/api/food/products',{
        // headers: {
        //   'Content-Type': 'application/json'
        // },
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
      
    }, []);
    

  return ( <>

     {/* <showProductContext.Provider value={{ product,setSearchProduct}}> */}
      
     <Navbar cartCount={2} />

     {/* </showProductContext.Provider> */}

      
      <div className="pt-10">
        <HeaderSlider />
  

    <ProductCard products={product} />
    <Footer />

    </div>



  </> );
}

export default HomeProducts;






// import axios from "axios";
// import { useEffect, useState, useContext } from "react";
// import ProductCard from "./ProductCard";
// import Navbar from "./Navbar";
// import Footer from "./Footer";
// import HeaderSlider from "./HeaderSlider";
// import { useNavigate } from "react-router-dom";
// import { productContext } from "../App";

// const HomeProducts = () => {

//   const [products, setProducts] = useState([]);
//   const { search } = useContext(productContext);        // 🔥 GET SEARCH TEXT HERE

//   const navigate = useNavigate();

//   useEffect(() => {
//     axios
//       .get("http://localhost:5000/api/food/products", {
//         withCredentials: true,
//       })
//       .then((response) => {
//         setProducts(response.data.products);
//       })
//       .catch((error) => {
//         console.error("Error fetching products:", error);
//         if (error) {
//           return navigate("/login");
//         }
//       });
//   }, []);

//   // 🔥 FILTER PRODUCTS BASED ON SEARCH
//   const filteredProducts = products.filter((p) =>
//     p.name.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <>
//       <Navbar cartCount={2} />

//       <div className="pt-10">
//         <HeaderSlider />

//         {/* 🔥 Send filtered products to ProductCard */}
//         <ProductCard products={filteredProducts} />

//         <Footer />
//       </div>
//     </>
//   );
// };

// export default HomeProducts;
