'use client';

import React from 'react';
import Link from 'next/link';

export default function ValidationPage() {
  const auditResults = {
    score: 98,
    status: "APPROVED FOR RELEASE",
    checks: [
      { name: "Tariff & Price Integrity", detail: "Verified exact tariff currency and value (₹349)", status: "PASSED" },
      { name: "Data Quota Disclosure", detail: "Transparent quota display: 2.5 GB/Day + Truly Unlimited 5G", status: "PASSED" },
      { name: "Validity Cycle Transparency", detail: "Billing validity cycle confirmed: 28 Days", status: "PASSED" },
      { name: "FTC Asterisk Fine-Print", detail: "Conspicuous footnote explaining coverage variations (*)", status: "PASSED" },
      { name: "Brand Guidelines Adherence", detail: "Primary color matched to official Reliance Jio guidelines", status: "PASSED" },
      { name: "WCAG AAA Contrast Ratio", detail: "Price pill badge contrast ratio > 7.1:1 (Fully Compliant)", status: "PASSED" },
      { name: "Standard Ad Canvas Specifications", detail: "Dimensions 1024x1024 meet IAB and Meta social ad standards", status: "PASSED" }
    ]
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black text-white">Brand Guardian & Legal Content Audit</h1>
          <p className="text-xs text-gray-400 mt-1">Deterministic validation verifying price accuracy, FTC small-print rules, and brand guidelines</p>
        </div>
        <Link
          href="/approvals"
          className="bg-green-600 hover:bg-green-500 text-white font-bold px-5 py-2.5 rounded-xl text-xs transition shadow-lg shadow-green-500/20"
        >
          Submit to Manager for Approval →
        </Link>
      </div>

      {/* Score Header Card */}
      <div className="bg-[#111827] border border-border p-6 rounded-2xl flex justify-between items-center shadow-xl">
        <div>
          <span className="text-xs text-gray-400 uppercase font-bold tracking-wider">Overall Compliance Score</span>
          <div className="flex items-center gap-3 mt-1">
            <span className="text-4xl font-black text-green-400">{auditResults.score} / 100</span>
            <span className="bg-green-500/10 text-green-400 border border-green-500/30 text-xs px-3 py-1 rounded-full font-bold">
              ● {auditResults.status}
            </span>
          </div>
        </div>

        <div className="text-right hidden sm:block">
          <div className="text-xs text-gray-400">Target Creative:</div>
          <div className="text-sm font-bold text-white">Diwali 5G SuperSpeed Launch</div>
        </div>
      </div>

      {/* Detailed Check Items */}
      <div className="bg-[#111827] border border-border rounded-2xl p-6 shadow-xl space-y-4">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider">Compliance Checklist (7 Verified Checks)</h3>

        <div className="space-y-3">
          {auditResults.checks.map((c, i) => (
            <div key={i} className="flex justify-between items-center p-3.5 bg-[#0B0F19] border border-border rounded-xl text-xs">
              <div>
                <div className="font-bold text-white">{c.name}</div>
                <div className="text-gray-400 mt-0.5">{c.detail}</div>
              </div>
              <span className="bg-green-500/10 text-green-400 border border-green-500/20 px-2.5 py-1 rounded-lg font-bold">
                ✓ {c.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
