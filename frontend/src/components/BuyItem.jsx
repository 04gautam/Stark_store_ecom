import React, { useState } from "react";
import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { productContext } from "../App";
import axios from "axios";
import PayButton from "./Payment";
import Navbar from "./Navbar";
import Footer from "./Footer";

const ShippingPage = () => {

  const navigate = useNavigate();  

    const [product, setProduct] = useState({});
    const [fill, setFill] = useState("");
    const [loading, setLoading] = useState(false);

const alertMsg = () =>{

  setFill("Please fill in all required fields")

  setTimeout(()=>{
      setFill("")
  },6000)


}

  // console.log(fill);

    // const { products } = useContext(productContext);
    const { id } = useParams();
    
 

    useEffect(() => {
      // axios.post(`http://localhost:5000/api/food/single/${id}`, 
      axios.post(`https://stark-store-ecom.vercel.app/api/food/single/${id}`,  
        {}, // body should be empty
    {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    }).then(response => {
        // const matchedProduct = response.data.products.find((item) => item._id === id);
       
          setProduct(response.data.product);
        
        })
        .catch(error => {
         
            // console.error('Error fetching products:', error);
            if(error){
            return navigate("/login");
          }
            
        });
    },[]);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });

  

  const handleChange = (e) => {
   
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const placeOrder = async () => {

    // console.log("let see")
  //   // console.log((form.address).length);

  setLoading(true);

    if (
      !form.fullName || !form.email || !form.phone || !form.address || !form.city || !form.pincode
    ) {
      setFill("Please fill in all required fields.");
      setLoading(false);
      return;
    }


    const res = await axios.post("https://stark-store-ecom.vercel.app/api/food/ship/" + product._id, {
    // const res = await axios.post("http://localhost:5000/api/food/ship/" + product._id, {
      productId: product._id,
      ...form,  
    },
    {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    }
  
  )

    if (res.status === 200) {
      // alert("Order placed successfully!");
      return navigate("/order/confirm");
    }
  
    
    
    
  };

  if (!product)
    return <h2 className="text-center mt-20 text-black">No product found</h2>;

  return (<>
    <Navbar />
    <div className="items-center bg-black/20 py-20 lg:mt-6 px-4 min-w-full flex justify-center">

      {/* Glassmorphism Container */}
      <div className="
        w-full max-w-4xl bg-white shadow-lg backdrop-blur-md border border-white/30
        rounded-3xl p-8  space-y-10
      ">

        {/* Title */}
        <h1 className="text-3xl text-black font-bold text-center tracking-wide">
          Shipping Details
        </h1>

        {/* Sections */}
        <div className="flex flex-col lg:flex-row gap-10">

          {/* Left - User Form */}
          <div className="w-full lg:w-2/3 space-y-5 bg-white/20 border border-white/20 p-5 rounded-2xl ">

            <input
              type="text"
              name="fullName"
              required
              placeholder="Full Name"
              className="w-full p-3 rounded-xl ring ring-gray-300 bg-white/20 text-black placeholder-gray-600 outline-none"
              onChange={handleChange}
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full p-3 rounded-xl ring ring-gray-300 bg-white/20 text-black placeholder-gray-600 outline-none"
              onChange={handleChange}
              required={true}
            />

            <input
              type="text"
              name="phone"
              required={true}
              placeholder="Phone Number"
              className="w-full p-3 rounded-xl ring ring-gray-300 bg-white/20 text-black placeholder-gray-600 outline-none"
              onChange={handleChange}
            />

            <textarea
              name="address"
              rows="3"
              placeholder="Full Address"
              required={true}
              className="w-full p-3 rounded-xl ring ring-gray-300 bg-white/20 text-black placeholder-gray-600 outline-none"
              onChange={handleChange}
            ></textarea>

            <input
              type="text"
              name="city"
              placeholder="City"
              required={true}
              className="w-full p-3 rounded-xl ring ring-gray-300 bg-white/20 text-black placeholder-gray-600 outline-none"
              onChange={handleChange}
            />

            <input
              type="text"
              name="pincode"
              placeholder="Pincode"
              required={true}
              className="w-full p-3 rounded-xl ring ring-gray-300 bg-white/20 text-black placeholder-gray-600 outline-none"
              onChange={handleChange}
            />
          </div>

          {/* Right - Product Info */}
          <div className="
            w-full lg:w-1/3 bg-white/10 border border-white/20
            p-5 rounded-2xl shadow-xl space-y-4
          ">

            <h2 className="text-xl text-black font-semibold">Order Summary</h2>

            <img
              src={product.photo}
              className="w-full h-40 object-cover rounded-xl shadow-lg"
            />

            <p className="text-black font-semibold">{product.name}</p>

            <p className="text-gray-600 text-sm leading-relaxed">
              {product.description}
            </p>

            <p className="text-green-400 text-xl font-bold">
              ₹ {product.price}
            </p>

            {/* Total */}
            <div className="pt-3 border-t border-white/20">
              <p className="text-black text-lg">
                <span className="font-semibold">Total:</span> ₹ {product.price}
              </p>
            </div>
          </div>

        </div>

        {/* Place Order Button */}
        <div className="flex flex-col items-center gap-4 mt-6">

  <h2 className="text-lg font-semibold text-gray-700">
    Choose Payment Method
  </h2>

    { fill && 
<div className="text-red-600 mt-2">
  {fill}
  </div>
} 

  <div className="flex flex-col md:flex-row gap-4">

    {/* Cash on Delivery */}
    <button
      onClick={placeOrder}
      className="
        bg-orange-600 text-white px-8 py-3 rounded-xl font-semibold text-lg
        transition-all duration-200 hover:bg-orange-500
      "
    >
      {/* Cash on Delivery */}
     {loading ? "Placing your order..." : "Cash on Delivery"}
    </button>

    {/* Online Payment */}
    {form.fullName &&
     form.email &&
     form.phone &&
     form.address &&
     form.city &&
     form.pincode && (
      <PayButton 
        amount={product.price}
        ispaid={true}
        formData={form}
        productId={product._id}
      />
      
    )}

    {!form.fullName &&
     !form.email &&
     !form.phone &&
     !form.address &&
     !form.city &&
     !form.pincode && (
      <button
  onClick={alertMsg}
  className="
    bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold text-lg
    transition-all duration-200 hover:bg-blue-500
  "
>
  Pay with Razorpay
</button>

    )}
{/* { fill && 
<div className="text-red-600 mt-2">
  {fill}
  </div>
} */}
</div>

</div>


        

      </div>
    </div>
  <Footer />
    </>
  );
};

export default ShippingPage;
