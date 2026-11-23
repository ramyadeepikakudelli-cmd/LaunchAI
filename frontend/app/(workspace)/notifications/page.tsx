'use client';

import React, { useState } from 'react';

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Campaign Approved for Release",
      desc: "Diwali 5G SuperSpeed Launch was approved by Marketing Manager Rajesh Sharma.",
      time: "10 mins ago",
      type: "success",
      read: false
    },
    {
      id: 2,
      title: "AI Generation Completed",
      desc: "4 FLUX.1 variations were synthesized for IPL Cricket Super Bonanza.",
      time: "1 hour ago",
      type: "info",
      read: false
    },
    {
      id: 3,
      title: "Approval Requested",
      desc: "Lead Designer Ramya Kudelli submitted Diwali 5G SuperSpeed Launch for review.",
      time: "2 hours ago",
      type: "warning",
      read: true
    },
    {
      id: 4,
      title: "Brand Guideline Updated",
      desc: "New primary color accent #0A2885 locked for Reliance Jio True 5G.",
      time: "1 day ago",
      type: "info",
      read: true
    }
  ]);

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black text-white">Notifications & Activity Alerts</h1>
          <p className="text-xs text-gray-400 mt-1">Real-time alerts for image generation completions, approval requests, and brand updates</p>
        </div>
        <button
          onClick={markAllRead}
          className="bg-[#111827] border border-border hover:bg-white/5 text-gray-300 font-semibold px-4 py-2 rounded-xl text-xs transition"
        >
          Mark All as Read
        </button>
      </div>

      <div className="bg-[#111827] border border-border rounded-2xl divide-y divide-border overflow-hidden shadow-xl">
        {notifications.map((n) => (
          <div
            key={n.id}
            className={`p-4 flex items-start gap-4 transition ${n.read ? 'bg-[#111827]' : 'bg-blue-950/20'}`}
          >
            <span className="text-xl">
              {n.type === 'success' ? '✅' : n.type === 'warning' ? '⚠️' : '🔔'}
            </span>
            <div className="flex-1">
              <div className="flex justify-between items-center">
                <h4 className="text-xs font-bold text-white">{n.title}</h4>
                <span className="text-[10px] text-gray-500 font-mono">{n.time}</span>
              </div>
              <p className="text-xs text-gray-300 mt-0.5">{n.desc}</p>
            </div>
            {!n.read && (
              <span className="w-2 h-2 rounded-full bg-blue-500 mt-1 shrink-0"></span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
