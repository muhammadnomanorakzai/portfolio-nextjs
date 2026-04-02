"use client";

import { motion } from "framer-motion";

export default function SectionHeading({ title, subtitle, centered = true }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`mb-6 sm:mb-8 lg:mb-10 ${centered ? "text-center" : ""}`}>
      {/* Badge */}
      {/* <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="inline-block mb-4">
        <span className="px-4 py-1.5 rounded-full bg-gradient-to-r from-primary-600/10 to-pink-600/10 text-primary-600 dark:text-primary-400 text-sm font-medium">
          {title.split(" ")[0]}
        </span>
      </motion.div> */}

      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
        <span className="bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
          {title}
        </span>
      </h2>

      {subtitle && (
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed mt-2 sm:mt-3 px-4 sm:px-0">
          {subtitle}
        </motion.p>
      )}

      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: 60 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className={`h-1 bg-gradient-to-r from-primary-600 to-pink-600 rounded-full mt-6 sm:mt-8 ${centered ? "mx-auto" : ""}`}
      />
    </motion.div>
  );
}
