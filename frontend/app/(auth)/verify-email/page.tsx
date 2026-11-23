'use client';

import React from 'react';
import Link from 'next/link';

export default function VerifyEmailPage() {
  return (
    <div className="min-h-screen bg-[#0B0F19] flex flex-col justify-center items-center p-6">
      <Link href="/" className="flex items-center gap-2 mb-8">
        <span className="text-3xl">📡</span>
        <span className="text-2xl font-black bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
          LAUNCH AI
        </span>
      </Link>

      <div className="bg-[#111827] border border-border p-8 rounded-2xl w-full max-w-md shadow-2xl text-center space-y-5">
        <div className="text-4xl">✉️</div>
        <h1 className="text-xl font-extrabold text-white">Verify Your Email Address</h1>
        <p className="text-xs text-gray-400 leading-relaxed">
          We have sent an activation link to your work email. Click the verification button in the email to activate your account and access your organization workspace.
        </p>

        <div className="p-3 bg-[#0B0F19] border border-border rounded-xl text-xs text-gray-400">
          Didn't receive the email? Check your spam folder or click below.
        </div>

        <div className="flex flex-col gap-2 pt-2">
          <button
            onClick={() => alert("Verification email resent!")}
            className="w-full bg-[#0B0F19] border border-border hover:bg-white/5 text-white font-semibold py-2.5 rounded-xl text-xs transition"
          >
            Resend Email
          </button>
          <Link
            href="/onboarding"
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-2.5 rounded-xl text-xs transition"
          >
            Proceed to Onboarding →
          </Link>
        </div>
      </div>
    </div>
  );
}
