import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaFacebookF, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { AiFillGithub, AiOutlineTwitter } from "react-icons/ai";
import { useSelector } from "react-redux";
import { AiFillShopping, AiFillHeart } from "react-icons/ai";

const Footer = () => {
  const { card_product_count, wishlist_count } = useSelector(
    (state) => state.card
  );
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <footer className="bg-[#FFD700]">
      <div className="w-[85%] flex flex-wrap mx-auto py-16 md-lg:pb-10 sm:pb-6">
        <div className="w-3/12 lg:w-4/12 sm:w-full">
          <div className="flex flex-col gap-3 -mt-5">
            <img
              className="w-[190px] h-[70x]"
              src="/images/logo.png"
              alt="logo"
            />
            <span className="text-#333-800 bold text-xl">
              The Online Shopping Store
            </span>
          </div>
        </div>
        <div className="w-5/12 lg:w-8/12 sm:w-full">
          <div className="flex justify-center sm:justify-start sm:mt-6 w-full">
            <div>
              <h2 className="font-bold text-lg mb-2">Usefull links</h2>
              <div className="flex justify-between gap-[80px] lg:gap-[40px]">
                <ul className="flex flex-col gap-2 text-slate-600 text-sm">
                  <li>
                    <Link to={"/privacy-policy"}> Privacy Policy</Link>
                  </li>
                  <li>
                    <Link to={"/refund-policy"}>Yalla Refund Policy</Link>
                  </li>
                </ul>
                <ul className="flex flex-col gap-2 text-slate-600 text-sm">
                  <li>
                    <Link to={"/shops"}>Shop</Link>
                  </li>
                  <li>
                    <Link to={"/shops"}>All Products</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="w-4/12 lg:w-full lg:mt-6">
          <div className="w-full flex flex-col justify-start gap-5">
            <h2 className="font-bold text-lg mb-2">Join Our</h2>
            <ul className="flex justify-start items-center gap-3">
              <li>
                <a target="blank"
                  className="w-[38px] h-[38px] hover:bg-[#7fad39] hover:text-white flex justify-center items-center bg-white rounded-full"
                  href="https://www.facebook.com/7yalla"
                >
                  <FaFacebookF />
                </a>
              </li>
              <li>
                <a target="blank"
                  className="w-[38px] h-[38px] hover:bg-[#7fad39] hover:text-white flex justify-center items-center bg-white rounded-full"
                  href="https://whatsapp.com/channel/0029VaqJsdl6rsQnJmqKM409"
                >
                  <FaWhatsapp />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="w-[85%] flex flex-wrap justify-center items-center text-slate-600 mx-auto py-5 text-center">
        <span>
          Copiright ©2024 All rights reserved |{" "}
          <a className="text-#333-500 underline" href="https://yalla7.com/">
            Yalla7 | The Online Shoppong Store
          </a>
        </span>
      </div>

      <div className="hidden fixed md-lg:block w-[50px] bottom-3 h-[110px] right-2 bg-white rounded-full p-2">
        <div className="w-full h-full flex gap-3 flex-col justify-center items-center">
          <div
            onClick={() => navigate(userInfo ? "/card" : "/login")}
            className="relative flex justify-center items-center cursor-pointer w-[35px] h-[35px] rounded-full bg-[#e2e2e2]"
          >
            <span className="text-xl text-orange-500">
              <AiFillShopping />
            </span>
            {card_product_count !== 0 && (
              <div className="w-[20px] h-[20px] absolute bg-green-500 rounded-full text-white flex justify-center items-center -top-[3px] -right-[5px]">
                {card_product_count}
              </div>
            )}
          </div>
          <div
            onClick={() =>
              navigate(userInfo ? "/dashboard/my-wishlist" : "/login")
            }
            className="relative flex justify-center items-center cursor-pointer w-[35px] h-[35px] rounded-full bg-[#e2e2e2]"
          >
            <span className="text-xl text-red-500">
              <AiFillHeart />
            </span>
            {wishlist_count !== 0 && (
              <div className="w-[20px] h-[20px] absolute bg-green-500 rounded-full text-white flex justify-center items-center -top-[3px] -right-[5px]">
                {wishlist_count}
              </div>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
