"use client";

import React, { useState, useEffect, useRef } from "react";
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

  // 45-Second Rate Limit Cooldown State
  const [cooldown, setCooldown] = useState(0);
  const [autoGenerateOnZero, setAutoGenerateOnZero] = useState(false);
  const cooldownRef = useRef(cooldown);
  cooldownRef.current = cooldown;

  // Single Focused Hero Image state
  const defaultStudioImage: GeneratedImage = {
    seed: 48920,
    theme: "Rooftop Twilight AR Glasses 5G Streaming",
    url: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=1200&h=1200&q=85",
    isAi: false,
    prompt: "Cinematic commercial telecom visual for ultra-fast 5G True Unlimited network..."
  };

  const [currentImage, setCurrentImage] = useState<GeneratedImage>(defaultStudioImage);

  // Initialize and track cooldown from localStorage
  useEffect(() => {
    try {
      const savedTime = localStorage.getItem('launch_ai_last_gen_timestamp');
      if (savedTime) {
        const elapsed = Math.floor((Date.now() - Number(savedTime)) / 1000);
        if (elapsed < 45 && elapsed >= 0) {
          setCooldown(45 - elapsed);
        }
      }
    } catch (e) {}
  }, []);

  // 1-second interval timer for cooldown
  useEffect(() => {
    if (cooldown <= 0) return;

    const timer = setInterval(() => {
      setCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setSuccessNotice("✨ 45s Cooldown complete! AI diffusion engine is ready for your next creative.");
          if (autoGenerateOnZero) {
            setTimeout(() => {
              handleGenerateAI();
            }, 300);
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [cooldown, autoGenerateOnZero]);

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

  // 100% Free AI Image Generation Handler (Pollinations Turbo Engine with 45s Guard)
  const handleGenerateAI = async (customPrompt?: string) => {
    // If cooldown is running, show countdown notice
    if (cooldown > 0) {
      setGenError(`⏳ Cooldown in progress: Please wait ${cooldown}s for Pollinations Turbo to recharge.`);
      return;
    }

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

    // Start 45-second timer immediately to prevent accidental duplicate requests
    try {
      localStorage.setItem('launch_ai_last_gen_timestamp', String(Date.now()));
    } catch (e) {}
    setCooldown(45);

    try {
      const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";
      const res = await fetch(`${API_BASE}/generation/free`, {
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
      let imageUrl = data.image_url;
      if (!imageUrl || imageUrl.includes("localhost:8000")) {
        imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(activePrompt)}?model=turbo&width=${width}&height=${height}&nologo=true&seed=${data.seed || randomSeed}`;
      }

      setCurrentImage({
        seed: data.seed || randomSeed,
        theme: `✨ 100% Real AI • Seed #${data.seed || randomSeed}`,
        url: imageUrl,
        isAi: true,
        prompt: activePrompt
      });
      setSuccessNotice(`✨ Synthesized brand-new AI creative (Seed #${data.seed || randomSeed})! 45s recharge cooldown started.`);
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
      setSuccessNotice(`✨ Generated real AI visual (Direct Cloud Stream)! 45s recharge cooldown started.`);
      setGenerationCount(c => c + 1);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleApplyPreset = (p: typeof presets[0]) => {
    if (cooldown > 0) {
      setGenError(`⏳ Cooldown active! Next preset ready in ${cooldown} seconds.`);
      return;
    }
    setPrompt(p.prompt);
    handleGenerateAI(p.prompt);
  };

  // Force trigger the 45s cooldown (e.g. if rate limit image is encountered)
  const handleTriggerRateLimitCountdown = () => {
    try {
      localStorage.setItem('launch_ai_last_gen_timestamp', String(Date.now()));
    } catch (e) {}
    setCooldown(45);
    setGenError("");
    setSuccessNotice("⏳ 45-second cooldown started! When the timer ends, the AI generator will unlock.");
  };

  const handleResetToCleanStudio = () => {
    setCurrentImage(defaultStudioImage);
    setSuccessNotice("📸 Restored clean 8K studio preview banner.");
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
          {cooldown > 0 ? (
            <div className="flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs px-3.5 py-1.5 rounded-xl font-bold font-mono">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
              <span>Recharging: {cooldown}s remaining</span>
            </div>
          ) : (
            <span className="text-xs text-purple-400 bg-purple-500/10 border border-purple-500/20 px-3 py-1.5 rounded-xl font-bold font-mono">
              Generation #{generationCount} • Active Seed #{currentImage.seed}
            </span>
          )}
        </div>
      </div>

      {/* 1-Click Presets Bar */}
      <div className="bg-[#0D121F] border border-white/[0.06] p-4 rounded-2xl space-y-2.5">
        <div className="text-[11px] uppercase tracking-wider font-bold text-gray-400 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span>⚡</span>
            <span>1-Click Telecom Art Direction Presets (Click to Auto-Generate AI Visual)</span>
          </div>
          {cooldown > 0 && (
            <span className="text-amber-400 font-mono text-[10px] font-bold">
              Cooldown: {cooldown}s
            </span>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          {presets.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleApplyPreset(p)}
              disabled={isGenerating || cooldown > 0}
              className={`text-xs py-1.5 px-3 rounded-xl border transition font-medium cursor-pointer ${
                cooldown > 0
                  ? "border-white/5 bg-[#101420] text-gray-500 cursor-not-allowed opacity-60"
                  : "border-white/5 bg-[#121828] text-gray-300 hover:text-white hover:border-purple-500/50 hover:bg-purple-500/10"
              }`}
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
          
          {/* Status Messages */}
          {genError && (
            <div className="p-3 bg-red-500/10 border border-red-500/30 text-red-300 text-xs rounded-xl flex items-start gap-2">
              <span>⚠️</span>
              <div className="flex-1">
                <span>{genError}</span>
                {cooldown === 0 && (
                  <button
                    onClick={handleTriggerRateLimitCountdown}
                    className="block mt-1.5 text-amber-300 underline font-bold hover:text-white"
                  >
                    Click to start 45s cooldown countdown ⏱️
                  </button>
                )}
              </div>
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
              <div className="w-full bg-[#121828] border border-white/10 rounded-xl p-2.5 text-xs text-white font-medium flex items-center justify-between">
                <span>⚡ Turbo Diffusion</span>
                <span className="text-[10px] text-emerald-400 font-bold">Free</span>
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

          {/* Action Buttons with 45s Cooldown */}
          <div className="space-y-2.5 pt-2">
            
            {/* Main Generate Button */}
            <button
              onClick={() => handleGenerateAI()}
              disabled={isGenerating || cooldown > 0}
              className={`w-full py-3.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition ${
                cooldown > 0
                  ? "bg-[#161F33] border-2 border-amber-500/40 text-amber-300 cursor-not-allowed"
                  : "gradient-btn-purple text-white cursor-pointer hover:shadow-purple-600/40"
              } disabled:opacity-85`}
            >
              {isGenerating ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Synthesizing Brand-New AI Creative...</span>
                </>
              ) : cooldown > 0 ? (
                <>
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
                  <span>⏳ Free Limit Cooldown: Ready in {cooldown}s</span>
                </>
              ) : (
                <>
                  <span>⚡ Generate Brand-New AI Image</span>
                </>
              )}
            </button>

            {/* Re-roll Button */}
            <button
              onClick={() => handleGenerateAI()}
              disabled={isGenerating || cooldown > 0}
              className={`w-full py-2.5 rounded-xl font-semibold text-xs flex items-center justify-center gap-2 border transition ${
                cooldown > 0
                  ? "bg-[#101420] border-white/5 text-gray-500 cursor-not-allowed"
                  : "bg-[#121828] hover:bg-[#182238] border-white/10 text-gray-300 hover:text-white cursor-pointer"
              }`}
            >
              {cooldown > 0 ? (
                <span>🎲 Re-roll Locked ({cooldown}s)</span>
              ) : (
                <span>🎲 Re-roll / Generate Another Variant</span>
              )}
            </button>

            {/* Auto-generate checkbox option when cooldown hits 0 */}
            {cooldown > 0 && (
              <label className="flex items-center gap-2 text-[11px] text-gray-300 bg-[#121828] border border-white/5 p-2 rounded-xl cursor-pointer">
                <input
                  type="checkbox"
                  checked={autoGenerateOnZero}
                  onChange={(e) => setAutoGenerateOnZero(e.target.checked)}
                  className="rounded text-purple-600 focus:ring-0 cursor-pointer"
                />
                <span>⚡ Auto-synthesize new image the moment timer hits 0s</span>
              </label>
            )}

            {/* Cooldown progress indicator */}
            {cooldown > 0 && (
              <div className="space-y-1 pt-1">
                <div className="flex justify-between text-[10px] text-gray-400 font-mono">
                  <span>Recharging Free Slot</span>
                  <span className="text-amber-400 font-bold">{cooldown}s left</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-purple-500 via-pink-500 to-amber-400 h-full transition-all duration-1000"
                    style={{ width: `${((45 - cooldown) / 45) * 100}%` }}
                  ></div>
                </div>
              </div>
            )}
          </div>

          <div className="p-3 bg-[#121828] border border-white/5 rounded-xl text-[11px] text-gray-400 space-y-1">
            <div className="text-white font-semibold flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <span>💡</span> Free Tier Rate Limit Policy:
              </span>
              <button
                type="button"
                onClick={handleTriggerRateLimitCountdown}
                className="text-[10px] text-amber-400 underline hover:text-white"
              >
                Reset 45s timer
              </button>
            </div>
            <div>
              Pollinations Turbo provides 100% free diffusion with a <strong>45-second recharge window</strong> per generation. Once the countdown ends, you can generate another photo!
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

            <div className="flex items-center gap-2">
              {cooldown > 0 ? (
                <span className="text-xs text-amber-400 font-mono font-bold bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/20">
                  ⏳ 00:{cooldown < 10 ? `0${cooldown}` : cooldown}
                </span>
              ) : (
                <span className="text-xs text-purple-400 font-mono font-bold bg-purple-500/10 px-2.5 py-1 rounded-lg border border-purple-500/20">
                  Seed #{currentImage.seed}
                </span>
              )}
            </div>
          </div>

          {/* THE SINGLE IMAGE PREVIEW BOX WITH 45S COOLDOWN OVERLAY */}
          <div className="relative w-full rounded-2xl overflow-hidden border-2 border-purple-500/40 bg-[#080B12] shadow-2xl group flex items-center justify-center min-h-[420px] max-h-[560px]">
            
            {/* The Image (Only shown cleanly when not covered by rate limit) */}
            <img
              src={currentImage.url}
              alt="Generated Campaign Visual"
              onError={(e) => {
                const target = e.currentTarget;
                const cloudFallback = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?model=turbo&width=768&height=768&nologo=true&seed=${currentImage.seed}`;
                if (target.src !== cloudFallback) {
                  target.src = cloudFallback;
                }
              }}
              className={`w-full h-full object-contain max-h-[540px] transition duration-300 ${
                isGenerating ? "opacity-30 blur-sm scale-95" : "opacity-100 scale-100"
              }`}
            />

            {/* Loading Shimmer / Spinner Overlay */}
            {isGenerating && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/75 backdrop-blur-sm z-30 space-y-3">
                <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                <div className="text-center">
                  <p className="text-sm font-bold text-white">Synthesizing Brand-New Pixels...</p>
                  <p className="text-xs text-gray-400 mt-0.5">Pollinations Turbo Diffusion is drawing your prompt</p>
                </div>
              </div>
            )}

            {/* ========================================================
                45-SECOND RATE LIMIT COUNTDOWN OVERLAY
                Completely covers and removes the yellow screen!
               ======================================================== */}
            {cooldown > 0 && !isGenerating && (
              <div className="absolute inset-0 z-25 bg-[#090D18]/95 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center space-y-4">
                
                {/* Glowing Circular Timer Ring */}
                <div className="relative flex items-center justify-center">
                  <div className="w-24 h-24 rounded-full border-4 border-purple-500/20 border-t-purple-500 animate-spin"></div>
                  <div className="absolute flex flex-col items-center justify-center">
                    <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-amber-300 font-mono">
                      {cooldown}s
                    </span>
                    <span className="text-[9px] uppercase tracking-wider text-gray-400 font-bold">Cooldown</span>
                  </div>
                </div>

                <div className="space-y-1.5 max-w-sm">
                  <h4 className="text-base font-extrabold text-white flex items-center justify-center gap-1.5">
                    <span>⏳</span> Free Tier Recharging (45s Limit)
                  </h4>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    Pollinations Turbo allows <strong>1 free generation every 45 seconds</strong>. The yellow limit screen is blocked and your next creative slot will unlock automatically!
                  </p>
                </div>

                {/* Live Progress Bar */}
                <div className="w-full max-w-xs bg-white/10 rounded-full h-2 overflow-hidden shadow-inner">
                  <div
                    className="bg-gradient-to-r from-purple-500 via-pink-500 to-emerald-400 h-full transition-all duration-1000"
                    style={{ width: `${((45 - cooldown) / 45) * 100}%` }}
                  ></div>
                </div>

                <div className="flex items-center gap-3 pt-1">
                  <button
                    type="button"
                    onClick={handleResetToCleanStudio}
                    className="text-xs bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10 px-3 py-1.5 rounded-xl transition"
                  >
                    📸 Show Clean Studio Base
                  </button>

                  <button
                    type="button"
                    onClick={() => setCooldown(0)}
                    className="text-xs bg-purple-600/30 hover:bg-purple-600/50 text-purple-200 border border-purple-500/40 px-3 py-1.5 rounded-xl font-bold transition"
                  >
                    ⚡ Force Unlock Now
                  </button>
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
                disabled={isGenerating || cooldown > 0}
                className={`text-xs font-semibold px-3.5 py-2 rounded-xl transition flex items-center gap-1.5 ${
                  cooldown > 0
                    ? "bg-[#101420] border border-white/5 text-gray-500 cursor-not-allowed"
                    : "bg-[#141A28] hover:bg-purple-600/20 border border-purple-500/30 text-purple-300 hover:text-white cursor-pointer"
                }`}
              >
                <span>🎲</span> {cooldown > 0 ? `Re-roll (${cooldown}s)` : "Re-roll"}
              </button>

              <button
                type="button"
                onClick={handleResetToCleanStudio}
                className="bg-[#141A28] hover:bg-white/10 border border-white/10 text-gray-400 hover:text-white text-xs font-semibold px-3 py-2 rounded-xl transition"
                title="Restore clean preview background"
              >
                Reset View
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
