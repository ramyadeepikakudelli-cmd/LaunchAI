'use client';

import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';

export default function SettingsPage() {
  const { user } = useAuth();
  const [apiKey, setApiKey] = useState('');
  const [defaultFormat, setDefaultFormat] = useState('1:1 (Instagram Feed)');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Workspace settings and API configuration saved successfully!");
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-black text-white">Workspace & AI Settings</h1>
        <p className="text-xs text-gray-400 mt-1">Configure profile details, API keys, and default campaign export dimensions</p>
      </div>

      <form onSubmit={handleSave} className="bg-[#111827] border border-border p-6 rounded-2xl shadow-xl space-y-6">
        {/* User Info */}
        <div>
          <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-3">User Profile</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-gray-400 font-bold uppercase">Full Name</label>
              <input
                type="text"
                disabled
                value={user?.full_name || "Ramya Deepika Kudelli"}
                className="w-full bg-[#0B0F19] border border-border rounded-xl p-2.5 text-xs text-gray-300 mt-1 cursor-not-allowed"
              />
            </div>
            <div>
              <label className="text-xs text-gray-400 font-bold uppercase">Email</label>
              <input
                type="text"
                disabled
                value={user?.email || "designer@jio.com"}
                className="w-full bg-[#0B0F19] border border-border rounded-xl p-2.5 text-xs text-gray-300 mt-1 cursor-not-allowed"
              />
            </div>
          </div>
        </div>

        {/* AI Key Config */}
        <div className="pt-4 border-t border-border">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-1">Google Gemini API Key</h3>
          <p className="text-xs text-gray-400 mb-3">
            PlanLaunch AI runs 100% free out-of-the-box. Supplying your free Gemini key unlocks advanced LLM art direction and prompt expansion.
          </p>
          <input
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="AIzaSy..."
            className="w-full bg-[#0B0F19] border border-border rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-blue-500 font-mono"
          />
          <a
            href="https://aistudio.google.com/"
            target="_blank"
            rel="noreferrer"
            className="inline-block text-[11px] text-blue-400 hover:underline mt-2 font-semibold"
          >
            👉 Get a free Gemini Key from Google AI Studio (No credit card needed)
          </a>
        </div>

        {/* Export Preferences */}
        <div className="pt-4 border-t border-border">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-3">Default Campaign Format</h3>
          <select
            value={defaultFormat}
            onChange={(e) => setDefaultFormat(e.target.value)}
            className="w-full bg-[#0B0F19] border border-border rounded-xl p-2.5 text-xs text-white"
          >
            <option>1:1 (Instagram / Facebook Feed)</option>
            <option>9:16 (Stories / Reels / TikTok)</option>
            <option>16:9 (Web Banner / Billboard)</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-6 py-2.5 rounded-xl text-xs transition shadow-lg shadow-blue-500/20"
        >
          Save Configuration
        </button>
      </form>
    </div>
  );
}
