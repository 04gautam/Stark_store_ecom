const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    photo: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
        required: true,
    },

    // catagory: {
    //     type: String,
    //     required: true,
    // },


    // foodPartner: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "foodpartner"
    // },
    
    likeCount: {
        type: Number,
        default: 0
    },
    savesCount: {
        type: Number,
        default: 0
    }
})


const productModel = mongoose.model("product", productSchema);


module.exports = productModel;