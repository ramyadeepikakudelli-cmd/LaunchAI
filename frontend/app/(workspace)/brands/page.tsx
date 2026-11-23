'use client';

import React, { useState } from 'react';

export default function BrandsPage() {
  const [brands, setBrands] = useState([
    {
      id: 1,
      name: "Jio True 5G",
      tag: "TRUE 5G",
      primary: "#0A2885",
      badge: "#E31B23",
      typography: "Plus Jakarta Sans Bold",
      slogan: "For a Digital Life",
      guidelines: "High-contrast digital blue background with vibrant crimson red pricing pills and bold network stamps."
    },
    {
      id: 2,
      name: "Airtel 5G Plus",
      tag: "5G PLUS",
      primary: "#ED1C24",
      badge: "#ED1C24",
      typography: "Inter Bold",
      slogan: "The Smartphone Network",
      guidelines: "Vermillion red with dark carbon accents, premium photography and modern typography."
    },
    {
      id: 3,
      name: "Vi Hero Unlimited",
      tag: "GIGA 5G",
      primary: "#E60000",
      badge: "#FFC800",
      typography: "Poppins Bold",
      slogan: "Together for Tomorrow",
      guidelines: "Vibrant red and golden yellow dual-tone hero gradients with friendly community lifestyle aesthetics."
    }
  ]);

  const [isAdding, setIsAdding] = useState(false);
  const [newBrandName, setNewBrandName] = useState('');
  const [newTag, setNewTag] = useState('5G ULTRA');
  const [newPrimary, setNewPrimary] = useState('#2563EB');
  const [newBadge, setNewBadge] = useState('#EF4444');
  const [newSlogan, setNewSlogan] = useState('');

  const handleAddBrand = (e: React.FormEvent) => {
    e.preventDefault();
    const newB = {
      id: Date.now(),
      name: newBrandName,
      tag: newTag,
      primary: newPrimary,
      badge: newBadge,
      typography: "Plus Jakarta Sans Bold",
      slogan: newSlogan,
      guidelines: "Custom brand guidelines."
    };
    setBrands([...brands, newB]);
    setIsAdding(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black text-white">Brand Studio & Guidelines</h1>
          <p className="text-xs text-gray-400 mt-1">Manage brand profiles, visual guidelines, locked hex color palettes, and official typography</p>
        </div>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-4 py-2 rounded-xl text-xs transition shadow"
        >
          {isAdding ? "Cancel" : "+ Add Brand Profile"}
        </button>
      </div>

      {isAdding && (
        <form onSubmit={handleAddBrand} className="bg-[#111827] border border-border p-6 rounded-2xl space-y-4 shadow-xl">
          <h3 className="text-sm font-bold text-white">Register New Brand Profile</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-gray-400 font-bold uppercase">Brand Name</label>
              <input
                type="text"
                required
                value={newBrandName}
                onChange={(e) => setNewBrandName(e.target.value)}
                placeholder="e.g. Jio Fiber"
                className="w-full bg-[#0B0F19] border border-border rounded-xl p-2.5 text-xs text-white mt-1"
              />
            </div>
            <div>
              <label className="text-xs text-gray-400 font-bold uppercase">Network Tag</label>
              <input
                type="text"
                required
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="e.g. 5G ULTRA"
                className="w-full bg-[#0B0F19] border border-border rounded-xl p-2.5 text-xs text-white mt-1"
              />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="text-xs text-gray-400 font-bold uppercase">Primary Color</label>
              <input
                type="color"
                value={newPrimary}
                onChange={(e) => setNewPrimary(e.target.value)}
                className="w-full h-10 bg-transparent rounded-xl cursor-pointer mt-1"
              />
            </div>
            <div>
              <label className="text-xs text-gray-400 font-bold uppercase">Badge Color</label>
              <input
                type="color"
                value={newBadge}
                onChange={(e) => setNewBadge(e.target.value)}
                className="w-full h-10 bg-transparent rounded-xl cursor-pointer mt-1"
              />
            </div>
            <div>
              <label className="text-xs text-gray-400 font-bold uppercase">Slogan</label>
              <input
                type="text"
                value={newSlogan}
                onChange={(e) => setNewSlogan(e.target.value)}
                placeholder="e.g. Speed without limits"
                className="w-full bg-[#0B0F19] border border-border rounded-xl p-2.5 text-xs text-white mt-1"
              />
            </div>
          </div>
          <button type="submit" className="bg-green-600 hover:bg-green-500 text-white font-bold px-6 py-2.5 rounded-xl text-xs">
            Save Brand Profile
          </button>
        </form>
      )}

      {/* Brand Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {brands.map((b) => (
          <div key={b.id} className="bg-[#111827] border border-border p-6 rounded-2xl flex flex-col justify-between shadow-lg">
            <div>
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-extrabold text-lg text-white">{b.name}</h3>
                <span className="text-[10px] bg-blue-500/10 text-blue-400 border border-blue-500/30 px-2 py-0.5 rounded font-mono font-bold">
                  {b.tag}
                </span>
              </div>
              <p className="text-xs text-gray-300 italic mb-3">"{b.slogan}"</p>
              <div className="text-xs text-gray-400 mb-4 leading-relaxed">{b.guidelines}</div>
              <div className="text-[11px] text-gray-500 font-mono mb-4">Typography: {b.typography}</div>
            </div>

            <div className="pt-4 border-t border-border flex gap-3 text-xs">
              <div className="flex-1 p-2 rounded-xl text-center text-white font-mono font-bold" style={{ backgroundColor: b.primary }}>
                Primary
              </div>
              <div className="flex-1 p-2 rounded-xl text-center text-white font-mono font-bold" style={{ backgroundColor: b.badge }}>
                Badge
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
