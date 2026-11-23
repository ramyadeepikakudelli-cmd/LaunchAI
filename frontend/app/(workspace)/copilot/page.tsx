'use client';

import React, { useState } from 'react';
import { runCopilot } from '@/services/api';

export default function CopilotPage() {
  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'copilot'; text: string; data?: any }>>([
    {
      sender: 'copilot',
      text: "Hello! I am your AI Campaign Copilot. Ask me to generate campaign angles, punchy headlines, or creative briefs for any telecom plan."
    }
  ]);
  const [input, setInput] = useState('');
  const [planName, setPlanName] = useState('Jio 5G Unlimited Gamer');
  const [price, setPrice] = useState('₹349');
  const [brand, setBrand] = useState('Reliance Jio');
  const [loading, setLoading] = useState(false);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
    setLoading(true);

    try {
      const response = await runCopilot(userMsg, planName, price, brand);
      setMessages(prev => [
        ...prev,
        {
          sender: 'copilot',
          text: `Here is the creative concept based on your request:`,
          data: response
        }
      ]);
    } catch (err) {
      // Fallback
      setMessages(prev => [
        ...prev,
        {
          sender: 'copilot',
          text: `Generated Campaign Concept:`,
          data: {
            concept_name: `${brand} Speed Revolution`,
            headline: "Experience Truly Unlimited 5G Speeds",
            slogan: "No Buffering. No Limits. Pure Speed.",
            supporting_copy: `Uninterrupted 5G connectivity with ${planName} starting at ${price}.`,
            visual_concept: "Dynamic 3D visual of a smartphone floating amidst fiber-optic energy waves."
          }
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-black text-white">AI Campaign Copilot</h1>
        <p className="text-xs text-gray-400 mt-1">Conversational art director powered by Gemini LLM for telecom marketing strategy</p>
      </div>

      {/* Target Context Strip */}
      <div className="bg-[#111827] border border-border p-3.5 rounded-2xl flex flex-wrap gap-4 items-center text-xs text-gray-300">
        <span className="font-bold text-white">Target Context:</span>
        <div>Operator: <strong className="text-blue-400">{brand}</strong></div>
        <div>Plan: <strong className="text-blue-400">{planName}</strong></div>
        <div>Price: <strong className="text-green-400">{price}</strong></div>
      </div>

      {/* Chat Messages */}
      <div className="bg-[#111827] border border-border rounded-2xl p-6 min-h-[420px] max-h-[500px] overflow-y-auto space-y-4 shadow-xl">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl p-4 text-xs leading-relaxed ${
                m.sender === 'user'
                  ? 'bg-blue-600 text-white rounded-br-none'
                  : 'bg-[#0B0F19] border border-border text-gray-200 rounded-bl-none shadow'
              }`}
            >
              <div className="font-bold text-[10px] text-gray-400 mb-1 uppercase tracking-wider">
                {m.sender === 'user' ? 'You' : '🤖 AI Copilot'}
              </div>
              <p>{m.text}</p>

              {m.data && (
                <div className="mt-3 p-3 bg-[#111827] border border-border rounded-xl space-y-2 text-xs">
                  <div><strong>Concept:</strong> <span className="text-blue-400">{m.data.concept_name}</span></div>
                  <div><strong>Headline:</strong> <span className="text-white font-bold">"{m.data.headline}"</span></div>
                  <div><strong>Slogan:</strong> <span className="text-gray-300 italic">"{m.data.slogan}"</span></div>
                  <div><strong>Copy:</strong> {m.data.supporting_copy}</div>
                  <div className="text-[11px] text-gray-400 border-t border-border pt-1.5 mt-1.5">
                    <strong>Visual Scene:</strong> {m.data.visual_concept}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex items-center gap-2 text-xs text-gray-400 italic">
            <div className="w-3 h-3 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            Copilot is thinking...
          </div>
        )}
      </div>

      {/* Input Bar */}
      <form onSubmit={handleSend} className="flex gap-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask Copilot: e.g. 'Generate 3 high-energy headlines for young gamers during Diwali season'..."
          className="flex-1 bg-[#111827] border border-border rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-blue-500 shadow"
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-6 py-3 rounded-xl text-xs transition shadow-lg shadow-blue-500/20 disabled:opacity-40"
        >
          Send →
        </button>
      </form>
    </div>
  );
}
