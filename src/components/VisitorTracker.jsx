"use client";

import { useEffect, useState } from "react";
import { visitorsApi } from "@/lib/api";

export default function VisitorTracker() {
  const [consent, setConsent] = useState(null);

  useEffect(() => {
    // Check if user has already given consent
    const storedConsent = localStorage.getItem("analytics_consent");
    setConsent(storedConsent === "true");
  }, []);

  useEffect(() => {
    if (consent !== true) return; // Don't track without consent

    const trackVisitor = async () => {
      try {
        // Get visitor IP (you might want to use a service like ipapi.co)
        const response = await fetch("https://api.ipify.org?format=json");
        const data = await response.json();

        await visitorsApi.track({
          ip_address: data.ip,
          user_agent: navigator.userAgent,
          page_visited: window.location.pathname,
        });
      } catch (error) {
        console.error("Failed to track visitor:", error);
      }
    };

    trackVisitor();
  }, [consent]);

  // Show consent banner if not yet given
  if (consent === null) return null;
  
  if (consent === false) {
    return (
      <div className="fixed bottom-20 left-4 z-40 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 max-w-xs border border-gray-200 dark:border-gray-700">
        <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
          We use analytics to improve your experience. Enable visitor tracking?
        </p>
        <div className="flex gap-2">
          <button
            onClick={() => {
              localStorage.setItem("analytics_consent", "true");
              setConsent(true);
            }}
            className="flex-1 px-3 py-1.5 text-sm bg-primary-600 text-white rounded hover:bg-primary-700 transition"
          >
            Accept
          </button>
          <button
            onClick={() => {
              localStorage.setItem("analytics_consent", "false");
              setConsent(false);
            }}
            className="flex-1 px-3 py-1.5 text-sm bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          >
            Decline
          </button>
        </div>
      </div>
    );
  }

  return null; // Already consented - no UI needed
}
