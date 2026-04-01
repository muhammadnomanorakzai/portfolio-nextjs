"use client";

import { motion } from "framer-motion";

export default function Card({
  children,
  className = "",
  hover = true,
  onClick,
}) {
  return (
    <motion.div
      whileHover={hover ? { y: -8, scale: 1.02 } : {}}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`
        bg-white dark:bg-gray-800 
        rounded-2xl shadow-lg overflow-hidden
        ${hover ? "cursor-pointer" : ""}
        ${className}
      `}
      onClick={onClick}>
      {children}
    </motion.div>
  );
}
