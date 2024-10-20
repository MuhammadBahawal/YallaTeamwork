import React, { useState, useEffect, useRef } from 'react';
import products from '../Product.json';
import '../components/caru.css'

const ChevronLeft = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6"></polyline>
  </svg>
);

const ChevronRight = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6"></polyline>
  </svg>
);

const CarouselNew = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + products.length) % products.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full max-w-6xl mx-auto overflow-hidden h-[300px]">
      <div
        className="flex h-full transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {products.map((product, index) => (
          <CarouselItem key={index} product={product} />
        ))}
      </div>
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full transition-transform duration-300 ease-in-out hover:scale-110"
      >
        <ChevronLeft />
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full transition-transform duration-300 ease-in-out hover:scale-110"
      >
        <ChevronRight />
      </button>
    </div>
  );
};

const CarouselItem = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const canvasRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    const image = imageRef.current;

    if (canvas && ctx && image) {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    }
  }, [product.image]);

  const handleMouseMove = (e) => {
    if (!isHovered) return;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');

    if (canvas && ctx) {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(x, y, 20, 0, Math.PI * 2);
      ctx.fill();
    }
  };

  return (
    <div className="flex-shrink-0 w-full h-full relative">
      <img
        ref={imageRef}
        src={product.image}
        alt={product.name}
        className="w-full h-full object-cover"
        style={{ display: 'none' }}
      />
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseMove={handleMouseMove}
      />
      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-4 text-white">
        <h2 className="text-xl font-bold mb-1">{product.name}</h2>
        <p className="text-sm mb-1">{product.description}</p>
        <p className="text-lg font-semibold">${product.price.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default CarouselNew;