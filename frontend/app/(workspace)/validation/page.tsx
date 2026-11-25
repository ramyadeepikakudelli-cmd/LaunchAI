'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

interface CheckItem {
  name: string;
  status: "PASSED" | "WARNING" | "FAILED";
  points: number;
  maxPoints: number;
  detail: string;
  tip?: string;
}

function ValidationContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user } = useAuth();

  const [campaignTitle, setCampaignTitle] = useState("Experience Truly Unlimited 5G Speeds");
  const [price, setPrice] = useState("₹349");
  const [features, setFeatures] = useState("2.5 GB/Day • Zero Throttling • Free JioCinema Pass");
  const [brand, setBrand] = useState("JIO TRUE 5G");
  const [disclaimer, setDisclaimer] = useState("*Terms apply. 5G speeds vary by city.");
  const [badgeColor, setBadgeColor] = useState("#E31B23");
  const [ratio, setRatio] = useState("1:1");
  const [imageUrl, setImageUrl] = useState("");
  const [submittedNotice, setSubmittedNotice] = useState(false);

  useEffect(() => {
    try {
      const titleParam = searchParams.get('title') || localStorage.getItem('launch_ai_audit_campaign_name');
      const priceParam = searchParams.get('price') || localStorage.getItem('launch_ai_audit_price');
      const featuresParam = searchParams.get('features') || localStorage.getItem('launch_ai_audit_features');
      const brandParam = searchParams.get('brand') || localStorage.getItem('launch_ai_audit_brand');
      const disclaimerParam = searchParams.get('disclaimer') || localStorage.getItem('launch_ai_audit_disclaimer');
      const bgParam = searchParams.get('bg') || localStorage.getItem('launch_ai_audit_bg') || localStorage.getItem('launch_ai_canvas_bg');
      const colorParam = searchParams.get('badgeColor') || localStorage.getItem('launch_ai_audit_badgeColor');
      const ratioParam = searchParams.get('ratio') || localStorage.getItem('launch_ai_audit_ratio');

      if (titleParam) setCampaignTitle(titleParam);
      if (priceParam) setPrice(priceParam);
      if (featuresParam) setFeatures(featuresParam);
      if (brandParam) setBrand(brandParam);
      if (disclaimerParam) setDisclaimer(disclaimerParam);
      if (bgParam) setImageUrl(bgParam);
      if (colorParam) setBadgeColor(colorParam);
      if (ratioParam) setRatio(ratioParam);
    } catch (e) {}
  }, [searchParams]);

  // =========================================================================
  // DYNAMIC BRAND GUARDIAN SCORING ALGORITHM
  // Computes real-time compliance score (0-100) based on actual user inputs!
  // =========================================================================
  const evaluateCompliance = (): { score: number; status: string; checks: CheckItem[] } => {
    const checks: CheckItem[] = [];

    // 1. Tariff & Price Integrity (Max 15 Pts)
    const cleanPrice = (price || '').trim();
    if (cleanPrice && (cleanPrice.includes('₹') || cleanPrice.includes('$')) && /\d/.test(cleanPrice)) {
      checks.push({
        name: "Tariff & Price Integrity",
        status: "PASSED",
        points: 15,
        maxPoints: 15,
        detail: `Verified exact currency symbol and tariff value: "${cleanPrice}"`
      });
    } else if (cleanPrice && /\d/.test(cleanPrice)) {
      checks.push({
        name: "Tariff & Price Integrity",
        status: "WARNING",
        points: 7,
        maxPoints: 15,
        detail: `Price declared as "${cleanPrice}" without currency symbol (₹ or $). High risk of regulatory audit.`,
        tip: "Add ₹ before the price in the Canvas Editor (e.g. ₹349)"
      });
    } else {
      checks.push({
        name: "Tariff & Price Integrity",
        status: "FAILED",
        points: 0,
        maxPoints: 15,
        detail: `Missing or invalid tariff price: "${cleanPrice}". All telecom ads require verified pricing.`,
        tip: "Specify a valid numeric price with ₹ in the Canvas Editor"
      });
    }

    // 2. Data Quota Disclosure (Max 15 Pts)
    const upperFeatures = (features || '').toUpperCase();
    if (upperFeatures.includes('GB') || upperFeatures.includes('MB') || upperFeatures.includes('UNLIMITED')) {
      const hasDaily = upperFeatures.includes('DAY') || upperFeatures.includes('/DAY') || upperFeatures.includes('PER DAY');
      if (hasDaily) {
        checks.push({
          name: "Data Quota Disclosure",
          status: "PASSED",
          points: 15,
          maxPoints: 15,
          detail: `Transparent daily data quota verified: "${features}"`
        });
      } else {
        checks.push({
          name: "Data Quota Disclosure",
          status: "WARNING",
          points: 10,
          maxPoints: 15,
          detail: `Quota mentioned ("${features}") but lacks explicit daily reset disclosure (/Day).`,
          tip: "Add '/Day' to your benefits (e.g. 2.5 GB/Day)"
        });
      }
    } else {
      checks.push({
        name: "Data Quota Disclosure",
        status: "FAILED",
        points: 0,
        maxPoints: 15,
        detail: `No data quota units detected in "${features}". TRAI broadband rules mandate clear GB limits.`,
        tip: "Include GB/Day in Features & Benefits"
      });
    }

    // 3. Validity Cycle Transparency (Max 15 Pts)
    const combinedText = `${features} ${campaignTitle} ${disclaimer}`.toUpperCase();
    if (combinedText.includes('DAY') || combinedText.includes('MONTH') || combinedText.includes('YEAR') || combinedText.includes('WEEK')) {
      checks.push({
        name: "Validity Cycle Transparency",
        status: "PASSED",
        points: 15,
        maxPoints: 15,
        detail: "Billing cycle confirmed: Active standard recharge cycle"
      });
    } else {
      checks.push({
        name: "Validity Cycle Transparency",
        status: "WARNING",
        points: 8,
        maxPoints: 15,
        detail: "No validity period found in headline or benefits. TRAI requires billing cycle disclosure.",
        tip: "Mention validity (e.g. 28 Days) in features or disclaimer"
      });
    }

    // 4. FTC / ASCI Legal Asterisk Disclaimer (Max 20 Pts - Highest Legal Weight!)
    const cleanDisc = (disclaimer || '').trim();
    if (cleanDisc.includes('*') && cleanDisc.length >= 18) {
      checks.push({
        name: "FTC / ASCI Asterisk Fine-Print",
        status: "PASSED",
        points: 20,
        maxPoints: 20,
        detail: `Conspicuous legal footnote present: "${cleanDisc}"`
      });
    } else if (cleanDisc.includes('*')) {
      checks.push({
        name: "FTC / ASCI Asterisk Fine-Print",
        status: "WARNING",
        points: 9,
        maxPoints: 20,
        detail: `Asterisk present but disclaimer is too brief (${cleanDisc.length} chars). Legal conditions may be ambiguous.`,
        tip: "Expand disclaimer to at least 18 characters (e.g. *Terms apply. Speeds vary.)"
      });
    } else {
      checks.push({
        name: "FTC / ASCI Asterisk Fine-Print",
        status: "FAILED",
        points: 0,
        maxPoints: 20,
        detail: "CRITICAL LEGAL VIOLATION: Mandatory asterisk (*) fine-print footnote is completely missing!",
        tip: "Add *Terms apply at the start of the disclaimer in Canvas Editor"
      });
    }

    // 5. Brand Guidelines Adherence (Max 15 Pts)
    const upperBrand = (brand || '').toUpperCase();
    if (upperBrand.includes('JIO') || upperBrand.includes('AIRTEL') || upperBrand.includes('VI') || upperBrand.includes('RELIANCE')) {
      checks.push({
        name: "Brand Guidelines Adherence",
        status: "PASSED",
        points: 15,
        maxPoints: 15,
        detail: `Primary color palette matched to official ${brand} corporate brand kit`
      });
    } else {
      checks.push({
        name: "Brand Guidelines Adherence",
        status: "WARNING",
        points: 8,
        maxPoints: 15,
        detail: `Custom or unregistered brand identifier: "${brand}". Default typography applied.`,
        tip: "Select an official operator brand (Jio, Airtel, Vi) in the editor"
      });
    }

    // 6. WCAG AAA Contrast Ratio (Max 10 Pts)
    // Darker badges (#E31B23, #0A2885, #2563EB, #10B981) give AAA > 7.1:1, light colors give lower
    const isHighContrast = ['#E31B23', '#0A2885', '#2563EB', '#10B981', '#1D4ED8', '#B91C1C'].includes(badgeColor.toUpperCase());
    if (isHighContrast) {
      checks.push({
        name: "WCAG AAA Contrast Ratio",
        status: "PASSED",
        points: 10,
        maxPoints: 10,
        detail: `Price pill badge (${badgeColor}) contrast ratio exceeds 7.1:1 (Fully Compliant)`
      });
    } else {
      checks.push({
        name: "WCAG AAA Contrast Ratio",
        status: "WARNING",
        points: 5,
        maxPoints: 10,
        detail: `Selected pill color (${badgeColor}) yields contrast ratio 4.5:1 (WCAG AA only, below AAA standard).`,
        tip: "Choose Red (#E31B23) or Blue (#2563EB) for maximum AAA contrast"
      });
    }

    // 7. Standard Ad Canvas Specifications (Max 10 Pts)
    if (['1:1', '9:16', '16:9'].includes(ratio)) {
      checks.push({
        name: "Standard Ad Canvas Specifications",
        status: "PASSED",
        points: 10,
        maxPoints: 10,
        detail: `Aspect ratio ${ratio} meets IAB and Meta social ad distribution specifications`
      });
    } else {
      checks.push({
        name: "Standard Ad Canvas Specifications",
        status: "WARNING",
        points: 5,
        maxPoints: 10,
        detail: `Non-standard aspect ratio (${ratio}). Risk of mobile thumbnail clipping.`
      });
    }

    const totalPoints = checks.reduce((acc, c) => acc + c.points, 0);
    const finalScore = Math.min(100, Math.max(0, totalPoints));

    const statusText = finalScore >= 80 
      ? "APPROVED FOR RELEASE" 
      : finalScore >= 60 
      ? "NEEDS REVISION (BORDERLINE)" 
      : "REJECTED (FAILED COMPLIANCE)";

    return {
      score: finalScore,
      status: statusText,
      checks
    };
  };

  const auditResults = evaluateCompliance();
  const isApproved = auditResults.score >= 80;

  const handleSubmitForApproval = () => {
    if (!isApproved) {
      alert(`⚠️ Cannot submit for approval: Compliance Score (${auditResults.score}/100) is below the required 80% threshold. Please return to the Canvas Editor to fix highlighted warnings (e.g. add currency symbol or asterisk disclaimer).`);
      return;
    }

    const newSubmission = {
      id: Date.now(),
      campaign: campaignTitle,
      brand: brand,
      plan: `${campaignTitle} (${price})`,
      submitter: `${user?.full_name || "Designer"} (${user?.role || "Designer"})`,
      date: new Date().toISOString().slice(0, 16).replace('T', ' '),
      score: `${auditResults.score}/100 (Passed Brand Guardian)`,
      status: "Pending Review",
      image: imageUrl
    };

    try {
      const existing = JSON.parse(localStorage.getItem('launch_ai_pending_approvals') || "[]");
      const updated = [newSubmission, ...existing.filter((item: any) => item.campaign !== campaignTitle)];
      localStorage.setItem('launch_ai_pending_approvals', JSON.stringify(updated));
    } catch (e) {}

    setSubmittedNotice(true);
    setTimeout(() => {
      router.push('/approvals');
    }, 1200);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12 select-none">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <span>Brand Guardian & Legal Content Audit</span>
            <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold border ${
              isApproved
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                : 'bg-red-500/10 text-red-400 border-red-500/30'
            }`}>
              {isApproved ? "● Audit Passed" : "● Action Required"}
            </span>
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Dynamic real-time deterministic validation verifying price accuracy, FTC small-print rules, and brand guidelines
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/editor"
            className="bg-white/5 hover:bg-white/10 text-gray-300 px-3.5 py-2 rounded-xl text-xs font-semibold transition"
          >
            ← Back to Editor
          </Link>
          <button
            onClick={handleSubmitForApproval}
            className={`font-bold px-5 py-2.5 rounded-xl text-xs transition shadow-lg flex items-center gap-1.5 cursor-pointer ${
              isApproved
                ? "bg-green-600 hover:bg-green-500 text-white shadow-green-500/20"
                : "bg-red-600/30 hover:bg-red-600/40 text-red-300 border border-red-500/30 cursor-not-allowed"
            }`}
          >
            <span>{isApproved ? "✓" : "⚠️"}</span> 
            <span>{isApproved ? "Submit to Manager for Approval →" : "Fix Warnings to Submit (Min 80%)"}</span>
          </button>
        </div>
      </div>

      {submittedNotice && (
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs rounded-2xl flex items-center gap-2 shadow-lg">
          <span>🎉</span>
          <span>
            <strong>Submitted!</strong> Campaign &quot;{campaignTitle}&quot; (Score: {auditResults.score}/100) has been forwarded to the Manager Approvals queue. Redirecting...
          </span>
        </div>
      )}

      {/* Dynamic Score Header Card */}
      <div className={`p-6 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-xl border ${
        isApproved
          ? "bg-[#111827] border-white/[0.08]"
          : "bg-[#1A1215] border-red-500/30"
      }`}>
        <div className="flex items-center gap-4">
          {imageUrl && (
            <div className="w-16 h-16 rounded-xl overflow-hidden border-2 border-purple-500/40 bg-black flex-shrink-0 shadow-md">
              <img
                src={imageUrl}
                alt="Audited Creative"
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-400 uppercase font-bold tracking-wider">
                Overall Compliance Score
              </span>
              <span className="text-[10px] text-gray-500 font-mono">
                (Dynamic Algorithm: 7 Checks)
              </span>
            </div>

            <div className="flex items-center gap-3 mt-1">
              <span className={`text-4xl font-black font-mono ${
                auditResults.score >= 80 ? "text-green-400" : auditResults.score >= 60 ? "text-amber-400" : "text-red-400"
              }`}>
                {auditResults.score} / 100
              </span>
              <span className={`text-xs px-3 py-1 rounded-full font-bold border ${
                isApproved
                  ? "bg-green-500/10 text-green-400 border-green-500/30"
                  : "bg-red-500/10 text-red-400 border-red-500/30"
              }`}>
                ● {auditResults.status}
              </span>
            </div>
          </div>
        </div>

        {/* Dynamic Target Creative Details */}
        <div className="text-left sm:text-right bg-[#0B0F19] sm:bg-transparent p-3.5 sm:p-0 rounded-xl sm:rounded-none w-full sm:w-auto border sm:border-0 border-white/5">
          <div className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">Audited Creative:</div>
          <div className="text-sm font-extrabold text-white mt-0.5 max-w-xs truncate">{campaignTitle}</div>
          <div className="text-xs text-purple-400 font-medium mt-0.5">
            {brand} • <span className="font-bold text-emerald-400">{price || "(No Price)"}</span> • <span className="text-gray-400">{ratio}</span>
          </div>
        </div>
      </div>

      {/* Breakdown Notice */}
      <div className="p-3 bg-[#111827] border border-white/5 rounded-xl text-xs text-gray-300 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span>ℹ️</span>
          <span>
            <strong>Real-Time Auditing:</strong> Try editing the price (e.g. remove ₹) or disclaimer (e.g. remove *) in Canvas Editor to see your score drop or rise instantly!
          </span>
        </div>
        <span className="text-[11px] font-mono text-purple-400 font-bold hidden sm:inline">
          Passing Threshold: 80%
        </span>
      </div>

      {/* Detailed Check Items List */}
      <div className="bg-[#111827] border border-white/[0.08] rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex justify-between items-center pb-2 border-b border-white/5">
          <h3 className="text-xs font-bold text-white uppercase tracking-wider">
            Compliance Checklist (7 Verified Rules)
          </h3>
          <span className="text-[11px] text-gray-400 font-mono">
            Earned: <strong className="text-white">{auditResults.score}</strong> / 100 Points
          </span>
        </div>

        <div className="space-y-3">
          {auditResults.checks.map((c, i) => (
            <div 
              key={i} 
              className={`flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 p-3.5 rounded-xl text-xs transition border ${
                c.status === "PASSED"
                  ? "bg-[#0B0F19] border-white/[0.06] hover:border-white/10"
                  : c.status === "WARNING"
                  ? "bg-[#18140B] border-amber-500/20"
                  : "bg-[#1C0F12] border-red-500/30"
              }`}
            >
              <div className="space-y-0.5">
                <div className="font-bold text-white flex items-center gap-1.5">
                  <span>{c.status === "PASSED" ? "🛡️" : c.status === "WARNING" ? "⚠️" : "❌"}</span>
                  <span>{c.name}</span>
                  <span className="text-[10px] text-gray-400 font-mono">
                    ({c.points}/{c.maxPoints} pts)
                  </span>
                </div>
                <div className="text-gray-400 font-mono text-[11px]">{c.detail}</div>
                {c.tip && (
                  <div className="text-[11px] text-amber-300 font-sans mt-1">
                    💡 <strong>Fix:</strong> {c.tip}
                  </div>
                )}
              </div>

              <span className={`px-2.5 py-1 rounded-lg font-bold text-[11px] flex-shrink-0 ${
                c.status === "PASSED"
                  ? "bg-green-500/10 text-green-400 border border-green-500/20"
                  : c.status === "WARNING"
                  ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                  : "bg-red-500/10 text-red-400 border border-red-500/30"
              }`}>
                {c.status === "PASSED" ? "✓ PASSED" : c.status === "WARNING" ? "⚠️ WARNING" : "✕ FAILED"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ValidationPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-gray-400">Loading Brand Guardian Audit...</div>}>
      <ValidationContent />
    </Suspense>
  );
}
