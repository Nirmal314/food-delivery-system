"use client";

import Image from "next/image";
import welcome from "@/public/home-img.jpg";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const searchedItem = e.currentTarget.searchedItem.value;
    router.push(`/searchfood?q=${searchedItem}`);
  };
  return (
    <>
      <div className="relative bg-cover bg-center h-screen w-full">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="absolute space-y-8 inset-0 flex flex-col items-center justify-center text-white z-50"
        >
          <div>
            <p className="text-center text-6xl font-bold text-primary">
              Welcome to EatEase
            </p>
            <p className="text-center text-2xl text-secondary">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p>
          </div>
          <form
            onSubmit={handleSearch}
            className="flex w-full max-w-sm items-center space-x-2"
            name="searchedItem"
          >
            <Input
              className="text-gray-900 text-md"
              type="text"
              placeholder="Search your favorite food..."
            />
            <Button className="rounded-md" type="submit">
              <SearchIcon />
            </Button>
          </form>
        </motion.div>
        <Image
          src={welcome}
          className="w-full h-full object-cover"
          alt="Welcome spices"
        />
      </div>
    </>
  );
}
