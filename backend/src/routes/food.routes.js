// const express = require('express');
// const foodController = require("../controllers/food.controller")
// const authMiddleware = require("../middlewares/auth.middleware")
// const router = express.Router();
// const productModel = require('../models/product.model');
// const orderModel = require("../models/order.model")
// const multer = require('multer');

import express from 'express';
import foodController from "../controllers/food.controller.js"
import  allMiddlewares from "../middlewares/auth.middleware.js"
import productModel from '../models/product.model.js';
const router = express.Router();
import orderModel from "../models/order.model.js"
import multer from 'multer';

const upload = multer()

// const nodemailer = require("nodemailer");


router.post("/upload",   
    // authMiddleware.authAdminMiddleware,
    upload.single("image"),
    foodController.createProduct);


/* POST /api/food/ [protected]*/
// router.post('/',
//     authMiddleware.authFoodPartnerMiddleware,
//     upload.single("mama"),
//     foodController.createProduct)


/* GET /api/food/ [protected] */

// router.get("/orderd/product",
//      allMiddlewares.authUserMiddleware,
//      foodController.orderdProduct)

    // router.get("/orderd/product", async(req, res)=>{

    //    try {
    //            const userId = req.user._id;
          
    //           const orders = await orderModel.find({ user: userId }).populate('product');
          
    //           // console.log(orders);
          
    //           res.status(200).json({
    //               message: "Orderd products fetched successfully",
    //               orders
    //           });
              
    //       } catch (error) {
    //           res.status(500).json({
    //               success: false,
    //               message: "Error fetching ordered products",
    //               error: error.message
    //           }); 
    //       }
    // })


//     router.get("/orderd/product", allMiddlewares.authUserMiddleware, async(req, res)=>{
//     // console.log(req.user)

    
//     const userId = req.user._id;

//     const orders = await orderModel.find({ user: userId }).populate('product');

//     // console.log(orders);

//     res.status(200).json({
//         message: "Orderd products fetched successfully",
//         orders
//     });
    

//     // console.log("api/food/orderd/product is running....")

// })


router.get("/orderd/product", allMiddlewares.authUserMiddleware, foodController.orderdProduct)


router.get("/products", 
    // authMiddleware.authUserMiddleware,
    foodController.product);
    

router.get("/orders",
    // authMiddleware.authUserMiddleware,
    foodController.allOrders);




router.post("/single/:id", allMiddlewares.authUserMiddleware, (req, res)=>{
    const productId = req.params.id;

    productModel.findById(productId)    

    .then((product)=>{
        res.status(200).json({
            success: true,
            product: product
        })
    })
    .catch((err)=>{
        res.status(500).json({
            success: false,
            message: "Product not found"
        })
        
    } )
} )




router.post("/ship/:id",
    allMiddlewares.authUserMiddleware,   
     foodController.shipProduct );

router.post("/delete/product",
    // authMiddleware.authUserMiddleware,
     foodController.deleteProduct );

router.get("/search/:keyword",
    // authMiddleware.authUserMiddleware,
    foodController.searchProducts);


router.post('/cart',
    allMiddlewares.authUserMiddleware,
    foodController.addInCart)

router.get('/show/cart',
    allMiddlewares.authUserMiddleware,
    foodController.showCart)


router.post('/save',
    // authMiddleware.authUserMiddleware,
    foodController.saveFood
)
router.post('/order',
    // authMiddleware.authUserMiddleware,
    foodController.Order
)


router.get('/save',
    // authMiddleware.authUserMiddleware,
    foodController.getSaveFood
)

router.post('/verify',
    // authMiddleware.authUserMiddleware,
    foodController.verifyPayment
)

router.get('/delete/cart',
    // authMiddleware.authUserMiddleware,
    foodController.deleteCartItem
)
// module.exports = router
export default router;