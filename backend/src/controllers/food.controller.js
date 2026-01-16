const productModel = require('../models/product.model');
const storageService = require('../services/storage.service');
const cartModel = require("../models/cart.model")
const saveModel = require("../models/save.model")
const orderModel = require("../models/order.model")
const Razorpay = require("razorpay");
// const user = require("../middlewares/auth.middleware")
const { v4: uuid } = require("uuid");
const crypto = require("crypto");



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

  
    const user = req.user;  
    
    const cartItems = await cartModel.find({ user: user._id }).populate('cartProduct');

    if (!cartItems || cartItems.length === 0) {
        return res.status(404).json({ message: "No items in cart" });
    }
// console.log(cartItems)
    res.status(200).json({
        message: "Cart items retrieved successfully",
        cartItems
    });
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

const product = async(req, res) => {

    const allProducts = await productModel.find();

    // console.log(req.cookies.token)

    res.status(200).json({
        success: true,
        products: allProducts
    })  
};

const shipProduct = async (req, res)=>{
    const productId = req.params.id;
    const userId = req.user.id
    const ispaid = req.body.ispaid
    const buyerData = req.body;
    
    // console.log(productId)
    // console.log(userId)
    // console.log(buyerData)

    // console.log("here is the buyer data: ", buyerData)

    // const buyerData = req.body;//
    // console.log("here is the ship data: ")//

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

    // console.log("let see is this working both of them or not: ")


//   console.log(product);


const nodemailer = require("nodemailer");

// Create a transporter

const transporter = nodemailer.createTransport({
  service: "gmail", // You can use 'hotmail', 'yahoo', or custom SMTP too
  auth: {
    user: "sunm13398@gmail.com", // Your Gmail address
    pass: "buptobsfyqyjfvil",     // Use app password, not your Gmail password
    },
});

// Email options
const mailOptions = {
  from: "sunm13398@gmail.com",
  to: buyerData.email,
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

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    return console.log("Error:", error);
  }
  //console.log("Email sent:", info.response);
});
// Send the email

   

    res.status(200).json({
        success: true,
        message: "Order placed successfully",
        
    });  

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
    const productId = req.params.id;
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
} 

module.exports = {
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
    verifyPayment
}