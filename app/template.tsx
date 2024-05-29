"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";

export default function Template({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    console.log("template");
  }, []);
  return (
    <motion.div
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 0.75 }}
    >
      {children}
    </motion.div>
  );
}
