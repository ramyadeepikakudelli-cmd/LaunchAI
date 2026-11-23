'use client';

import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';

export default function ApprovalsPage() {
  const { user } = useAuth();
  const [approvals, setApprovals] = useState([
    {
      id: 1,
      campaign: "Diwali 5G SuperSpeed Launch",
      brand: "Jio True 5G",
      plan: "5G Gamer (₹349)",
      submitter: "Ramya Kudelli (Designer)",
      date: "2026-11-20 14:32",
      score: "98/100 (Passed Brand Guardian)",
      status: "Pending Review"
    },
    {
      id: 2,
      campaign: "IPL Cricket Super Bonanza",
      brand: "Jio True 5G",
      plan: "Cricket Super Pack (₹449)",
      submitter: "Ramya Kudelli (Designer)",
      date: "2026-11-19 11:20",
      score: "94/100 (Passed Brand Guardian)",
      status: "Approved"
    },
    {
      id: 3,
      campaign: "College Student Weekend Binge",
      brand: "Vi Hero Unlimited",
      plan: "Hero Unlimited (₹299)",
      submitter: "Priya Mehta (Designer)",
      date: "2026-11-16 09:45",
      score: "78/100 (Contrast Warning)",
      status: "Rejected"
    }
  ]);

  const isManager = user?.role === 'Marketing Manager' || user?.role === 'Admin';

  const handleDecision = (id: number, decision: "Approved" | "Rejected") => {
    setApprovals(approvals.map(a => a.id === id ? { ...a, status: decision } : a));
    alert(`Campaign ${decision}! Logged to enterprise audit trail.`);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black text-white">Campaign Approval Workflow</h1>
          <p className="text-xs text-gray-400 mt-1">Multi-user governance gate ensuring only compliant campaigns release to production</p>
        </div>
        <span className="text-xs bg-[#111827] border border-border px-3 py-1.5 rounded-xl text-gray-300">
          Role: <strong className="text-blue-400">{user?.role || "Designer"}</strong>
        </span>
      </div>

      {!isManager && (
        <div className="bg-amber-500/10 border border-amber-500/30 text-amber-300 p-4 rounded-2xl text-xs">
          ℹ️ You are signed in as a <strong>Designer</strong>. You can view submission statuses, but only <strong>Marketing Managers</strong> or <strong>Admins</strong> can click Approve/Reject. (Switch role in top bar to test manager approvals!)
        </div>
      )}

      {/* Review Cards */}
      <div className="space-y-4">
        {approvals.map((a) => (
          <div key={a.id} className="bg-[#111827] border border-border p-6 rounded-2xl shadow-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="space-y-1.5">
              <div className="flex items-center gap-3">
                <h3 className="text-base font-bold text-white">{a.campaign}</h3>
                <span
                  className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                    a.status === 'Approved'
                      ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                      : a.status === 'Pending Review'
                      ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                      : 'bg-red-500/10 text-red-400 border border-red-500/20'
                  }`}
                >
                  {a.status}
                </span>
              </div>
              <p className="text-xs text-gray-300">
                Operator: <strong>{a.brand}</strong> • Plan: <span className="font-mono text-blue-400">{a.plan}</span>
              </p>
              <div className="text-[11px] text-gray-500 font-mono">
                Submitted by {a.submitter} at {a.date}
              </div>
              <div className="text-xs text-green-400 font-semibold">{a.score}</div>
            </div>

            {a.status === 'Pending Review' && isManager ? (
              <div className="flex gap-2">
                <button
                  onClick={() => handleDecision(a.id, "Approved")}
                  className="bg-green-600 hover:bg-green-500 text-white font-bold px-4 py-2 rounded-xl text-xs transition"
                >
                  ✓ Approve
                </button>
                <button
                  onClick={() => handleDecision(a.id, "Rejected")}
                  className="bg-red-600/20 hover:bg-red-600/30 border border-red-500/40 text-red-400 font-bold px-4 py-2 rounded-xl text-xs transition"
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
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}
