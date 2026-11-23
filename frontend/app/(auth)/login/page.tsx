'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'Admin' | 'Designer'>('Designer');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Check URL params for post-signup success notice
  useEffect(() => {
    try {
      const isRegistered = searchParams.get('registered');
      const paramEmail = searchParams.get('email');
      if (isRegistered === 'true') {
        setSuccessMsg('Account created successfully! Please enter your password to sign in.');
      }
      if (paramEmail) {
        setEmail(paramEmail);
      } else {
        const remembered = localStorage.getItem('launch_ai_remembered_email');
        if (remembered) setEmail(remembered);
      }
    } catch (e) {}
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email.trim() || !email.includes('@')) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    if (!password) {
      setErrorMsg('Please enter your account password.');
      return;
    }

    setIsLoading(true);

    try {
      if (rememberMe) {
        localStorage.setItem('launch_ai_remembered_email', email.trim());
      } else {
        localStorage.removeItem('launch_ai_remembered_email');
      }

      const result = await login(email.trim(), password, role);
      setIsLoading(false);

      if (!result.success) {
        setErrorMsg(result.error || 'Authentication failed. Please verify your credentials.');
      }
    } catch (err: any) {
      setIsLoading(false);
      setErrorMsg(err.message || 'An error occurred during authentication.');
    }
  };

  const handleQuickDemo = async (demoEmail: string, demoPass: string, demoRole: 'Admin' | 'Designer') => {
    setEmail(demoEmail);
    setPassword(demoPass);
    setRole(demoRole);
    setErrorMsg('');
    setIsLoading(true);
    await login(demoEmail, demoPass, demoRole);
    setIsLoading(false);
  };

  return (
    <div className="bg-[#131826] border border-white/[0.08] p-8 sm:p-10 rounded-3xl shadow-2xl space-y-5 backdrop-blur-xl relative">
      
      {/* Header */}
      <div>
        <div className="text-[10px] uppercase font-bold tracking-widest text-gray-400 mb-1">
          SECURE ACCESS GATEWAY
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Sign In</h2>
        <p className="text-xs text-gray-400 mt-1">
          Registered members only. You must create an account first to access the studio.
        </p>
      </div>

      {/* Success Banner if redirected from signup */}
      {successMsg && (
        <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs rounded-xl flex items-center gap-2">
          <span>✅</span>
          <span>{successMsg}</span>
        </div>
      )}

      {/* Error Message Alert */}
      {errorMsg && (
        <div className="p-3 bg-red-500/10 border border-red-500/30 text-red-400 text-xs rounded-xl space-y-1">
          <div className="flex items-center gap-2 font-bold">
            <span>⚠️</span>
            <span>Authentication Refused</span>
          </div>
          <p className="text-[11px] text-gray-300 pl-6">{errorMsg}</p>
          {errorMsg.includes("Account not found") && (
            <div className="pt-2 pl-6">
              <Link
                href="/signup"
                className="inline-block bg-purple-600 hover:bg-purple-500 text-white font-bold text-[11px] px-3 py-1.5 rounded-lg transition"
              >
                Create Account Now →
              </Link>
            </div>
          )}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-gray-300 mb-1.5">
            Registered Email Address
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@company.com"
            className="w-full bg-[#182033] border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-purple-500 transition"
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-1.5">
            <label className="text-xs font-semibold text-gray-300">
              Password
            </label>
            <Link href="/forgot-password" className="text-xs text-purple-400 hover:text-purple-300 transition">
              Forgot?
            </Link>
          </div>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-[#182033] border border-white/10 rounded-xl px-4 py-3 pr-10 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-purple-500 transition"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white text-xs transition"
              title={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? "👁️" : "🙈"}
            </button>
          </div>
        </div>

        {/* Remember Me */}
        <div className="flex items-center justify-between text-xs text-gray-400">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="rounded bg-[#182033] border-white/20 text-purple-600 focus:ring-0 cursor-pointer"
            />
            <span>Remember my email</span>
          </label>
        </div>

        {/* Role toggle */}
        <div>
          <label className="block text-[11px] font-semibold text-gray-400 mb-1.5">
            Signing in as
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setRole('Admin')}
              className={`text-xs py-2 px-3 rounded-lg border font-medium transition ${
                role === 'Admin'
                  ? 'border-purple-500 bg-purple-500/20 text-white font-bold'
                  : 'border-white/5 bg-[#182033] text-gray-400 hover:text-white'
              }`}
            >
              👑 Enterprise Admin
            </button>
            <button
              type="button"
              onClick={() => setRole('Designer')}
              className={`text-xs py-2 px-3 rounded-lg border font-medium transition ${
                role === 'Designer'
                  ? 'border-purple-500 bg-purple-500/20 text-white font-bold'
                  : 'border-white/5 bg-[#182033] text-gray-400 hover:text-white'
              }`}
            >
              🎨 Lead Designer
            </button>
          </div>
        </div>

        {/* Gradient Sign In Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3.5 rounded-xl font-bold text-white text-sm flex items-center justify-center gap-2 shadow-lg shadow-purple-600/25 transition gradient-btn-purple cursor-pointer mt-2 disabled:opacity-50"
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
              Authenticating Credentials...
            </span>
          ) : (
            <>
              <span>Sign In to Workspace</span>
              <span>→</span>
            </>
          )}
        </button>
      </form>

      {/* Quick Demo Access Bar */}
      <div className="pt-3 border-t border-white/5">
        <div className="text-[10px] uppercase font-bold tracking-wider text-gray-500 text-center mb-2">
          Master Enterprise Accounts
        </div>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => handleQuickDemo('ramyadeepikakudelli@gmail.com', 'admin123', 'Admin')}
            className="p-2.5 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/20 text-[11px] text-gray-300 text-left transition"
          >
            <div className="font-bold text-purple-300 flex items-center gap-1">
              <span>👑 Ramya Deepika Kudelli</span>
            </div>
            <div className="text-[10px] text-gray-400">Master Admin • 7013370889</div>
          </button>
          <button
            type="button"
            onClick={() => handleQuickDemo('designer@jio.com', 'designer123', 'Designer')}
            className="p-2.5 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 text-[11px] text-gray-300 text-left transition"
          >
            <div className="font-bold text-blue-300 flex items-center gap-1">
              <span>🎨 Aryan Verma</span>
            </div>
            <div className="text-[10px] text-gray-400">Lead Designer</div>
          </button>
        </div>
      </div>

      {/* Footer link to sign up */}
      <div className="text-center text-xs text-gray-400 pt-1">
        Don't have an account yet?{' '}
        <Link href="/signup" className="text-purple-400 hover:text-purple-300 font-bold transition">
          Create Account Here
        </Link>
      </div>

    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#0C101A] text-gray-100 flex items-center justify-center p-6 lg:p-12 relative overflow-hidden select-none">
      
      {/* Subtle Floating Geometric Wireframes in Background (matching Screenshot 2) */}
      <div className="absolute top-12 left-16 w-32 h-32 border border-white/[0.04] rounded-2xl transform rotate-45 pointer-events-none"></div>
      <div className="absolute top-1/3 left-1/4 w-24 h-24 rounded-full bg-purple-600/5 blur-3xl pointer-events-none"></div>
      
      {/* Bottom Left Faint Bar Chart Wireframe */}
      <div className="absolute bottom-12 left-12 w-20 h-16 flex items-end gap-1.5 opacity-10 pointer-events-none">
        <div className="w-3 h-8 bg-white rounded-t-sm"></div>
        <div className="w-3 h-14 bg-white rounded-t-sm"></div>
        <div className="w-3 h-10 bg-white rounded-t-sm"></div>
        <div className="w-3 h-16 bg-white rounded-t-sm"></div>
      </div>

      {/* Bottom Right Faint Pie Chart Wireframe */}
      <div className="absolute bottom-12 right-12 w-20 h-20 border-2 border-white/[0.05] rounded-full relative opacity-20 pointer-events-none">
        <div className="absolute top-0 right-0 w-10 h-10 border-t-2 border-r-2 border-white/20 rounded-tr-full"></div>
      </div>

      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">
        
        {/* Left Side: Editorial & Value Prop (matching Screenshot 2) */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* Logo / Chat Icon with Purple-Blue Gradient */}
          <Link href="/" className="inline-flex items-center gap-3 group">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-purple-600 to-blue-500 flex items-center justify-center text-white shadow-xl shadow-purple-500/25 group-hover:scale-105 transition">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
            </div>
            <span className="text-xl font-extrabold tracking-tight text-white">
              Nexus<span className="text-blue-400">AI</span>
            </span>
          </Link>

          {/* Headline with vibrant gradient */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15] text-white">
            Elevate your<br />
            telecom <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F472B6] via-[#FB7185] to-[#FBBF24]">campaign</span><br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#60A5FA] via-[#38BDF8] to-[#22D3EE]">experience</span>
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-gray-400 max-w-lg leading-relaxed font-normal">
            Enterprise Generative AI platform for telecom marketing. Administrators have complete operational oversight, user directories, and direct messaging to all designers.
          </p>

          {/* Stat Pills at Bottom (matching Screenshot 2) */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <div className="inline-flex items-center gap-2 bg-[#141A28] border border-white/5 px-4 py-2 rounded-full text-xs text-gray-300 font-medium shadow-sm">
              <span className="text-emerald-400 font-bold">🔒 Strict Gate</span>
              <span className="text-gray-400">Registration Mandatory</span>
            </div>

            <div className="inline-flex items-center gap-2 bg-[#141A28] border border-white/5 px-4 py-2 rounded-full text-xs text-gray-300 font-medium shadow-sm">
              <span className="text-blue-400 font-bold">👥 Directives</span>
              <span className="text-gray-400">Admin-to-Designer Messaging</span>
            </div>
          </div>

        </div>

        {/* Right Side: Floating Dark Form Card (matching Screenshot 2) */}
        <div className="lg:col-span-5">
          <Suspense fallback={<div className="text-white text-center p-8">Loading Secure Gateway...</div>}>
            <LoginForm />
          </Suspense>
        </div>

      </div>
    </div>
  );
}
