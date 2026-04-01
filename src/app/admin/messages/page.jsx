"use client";

import { useState, useEffect } from "react";
import { messagesApi } from "@/lib/api";
import {
  EnvelopeIcon,
  CheckCircleIcon,
  ArchiveBoxIcon,
  TrashIcon,
  EyeIcon,
} from "@heroicons/react/24/outline";

export default function MessagesManagement() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const data = await messagesApi.getAll();
      setMessages(data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (id) => {
    try {
      await messagesApi.markAsRead(id);
      await fetchMessages();
    } catch (error) {
      console.error("Error marking message as read:", error);
    }
  };

  const handleArchive = async (id) => {
    try {
      await messagesApi.archive(id);
      await fetchMessages();
    } catch (error) {
      console.error("Error archiving message:", error);
    }
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this message?")) {
      try {
        await messagesApi.delete(id);
        await fetchMessages();
      } catch (error) {
        console.error("Error deleting message:", error);
      }
    }
  };

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
        <h1 className="text-3xl font-bold">Messages</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          View and manage messages from your contact form
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
        <div className="divide-y dark:divide-gray-700">
          {messages.length === 0 ? (
            <div className="p-12 text-center">
              <EnvelopeIcon className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <p className="text-gray-500">No messages yet</p>
            </div>
          ) : (
            messages.map((message) => (
              <div
                key={message.id}
                className={`p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors ${
                  !message.is_read ? "bg-blue-50 dark:bg-blue-900/10" : ""
                }`}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div
                        className={`w-2 h-2 rounded-full ${!message.is_read ? "bg-blue-500" : "bg-gray-300"}`}
                      />
                      <h3 className="font-semibold text-lg">{message.name}</h3>
                      <span className="text-sm text-gray-500">
                        {new Date(message.created_at).toLocaleString()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      <strong>Email:</strong> {message.email}
                    </p>
                    <p className="text-sm font-medium mb-2">
                      Subject: {message.subject}
                    </p>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      {message.message}
                    </p>
                  </div>

                  <div className="flex gap-2 ml-4">
                    {!message.is_read && (
                      <button
                        onClick={() => handleMarkAsRead(message.id)}
                        className="p-2 text-green-600 hover:bg-green-100 dark:hover:bg-green-900/30 rounded-lg transition-colors"
                        title="Mark as read">
                        <CheckCircleIcon className="w-5 h-5" />
                      </button>
                    )}
                    {!message.is_archived && (
                      <button
                        onClick={() => handleArchive(message.id)}
                        className="p-2 text-yellow-600 hover:bg-yellow-100 dark:hover:bg-yellow-900/30 rounded-lg transition-colors"
                        title="Archive">
                        <ArchiveBoxIcon className="w-5 h-5" />
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(message.id)}
                      className="p-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                      title="Delete">
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
