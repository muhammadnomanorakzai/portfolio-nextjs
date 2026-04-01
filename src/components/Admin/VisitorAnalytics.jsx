"use client";

import { useState, useEffect } from "react";
import { visitorsApi } from "@/lib/api";
import {
  ChartBarIcon,
  UsersIcon,
  ClockIcon,
  DevicePhoneMobileIcon,
} from "@heroicons/react/24/outline";

export default function VisitorAnalytics() {
  const [analytics, setAnalytics] = useState({
    total: 0,
    today: 0,
    thisWeek: 0,
    thisMonth: 0,
    devices: {},
  });
  const [recentVisitors, setRecentVisitors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const [total, recent] = await Promise.all([
        visitorsApi.getCount(),
        visitorsApi.getRecent(20),
      ]);

      // Calculate today's visitors
      const today = new Date().toDateString();
      const todayVisitors = recent.filter(
        (v) => new Date(v.visited_at).toDateString() === today,
      ).length;

      // Calculate this week's visitors
      const thisWeek = new Date();
      thisWeek.setDate(thisWeek.getDate() - 7);
      const weekVisitors = recent.filter(
        (v) => new Date(v.visited_at) > thisWeek,
      ).length;

      // Calculate device stats
      const devices = {};
      recent.forEach((v) => {
        const device = getDeviceType(v.user_agent);
        devices[device] = (devices[device] || 0) + 1;
      });

      setAnalytics({
        total,
        today: todayVisitors,
        thisWeek: weekVisitors,
        thisMonth: recent.length,
        devices,
      });
      setRecentVisitors(recent.slice(0, 10));
    } catch (error) {
      console.error("Error fetching analytics:", error);
    } finally {
      setLoading(false);
    }
  };

  const getDeviceType = (userAgent) => {
    if (!userAgent) return "Unknown";
    if (userAgent.includes("Mobile")) return "Mobile";
    if (userAgent.includes("Tablet")) return "Tablet";
    return "Desktop";
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleString();
  };

  if (loading) {
    return <div className="text-center py-8">Loading analytics...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <UsersIcon className="w-8 h-8 text-primary-600" />
            <span className="text-2xl font-bold">
              {analytics.total.toLocaleString()}
            </span>
          </div>
          <p className="text-gray-600 dark:text-gray-400">Total Visitors</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <ClockIcon className="w-8 h-8 text-green-600" />
            <span className="text-2xl font-bold">{analytics.today}</span>
          </div>
          <p className="text-gray-600 dark:text-gray-400">Today's Visitors</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <ChartBarIcon className="w-8 h-8 text-blue-600" />
            <span className="text-2xl font-bold">{analytics.thisWeek}</span>
          </div>
          <p className="text-gray-600 dark:text-gray-400">Last 7 Days</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <DevicePhoneMobileIcon className="w-8 h-8 text-purple-600" />
            <span className="text-2xl font-bold">{analytics.thisMonth}</span>
          </div>
          <p className="text-gray-600 dark:text-gray-400">This Month</p>
        </div>
      </div>

      {/* Device Distribution */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
        <h3 className="text-lg font-bold mb-4">Device Distribution</h3>
        <div className="space-y-3">
          {Object.entries(analytics.devices).map(([device, count]) => (
            <div key={device}>
              <div className="flex justify-between mb-1">
                <span>{device}</span>
                <span>{count} visitors</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-primary-600 rounded-full h-2"
                  style={{
                    width: 100,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Visitors */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 border-b dark:border-gray-700">
          <h3 className="text-lg font-bold">Recent Visitors</h3>
        </div>
        <div className="divide-y dark:divide-gray-700">
          {recentVisitors.map((visitor, index) => (
            <div key={index} className="p-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">
                  {visitor.ip_address || "Unknown IP"}
                </p>
                <p className="text-xs text-gray-500">
                  {getDeviceType(visitor.user_agent)}
                </p>
              </div>
              <p className="text-sm text-gray-500">
                {formatDate(visitor.visited_at)}
              </p>
            </div>
          ))}
          {recentVisitors.length === 0 && (
            <div className="p-8 text-center text-gray-500">No visitors yet</div>
          )}
        </div>
      </div>
    </div>
  );
}
