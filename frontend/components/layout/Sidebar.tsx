'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

export default function Sidebar() {
  const pathname = usePathname();
  const { user } = useAuth();

  const navigation = [
    { label: "Dashboard", href: "/dashboard", icon: "⊞", isMain: true },
    { label: "Messages", href: "/copilot", icon: "💬", badge: "3" },
    { label: "Inbox", href: "/campaigns", icon: "📥", badge: "15" },
    { label: "Contacts", href: "/plans", icon: "👥" },
    { label: "Campaigns", href: "/campaign-studio", icon: "🚀" },
    { label: "Templates", href: "/generator", icon: "🎨" },
    { label: "Editor", href: "/editor", icon: "✏️" },
    { label: "Reports", href: "/validation", icon: "📊" },
    { label: "Approvals", href: "/approvals", icon: "✅" },
    { label: "Settings", href: "/settings", icon: "⚙️" },
  ];

  return (
    <aside className="w-64 bg-[#0A0D15] border-r border-white/[0.06] flex flex-col justify-between p-4 select-none min-h-[calc(100vh-64px)]">
      <div className="space-y-6">
        
        {/* User Profile Info (matching Screenshot 3) */}
        <div className="flex items-center gap-3 px-2 py-1">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-600 via-indigo-600 to-blue-500 flex items-center justify-center text-white font-bold text-sm shadow-md shadow-purple-500/20">
              {user?.full_name ? user.full_name.charAt(0) : "A"}
            </div>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 absolute bottom-0 right-0 border-2 border-[#0A0D15]"></span>
          </div>
          <div className="overflow-hidden">
            <div className="text-sm font-bold text-white truncate">
              {user?.role || "Admin"}
            </div>
            <div className="text-[11px] text-gray-400 truncate">
              {user?.full_name || "Ramya Deepika Kudelli"}
            </div>
          </div>
        </div>

        {/* Navigation Menu List */}
        <nav className="space-y-1.5">
          {navigation.map((item) => {
            const isActive = pathname === item.href || (item.href === '/generator' && pathname === '/templates');
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${
                  isActive
                    ? 'gradient-btn-purple text-white shadow-lg shadow-purple-600/30 font-bold'
                    : 'text-gray-400 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`text-sm ${isActive ? 'text-white' : 'text-gray-400'}`}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </div>

                {item.badge && (
                  <span className="bg-[#EF4444] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Organization Badge at bottom */}
      <div className="bg-[#101522] border border-white/5 rounded-2xl p-3 text-xs">
        <div className="text-[10px] uppercase font-bold text-gray-500">Enterprise Brand</div>
        <div className="font-bold text-white mt-0.5 truncate">{user?.org_name || "Reliance Jio Infocomm"}</div>
        <div className="text-[10px] text-blue-400 font-mono mt-1">● FLUX.1 + Gemini Flash</div>
      </div>
    </aside>
  );
}
