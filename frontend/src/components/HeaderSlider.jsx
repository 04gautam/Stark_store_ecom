
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight, FiShoppingBag, FiTruck, FiShield, FiClock } from 'react-icons/fi';

const HomepageSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Random product images for slider (you can replace these with your actual product images)
  const slides = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1200",
      title: "Premium Headphones",
      subtitle: "Immersive Sound Experience",
      category: "Electronics",
      offer: "20% Off",
      bgColor: "from-purple-500/20 to-blue-500/20"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1200",
      title: "Smart Watches",
      subtitle: "Track Your Fitness Journey",
      category: "Wearables",
      offer: "Free Shipping",
      bgColor: "from-orange-500/20 to-red-500/20"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1200",
      title: "Nike Air Max",
      subtitle: "Style Meets Comfort",
      category: "Footwear",
      offer: "30% Off",
      bgColor: "from-green-500/20 to-teal-500/20"
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=1200",
      title: "Premium Camera",
      subtitle: "Capture Every Moment",
      category: "Photography",
      offer: "15% Off",
      bgColor: "from-blue-500/20 to-indigo-500/20"
    }
  ];

  // Features data
  const features = [
    { icon: FiShoppingBag, title: "100+ Products", description: "Wide variety of items" },
    { icon: FiTruck, title: "Free Delivery", description: "On orders above ₹499" },
    { icon: FiShield, title: "Secure Payment", description: "100% safe checkout" },
    { icon: FiClock, title: "24/7 Support", description: "Always here to help" }
  ];

  // Auto-slide effect
  useEffect(() => {
    let interval;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying, slides.length]);

  const nextSlide = () => {
    setIsAutoPlaying(false);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setIsAutoPlaying(false);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setIsAutoPlaying(false);
    setCurrentSlide(index);
  };

  return (
    <div className="w-full pt-10 px-4 sm:px-6 lg:px-8"> {/* pt-20 to account for fixed navbar */}
      {/* Main Slider Section */}
      <div className="relative w-full h-125 md:h-150 rounded-3xl overflow-hidden">
        {/* Slides */}
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`
              absolute inset-0 w-full h-full transition-all duration-1000 ease-out
              ${index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}
            `}
          >
            {/* Background Image with Overlay */}
            <div className="absolute inset-0">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              <div className={`absolute inset-0 bg-linear-to-r ${slide.bgColor} backdrop-blur-[2px]`} />
            </div>

            {/* Content */}
            <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
              <div className="w-full md:w-1/2 lg:w-2/5">
                {/* Glass card for text */}
                <div className="
                  bg-white/20 
                  backdrop-blur-xl 
                  border border-white/30 
                  rounded-3xl 
                  p-8 
                  shadow-[0_8px_32px_rgba(0,0,0,0.2)]
                  transform
                  transition-all
                  duration-700
                  delay-300
                  ${index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}
                ">
                  <span className="inline-block px-4 py-2 bg-orange-500/90 backdrop-blur-sm text-white text-sm font-semibold rounded-full mb-4 border border-white/30">
                    {slide.category}
                  </span>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
                    {slide.title}
                  </h1>
                  <p className="text-xl text-white/90 mb-6">
                    {slide.subtitle}
                  </p>
                  <div className="flex items-center gap-4">
                    <span className="px-6 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white font-semibold">
                      {slide.offer}
                    </span>
                    <a
                      href="#showproducts"
                      className="
                        px-8 
                        py-3 
                        bg-linear-to-r 
                        from-orange-500 
                        to-orange-600 
                        text-white 
                        rounded-xl 
                        hover:shadow-lg 
                        hover:scale-105 
                        active:scale-95
                        transition-all 
                        duration-300
                        font-semibold
                        border
                        border-white/20
                        backdrop-blur-sm
                        flex
                        items-center
                        gap-2
                      "
                    >
                      Shop Now
                      <FiChevronRight size={20} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="
            absolute 
            left-4 
            top-1/2 
            transform 
            -translate-y-1/2
            w-12 
            h-12 
            bg-white/20 
            backdrop-blur-sm 
            border 
            border-white/30 
            rounded-full 
            flex 
            items-center 
            justify-center
            text-white
            hover:bg-white/40
            transition-all
            duration-300
            z-20
          "
        >
          <FiChevronLeft size={24} />
        </button>
        <button
          onClick={nextSlide}
          className="
            absolute 
            right-4 
            top-1/2 
            transform 
            -translate-y-1/2
            w-12 
            h-12 
            bg-white/20 
            backdrop-blur-sm 
            border 
            border-white/30 
            rounded-full 
            flex 
            items-center 
            justify-center
            text-white
            hover:bg-white/40
            transition-all
            duration-300
            z-20
          "
        >
          <FiChevronRight size={24} />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-3 z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`
                h-2 rounded-full transition-all duration-300
                ${index === currentSlide 
                  ? 'w-8 bg-orange-500' 
                  : 'w-2 bg-white/50 hover:bg-white/80'
                }
              `}
            />
          ))}
        </div>
      </div>

      {/* Features Section - What we offer */}
      {/* <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Why Choose <span className="text-orange-600">STACKStore?</span>
          </h2>
          <div className="w-24 h-1 bg-linear-to-r from-orange-500 to-orange-600 mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="
                group
                bg-white/70 
                backdrop-blur-lg 
                rounded-2xl 
                p-8
                border 
                border-white/40
                shadow-[0_8px_30px_rgba(0,0,0,0.08)]
                hover:shadow-[0_20px_40px_rgba(0,0,0,0.12)]
                hover:-translate-y-2
                transition-all
                duration-500
                text-center
              "
            >
              <div className="
                w-16 
                h-16 
                mx-auto 
                mb-4 
                rounded-full 
                bg-linear-to-br 
                from-orange-100 
                to-orange-50 
                flex 
                items-center 
                justify-center
                group-hover:scale-110
                transition-transform
                duration-300
              ">
                <feature.icon className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div> */}

      {/* Popular Categories Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 bg-linear-to-b from-transparent to-gray-50/50">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Shop by <span className="text-orange-600">Category</span>
          </h2>
          <div className="w-24 h-1 bg-linear-to-r from-orange-500 to-orange-600 mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { name: "Electronics", image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=200", count: "45+" },
            { name: "Fashion", image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=200", count: "32+" },
            { name: "Footwear", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200", count: "28+" },
            { name: "Watches", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200", count: "15+" },
            { name: "Accessories", image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=200", count: "23+" },
            { name: "Sports", image: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=200", count: "19+" }
          ].map((category, index) => (
            <a
              key={index}
              // to={`/category/${category.name.toLowerCase()}`}
              href="#showproducts"
              className="
                group
                bg-white/70 
                backdrop-blur-lg 
                rounded-xl 
                overflow-hidden
                border 
                border-white/40
                shadow-[0_8px_30px_rgba(0,0,0,0.08)]
                hover:shadow-[0_20px_40px_rgba(0,0,0,0.12)]
                hover:-translate-y-1
                transition-all
                duration-500
              "
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="p-4 text-center">
                <h3 className="font-semibold text-gray-800 mb-1">{category.name}</h3>
                <p className="text-xs text-gray-500">{category.count} items</p>
              </div>
            </a>
          ))}
        </div>
      </div>




      {/* Promotional Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <div className="
          relative
          bg-linear-to-r 
          from-orange-500 
          to-orange-600 
          rounded-3xl 
          overflow-hidden
          p-12
          text-center
          border
          border-white/20
          shadow-[0_20px_50px_rgba(249,115,22,0.3)]
        ">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-60 h-60 bg-white rounded-full blur-3xl" />
          </div>

          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Get 20% Off Your First Order!
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Use code <span className="font-bold bg-white/20 px-4 py-2 rounded-lg">WELCOME20</span> at checkout
            </p>
            <Link
              to="/"
              className="
                inline-block
                px-10 
                py-4 
                bg-white 
                text-orange-600 
                rounded-xl 
                hover:shadow-xl 
                hover:scale-105 
                active:scale-95
                transition-all 
                duration-300
                font-bold
                text-lg
              "
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomepageSlider;