// const mongoose = require('mongoose');

import mongoose from 'mongoose';


const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        // type: String,
        ref: 'user',
        required: true
    },
    cartProduct: {
        type: mongoose.Schema.Types.ObjectId,
        // type: String,
        ref: 'product',
        required: true
    }
})

const Cart = mongoose.model('cart', cartSchema);
// module.exports = Cart;

export default Cart;
