"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const Nav = () => {
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);

 
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div>
      <div className="relative flex items-center justify-between px-6 py-4 shadow-lg bg-gray-800">
        <div className="flex items-center w-[30px] space-x-4">
        
          <Image
            src="/Lovepik.png"
            alt="menu icon"
            width={100}
            height={80}
            className="w-auto h-auto scale-200 transition-transform"
          />

        
          <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-600 shadow-2xl tracking-wider transition-all">
            Movie
          </h1>
        </div>

        
        <button onClick={toggleMenu} className="md:hidden">
          <Image src="/hamburger.svg" alt="menu icon" width={30} height={30} />
        </button>

        
        <div className="flex ml-auto gap-4 hidden md:flex">
          <Link href="/">
            <p className="text-white">Home</p>
          </Link>
          <Link href="/Cart">
            <p className="text-white">Cart</p>
          </Link>
          <p className="text-white">Menu2</p>
          <p className="text-white">Menu3</p>
          <p className="text-white">Menu4</p>
        </div>
      </div>

     
      {isMenuOpen && (
        <div
          className="absolute top-20 right-0 w-[60%] bg-gray-800 p-4 md:hidden z-50"
          style={{ zIndex: 9999 }} 
        >
          <ul className="space-y-3">
            <li>
              <Link href="/">
                <p className="text-white">Home</p>
              </Link>
            </li>
            <li>
              <Link href="/Cart">
                <p className="text-white">Cart</p>
              </Link>
            </li>
            <li>
              <p className="text-white">Menu2</p>
            </li>
            <li>
              <p className="text-white">Menu3</p>
            </li>
            <li>
              <p className="text-white">Menu4</p>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Nav;
