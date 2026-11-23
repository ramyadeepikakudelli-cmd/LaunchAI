'use client';

import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';

export default function PlansPage() {
  const { user } = useAuth();
  const isAdmin = user?.role === 'Admin';
  const [plans, setPlans] = useState([
    {
      id: 1,
      operator: "Reliance Jio",
      name: "Jio 5G Unlimited Gamer",
      price: "₹349",
      data: "2.5 GB/Day + Truly Unlimited 5G",
      validity: "28 Days",
      calling: "Unlimited Any Net Calls",
      sms: "100 SMS/Day",
      perks: "Free JioCinema Premium & Cloud Gaming Pass",
      status: "Active"
    },
    {
      id: 2,
      operator: "Reliance Jio",
      name: "Jio Cricket Super Pack",
      price: "₹449",
      data: "3.0 GB/Day",
      validity: "28 Days",
      calling: "Unlimited Local & STD",
      sms: "100 SMS/Day",
      perks: "Free Disney+ Hotstar 3-Month Mobile",
      status: "Active"
    },
    {
      id: 3,
      operator: "Bharti Airtel",
      name: "Airtel 5G Plus Infinity",
      price: "₹379",
      data: "2.0 GB/Day + Unlimited 5G",
      validity: "1 Month",
      calling: "Truly Unlimited",
      sms: "100 SMS/Day",
      perks: "Wynk Music Subscription + Apollo 24/7",
      status: "Active"
    },
    {
      id: 4,
      operator: "Vodafone Idea (Vi)",
      name: "Vi Hero Giga Unlimited",
      price: "₹299",
      data: "1.5 GB/Day + Night Unlimited (12am - 6am)",
      validity: "28 Days",
      calling: "Unlimited Any Net",
      sms: "100 SMS/Day",
      perks: "Weekend Data Rollover Benefit",
      status: "Active"
    }
  ]);

  const [isAdding, setIsAdding] = useState(false);
  const [operator, setOperator] = useState("Reliance Jio");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("₹349");
  const [data, setData] = useState("2.5 GB/Day");
  const [validity, setValidity] = useState("28 Days");
  const [perks, setPerks] = useState("Free OTT Streaming");

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const newPlan = {
      id: Date.now(),
      operator,
      name,
      price,
      data,
      validity,
      calling: "Truly Unlimited",
      sms: "100 SMS/Day",
      perks,
      status: "Active"
    };
    setPlans([newPlan, ...plans]);
    setIsAdding(false);
    setName("");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black text-white">Telecom Recharge Plan Catalog</h1>
          <p className="text-xs text-gray-400 mt-1">Verified data store ensuring 100% price and quota accuracy in generated marketing visuals</p>
        </div>
        {isAdmin ? (
          <button
            onClick={() => setIsAdding(!isAdding)}
            className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-4 py-2 rounded-xl text-xs transition shadow"
          >
            {isAdding ? "Cancel" : "+ Add Telecom Plan"}
          </button>
        ) : (
          <div className="text-xs text-gray-400 bg-white/[0.04] border border-white/10 px-3.5 py-1.5 rounded-xl font-medium flex items-center gap-1.5">
            <span>🔒</span>
            <span>Catalog Managed by Admin Ramya Deepika Kudelli</span>
          </div>
        )}
      </div>

      {isAdding && (
        <form onSubmit={handleCreate} className="bg-[#111827] border border-border p-6 rounded-2xl space-y-4 shadow-xl">
          <h3 className="text-sm font-bold text-white">Register Verified Recharge Plan</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-gray-400 font-bold uppercase">Operator</label>
              <select
                value={operator}
                onChange={(e) => setOperator(e.target.value)}
                className="w-full bg-[#0B0F19] border border-border rounded-xl p-2.5 text-xs text-white mt-1"
              >
                <option>Reliance Jio</option>
                <option>Bharti Airtel</option>
                <option>Vodafone Idea (Vi)</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-gray-400 font-bold uppercase">Plan Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. 5G Ultra Gamer"
                className="w-full bg-[#0B0F19] border border-border rounded-xl p-2.5 text-xs text-white mt-1"
              />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="text-xs text-gray-400 font-bold uppercase">Price / Tariff</label>
              <input
                type="text"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="₹349"
                className="w-full bg-[#0B0F19] border border-border rounded-xl p-2.5 text-xs text-white mt-1"
              />
            </div>
            <div>
              <label className="text-xs text-gray-400 font-bold uppercase">Data Allowance</label>
              <input
                type="text"
                required
                value={data}
                onChange={(e) => setData(e.target.value)}
                placeholder="2.5 GB/Day + 5G"
                className="w-full bg-[#0B0F19] border border-border rounded-xl p-2.5 text-xs text-white mt-1"
              />
            </div>
            <div>
              <label className="text-xs text-gray-400 font-bold uppercase">Validity</label>
              <input
                type="text"
                required
                value={validity}
                onChange={(e) => setValidity(e.target.value)}
                placeholder="28 Days"
                className="w-full bg-[#0B0F19] border border-border rounded-xl p-2.5 text-xs text-white mt-1"
              />
            </div>
          </div>
          <button type="submit" className="bg-green-600 hover:bg-green-500 text-white font-bold px-6 py-2.5 rounded-xl text-xs">
            Save Verified Plan
          </button>
        </form>
      )}

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {plans.map((p) => (
          <div key={p.id} className="bg-[#111827] border border-border p-5 rounded-2xl flex flex-col justify-between shadow-lg">
            <div>
              <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider">{p.operator}</span>
              <h3 className="font-extrabold text-base text-white mt-1 mb-2">{p.name}</h3>
              <div className="text-2xl font-black text-green-400 mb-4">{p.price}</div>

              <div className="space-y-1.5 text-xs text-gray-300 border-t border-border pt-3">
                <div>⚡ <strong>Data:</strong> {p.data}</div>
                <div>📅 <strong>Validity:</strong> {p.validity}</div>
                <div>📞 <strong>Voice:</strong> {p.calling}</div>
                <div className="text-[11px] text-gray-400 pt-1">🎁 {p.perks}</div>
              </div>
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-border mt-4 text-[10px] text-gray-500">
              <span className="bg-green-500/10 text-green-400 px-2 py-0.5 rounded font-mono font-bold">
                ● {p.status}
              </span>
              <button
                onClick={() => setPlans(plans.filter(x => x.id !== p.id))}
                className="text-red-400 hover:underline"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
