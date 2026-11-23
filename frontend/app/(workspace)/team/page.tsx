'use client';

import React, { useState } from 'react';

export default function TeamPage() {
  const [members, setMembers] = useState([
    { id: 1, name: "Rajesh Sharma", email: "rajesh@jio.com", role: "Admin", joined: "2026-10-12" },
    { id: 2, name: "Priya Mehta", email: "priya@jio.com", role: "Marketing Manager", joined: "2026-10-15" },
    { id: 3, name: "Ramya Kudelli", email: "designer@jio.com", role: "Designer", joined: "2026-11-01" },
    { id: 4, name: "Ananya Roy", email: "ananya@jio.com", role: "Viewer", joined: "2026-11-10" },
  ]);

  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState('Designer');

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    const newMember = {
      id: Date.now(),
      name: inviteEmail.split('@')[0],
      email: inviteEmail,
      role: inviteRole,
      joined: "Today"
    };
    setMembers([...members, newMember]);
    setInviteEmail('');
    alert(`Invitation sent to ${inviteEmail} with role ${inviteRole}!`);
  };

  const handleRemove = (id: number) => {
    if (confirm("Remove this member from organization workspace?")) {
      setMembers(members.filter(m => m.id !== id));
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black text-white">Team & Role-Based Access Control</h1>
          <p className="text-xs text-gray-400 mt-1">Manage team member invitations, permission gates, and organizational access</p>
        </div>
      </div>

      {/* Invite Member Box */}
      <form onSubmit={handleInvite} className="bg-[#111827] border border-border p-5 rounded-2xl flex flex-col sm:flex-row gap-3 shadow-xl">
        <input
          type="email"
          required
          placeholder="colleague@telecom.com"
          value={inviteEmail}
          onChange={(e) => setInviteEmail(e.target.value)}
          className="flex-1 bg-[#0B0F19] border border-border rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
        />
        <select
          value={inviteRole}
          onChange={(e) => setInviteRole(e.target.value)}
          className="bg-[#0B0F19] border border-border rounded-xl px-3 py-2 text-xs text-white"
        >
          <option value="Designer">Designer</option>
          <option value="Marketing Manager">Marketing Manager</option>
          <option value="Admin">Admin</option>
          <option value="Viewer">Viewer</option>
        </select>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-5 py-2.5 rounded-xl text-xs transition shadow"
        >
          + Invite Member
        </button>
      </form>

      {/* Members Table */}
      <div className="bg-[#111827] border border-border rounded-2xl overflow-hidden shadow-xl">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#0B0F19] text-gray-400 uppercase font-semibold border-b border-border">
            <tr>
              <th className="p-4">Member Name</th>
              <th className="p-4">Email Address</th>
              <th className="p-4">Assigned Role</th>
              <th className="p-4">Joined Date</th>
              <th className="p-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {members.map((m) => (
              <tr key={m.id} className="hover:bg-white/5 transition">
                <td className="p-4 font-bold text-white">{m.name}</td>
                <td className="p-4 text-gray-400 font-mono">{m.email}</td>
                <td className="p-4">
                  <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                    m.role === 'Admin' ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' :
                    m.role === 'Marketing Manager' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
                    m.role === 'Designer' ? 'bg-green-500/10 text-green-400 border border-green-500/20' :
                    'bg-gray-500/10 text-gray-400 border border-gray-500/20'
                  }`}>
                    {m.role}
                  </span>
                </td>
                <td className="p-4 text-gray-500 font-mono">{m.joined}</td>
                <td className="p-4 text-right">
                  {m.role !== 'Admin' && (
                    <button
                      onClick={() => handleRemove(m.id)}
                      className="text-red-400 hover:underline"
                    >
                      Remove
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
