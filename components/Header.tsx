"use client";

import Image from "next/image";
import React, { useEffect } from "react";
import logo from "@/public/logo.png";
import Link from "next/link";

import {
  HomeIcon,
  LogInIcon,
  UserRoundPlusIcon,
  UtensilsCrossedIcon,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "./ui/button";
import LogoutButton from "./LogoutButton";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";

const Header = ({ session, isLoggedIn }: any) => {
  const getInitials = (name: string) => {
    const parts = name.split(" ");

    let initials = "";

    parts.forEach((part: string) => {
      initials += part.charAt(0).toUpperCase();
    });

    return initials;
  };
  return (
    // <div className="py-3 px-20 fixed flex justify-between items-center top-0 w-full z-[100] backdrop-blur-xl">
    <>
      <div className="h-20 fixed flex justify-between items-center top-0 w-full z-[75] opacity-30  bg-white"></div>
      {/* <div className="py-3 px-20 fixed flex justify-between items-center top-0 w-full z-[100] bg-gray-200"> */}
      <div className="py-3 px-20 fixed flex justify-between items-center top-0 w-full z-[100] backdrop-blur-3xl">
        <div className="flex items-center">
          <Image src={logo} alt="Logo" height={75} width={75} />
          <p className="text-3xl font-bold text-primary">EatsEase</p>
        </div>
        {isLoggedIn ? (
          <>
            <div className="flex justify-between items-center space-x-6">
              <Link className="nav-link" href={"/"}>
                <HomeIcon />
                <span className="hidden xl:block">Home</span>
              </Link>
              <Link className="nav-link" href={"/restaurants"}>
                <UtensilsCrossedIcon />
                <span className="hidden xl:block">Restaurants</span>
              </Link>
              <div className="flex items-center justify-center space-x-2">
                <HoverCard>
                  <HoverCardTrigger asChild className="hover:bg-transparent">
                    <Button variant="ghost">
                      <Avatar>
                        <AvatarImage src={session.user.image} />
                        <AvatarFallback>
                          {getInitials(session.user.name)}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-auto">
                    <div className="flex justify-evenly space-x-4">
                      <Avatar>
                        <AvatarImage src={session.user.image} />
                        <AvatarFallback>
                          {getInitials(session.user.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="space-y-1">
                        <h4 className="text-sm font-semibold">
                          {session.user.name}
                        </h4>
                        <p className="text-sm">{session.user.email}</p>
                        <div className="flex items-center pt-2">
                          <LogoutButton />
                        </div>
                      </div>
                    </div>
                  </HoverCardContent>
                </HoverCard>

                {/* <p className="text-lg text-gray-900">{session!.user!.name}</p>
                <Button variant={"default"}>
                  <Link href={"/api/auth/signout"}>Logout</Link>
                </Button> */}
              </div>
            </div>
          </>
        ) : (
          <>
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
          </>
        )}
      </div>
    </>
  );
};

export default Header;
