// const mongoose = require('mongoose');
import mongoose from 'mongoose';



function connectDB() {
    mongoose.connect(process.env.MONGODB_URI)
        .then(() => {
            console.log("MongoDB connected");
        })
        .catch((err) => {
            console.log("MongoDB connection error:", err);
        })
}

// module.exports = connectDB;

export default connectDB;