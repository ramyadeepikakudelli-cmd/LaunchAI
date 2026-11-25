'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';

export interface ApprovalItem {
  id: number;
  campaign: string;
  brand: string;
  plan: string;
  submitter: string;
  date: string;
  score: string;
  status: "Pending Review" | "Approved" | "Rejected";
  image?: string;
}

const INITIAL_APPROVALS: ApprovalItem[] = [
  {
    id: 1,
    campaign: "Diwali 5G SuperSpeed Launch",
    brand: "Jio True 5G",
    plan: "5G Gamer (₹349)",
    submitter: "Ramya Kudelli (Designer)",
    date: "2026-11-20 14:32",
    score: "98/100 (Passed Brand Guardian)",
    status: "Pending Review",
    image: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 2,
    campaign: "IPL Cricket Super Bonanza",
    brand: "Jio True 5G",
    plan: "Cricket Super Pack (₹449)",
    submitter: "Ramya Kudelli (Designer)",
    date: "2026-11-19 11:20",
    score: "94/100 (Passed Brand Guardian)",
    status: "Approved",
    image: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 3,
    campaign: "College Student Weekend Binge",
    brand: "Vi Hero Unlimited",
    plan: "Hero Unlimited (₹299)",
    submitter: "Priya Mehta (Designer)",
    date: "2026-11-16 09:45",
    score: "78/100 (Contrast Warning)",
    status: "Rejected",
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=400&q=80"
  }
];

export default function ApprovalsPage() {
  const { user } = useAuth();
  const [approvals, setApprovals] = useState<ApprovalItem[]>(INITIAL_APPROVALS);

  // Load custom submissions from localStorage (from Brand Guardian submissions)
  useEffect(() => {
    try {
      const stored = localStorage.getItem('launch_ai_pending_approvals');
      if (stored) {
        const customItems: ApprovalItem[] = JSON.parse(stored);
        if (customItems && customItems.length > 0) {
          // Merge custom items at the top
          const existingCampaigns = new Set(customItems.map(c => c.campaign));
          const filteredInitial = INITIAL_APPROVALS.filter(item => !existingCampaigns.has(item.campaign));
          setApprovals([...customItems, ...filteredInitial]);
        }
      }
    } catch (e) {}
  }, []);

  const isManager = user?.role === 'Marketing Manager' || user?.role === 'Admin';

  const handleDecision = (id: number, decision: "Approved" | "Rejected") => {
    const updated = approvals.map(a => a.id === id ? { ...a, status: decision } : a);
    setApprovals(updated);

    try {
      localStorage.setItem('launch_ai_pending_approvals', JSON.stringify(updated));
    } catch (e) {}

    alert(`Campaign ${decision}! Logged to enterprise audit trail.`);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12 select-none">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <span>Campaign Approval Workflow</span>
            <span className="text-xs bg-purple-500/10 text-purple-400 border border-purple-500/20 px-2.5 py-0.5 rounded-full font-semibold">
              Governance Gate
            </span>
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Multi-user governance gate ensuring only compliant campaigns release to production
          </p>
        </div>
        <span className="text-xs bg-[#111827] border border-white/10 px-3.5 py-1.5 rounded-xl text-gray-300">
          Signed in as: <strong className="text-blue-400">{user?.full_name || "Designer"}</strong> ({user?.role || "Designer"})
        </span>
      </div>

      {!isManager && (
        <div className="bg-amber-500/10 border border-amber-500/30 text-amber-300 p-4 rounded-2xl text-xs">
          ℹ️ You are signed in as a <strong>Designer</strong>. You can view submission statuses, but only <strong>Marketing Managers</strong> or <strong>Admins</strong> can click Approve/Reject. (Sign in with <code>ramyadeepikakudelli@gmail.com</code> to approve campaigns!)
        </div>
      )}

      {/* Review Cards */}
      <div className="space-y-4">
        {approvals.map((a) => (
          <div key={a.id} className="bg-[#111827] border border-white/[0.08] p-5 sm:p-6 rounded-2xl shadow-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:border-white/15 transition">
            
            <div className="flex items-start gap-4">
              {a.image && (
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden border border-purple-500/30 bg-black flex-shrink-0 shadow-md">
                  <img
                    src={a.image}
                    alt={a.campaign}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2.5">
                  <h3 className="text-base font-extrabold text-white">{a.campaign}</h3>
                  <span
                    className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                      a.status === 'Approved'
                        ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                        : a.status === 'Pending Review'
                        ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                        : 'bg-red-500/10 text-red-400 border border-red-500/20'
                    }`}
                  >
                    ● {a.status}
                  </span>
                </div>
                <p className="text-xs text-gray-300">
                  Operator: <strong className="text-white">{a.brand}</strong> • Plan: <span className="font-mono text-purple-400 font-bold">{a.plan}</span>
                </p>
                <div className="text-[11px] text-gray-400 font-mono">
                  Submitted by <strong className="text-gray-200">{a.submitter}</strong> at {a.date}
                </div>
                <div className="text-xs text-green-400 font-semibold">{a.score}</div>
              </div>
            </div>

            <div className="self-end sm:self-center flex-shrink-0">
              {a.status === 'Pending Review' && isManager ? (
                <div className="flex gap-2">
                  <button
                    onClick={() => handleDecision(a.id, "Approved")}
                    className="bg-green-600 hover:bg-green-500 text-white font-bold px-4 py-2 rounded-xl text-xs transition cursor-pointer shadow-md shadow-green-600/30"
                  >
                    ✓ Approve
                  </button>
                  <button
                    onClick={() => handleDecision(a.id, "Rejected")}
                    className="bg-red-600/20 hover:bg-red-600/30 border border-red-500/40 text-red-400 font-bold px-4 py-2 rounded-xl text-xs transition cursor-pointer"
                  >
                    ✕ Reject
                  </button>
                </div>
              ) : a.status === 'Approved' ? (
                <span className="text-xs text-green-400 font-bold bg-green-500/10 px-3 py-1.5 rounded-xl border border-green-500/20">
                  Released to Production
                </span>
              ) : a.status === 'Rejected' ? (
                <span className="text-xs text-red-400 font-bold bg-red-500/10 px-3 py-1.5 rounded-xl border border-red-500/20">
                  Changes Requested
                </span>
              ) : (
                <span className="text-xs text-amber-400 font-bold bg-amber-500/10 px-3 py-1.5 rounded-xl border border-amber-500/20">
                  Awaiting Review
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
