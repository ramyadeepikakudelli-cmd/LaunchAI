'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="min-h-screen bg-[#0B0F19] flex flex-col justify-center items-center p-6">
      <Link href="/" className="flex items-center gap-2 mb-8">
        <span className="text-3xl">📡</span>
        <span className="text-2xl font-black bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
          LAUNCH AI
        </span>
      </Link>

      <div className="bg-[#111827] border border-border p-8 rounded-2xl w-full max-w-md shadow-2xl space-y-6">
        <div className="text-center">
          <h1 className="text-xl font-extrabold text-white">Password Recovery</h1>
          <p className="text-xs text-gray-400 mt-1">Enter your registered work email to receive a secure reset link</p>
        </div>

        {submitted ? (
          <div className="text-center space-y-4">
            <div className="text-4xl">✉️</div>
            <div className="text-sm font-semibold text-green-400">Recovery link sent!</div>
            <p className="text-xs text-gray-400">
              Check your inbox for <strong>{email}</strong> and follow the link to reset your credentials.
            </p>
            <Link href="/login" className="inline-block text-xs text-blue-400 font-bold hover:underline">
              Return to Login
            </Link>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
            className="space-y-4"
          >
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">
                Work Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className="w-full bg-[#0B0F19] border border-border rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl transition text-sm shadow-lg shadow-blue-500/25"
            >
              Send Reset Link →
            </button>
          </form>
        )}

        <div className="text-center text-xs text-gray-400 pt-2 border-t border-border">
          Remember your password?{' '}
          <Link href="/login" className="text-blue-400 font-bold hover:underline">
            Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
