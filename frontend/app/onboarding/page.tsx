'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth, User } from '@/contexts/AuthContext';

export default function OnboardingPage() {
  const router = useRouter();
  const { switchOrg, switchRole } = useAuth();
  const [step, setStep] = useState(1);
  const [orgName, setOrgName] = useState('Reliance Jio Infocomm');
  const [orgType, setOrgType] = useState('National Telecom Carrier');
  const [role, setRole] = useState<User['role']>('Designer');
  const [primaryBrand, setPrimaryBrand] = useState('Jio True 5G');
  const [networkTag, setNetworkTag] = useState('TRUE 5G');

  const handleComplete = () => {
    switchOrg(1, orgName);
    switchRole(role);
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] flex flex-col justify-center items-center p-6">
      <div className="flex items-center gap-2 mb-6">
        <span className="text-3xl">📡</span>
        <span className="text-2xl font-black bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
          LAUNCH AI
        </span>
      </div>

      <div className="bg-[#111827] border border-border p-8 rounded-2xl w-full max-w-lg shadow-2xl space-y-6">
        <div className="flex justify-between items-center pb-4 border-b border-border">
          <div>
            <h1 className="text-lg font-bold text-white">Organization Onboarding</h1>
            <p className="text-xs text-gray-400">Step {step} of 3: Configure your workspace preferences</p>
          </div>
          <span className="text-xs font-mono font-bold text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded-full">
            {step === 1 ? "Organization" : step === 2 ? "Role" : "Brand Profile"}
          </span>
        </div>

        {step === 1 && (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">
                Telecom Enterprise Name
              </label>
              <input
                type="text"
                value={orgName}
                onChange={(e) => setOrgName(e.target.value)}
                className="w-full bg-[#0B0F19] border border-border rounded-xl px-4 py-2.5 text-white text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">
                Organization Type
              </label>
              <select
                value={orgType}
                onChange={(e) => setOrgType(e.target.value)}
                className="w-full bg-[#0B0F19] border border-border rounded-xl px-3.5 py-2 text-white text-sm"
              >
                <option>National Telecom Carrier (Tier 1 MNO)</option>
                <option>Regional ISP / Fiber Broadband Provider</option>
                <option>MVNO / Digital Telecom Brand</option>
                <option>Telecom Creative Advertising Agency</option>
              </select>
            </div>

            <button
              onClick={() => setStep(2)}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl transition text-sm mt-4"
            >
              Next: Select Role →
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                Your Primary Role in Workspace
              </label>
              <div className="space-y-2">
                {[
                  { role: "Designer", title: "Creative Designer", desc: "Build campaigns, generate visuals, and stamp brand assets." },
                  { role: "Marketing Manager", title: "Marketing Manager", desc: "Review submissions, manage teams, and approve campaign releases." },
                  { role: "Admin", title: "Workspace Administrator", desc: "Manage organization settings, security audits, and API limits." },
                  { role: "Viewer", title: "Reviewer / Viewer", desc: "Browse approved assets and download release packages." }
                ].map((item) => (
                  <div
                    key={item.role}
                    onClick={() => setRole(item.role as User['role'])}
                    className={`p-3.5 rounded-xl border cursor-pointer transition flex justify-between items-center ${
                      role === item.role
                        ? "bg-blue-600/10 border-blue-500 text-white"
                        : "bg-[#0B0F19] border-border text-gray-400 hover:border-gray-600"
                    }`}
                  >
                    <div>
                      <div className="text-sm font-bold text-white">{item.title}</div>
                      <div className="text-xs text-gray-400">{item.desc}</div>
                    </div>
                    {role === item.role && <span className="text-blue-400 font-bold">✓</span>}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setStep(1)}
                className="flex-1 bg-[#0B0F19] border border-border text-gray-300 font-semibold py-2.5 rounded-xl text-xs"
              >
                Back
              </button>
              <button
                onClick={() => setStep(3)}
                className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-bold py-2.5 rounded-xl text-xs"
              >
                Next: Brand Profile →
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">
                Default Brand Profile
              </label>
              <input
                type="text"
                value={primaryBrand}
                onChange={(e) => setPrimaryBrand(e.target.value)}
                className="w-full bg-[#0B0F19] border border-border rounded-xl px-4 py-2.5 text-white text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">
                Official 5G Network Tag (e.g. TRUE 5G, 5G PLUS)
              </label>
              <input
                type="text"
                value={networkTag}
                onChange={(e) => setNetworkTag(e.target.value)}
                className="w-full bg-[#0B0F19] border border-border rounded-xl px-4 py-2.5 text-white text-sm"
              />
            </div>

            <div className="flex gap-3 pt-4">
              <button
                onClick={() => setStep(2)}
                className="flex-1 bg-[#0B0F19] border border-border text-gray-300 font-semibold py-2.5 rounded-xl text-xs"
              >
                Back
              </button>
              <button
                onClick={handleComplete}
                className="flex-1 bg-green-600 hover:bg-green-500 text-white font-bold py-2.5 rounded-xl text-xs shadow-lg shadow-green-500/20"
              >
                Launch Workspace Dashboard →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
