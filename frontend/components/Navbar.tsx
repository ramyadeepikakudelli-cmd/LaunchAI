import React from 'react';
import Link from 'next/link';

export default function Navbar() {
  return (
    <header className="border-b border-border bg-[#0B0F19]/80 backdrop-blur sticky top-0 z-50 px-6 py-4 flex justify-between items-center">
      <div className="flex items-center gap-3">
        <span className="text-2xl">📡</span>
        <Link href="/" className="text-xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
          LAUNCH AI
        </Link>
        <span className="text-xs bg-blue-500/10 text-blue-400 px-2.5 py-0.5 rounded-full border border-blue-500/20 font-medium ml-2">
          Enterprise Telecom Platform
        </span>
      </div>

      <div className="flex items-center gap-4">
        <div className="text-sm text-gray-400">
          Org: <strong className="text-white">Reliance Jio</strong> • Role: <span className="text-blue-400">Designer</span>
        </div>
        <Link href="/dashboard" className="text-sm bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg font-medium transition">
          Launch Studio
        </Link>
      </div>
    </header>
  );
}
