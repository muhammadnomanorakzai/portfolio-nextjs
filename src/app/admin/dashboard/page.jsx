"use client";

import { useState, useEffect } from "react";
import { projectsApi, messagesApi, visitorsApi } from "@/lib/api";
import {
  FolderIcon,
  EnvelopeIcon,
  EyeIcon,
  PlusIcon,
  // TrendingUpIcon,
  ArrowTrendingUpIcon,
} from "@heroicons/react/24/outline";

export default function Dashboard() {
  const [stats, setStats] = useState({
    projects: 0,
    messages: 0,
    unreadMessages: 0,
    visitors: 0,
  });
  const [loading, setLoading] = useState(true);
  const [recentMessages, setRecentMessages] = useState([]);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [projects, messages, visitors] = await Promise.all([
        projectsApi.getAll(),
        messagesApi.getAll(),
        visitorsApi.getCount(),
      ]);

      const unreadMessages = messages.filter((m) => !m.is_read).length;

      setStats({
        projects: projects.length,
        messages: messages.length,
        unreadMessages,
        visitors,
      });

      setRecentMessages(messages.slice(0, 5));
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: "Total Projects",
      value: stats.projects,
      icon: FolderIcon,
      color: "bg-blue-500",
      bgColor: "bg-blue-100 dark:bg-blue-900/30",
    },
    {
      title: "Total Messages",
      value: stats.messages,
      icon: EnvelopeIcon,
      color: "bg-green-500",
      bgColor: "bg-green-100 dark:bg-green-900/30",
    },
    {
      title: "Unread Messages",
      value: stats.unreadMessages,
      icon: EnvelopeIcon,
      color: "bg-red-500",
      bgColor: "bg-red-100 dark:bg-red-900/30",
    },
    {
      title: "Total Visitors",
      value: stats.visitors,
      icon: EyeIcon,
      color: "bg-purple-500",
      bgColor: "bg-purple-100 dark:bg-purple-900/30",
    },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Welcome back! Here's what's happening with your portfolio.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat) => (
          <div
            key={stat.title}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <ArrowTrendingUpIcon className="w-5 h-5 text-green-500" />
            </div>
            <h3 className="text-2xl font-bold">
              {stat.value.toLocaleString()}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
              {stat.title}
            </p>
          </div>
        ))}
      </div>

      {/* Recent Messages */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
        <div className="p-6 border-b dark:border-gray-700">
          <h2 className="text-xl font-bold">Recent Messages</h2>
        </div>
        <div className="divide-y dark:divide-gray-700">
          {recentMessages.length === 0 ? (
            <div className="p-6 text-center text-gray-500">No messages yet</div>
          ) : (
            recentMessages.map((message) => (
              <div
                key={message.id}
                className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-2 h-2 rounded-full ${!message.is_read ? "bg-green-500" : "bg-gray-300"}`}
                    />
                    <h3 className="font-semibold">{message.name}</h3>
                  </div>
                  <span className="text-sm text-gray-500">
                    {new Date(message.created_at).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  <strong>Subject:</strong> {message.subject}
                </p>
                <p className="text-sm text-gray-500 line-clamp-2">
                  {message.message}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
