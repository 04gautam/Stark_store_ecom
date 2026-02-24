import { useState, useEffect } from "react";
// import ProductCard from "../ProductCard";
import axios from "axios";
import AdminProductCard from "./AdminProductCard";
import AdminNavbar from "./AdminNavbar";


const AdminPanel = () =>{

  const [product, setProduct] = useState([]);
  // const [searchProduct, setSearchProduct] = useState([]);

  // const navigate = useNavigate();


    // useEffect(() => {
    //   setSearchProduct(results);
      
    // }, [results] );

      



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

    }, [ setProduct, product]);

  return ( <>

    

      
      <div className="pt-20">
       
  
    {/* <ProductCard products={searchProduct} /> */}
  <AdminNavbar />

    <AdminProductCard products={product} />
    {/* <Footer /> */}

    </div>



  </> );
}

export default AdminPanel;