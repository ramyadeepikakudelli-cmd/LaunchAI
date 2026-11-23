const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

export async function fetchStats() {
  const res = await fetch(`${API_BASE}/analytics/dashboard`);
  return res.json();
}

export async function fetchBrands() {
  const res = await fetch(`${API_BASE}/brands`);
  return res.json();
}

export async function fetchPlans() {
  const res = await fetch(`${API_BASE}/plans`);
  return res.json();
}

export async function fetchCampaigns() {
  const res = await fetch(`${API_BASE}/campaigns`);
  return res.json();
}

export async function runCopilot(query: string, planName: string, price: string, brandName: string) {
  const res = await fetch(`${API_BASE}/generation/copilot`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, plan_name: planName, price, brand_name: brandName })
  });
  return res.json();
}

export async function generateVariations(campaignId: number, prompt: string) {
  const res = await fetch(`${API_BASE}/generation/variations`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ campaign_id: campaignId, prompt, num_variations: 4 })
  });
  return res.json();
}
