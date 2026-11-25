'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

function CanvasEditorContent() {
  const searchParams = useSearchParams();
  const bgParam = searchParams.get('bg');

  const [headline, setHeadline] = useState("Experience Truly Unlimited 5G Speeds");
  const [features, setFeatures] = useState("2.5 GB/Day • Zero Throttling • Free JioCinema Pass");
  const [price, setPrice] = useState("₹349");
  const [disclaimer, setDisclaimer] = useState("*Terms apply. 5G speeds vary by city.");
  const [brand, setBrand] = useState("JIO TRUE 5G");
  const [networkTag, setNetworkTag] = useState("TRUE 5G");
  const [badgeColor, setBadgeColor] = useState("#E31B23");
  const [badgePos, setBadgePos] = useState<"br" | "tr" | "bl">("br");
  const [ratio, setRatio] = useState<"1:1" | "9:16" | "16:9">("1:1");

  // Dynamic Background Image URL from Generator
  const [bgUrl, setBgUrl] = useState<string>(
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1024&h=1024&q=85"
  );

  useEffect(() => {
    if (bgParam) {
      setBgUrl(bgParam);
      localStorage.setItem('launch_ai_canvas_bg', bgParam);
    } else {
      const stored = localStorage.getItem('launch_ai_canvas_bg');
      if (stored) {
        setBgUrl(stored);
      }
    }
  }, [bgParam]);

  const handleSaveVersion = () => {
    alert("Saved as Design Version #2 in campaign history!");
  };

  return (
    <div className="space-y-6 pb-12 select-none">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <span>Graphic Design Canvas Studio</span>
            <span className="text-xs bg-purple-500/10 text-purple-400 border border-purple-500/20 px-2 py-0.5 rounded-full font-semibold">
              Layer Compositor
            </span>
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Stamp vector brand tags, price pills, and legal copy over your AI-generated diffusion background.
          </p>
        </div>

        <div className="flex gap-3">
          <Link
            href={`/validation?title=${encodeURIComponent(headline)}&price=${encodeURIComponent(price)}&brand=${encodeURIComponent(brand)}&features=${encodeURIComponent(features)}&disclaimer=${encodeURIComponent(disclaimer)}&bg=${encodeURIComponent(bgUrl)}&badgeColor=${encodeURIComponent(badgeColor)}&ratio=${encodeURIComponent(ratio)}`}
            onClick={() => {
              try {
                localStorage.setItem('launch_ai_audit_campaign_name', headline);
                localStorage.setItem('launch_ai_audit_price', price);
                localStorage.setItem('launch_ai_audit_features', features);
                localStorage.setItem('launch_ai_audit_disclaimer', disclaimer);
                localStorage.setItem('launch_ai_audit_brand', brand);
                localStorage.setItem('launch_ai_audit_bg', bgUrl);
                localStorage.setItem('launch_ai_audit_badgeColor', badgeColor);
                localStorage.setItem('launch_ai_audit_ratio', ratio);
              } catch (e) {}
            }}
            className="gradient-btn-purple text-white font-bold px-4 py-2 rounded-xl text-xs transition shadow flex items-center gap-1.5"
          >
            <span>🛡️</span> Run Brand Guardian Audit →
          </Link>
          <a
            href={bgUrl}
            target="_blank"
            rel="noreferrer"
            download="telecom-campaign-master.jpg"
            className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-4 py-2 rounded-xl text-xs transition shadow flex items-center gap-1.5"
          >
            <span>⬇️</span> Download Master JPEG
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Layer Controls Column (5 cols) */}
        <div className="lg:col-span-5 bg-[#0D121F] border border-white/[0.06] p-6 rounded-2xl space-y-4 shadow-xl">
          <div className="flex justify-between items-center">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Canvas Layer Properties</h3>
            
            {/* Format Ratio Selector */}
            <div className="flex bg-[#121828] border border-white/10 rounded-lg p-0.5 text-[10px]">
              {(["1:1", "9:16", "16:9"] as const).map(r => (
                <button
                  key={r}
                  onClick={() => setRatio(r)}
                  className={`px-2.5 py-1 rounded-md font-bold transition ${
                    ratio === r
                      ? 'bg-blue-600 text-white shadow'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          {/* Background URL input / switcher */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-semibold text-gray-300">Background Visual URL</label>
              <Link href="/generator" className="text-[11px] text-purple-400 hover:text-purple-300 font-semibold">
                ← Pick New Image
              </Link>
            </div>
            <input
              type="text"
              value={bgUrl}
              onChange={(e) => {
                setBgUrl(e.target.value);
                localStorage.setItem('launch_ai_canvas_bg', e.target.value);
              }}
              className="w-full bg-[#121828] border border-white/10 rounded-xl px-3 py-2 text-white text-xs font-mono truncate"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1">Layer 1: Headline Copy</label>
            <input
              type="text"
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
              className="w-full bg-[#121828] border border-white/10 rounded-xl px-3.5 py-2.5 text-white text-xs font-bold focus:outline-none focus:border-purple-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1">Layer 2: Features & Benefits</label>
            <input
              type="text"
              value={features}
              onChange={(e) => setFeatures(e.target.value)}
              className="w-full bg-[#121828] border border-white/10 rounded-xl px-3.5 py-2.5 text-white text-xs focus:outline-none focus:border-purple-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">Layer 3: Price Tag</label>
              <input
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full bg-[#121828] border border-white/10 rounded-xl px-3.5 py-2 text-white text-xs font-mono font-bold focus:outline-none focus:border-purple-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">Price Badge Position</label>
              <select
                value={badgePos}
                onChange={(e) => setBadgePos(e.target.value as any)}
                className="w-full bg-[#121828] border border-white/10 rounded-xl px-3 py-2 text-white text-xs focus:outline-none"
              >
                <option value="br">Bottom-Right</option>
                <option value="tr">Top-Right</option>
                <option value="bl">Bottom-Left</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1">Price Pill Background Color</label>
            <div className="flex gap-2.5">
              {["#E31B23", "#0A2885", "#2563EB", "#10B981", "#F59E0B"].map(col => (
                <button
                  key={col}
                  onClick={() => setBadgeColor(col)}
                  className={`w-7 h-7 rounded-full border-2 transition ${
                    badgeColor === col ? 'border-white scale-110 shadow-lg' : 'border-transparent'
                  }`}
                  style={{ backgroundColor: col }}
                />
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1">Layer 4: Regulatory Small Print</label>
            <input
              type="text"
              value={disclaimer}
              onChange={(e) => setDisclaimer(e.target.value)}
              className="w-full bg-[#121828] border border-white/10 rounded-xl px-3.5 py-2 text-white text-xs font-mono focus:outline-none focus:border-purple-500"
            />
          </div>

          <button
            onClick={handleSaveVersion}
            className="w-full bg-[#141A28] hover:bg-white/10 border border-white/10 text-white font-bold py-2.5 rounded-xl text-xs transition mt-2 cursor-pointer"
          >
            💾 Save Version to History
          </button>
        </div>

        {/* Live Canvas Viewport (7 cols) */}
        <div className="lg:col-span-7 bg-[#0D121F] border border-white/[0.06] p-6 rounded-2xl shadow-xl flex flex-col items-center justify-center">
          
          <div
            className={`relative rounded-2xl overflow-hidden border-2 border-white/10 shadow-2xl flex flex-col justify-between p-6 transition-all ${
              ratio === "1:1"
                ? "w-full max-w-[460px] aspect-square"
                : ratio === "9:16"
                ? "w-[300px] aspect-[9/16]"
                : "w-full max-w-[540px] aspect-[16/9]"
            }`}
          >
            {/* Background Diffusion Image (Dynamically loaded from selected generator variation!) */}
            <img
              src={bgUrl}
              alt="Background Canvas"
              className="absolute inset-0 w-full h-full object-cover"
              loading="eager"
            />

            {/* Gradient Darkening Bars for typography legibility */}
            <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/85 via-black/40 to-transparent pointer-events-none" />
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/90 via-black/50 to-transparent pointer-events-none" />

            {/* Top Brand Header Bar */}
            <div className="relative z-10 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-white"></span>
                <span className="text-xs font-black tracking-wider text-white uppercase font-sans">
                  {brand}
                </span>
              </div>
              <span className="bg-[#E31B23] text-white text-[10px] font-black px-2.5 py-0.5 rounded-md tracking-wider">
                {networkTag}
              </span>
            </div>

            {/* Bottom Content & Price Badge */}
            <div className="relative z-10 space-y-2">
              <h2 className="text-xl sm:text-2xl font-black text-white leading-tight drop-shadow-md">
                {headline}
              </h2>
              <p className="text-xs font-semibold text-gray-200 drop-shadow">
                {features}
              </p>
              <div className="text-[9px] text-gray-400 font-mono pt-1">
                {disclaimer}
              </div>

              {/* Dynamic Price Pill Badge */}
              <div
                className={`absolute transition-all ${
                  badgePos === "br"
                    ? "-bottom-1 -right-2"
                    : badgePos === "tr"
                    ? "-top-32 -right-2"
                    : "-bottom-1 -left-2"
                }`}
              >
                <div
                  className="px-4 py-1.5 rounded-full font-black text-base text-white shadow-2xl flex items-center justify-center border-2 border-white/20 transform hover:scale-105 transition"
                  style={{ backgroundColor: badgeColor }}
                >
                  {price}
                </div>
              </div>
            </div>

          </div>

          <div className="text-xs text-gray-500 font-mono mt-4 text-center">
            Pillow-powered vector typography layer compositor • Active aspect ratio: {ratio}
          </div>

        </div>

      </div>

    </div>
  );
}

export default function EditorPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-white">Loading Canvas Studio...</div>}>
      <CanvasEditorContent />
    </Suspense>
  );
}
