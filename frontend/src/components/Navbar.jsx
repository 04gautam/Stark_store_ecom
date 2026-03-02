
import axios from "axios";
import React, { useState } from "react";
import { FiMenu, FiX, FiShoppingCart, FiSearch, FiMessageCircle } from "react-icons/fi";
import { Link, NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// import ReactMarkdown from "react-markdown";

const GlassNavbar = (props) => {
  const { setResults } = props;
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [errors, setErrors] = useState("");

  // Chatbot states
  const [chatOpen, setChatOpen] = useState(false);
  const [response, setResponse] = useState("Ask me anything!");
  const [question, setQuestion] = useState("");
  const [chat, setChat] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  const searchProducts = () => {
    if (query.length === 0) {
      setErrors("Please enter something...");
      setResults([]);
      return;
    }
    axios
      // .get("http://localhost:5000/api/food/search/products?q=" + query)
      .get("https://stark-store-ecom.vercel.app/api/food/search/products?q=" + query)
      .then((res) => {
        setResults(res.data.products);
      });
  };

  const navigate = useNavigate();

  const logoutHandler = async () => {
    const response = await axios.get(
      // "http://localhost:5000/api/auth/user/logout",
      "https://stark-store-ecom.vercel.app/api/auth/user/logout",
      { withCredentials: true }
    );
    navigate("/login");
  };

  // Chatbot handlers
  async function handleSendMessage() {
    try {
      if (question.trim().length === 0) return;

      // Add user message
      const userMessage = { sender: "user", text: question };
      setChat((prev) => [...prev, userMessage]);
      
      // Clear input and show typing indicator
      setQuestion("");
      setIsTyping(true);

      // const res = await axios.post("http://localhost:5000/api/food/starkai", {
      const res = await axios.post("https://stark-store-ecom.vercel.app/api/food/starkai", {
        data: question,
      });

      setResponse(res.data.message);

      // Add AI response
      const aiMessage = { sender: "ai", text: res.data.message };
      setChat((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    } catch (error) {
      console.log(error.message);
      setIsTyping(false);
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      <nav
        className="
          w-full 
          fixed 
          top-0 
          left-0 
          z-50 
          bg-white/70 
          backdrop-blur-xl 
          border-b 
          border-white/30 
          shadow-[0_8px_32px_rgba(0,0,0,0.08)] 
          text-gray-800 
          px-6 
          lg:px-12 
          py-3 
          flex 
          items-center 
          justify-between
          transition-all 
          duration-300
        "
      >
        {/* Logo with refined typography */}
        <h1 className="text-2xl font-extrabold tracking-tight">
          <Link to="/" className="flex items-center gap-1">
            STARK<span className="text-orange-500 font-medium">Store</span>
          </Link>
        </h1>

        {/* Desktop Search - elegant glass effect */}
        <div className="hidden md:flex items-center w-full max-w-md mx-8 lg:mx-12 bg-white/40 backdrop-blur-md pl-4 pr-1 py-1 rounded-full border border-white/30 shadow-inner">
          <FiSearch size={20} className="text-gray-500" />
          <input
            type="text"
            placeholder={errors || "Search products..."}
            onChange={(e) => setQuery(e.target.value)}
            className="bg-transparent ml-3 focus:outline-none placeholder-gray-400 text-gray-700 w-full"
          />
          <button
            onClick={searchProducts}
            className="bg-linear-to-r from-orange-500 to-orange-600 text-white px-5 py-1.5 cursor-pointer rounded-full text-sm font-medium hover:shadow-lg hover:scale-105 transition-all duration-200"
          >
            Search
          </button>
        </div>

        {/* Desktop Right Section */}
        <div className="hidden md:flex items-center gap-8">
          <ul className="flex justify-center items-center gap-8 text-[0.95rem] font-medium">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `hover:text-orange-600 transition-colors duration-200 py-1 border-b-2 ${
                    isActive
                      ? "text-orange-600 border-orange-600"
                      : "border-transparent hover:border-orange-300"
                  }`
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/orderd/product"
                className={({ isActive }) =>
                  `hover:text-orange-600 transition-colors duration-200 py-1 border-b-2 ${
                    isActive
                      ? "text-orange-600 border-orange-600"
                      : "border-transparent hover:border-orange-300"
                  }`
                }
              >
                Orders
              </NavLink>
            </li>
            <li>
              <button
                onClick={logoutHandler}
                className="hover:text-red-500 transition-colors duration-200 py-1 border-b-2 border-transparent hover:border-red-300"
              >
                Logout
              </button>
            </li>
          </ul>

          {/* AI Chatbot Button - Desktop */}
          <button
            onClick={() => setChatOpen(!chatOpen)}
            className="
              relative
              group
              flex
              items-center
              gap-2
              px-4
              py-2
              bg-linear-to-r
              from-purple-500
              to-pink-500
              text-white
              rounded-full
              hover:shadow-lg
              hover:scale-105
              transition-all
              duration-300
              border
              border-white/20
              backdrop-blur-sm
            "
          >
            <FiMessageCircle size={20} className="animate-pulse" />
            <span className="text-sm font-medium">AI Assistant</span>
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white animate-ping" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
          </button>

          {/* Cart with subtle badge */}
          <div className="relative cursor-pointer group">
            <Link to="/cart" className="block p-2 -m-2">
              <FiShoppingCart
                size={24}
                className="text-gray-700 group-hover:text-orange-600 transition-colors duration-200"
              />
            </Link>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 -m-2 text-gray-700 hover:text-orange-600 transition-colors duration-200"
          aria-label="Toggle menu"
        >
          {open ? <FiX size={28} /> : <FiMenu size={28} />}
        </button>

        {/* Mobile Menu Overlay */}
        {open && (
          <div
            className="
              absolute 
              top-full 
              left-0 
              w-full 
              bg-white/90 
              backdrop-blur-xl 
              border-t 
              border-white/30 
              shadow-2xl 
              py-8 
              flex 
              flex-col 
              items-center 
              gap-8 
              md:hidden
              animate-fadeIn
            "
          >
            {/* Mobile Search */}
            <div className="w-11/12 max-w-sm bg-white/60 backdrop-blur-md pl-4 pr-2 py-1.5 rounded-full border border-white/30 shadow-inner flex items-center">
              <FiSearch size={20} className="text-gray-500 shrink-0" />
              <input
                type="text"
                placeholder="Search products..."
                onChange={(e) => setQuery(e.target.value)}
                className="bg-transparent ml-3 focus:outline-none placeholder-gray-400 text-gray-700 w-full"
              />
              <button
                onClick={searchProducts}
                className="bg-orange-500 text-white px-4 py-1 rounded-full cursor-pointer text-sm font-medium hover:bg-orange-600 transition-colors duration-200 shrink-0"
              >
                Search
              </button>
            </div>

            {/* Mobile Navigation Links */}
            <ul className="flex flex-col items-center gap-6 text-lg font-medium w-full">
              <li className="w-full text-center">
                <NavLink
                  to="/"
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `block py-2 transition-colors duration-200 ${
                      isActive
                        ? "text-orange-600"
                        : "text-gray-700 hover:text-orange-600"
                    }`
                  }
                >
                  Home
                </NavLink>
              </li>
              <li className="w-full text-center">
                <NavLink
                  to="/orderd/product"
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `block py-2 transition-colors duration-200 ${
                      isActive
                        ? "text-orange-600"
                        : "text-gray-700 hover:text-orange-600"
                    }`
                  }
                >
                  Orders
                </NavLink>
              </li>
              <li className="w-full text-center">
                <button
                  onClick={() => {
                    logoutHandler();
                    setOpen(false);
                  }}
                  className="block w-full py-2 text-gray-700 hover:text-red-500 transition-colors duration-200"
                >
                  Logout
                </button>
              </li>
            </ul>

            {/* Mobile AI Chatbot Button */}
            <button
              onClick={() => {
                setChatOpen(true);
                setOpen(false);
              }}
              className="
                flex
                items-center
                gap-3
                px-6
                py-3
                cursor-pointer
                bg-linear-to-r
                from-purple-500
                to-pink-500
                text-white
                rounded-full
                hover:shadow-lg
                transition-all
                duration-300
                font-medium
              "
            >
              <FiMessageCircle size={22} />
              <span>Chat with AI Assistant</span>
            </button>

            {/* Mobile Cart */}
            <div className="flex items-center gap-2 cursor-pointer group">
              <Link
                to="/cart"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 text-gray-700 group-hover:text-orange-600 transition-colors duration-200"
              >
                <FiShoppingCart size={24} />
                <span className="text-sm font-medium">Cart</span>
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* AI Chatbot Popup Window */}
      {chatOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50"
            onClick={() => setChatOpen(false)}
          />
          
          {/* Chat Window */}
          <div
            className="
              fixed
              top-10
              right-2
              md:right-4
              
              md:w-90
              w-11/12
              max-w-sm
              h-150
              bg-white/90
              backdrop-blur-xl
              border
              border-white/30
              rounded-2xl
              shadow-2xl
              z-50
              flex
              flex-col
              overflow-hidden
              animate-slideUp
            "
          >
            {/* Chat Header */}
            <div className="
              flex
              items-center
              justify-between
              px-6
              py-4
              bg-linear-to-r
              from-purple-500
              to-pink-500
              text-white
            ">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <FiMessageCircle size={24} />
                  <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white" />
                </div>
                <div>
                  <h3 className="font-semibold">STARK.AI Assistant</h3>
                  <p className="text-xs text-white/80">Online • Ask me anything!</p>
                </div>
              </div>
              <button
                onClick={() => setChatOpen(false)}
                className="p-2 hover:bg-white/20 rounded-xl transition-colors duration-200"
              >
                <FiX size={20} />
              </button>
            </div>

            {/* Chat Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-linear-to-b from-gray-50 to-white">
              {chat.length === 0 ? (
                <div className="text-center mt-10">
                  <div className="
                    w-20
                    h-20
                    mx-auto
                    mb-4
                    rounded-full
                    bg-linear-to-r
                    from-purple-100
                    to-pink-100
                    flex
                    items-center
                    justify-center
                  ">
                    <FiMessageCircle size={32} className="text-purple-500" />
                  </div>
                  <p className="text-gray-500 mb-2">
                    👋 Hello! I'm <span className="font-semibold text-purple-600">STARK.AI</span>
                  </p>
                  <p className="text-sm text-gray-400">
                    Ask me about products, orders, or anything else!
                  </p>
                </div>
              ) : (
                chat.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      msg.sender === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[85%] px-4 py-3 rounded-2xl shadow-sm ${
                        msg.sender === "user"
                          ? "bg-linear-to-r from-purple-500 to-pink-500 text-white rounded-br-none"
                          : "bg-gray-100 text-gray-800 rounded-bl-none"
                      }`}
                    >
                      <span
                        className={`block mb-1 text-xs font-semibold ${
                          msg.sender === "user" ? "text-white/80" : "text-purple-600"
                        }`}
                      >
                        {msg.sender === "user" ? "You" : "STARK.AI"}
                      </span>
                      {/* <ReactMarkdown className="text-sm prose prose-sm max-w-none">
                        {msg.text}
                      </ReactMarkdown> */}
                      <div className="text-sm whitespace-pre-wrap">
                        {msg.text}
                        
                    </div>
                    </div>
                  </div>
                ))
              )}
              
              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 px-4 py-3 rounded-2xl rounded-bl-none">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Chat Input */}
            <div className="border-t border-white/30 p-4 bg-white/50 backdrop-blur-sm">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Type your message..."
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="
                    flex-1
                    px-4
                    py-3
                    bg-white/80
                    border
                    border-gray-200
                    rounded-xl
                    focus:outline-none
                    focus:border-purple-400
                    transition-colors
                    duration-200
                    text-gray-800
                    placeholder-gray-400
                  "
                />
                <button
                  onClick={handleSendMessage}
                  disabled={isTyping || !question.trim()}
                  className="
                    px-6
                    py-3
                    bg-linear-to-r
                    from-purple-500
                    to-pink-500
                    text-white
                    rounded-xl
                    hover:shadow-lg
                    hover:scale-105
                    active:scale-95
                    transition-all
                    duration-200
                    disabled:opacity-50
                    disabled:cursor-not-allowed
                    disabled:hover:scale-100
                    font-medium
                  "
                >
                  Send
                </button>
              </div>
              <p className="text-xs text-center text-gray-400 mt-2">
                STARK.AI can make mistakes — verify important info
              </p>
            </div>
          </div>
        </>
      )}

      {/* Add animation keyframes */}
      {/* <style jsx>{`s
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style> */}
    </>
  );
};

export default GlassNavbar;