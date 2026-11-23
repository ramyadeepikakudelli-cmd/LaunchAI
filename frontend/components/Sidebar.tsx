import React from 'react';
import Link from 'next/link';

export default function Sidebar() {
  const links = [
    { label: "Dashboard", href: "/dashboard", icon: "📊" },
    { label: "Campaigns", href: "/campaigns", icon: "🚀" },
    { label: "Brand Studio", href: "/brands", icon: "🏢" },
    { label: "Telecom Plans", href: "/plans", icon: "📱" },
    { label: "Design Editor", href: "/editor", icon: "✏️" },
    { label: "Approvals", href: "/approvals", icon: "✅" },
    { label: "Analytics", href: "/analytics", icon: "📈" },
    { label: "Admin Panel", href: "/admin", icon: "🛡️" },
  ];

  return (
    <aside className="w-64 border-r border-border bg-[#0B0F19] min-h-[calc(100vh-65px)] p-4 flex flex-col justify-between">
      <div className="space-y-1">
        <div className="text-xs uppercase text-gray-500 font-semibold px-3 mb-2">Workspace Navigation</div>
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-300 hover:text-white hover:bg-white/5 transition"
          >
            <span>{link.icon}</span>
            <span>{link.label}</span>
          </Link>
        ))}
      </div>

      <div className="p-3 bg-card border border-border rounded-xl text-xs text-gray-400 space-y-1">
        <div className="font-semibold text-white">Pretrained FLUX.1 Engine</div>
        <div>Zero-cost diffusion pipeline active.</div>
      </div>
    </aside>
  );
}
