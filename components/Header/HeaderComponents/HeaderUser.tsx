import LogoutButton from "@/components/LogoutButton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  HomeIcon,
  ListFilterIcon,
  ListOrdered,
  ListOrderedIcon,
  ShoppingCartIcon,
  UtensilsCrossedIcon,
} from "lucide-react";
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
        <Link className="nav-link" href={"/yourorders"}>
          <ListOrderedIcon />
          <span className="hidden xl:block">Your Orders</span>
        </Link>
        <Sheet>
          <SheetTrigger className="nav-link relative">
            <ShoppingCartIcon />
            <span className="hidden xl:block">Cart</span>
            {/* <div className="absolute w-3 h-3 rounded-full animate-pulse repeat-[4] bg-primary -top-1 right-1"></div> */}
          </SheetTrigger>
          <SheetContent side={"right"} className="z-[100]">
            <SheetHeader>
              <SheetTitle>Your cart</SheetTitle>
              <SheetDescription></SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
        <div className="flex items-center justify-center space-x-2">
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
                <Avatar className="w-16 h-18">
                  <AvatarImage
                    src={session.user.image}
                    alt={session.user.name}
                  />
                  <AvatarFallback className="p-4 text-xl">
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
