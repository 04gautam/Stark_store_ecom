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
import AdminRegister from './components/admin_components/AdminRegister'
import AdminLogin from '../src/components/admin_components/AdminLogin'
import AllOrders from './components/admin_components/AdminAllOrders'
import AdminPanel from './components/admin_components/AdminPanel'
import AdminNavbar from './components/admin_components/AdminNavbar'
import Error404Page from './pages/Error404page'
  export const productContext = createContext();

function App() {
     const [products, setProducts] = useState([]);
     const [results, setResults] = useState([]);


  useEffect(() => { 

    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://stark-store-ecom.vercel.app/api/food/products');  
        // const response = await axios.get('http://localhost:5000/api/food/products');  
        
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

    {/* <productContext.Provider value={{products:products, setProducts}}> */}
  <BrowserRouter>
 
  
          {/* <Navbar setResults={setResults}/> */}
         
      <Routes>
        <Route path='/' element={<>
        <div>
        <Navbar setResults={setResults}/>
        <HomeProducts results={results}/>
        </div>
        </>} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/order/confirm" element={<OrderConfirm />} />
        <Route path="/buy/:id" element={<><BuyItem /></>} />
        <Route path="/product/:id" element={<SingleProduct />} />
        <Route path="/orderd/product" element={<OrderdProduct />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/cart" element={<Cart />} />

        {/* <Route path="/:error" element={<Error404Page />} />
        <Route path="/:error/:error" element={<Error404Page />} /> */}


        <Route path="/admin/register" element={<AdminRegister />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/create" element={<CareateProduct />} />
        <Route path="/admin/allorders" element={<AllOrders />} />
        <Route path="/admin/panel" element={<>
        <div>
        {/* <AdminNavbar /> */}
        <AdminPanel />
        </div>
        </>} />
         <Route path="*" element={<Error404Page />} />
      </Routes>

  </BrowserRouter>

  {/* </productContext.Provider> */}


    </>
  )
}

export default App
