import {
  HandPlatterIcon,
  HomeIcon,
  LogInIcon,
  UserRoundPlusIcon,
  UtensilsCrossedIcon,
} from "lucide-react";
import Link from "next/link";
import React from "react";

const HeaderNotLoggedIn = () => {
  return (
    <>
      <div className="flex justify-between items-center space-x-6">
        <Link aria-label="Home" className="nav-link" href={"/"}>
          <HomeIcon />
          <span className="hidden xl:block">Home</span>
        </Link>
        <Link
          aria-label="Restaurants"
          className="nav-link"
          href={"/restaurants"}
        >
          <UtensilsCrossedIcon />
          <span className="hidden xl:block">Restaurants</span>
        </Link>
        <Link aria-label="Login" className="nav-link" href={"/login"}>
          <LogInIcon />
          <span className="hidden xl:block">Login</span>
        </Link>
        <Link aria-label="Signup" className="nav-link" href={"/signup"}>
          <UserRoundPlusIcon />
          <span className="hidden xl:block">Signup</span>
        </Link>
        <Link
          aria-label="Register restaurant"
          className="nav-link"
          href={"/adminsignup"}
        >
          <HandPlatterIcon />
          <span className="hidden xl:block">Register restaurant</span>
        </Link>
      </div>
    </>
  );
};

export default HeaderNotLoggedIn;
