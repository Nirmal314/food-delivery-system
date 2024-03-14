import LogoutButton from "@/components/LogoutButton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { HomeIcon, UtensilsCrossedIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

const HeaderUser = ({ session }: any) => {
  const getInitials = (name: string) => {
    const parts = name.split(" ");

    let initials = "";

    parts.forEach((part: string) => {
      initials += part.charAt(0).toUpperCase();
    });

    return initials;
  };

  const renderUserRole = (userRole: string) => {
    return userRole
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  return (
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
          {/* <HoverCard>
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
                  <h4 className="text-sm font-semibold">{session.user.name}</h4>
                  <p className="text-sm">{session.user.email}</p>
                  <p className="text-sm">{session.user.role}</p>

                  <div className="flex items-center pt-2">
                    <LogoutButton />
                  </div>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard> */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                className="hover:bg-transparent transition-colors duration-200 rounded-full"
              >
                <Avatar>
                  <AvatarImage src={session.user.image} />
                  <AvatarFallback>
                    {getInitials(session.user.name)}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-auto z-[100] shadow-md bg-white rounded-lg p-4 animate-fade-in-80 animate-scale-in-80"
              align="end"
            >
              <div className="flex items-center space-x-4 p-2 rounded-lg bg-white">
                <Avatar className="w-18 h-18">
                  <AvatarImage
                    src={session.user.image}
                    alt={session.user.name}
                  />
                  <AvatarFallback className="flex items-center justify-center bg-gray-300 rounded-full w-full h-full text-lg font-semibold text-gray-800">
                    {getInitials(session.user.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <div>
                    <h4 className="text-base font-semibold text-gray-800">
                      {session.user.name}
                    </h4>
                    <p className="text-xs text-gray-600">
                      {session.user.email}
                    </p>
                  </div>
                  <DropdownMenuSeparator />
                  <p className="text-sm text-gray-600">
                    Role: {renderUserRole(session.user.role)}
                  </p>
                  <div className="flex items-center pt-1">
                    <LogoutButton />
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </>
  );
};

export default HeaderUser;
