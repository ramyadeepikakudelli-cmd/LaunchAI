'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LandingPage() {
  const router = useRouter();
  const [emailInput, setEmailInput] = useState('');
  const [pagesDropdownOpen, setPagesDropdownOpen] = useState(false);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim()) {
      router.push(`/signup?email=${encodeURIComponent(emailInput.trim())}`);
    } else {
      router.push('/signup');
    }
  };

  return (
    <div className="min-h-screen bg-[#070A12] text-gray-100 flex flex-col justify-between selection:bg-purple-600 selection:text-white relative overflow-hidden bg-grid-mesh">
      
      {/* 3D Curved Wave Accents on Left and Right (matching Screenshot 1) */}
      <div className="absolute top-1/4 -left-28 w-96 h-[500px] pointer-events-none opacity-40 md:opacity-70 blur-[1px]">
        <svg viewBox="0 0 400 600" fill="none" className="w-full h-full">
          <path d="M-50,0 C150,150 180,350 -50,550" stroke="url(#blueWave1)" strokeWidth="60" strokeLinecap="round" />
          <path d="M-80,60 C120,200 140,360 -80,500" stroke="url(#blueWave2)" strokeWidth="40" strokeLinecap="round" />
          <path d="M-110,120 C80,240 100,380 -110,480" stroke="#3B82F6" strokeWidth="20" strokeLinecap="round" opacity="0.4" />
          <defs>
            <linearGradient id="blueWave1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1E40AF" />
              <stop offset="50%" stopColor="#3B82F6" />
              <stop offset="100%" stopColor="#60A5FA" />
            </linearGradient>
            <linearGradient id="blueWave2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1E3A8A" />
              <stop offset="100%" stopColor="#2563EB" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="absolute top-1/4 -right-28 w-96 h-[500px] pointer-events-none opacity-40 md:opacity-70 blur-[1px]">
        <svg viewBox="0 0 400 600" fill="none" className="w-full h-full">
          <path d="M450,0 C250,150 220,350 450,550" stroke="url(#blueWaveR1)" strokeWidth="60" strokeLinecap="round" />
          <path d="M480,60 C280,200 260,360 480,500" stroke="url(#blueWaveR2)" strokeWidth="40" strokeLinecap="round" />
          <path d="M510,120 C320,240 300,380 510,480" stroke="#3B82F6" strokeWidth="20" strokeLinecap="round" opacity="0.4" />
          <defs>
            <linearGradient id="blueWaveR1" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1E40AF" />
              <stop offset="50%" stopColor="#3B82F6" />
              <stop offset="100%" stopColor="#60A5FA" />
            </linearGradient>
            <linearGradient id="blueWaveR2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1E3A8A" />
              <stop offset="100%" stopColor="#2563EB" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Top Navbar */}
      <nav className="border-b border-white/[0.06] bg-[#070A12]/80 backdrop-blur-xl sticky top-0 z-50 px-6 lg:px-16 py-4 flex justify-between items-center">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 to-blue-500 flex items-center justify-center text-white shadow-lg shadow-purple-500/20 group-hover:scale-105 transition">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>
              <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/>
              <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/>
              <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
            </svg>
          </div>
          <span className="text-xl font-extrabold tracking-tight text-white flex items-center">
            Nexus<span className="text-blue-400">AI</span>
            <span className="text-xs text-purple-400 font-mono ml-2 border border-purple-500/30 px-1.5 py-0.2 rounded-full">LAUNCH AI</span>
          </span>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
          <Link href="/" className="text-white hover:text-white transition">Home</Link>
          <a href="#features" className="hover:text-white transition">About</a>
          <a href="#how-it-works" className="hover:text-white transition">Support</a>
          <a href="#pricing" className="hover:text-white transition">Pricing</a>
          
          {/* All Pages Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setPagesDropdownOpen(!pagesDropdownOpen)}
              className="flex items-center gap-1 hover:text-white transition cursor-pointer"
            >
              <span>All Pages</span>
              <svg className={`w-3.5 h-3.5 transition-transform ${pagesDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {pagesDropdownOpen && (
              <div 
                className="absolute top-8 left-0 w-64 bg-[#0F1422] border border-white/10 rounded-2xl shadow-2xl p-3 z-50 space-y-1 animate-in fade-in slide-in-from-top-2"
                onMouseLeave={() => setPagesDropdownOpen(false)}
              >
                <div className="text-[10px] uppercase font-bold text-gray-500 px-3 py-1">Workspace Routes</div>
                <Link href="/dashboard" className="flex items-center gap-2 px-3 py-2 text-xs font-semibold rounded-lg hover:bg-white/5 text-gray-200 hover:text-white">
                  <span>📊</span> Dashboard
                </Link>
                <Link href="/campaign-studio" className="flex items-center gap-2 px-3 py-2 text-xs font-semibold rounded-lg hover:bg-white/5 text-gray-200 hover:text-white">
                  <span>🧙</span> Campaign Studio Wizard
                </Link>
                <Link href="/generator" className="flex items-center gap-2 px-3 py-2 text-xs font-semibold rounded-lg hover:bg-white/5 text-gray-200 hover:text-white">
                  <span>🎨</span> AI Image Generator
                </Link>
                <Link href="/plans" className="flex items-center gap-2 px-3 py-2 text-xs font-semibold rounded-lg hover:bg-white/5 text-gray-200 hover:text-white">
                  <span>📱</span> Telecom Plan Catalog
                </Link>
                <Link href="/editor" className="flex items-center gap-2 px-3 py-2 text-xs font-semibold rounded-lg hover:bg-white/5 text-gray-200 hover:text-white">
                  <span>✏️</span> Design Canvas Editor
                </Link>
                <Link href="/validation" className="flex items-center gap-2 px-3 py-2 text-xs font-semibold rounded-lg hover:bg-white/5 text-gray-200 hover:text-white">
                  <span>🛡️</span> Brand Guardian Audit
                </Link>
                <div className="border-t border-white/10 my-1"></div>
                <Link href="/login" className="flex items-center gap-2 px-3 py-2 text-xs font-semibold rounded-lg hover:bg-white/5 text-gray-200 hover:text-white">
                  <span>🔐</span> Sign In
                </Link>
                <Link href="/signup" className="flex items-center gap-2 px-3 py-2 text-xs font-semibold rounded-lg hover:bg-white/5 text-gray-200 hover:text-white">
                  <span>✨</span> Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className="text-sm font-semibold text-gray-300 hover:text-white px-3 py-2 transition"
          >
            Sign In
          </Link>
          <Link
            href="/signup"
            className="gradient-btn-purple text-white font-semibold text-xs px-6 py-2.5 rounded-full shadow-lg"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-6 lg:px-16 pt-16 pb-20 text-center max-w-5xl mx-auto relative z-10">
        
        {/* A.I Driven Pill with horizontal lines */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-blue-500/50"></div>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/40 bg-blue-500/10 text-blue-400 text-xs font-semibold tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></span>
            A.I Driven
          </div>
          <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-blue-500/50"></div>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-[1.15] text-white">
          Empower Your Business<br />
          with <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">AI-Powered Solutions</span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto mb-10 font-normal leading-relaxed">
          Our AI platform automates repetitive tasks — transforming telecom plan tariffs into verified, photorealistic marketing campaigns in seconds.
        </p>

        {/* Email Input Capsule (matching Screenshot 1) */}
        <form onSubmit={handleEmailSubmit} className="max-w-md mx-auto mb-16 relative">
          <div className="relative flex items-center">
            <input
              type="email"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              placeholder="Type your email..."
              className="w-full bg-[#141A29]/90 border border-white/10 rounded-full py-4 pl-6 pr-36 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/60 shadow-xl backdrop-blur-md"
            />
            <button
              type="submit"
              className="absolute right-2 gradient-btn-purple text-white text-xs font-semibold px-6 py-2.5 rounded-full shadow-md"
            >
              Get Started
            </button>
          </div>
        </form>

        {/* In-Situ Floating Perspective Dashboard Preview (matching Screenshot 1 exactly) */}
        <div className="relative mx-auto rounded-3xl p-1 bg-gradient-to-b from-white/15 via-white/5 to-transparent shadow-2xl">
          <div className="rounded-[22px] bg-[#0E1320] border border-white/10 overflow-hidden shadow-2xl text-left">
            
            {/* Top Chrome Header */}
            <div className="bg-[#121828] border-b border-white/[0.08] px-5 py-3.5 flex flex-wrap justify-between items-center gap-3">
              <div className="flex items-center gap-4">
                <span className="text-xs font-bold text-gray-300 font-mono">Nexus-AI Dashboard</span>
                <span className="text-gray-600">/</span>
                <span className="text-xs text-gray-400 font-medium">Home / Dashboard</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-[#0B0F19] border border-white/10 rounded-full px-3 py-1 text-[11px] text-gray-400 flex items-center gap-2">
                  <span>🔍</span> Type here...
                </div>
                <Link href="/login" className="text-[11px] text-gray-300 hover:text-white flex items-center gap-1.5 font-medium">
                  <span>👤</span> Sign In
                </Link>
              </div>
            </div>

            {/* Dashboard Content Grid */}
            <div className="grid grid-cols-12 gap-4 p-5 bg-[#0A0E18]">
              
              {/* Left Mini Sidebar */}
              <div className="col-span-12 lg:col-span-2 hidden md:block bg-[#0E1422] border border-white/5 rounded-2xl p-3 space-y-4 text-xs">
                <div className="space-y-1">
                  <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold px-3 py-2 rounded-xl flex items-center gap-2 shadow-lg shadow-blue-600/30">
                    <span>🏠</span> Dashboard
                  </div>
                  <div className="text-gray-400 px-3 py-2 flex items-center gap-2 hover:text-white cursor-pointer">
                    <span>📊</span> Tables
                  </div>
                  <div className="text-gray-400 px-3 py-2 flex items-center gap-2 hover:text-white cursor-pointer">
                    <span>💳</span> Billing
                  </div>
                  <div className="text-gray-400 px-3 py-2 flex items-center gap-2 hover:text-white cursor-pointer">
                    <span>🌐</span> RTL
                  </div>
                </div>

                <div className="pt-2">
                  <div className="text-[9px] uppercase tracking-wider font-bold text-gray-500 px-3 mb-2">Account Pages</div>
                  <div className="space-y-1 text-gray-400">
                    <div className="px-3 py-1.5 flex items-center gap-2 hover:text-white cursor-pointer"><span>👤</span> Profile</div>
                    <div className="px-3 py-1.5 flex items-center gap-2 hover:text-white cursor-pointer"><span>🔑</span> Sign In</div>
                    <div className="px-3 py-1.5 flex items-center gap-2 hover:text-white cursor-pointer"><span>✨</span> Sign Up</div>
                  </div>
                </div>
              </div>

              {/* Main Content Area */}
              <div className="col-span-12 lg:col-span-10 space-y-4">
                
                {/* 4 Top KPI Cards with Blue Badge (matching Screenshot 1) */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                  <div className="bg-[#121828] border border-white/5 p-4 rounded-2xl flex justify-between items-center">
                    <div>
                      <div className="text-[10px] text-gray-400 uppercase font-semibold">Today's Money</div>
                      <div className="text-lg font-black text-white mt-0.5">₹53,000 <span className="text-xs text-green-400 font-bold">+55%</span></div>
                    </div>
                    <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white text-xs shadow-md shadow-blue-500/20">
                      💳
                    </div>
                  </div>

                  <div className="bg-[#121828] border border-white/5 p-4 rounded-2xl flex justify-between items-center">
                    <div>
                      <div className="text-[10px] text-gray-400 uppercase font-semibold">Today's Users</div>
                      <div className="text-lg font-black text-white mt-0.5">2,300 <span className="text-xs text-green-400 font-bold">+5%</span></div>
                    </div>
                    <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white text-xs shadow-md shadow-blue-500/20">
                      👥
                    </div>
                  </div>

                  <div className="bg-[#121828] border border-white/5 p-4 rounded-2xl flex justify-between items-center">
                    <div>
                      <div className="text-[10px] text-gray-400 uppercase font-semibold">New Clients</div>
                      <div className="text-lg font-black text-white mt-0.5">+3,052 <span className="text-xs text-red-400 font-bold">-14%</span></div>
                    </div>
                    <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white text-xs shadow-md shadow-blue-500/20">
                      📄
                    </div>
                  </div>

                  <div className="bg-[#121828] border border-white/5 p-4 rounded-2xl flex justify-between items-center">
                    <div>
                      <div className="text-[10px] text-gray-400 uppercase font-semibold">Total Sales</div>
                      <div className="text-lg font-black text-white mt-0.5">₹173,000 <span className="text-xs text-green-400 font-bold">+8%</span></div>
                    </div>
                    <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white text-xs shadow-md shadow-blue-500/20">
                      🛒
                    </div>
                  </div>
                </div>

                {/* Middle Row with Welcome Card, Satisfaction Rate, and Referral Tracking */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  
                  {/* Card 1: Welcome Joe Williams */}
                  <div className="bg-gradient-to-br from-[#131A2B] via-[#0E1524] to-[#0A0E18] border border-white/5 p-5 rounded-2xl relative overflow-hidden flex flex-col justify-between">
                    <div>
                      <div className="text-[10px] text-gray-400 font-semibold uppercase">Welcome back</div>
                      <h3 className="text-base font-extrabold text-white mt-0.5">Joe Williams</h3>
                      <p className="text-xs text-gray-400 mt-2">Glad to see you again! Ask me anything.</p>
                    </div>

                    <div className="mt-8 flex justify-between items-end">
                      <span className="text-[11px] text-blue-400 font-semibold flex items-center gap-1.5 cursor-pointer">
                        Tap to record <span>→</span>
                      </span>
                      {/* Wave visual */}
                      <div className="w-24 h-10 opacity-70">
                        <svg viewBox="0 0 100 40" fill="none" className="w-full h-full">
                          <path d="M0,30 Q25,5 50,25 T100,10" stroke="#3B82F6" strokeWidth="3" fill="none" />
                          <path d="M0,35 Q25,15 50,30 T100,20" stroke="#8B5CF6" strokeWidth="2" fill="none" opacity="0.6" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Card 2: Satisfaction Rate with Semi-Circle Gauge */}
                  <div className="bg-[#121828] border border-white/5 p-5 rounded-2xl flex flex-col justify-between text-center">
                    <div className="text-left">
                      <div className="text-xs font-bold text-white">Satisfaction Rate</div>
                      <div className="text-[11px] text-gray-400">From all campaigns</div>
                    </div>

                    {/* Circular Arc Gauge */}
                    <div className="relative w-36 h-20 mx-auto my-3 flex items-center justify-center">
                      <svg viewBox="0 0 100 55" className="w-full h-full">
                        <path d="M10,50 A40,40 0 0,1 90,50" stroke="#1F293D" strokeWidth="8" fill="none" strokeLinecap="round" />
                        <path d="M10,50 A40,40 0 0,1 86,30" stroke="#38BDF8" strokeWidth="8" fill="none" strokeDasharray="125" strokeDashoffset="25" strokeLinecap="round" />
                      </svg>
                      <div className="absolute bottom-1 text-center">
                        <span className="text-xl">😊</span>
                        <div className="text-sm font-black text-white">95%</div>
                        <div className="text-[9px] text-gray-500">Based on likes</div>
                      </div>
                    </div>

                    <div className="flex justify-between text-[10px] text-gray-500 px-4">
                      <span>0%</span>
                      <span>100%</span>
                    </div>
                  </div>

                  {/* Card 3: Referral Tracking */}
                  <div className="bg-[#121828] border border-white/5 p-5 rounded-2xl flex flex-col justify-between">
                    <div className="flex justify-between items-center">
                      <div className="text-xs font-bold text-white">Referral Tracking</div>
                      <span className="text-gray-500 text-xs">•••</span>
                    </div>

                    <div className="flex items-center justify-between my-2">
                      <div className="space-y-3">
                        <div>
                          <div className="text-[10px] text-gray-400">Invited</div>
                          <div className="text-sm font-black text-white">145 people</div>
                        </div>
                        <div>
                          <div className="text-[10px] text-gray-400">Bonus</div>
                          <div className="text-sm font-black text-white">1,465</div>
                        </div>
                      </div>

                      {/* Safety Arc Meter */}
                      <div className="relative w-24 h-24 flex items-center justify-center">
                        <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                          <path
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="#1E293B"
                            strokeWidth="3.5"
                          />
                          <path
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831"
                            fill="none"
                            stroke="url(#purpleGradientArc)"
                            strokeWidth="3.5"
                            strokeDasharray="93, 100"
                            strokeLinecap="round"
                          />
                          <defs>
                            <linearGradient id="purpleGradientArc" x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor="#8B5CF6" />
                              <stop offset="100%" stopColor="#3B82F6" />
                            </linearGradient>
                          </defs>
                        </svg>
                        <div className="absolute text-center">
                          <div className="text-[9px] text-gray-400 uppercase font-bold">Safety</div>
                          <div className="text-base font-black text-white">9.3</div>
                          <div className="text-[8px] text-gray-500">Total Score</div>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>

              </div>
            </div>

          </div>
        </div>

      </section>

      {/* Feature Capabilities Section */}
      <section id="features" className="px-6 lg:px-16 py-20 border-t border-white/[0.06] bg-[#0A0E18]/70 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-400 text-xs font-semibold mb-3">
            Core Architecture
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">Enterprise Telecom Campaign Suite</h2>
          <p className="text-sm text-gray-400 max-w-2xl mx-auto mb-14">
            Custom-built for Jio, Airtel, and Vi marketing teams to convert complex telecom recharge catalogs into production-ready visual banners in seconds.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
            <div className="p-6 bg-[#0E1422] border border-white/5 rounded-2xl hover:border-blue-500/40 transition group">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-2xl mb-4 group-hover:scale-105 transition">
                🧙
              </div>
              <h3 className="font-bold text-white text-base mb-2">10-Step Campaign Wizard</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Step-by-step workflow covering operator selection, verified plan benefits, demographic targeting, and multi-format diffusion.
              </p>
            </div>

            <div className="p-6 bg-[#0E1422] border border-white/5 rounded-2xl hover:border-purple-500/40 transition group">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-2xl mb-4 group-hover:scale-105 transition">
                ⚡
              </div>
              <h3 className="font-bold text-white text-base mb-2">FLUX.1 Diffusion Engine</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Generates 4 distinct, photorealistic high-converting visuals with realistic lighting, character posing, and zero pricing hallucination.
              </p>
            </div>

            <div className="p-6 bg-[#0E1422] border border-white/5 rounded-2xl hover:border-cyan-500/40 transition group">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-2xl mb-4 group-hover:scale-105 transition">
                🛡️
              </div>
              <h3 className="font-bold text-white text-base mb-2">Brand Guardian Audit</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Deterministic compliance engine checking tariff currency (₹), daily data quotas, mandatory asterisks, and WCAG contrast.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section id="how-it-works" className="px-6 lg:px-16 py-20 border-t border-white/[0.06] relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-xs font-semibold mb-3">
            Accelerated Production
          </div>
          <h2 className="text-3xl font-extrabold text-white mb-4">How Launch AI Operates</h2>
          <p className="text-sm text-gray-400 mb-12">From recharge plan brief to compliant visual launch in under 10 seconds.</p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-left">
            <div className="p-6 bg-[#0E1422] border border-white/5 rounded-2xl">
              <div className="text-xl font-black text-blue-400 mb-2 font-mono">01</div>
              <h4 className="font-bold text-white text-sm mb-1">Select Tariff</h4>
              <p className="text-xs text-gray-400">Lock verified price, quota (2.5 GB/Day) and validity (28 Days) from the telecom catalog.</p>
            </div>
            <div className="p-6 bg-[#0E1422] border border-white/5 rounded-2xl">
              <div className="text-xl font-black text-purple-400 mb-2 font-mono">02</div>
              <h4 className="font-bold text-white text-sm mb-1">AI Prompt Engine</h4>
              <p className="text-xs text-gray-400">Copilot crafts demographic-tailored positive and negative diffusion prompts.</p>
            </div>
            <div className="p-6 bg-[#0E1422] border border-white/5 rounded-2xl">
              <div className="text-xl font-black text-cyan-400 mb-2 font-mono">03</div>
              <h4 className="font-bold text-white text-sm mb-1">Visual Synthesis</h4>
              <p className="text-xs text-gray-400">FLUX.1 synthesizes 4 ultra-sharp campaign creatives without GPU rental costs.</p>
            </div>
            <div className="p-6 bg-[#0E1422] border border-white/5 rounded-2xl">
              <div className="text-xl font-black text-emerald-400 mb-2 font-mono">04</div>
              <h4 className="font-bold text-white text-sm mb-1">Brand Release</h4>
              <p className="text-xs text-gray-400">Brand Guardian stamps price badges and certifies 98/100 compliance for rollout.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="px-6 lg:px-16 py-20 bg-gradient-to-b from-[#0A0E18] to-[#070A12] border-t border-white/[0.06] text-center relative z-10">
        <div className="max-w-2xl mx-auto space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Ready to Accelerate Your Campaign Pipeline?
          </h2>
          <p className="text-sm text-gray-400">
            Empower your marketing and design teams with AI-driven visual campaign automation.
          </p>
          <div>
            <Link
              href="/signup"
              className="gradient-btn-purple inline-block text-white font-semibold text-sm px-8 py-3.5 rounded-full shadow-xl shadow-purple-500/25"
            >
              Get Started Free →
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/[0.06] px-8 py-8 text-center text-xs text-gray-500 bg-[#070A12]">
        <div className="flex justify-center gap-6 mb-3">
          <Link href="/login" className="hover:text-gray-300">Sign In</Link>
          <Link href="/signup" className="hover:text-gray-300">Register</Link>
          <Link href="/dashboard" className="hover:text-gray-300">Dashboard</Link>
          <Link href="/campaign-studio" className="hover:text-gray-300">Campaign Studio</Link>
          <Link href="/plans" className="hover:text-gray-300">Recharge Plans</Link>
        </div>
        <div>© 2026 NexusAI / LAUNCH AI Inc. Enterprise Telecom Campaign Visual Generation Platform.</div>
      </footer>
    </div>
  );
}
