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

router.get("/orderd/product", allMiddlewares.authUserMiddleware, async(req, res)=>{
    // console.log(req.user)

    
    const userId = req.user._id;

    const orders = await orderModel.find({ user: userId }).populate('product');

    // console.log(orders);

    res.status(200).json({
        message: "Orderd products fetched successfully",
        orders
    });
    

    // console.log("api/food/orderd/product is running....")

})

router.get("/products", 
    // authMiddleware.authUserMiddleware,
    foodController.product);
    

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

router.delete("/delete/:id",
    // authMiddleware.authUserMiddleware,
     foodController.deleteProduct );




router.post('/cart',
    allMiddlewares.authUserMiddleware,
    foodController.addInCart)

router.get('/show',
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

// module.exports = router
export default router;