'use client';

import React, { useState } from 'react';

export default function BrandAssetsPage() {
  const [assets, setAssets] = useState([
    { id: 1, name: "Jio_Logo_White.svg", type: "Vector Logo", brand: "Reliance Jio", size: "124 KB", date: "2026-11-15" },
    { id: 2, name: "5G_True_Network_Badge.png", type: "Network Badge", brand: "Reliance Jio", size: "340 KB", date: "2026-11-18" },
    { id: 3, name: "Airtel_Vermillion_Icon.svg", type: "Vector Logo", brand: "Bharti Airtel", size: "95 KB", date: "2026-11-10" },
    { id: 4, name: "PlusJakartaSans-Bold.ttf", type: "Font File", brand: "Global", size: "1.2 MB", date: "2026-11-01" },
    { id: 5, name: "Vi_Yellow_Giga_Stamp.png", type: "Badge Stamp", brand: "Vodafone Idea", size: "210 KB", date: "2026-11-14" },
  ]);

  const [category, setCategory] = useState("All");

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black text-white">Brand Asset Library</h1>
          <p className="text-xs text-gray-400 mt-1">Upload and organize verified vector logos, typography font files, and campaign badges</p>
        </div>
        <button
          onClick={() => alert("File upload simulation: Drag & drop your SVG/PNG/TTF brand asset.")}
          className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-4 py-2 rounded-xl text-xs transition shadow"
        >
          + Upload Brand Asset
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 text-xs">
        {["All", "Vector Logo", "Network Badge", "Font File", "Badge Stamp"].map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={`px-3 py-1.5 rounded-xl border transition ${
              category === c
                ? "bg-blue-600 border-blue-500 text-white font-bold"
                : "bg-[#111827] border-border text-gray-400 hover:text-white"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Asset Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {assets
          .filter(a => category === "All" || a.type === category)
          .map((a) => (
            <div key={a.id} className="bg-[#111827] border border-border p-4 rounded-2xl flex flex-col justify-between shadow">
              <div className="space-y-3">
                <div className="w-full aspect-[4/3] bg-[#0B0F19] rounded-xl border border-border flex items-center justify-center text-3xl">
                  {a.type.includes("Logo") ? "🏷️" : a.type.includes("Badge") ? "🛡️" : "🔤"}
                </div>
                <div>
                  <h4 className="font-bold text-xs text-white truncate" title={a.name}>{a.name}</h4>
                  <p className="text-[10px] text-gray-400">{a.brand} • {a.type}</p>
                </div>
              </div>

              <div className="flex justify-between items-center text-[10px] text-gray-500 border-t border-border pt-3 mt-3">
                <span>{a.size}</span>
                <button
                  onClick={() => setAssets(assets.filter(x => x.id !== a.id))}
                  className="text-red-400 hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
