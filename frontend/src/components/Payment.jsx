import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function loadRazorpayScript() {
  return new Promise((resolve) => {
    if (document.getElementById('razorpay-sdk')) return resolve(true);
    const script = document.createElement('script');
    script.id = 'razorpay-sdk';
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export default function PayButton({ amount, formData , productId }) {

    const navigate = useNavigate();  
  const handlePay = async () => {
    const res = await loadRazorpayScript();
    if (!res) return alert('Razorpay SDK failed to load.');

    // 1) create order on backend
    const { data } = await axios.post('http://localhost:5000/api/food/order', { amount:amount },
      {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    }
    );
    const { order } = data;
    console.log(order)

    const options = {
      key: "rzp_test_Rl9K83W6eOTpP4", // publishable key (safe to expose)
      // amount: order.amount,
      amount: amount,
      // currency: order.currency,
      currency: 'INR',
      name: 'My Shop',
      description: 'Test Transaction',
      order_id: order.id,
      handler: async function (response) {
    try {
      const verifyRes = await axios.post(
        "http://localhost:5000/api/food/verify",
        {
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_order_id: response.razorpay_order_id,
          razorpay_signature: response.razorpay_signature,
        }
      );

      if (verifyRes.data.success) {
        // alert("Payment verified & successful!");

        // from here payment will be done and also verify 

//*** this all is just for test now we can call this apin to save the orders on backend
//    with needed data like product id and form data  */

         const res = await axios.post("http://localhost:5000/api/food/ship/" + productId, {
      productId: productId,
      ...formData,  
    },
    {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    }
  
  )
   
      // alert("Order placed successfully!");
      return navigate("/order/confirm");
    

      } else {
        alert("Payment verification failed");
      }
    } catch (error) {
      console.log(error);
      alert("Error verifying payment");
    }
  },
      prefill: {
        name: 'Gautam',
        email: 'you@example.com',
      },
      theme: { color: '#3c3c3c' },
    };

    // open checkout
    const rzp = new window.Razorpay(options);
    rzp.open();

    
    console.log(formData)
  };



  return(<>
  {/* <div className='min-h-screen bg-black/60  flex justify-center items-center'> */}

  <button className='bg-green-600 p-4 px-10 hover:bg-green-500 rounded m-4 ' onClick={handlePay}>Pay </button>
  {/* <button className='bg-red-600 p-4 px-10 hover:bg-red-500 rounded m-4 ' onClick={handleCheck}>Pay Test</button> */}
  {/* </div> */}
  </>)
  
}
