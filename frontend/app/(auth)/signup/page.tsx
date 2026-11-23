'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

export default function SignUpPage() {
  const router = useRouter();
  const { signup } = useAuth();
  
  const [fullName, setFullName] = useState('');
  const [age, setAge] = useState('24');
  const [dob, setDob] = useState('Aug 25');
  const [phone, setPhone] = useState('7013370889');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [orgName, setOrgName] = useState('Reliance Jio Infocomm');
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Calculate password strength score (0 to 100)
  const calculateStrength = (pwd: string) => {
    if (!pwd) return 0;
    let score = 0;
    if (pwd.length >= 6) score += 30;
    if (pwd.length >= 10) score += 20;
    if (/[A-Z]/.test(pwd)) score += 20;
    if (/[0-9]/.test(pwd)) score += 15;
    if (/[^A-Za-z0-9]/.test(pwd)) score += 15;
    return Math.min(100, score);
  };

  const strength = calculateStrength(password);
  const strengthColor =
    strength < 40 ? 'bg-red-500' : strength < 70 ? 'bg-amber-500' : 'bg-emerald-500';
  const strengthText =
    strength < 40 ? 'Weak' : strength < 70 ? 'Moderate' : 'Strong & Secure';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!fullName.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }
    const ageNum = parseInt(age);
    if (!age || isNaN(ageNum) || ageNum < 18 || ageNum > 85) {
      setErrorMsg('Please enter a valid age between 18 and 85.');
      return;
    }
    if (!dob.trim()) {
      setErrorMsg('Please enter your date of birth (e.g. Aug 25).');
      return;
    }
    if (!phone.trim() || phone.length < 8) {
      setErrorMsg('Please enter a valid mobile phone number.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setErrorMsg('Please enter a valid work email address.');
      return;
    }
    if (password.length < 6) {
      setErrorMsg('Password must be at least 6 characters long.');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMsg('Passwords do not match. Please check and try again.');
      return;
    }
    if (!agreeTerms) {
      setErrorMsg('You must accept the terms of service.');
      return;
    }

    setIsLoading(true);
    const result = await signup(
      fullName.trim(),
      email.trim(),
      password,
      ageNum,
      phone.trim(),
      dob.trim(),
      orgName,
      'Designer'
    );
    setIsLoading(false);

    if (!result.success) {
      setErrorMsg(result.error || 'Failed to create account.');
    }
  };

  return (
    <div className="min-h-screen bg-[#0C101A] text-gray-100 flex items-center justify-center p-6 lg:p-12 relative overflow-hidden select-none">
      
      {/* Background wireframes */}
      <div className="absolute top-12 left-16 w-32 h-32 border border-white/[0.04] rounded-2xl transform rotate-45 pointer-events-none"></div>
      <div className="absolute bottom-12 right-12 w-20 h-20 border-2 border-white/[0.05] rounded-full relative opacity-20 pointer-events-none"></div>

      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">
        
        {/* Left Side: Editorial Branding */}
        <div className="lg:col-span-6 space-y-8">
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

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15] text-white">
            Create your<br />
            enterprise <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F472B6] via-[#FB7185] to-[#FBBF24]">designer</span><br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#60A5FA] via-[#38BDF8] to-[#22D3EE]">workspace</span>
          </h1>

          <p className="text-sm sm:text-base text-gray-400 max-w-lg leading-relaxed font-normal">
            Register your profile to access the telecom generative campaign studio. All registered designers and members are verified and managed by Master Administrator <strong>Ramya Deepika Kudelli</strong>.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <div className="inline-flex items-center gap-2 bg-[#141A28] border border-white/5 px-4 py-2 rounded-full text-xs text-gray-300 font-medium shadow-sm">
              <span className="text-emerald-400 font-bold">🔒 Encrypted</span>
              <span className="text-gray-400">SHA-256 Auth</span>
            </div>

            <div className="inline-flex items-center gap-2 bg-[#141A28] border border-white/5 px-4 py-2 rounded-full text-xs text-gray-300 font-medium shadow-sm">
              <span className="text-purple-400 font-bold">👑 Admin Controlled</span>
              <span className="text-gray-400">Ramya Deepika Kudelli</span>
            </div>
          </div>
        </div>

        {/* Right Side: Registration Form Card */}
        <div className="lg:col-span-6">
          <div className="bg-[#131826] border border-white/[0.08] p-7 sm:p-9 rounded-3xl shadow-2xl space-y-4 backdrop-blur-xl relative">
            <div>
              <div className="text-[10px] uppercase font-bold tracking-widest text-gray-400 mb-1">
                DESIGNER REGISTRATION
              </div>
              <h2 className="text-2xl font-extrabold text-white">Sign Up</h2>
              <p className="text-xs text-gray-400 mt-0.5">Register your account to access the AI visual studio</p>
            </div>

            {errorMsg && (
              <div className="p-3 bg-red-500/10 border border-red-500/30 text-red-400 text-xs rounded-xl flex items-center gap-2">
                <span>⚠️</span>
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  Full Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Aryan Verma or Priya Mehta"
                  className="w-full bg-[#182033] border border-white/10 rounded-xl px-4 py-2 text-white text-xs placeholder-gray-500 focus:outline-none focus:border-purple-500 transition"
                />
              </div>

              {/* Age and Date of Birth in 2 columns */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    Age <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="number"
                    min="18"
                    max="90"
                    required
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    placeholder="e.g. 24"
                    className="w-full bg-[#182033] border border-white/10 rounded-xl px-4 py-2 text-white text-xs placeholder-gray-500 focus:outline-none focus:border-purple-500 transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    Date of Birth (DOB) <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    placeholder="e.g. Aug 25"
                    className="w-full bg-[#182033] border border-white/10 rounded-xl px-4 py-2 text-white text-xs placeholder-gray-500 focus:outline-none focus:border-purple-500 transition"
                  />
                </div>
              </div>

              {/* Phone Number and Work Email in 2 columns */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    Phone Number <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="7013370889"
                    className="w-full bg-[#182033] border border-white/10 rounded-xl px-4 py-2 text-white text-xs placeholder-gray-500 focus:outline-none focus:border-purple-500 transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    Work Email <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="w-full bg-[#182033] border border-white/10 rounded-xl px-4 py-2 text-white text-xs placeholder-gray-500 focus:outline-none focus:border-purple-500 transition"
                  />
                </div>
              </div>

              {/* Passwords in 2 columns */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    Password <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Min 6 characters"
                      className="w-full bg-[#182033] border border-white/10 rounded-xl px-4 py-2 pr-8 text-white text-xs placeholder-gray-500 focus:outline-none focus:border-purple-500 transition"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white text-xs"
                    >
                      {showPassword ? "👁️" : "🙈"}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    Confirm Password <span className="text-red-400">*</span>
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Repeat password"
                    className="w-full bg-[#182033] border border-white/10 rounded-xl px-4 py-2 text-white text-xs placeholder-gray-500 focus:outline-none focus:border-purple-500 transition"
                  />
                </div>
              </div>

              {/* Password strength meter */}
              {password && (
                <div className="space-y-1">
                  <div className="flex justify-between items-center text-[10px]">
                    <span className="text-gray-400">Security Strength</span>
                    <span className="font-semibold text-gray-300">{strengthText}</span>
                  </div>
                  <div className="w-full h-1.5 bg-[#182033] rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-300 ${strengthColor}`}
                      style={{ width: `${strength}%` }}
                    ></div>
                  </div>
                </div>
              )}

              {/* Organization and Role Indicator */}
              <div className="grid grid-cols-2 gap-3 pt-1">
                <div>
                  <label className="block text-[11px] font-semibold text-gray-400 mb-1">
                    Telecom Carrier
                  </label>
                  <select
                    value={orgName}
                    onChange={(e) => setOrgName(e.target.value)}
                    className="w-full bg-[#182033] border border-white/10 rounded-xl px-3 py-2 text-white text-xs focus:outline-none focus:border-purple-500"
                  >
                    <option value="Reliance Jio Infocomm">Reliance Jio Infocomm</option>
                    <option value="Bharti Airtel Enterprise">Bharti Airtel Enterprise</option>
                    <option value="Vodafone Idea (Vi)">Vodafone Idea (Vi)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-gray-400 mb-1">
                    Assigned Workspace Role
                  </label>
                  <div className="w-full bg-[#182033] border border-white/10 rounded-xl px-3 py-2 text-blue-300 font-bold text-xs flex items-center justify-between">
                    <span>🎨 Lead Designer</span>
                    <span className="text-[10px] text-gray-500">Fixed</span>
                  </div>
                </div>
              </div>

              {/* Admin Exclusivity Notice */}
              <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-[10px] text-purple-300 flex items-center gap-2">
                <span>👑</span>
                <span>Administrator access is reserved exclusively for <strong>Ramya Deepika Kudelli</strong>.</span>
              </div>

              {/* Terms Checkbox */}
              <label className="flex items-center gap-2 pt-1 text-[11px] text-gray-400 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="rounded bg-[#182033] border-white/20 text-purple-600 focus:ring-0 cursor-pointer"
                />
                <span>I agree to the telecom security & brand compliance policy</span>
              </label>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 rounded-xl font-bold text-white text-xs flex items-center justify-center gap-2 shadow-lg shadow-purple-600/25 transition gradient-btn-purple cursor-pointer mt-2 disabled:opacity-50"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                    Registering Designer Account...
                  </span>
                ) : (
                  <>
                    <span>Create Designer Account</span>
                    <span>→</span>
                  </>
                )}
              </button>
            </form>

            <div className="text-center text-xs text-gray-400 pt-1 border-t border-white/5">
              Already have an account?{' '}
              <Link href="/login" className="text-purple-400 hover:text-purple-300 font-bold transition">
                Sign In
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
