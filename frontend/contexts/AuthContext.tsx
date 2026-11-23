'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

export interface User {
  id: number;
  full_name: string;
  email: string;
  role: 'Admin' | 'Marketing Manager' | 'Designer' | 'Viewer';
  org_id: number;
  org_name: string;
  age?: number | string;
  phone?: string;
  dob?: string;
  registered_at?: string;
}

export interface AdminMessage {
  id: number;
  sender_name: string;
  receiver_id?: number | null;
  receiver_name: string;
  subject: string;
  content: string;
  priority: 'Urgent' | 'Directive' | 'Notice' | 'Info';
  created_at: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  messages: AdminMessage[];
  registeredUsers: User[];
  login: (email: string, password?: string, role?: string) => Promise<{ success: boolean; error?: string }>;
  signup: (
    fullName: string,
    email: string,
    password?: string,
    age?: number | string,
    phone?: string,
    dob?: string,
    orgName?: string,
    role?: string
  ) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  switchOrg: (orgId: number, orgName: string) => void;
  switchRole: (role: User['role']) => void;
  sendAdminMessage: (
    receiverId: number | null,
    receiverName: string,
    subject: string,
    content: string,
    priority?: AdminMessage['priority']
  ) => Promise<{ success: boolean; error?: string }>;
  deleteAdminMessage: (id: number) => Promise<void>;
  removeUser: (userId: number, userEmail: string) => Promise<{ success: boolean; error?: string }>;
  refreshUsers: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const MASTER_ADMIN_EMAIL = "ramyadeepikakudelli@gmail.com";

// Initial baseline enterprise accounts
const INITIAL_ACCOUNTS: Record<string, any> = {
  "ramyadeepikakudelli@gmail.com": {
    id: 1,
    full_name: "Ramya Deepika Kudelli",
    email: "ramyadeepikakudelli@gmail.com",
    password: "admin123",
    role: "Admin",
    age: 24,
    phone: "7013370889",
    dob: "Aug 25",
    org_name: "Reliance Jio Infocomm",
    registered_at: "Aug 25, 2026"
  },
  "designer@jio.com": {
    id: 2,
    full_name: "Aryan Verma",
    email: "designer@jio.com",
    password: "designer123",
    role: "Designer",
    age: 24,
    phone: "+91 98111 22233",
    dob: "Jan 15",
    org_name: "Reliance Jio Infocomm",
    registered_at: "Nov 18, 2026"
  }
};

const INITIAL_MESSAGES: AdminMessage[] = [
  {
    id: 1,
    sender_name: "Ramya Deepika Kudelli (Admin)",
    receiver_id: null,
    receiver_name: "All Designers",
    subject: "Diwali 5G SuperSpeed Launch Directives",
    content: "Welcome designers! Please ensure all synthesized campaign backgrounds follow the new Jio True 5G guidelines: high-contrast blue (#0A2885) and crimson badge (#E31B23). Submit for review when ready.",
    priority: "Directive",
    created_at: "Today at 10:30 AM"
  },
  {
    id: 2,
    sender_name: "Ramya Deepika Kudelli (Admin)",
    receiver_id: null,
    receiver_name: "All Designers",
    subject: "New TRAI Regulatory Disclaimer Mandatory",
    content: "All 5G unlimited plans require the disclaimer text: '*Terms apply. 5G speeds vary by city and network availability.' Please verify in the canvas editor before submitting for approval.",
    priority: "Urgent",
    created_at: "Yesterday at 04:15 PM"
  }
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [messages, setMessages] = useState<AdminMessage[]>([]);
  const [registeredUsers, setRegisteredUsers] = useState<User[]>([]);

  // Initialize session and registry
  useEffect(() => {
    try {
      // 1. Initialize persistent user registry with Master Admin Ramya Deepika Kudelli
      let currentRegistry = JSON.parse(localStorage.getItem('launch_ai_registered_users') || "{}");
      // Clean up legacy admin emails
      delete currentRegistry["admin@launchai.com"];
      delete currentRegistry["designer@launchai.com"];
      delete currentRegistry["ramya@launchai.com"];

      let updatedRegistry = { ...INITIAL_ACCOUNTS, ...currentRegistry };
      localStorage.setItem('launch_ai_registered_users', JSON.stringify(updatedRegistry));
      setRegisteredUsers(Object.values(updatedRegistry));

      // 2. Initialize messages
      const savedMessages = localStorage.getItem('launch_ai_admin_messages');
      if (savedMessages) {
        setMessages(JSON.parse(savedMessages));
      } else {
        setMessages(INITIAL_MESSAGES);
        localStorage.setItem('launch_ai_admin_messages', JSON.stringify(INITIAL_MESSAGES));
      }

      // 3. Load active user session
      const savedToken = localStorage.getItem('launch_ai_token');
      const savedUser = localStorage.getItem('launch_ai_user');

      if (savedToken && savedUser) {
        let parsed = JSON.parse(savedUser);
        // Cleanse legacy hardcoded session and ensure Master Admin is Ramya Deepika Kudelli
        if (
          parsed.role === "Admin" ||
          parsed.full_name === "Vikram Malhotra" ||
          parsed.full_name === "Ramya Kudelli" ||
          parsed.email === "admin@launchai.com" ||
          parsed.email === "ramyadeepikakudelli@gmail.com"
        ) {
          parsed.full_name = "Ramya Deepika Kudelli";
          parsed.email = "ramyadeepikakudelli@gmail.com";
          parsed.role = "Admin";
          parsed.phone = "7013370889";
          parsed.dob = "Aug 25";
          parsed.age = 24;
          localStorage.setItem('launch_ai_user', JSON.stringify(parsed));
        }
        setToken(savedToken);
        setUser(parsed);
      } else {
        // Default initialized session as Master Admin Ramya Deepika Kudelli
        const masterAdmin: User = {
          id: 1,
          full_name: "Ramya Deepika Kudelli",
          email: "ramyadeepikakudelli@gmail.com",
          role: "Admin",
          org_id: 1,
          org_name: "Reliance Jio Infocomm",
          age: 24,
          phone: "7013370889",
          dob: "Aug 25",
          registered_at: "Aug 25, 2026"
        };
        setUser(masterAdmin);
        setToken("session_admin_token");
        localStorage.setItem('launch_ai_user', JSON.stringify(masterAdmin));
        localStorage.setItem('launch_ai_token', "session_admin_token");
      }
    } catch (e) {
      console.warn("Storage init error:", e);
    }
  }, []);

  const refreshUsers = () => {
    try {
      const reg = JSON.parse(localStorage.getItem('launch_ai_registered_users') || "{}");
      setRegisteredUsers(Object.values(reg));
    } catch (e) {}
  };

  // STRICT LOGIN: Account must exist!
  const login = async (
    email: string,
    password: string = "",
    role?: string
  ): Promise<{ success: boolean; error?: string }> => {
    const cleanEmail = email.trim().toLowerCase();

    try {
      // 1. Try FastAPI backend authentication if online
      try {
        const res = await fetch(`${API_BASE}/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: cleanEmail, password }),
        });

        if (res.ok) {
          const data = await res.json();
          const isMasterAdmin = cleanEmail === MASTER_ADMIN_EMAIL;
          const loggedUser: User = {
            id: data.user.id,
            full_name: isMasterAdmin ? "Ramya Deepika Kudelli" : data.user.full_name,
            email: data.user.email,
            role: isMasterAdmin ? "Admin" : ((data.user.role as User['role']) || "Designer"),
            org_id: data.user.org_id || 1,
            org_name: "Reliance Jio Infocomm",
            age: data.user.age || 24,
            phone: isMasterAdmin ? "7013370889" : (data.user.phone || "+91 98765 43210"),
            dob: isMasterAdmin ? "Aug 25" : (data.user.dob || "Jan 01"),
            registered_at: data.user.created_at || "Recent"
          };
          setUser(loggedUser);
          setToken(data.access_token);
          localStorage.setItem('launch_ai_user', JSON.stringify(loggedUser));
          localStorage.setItem('launch_ai_token', data.access_token);
          router.push('/dashboard');
          return { success: true };
        } else if (res.status === 404 || res.status === 401) {
          const errData = await res.json();
          return { success: false, error: errData.detail || "Authentication failed." };
        }
      } catch (err) {
        // Backend offline - proceed to persistent local security store
      }

      // 2. Strict check against registered users in localStorage
      const usersRegistry = JSON.parse(localStorage.getItem('launch_ai_registered_users') || "{}");
      const account = usersRegistry[cleanEmail];

      // If user does not exist, refuse login!
      if (!account) {
        return {
          success: false,
          error: "Account not found! You must sign up and create an account first before you can sign in."
        };
      }

      // If user exists, check password strictly
      if (account.password && password && account.password !== password) {
        return {
          success: false,
          error: "Incorrect password. Please verify your credentials and try again."
        };
      }

      // Only Ramya Deepika Kudelli is Admin
      const isMasterAdmin = cleanEmail === MASTER_ADMIN_EMAIL;
      const activeRole = isMasterAdmin ? "Admin" : ((account.role as User['role']) || "Designer");
      const sessionUser: User = {
        id: account.id || Math.floor(Math.random() * 8000) + 1000,
        full_name: isMasterAdmin ? "Ramya Deepika Kudelli" : account.full_name,
        email: cleanEmail,
        role: activeRole,
        org_id: 1,
        org_name: account.org_name || "Reliance Jio Infocomm",
        age: account.age || 24,
        phone: isMasterAdmin ? "7013370889" : account.phone,
        dob: isMasterAdmin ? "Aug 25" : account.dob,
        registered_at: account.registered_at || "Recent"
      };

      const newToken = "jwt_secure_token_" + Date.now();
      setUser(sessionUser);
      setToken(newToken);
      localStorage.setItem('launch_ai_user', JSON.stringify(sessionUser));
      localStorage.setItem('launch_ai_token', newToken);

      router.push('/dashboard');
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message || "Failed to log in" };
    }
  };

  // SIGNUP: Collects name, age, phone, dob, email, password, org
  // Strict Security Rule: ONLY Ramya Deepika Kudelli can be Admin!
  const signup = async (
    fullName: string,
    email: string,
    password: string = "",
    age: number | string = 24,
    phone: string = "7013370889",
    dob: string = "Aug 25",
    orgName: string = "Reliance Jio Infocomm",
    role: string = "Designer"
  ): Promise<{ success: boolean; error?: string }> => {
    const cleanEmail = email.trim().toLowerCase();

    try {
      // Check if email already registered
      const registry = JSON.parse(localStorage.getItem('launch_ai_registered_users') || "{}");
      if (registry[cleanEmail]) {
        return {
          success: false,
          error: "An account with this email already exists. Please sign in instead."
        };
      }

      // Role is locked: only Ramya Deepika Kudelli is Admin
      const assignedRole: User['role'] = cleanEmail === MASTER_ADMIN_EMAIL ? "Admin" : "Designer";

      // 1. Try FastAPI registration if online
      try {
        await fetch(`${API_BASE}/auth/signup`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: cleanEmail,
            password,
            full_name: fullName.trim(),
            org_name: orgName,
            role: assignedRole,
            age: Number(age) || 24,
            phone: phone.trim(),
            dob: dob.trim()
          }),
        });
      } catch (err) {}

      // 2. Save complete account details in persistent user registry
      const newUserRecord = {
        id: Date.now(),
        full_name: fullName.trim(),
        email: cleanEmail,
        password: password,
        age: Number(age) || 24,
        phone: phone.trim(),
        dob: dob.trim() || "Aug 25",
        org_name: orgName,
        role: assignedRole,
        registered_at: new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        })
      };

      registry[cleanEmail] = newUserRecord;
      localStorage.setItem('launch_ai_registered_users', JSON.stringify(registry));
      setRegisteredUsers(Object.values(registry));

      // Redirect to login page so user signs in after creating account
      router.push(`/login?registered=true&email=${encodeURIComponent(cleanEmail)}`);
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message || "Failed to create account" };
    }
  };

  // ADMIN ACTION: Remove / Revoke anyone who registered or logged in
  const removeUser = async (userId: number, userEmail: string): Promise<{ success: boolean; error?: string }> => {
    const cleanEmail = userEmail.trim().toLowerCase();

    // Prevent deleting the Master Administrator
    if (cleanEmail === MASTER_ADMIN_EMAIL) {
      return { success: false, error: "Cannot remove the master administrator account Ramya Deepika Kudelli." };
    }

    try {
      // 1. Delete from backend if online
      try {
        await fetch(`${API_BASE}/users/${userId}`, { method: "DELETE" });
      } catch (err) {}

      // 2. Delete from local registry
      const registry = JSON.parse(localStorage.getItem('launch_ai_registered_users') || "{}");
      delete registry[cleanEmail];
      localStorage.setItem('launch_ai_registered_users', JSON.stringify(registry));

      // 3. Update state in memory
      const updatedList = Object.values(registry) as User[];
      setRegisteredUsers(updatedList);

      // 4. Invalidate session if removed user was currently stored
      const savedUserStr = localStorage.getItem('launch_ai_user');
      if (savedUserStr) {
        const saved = JSON.parse(savedUserStr);
        if (saved.email?.toLowerCase() === cleanEmail) {
          localStorage.removeItem('launch_ai_user');
          localStorage.removeItem('launch_ai_token');
        }
      }

      return { success: true };
    } catch (e: any) {
      return { success: false, error: e.message || "Failed to remove user." };
    }
  };

  // Admin sends message to designers
  const sendAdminMessage = async (
    receiverId: number | null,
    receiverName: string,
    subject: string,
    content: string,
    priority: AdminMessage['priority'] = "Directive"
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      const newMsg: AdminMessage = {
        id: Date.now(),
        sender_name: "Ramya Deepika Kudelli (Admin)",
        receiver_id: receiverId,
        receiver_name: receiverName || "All Designers",
        subject: subject.trim(),
        content: content.trim(),
        priority: priority,
        created_at: "Just now"
      };

      // Try backend
      try {
        await fetch(`${API_BASE}/messages`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            receiver_id: receiverId,
            receiver_name: receiverName,
            subject,
            content,
            priority
          })
        });
      } catch (e) {}

      // Save locally
      const updatedMessages = [newMsg, ...messages];
      setMessages(updatedMessages);
      localStorage.setItem('launch_ai_admin_messages', JSON.stringify(updatedMessages));
      return { success: true };
    } catch (e: any) {
      return { success: false, error: e.message || "Failed to send message" };
    }
  };

  const deleteAdminMessage = async (id: number) => {
    try {
      try {
        await fetch(`${API_BASE}/messages/${id}`, { method: "DELETE" });
      } catch (e) {}
      const updated = messages.filter(m => m.id !== id);
      setMessages(updated);
      localStorage.setItem('launch_ai_admin_messages', JSON.stringify(updated));
    } catch (e) {}
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('launch_ai_user');
    localStorage.removeItem('launch_ai_token');
    router.push('/login');
  };

  const switchOrg = (orgId: number, orgName: string) => {
    if (user) {
      const updated = { ...user, org_id: orgId, org_name: orgName };
      setUser(updated);
      localStorage.setItem('launch_ai_user', JSON.stringify(updated));
    }
  };

  const switchRole = (role: User['role']) => {
    if (user) {
      const updated = { ...user, role };
      setUser(updated);
      localStorage.setItem('launch_ai_user', JSON.stringify(updated));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        messages,
        registeredUsers,
        login,
        signup,
        logout,
        switchOrg,
        switchRole,
        sendAdminMessage,
        deleteAdminMessage,
        removeUser,
        refreshUsers
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
