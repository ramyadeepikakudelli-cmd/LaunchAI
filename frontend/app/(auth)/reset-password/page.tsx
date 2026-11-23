'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function ResetPasswordPage() {
  const router = useRouter();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [success, setSuccess] = useState(false);

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
          <h1 className="text-xl font-extrabold text-white">Create New Password</h1>
          <p className="text-xs text-gray-400 mt-1">Set a secure password for your organization account</p>
        </div>

        {success ? (
          <div className="text-center space-y-3">
            <div className="text-sm text-green-400 font-bold">Password successfully updated!</div>
            <Link href="/login" className="inline-block bg-blue-600 text-white font-bold px-6 py-2 rounded-xl text-xs">
              Sign In Now →
            </Link>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSuccess(true);
            }}
            className="space-y-4"
          >
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">
                New Password
              </label>
              <input
                type="password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full bg-[#0B0F19] border border-border rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">
                Confirm New Password
              </label>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full bg-[#0B0F19] border border-border rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl transition text-sm shadow-lg shadow-blue-500/25"
            >
              Reset Password →
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
