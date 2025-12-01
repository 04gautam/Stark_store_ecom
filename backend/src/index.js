const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
app.use(cookieParser());

const authRoutes = require('./routes/auth.routes');
const foodRoutes = require('./routes/food.routes');
const foodPartnerRoutes = require('./routes/food-partner.routes');
const jwt = require("jsonwebtoken")
const cors = require('cors');
require("dotenv").config()


app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.get("/", (req, res) => {
//     res.send("Hello World");
// })

app.use('/api/auth', authRoutes);
app.use('/api/food', foodRoutes);
// app.use('/api/food-partner', foodPartnerRoutes);

module.exports = app;