"use client";

import React, { useState } from "react";
import Link from "next/link";

export interface GeneratedImage {
  seed: number;
  theme: string;
  url: string;
  isAi: boolean;
  prompt: string;
}

export default function GeneratorPage() {
  const [prompt, setPrompt] = useState(
    "Cinematic commercial telecom visual for ultra-fast 5G True Unlimited network, a young creator streaming live 8K holographic video via futuristic AR smart glasses from an illuminated rooftop lounge at twilight, glowing cyan and magenta 5G data waves beaming towards an orbital satellite, vibrant neon city skyline with hyper-detailed bokeh, commercial advertising lighting, photorealistic 8k"
  );
  
  const [format, setFormat] = useState("1:1 (Instagram Feed / Post)");
  const [isGenerating, setIsGenerating] = useState(false);
  const [genError, setGenError] = useState("");
  const [successNotice, setSuccessNotice] = useState("");
  const [generationCount, setGenerationCount] = useState(1);

  // Single Focused Hero Image state
  const [currentImage, setCurrentImage] = useState<GeneratedImage>({
    seed: 48920,
    theme: "Rooftop Twilight AR Glasses 5G Streaming",
    url: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=1200&h=1200&q=85",
    isAi: false,
    prompt: "Cinematic commercial telecom visual for ultra-fast 5G True Unlimited network..."
  });

  const presets = [
    {
      name: "🕶️ AR Glasses & Rooftop Creator",
      prompt: "Cinematic commercial telecom visual for ultra-fast 5G True Unlimited network, a young creator streaming live 8K holographic video via futuristic AR smart glasses from an illuminated rooftop lounge at twilight, glowing cyan and magenta 5G data waves beaming towards an orbital satellite, vibrant neon city skyline with hyper-detailed bokeh, commercial advertising lighting, photorealistic 8k"
    },
    {
      name: "🛰️ Satellite 5G SpaceFiber",
      prompt: "Commercial telecommunications visual for JioSpaceFiber satellite internet, high-tech orbital communication satellite revolving around Earth with solar panels catching sun glare, beaming glowing electric blue lasers to smartphone, 8k render"
    },
    {
      name: "🚗 5G Autonomous Car",
      prompt: "Futuristic 5G connected autonomous electric car cruising on highway at night, neon light streaks, glowing telemetry HUD on windshield, ultra-detailed 8k"
    },
    {
      name: "🚅 High-Speed Bullet Train",
      prompt: "Sleek aerodynamic high-speed bullet train racing across an illuminated futuristic viaduct at dusk, passengers browsing seamless 5G gigabit Wi-Fi, glowing cyan telemetry streams, dynamic motion blur, 8k photography"
    },
    {
      name: "🏏 IPL Cricket Night Stadium",
      prompt: "Packed cricket stadium under towering floodlights during a night tournament, 80,000 cheering fans with glowing phone screens, high-speed 5G instant multi-angle replay streaming on flagship smartphone, electric crowd energy, 8k"
    },
    {
      name: "🌾 5G Smart Agriculture",
      prompt: "Lush green agricultural farmlands bathed in golden hour sunrise, autonomous smart agricultural drones scanning crops with glowing emerald laser grids and 5G sensor nodes, automated smart irrigation, modern farmer with rugged tablet, 8k"
    },
    {
      name: "🌊 Subsea Ocean Fiber Cable",
      prompt: "Luminous underwater optical fiber communication cables on deep ocean floor, surrounded by bioluminescent cyan jellyfish and coral reef, data streams glowing, 8k"
    },
    {
      name: "🎮 5G Esports Cloud Gaming",
      prompt: "Neon esports battle arena with cloud gaming rig, professional gamer streaming with ultra-low latency, vibrant cyan and magenta backlighting, 8k"
    }
  ];

  // 100% Free AI Image Generation Handler (Pollinations Turbo Engine)
  const handleGenerateAI = async (customPrompt?: string) => {
    const activePrompt = (customPrompt || prompt).trim();
    setGenError("");
    setSuccessNotice("");
    setIsGenerating(true);

    let width = 768;
    let height = 768;
    if (format.includes("9:16")) {
      width = 576;
      height = 1024;
    } else if (format.includes("16:9")) {
      width = 1024;
      height = 576;
    }

    const randomSeed = Math.floor(Math.random() * 900000) + 10000;

    try {
      const apiEndpoint = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api") + "/generation/free";
      const res = await fetch(apiEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: activePrompt,
          seed: randomSeed,
          width,
          height
        })
      });

      const data = await res.json();
      const imageUrl = data.image_url || `https://image.pollinations.ai/prompt/${encodeURIComponent(activePrompt)}?model=turbo&width=${width}&height=${height}&nologo=true&seed=${randomSeed}`;

      setCurrentImage({
        seed: data.seed || randomSeed,
        theme: `✨ 100% Real AI • Seed #${data.seed || randomSeed}`,
        url: imageUrl,
        isAi: true,
        prompt: activePrompt
      });
      setSuccessNotice(`✨ Synthesized brand-new AI creative (Seed #${data.seed || randomSeed})!`);
      setGenerationCount(c => c + 1);
    } catch (err: any) {
      // Direct high-res cloud stream fallback
      const directUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(activePrompt)}?model=turbo&width=${width}&height=${height}&nologo=true&seed=${randomSeed}`;
      setCurrentImage({
        seed: randomSeed,
        theme: `✨ Real AI • Seed #${randomSeed}`,
        url: directUrl,
        isAi: true,
        prompt: activePrompt
      });
      setSuccessNotice(`✨ Generated real AI visual (Direct Cloud Stream)!`);
      setGenerationCount(c => c + 1);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleApplyPreset = (p: typeof presets[0]) => {
    setPrompt(p.prompt);
    handleGenerateAI(p.prompt);
  };

  return (
    <div className="space-y-6 pb-12 select-none">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <span>AI Campaign Visual Generator</span>
            <span className="text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-0.5 rounded-full font-semibold">
              ● 100% Free AI Diffusion
            </span>
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Generate 100% brand-new AI visuals according to your prompt. If you like the visual, send it straight to the Canvas Editor!
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-purple-400 bg-purple-500/10 border border-purple-500/20 px-3 py-1.5 rounded-xl font-bold font-mono">
            Generation #{generationCount} • Active Seed #{currentImage.seed}
          </span>
        </div>
      </div>

      {/* 1-Click Presets Bar */}
      <div className="bg-[#0D121F] border border-white/[0.06] p-4 rounded-2xl space-y-2.5">
        <div className="text-[11px] uppercase tracking-wider font-bold text-gray-400 flex items-center gap-2">
          <span>⚡</span>
          <span>1-Click Telecom Art Direction Presets (Click to Auto-Generate AI Visual)</span>
        </div>

        <div className="flex flex-wrap gap-2">
          {presets.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleApplyPreset(p)}
              className="text-xs py-1.5 px-3 rounded-xl border border-white/5 bg-[#121828] text-gray-300 hover:text-white hover:border-purple-500/50 hover:bg-purple-500/10 transition font-medium cursor-pointer"
            >
              {p.name}
            </button>
          ))}
        </div>
      </div>

      {/* Main Studio Grid: Left (Controls) & Right (Single Big Image Box) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Prompt & Controls */}
        <div className="lg:col-span-5 bg-[#0D121F] border border-white/[0.06] p-6 rounded-2xl shadow-xl space-y-4">
          
          {/* Status Message */}
          {genError && (
            <div className="p-3 bg-red-500/10 border border-red-500/30 text-red-300 text-xs rounded-xl flex items-start gap-2">
              <span>⚠️</span>
              <span>{genError}</span>
            </div>
          )}
          {successNotice && (
            <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs rounded-xl flex items-center gap-2">
              <span>✅</span>
              <span>{successNotice}</span>
            </div>
          )}

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs font-semibold text-gray-300">
                Diffusion Art Direction Prompt
              </label>
              <span className="text-[10px] text-emerald-400 font-semibold">
                ✨ Generates Brand New Creative
              </span>
            </div>
            <textarea
              rows={5}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe your telecom campaign visual concept (e.g., Creator with AR glasses on rooftop, satellite in space, autonomous vehicle, cricket stadium, bullet train)..."
              className="w-full bg-[#121828] border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-purple-500 transition leading-relaxed font-sans"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-gray-400 mb-1">
                AI Engine
              </label>
              <div className="w-full bg-[#121828] border border-white/10 rounded-xl p-2.5 text-xs text-white font-medium flex items-center gap-1.5">
                <span>⚡</span> Turbo Diffusion (Free)
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-gray-400 mb-1">Aspect Ratio</label>
              <select
                value={format}
                onChange={(e) => setFormat(e.target.value)}
                className="w-full bg-[#121828] border border-white/10 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-purple-500"
              >
                <option>1:1 (Instagram Feed / Post)</option>
                <option>9:16 (WhatsApp / Story / Reel)</option>
                <option>16:9 (Highway Billboard / Banner)</option>
              </select>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2.5 pt-2">
            <button
              onClick={() => handleGenerateAI()}
              disabled={isGenerating}
              className="w-full py-3.5 rounded-xl font-bold text-white text-xs flex items-center justify-center gap-2 shadow-lg gradient-btn-purple transition disabled:opacity-50 cursor-pointer"
            >
              {isGenerating ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Synthesizing Brand-New AI Creative...</span>
                </>
              ) : (
                <>
                  <span>⚡ Generate Brand-New AI Image</span>
                </>
              )}
            </button>

            <button
              onClick={() => handleGenerateAI()}
              disabled={isGenerating}
              className="w-full py-2.5 rounded-xl font-semibold text-gray-300 hover:text-white text-xs flex items-center justify-center gap-2 bg-[#121828] hover:bg-[#182238] border border-white/10 transition disabled:opacity-50 cursor-pointer"
            >
              <span>🎲 Re-roll / Generate Another Variant</span>
            </button>
          </div>

          <div className="p-3 bg-[#121828] border border-white/5 rounded-xl text-[11px] text-gray-400 space-y-1">
            <div className="text-white font-semibold flex items-center gap-1.5">
              <span>💡</span> How it works:
            </div>
            <div>
              1. Type your prompt or click any preset above.<br />
              2. Click <strong>Generate Brand-New AI Image</strong>.<br />
              3. If you like the result, click <strong>Send to Canvas Editor</strong>. If you want a different visual, click <strong>Re-roll</strong>!
            </div>
          </div>
        </div>

        {/* Right Column: SINGLE Large Image Preview Box */}
        <div className="lg:col-span-7 bg-[#0D121F] border border-white/[0.06] p-6 rounded-2xl shadow-xl flex flex-col justify-between space-y-4">
          
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <span>AI Campaign Visual Showcase</span>
                {currentImage.isAi ? (
                  <span className="text-[10px] bg-purple-500/20 text-purple-300 border border-purple-500/30 px-2 py-0.5 rounded-full font-bold">
                    ✨ 100% Real AI
                  </span>
                ) : (
                  <span className="text-[10px] bg-blue-500/20 text-blue-300 border border-blue-500/30 px-2 py-0.5 rounded-full font-bold">
                    📸 Studio Base
                  </span>
                )}
              </h3>
              <p className="text-[11px] text-gray-400">Generated visual output ready for stamping and export</p>
            </div>
            <span className="text-xs text-purple-400 font-mono font-bold bg-purple-500/10 px-2.5 py-1 rounded-lg border border-purple-500/20">
              Seed #{currentImage.seed}
            </span>
          </div>

          {/* THE SINGLE IMAGE PREVIEW BOX */}
          <div className="relative w-full rounded-2xl overflow-hidden border-2 border-purple-500/40 bg-[#080B12] shadow-2xl group flex items-center justify-center min-h-[420px] max-h-[560px]">
            
            {/* Image */}
            <img
              src={currentImage.url}
              alt="Generated Campaign Visual"
              className={`w-full h-full object-contain max-h-[540px] transition duration-300 ${
                isGenerating ? "opacity-30 blur-sm scale-95" : "opacity-100 scale-100"
              }`}
            />

            {/* Loading Shimmer / Spinner Overlay */}
            {isGenerating && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm z-30 space-y-3">
                <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                <div className="text-center">
                  <p className="text-sm font-bold text-white">Synthesizing Brand-New Pixels...</p>
                  <p className="text-xs text-gray-400 mt-0.5">Pollinations Turbo Diffusion is drawing your prompt</p>
                </div>
              </div>
            )}

            {/* Badge Top Left */}
            <div className="absolute top-3 left-3 z-20 pointer-events-none">
              {currentImage.isAi ? (
                <span className="bg-purple-600/90 backdrop-blur-md text-white text-[10px] font-black px-2.5 py-1 rounded-lg shadow-lg border border-purple-400/40 flex items-center gap-1.5">
                  <span>✨</span> 100% REAL AI GENERATED
                </span>
              ) : (
                <span className="bg-black/80 backdrop-blur-md text-gray-300 text-[10px] font-bold px-2.5 py-1 rounded-lg border border-white/10">
                  📸 8K STUDIO PREVIEW
                </span>
              )}
            </div>

            {/* Bottom Info Bar Overlay */}
            <div className="absolute bottom-3 inset-x-3 bg-black/80 backdrop-blur-md border border-white/10 p-2.5 rounded-xl z-20 flex justify-between items-center">
              <span className="text-xs text-gray-200 font-mono font-medium truncate max-w-[70%]">
                {currentImage.theme}
              </span>
              <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                Ready to Edit
              </span>
            </div>

          </div>

          {/* Action Bar for the Single Image */}
          <div className="pt-2 border-t border-white/5 flex flex-wrap justify-between items-center gap-3">
            <div className="flex items-center gap-2">
              <a
                href={currentImage.url}
                target="_blank"
                rel="noreferrer"
                className="bg-[#141A28] hover:bg-white/10 border border-white/10 text-gray-200 text-xs font-semibold px-3.5 py-2 rounded-xl transition flex items-center gap-1.5"
              >
                <span>🔍</span> Full Resolution
              </a>

              <button
                type="button"
                onClick={() => handleGenerateAI()}
                disabled={isGenerating}
                className="bg-[#141A28] hover:bg-purple-600/20 border border-purple-500/30 text-purple-300 hover:text-white text-xs font-semibold px-3.5 py-2 rounded-xl transition flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                <span>🎲</span> Re-roll
              </button>
            </div>

            <Link
              href={`/editor?bg=${encodeURIComponent(currentImage.url || '')}`}
              onClick={() => {
                if (currentImage.url) {
                  localStorage.setItem('launch_ai_canvas_bg', currentImage.url);
                }
              }}
              className="gradient-btn-purple text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-lg transition flex items-center gap-2"
            >
              <span>✏️</span> Send to Canvas Editor →
            </Link>
          </div>

        </div>

      </div>

    </div>
  );
}
