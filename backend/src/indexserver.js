// const express = require('express');
// const cookieParser = require('cookie-parser');

import express from 'express';
import cookieParser from 'cookie-parser';
const app = express();
app.use(cookieParser());

// const authRoutes = require('./routes/auth.routes');
// const foodRoutes = require('./routes/food.routes');
// const adminsRoutes = require('./routes/admins.routes');
// const jwt = require("jsonwebtoken")
// const cors = require('cors');

import authRoutes from './routes/auth.routes.js';
import foodRoutes from './routes/food.routes.js';
// import adminsRoutes from './routes/admins.routes.js';
import jwt from "jsonwebtoken"
import cors from 'cors';

// require("dotenv").config()

import 'dotenv/config';


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


// app.use('/api/auth/admin', adminsRoutes);


// module.exports = app;
export default app;