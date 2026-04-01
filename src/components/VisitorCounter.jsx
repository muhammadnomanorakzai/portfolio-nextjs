"use client";

import { useState, useEffect } from "react";
import { visitorsApi } from "@/lib/api";
import { EyeIcon } from "@heroicons/react/24/outline";

export default function VisitorCounter() {
  const [count, setCount] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const visitorCount = await visitorsApi.getCount(); // ✅ now works
        setCount(visitorCount);
      } catch (error) {
        console.error("Failed to fetch visitor count:", error.message); // ✅ logs real message
      } finally {
        setLoading(false);
      }
    };

    fetchCount();
  }, []);

  if (loading || count === null) return null;

  return (
    <div className="fixed bottom-4 left-4 z-40 bg-white dark:bg-gray-800 rounded-full shadow-lg px-4 py-2 flex items-center gap-2 text-sm">
      <EyeIcon className="w-4 h-4 text-primary-600 dark:text-primary-400" />
      <span className="font-medium">{count.toLocaleString()}</span>
      <span className="text-gray-600 dark:text-gray-400">visitors</span>
    </div>
  );
}
