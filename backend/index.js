// require('dotenv').config();
import 'dotenv/config';

import app from './src/indexserver.js';
// import cors from "cors";

// start server

// const connectDB = require('./src/db/db.js');
import connectDB from './src/db/db.js';

connectDB();

// app.use(cors({
//   origin: "https://stark-store-ecom-ycbe-qufb5i57e-04gautams-projects.vercel.app",
//   credentials: true,
// }));

//[ for deployment ]

export default app; 

// [for local testing...]


// app.listen(5000, () => {
//     console.log("Server is running on port 5000");
// })