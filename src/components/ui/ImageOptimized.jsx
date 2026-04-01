"use client";

import { useState } from "react";
import Image from "next/image";

export default function ImageOptimized({ src, alt, className, ...props }) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        className={`
          object-cover transition-all duration-500
          ${isLoading ? "scale-110 blur-sm" : "scale-100 blur-0"}
        `}
        onLoad={() => setIsLoading(false)}
        {...props}
      />
      {isLoading && (
        <div className="absolute inset-0 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 animate-pulse" />
      )}
    </div>
  );
}
