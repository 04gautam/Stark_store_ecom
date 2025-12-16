import './App.css'
import Register from './pages/UserRegister'
import { createContext } from 'react'
import { BrowserRouter, Routes , Route} from 'react-router-dom'
import Login from './pages/UserLogin'
import HomeProducts from './components/HomeProducts'
import CareateProduct from './pages/CreateProduct'
import SingleProduct from './components/SingleProduct'
import BuyItem from './components/BuyItem'
import axios from "axios";
import OrderConfirm from './components/OrderConfirm' 
import Navbar from './components/Navbar'
import { useEffect, useState } from "react";
import OrderdProduct from './components/OrderdProduct'
import Cart from './components/Cart'
import Payment from './components/Payment'

  export const productContext = createContext();

function App() {
     const [products, setProducts] = useState([]);

  useEffect(() => { 

    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/food/products');  
        
      setProducts(response.data.products);
      // console.log(response.data.products);

    } catch (error) {
      console.error('Error fetching products:', error);
    } 
    };

    fetchProducts();
  },[]);


  return (
    <>

    <productContext.Provider value={{products:products, setProducts}}>

  <BrowserRouter>
  
      <Routes>
        <Route path='/' element={<HomeProducts />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create" element={<CareateProduct />} />
        <Route path="/order/confirm" element={<OrderConfirm />} />
        <Route path="/buy/:id" element={<> <Navbar /> <BuyItem /></>} />
        <Route path="/product/:id" element={<SingleProduct />} />
        <Route path="/orderd/product" element={<OrderdProduct />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>

  </BrowserRouter>

  </productContext.Provider>


    </>
  )
}

export default App
