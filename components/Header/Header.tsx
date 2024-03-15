"use client";

import Image from "next/image";
import React from "react";
import logo from "@/public/logo.png";
import HeaderNotLoggedIn from "./HeaderComponents/HeaderNotLoggedIn";
import HeaderUser from "./HeaderComponents/HeaderUser";
import HeaderAdmin from "./HeaderComponents/HeaderAdmin";
import { UserRole } from "@prisma/client";

const Header = ({ session }: any) => {
  const isLoggedIn = session ? true : false;
  return (
    <>
      <div className="h-16 fixed flex justify-between items-center top-0 w-full z-[75] opacity-40  bg-white"></div>
      <div className="py-3 px-20 sticky flex justify-between items-center top-0 w-full z-[100] backdrop-blur-3xl">
        <div className="flex items-center">
          <Image src={logo} alt="Logo" height={75} width={75} />
          <p className="text-3xl font-bold text-primary">EatsEase</p>
        </div>
        {!isLoggedIn && <HeaderNotLoggedIn />}

        {isLoggedIn && session.user.role === UserRole.USER && (
          <HeaderUser session={session} />
        )}
        {isLoggedIn && session.user.role === UserRole.ADMIN && (
          <HeaderAdmin session={session} />
        )}
      </div>
    </>
  );
};

export default Header;
