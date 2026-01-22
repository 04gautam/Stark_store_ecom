// const adminModel = require("../models/foodpartner.model")
// const userModel = require("../models/user.model")
// const jwt = require("jsonwebtoken");

import adminModel from "../models/foodpartner.model.js";
import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";

async function authAdminMiddleware(req, res, next) {

    const token = req.cookies.token;
    // console.log(token)
    // next()

    if (!token) {
        return res.status(401).json({
            message: "Please login first"
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        const adminData = await adminModel.findById(decoded.id);

        req.admin = adminData;

        next()

    } catch (err) {

        return res.status(401).json({
            message: "Invalid token"
        })

    }

}

async function authUserMiddleware(req, res, next) {

 
    const token = req.cookies.token;
    // console.log(token)
    
     if (!token) {
        // console.log("No token found");
        return res.status(401).json({
            message: "Please login first"
        })
    }

    // const decoded = jwt.verify(token, process.env.JWT_SECRET)
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        // console.log(decoded)

        const user = await userModel.findById(decoded.id);

        req.user = user
    next()

    } catch (error) {
        return res.status(401).json({
            message: "Invalid token"
        })
    }


}

// module.exports = {
//     authAdminMiddleware,
//     authUserMiddleware
// }


const allMiddlewares = {
    authAdminMiddleware,
    authUserMiddleware
}

export default allMiddlewares;