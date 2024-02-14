import Image from "next/image";
import React from "react";
import logo from "@/public/logo.png";

const Header = () => {
  return (
    <>
      <nav className="absolute w-full py-3 px-4 bg-gray-300">
        <div className="flex items-center space-x-3">
          <Image src={logo} alt="Logo" height={75} width={75} />
          <p className="text-3xl font-bold">EatsEase</p>
        </div>
      </nav>
    </>
  );
};

export default Header;
