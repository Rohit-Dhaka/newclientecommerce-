import React, { useContext, useState } from "react";
import { assets } from "../assets/assets.js";
import { Link, Navigate, NavLink } from "react-router-dom";
import { ShopContext } from "../context/ShopContext.jsx";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const {
    setShowSearch,
    getCartCount,
    navigate,
    token,
    setToken,
    setCardItems,
  } = useContext(ShopContext);

  const logout = () => {
    navigate("/login");
    localStorage.removeItem("token");
    setToken("");
    setCardItems({});
    navigate("/login");
  };

  const navItems = [
    { path: "/", label: "HOME" },
    { path: "/collection", label: "COLLECTION" },
    { path: "/about", label: "ABOUT" },
    { path: "/contact", label: "CONTACT" },
  ];
  return (
    <div className="flex items-center justify-between py-5 font-medium">
      <Link to="/"  className="z-20">
        <img src={assets.logo} alt="Logo_img" className="w-36 " />
      </Link>

      <ul
        className={`flex lg:gap-5 text-sm text-gray-700 max-lg:absolute max-lg:pt-[80px] max-lg:bg-gray-50 max-lg:w-full max-lg:h-screen  max-lg:top-0 max-lg:flex-col max-lg:items-center   duration-300 ease-linear z-10 ${
          visible ? "show" : "hide"
        }`}
      >
      
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={()=>setVisible(!visible)} 
            className="flex flex-col lg:items-center lg:gap-1 max-lg:py-3 max-lg:w-full max-lg:px-4 max-lg:border-b-[1px] max-lg:border-solid max-lg:border-black"
          >
            <p>{item.label}</p>
          </NavLink>
        ))}
      </ul>

      <div className="flex items-center gap-6">
        <img
          onClick={() => setShowSearch(true)}
          src={assets.search_icon}
          className="w-5 cursor-pointer"
          alt=""
        />
        <div className="group relative">
          <img
            onClick={() => (token ? null : navigate("/login"))}
            src={assets.profile_icon}
            className="w-5 cursor-pointer"
            alt=""
          />
          {token && (
            <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4 ">
              <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded">
                <p className="cursor-pointer hover:text-black">My Profile</p>
                <p
                  onClick={() => navigate("/orders")}
                  className="cursor-pointer hover:text-black"
                >
                  Orders
                </p>
                <p onClick={logout} className="cursor-pointer hover:text-black">
                  Logout
                </p>
              </div>
            </div>
          )}
        </div>

        <Link to="/cart" className="relative">
          <img src={assets.cart_icon} className="w-5 min-w-5" alt="" />
          <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
            {" "}
            {getCartCount()}{" "}
          </p>
        </Link>

        <div
          onClick={() => setVisible(!visible)}
          className="flex  flex-col gap-[5px] items-end z-20 cursor-pointer lg:hidden"
        >
          <span
            className={` ${
              visible ? "  translate-y-[6px] rotate-45" : ""
            } duration-300 ease-linear  w-[20px] rounded-full h-[1.5px] bg-black inline-block`}
          ></span>
          <span
            className={` ${
              visible ? "  translate-x-[-20px]  opacity-0" : ""
            } duration-300 ease-linear  w-[15px] rounded-full h-[1.5px] bg-black inline-block`}
          ></span>
          <span
            className={` ${
              visible ? "  translate-y-[-6px] -rotate-45 w-[20px]" : ""
            } duration-300 ease-linear  w-[10px] rounded-full h-[1.5px] bg-black inline-block`}
          ></span>
        </div>
      </div>

    
    </div>
  );
};

export default Navbar;
