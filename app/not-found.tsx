"use client";

import Image from "next/image";
import React from "react";
import error404 from "@/public/404.webp";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const NotFound = () => {
  const router = useRouter();
  return (
    <div className="w-full h-[85vh] flex flex-col items-center justify-center">
      <Image alt="404" src={error404} height={404} width={404}></Image>
      <div className="flex flex-col items-center justify-center">
        <p className="text-3xl md:text-4xl lg:text-5xl text-gray-800 mt-12">
          Page Not Found
        </p>
        <p className="md:text-lg lg:text-xl text-gray-600 mt-8">
          Sorry, the page you are looking for could not be found.
        </p>
        <Button
          onClick={() => router.push("/")}
          className="flex items-center space-x-2 px-4 py-2 mt-12 rounded transition duration-150"
        >
          <ArrowLeftIcon />
          <span>Return Home</span>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
