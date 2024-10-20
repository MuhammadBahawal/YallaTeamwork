import React, { useState } from "react";
import {
  FaUser,
  FaLock,
  FaList,
  FaBars,
  FaTimes,
  FaHeadset,
  FaStore,
} from "react-icons/fa"; // Updated shop icon
import {
  AiFillShopping,
  AiOutlineShopping,
  AiOutlineSearch,
  AiFillHeart,
} from "react-icons/ai"; // Shopping and search icons
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Headers = () => {
  const navigate = useNavigate();
  const { categorys } = useSelector((state) => state.home);
  const { userInfo } = useSelector((state) => state.auth);
  const { card_product_count, wishlist_count } = useSelector(
    (state) => state.card
  );

  const [categoryShow, setCategoryShow] = useState(false);
  const [supportShow, setSupportShow] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [category, setCategory] = useState("");

  const search = () => {
    navigate(`/products/search?category=${category}&&value=${searchValue}`);
  };

  const redirectCardPage = () => {
    if (userInfo) {
      navigate(`/card`);
    } else {
      navigate(`/login`);
    }
  };

  return (
    <>
    <div className="w-full bg-[#FFD700]  justify-between">
      <div className="w-[85%] lg:w-[90%] mx-12 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/">
            <img
              src="/images/logo.png"
              alt="logo"
              className="w-[100px] rounded-[4px] "
            />
          </Link>

          {/* Full Navigation Links for small screens */}
          <ul
            className={`lg:hidden flex justify-between  gap-6 text-sm font-bold uppercase text-[#333]`}
          >
            <li>
              <Link to="/shops" className="nav-link flex items-center gap-1 ">
                <FaStore />
                Shop
              </Link>
            </li>
            <li
              className="relative"
              onMouseEnter={() => setCategoryShow(true)}
              onMouseLeave={() => setCategoryShow(false)}
            >
              {/* Category Dropdown */}
              <div className="cursor-pointer flex items-center gap-2">
                <FaList />
                <span>All Category</span>
                <MdOutlineKeyboardArrowDown />
              </div>
              {/* Dropdown content */}
              {categoryShow && (
                <div className="absolute z-10 bg-white border rounded-md shadow-lg mb-[80px] w-48">
                  <ul>
                    {categorys.map((c, i) => (
                      <li
                        key={i}
                        className="flex justify-start items-center gap-2 px-[24px] py-[6px]"
                      >
                        <img
                          src={c.image}
                          className="w-[30px] h-[30px] rounded-full overflow-hidden"
                          alt={c.name}
                        />
                        <Link
                          to={`/products?category=${c.name}`}
                          className="text-sm block"
                        >
                          {c.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          </ul>

          {/* Search Bar and Customer Support Dropdown for small screens */}
          <div className="lg:hidden flex items-center justify-between">
            <div className="flex items-center  overflow-hidden justify-between">
              <input
                type="text"
                placeholder="What do you need from here?"
                className="px-4 py-2 outline-none w-[600px] text-sm text-black bg-#ffffff" // Set background to transparent
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
              <button
                onClick={search}
                className="bg-[#333] px-4 py-2 text-white flex items-center"
              >
                {" "}
                {/* Updated button styles */}
                <AiOutlineSearch
                  className="text-lg"
                  style={{ color: "#FFD700" }}
                />{" "}
                {/* Search icon color updated */}
              </button>
            </div>

            {/* Add space between search bar and customer support button */}
            <div className="mx-2" />

            {/* Customer Support Dropdown */}
            <div
              className="relative ml-2 left-2"
              onMouseEnter={() => setSupportShow(true)}
              onMouseLeave={() => setSupportShow(false)}
            >
              <div className="cursor-pointer flex items-center gap-1">
                <FaHeadset className="text-gray-700" />
                <span className="text-sm font-bold">Policies</span>
                <MdOutlineKeyboardArrowDown />
              </div>
              {/* Dropdown content */}
              {supportShow && (
                <div className="absolute z-10 bg-white border rounded-md shadow-lg  w-48">
                  <ul>
                    <li className="px-4 py-2 hover:bg-gray-200">
                      <Link to="/privacy-policy" className="block">
                        Privacy Policy
                      </Link>
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-200">
                      <Link to="/refund-policy" className="block">
                        Refund Policy
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* User Links and Cart for small screens */}
          <div className="lg:hidden flex items-center gap-3">
            {userInfo ? (
              <Link to="/dashboard" className="flex items-center gap-2">
                <FaUser />
                <span>{userInfo.name}</span>
              </Link>
            ) : (
              <Link to="/login" className="flex items-center gap-2 ">
                <FaLock />
                <span>Login</span>
              </Link>
            )}

            {/* Cart */}
            <div onClick={redirectCardPage} className="relative cursor-pointer">
              <AiFillShopping
                className="text-3xl"
                style={{
                  backgroundColor: "#e6c200",
                  color: "#333",
                  padding: "8px",
                  borderRadius: "50%",
                  width: "35px",
                  height: "35px",
                }}
              />
              {card_product_count > 0 && (
                <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs rounded-full px-2 py-1">
                  {card_product_count}
                </span>
              )}
            </div>

            {/* Wish List On Small Screen */}
            <div
              onClick={() =>
                navigate(userInfo ? "/dashboard/my-wishlist" : "/login")
              }
              className="relative cursor-pointer"
            >
              <AiFillHeart
                className="text-3xl"
                style={{
                  backgroundColor: "#e6c200",
                  color: "red",
                  padding: "8px",
                  borderRadius: "50%",
                  width: "35px",
                  height: "35px",
                }}
              />
              {wishlist_count !== 0 && (
                <div
                  className="absolute -top-2 -right-2 bg-green-500 text-white text-xs rounded-full flex justify-center items-center"
                  style={{ width: "20px", height: "20px" }}
                >
                  {wishlist_count}
                </div>
              )}
            </div>
          </div>

          {/* Hamburger Icon for large screens */}
          <div className="hidden lg:block">
            <button onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? (
                <FaTimes className="text-2xl" />
              ) : (
                <FaBars className="text-2xl" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu - Full screen and slides in from the left */}
        <div
          className={`hidden lg:flex fixed top-0 left-0 w-[75%] h-full bg-white z-[1050] p-8 transition-transform transform ${
            menuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <ul className="flex flex-col gap-4">
            <li>
              <Link
                to="/shops"
                className="nav-link flex items-center gap-1"
                onClick={() => setMenuOpen(false)}
              >
                <FaStore /> {/* Updated shop icon */}
                Shop
              </Link>
            </li>
            <li
              className="relative"
              onMouseEnter={() => setCategoryShow(true)}
              onMouseLeave={() => setCategoryShow(false)}
            >
              <div className="flex items-center gap-2 cursor-pointer">
                <FaList />
                <span className="nav-link">All Category</span>
                <MdOutlineKeyboardArrowDown />
              </div>
              {categoryShow && (
                <div className="absolute z-10 bg-white border rounded-md shadow-lg mb-[80px] w-48">
                  <ul>
                    {categorys.map((c, i) => (
                      <li
                        key={i}
                        className="flex justify-start items-center gap-2 px-[24px] py-[6px]"
                      >
                        <img
                          src={c.image}
                          className="w-[30px] h-[30px] rounded-full overflow-hidden object-cover"
                          alt={c.name}
                        />
                        <Link
                          to={`/products?category=${c.name}`}
                          className="text-sm block"
                        >
                          {c.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>

            {/* Search Bar in desktop view */}
            <li>
              <div className="flex items-center border border-gray-300 rounded-full overflow-hidden">
                <input
                  type="text"
                  placeholder="What do you need here?"
                  className="px-4 py-2 outline-none w-full text-sm text-black bg-transparent" // Set background to transparent
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                />
                <button
                  onClick={search}
                  className="bg-[#333] px-4 py-2 text-white flex items-center"
                >
                  {" "}
                  {/* Updated button styles */}
                  <AiOutlineSearch
                    className="text-lg"
                    style={{ color: "#FFD700" }}
                  />{" "}
                  {/* Search icon color updated */}
                </button>
              </div>
            </li>

            {/* Customer Support Dropdown in Desktop View */}
            <li
              className="relative"
              onMouseEnter={() => setSupportShow(true)}
              onMouseLeave={() => setSupportShow(false)}
            >
              <div className="flex items-center gap-2 cursor-pointer">
                <FaHeadset className="text-gray-700" />
                <span className="text-sm font-bold">Policies</span>
                <MdOutlineKeyboardArrowDown />
              </div>
              {supportShow && (
                <div className="absolute z-10 bg-white border rounded-md shadow-lg mt-1 w-48">
                  <ul>
                    <li className="px-4 py-2 hover:bg-gray-200">
                      <Link to="/privacy-policy" className="block">
                        Privacy Policy
                      </Link>
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-200">
                      <Link to="/refund-policy" className="block">
                        Refund Policy
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </li>

            {/* User Links and Cart */}
            <li>
              {userInfo ? (
                <Link
                  to="/dashboard"
                  className="flex items-center gap-2"
                  onClick={() => setMenuOpen(false)}
                >
                  <FaUser />
                  <span>{userInfo.name}</span>
                </Link>
              ) : (
                <Link
                  to="/login"
                  className="flex items-center gap-2"
                  onClick={() => setMenuOpen(false)}
                >
                  <FaLock />
                  <span>Login</span>
                </Link>
              )}
            </li>
            <li onClick={redirectCardPage} className="relative cursor-pointer">
              <AiFillShopping
                className="text-3xl"
                style={{
                  backgroundColor: "#e6c200",
                  color: "#333",
                  padding: "8px",
                  borderRadius: "50%",
                  width: "35px",
                  height: "35px",
                }}
              />
              {card_product_count > 0 && (
                <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs rounded-full px-2 py-1">
                  {card_product_count}
                </span>
              )}
            </li>
            
            {/* Wish List On Small Screen */}
            <li
              onClick={() =>
                navigate(userInfo ? "/dashboard/my-wishlist" : "/login")
              }
              className="relative cursor-pointer"
            >
              <AiFillHeart
                className="text-3xl"
                style={{
                  backgroundColor: "#e6c200",
                  color: "red",
                  padding: "9px",
                  borderRadius: "50%",
                  width: "35px",
                  height: "35px",
                }}
              />
              {wishlist_count !== 0 && (
                <div
                  className="absolute -top-2 -right-2 bg-green-500 text-white text-xs rounded-full flex justify-center items-center"
                  style={{ width: "20px", height: "20px" }}
                >
                  {wishlist_count}
                </div>
                
              )}
            
            </li>
      
          </ul>
          
        </div>
        
      </div>
      
    </div>
    <div className="bg-black h-6 w-full overflow-hidden flex items-center shadow-md">
  <marquee behavior="scroll" direction="left" className="text-white text-lg  tracking-wide">
    <span className="mx-4">✨ Welcome to yalla7.com! ✨</span>
    <span className="mx-4">📱 Download our app from the App Store and Play Store!</span>
    <span className="mx-4">🌟 Enjoy exclusive offers and discounts!</span>
    <span className="mx-4">🎉 Join us and experience the best service!</span>
  </marquee>
</div>






    <div className="flex  items-center gap-6 bg-yellow-400 p-4 text-black text-center lg:text-left">
  <div className="flex items-center space-x-2">
    <h1 className="font-bold text-lg lg:text-xl">15% Cashback</h1>
    <span className="text-lg lg:text-xl">+</span>
    <h1 className="font-bold text-lg lg:text-xl">Free Delivery</h1>
  </div>
  <h2 className="text-sm lg:text-base">On your 1st order</h2>
  
  <img src="/images/logo.png" alt="Logo" className="w-24 lg:w-32 h-auto" />
  
  <h1 className="font-bold text-lg lg:text-xl">Refer your friend to get discount</h1>
  
  {/* Marquee with Text and Images */}
  <div className="overflow-hidden h-20 w-[400px] relative ml-50">
    <div className="absolute animate-marquee ml-50">
      <p className="flex items-center space-x-2">
        <img src="/images/small-image1.png" alt="Small 1" className="w-6 h-6" />
        <span>Exclusive Offer!</span>
        <img src="/images/small-image2.png" alt="Small 2" className="w-6 h-6" />
        <span>Limited Time Only!</span>
      </p>
    </div>
  </div>
  
</div>

<style jsx>{`
  @keyframes marquee {
    0% {
      transform: translateY(100%);
    }
    100% {
      transform: translateY(-100%);
    }
  }

  .animate-marquee {
    animation: marquee 5s linear infinite;
  }
`}</style>


    </>
  
  );
};

export default Headers;
