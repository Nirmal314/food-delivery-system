import LogoutButton from "@/components/LogoutButton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { HomeIcon, UtensilsCrossedIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

const HeaderAdmin = ({ session }: any) => {
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
                  <h4 className="text-sm font-semibold">{session.user.name}</h4>
                  <p className="text-sm">{session.user.email}</p>
                  <div className="flex items-center pt-2">
                    <LogoutButton />
                  </div>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
        </div>
      </div>
    </>
  );
};

export default HeaderAdmin;
