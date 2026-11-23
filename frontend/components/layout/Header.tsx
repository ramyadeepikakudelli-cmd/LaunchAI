'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth, User } from '@/contexts/AuthContext';

export default function Header() {
  const { user, logout, switchOrg, switchRole } = useAuth();

  const orgs = [
    { id: 1, name: "Reliance Jio Infocomm" },
    { id: 2, name: "Bharti Airtel Enterprise" },
    { id: 3, name: "Vodafone Idea (Vi)" }
  ];

  const roles: User['role'][] = ["Admin", "Marketing Manager", "Designer", "Viewer"];

  return (
    <header className="h-16 border-b border-white/[0.06] bg-[#0A0D15]/90 backdrop-blur-xl sticky top-0 z-40 px-6 flex justify-between items-center select-none">
      
      {/* Left: Window Controls & Workspace Name */}
      <div className="flex items-center gap-6">
        {/* macOS style dots (from Screenshot 3) */}
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#EF4444]/90 inline-block"></span>
          <span className="w-3 h-3 rounded-full bg-[#F59E0B]/90 inline-block"></span>
          <span className="w-3 h-3 rounded-full bg-[#10B981]/90 inline-block"></span>
        </div>

        <Link href="/dashboard" className="flex items-center gap-2">
          <span className="text-xl">📡</span>
          <span className="text-base font-black tracking-tight text-white">
            Nexus<span className="text-blue-400">AI</span>
          </span>
          <span className="hidden sm:inline-block text-[10px] bg-purple-500/10 text-purple-400 border border-purple-500/20 px-2 py-0.5 rounded-full font-semibold ml-1">
            Marketing Dashboard
          </span>
        </Link>
      </div>

      {/* Right Header Controls (matching Screenshot 3) */}
      <div className="flex items-center gap-4">
        
        {/* Credits Pill with Buy Credits Button */}
        <div className="flex items-center gap-2 bg-[#121828] border border-white/10 rounded-full px-3 py-1.5 text-xs">
          <div className="flex items-center gap-1.5 text-gray-400">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <line x1="2" y1="10" x2="22" y2="10" />
            </svg>
            <span className="text-[10px] uppercase font-bold tracking-wider">Credits</span>
            <span className="text-white font-extrabold font-mono">1,440</span>
          </div>

          <Link
            href="/settings"
            className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-[10px] px-2.5 py-1 rounded-full transition shadow-sm"
          >
            Buy Credits
          </Link>
        </div>

        {/* Notification Bell */}
        <Link
          href="/notifications"
          className="relative w-9 h-9 rounded-xl bg-[#121828] border border-white/10 flex items-center justify-center text-gray-300 hover:text-white transition"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
          </svg>
          <span className="w-2 h-2 rounded-full bg-red-500 absolute top-2 right-2 ring-2 ring-[#121828]"></span>
        </Link>

        {/* Language Switcher ENG */}
        <div className="hidden sm:flex items-center gap-1.5 bg-[#121828] border border-white/10 rounded-xl px-3 py-1.5 text-xs text-gray-300 font-semibold cursor-pointer hover:border-white/20 transition">
          <span>⚙️</span>
          <span>ENG</span>
        </div>

        {/* Logout */}
        <button
          onClick={logout}
          className="text-xs text-gray-400 hover:text-red-400 font-semibold transition px-2 py-1"
          title="Sign Out"
        >
          Sign Out
        </button>
      </div>

    </header>
  );
}
