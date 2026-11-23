'use client';

import React from 'react';
import { useAuth } from '@/contexts/AuthContext';

export default function AdminPage() {
  const { user } = useAuth();

  const auditLogs = [
    { time: "2026-11-22 12:45:10", user: "Ramya Kudelli", action: "CAMPAIGN_CREATE", resource: "CAMPAIGN", details: "Created campaign 'Diwali 5G SuperSpeed Launch'" },
    { time: "2026-11-22 12:30:22", user: "Rajesh Sharma", action: "APPROVE_RELEASE", resource: "APPROVAL", details: "Approved campaign 'IPL Cricket Super Bonanza' for release" },
    { time: "2026-11-22 12:15:05", user: "Ramya Kudelli", action: "DIFFUSION_GEN", resource: "FLUX.1", details: "Generated 4 visual variations (Seed #101)" },
    { time: "2026-11-22 11:50:18", user: "System", action: "AUDIT_VERIFY", resource: "GUARDIAN", details: "Passed legal compliance audit (Score: 98/100)" },
    { time: "2026-11-22 11:10:00", user: "Rajesh Sharma", action: "LOGIN", resource: "AUTH", details: "Administrator authenticated from IP 127.0.0.1" },
  ];

  if (user?.role !== 'Admin') {
    return (
      <div className="bg-red-500/10 border border-red-500/30 p-8 rounded-2xl text-center space-y-3 max-w-lg mx-auto mt-12">
        <div className="text-3xl">🔒</div>
        <h2 className="text-lg font-bold text-red-400">Administrator Access Required</h2>
        <p className="text-xs text-gray-300">
          Your current role is <strong>{user?.role || "Designer"}</strong>. Only Enterprise Administrators have access to manage security, view audit logs, and modify telecom plan catalogs.
        </p>
        <p className="text-[11px] text-gray-500">
          To access admin features, sign in as <strong>Ramya Deepika Kudelli (ramyadeepikakudelli@gmail.com)</strong>.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-white">Administrator Control Panel & Audit Logs</h1>
        <p className="text-xs text-gray-400 mt-1">Tamper-evident system activity monitoring, storage stats, and organizational security</p>
      </div>

      {/* System Health KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-[#111827] border border-border p-5 rounded-2xl shadow">
          <div className="text-xs font-bold text-gray-400 uppercase">FastAPI Backend Status</div>
          <div className="text-lg font-black text-green-400 mt-1 flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></span>
            Operational (200 OK)
          </div>
        </div>
        <div className="bg-[#111827] border border-border p-5 rounded-2xl shadow">
          <div className="text-xs font-bold text-gray-400 uppercase">Database Store</div>
          <div className="text-lg font-black text-blue-400 mt-1">SQLite / SQLAlchemy</div>
        </div>
        <div className="bg-[#111827] border border-border p-5 rounded-2xl shadow">
          <div className="text-xs font-bold text-gray-400 uppercase">Storage Quota</div>
          <div className="text-lg font-black text-purple-400 mt-1">12.4 MB / 10 GB</div>
        </div>
        <div className="bg-[#111827] border border-border p-5 rounded-2xl shadow">
          <div className="text-xs font-bold text-gray-400 uppercase">Active Workers</div>
          <div className="text-lg font-black text-amber-400 mt-1">FLUX.1 (Serverless)</div>
        </div>
      </div>

      {/* Audit Log Table */}
      <div className="bg-[#111827] border border-border rounded-2xl p-6 shadow-xl space-y-4">
        <h3 className="font-bold text-sm text-white uppercase tracking-wider">Enterprise Security Audit Trail</h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#0B0F19] text-gray-400 uppercase font-semibold border-b border-border">
              <tr>
                <th className="p-3">Timestamp</th>
                <th className="p-3">User</th>
                <th className="p-3">Action</th>
                <th className="p-3">Resource</th>
                <th className="p-3">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {auditLogs.map((log, i) => (
                <tr key={i} className="hover:bg-white/5 transition">
                  <td className="p-3 font-mono text-[11px] text-gray-400">{log.time}</td>
                  <td className="p-3 font-bold text-white">{log.user}</td>
                  <td className="p-3">
                    <span className="bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded text-[10px] font-mono font-bold border border-blue-500/20">
                      {log.action}
                    </span>
                  </td>
                  <td className="p-3 text-gray-300 font-mono text-[11px]">{log.resource}</td>
                  <td className="p-3 text-gray-300">{log.details}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
