'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function CampaignsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const [campaigns, setCampaigns] = useState([
    { id: 1, name: "Diwali 5G SuperSpeed Launch", brand: "Jio True 5G", plan: "5G Gamer (₹349)", format: "1:1 Social", status: "Approved", date: "2026-11-20" },
    { id: 2, name: "IPL Cricket Super Bonanza", brand: "Jio True 5G", plan: "Cricket Super Pack (₹449)", format: "9:16 Story", status: "Under Review", date: "2026-11-19" },
    { id: 3, name: "GigaFiber Home 1Gbps Offer", brand: "Airtel 5G Plus", plan: "Infinity Plan (₹379)", format: "16:9 Banner", status: "Approved", date: "2026-11-18" },
    { id: 4, name: "Monsoon Data Rollover Promo", brand: "Vi Hero Unlimited", plan: "Hero Unlimited (₹299)", format: "1:1 Social", status: "Draft", date: "2026-11-17" },
    { id: 5, name: "Annual Unlimited 5G Saver", brand: "Jio True 5G", plan: "Annual Saver (₹2999)", format: "1:1 Social", status: "Approved", date: "2026-11-15" },
    { id: 6, name: "College Student Weekend Binge", brand: "Vi Hero Unlimited", plan: "Hero Unlimited (₹299)", format: "9:16 Story", status: "Rejected", date: "2026-11-12" },
  ]);

  const filteredCampaigns = campaigns.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) || c.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this campaign?")) {
      setCampaigns(campaigns.filter(c => c.id !== id));
    }
  };

  const handleDuplicate = (c: typeof campaigns[0]) => {
    const newCamp = { ...c, id: Date.now(), name: `${c.name} (Copy)`, status: "Draft" };
    setCampaigns([newCamp, ...campaigns]);
  };

  return (
    <div className="space-y-6">
      {/* Page Title & Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-white">Campaign Management</h1>
          <p className="text-xs text-gray-400 mt-1">Manage, duplicate, and monitor visual campaigns across all telecom operators</p>
        </div>

        <Link
          href="/campaign-studio"
          className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-4 py-2.5 rounded-xl text-xs transition shadow-lg shadow-blue-500/25 flex items-center gap-1.5"
        >
          <span>+</span> Create New Campaign Wizard
        </Link>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-[#111827] border border-border p-4 rounded-2xl flex flex-col sm:flex-row gap-4 justify-between items-center">
        <div className="w-full sm:w-80">
          <input
            type="text"
            placeholder="Search campaigns, brands, or plans..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#0B0F19] border border-border rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs text-gray-400 font-semibold">Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-[#0B0F19] border border-border rounded-xl px-3 py-2 text-xs text-white focus:outline-none cursor-pointer"
          >
            <option value="All">All Statuses</option>
            <option value="Draft">Draft</option>
            <option value="Under Review">Under Review</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* Campaigns Table */}
      <div className="bg-[#111827] border border-border rounded-2xl overflow-hidden shadow">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#0B0F19] text-gray-400 uppercase font-semibold border-b border-border">
            <tr>
              <th className="p-4">Campaign Name</th>
              <th className="p-4">Brand Profile</th>
              <th className="p-4">Recharge Offer</th>
              <th className="p-4">Channel</th>
              <th className="p-4">Status</th>
              <th className="p-4">Created</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filteredCampaigns.map((c) => (
              <tr key={c.id} className="hover:bg-white/5 transition">
                <td className="p-4 font-bold text-white">
                  <Link href="/editor" className="hover:text-blue-400 transition">
                    {c.name}
                  </Link>
                </td>
                <td className="p-4 text-gray-300">{c.brand}</td>
                <td className="p-4 font-mono text-blue-400">{c.plan}</td>
                <td className="p-4 text-gray-400">{c.format}</td>
                <td className="p-4">
                  <span
                    className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                      c.status === 'Approved'
                        ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                        : c.status === 'Under Review'
                        ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                        : c.status === 'Rejected'
                        ? 'bg-red-500/10 text-red-400 border border-red-500/20'
                        : 'bg-gray-500/10 text-gray-400 border border-gray-500/20'
                    }`}
                  >
                    {c.status}
                  </span>
                </td>
                <td className="p-4 text-gray-500 font-mono">{c.date}</td>
                <td className="p-4 text-right space-x-3">
                  <Link href="/editor" className="text-blue-400 hover:underline font-bold">
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDuplicate(c)}
                    className="text-gray-400 hover:text-white"
                    title="Duplicate Campaign"
                  >
                    Duplicate
                  </button>
                  <button
                    onClick={() => handleDelete(c.id)}
                    className="text-red-400 hover:underline"
                    title="Delete Campaign"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
