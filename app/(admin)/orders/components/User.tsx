"use client";

import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Getter } from "@tanstack/react-table";

type User = {
  address: string | null;
  contactNumber: string | null;
  email: string | null;
  image: string | null;
  name: string | null;
};
type PageProps = {
  getValue: Getter<unknown>;
};
const User = ({ getValue }: PageProps) => {
  const user: User = getValue() as User;

  const getInitials = (name: string) => {
    const parts = name.split(" ");

    let initials = "";

    parts.forEach((part: string) => {
      initials += part.charAt(0).toUpperCase();
    });

    return initials;
  };
  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            className="hover:bg-transparent transition-colors duration-200 rounded-full"
          >
            <Avatar>
              <AvatarFallback>
                {getInitials(user.name as string)}
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
                src={user.image as string}
                alt={user.name as string}
              />
              <AvatarFallback className="p-4 text-xl">
                {getInitials(user.name as string)}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-2">
              <h4 className="text-base font-semibold text-gray-800">
                {user.name as string}
              </h4>
              <p className="text-xs text-gray-600">{user.email as string}</p>
              <DropdownMenuSeparator />
              <p className="text-xs">
                Contact:
                {user.contactNumber as string}
              </p>
              <p className="text-xs">
                Address:
                {user.address as string}
              </p>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default User;
