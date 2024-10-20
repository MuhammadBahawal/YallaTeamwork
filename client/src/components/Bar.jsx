import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos"; // New Left Arrow Icon
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos"; // New Right Arrow Icon
import Slider from "react-slick";

const CategoryCarousel = () => {
  const { categorys } = useSelector((state) => state.home); // Fetch categories from Redux

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 4 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="w-full bg-white shadow-md border-b py-1">
      <div className="container mx-auto px-4">
        <Slider {...settings}>
          {categorys && categorys.length > 0 ? (
            categorys.map((c, i) => (
              <div key={i} className="flex items-center justify-center px-1">
                <Link
                  to={`/products?category=${c.name}`}
                  className="w-full h-10 flex items-center justify-center gap-2 shadow-md text-sm font-medium hover:bg-gray-900 hover:text-white transition hover:border border-gray-300"
                >
                  {c.name}
                </Link>
              </div>
            ))
          ) : (
            <div className="text-sm italic text-gray-500">
              No categories available.
            </div>
          )}
        </Slider>
      </div>
    </div>
  );
};

// Custom Next Arrow Component
const SampleNextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} absolute top-1/2 right-3 transform -translate-y-1/2 bg-gray-100 rounded-full shadow-lg hover:bg-gray-900 cursor-pointer`}
      style={{ ...style, padding: "8px", zIndex: 2 }}
      onClick={onClick}
    >
      <ArrowForwardIosIcon fontSize="large " />
    </div>
  );
};

// Custom Previous Arrow Component
const SamplePrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} absolute top-1/2 left-3 transform -translate-y-1/2 bg-gray-100 rounded-full shadow-lg hover:bg-gray-300 cursor-pointer`}
      style={{ ...style, padding: "8px", zIndex: 2 }}
      onClick={onClick}
    >
      <ArrowBackIosIcon fontSize="large" />
    </div>
  );
};

export default CategoryCarousel;
