// require('dotenv').config();
import 'dotenv/config';



import app from './src/indexserver.js';
import cors from "cors";

// start server

// const connectDB = require('./src/db/db.js');
import connectDB from './src/db/db.js';

connectDB();

app.use(cors({
  origin: "http://localhost:5000",
  credentials: true,
}));



module.exports = app; //[ for deployment ]

// app.listen(5000, () => {
//     console.log("Server is running on port 5000");
// })