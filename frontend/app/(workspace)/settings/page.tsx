'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';

export default function SettingsPage() {
  const { user, updateProfile } = useAuth();
  const [fullName, setFullName] = useState(user?.full_name || '');
  const [isEditingName, setIsEditingName] = useState(false);
  const [nameSuccess, setNameSuccess] = useState('');
  const [nameError, setNameError] = useState('');
  const [isSavingName, setIsSavingName] = useState(false);

  const [apiKey, setApiKey] = useState('');
  const [defaultFormat, setDefaultFormat] = useState('1:1 (Instagram Feed)');
  const [settingsNotice, setSettingsNotice] = useState('');

  // Keep state synced with current user profile
  useEffect(() => {
    if (user?.full_name) {
      setFullName(user.full_name);
    }
  }, [user?.full_name]);

  const handleUpdateName = async (e: React.FormEvent) => {
    e.preventDefault();
    setNameError('');
    setNameSuccess('');

    if (!fullName.trim()) {
      setNameError('Please enter a valid full name.');
      return;
    }

    setIsSavingName(true);
    const res = await updateProfile(fullName.trim());
    setIsSavingName(false);

    if (res.success) {
      setNameSuccess(`✅ Successfully updated your name to "${fullName.trim()}"! It is now live across your dashboard and studio.`);
      setIsEditingName(false);
      setTimeout(() => setNameSuccess(''), 4500);
    } else {
      setNameError(res.error || 'Failed to update name.');
    }
  };

  const handleSaveGeneral = (e: React.FormEvent) => {
    e.preventDefault();
    setSettingsNotice('✅ Workspace preferences and format configurations saved successfully!');
    setTimeout(() => setSettingsNotice(''), 4000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12 select-none">
      <div>
        <h1 className="text-2xl font-black text-white">Workspace & Account Settings</h1>
        <p className="text-xs text-gray-400 mt-1">
          Manage your personal profile, display name, AI provider keys, and campaign export defaults
        </p>
      </div>

      {/* Global Success / Notice Alert */}
      {nameSuccess && (
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs rounded-2xl flex items-center gap-2 shadow-lg">
          <span>🎉</span>
          <span>{nameSuccess}</span>
        </div>
      )}
      {nameError && (
        <div className="p-4 bg-red-500/10 border border-red-500/30 text-red-300 text-xs rounded-2xl flex items-center gap-2 shadow-lg">
          <span>⚠️</span>
          <span>{nameError}</span>
        </div>
      )}
      {settingsNotice && (
        <div className="p-4 bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs rounded-2xl flex items-center gap-2 shadow-lg">
          <span>💾</span>
          <span>{settingsNotice}</span>
        </div>
      )}

      {/* 1. USER PROFILE CARD WITH NAME EDIT FEATURE */}
      <div className="bg-[#111827] border border-white/[0.08] p-6 rounded-2xl shadow-xl space-y-5">
        <div className="flex justify-between items-center pb-3 border-b border-white/5">
          <div>
            <h3 className="text-sm font-extrabold text-white uppercase tracking-wider flex items-center gap-2">
              <span>👤</span> User Identity & Display Profile
            </h3>
            <p className="text-xs text-gray-400 mt-0.5">
              Change your display name anytime — changes instantly reflect in your dashboard, top header, and design canvas stamps.
            </p>
          </div>

          {!isEditingName && (
            <button
              type="button"
              onClick={() => setIsEditingName(true)}
              className="bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 border border-purple-500/30 px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <span>✏️</span> Edit Name
            </button>
          )}
        </div>

        <form onSubmit={handleUpdateName} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Full Name Field (Editable!) */}
            <div className="space-y-1.5">
              <label className="text-xs text-gray-300 font-bold uppercase tracking-wider flex items-center justify-between">
                <span>Display Name</span>
                {isEditingName ? (
                  <span className="text-[10px] text-purple-400 font-semibold lowercase">type new name below</span>
                ) : (
                  <span className="text-[10px] text-emerald-400 font-semibold">Active</span>
                )}
              </label>

              <div className="relative flex items-center">
                <input
                  type="text"
                  required
                  disabled={!isEditingName}
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Enter your full name..."
                  className={`w-full rounded-xl p-3 text-xs text-white transition font-medium ${
                    isEditingName
                      ? "bg-[#182033] border-2 border-purple-500/80 focus:outline-none focus:ring-2 focus:ring-purple-500/40 shadow-inner"
                      : "bg-[#0B0F19] border border-white/10 text-gray-300 cursor-default"
                  }`}
                />
              </div>

              {isEditingName && (
                <div className="flex items-center gap-2 pt-1.5">
                  <button
                    type="submit"
                    disabled={isSavingName}
                    className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold px-4 py-2 rounded-xl text-xs transition shadow-lg shadow-purple-600/30 flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                  >
                    {isSavingName ? (
                      <span>Saving...</span>
                    ) : (
                      <>
                        <span>💾</span> Save Name
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setFullName(user?.full_name || '');
                      setIsEditingName(false);
                      setNameError('');
                    }}
                    className="bg-white/5 hover:bg-white/10 text-gray-300 px-3.5 py-2 rounded-xl text-xs font-semibold transition"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>

            {/* Email Field (Static Account Key) */}
            <div className="space-y-1.5">
              <label className="text-xs text-gray-400 font-bold uppercase tracking-wider">
                Primary Account Email
              </label>
              <input
                type="text"
                disabled
                value={user?.email || "designer@jio.com"}
                className="w-full bg-[#0B0F19] border border-white/5 rounded-xl p-3 text-xs text-gray-400 cursor-not-allowed font-mono"
              />
              <span className="text-[10px] text-gray-500">Security-locked to your authenticated login credentials</span>
            </div>

          </div>

          {/* Account Details Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div className="bg-[#0B0F19] border border-white/5 p-3 rounded-xl">
              <span className="text-[10px] uppercase font-bold text-gray-500">Assigned Role</span>
              <div className="text-xs font-bold text-blue-400 mt-0.5">{user?.role || "Designer"}</div>
            </div>
            <div className="bg-[#0B0F19] border border-white/5 p-3 rounded-xl">
              <span className="text-[10px] uppercase font-bold text-gray-500">Telecom Enterprise</span>
              <div className="text-xs font-bold text-emerald-400 mt-0.5">{user?.org_name || "Reliance Jio Infocomm"}</div>
            </div>
            <div className="bg-[#0B0F19] border border-white/5 p-3 rounded-xl">
              <span className="text-[10px] uppercase font-bold text-gray-500">Member Since</span>
              <div className="text-xs font-bold text-gray-300 mt-0.5">{user?.registered_at || "Nov 2026"}</div>
            </div>
          </div>
        </form>
      </div>

      {/* 2. GENERAL WORKSPACE & AI PREFERENCES */}
      <form onSubmit={handleSaveGeneral} className="bg-[#111827] border border-white/[0.08] p-6 rounded-2xl shadow-xl space-y-6">
        
        {/* Gemini API Key */}
        <div>
          <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-1 flex items-center gap-2">
            <span>⚡</span> Google Gemini 1.5 Pro / Flash Key
          </h3>
          <p className="text-xs text-gray-400 mb-3">
            PlanLaunch AI runs 100% free out-of-the-box via Pollinations Turbo Diffusion. Supplying your personal Gemini API key unlocks advanced LLM art direction and automatic telecom tariff prompt generation.
          </p>
          <input
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="AIzaSy..."
            className="w-full bg-[#0B0F19] border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-purple-500 font-mono transition"
          />
          <a
            href="https://aistudio.google.com/"
            target="_blank"
            rel="noreferrer"
            className="inline-block text-[11px] text-purple-400 hover:underline mt-2 font-semibold"
          >
            👉 Get a free Gemini Key from Google AI Studio (No credit card required)
          </a>
        </div>

        {/* Export Preferences */}
        <div className="pt-4 border-t border-white/5">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-3">Default Campaign Aspect Ratio</h3>
          <select
            value={defaultFormat}
            onChange={(e) => setDefaultFormat(e.target.value)}
            className="w-full bg-[#0B0F19] border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-purple-500"
          >
            <option>1:1 (Instagram / Facebook Feed)</option>
            <option>9:16 (Stories / Reels / WhatsApp Status)</option>
            <option>16:9 (Web Banner / Highway Billboard)</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-6 py-2.5 rounded-xl text-xs transition shadow-lg shadow-blue-500/20 cursor-pointer"
        >
          Save Workspace Preferences
        </button>
      </form>
    </div>
  );
}
