
import productModel from '../models/product.model.js';
import storageService from '../services/storage.service.js';
import cartModel from "../models/cart.model.js";
import saveModel from "../models/save.model.js";
import orderModel from "../models/order.model.js";
import Razorpay from "razorpay";
import { v4 as uuid } from "uuid";
import crypto from "crypto";
import nodemailer from "nodemailer";
import Groq  from "groq-sdk";
// import { is } from 'type-is';

async function createProduct(req, res) {

    // console.log("File received:", req.file.originalname);

    const file = req.file;

    // Upload file to storage service
    const fileUrl = await storageService.uploadFile(file.buffer, `${uuid()}-${file.originalname}`, file.mimetype);
    // console.log("File uploaded to:", fileUrl.url);


    const {name, description, price} = req.body;

    await productModel.create({
        name,
        photo: fileUrl.url,
        description,
        price,
    }).catch((err)=>{
        console.error("Error creating product:", err);
        return res.status(500).json({ message: "Error creating product" });
    });
        

    res.status(201).json({
        message: "product created successfully",
        
    })
}

async function getFoodItems(req, res) {
    const foodItems = await foodModel.find({})
    res.status(200).json({
        message: "Food items fetched successfully",
        foodItems
    })
}
    

async function addInCart(req, res){


// console.log("Adding to cart:", req.body);
// console.log("User:", req.user);

    const userId = req.user._id;
    const { productId } = req.body;
    // const user = req.user;

    const cartItem = await cartModel.create({
        user: userId,
        cartProduct: productId
    }).then((cartItem)=>{
        return cartItem;
    }).catch((err)=>{
        console.error("Error adding to cart:", err);
        return res.status(500).json({ message: "Error adding to cart" });
    });

    res.status(201).json({
        message: "Product added to cart successfully",
        cartItem
    });
  
}

  
 async function showCart (req, res){

    try {
        const user = req.user;  
    
    const cartItems = await cartModel.find({ user: user._id }).populate('cartProduct');

    if (!cartItems || cartItems.length === 0) {
        return res.status(404).json({ message: "No items in cart" });
    }
    // console.log(cartItems)
    res.status(200).json({
        message: "Cart items retrieved successfully",
        cartItems:cartItems
    });
    } catch (error) {
        console.error("Error showing cart:", error);
        return res.status(500).json({ message: "Error showing cart" });
    }
  
}



async function like(req, res) {
    const { foodId } = req.body;
    const user = req.user;

    const isAlreadyLiked = await likeModel.findOne({
        user: user._id,
        food: foodId
    })

    if (isAlreadyLiked) {
        await likeModel.deleteOne({
            user: user._id,
            food: foodId
        })

        await foodModel.findByIdAndUpdate(foodId, {
            $inc: { likeCount: -1 }
        })

        return res.status(200).json({
            message: "Food unliked successfully"
        })
    }

    const like = await likeModel.create({
        user: user._id,
        food: foodId
    })

    await foodModel.findByIdAndUpdate(foodId, {
        $inc: { likeCount: 1 }
    })

    res.status(201).json({
        message: "Food liked successfully",
        like
    })

}

async function saveFood(req, res) {

    const { foodId } = req.body;
    const user = req.user;

    const isAlreadySaved = await saveModel.findOne({
        user: user._id,
        food: foodId
    })

    if (isAlreadySaved) {
        await saveModel.deleteOne({
            user: user._id,
            food: foodId
        })

        await foodModel.findByIdAndUpdate(foodId, {
            $inc: { savesCount: -1 }
        })

        return res.status(200).json({
            message: "Food unsaved successfully"
        })
    }

    const save = await saveModel.create({
        user: user._id,
        food: foodId
    })

    await foodModel.findByIdAndUpdate(foodId, {
        $inc: { savesCount: 1 }
    })

    res.status(201).json({
        message: "Food saved successfully",
        save
    })

}

async function getSaveFood(req, res) {

    const user = req.user;

    const savedFoods = await saveModel.find({ user: user._id }).populate('food');

    if (!savedFoods || savedFoods.length === 0) {
        return res.status(404).json({ message: "No saved foods found" });
    }

    res.status(200).json({
        message: "Saved foods retrieved successfully",
        savedFoods
    });

}


const searchProducts = async (req, res) => {
    // let query = " "


    try {
        const query = req.query.q; // Default to empty string if 'q' is not provided  
    // console.log("Search query:", query);
    // res.send("query: ", query)

    if (!query) {

        return res.status(400).json({ message: "Query parameter 'q' is required" });
    }   

     const searchedProducts = await productModel.find({
      name: { $regex: query, $options: "i" }

    });

    // console.log("Searched products:", searchedProducts);

    res.status(200).json({
        message: "Products fetched successfully",
        products: searchedProducts
    });
    } catch (error) {
        console.error("Error searching products:", error);
        return res.status(500).json({ message: "Error searching products" });
    }

    

}

const product = async(req, res) => {
    try {

    const allProducts = await productModel.find();
   
   
      res.status(200).json({
        success: true, 
        products: allProducts
    }) 


    } catch (error) {
        console.log(error)
    }

};

const shipProduct = async (req, res)=>{
    const productId = req.params.id;
    const userId = req.user.id
    const ispaid = req.body.ispaid
    const buyerData = req.body;

    // console.log("let see is this working both of them or not: ")

    // const product = await productModel.findById(productId);  //
    const order = await orderModel.create({
        name: buyerData.fullName,
        email: buyerData.email,
        phone: buyerData.phone,
        address: buyerData.address,
        city: buyerData.city,
        pincode: buyerData.pincode,       
        user:userId,
        product:productId,
        ispaid:ispaid
    })

    // console.log("Order created: ", order)

const product = await productModel.findById(productId);

// Create a transporter
const transporter = nodemailer.createTransport({
  service: "gmail", // You can use 'hotmail', 'yahoo', or custom SMTP too
  auth: {
    user: "starktechnologies7@gmail.com", // Your Gmail address
    pass: "wvbwnkitoecnudkp",     // Use app password, not your Gmail password
    },
});
// Email options
const mailOptions = {
  from: "starktechnologies7@gmail.com",
  to: buyerData.email ,
  subject: "STARK Technologies",
  text: "Hello customer",
 
  html: ` <div style="border: 2px solid #4a4a4a; border-radius: 8px; padding: 20px; font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f9f9f9;">
    
    <div style="text-align: center; margin-bottom: 20px;">
        <h2 style="color: #2c3e50; margin: 0;">STARK ORDER CONFIRMATION</h2>
        <div style="height: 3px; background: linear-gradient(to right, #3498db, #2ecc71); margin: 10px 0;"></div>
    </div>
    
    <!-- Customer Details -->
    <div style="background-color: white; border-radius: 6px; padding: 15px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
        <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
            <span style="font-weight: bold; color: #7f8c8d;">Customer:</span>
            <span style="color: #2c3e50;">${buyerData.fullName}</span>
        </div>

        <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
            <span style="font-weight: bold; color: #7f8c8d;">Email:</span>
            <span style="color: #2c3e50;">${buyerData.email}</span>
        </div>

        <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
            <span style="font-weight: bold; color: #7f8c8d;">Phone:</span>
            <span style="color: #2c3e50;">${buyerData.phone}</span>
        </div>

        <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
            <span style="font-weight: bold; color: #7f8c8d;">Address:</span>
            <span style="color: #2c3e50;">${buyerData.address} pin: ${buyerData.pincode}</span>
        </div>

        <div style="height: 1px; background-color: #ecf0f1; margin: 15px 0;"></div>

        <!-- Product Details -->
        <h3 style="color: #34495e; margin-bottom: 10px;">Product Details</h3>

        <div style="display: flex; gap: 50px; align-items: center; margin-bottom: 15px;">
            <img src="${product.photo}" alt="Product Image" style="width: 120px; height: 120px; object-fit: cover; border-radius: 8px; border: 1px solid #ddd;">
            
            <div style="margin-left: 30px;">
                <p style="margin: 0; font-size: 16px;"><strong>Name:</strong> ${product.name}</p>
                <p style="margin: 4px 0; font-size: 16px;"><strong>Price:</strong> 
                    <span style="color: #27ae60; font-weight: bold;">${product.price}</span>
                </p>
                <p style="margin: 4px 0; font-size: 14px; color: #555;"><strong>Description:</strong> ${product.description}</p>
                <p style="margin: 4px 0; font-size: 14px; color: #555;"><strong>Product ID:</strong> ${product._id}</p>
            </div>
        </div>
    </div>

    <!-- Special Request -->
    <div style="background-color: #fff8e1; border-left: 4px solid #ffc107; padding: 12px; margin-top: 20px; border-radius: 0 4px 4px 0;">
        <h4 style="color: #ff9800; margin: 0 0 5px;">Special Request:</h4>
        <p style="margin: 0; color: #795548;">"If you want to cancel this order e-mail us with product ID"</p>
    </div>

    <!-- Footer -->
    <div style="text-align: center; margin-top: 25px; color: #7f8c8d; font-size: 12px;">
        <p>Thank you for your order! We'll process it shortly.</p>
        <p>Need help? Contact us at support@stark.com</p>
    </div>

</div>

  `,
};

    try {
  const info = await transporter.sendMail(mailOptions);

//   console.log("Email sent:", info.response);

  return res.status(200).json({
    success: true,
    message: "Order placed successfully",
  });

} catch (error) {
  console.error("Mail error:", error);

  return res.status(500).json({
    success: false,
    message: "Email sending failed",
  });
}

// transporter.sendMail(mailOptions, (error, info) => {
//   if (error) {
//     return console.log("Error:", error);
//   }
// //   console.log("Email sent:", info.response);

// if (info.response) {
// res.status(200).json({
//         success: true,
//         message: "Order placed successfully",
        
//     });  
// }
// });
// Send the email
}


const Order = async (req, res) => {


    // console.log("This route is ready to to make payment...")
    // console.log(req.body)

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

try {
    // const { currency = 'INR', receipt } = req.body;
     // amount in rupees or paise? Razorpay expects paise
    // console.log("ok let's see", req.body)

    const options = {
      amount: Math.round(req.body.amount * 100), // convert rupees → paise
      currency: "INR",
      receipt: `rcpt_${Date.now()}`,
      payment_capture: 1 // 1 = auto-capture; set 0 if you want to capture later
    };
    const order = await razorpay.orders.create(options);
    return res.json({ success: true, order });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, error: err.message });
  }
  
}

const verifyPayment = (req, res) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature
  } = req.body;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(razorpay_order_id + "|" + razorpay_payment_id)
    .digest("hex");

  if (expectedSignature === razorpay_signature) {
    return res.json({ success: true, message: "Payment verified" });
  } else {
    return res.status(400).json({ success: false, message: "Invalid signature" });
  }
};



const deleteProduct = (req, res)=>{
    const productId = req.body.productId;
    // console.log(productId)
    productModel.findByIdAndDelete(productId)
    .then((product)=>{
        res.status(200).json({
            success: true,
            message: "Product deleted successfully"
        })
    })
    .catch((err)=>{
        res.status(500).json({
            success: false,
            message: "Error deleting product"
        })
    } )

    // res.send("done")
} 


const allOrders = async (req, res) => {
  try {
    const allOrders = await orderModel.find().populate('product');
    res.status(200).json({
      data: allOrders,
      success: true,
      allOrdersCount: allOrders.length
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error fetching all orders",
      error: err.message
    });
  }
};


const deleteCartItem = async (req, res) => {
  const cartItemId = req.query.q;
//   console.log("Attempting to delete cart item with ID:", cartItemId);
//   res.send("done")
    try {

    //   const deletedItem = await cartModel.findByIdAndDelete(cartItemId);
      const deletedItem = await cartModel.findOneAndDelete({ cartProduct: cartItemId });
        res.status(200).json({
            success: true,
            message: "Cart item deleted successfully",
            deletedItem
        });

        // console.log(deletedItem)
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Error deleting cart item",
            error: err.message
        });
    }   
}

const orderdProduct = async (req, res) => {
      
    try {
         const userId = req.user._id;
    
        const orders = await orderModel.find({ user: userId }).populate('product');
    
        // console.log(orders);
    
        res.status(200).json({
            message: "Orderd products fetched successfully",
            orders
        });
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching ordered products",
            error: error.message
        }); 
    }

}


const aiChatbot = async (req, res)=>{

    try {
        
const groq = new Groq({apiKey:process.env.GROQ_API});

async function main() {
  const completion = await groq.chat.completions
    .create({
      model: "llama-3.3-70b-versatile",
      temperature: 0,
      messages: [
        {
          role: "system",
          // content: "You are a helpful AI assistant. Always format your responses in a clean, structured way. Follow these rules:\n\n1. Convert any **bold text** into proper headings or subheadings.\n2. Use numbered lists for steps or ordered items.\n3. Use bullet points for unordered items.\n4. Keep explanations concise, clear, and easy to read.\n5. Use short paragraphs instead of long blocks of text.\n\nExample format:\n\n# Main Heading\nSome introduction text.\n\n## Subheading 1\n- Point one\n- Point two\n\n## Subheading 2\n1. Step one\n2. Step two"
          content: `You are STARK.AI, the official AI shopping assistant for STARKStore, an e-commerce website. Your role is to help customers with product inquiries, order assistance, and general questions about the store.

PERSONALITY:
- Friendly, helpful, and enthusiastic about helping customers
- Professional but conversational (use emojis occasionally)
- Concise but informative - avoid overly long responses
- If you don't know something, be honest and offer to connect with human support

STORE INFORMATION:
STARKStore is your one-stop online shopping destination offering quality products across multiple categories including electronics, fashion, footwear, watches, accessories, and sports equipment.
Website: www.starkstore.com
Customer Support: support@starkstore.com
Support Hours: Monday to Saturday, 9:00 AM - 8:00 PM (IST)

SHIPPING POLICY:
- Free shipping on all orders above ₹499
- Standard delivery: 3-5 business days
- Express delivery: 1-2 business days (additional ₹99)
- Order cutoff time: 6:00 PM for next-day processing
- Customers can track orders by logging into "My Orders" section

RETURN & REFUND POLICY:
- 7-day easy return policy from date of delivery
- Items must be unused, unworn, and in original packaging
- Return shipping is free for defective/wrong items
- For change of mind, ₹50 shipping fee applies
- Refunds processed within 3-5 business days after item inspection
- Non-returnable: Innerwear, personal care, customized items, gift cards

PAYMENT METHODS:
- Credit/Debit Cards (Visa, MasterCard, RuPay)
- UPI (Google Pay, PhonePe, Paytm, BHIM)
- Net Banking (all major Indian banks)
- Wallets (Paytm, Mobikwik, Amazon Pay)
- Cash on Delivery (COD) - Available for orders under ₹10,000
- EMI Options - Available on orders above ₹3,000 with select banks

PRODUCT CATEGORIES & PRICE RANGES:

Electronics:
- Headphones & Earphones: ₹499 - ₹15,000
- Smart Watches: ₹1,999 - ₹8,000
- Bluetooth Speakers: ₹999 - ₹5,000
- Power Banks: ₹1,499 - ₹3,000
Popular brands: boAt, Noise, Boult, pTron, realme, Mi

Fashion:
- Men's/Women's Clothing: ₹299 - ₹5,000
- Accessories: ₹199 - ₹2,000
Popular brands: Levis, UCB, H&M, Roadster, HRX

Footwear:
- Sports Shoes: ₹399 - ₹8,000
- Formal Shoes: ₹599 - ₹5,000
- Sandals & Flip-flops: ₹299 - ₹2,000
Popular brands: Nike, Adidas, Puma, Campus, Bata, Woodland

COMMON QUESTIONS & RESPONSES:

When users ask about products:
"Absolutely! 🎧 Here are some popular [product type] in your budget:
[Provide 2-3 specific recommendations with prices and key features]
Would you like more details on any of these?"

When users ask for order tracking:
"I'd be happy to help you track your order! 🔍
Please provide your order number (starts with STARK-) and I'll check the status for you. You can also track it yourself by logging into your account and going to 'My Orders'."

When users ask about returns:
"I understand you'd like to return an item. Let me help you with that! 😊
Please share your order number and let me know which item(s) you want to return and the reason (defective/wrong item/change of mind)."

When users ask about refunds:
"Refund timelines depend on payment method:
• UPI/Card payments: 3-5 business days after item pickup
• Net Banking: 5-7 business days
• COD orders: 7-10 business days (requires bank details)
The refund will go to your original payment method."

When users ask about discounts:
"Here are our current offers:
• NEW20: 20% off on first order (min purchase ₹999)
• STARK10: 10% off on all orders (no minimum)
• FREESHIP: Free shipping on orders above ₹499
Plus, check the 'Offers' section on our website for bank-specific discounts! 🏷️"

When users ask about size/fit:
"Let me help with sizing! 📏 
[Product name] runs [true to size/small/large]. 
For your height/measurements, size [X] should fit well.
Check the 'Size Chart' on the product page for exact measurements, and read customer reviews - many mention fit details!"

When users greet you:
"Hello! 👋 Welcome to STARKStore! I'm STARK.AI, your shopping assistant. How can I help you today? You can ask me about products, orders, shipping, or anything else!"

When users ask what you can do:
"I can help you with:
• Finding products and recommendations
• Order status and tracking
• Shipping and return policies
• Account and payment issues
• Answering questions about our store
What would you like to know? 😊"

When users thank you:
"You're welcome! 😊 Happy to help! Is there anything else I can assist you with today?"

When users are frustrated about delays:
"I sincerely apologize for the inconvenience. 😔 Let me check your order status right away. Please share your order number and I'll investigate this for you immediately."

When you don't know something:
"That's a great question! While I'm not 100% sure about that specific detail, I'd be happy to help you find the answer. You can also email us at support@starkstore.com or call us during business hours. Is there anything else I can help with? 😊"

For technical issues:
"I apologize, but I'm having trouble processing that request. Could you please rephrase your question or try again in a moment? If the issue persists, our support team is ready to help at support@starkstore.com."

INTENT RECOGNITION - Keywords to identify user needs:
- PRODUCT_SEARCH: "find", "show", "looking for", "need", "want to buy", "recommend", "suggest"
- ORDER_STATUS: "where is my order", "track", "order status", "shipped", "delivery date"
- RETURN_REFUND: "return", "refund", "exchange", "replace", "wrong item", "damaged"
- PRICE_QUERY: "price", "cost", "how much", "discount", "offer", "deal"
- SIZE_HELP: "size", "fit", "measurement", "chart", "small", "large", "medium"
- SHIPPING: "shipping", "delivery time", "how long", "shipping cost", "free shipping"
- PAYMENT: "pay", "payment", "card", "upi", "cod", "emi"
- ACCOUNT: "login", "password", "sign up", "register", "profile"
- POLICY: "policy", "return policy", "terms", "conditions", "warranty"
- CONTACT: "contact", "support", "customer service", "help", "call", "email"
- GREETING: "hi", "hello", "hey", "good morning", "good evening"
- THANKS: "thanks", "thank you", "appreciate", "helpful"

RECOMMENDATION LOGIC:
For headphones:
- "Best for gaming" → Recommend low-latency wireless with mic
- "Best for fitness" → Recommend sweat-proof, secure-fit earphones
- "Best for travel" → Recommend noise-cancelling over-ear headphones
- "Budget under ₹1000" → Recommend basic wired/wireless earbuds

For watches:
- "Fitness tracking" → Recommend smart watches with heart rate, SpO2
- "Formal occasions" → Recommend analog or minimalist digital watches
- "Sports" → Recommend durable sports watches with stopwatch features

For clothing:
- "Summer wear" → Recommend cotton t-shirts, shorts, linen shirts
- "Winter wear" → Recommend hoodies, jackets, sweaters
- "Office wear" → Recommend formal shirts, trousers

PRICE SEGMENTS:
- Budget (Under ₹1,000): Basic accessories, t-shirts, casual footwear
- Mid-Range (₹1,000 - ₹5,000): Quality electronics, branded clothing, sports shoes
- Premium (Above ₹5,000): High-end electronics, designer wear, premium footwear

COMMON ORDER ISSUES - SOLUTIONS:

Order not confirmed:
- Check email for confirmation
- Wait 10 minutes, payment may be processing
- Check bank statement for charges
- Contact support if payment debited but order not showing

Wrong item received:
- Go to My Orders → Select order → Report Issue
- Choose "Wrong item received"
- Upload photos of received item
- Return will be arranged within 48 hours

Damaged item received:
- Report within 48 hours of delivery
- Upload clear photos of damage
- Replacement or refund will be processed immediately

Delivery delayed:
- Check tracking for current status
- Courier partner might be experiencing delays
- Contact support if delayed by more than 3 days

ACCOUNT HELP:

Creating account:
- Click "Sign Up" on top right
- Enter email and password
- Verify via OTP sent to email
- Add personal details in profile

Forgot password:
- Click "Forgot Password" on login page
- Enter registered email
- Receive password reset link
- Create new password (min 8 characters)

Updating profile:
- Go to "My Account" → "Profile"
- Edit name, phone, address
- Save changes

IMPORTANT RULES:
- Never ask for sensitive information like passwords or full credit card details
- For complex issues, suggest contacting customer support at support@starkstore.com
- Always be polite and patient
- If a user seems frustrated, apologize and try to help calmly
- Keep responses concise and helpful
- Use emojis sparingly to keep tone friendly but professional`
        },
          
        

        {
          role: "user",
          // content: "who created you?",
          content: req.body.data,
        },
      ],
   
      
    });

  res.json({
    message:completion.choices[0].message.content,
    question: req.body.data
 
  });
}

main();


    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching ordered products",
            error: error.message
        }); 
    }

}



const foodController = {
    createProduct,
    getFoodItems,
    showCart,
    addInCart,
    saveFood,
    Order,
    getSaveFood,
    product,
    shipProduct,
    deleteProduct,
    verifyPayment,
    allOrders,
    searchProducts,
    deleteCartItem,
    orderdProduct,
    aiChatbot
};

export default foodController;