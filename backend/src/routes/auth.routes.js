// const express = require('express');
// const authController = require("../controllers/auth.controller")

import express from 'express';
import loginUserController from "../controllers/auth.controller.js";

const router = express.Router();
const authController = loginUserController;
// user auth APIs
router.post('/user/register', authController.registerUser)
router.post('/user/login', authController.loginUser)
router.get('/user/logout', authController.logoutUser)


router.get("/", (req, res)=>{
    res.send("auth route is working...")
})



// food partner auth APIs
// router.post('/food-partner/register', authController.registerAdmin)
// router.post('/food-partner/login', authController.loginFoodPartner)



// router.get('/food-partner/logout', authController.logoutFoodPartner)



// module.exports = router;
// export default router;
export default router;