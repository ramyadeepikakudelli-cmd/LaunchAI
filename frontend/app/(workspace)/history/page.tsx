'use client';

import React from 'react';

export default function HistoryPage() {
  const versions = [
    {
      id: 3,
      campaign: "Diwali 5G SuperSpeed Launch",
      version: "Version #3 (Final Approved)",
      author: "Ramya Kudelli",
      timestamp: "2026-11-20 16:45",
      changes: "Repositioned price pill badge to Bottom-Right; increased legal disclaimer contrast to meet WCAG standards."
    },
    {
      id: 2,
      campaign: "Diwali 5G SuperSpeed Launch",
      version: "Version #2",
      author: "Ramya Kudelli",
      timestamp: "2026-11-20 14:15",
      changes: "Updated headline from 'Super 5G' to 'Experience Truly Unlimited 5G Speeds'."
    },
    {
      id: 1,
      campaign: "Diwali 5G SuperSpeed Launch",
      version: "Version #1 (Initial AI Generation)",
      author: "Ramya Kudelli",
      timestamp: "2026-11-20 11:30",
      changes: "Synthesized raw 3D holographic background via FLUX.1 (Seed #101)."
    }
  ];

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-black text-white">Campaign & Design Version History</h1>
        <p className="text-xs text-gray-400 mt-1">Audit trail of creative revisions, prompt settings, and rollback capabilities</p>
      </div>

      <div className="bg-[#111827] border border-border rounded-2xl p-6 shadow-xl space-y-6">
        <div className="flex justify-between items-center pb-4 border-b border-border">
          <div>
            <h3 className="font-bold text-white text-base">Diwali 5G SuperSpeed Launch</h3>
            <span className="text-xs text-blue-400">Jio True 5G • 5G Gamer (₹349)</span>
          </div>
          <span className="text-xs bg-green-500/10 text-green-400 px-3 py-1 rounded-full border border-green-500/20 font-bold">
            3 Saved Versions
          </span>
        </div>

        <div className="space-y-4">
          {versions.map((v) => (
            <div key={v.id} className="p-4 bg-[#0B0F19] border border-border rounded-xl space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-bold text-sm text-white">{v.version}</span>
                <span className="text-[10px] text-gray-500 font-mono">{v.timestamp}</span>
              </div>
              <p className="text-xs text-gray-300">{v.changes}</p>
              <div className="flex justify-between items-center pt-2 text-[11px] text-gray-500">
                <span>Saved by: <strong>{v.author}</strong></span>
                <button
                  onClick={() => alert(`Restored ${v.version} to Design Canvas!`)}
                  className="text-blue-400 hover:underline font-bold"
                >
                  Rollback to this version ↺
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
