require('dotenv').config();
const app = require('./src/indexserver.js')
const cors = require("cors")

// start server

const connectDB = require('./src/db/db.js');

connectDB();

app.use(cors({
  origin: "http://localhost:5000",
  credentials: true,
}));



module.exports = app; //[ for deployment ]

// app.listen(5000, () => {
//     console.log("Server is running on port 5000");
// })