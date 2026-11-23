'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function PromptStudioPage() {
  const [positivePrompt, setPositivePrompt] = useState(
    "Award-winning commercial advertising photography for telecommunications campaign, futuristic 3D tech, featuring young mobile gamer enjoying ultra-fast connectivity, zero ping latency, volumetric ambient light with vibrant blue and crimson reflections, clean negative space at top and bottom for typography, 8k resolution, shot on 35mm lens, sharp focus"
  );
  const [negativePrompt, setNegativePrompt] = useState(
    "blurry, low quality, deformed, distorted, cartoonish, lowres, text, letters, watermark, signature, ugly, bad anatomy"
  );
  const [model, setModel] = useState("FLUX.1-schnell");
  const [seed, setSeed] = useState(42);

  const templates = [
    { title: "5G Gaming & Esports", style: "Cyberpunk Neon & Hologram", seed: 101 },
    { title: "Family Connected Home", style: "Photorealistic Warm Lifestyle", seed: 202 },
    { title: "Corporate Global Roamer", style: "Cinematic Modern Architecture", seed: 303 },
    { title: "Fiber Gigabit Home Internet", style: "Minimalist Nordic Interior", seed: 404 },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black text-white">Prompt Studio</h1>
          <p className="text-xs text-gray-400 mt-1">Structured prompt engineering, positive/negative prompts, and copy-space directives</p>
        </div>
        <Link
          href="/generator"
          className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-4 py-2 rounded-xl text-xs transition shadow"
        >
          Send to Generator →
        </Link>
      </div>

      {/* Preset Templates */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {templates.map((t) => (
          <div
            key={t.title}
            onClick={() => {
              setPositivePrompt(`Award-winning advertising visual for ${t.title}, ${t.style}, cinematic volumetric lighting, clean top and bottom copy space, 8k commercial masterpiece`);
              setSeed(t.seed);
            }}
            className="p-3 bg-[#111827] border border-border hover:border-blue-500/50 rounded-xl cursor-pointer transition text-xs"
          >
            <div className="font-bold text-white mb-0.5">{t.title}</div>
            <div className="text-[10px] text-gray-400">{t.style}</div>
          </div>
        ))}
      </div>

      {/* Prompt Form */}
      <div className="bg-[#111827] border border-border p-6 rounded-2xl space-y-5 shadow-xl">
        <div>
          <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
            Positive Diffusion Prompt (Photographic Scene & Lighting)
          </label>
          <textarea
            rows={5}
            value={positivePrompt}
            onChange={(e) => setPositivePrompt(e.target.value)}
            className="w-full bg-[#0B0F19] border border-border rounded-xl p-3.5 text-xs text-white focus:outline-none focus:border-blue-500 leading-relaxed font-mono"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
            Negative Prompt (Quality & Artifact Exclusions)
          </label>
          <textarea
            rows={2}
            value={negativePrompt}
            onChange={(e) => setNegativePrompt(e.target.value)}
            className="w-full bg-[#0B0F19] border border-border rounded-xl p-3 text-xs text-gray-300 focus:outline-none focus:border-blue-500 font-mono"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">
              Diffusion Model
            </label>
            <select
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className="w-full bg-[#0B0F19] border border-border rounded-xl p-2.5 text-xs text-white"
            >
              <option>FLUX.1-schnell (Recommended - Fast & Free)</option>
              <option>Stable Diffusion XL (SDXL Turbo)</option>
              <option>FLUX.1-dev</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">
              Random Seed (Reproducibility)
            </label>
            <input
              type="number"
              value={seed}
              onChange={(e) => setSeed(Number(e.target.value))}
              className="w-full bg-[#0B0F19] border border-border rounded-xl p-2.5 text-xs text-white font-mono"
            />
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <button
            onClick={() => alert("Prompt saved to organization template memory!")}
            className="bg-[#0B0F19] border border-border hover:bg-white/5 text-white font-semibold px-4 py-2.5 rounded-xl text-xs transition"
          >
            💾 Save to Prompt Library
          </button>
          <Link
            href="/generator"
            className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-bold py-2.5 rounded-xl text-xs text-center transition shadow"
          >
            Launch in AI Generator with this Prompt →
          </Link>
        </div>
      </div>
    </div>
  );
}
