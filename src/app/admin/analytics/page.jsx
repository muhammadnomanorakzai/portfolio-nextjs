"use client";

import VisitorAnalytics from "@/components/Admin/VisitorAnalytics";

export default function AnalyticsPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Analytics</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Track visitor statistics and engagement metrics
        </p>
      </div>

      <VisitorAnalytics />
    </div>
  );
}
