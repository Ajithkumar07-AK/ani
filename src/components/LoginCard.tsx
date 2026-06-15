import React, { useState } from "react";
import { motion } from "motion/react";
import { Eye, EyeOff, Mail, Lock, User, ShieldAlert, Sparkles } from "lucide-react";
import { UserSession } from "@/src/types";

interface LoginCardProps {
  onLoginSuccess: (user: UserSession) => void;
}

export function LoginCard({ onLoginSuccess }: LoginCardProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!name.trim()) {
      newErrors.name = "Name is required";
    } else if (name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    
    // Simulate neat cyberpunk sync animation before resolving login
    setTimeout(() => {
      setIsSubmitting(false);
      onLoginSuccess({
        name: name.trim(),
        email: email.trim(),
        loggedInAt: new Date().toISOString(),
      });
    }, 1200);
  };

  return (
    <motion.div
      id="login-card"
      initial={{ opacity: 0, scale: 0.95, y: 15 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="glass-panel w-full max-w-md p-8 rounded-3xl border border-white/10 shadow-[0_0_50px_rgba(3,3,7,0.8)] relative overflow-hidden backdrop-blur-xl"
    >
      {/* Visual cyber decoration */}
      <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink" />
      <div className="absolute -top-[140px] -right-[140px] w-[280px] h-[280px] rounded-full bg-neon-blue/10 blur-[60px] pointer-events-none" />
      <div className="absolute -bottom-[140px] -left-[140px] w-[280px] h-[280px] rounded-full bg-neon-pink/10 blur-[60px] pointer-events-none" />

      {/* Header Info */}
      <div className="text-center mb-8 relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-neon-blue font-mono mb-4">
          <Sparkles className="w-3.5 h-3.5 animate-pulse text-cyan-400" />
          <span>PORTAL MATRIX GATE v1.2</span>
        </div>
        <h1 className="font-display font-black italic uppercase text-3.5xl tracking-tighter text-white mb-2 leading-none">
          ANIME<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-500 italic">PORTAL</span>
        </h1>
        <p className="text-xs text-slate-400 font-medium tracking-wide uppercase">
          Sync your details to explore the celestial hub
        </p>
      </div>

      {/* Form Details */}
      <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
        {/* Name Input */}
        <div className="flex flex-col">
          <label htmlFor="login-name" className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">
            Enter Username
          </label>
          <div className="relative">
            <span className="absolute left-3.5 top-3.5 text-zinc-500">
              <User className="w-4.5 h-4.5" />
            </span>
            <input
              id="login-name"
              type="text"
              placeholder="e.g. Spike Spiegel"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (errors.name) {
                  setErrors((prev) => ({ ...prev, name: "" }));
                }
              }}
              className={`w-full pl-10.5 pr-4 py-3 bg-black/45 border rounded-xl font-sans text-sm text-white placeholder-zinc-600 focus:outline-none focus:ring-1 transition-all duration-200 ${
                errors.name 
                  ? "border-red-500/50 focus:border-red-500 focus:ring-red-500/30" 
                  : "border-white/10 focus:border-neon-blue focus:ring-neon-blue/30"
              }`}
            />
          </div>
          {errors.name && (
            <span className="flex items-center gap-1.5 mt-1.5 text-xs text-red-400 font-medium">
              <ShieldAlert className="w-3.5 h-3.5" />
              {errors.name}
            </span>
          )}
        </div>

        {/* Email Input */}
        <div className="flex flex-col">
          <label htmlFor="login-email" className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">
            Email Address
          </label>
          <div className="relative">
            <span className="absolute left-3.5 top-3.5 text-zinc-500">
              <Mail className="w-4.5 h-4.5" />
            </span>
            <input
              id="login-email"
              type="email"
              placeholder="e.g. spike@bebop.network"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) {
                  setErrors((prev) => ({ ...prev, email: "" }));
                }
              }}
              className={`w-full pl-10.5 pr-4 py-3 bg-black/45 border rounded-xl font-sans text-sm text-white placeholder-zinc-600 focus:outline-none focus:ring-1 transition-all duration-200 ${
                errors.email 
                  ? "border-red-500/50 focus:border-red-500 focus:ring-red-500/30" 
                  : "border-white/10 focus:border-neon-blue focus:ring-neon-blue/30"
              }`}
            />
          </div>
          {errors.email && (
            <span className="flex items-center gap-1.5 mt-1.5 text-xs text-red-400 font-medium">
              <ShieldAlert className="w-3.5 h-3.5" />
              {errors.email}
            </span>
          )}
        </div>

        {/* Password Input */}
        <div className="flex flex-col">
          <label htmlFor="login-password" className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">
            Secure Access Code
          </label>
          <div className="relative">
            <span className="absolute left-3.5 top-3.5 text-zinc-500">
              <Lock className="w-4.5 h-4.5" />
            </span>
            <input
              id="login-password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errors.password) {
                  setErrors((prev) => ({ ...prev, password: "" }));
                }
              }}
              className={`w-full pl-10.5 pr-11 py-3 bg-black/45 border rounded-xl font-sans text-sm text-white placeholder-zinc-600 focus:outline-none focus:ring-1 transition-all duration-200 ${
                errors.password 
                  ? "border-red-500/50 focus:border-red-500 focus:ring-red-500/30" 
                  : "border-white/10 focus:border-neon-blue focus:ring-neon-blue/30"
              }`}
            />
            <button
              id="password-visibility-toggle"
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-3 text-zinc-500 hover:text-zinc-300 transition-colors focus:outline-none"
            >
              {showPassword ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
            </button>
          </div>
          {errors.password && (
            <span className="flex items-center gap-1.5 mt-1.5 text-xs text-red-400 font-medium">
              <ShieldAlert className="w-3.5 h-3.5" />
              {errors.password}
            </span>
          )}
        </div>

        {/* Submit Button */}
        <button
          id="login-submit-button"
          type="submit"
          disabled={isSubmitting}
          className="w-full mt-6 py-3 px-4 rounded-xl font-display font-bold text-sm tracking-wider uppercase text-black bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink hover:opacity-90 active:scale-[0.98] transition-all cursor-pointer relative overflow-hidden flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,240,255,0.25)] hover:shadow-[0_0_30px_rgba(0,240,255,0.4)] disabled:opacity-50 disabled:cursor-wait"
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin h-4 w-4 text-black" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              <span>SYNCING NEURO-GATEWAY...</span>
            </>
          ) : (
            <>
              <span>SYNC TO ANIME GATE</span>
            </>
          )}
        </button>
      </form>
    </motion.div>
  );
}
