const foodPartnerModel = require("../models/foodpartner.model")
const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken");


async function authFoodPartnerMiddleware(req, res, next) {

    const token = req.cookies.token;
    console.log(token)
    next()

    // if (!token) {
    //     return res.status(401).json({
    //         message: "Please login first"
    //     })
    // }

    // try {
    //     const decoded = jwt.verify(token, process.env.JWT_SECRET)

    //     const foodPartner = await foodPartnerModel.findById(decoded.id);

    //     req.foodPartner = foodPartner

    //     next()

    // } catch (err) {

    //     return res.status(401).json({
    //         message: "Invalid token"
    //     })

    // }

}

async function authUserMiddleware(req, res, next) {

 
    const token = req.cookies.token;
    // console.log(token)
    
     if (!token) {
        console.log("No token found");
        return res.status(401).json({
            message: "Please login first"
        })
    }

    // const decoded = jwt.verify(token, process.env.JWT_SECRET)
    
    try {
        const decoded = jwt.verify(token, "hello")
        // console.log(decoded)

        const user = await userModel.findById(decoded.id);

        req.user = user
    next()

    } catch (error) {
        return res.status(401).json({
            message: "Invalid token"
        })
    }




    
    // console.log("METHOD", req.method);
    // console.log("TOKEN", token);
   

    // try {
    //     const decoded = jwt.verify(token, process.env.JWT_SECRET)
    //     // console.log(decoded)
    //     const user = await userModel.findById(decoded.id);

    //     req.user = user
        

    //     next()
}
    

module.exports = {
    // authFoodPartnerMiddleware,
    authUserMiddleware
}