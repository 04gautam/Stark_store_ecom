// const mongoose = require("mongoose")
import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({

  name: String,
  email: String,
  phone: String,
  address: String,
  city: String,
  pincode: String,
  ispaid: {
    type: Boolean,
    default: false
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "order",
  },

  product:{
      type: mongoose.Schema.Types.ObjectId,
      ref:"product"
    }
}, {
    timestamps: true
})

const  orderModel = mongoose.model("orders", orderSchema)

// module.exports = orderModel;

export default orderModel;

