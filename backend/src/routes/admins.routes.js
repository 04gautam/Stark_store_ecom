// const express = require('express');
// const foodPartnerController = require("../controllers/food-partner.controller");
// const authMiddleware = require("../middlewares/auth.middleware");
// const authController = require("../controllers/auth.controller")

import express from 'express';
import * as foodPartnerController from "../controllers/food-partner.controller.js";
import * as authMiddleware from "../middlewares/auth.middleware.js";
import * as authController from "../controllers/auth.controller.js";

const router = express.Router();


/* /api/food-partner/:id */
// router.get("/:id",
//     authMiddleware.authUserMiddleware,
//     foodPartnerController.getFoodPartnerById)


// router.get("/protect/admin", (req, res)=>{
    
//     const getToken = req.cookies.adminToken

//     // console.log(getToken == false)

//     if(!getToken){
//         // console.log("no token")
//         return res.json({msg: "false"})
//     }
//     if(getToken){
//         // console.log("yes token")
//         return res.json({msg: "true"})
//     }
  

//     // res.json({msg:12})

// })


router.post("/register", authController.registerAdmin)

router.post("/login", authController.loginAdmin)

// module.exports = router;
export default router;