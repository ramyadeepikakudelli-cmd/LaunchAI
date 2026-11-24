'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth, User, AdminMessage, MASTER_ADMIN_EMAIL } from '@/contexts/AuthContext';

export default function DashboardPage() {
  const { user, messages, registeredUsers, sendAdminMessage, deleteAdminMessage, removeUser } = useAuth();
  const isAdmin = user?.role === 'Admin' || user?.email === MASTER_ADMIN_EMAIL;

  // State for message composer (Admin only)
  const [selectedRecipientId, setSelectedRecipientId] = useState<string>('all');
  const [msgSubject, setMsgSubject] = useState('');
  const [msgContent, setMsgContent] = useState('');
  const [msgPriority, setMsgPriority] = useState<AdminMessage['priority']>('Directive');
  const [sendSuccess, setSendSuccess] = useState(false);
  const [isSending, setIsSending] = useState(false);

  // State for removing a user (Admin only)
  const [userPendingRemoval, setUserPendingRemoval] = useState<User | null>(null);
  const [removeNotice, setRemoveNotice] = useState('');
  const [isRemoving, setIsRemoving] = useState(false);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!msgSubject.trim() || !msgContent.trim()) return;

    setIsSending(true);
    let recipientName = "All Designers";
    let recipientId: number | null = null;

    if (selectedRecipientId !== 'all') {
      const targetUser = registeredUsers.find(u => String(u.id) === selectedRecipientId);
      if (targetUser) {
        recipientName = targetUser.full_name;
        recipientId = targetUser.id;
      }
    }

    const res = await sendAdminMessage(recipientId, recipientName, msgSubject, msgContent, msgPriority);
    setIsSending(false);

    if (res.success) {
      setMsgSubject('');
      setMsgContent('');
      setSendSuccess(true);
      setTimeout(() => setSendSuccess(false), 3500);
    }
  };

  const handleQuickMsgToUser = (target: User) => {
    setSelectedRecipientId(String(target.id));
    setMsgSubject(`Directives for ${target.full_name}`);
    window.scrollTo({ top: 380, behavior: 'smooth' });
  };

  const handleConfirmRemove = async () => {
    if (!userPendingRemoval) return;
    setIsRemoving(true);
    const res = await removeUser(userPendingRemoval.id, userPendingRemoval.email);
    setIsRemoving(false);

    if (res.success) {
      setRemoveNotice(`User "${userPendingRemoval.full_name}" (${userPendingRemoval.email}) has been permanently removed and their login access has been revoked.`);
      setUserPendingRemoval(null);
      setTimeout(() => setRemoveNotice(''), 5000);
    } else {
      alert(res.error || "Failed to remove user.");
      setUserPendingRemoval(null);
    }
  };

  return (
    <div className="space-y-6 pb-12 select-none">
      
      {/* Removal Confirmation Modal */}
      {userPendingRemoval && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#131826] border border-red-500/30 p-6 sm:p-7 rounded-2xl max-w-md w-full shadow-2xl space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-red-500/20 text-red-400 flex items-center justify-center text-2xl font-bold">
                ⚠️
              </div>
              <div>
                <h3 className="text-base font-extrabold text-white">Revoke & Remove User Account</h3>
                <p className="text-xs text-gray-400">Permanent administrator action</p>
              </div>
            </div>

            <p className="text-xs text-gray-300 leading-relaxed">
              Are you sure you want to permanently remove <strong className="text-white">{userPendingRemoval.full_name}</strong> (<span className="text-blue-300 font-mono">{userPendingRemoval.email}</span>)?
              <br /><br />
              Their account will be revoked immediately, their stored session will be terminated, and they will <strong>no longer be able to sign in</strong>.
            </p>

            <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-white/5">
              <button
                type="button"
                onClick={() => setUserPendingRemoval(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 transition"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmRemove}
                disabled={isRemoving}
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-red-600 hover:bg-red-500 transition shadow-lg shadow-red-600/30 disabled:opacity-50"
              >
                {isRemoving ? "Removing..." : "Yes, Remove User"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[#0D121F] border border-white/[0.06] p-5 rounded-2xl">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight flex flex-wrap items-center gap-2">
            <span>Welcome, {user?.full_name || "Creator"}</span>
            <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold border ${
              isAdmin
                ? 'bg-purple-500/20 text-purple-300 border-purple-500/30'
                : 'bg-blue-500/20 text-blue-300 border-blue-500/30'
            }`}>
              {isAdmin ? "👑 Master Enterprise Administrator" : "🎨 Lead Designer"}
            </span>
            {isAdmin && (
              <span className="text-[11px] bg-white/[0.04] border border-white/10 text-gray-300 px-2.5 py-0.5 rounded-full font-mono">
                📱 7013370889 • 🎂 Aug 25
              </span>
            )}
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            {isAdmin
              ? "Master Administrator Command Center: Unrestricted control over user access, account removals, tariff plans, and direct designer messaging."
              : "Designer Creative Studio: Synthesize 8K 5G campaign visuals, edit vector stamps in canvas, and follow admin directives."}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs bg-[#121828] border border-white/10 px-3 py-1.5 rounded-xl text-gray-300 font-medium">
            🏢 {user?.org_name || "Reliance Jio Infocomm"}
          </span>
        </div>
      </div>

      {/* Global Success / Removal Notice Banner */}
      {removeNotice && (
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs rounded-2xl flex items-center gap-2 shadow-lg">
          <span>✅</span>
          <span>{removeNotice}</span>
        </div>
      )}

      {/* ========================================================
          ADMIN VIEW: EXECUTIVE COMMAND & USER DIRECTORY
         ======================================================== */}
      {isAdmin ? (
        <div className="space-y-6">
          
          {/* 4 Admin KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Registered Users */}
            <div className="relative overflow-hidden rounded-2xl p-5 border border-white/[0.06] bg-gradient-to-br from-[#10192E] via-[#0E1527] to-[#0A0E1A] shadow-lg">
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-3xl font-extrabold text-white tracking-tight">
                    {registeredUsers.length}
                  </div>
                  <div className="text-xs font-semibold text-gray-300 mt-1">
                    Registered Users & Designers
                  </div>
                </div>
                <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
                  👥
                </div>
              </div>
              <div className="mt-3 text-[11px] text-emerald-400 font-medium flex items-center gap-1">
                <span>●</span> Admin can remove any user anytime
              </div>
            </div>

            {/* Active Team Campaigns */}
            <div className="relative overflow-hidden rounded-2xl p-5 border border-white/[0.06] bg-gradient-to-br from-[#2A1D12] via-[#1E150F] to-[#0E0C09] shadow-lg">
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-3xl font-extrabold text-white tracking-tight">
                    14
                  </div>
                  <div className="text-xs font-semibold text-gray-300 mt-1">
                    Live Team Campaigns
                  </div>
                </div>
                <div className="w-10 h-10 rounded-xl bg-amber-600 flex items-center justify-center text-white shadow-lg shadow-amber-500/30">
                  🚀
                </div>
              </div>
              <div className="mt-3 text-[11px] text-amber-400 font-medium">
                Jio, Airtel & Vi marketing active
              </div>
            </div>

            {/* Total Visuals Synthesized */}
            <div className="relative overflow-hidden rounded-2xl p-5 border border-white/[0.06] bg-gradient-to-br from-[#261530] via-[#190F21] to-[#0D0812] shadow-lg">
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-3xl font-extrabold text-white tracking-tight">
                    1,248
                  </div>
                  <div className="text-xs font-semibold text-gray-300 mt-1">
                    Visuals Synthesized
                  </div>
                </div>
                <div className="w-10 h-10 rounded-xl bg-purple-600 flex items-center justify-center text-white shadow-lg shadow-purple-500/30">
                  🎨
                </div>
              </div>
              <div className="mt-3 text-[11px] text-purple-400 font-medium">
                FLUX.1 8K unmetered engine
              </div>
            </div>

            {/* GPU Cluster & Credit Pool */}
            <div className="relative overflow-hidden rounded-2xl p-5 border border-white/[0.06] bg-gradient-to-br from-[#2E1418] via-[#1F0E11] to-[#12080A] shadow-lg">
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-3xl font-extrabold text-white tracking-tight">
                    14,400
                  </div>
                  <div className="text-xs font-semibold text-gray-300 mt-1">
                    Enterprise Credits Pool
                  </div>
                </div>
                <div className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center text-white shadow-lg shadow-red-500/30">
                  ⚡
                </div>
              </div>
              <div className="mt-3 text-[11px] text-emerald-400 font-medium">
                Administrator: Ramya Deepika Kudelli
              </div>
            </div>

          </div>

          {/* Admin Messaging Dispatch to Designers */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Message Composer (7 cols) */}
            <div className="lg:col-span-7 bg-[#0E1322] border border-white/[0.08] p-6 rounded-2xl shadow-xl space-y-4">
              <div className="flex justify-between items-center border-b border-white/5 pb-3">
                <div>
                  <h2 className="text-base font-extrabold text-white flex items-center gap-2">
                    <span>📢</span>
                    <span>Broadcast Directive to Designers</span>
                  </h2>
                  <p className="text-xs text-gray-400">
                    Send instructions, campaign guidelines, or notices to your registered team.
                  </p>
                </div>
                <span className="text-[10px] bg-purple-500/10 text-purple-400 border border-purple-500/20 px-2.5 py-1 rounded-full font-bold">
                  Admin Exclusive
                </span>
              </div>

              {sendSuccess && (
                <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs rounded-xl flex items-center gap-2">
                  <span>✅</span>
                  <span>Message successfully dispatched to designers!</span>
                </div>
              )}

              <form onSubmit={handleSendMessage} className="space-y-3.5">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-gray-300 mb-1">
                      Recipient
                    </label>
                    <select
                      value={selectedRecipientId}
                      onChange={(e) => setSelectedRecipientId(e.target.value)}
                      className="w-full bg-[#141A28] border border-white/10 rounded-xl px-3 py-2 text-white text-xs focus:outline-none focus:border-purple-500"
                    >
                      <option value="all">📢 All Designers (Broadcast)</option>
                      {registeredUsers
                        .filter(u => u.email !== MASTER_ADMIN_EMAIL)
                        .map((u) => (
                          <option key={u.id} value={String(u.id)}>
                            👤 {u.full_name} ({u.role})
                          </option>
                        ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-gray-300 mb-1">
                      Priority Level
                    </label>
                    <select
                      value={msgPriority}
                      onChange={(e) => setMsgPriority(e.target.value as any)}
                      className="w-full bg-[#141A28] border border-white/10 rounded-xl px-3 py-2 text-white text-xs focus:outline-none focus:border-purple-500"
                    >
                      <option value="Directive">📌 Directive (Brand Requirement)</option>
                      <option value="Urgent">🚨 Urgent (Immediate Action)</option>
                      <option value="Notice">ℹ️ General Notice</option>
                      <option value="Info">💡 Creative Suggestion</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-gray-300 mb-1">
                    Subject / Title
                  </label>
                  <input
                    type="text"
                    required
                    value={msgSubject}
                    onChange={(e) => setMsgSubject(e.target.value)}
                    placeholder="e.g. Mandatory Disclaimer Text for 5G Unlimited Plans"
                    className="w-full bg-[#141A28] border border-white/10 rounded-xl px-3.5 py-2 text-white text-xs placeholder-gray-500 focus:outline-none focus:border-purple-500 transition"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-gray-300 mb-1">
                    Message Content / Guidelines
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={msgContent}
                    onChange={(e) => setMsgContent(e.target.value)}
                    placeholder="Type guidelines, required colors, tariff modifications, or feedback..."
                    className="w-full bg-[#141A28] border border-white/10 rounded-xl p-3 text-white text-xs placeholder-gray-500 focus:outline-none focus:border-purple-500 transition"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSending}
                  className="w-full py-2.5 rounded-xl font-bold text-white text-xs flex items-center justify-center gap-2 shadow-lg shadow-purple-600/25 transition gradient-btn-purple cursor-pointer disabled:opacity-50"
                >
                  {isSending ? "Sending..." : "📤 Dispatch Message to Designers"}
                </button>
              </form>
            </div>

            {/* Active Directives List (5 cols) */}
            <div className="lg:col-span-5 bg-[#0E1322] border border-white/[0.08] p-6 rounded-2xl shadow-xl flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center border-b border-white/5 pb-3 mb-3">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <span>📨</span>
                    <span>Dispatched Messages ({messages.length})</span>
                  </h3>
                  <span className="text-[10px] text-gray-400">Live on Designers' Screen</span>
                </div>

                <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
                  {messages.map((m) => (
                    <div
                      key={m.id}
                      className="p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition relative group"
                    >
                      <div className="flex justify-between items-start gap-2">
                        <span className={`text-[9px] px-2 py-0.5 rounded-md font-bold uppercase ${
                          m.priority === 'Urgent'
                            ? 'bg-red-500/20 text-red-300 border border-red-500/30'
                            : m.priority === 'Directive'
                            ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                            : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                        }`}>
                          {m.priority}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] text-gray-500">{m.created_at}</span>
                          <button
                            onClick={() => deleteAdminMessage(m.id)}
                            className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-400 text-xs transition"
                            title="Delete Message"
                          >
                            ✕
                          </button>
                        </div>
                      </div>
                      <div className="text-xs font-bold text-white mt-1.5">{m.subject}</div>
                      <p className="text-[11px] text-gray-400 mt-1 line-clamp-2 leading-relaxed">
                        {m.content}
                      </p>
                      <div className="text-[10px] text-gray-500 mt-2 flex items-center justify-between">
                        <span>To: <strong className="text-gray-300">{m.receiver_name}</strong></span>
                        <span>From: Ramya Deepika Kudelli (Admin)</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-white/5 text-[11px] text-gray-500 flex justify-between items-center mt-3">
                <span>Directives are persistently delivered</span>
                <span className="text-purple-400 font-semibold">Active</span>
              </div>
            </div>

          </div>

          {/* Registered Users & Designers Directory (Full Details Table + Remove User Action) */}
          <div className="bg-[#0E1322] border border-white/[0.08] p-6 rounded-2xl shadow-xl space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-white/5 pb-4">
              <div>
                <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                  <span>👥</span>
                  <span>Registered Users & Designers Directory</span>
                </h3>
                <p className="text-xs text-gray-400">
                  Full registry of all accounts with Age, DOB, and Phone. Admin can send directives or remove any user.
                </p>
              </div>
              <span className="text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1 rounded-full font-bold">
                {registeredUsers.length} Active Accounts
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-gray-300">
                <thead className="text-[10px] uppercase font-bold text-gray-400 bg-white/[0.02] border-b border-white/5">
                  <tr>
                    <th className="py-3 px-4">Member Name</th>
                    <th className="py-3 px-3">Age</th>
                    <th className="py-3 px-3">DOB</th>
                    <th className="py-3 px-3">Phone Number</th>
                    <th className="py-3 px-4">Email</th>
                    <th className="py-3 px-3">Role</th>
                    <th className="py-3 px-4">Carrier</th>
                    <th className="py-3 px-3">Registered</th>
                    <th className="py-3 px-4 text-right">Admin Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {registeredUsers.map((u) => {
                    const isMasterAdmin = u.email === MASTER_ADMIN_EMAIL;
                    return (
                      <tr key={u.id} className="hover:bg-white/[0.02] transition">
                        <td className="py-3.5 px-4 font-bold text-white flex items-center gap-2.5">
                          <div className={`w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-extrabold ${
                            isMasterAdmin
                              ? 'bg-gradient-to-tr from-amber-500 via-pink-500 to-purple-600 ring-2 ring-purple-500/50'
                              : 'bg-gradient-to-tr from-purple-600 to-blue-500'
                          }`}>
                            {u.full_name.charAt(0)}
                          </div>
                          <div className="flex items-center gap-1.5">
                            <span>{u.full_name}</span>
                            {isMasterAdmin && (
                              <span className="text-amber-400" title="Master Administrator">👑</span>
                            )}
                          </div>
                        </td>
                        <td className="py-3.5 px-3 font-mono text-gray-300">
                          {u.age || 24} yrs
                        </td>
                        <td className="py-3.5 px-3 font-mono text-purple-300 font-semibold">
                          {u.dob || (isMasterAdmin ? "Aug 25" : "—")}
                        </td>
                        <td className="py-3.5 px-3 font-mono text-blue-300">
                          {u.phone || (isMasterAdmin ? "7013370889" : "+91 98765 43210")}
                        </td>
                        <td className="py-3.5 px-4 text-gray-400">
                          {u.email}
                        </td>
                        <td className="py-3.5 px-3">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            isMasterAdmin
                              ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                              : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                          }`}>
                            {isMasterAdmin ? "Admin" : u.role}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-gray-300 font-medium">
                          {u.org_name || "Reliance Jio Infocomm"}
                        </td>
                        <td className="py-3.5 px-3 text-gray-500 text-[11px]">
                          {u.registered_at || "Recent"}
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          {isMasterAdmin ? (
                            <span className="text-[10px] bg-purple-500/20 text-purple-300 border border-purple-500/30 px-2.5 py-1 rounded-lg font-bold">
                              👑 Master Admin (Protected)
                            </span>
                          ) : (
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={() => handleQuickMsgToUser(u)}
                                className="bg-purple-600/20 hover:bg-purple-600 text-purple-300 hover:text-white font-semibold text-[11px] px-2.5 py-1 rounded-lg transition border border-purple-500/30"
                                title="Send direct message"
                              >
                                ✉️ Directive
                              </button>
                              <button
                                onClick={() => setUserPendingRemoval(u)}
                                className="bg-red-500/20 hover:bg-red-600 text-red-300 hover:text-white font-semibold text-[11px] px-2.5 py-1 rounded-lg transition border border-red-500/30"
                                title="Revoke and remove user"
                              >
                                🗑️ Remove User
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Quick Admin Actions Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link
              href="/plans"
              className="p-4 rounded-2xl bg-[#0E1322] border border-white/[0.08] hover:border-purple-500/40 transition group flex items-center gap-3.5"
            >
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center text-lg group-hover:scale-110 transition">
                📋
              </div>
              <div>
                <div className="text-xs font-bold text-white">Manage Telecom Tariff Catalog</div>
                <div className="text-[11px] text-gray-400">Edit, add, or verify recharge plans</div>
              </div>
            </Link>

            <Link
              href="/approvals"
              className="p-4 rounded-2xl bg-[#0E1322] border border-white/[0.08] hover:border-blue-500/40 transition group flex items-center gap-3.5"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center text-lg group-hover:scale-110 transition">
                ✅
              </div>
              <div>
                <div className="text-xs font-bold text-white">Campaign Approvals Queue</div>
                <div className="text-[11px] text-gray-400">Review & approve designer submissions</div>
              </div>
            </Link>

            <Link
              href="/admin"
              className="p-4 rounded-2xl bg-[#0E1322] border border-white/[0.08] hover:border-emerald-500/40 transition group flex items-center gap-3.5"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center text-lg group-hover:scale-110 transition">
                🔒
              </div>
              <div>
                <div className="text-xs font-bold text-white">Audit Logs & Security System</div>
                <div className="text-[11px] text-gray-400">Inspect system access & generation logs</div>
              </div>
            </Link>
          </div>

        </div>
      ) : (
        /* ========================================================
           DESIGNER VIEW: CREATIVE STUDIO & ADMIN DIRECTIVES
           ======================================================== */
        <div className="space-y-6">
          
          {/* 4 Designer KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            <div className="relative overflow-hidden rounded-2xl p-5 border border-white/[0.06] bg-gradient-to-br from-[#10192E] via-[#0E1527] to-[#0A0E1A] shadow-lg">
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-3xl font-extrabold text-white tracking-tight">3</div>
                  <div className="text-xs font-semibold text-gray-300 mt-1">My Active Campaigns</div>
                </div>
                <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
                  🚀
                </div>
              </div>
              <div className="mt-3 text-[11px] text-blue-400 font-medium">Diwali & Cricket 5G packs</div>
            </div>

            <div className="relative overflow-hidden rounded-2xl p-5 border border-white/[0.06] bg-gradient-to-br from-[#2A1D12] via-[#1E150F] to-[#0E0C09] shadow-lg">
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-3xl font-extrabold text-white tracking-tight">16</div>
                  <div className="text-xs font-semibold text-gray-300 mt-1">Visuals Synthesized</div>
                </div>
                <div className="w-10 h-10 rounded-xl bg-amber-600 flex items-center justify-center text-white shadow-lg shadow-amber-500/30">
                  🎨
                </div>
              </div>
              <div className="mt-3 text-[11px] text-amber-400 font-medium">Ready in canvas history</div>
            </div>

            <div className="relative overflow-hidden rounded-2xl p-5 border border-white/[0.06] bg-gradient-to-br from-[#261530] via-[#190F21] to-[#0D0812] shadow-lg">
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-3xl font-extrabold text-white tracking-tight">6</div>
                  <div className="text-xs font-semibold text-gray-300 mt-1">Verified Plans Loaded</div>
                </div>
                <div className="w-10 h-10 rounded-xl bg-purple-600 flex items-center justify-center text-white shadow-lg shadow-purple-500/30">
                  👥
                </div>
              </div>
              <div className="mt-3 text-[11px] text-purple-400 font-medium">Jio, Airtel & Vi Tariffs</div>
            </div>

            <div className="relative overflow-hidden rounded-2xl p-5 border border-white/[0.06] bg-gradient-to-br from-[#2E1418] via-[#1F0E11] to-[#12080A] shadow-lg">
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-3xl font-extrabold text-white tracking-tight">1,440</div>
                  <div className="text-xs font-semibold text-gray-300 mt-1">Available Credits</div>
                </div>
                <div className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center text-white shadow-lg shadow-red-500/30">
                  ⚡
                </div>
              </div>
              <div className="mt-3 text-[11px] text-emerald-400 font-medium">Free Tier Balance</div>
            </div>

          </div>

          {/* Inbox: Messages & Directives from Master Admin Ramya Deepika Kudelli */}
          <div className="bg-[#0E1322] border border-white/[0.08] p-6 rounded-2xl shadow-xl space-y-4">
            <div className="flex justify-between items-center border-b border-white/5 pb-3">
              <div>
                <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                  <span>📬</span>
                  <span>Messages & Directives from Master Administrator (Ramya Deepika Kudelli)</span>
                </h3>
                <p className="text-xs text-gray-400">
                  Follow these active instructions when generating and styling your campaign visuals.
                </p>
              </div>
              <span className="text-[10px] bg-blue-500/10 text-blue-400 border border-blue-500/20 px-3 py-1 rounded-full font-bold">
                {messages.length} Active Directives
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className="p-4 rounded-xl bg-[#141A28] border border-white/10 hover:border-purple-500/30 transition space-y-2"
                >
                  <div className="flex justify-between items-center">
                    <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                      msg.priority === 'Urgent'
                        ? 'bg-red-500/20 text-red-300 border border-red-500/30'
                        : msg.priority === 'Directive'
                        ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                        : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                    }`}>
                      {msg.priority}
                    </span>
                    <span className="text-[10px] text-gray-500">{msg.created_at}</span>
                  </div>

                  <h4 className="text-xs font-bold text-white">{msg.subject}</h4>
                  <p className="text-xs text-gray-300 leading-relaxed font-normal">
                    {msg.content}
                  </p>

                  <div className="text-[10px] text-gray-500 pt-2 border-t border-white/5 flex justify-between">
                    <span>Target: <strong>{msg.receiver_name}</strong></span>
                    <span>Sender: <strong className="text-purple-300">Ramya Deepika Kudelli (Admin)</strong></span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Creative Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link
              href="/generator"
              className="p-5 rounded-2xl bg-gradient-to-br from-purple-900/30 to-blue-900/30 border border-purple-500/30 hover:border-purple-500 transition group flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-xl bg-purple-600 flex items-center justify-center text-2xl shadow-lg shadow-purple-600/30 group-hover:scale-105 transition">
                🎨
              </div>
              <div>
                <div className="text-sm font-bold text-white">Generate 5G Campaign Visuals</div>
                <div className="text-xs text-gray-400 mt-0.5">Synthesize 8K diffusion variations</div>
              </div>
            </Link>

            <Link
              href="/editor"
              className="p-5 rounded-2xl bg-gradient-to-br from-blue-900/30 to-indigo-900/30 border border-blue-500/30 hover:border-blue-500 transition group flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center text-2xl shadow-lg shadow-blue-600/30 group-hover:scale-105 transition">
                ✏️
              </div>
              <div>
                <div className="text-sm font-bold text-white">Open Graphic Design Canvas</div>
                <div className="text-xs text-gray-400 mt-0.5">Stamp price pills, badges & copy</div>
              </div>
            </Link>

            <Link
              href="/campaign-studio"
              className="p-5 rounded-2xl bg-gradient-to-br from-indigo-900/30 to-emerald-900/30 border border-indigo-500/30 hover:border-indigo-500 transition group flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-xl bg-indigo-600 flex items-center justify-center text-2xl shadow-lg shadow-indigo-600/30 group-hover:scale-105 transition">
                🚀
              </div>
              <div>
                <div className="text-sm font-bold text-white">Start Campaign Wizard</div>
                <div className="text-xs text-gray-400 mt-0.5">Create end-to-end plan ad</div>
              </div>
            </Link>
          </div>

        </div>
      )}

    </div>
  );
}
