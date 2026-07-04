Stark Store — MERN E-Commerce Platform with AI Assistant

A full-stack e-commerce web application built with the MERN stack (MongoDB, Express, React, Node.js), featuring an integrated AI-powered shopping assistant that helps users search for products and get customer support in natural language.

 Live Demo: stark-store-ecom-ycbe.vercel.app


 Table of Contents


Features
AI Assistant
Tech Stack
Project Structure
Getting Started
Environment Variables
Running Locally
Deployment
API Overview
Contributing
License



 Features


🔐 User authentication & authorization (signup/login)
🛒 Product browsing, filtering, and detailed product pages
🛍️ Shopping cart and checkout flow
📦 Order placement and order history
🧑‍💼 Admin-side product/order management
🤖 AI-powered assistant for product search & customer support
📱 Responsive UI built with React + Vite
☁️ Deployed on Vercel (frontend & backend)



ℹ️ Update this list to match the exact feature set of your app (e.g. wishlist, reviews, payment gateway, etc.).




🤖 AI Assistant

The platform includes a conversational AI assistant powered by the Grok API. It helps customers:


🔍 Search for products using natural language (e.g. "show me running shoes under ₹2000")
💬 Get customer support — answering FAQs, order status queries, and general shopping help


The assistant logic lives in the backend under src/services and src/controllers, and is exposed to the frontend via a dedicated API route.


 Tech Stack

Frontend


React
Vite
ESLint


Backend


Node.js
Express.js
MongoDB with Mongoose


AI Integration


Grok API


Deployment


Vercel (frontend + backend)



📁 Project Structure

.
├── backend
│   ├── src
│   │   ├── controllers     # Request handlers / business logic
│   │   ├── db              # Database connection setup
│   │   ├── middlewares      # Auth, error handling, etc.
│   │   ├── models          # Mongoose schemas
│   │   ├── routes          # API route definitions
│   │   ├── services        # AI assistant & other service logic
│   │   └── indexserver.js  # Server entry point
│   ├── .gitignore
│   ├── index.js
│   ├── package.json
│   └── vercel.json
│
└── frontend
    ├── public
    ├── src
    ├── .gitignore
    ├── README.md
    ├── eslint.config.js
    ├── index.html
    ├── package.json
    ├── vercel.json
    └── vite.config.js


🚀 Getting Started

Prerequisites


Node.js (v18 or higher recommended)
MongoDB instance (local or Atlas)
A Grok API key


Clone the repository

bashgit clone https://github.com/<your-username>/<your-repo-name>.git
cd <your-repo-name>


🔑 Environment Variables

Create a .env file inside the backend folder with the following variables:

envPORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GROK_API_KEY=your_grok_api_key

Create a .env file inside the frontend folder with:

envVITE_API_BASE_URL=http://localhost:5000


⚠️ Replace variable names above with the exact ones your code actually uses, and never commit real .env files to GitHub.




🏃 Running Locally

Backend

bashcd backend
npm install
npm run dev

Frontend

bashcd frontend
npm install
npm run dev

The frontend will typically run on http://localhost:5173 and the backend on http://localhost:5000 (or as configured).


☁️ Deployment

Both frontend and backend include their own vercel.json, meaning each is deployed independently on Vercel:


Frontend → static React/Vite build
Backend → serverless Express API


Set the environment variables listed above in your Vercel project settings for each deployment.


🔌 API Overview

MethodEndpointDescriptionPOST/api/auth/registerRegister a new userPOST/api/auth/loginLog in a userGET/api/productsGet all productsGET/api/products/:idGet single product detailsPOST/api/cartAdd item to cartPOST/api/ordersPlace an orderPOST/api/assistantChat with the AI assistant


ℹ️ Update this table with your actual routes from src/routes.




🤝 Contributing

Contributions are welcome!


Fork the repository
Create your feature branch (git checkout -b feature/amazing-feature)
Commit your changes (git commit -m 'Add amazing feature')
Push to the branch (git push origin feature/amazing-feature)
Open a Pull Request



📄 License

This project is licensed under the MIT License.


👤 Author

Built with ❤️ by [HItlar Gautam] — feel free to connect!
