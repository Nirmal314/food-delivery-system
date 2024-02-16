"use client";

import Image from "next/image";
import React from "react";
import logo from "@/public/logo.png";
import Link from "next/link";

import { Input } from "@/components/ui/input";
import {
  HomeIcon,
  LogInIcon,
  SearchIcon,
  UserRoundPlusIcon,
  UtensilsCrossedIcon,
} from "lucide-react";

const Header = () => {
  return (
    <div className=" py-3 px-20 fixed  flex justify-between items-center top-0 w-full z-50 backdrop-blur-xl">
      <div className="flex items-center">
        <Image src={logo} alt="Logo" height={75} width={75} />
        <p className="text-3xl font-bold text-primary">EatsEase</p>
      </div>
      <div className="flex justify-between items-center space-x-6">
        <Link className="nav-link" href={"/"}>
          <HomeIcon />
          <span className="hidden xl:block">Home</span>
        </Link>
        <Link className="nav-link" href={"/restaurants"}>
          <UtensilsCrossedIcon />
          <span className="hidden xl:block">Restaurants</span>
        </Link>
        <Link className="nav-link" href={"/login"}>
          <LogInIcon />
          <span className="hidden xl:block">Login</span>
        </Link>
        <Link className="nav-link" href={"/signup"}>
          <UserRoundPlusIcon />
          <span className="hidden xl:block">Signup</span>
        </Link>
      </div>
    </div>
  );
};

export default Header;
