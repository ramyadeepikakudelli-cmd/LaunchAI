'use client';

import React from 'react';

export default function AnalyticsPage() {
  const metrics = [
    { label: "Turnaround Time Reduction", value: "98.5%", sub: "4.2s vs 3-5 days manual design", color: "text-blue-400" },
    { label: "Cost Savings per Asset", value: "100%", sub: "Operating on $0 serverless tier", color: "text-green-400" },
    { label: "Brand Compliance Pass Rate", value: "97.8%", sub: "Verified via Brand Guardian", color: "text-purple-400" },
    { label: "Total Creatives Synthesized", value: "148", sub: "Across Jio, Airtel, and Vi", color: "text-amber-400" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-white">Marketing Operations & AI Analytics</h1>
        <p className="text-xs text-gray-400 mt-1">Operational velocity, creative throughput, and turnaround performance</p>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m) => (
          <div key={m.label} className="bg-[#111827] border border-border p-5 rounded-2xl shadow">
            <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">{m.label}</div>
            <div className={`text-3xl font-black mt-2 ${m.color}`}>{m.value}</div>
            <div className="text-[11px] text-gray-500 mt-1">{m.sub}</div>
          </div>
        ))}
      </div>

      {/* Charts & Production Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#111827] border border-border p-6 rounded-2xl shadow space-y-4">
          <h3 className="font-bold text-sm text-white">Campaign Distribution by Operator</h3>
          <div className="space-y-3">
            {[
              { op: "Reliance Jio Infocomm", count: 72, pct: 60, col: "bg-blue-600" },
              { op: "Bharti Airtel Enterprise", count: 48, pct: 30, col: "bg-red-600" },
              { op: "Vodafone Idea (Vi)", count: 28, pct: 10, col: "bg-yellow-500" }
            ].map((o) => (
              <div key={o.op} className="space-y-1">
                <div className="flex justify-between text-xs text-gray-300">
                  <span>{o.op}</span>
                  <span className="font-mono">{o.count} assets ({o.pct}%)</span>
                </div>
                <div className="w-full bg-[#0B0F19] h-2 rounded-full overflow-hidden">
                  <div className={`h-full ${o.col}`} style={{ width: `${o.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#111827] border border-border p-6 rounded-2xl shadow space-y-4">
          <h3 className="font-bold text-sm text-white">Top Creative Aesthetic Themes</h3>
          <div className="space-y-3">
            {[
              { theme: "Futuristic 3D Tech & Hologram", share: "45%" },
              { theme: "Photorealistic Connected Lifestyle", share: "30%" },
              { theme: "Cyberpunk Neon Cityscape", share: "15%" },
              { theme: "Cinematic Modern Luxury", share: "10%" }
            ].map((t) => (
              <div key={t.theme} className="flex justify-between items-center p-3 bg-[#0B0F19] border border-border rounded-xl text-xs">
                <span className="text-gray-300 font-medium">{t.theme}</span>
                <span className="text-blue-400 font-bold font-mono">{t.share}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
