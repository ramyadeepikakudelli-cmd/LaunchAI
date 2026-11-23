'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CampaignStudioPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);

  // 10 Steps State
  const [operator, setOperator] = useState("Reliance Jio");
  const [plan, setPlan] = useState("Jio 5G Unlimited Gamer (₹349)");
  const [objective, setObjective] = useState("Promote New 5G Recharge Plan");
  const [audience, setAudience] = useState("Gen-Z Mobile Gamers & Esports Streamers");
  const [campaignType, setCampaignType] = useState("New plan launch");
  const [visualStyle, setVisualStyle] = useState("Futuristic 3D Tech & Hologram");
  const [brandColor, setBrandColor] = useState("#0A2885");
  const [instructions, setInstructions] = useState("Emphasize zero latency and free cloud gaming pass. Keep space for price pill badge.");
  const [conceptHeadline, setConceptHeadline] = useState("Experience Truly Unlimited 5G Speeds");
  const [conceptSlogan, setConceptSlogan] = useState("No Buffering. No Limits. Pure Speed.");

  const handleFinish = () => {
    alert("Campaign saved successfully! Launching AI Image Generator...");
    router.push('/generator');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-black text-white">10-Step Campaign Studio Wizard</h1>
        <p className="text-xs text-gray-400 mt-1">Guided enterprise workflow to configure, art direct, and launch compliant campaigns</p>
      </div>

      {/* Progress Stepper */}
      <div className="bg-[#111827] border border-border p-4 rounded-2xl flex items-center justify-between text-xs font-bold overflow-x-auto gap-2">
        {[
          "1. Operator", "2. Plan", "3. Objective", "4. Audience", "5. Type",
          "6. Style", "7. Brand", "8. Brief", "9. Concept", "10. Review"
        ].map((s, idx) => (
          <span
            key={s}
            className={`px-3 py-1.5 rounded-xl border whitespace-nowrap transition ${
              step === idx + 1
                ? "bg-blue-600 border-blue-500 text-white shadow"
                : step > idx + 1
                ? "bg-green-500/10 border-green-500/30 text-green-400"
                : "bg-[#0B0F19] border-border text-gray-500"
            }`}
          >
            {s}
          </span>
        ))}
      </div>

      {/* Step Content Container */}
      <div className="bg-[#111827] border border-border p-8 rounded-2xl shadow-xl min-h-[300px] flex flex-col justify-between">
        {step === 1 && (
          <div className="space-y-4">
            <h3 className="text-base font-bold text-white">Step 1: Select Telecom Operator</h3>
            <p className="text-xs text-gray-400">Choose the telecom brand governing the campaign rules and color palettes.</p>
            <div className="grid grid-cols-3 gap-4 pt-2">
              {["Reliance Jio", "Bharti Airtel", "Vodafone Idea (Vi)"].map((op) => (
                <div
                  key={op}
                  onClick={() => setOperator(op)}
                  className={`p-5 rounded-2xl border cursor-pointer text-center transition ${
                    operator === op ? "bg-blue-600/10 border-blue-500 text-white font-bold" : "bg-[#0B0F19] border-border text-gray-400"
                  }`}
                >
                  <div className="text-3xl mb-2">📡</div>
                  <div className="text-sm">{op}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h3 className="text-base font-bold text-white">Step 2: Select Verified Telecom Plan</h3>
            <p className="text-xs text-gray-400">Pulls exact tariffs from the verified database store to eliminate AI price hallucinations.</p>
            <select
              value={plan}
              onChange={(e) => setPlan(e.target.value)}
              className="w-full bg-[#0B0F19] border border-border rounded-xl p-3 text-white text-sm"
            >
              <option>Jio 5G Unlimited Gamer (₹349 - 2.5 GB/Day + Unlimited 5G)</option>
              <option>Jio Cricket Super Pack (₹449 - 3.0 GB/Day + Hotstar)</option>
              <option>Jio Annual Saver (₹2999 - 2.5 GB/Day + Prime Video)</option>
              <option>Airtel 5G Plus Infinity (₹379 - 2.0 GB/Day)</option>
              <option>Vi Hero Giga Unlimited (₹299 - 1.5 GB/Day + Binge Night)</option>
            </select>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <h3 className="text-base font-bold text-white">Step 3: Choose Campaign Objective</h3>
            <div className="grid grid-cols-2 gap-4">
              {[
                "Promote New 5G Recharge Plan",
                "Drive Festive / Holiday Recharges",
                "Competitive Switch & Save Campaign",
                "Customer Retention & Loyalty Reward"
              ].map((obj) => (
                <div
                  key={obj}
                  onClick={() => setObjective(obj)}
                  className={`p-4 rounded-xl border cursor-pointer text-sm font-semibold transition ${
                    objective === obj ? "bg-blue-600/10 border-blue-500 text-white" : "bg-[#0B0F19] border-border text-gray-400"
                  }`}
                >
                  {obj}
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4">
            <h3 className="text-base font-bold text-white">Step 4: Select Target Demographic</h3>
            <select
              value={audience}
              onChange={(e) => setAudience(e.target.value)}
              className="w-full bg-[#0B0F19] border border-border rounded-xl p-3 text-white text-sm"
            >
              <option>Gen-Z Mobile Gamers & Esports Streamers</option>
              <option>Suburban Families with Multiple Connected Devices</option>
              <option>Frequent Business Travelers & Digital Nomads</option>
              <option>Budget-Conscious College Students</option>
            </select>
          </div>
        )}

        {step === 5 && (
          <div className="space-y-4">
            <h3 className="text-base font-bold text-white">Step 5: Select Campaign Launch Type</h3>
            <div className="grid grid-cols-2 gap-4">
              {["New plan launch", "5G promotion", "Festive holiday offer", "Limited time flash sale"].map((t) => (
                <div
                  key={t}
                  onClick={() => setCampaignType(t)}
                  className={`p-4 rounded-xl border cursor-pointer text-sm font-semibold transition ${
                    campaignType === t ? "bg-blue-600/10 border-blue-500 text-white" : "bg-[#0B0F19] border-border text-gray-400"
                  }`}
                >
                  {t}
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 6 && (
          <div className="space-y-4">
            <h3 className="text-base font-bold text-white">Step 6: Visual Aesthetic Style</h3>
            <div className="grid grid-cols-2 gap-4">
              {[
                "Futuristic 3D Tech & Hologram",
                "Photorealistic Lifestyle",
                "Cinematic Luxury Studio",
                "Cyberpunk Neon Cityscape"
              ].map((st) => (
                <div
                  key={st}
                  onClick={() => setVisualStyle(st)}
                  className={`p-4 rounded-xl border cursor-pointer text-sm font-semibold transition ${
                    visualStyle === st ? "bg-blue-600/10 border-blue-500 text-white" : "bg-[#0B0F19] border-border text-gray-400"
                  }`}
                >
                  {st}
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 7 && (
          <div className="space-y-4">
            <h3 className="text-base font-bold text-white">Step 7: Brand Identity Guidelines</h3>
            <p className="text-xs text-gray-400">Locked palette for {operator}</p>
            <div className="flex gap-4">
              {["#0A2885", "#ED1C24", "#E60000", "#FFC800", "#10B981"].map((col) => (
                <div
                  key={col}
                  onClick={() => setBrandColor(col)}
                  className={`w-12 h-12 rounded-xl cursor-pointer border-2 transition ${
                    brandColor === col ? "border-white scale-110 shadow-lg" : "border-transparent"
                  }`}
                  style={{ backgroundColor: col }}
                />
              ))}
            </div>
          </div>
        )}

        {step === 8 && (
          <div className="space-y-4">
            <h3 className="text-base font-bold text-white">Step 8: Custom Creative Instructions</h3>
            <textarea
              rows={4}
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              className="w-full bg-[#0B0F19] border border-border rounded-xl p-3 text-white text-sm"
              placeholder="Provide specific art direction notes..."
            />
          </div>
        )}

        {step === 9 && (
          <div className="space-y-4">
            <h3 className="text-base font-bold text-white">Step 9: AI Generated Copy & Concepts</h3>
            <div>
              <label className="text-xs text-gray-400 font-bold uppercase">Headline</label>
              <input
                type="text"
                value={conceptHeadline}
                onChange={(e) => setConceptHeadline(e.target.value)}
                className="w-full bg-[#0B0F19] border border-border rounded-xl p-2.5 text-white text-sm mt-1"
              />
            </div>
            <div>
              <label className="text-xs text-gray-400 font-bold uppercase">Slogan</label>
              <input
                type="text"
                value={conceptSlogan}
                onChange={(e) => setConceptSlogan(e.target.value)}
                className="w-full bg-[#0B0F19] border border-border rounded-xl p-2.5 text-white text-sm mt-1"
              />
            </div>
          </div>
        )}

        {step === 10 && (
          <div className="space-y-3 text-xs">
            <h3 className="text-base font-bold text-white mb-2">Step 10: Campaign Specification Review</h3>
            <div className="p-4 bg-[#0B0F19] border border-border rounded-xl space-y-2">
              <div><strong>Operator:</strong> {operator}</div>
              <div><strong>Plan:</strong> {plan}</div>
              <div><strong>Objective:</strong> {objective}</div>
              <div><strong>Audience:</strong> {audience}</div>
              <div><strong>Style:</strong> {visualStyle}</div>
              <div><strong>Headline:</strong> {conceptHeadline}</div>
              <div><strong>Slogan:</strong> {conceptSlogan}</div>
            </div>
          </div>
        )}

        {/* Wizard Controls */}
        <div className="flex justify-between pt-6 border-t border-border mt-6">
          <button
            onClick={() => setStep(Math.max(1, step - 1))}
            disabled={step === 1}
            className="px-5 py-2.5 rounded-xl border border-border text-xs text-gray-300 hover:bg-white/5 disabled:opacity-40"
          >
            ← Previous Step
          </button>

          {step < 10 ? (
            <button
              onClick={() => setStep(step + 1)}
              className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition"
            >
              Continue to Step {step + 1} →
            </button>
          ) : (
            <button
              onClick={handleFinish}
              className="px-6 py-2.5 rounded-xl bg-green-600 hover:bg-green-500 text-white font-bold text-xs transition shadow-lg shadow-green-500/20"
            >
              💾 Save & Launch to AI Image Generator →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
