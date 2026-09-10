import React, { useState } from 'react';
import {
  Shield,
  Lock,
  Mail,
  Eye,
  EyeOff,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  KeyRound,
  Sparkles,
  ExternalLink,
  Globe,
  Database
} from 'lucide-react';
import { api } from '../services/api';
import { AdminUser } from '../types';

interface AdminLoginPageProps {
  onLoginSuccess: (user: AdminUser) => void;
  onNavigateHome?: () => void;
}

export const AdminLoginPage: React.FC<AdminLoginPageProps> = ({
  onLoginSuccess,
  onNavigateHome
}) => {
  const [email, setEmail] = useState('admin@scinsmedia.com');
  const [password, setPassword] = useState('Admin@2026');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loginAttempts, setLoginAttempts] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email || !password) {
      setErrorMessage('Please enter both administrator email and security password.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await api.login({ email, password });
      
      if (response && response.user) {
        if (rememberMe) {
          localStorage.setItem('scins_admin_token', response.token || `token_${Date.now()}`);
          localStorage.setItem('scins_admin_user', JSON.stringify(response.user));
        } else {
          sessionStorage.setItem('scins_admin_token', response.token || `token_${Date.now()}`);
          sessionStorage.setItem('scins_admin_user', JSON.stringify(response.user));
        }
        onLoginSuccess(response.user);
      } else {
        throw new Error('Invalid response received from authentication service.');
      }
    } catch (err: any) {
      console.error('Admin Login error:', err);
      setLoginAttempts(prev => prev + 1);
      setErrorMessage(
        err.message || 'Invalid administrator credentials. Please check your email and password.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleFillDemo = () => {
    setEmail('admin@scinsmedia.com');
    setPassword('Admin@2026');
    setErrorMessage('');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between relative overflow-hidden selection:bg-teal-500 selection:text-white">
      {/* Background Glows & Technical Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-25 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-teal-500/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[450px] h-[300px] bg-cyan-600/10 blur-[100px] rounded-full pointer-events-none" />

      {/* Top Header Bar */}
      <header className="relative z-10 max-w-7xl w-full mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-600 to-teal-400 flex items-center justify-center text-slate-950 shadow-md shadow-teal-500/20 font-extrabold text-lg">
            S
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-bold text-base tracking-tight text-white font-display">SCINS MEDIA</span>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-teal-950 text-teal-400 border border-teal-800/80">
                Admin Console
              </span>
            </div>
            <p className="text-[11px] text-slate-400">Scientific Congress & Publishing Management</p>
          </div>
        </div>

        {onNavigateHome && (
          <button
            type="button"
            onClick={onNavigateHome}
            className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-900 border border-slate-800 transition-colors"
          >
            <span>Public Website</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        )}
      </header>

      {/* Main Form Centerpiece */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          {/* Card Frame */}
          <div className="bg-slate-900/90 backdrop-blur-xl border border-slate-800/90 rounded-3xl p-8 sm:p-10 shadow-2xl shadow-black/50 space-y-7 relative">
            {/* Header / Security Badge */}
            <div className="space-y-2 text-center">
              <div className="w-14 h-14 rounded-2xl bg-teal-500/10 border border-teal-500/30 text-teal-400 flex items-center justify-center mx-auto shadow-inner">
                <Shield className="w-7 h-7" />
              </div>
              <h1 className="text-2xl font-bold text-white font-display tracking-tight pt-1">
                Admin Portal Login
              </h1>
              <p className="text-xs text-slate-400 max-w-xs mx-auto">
                Sign in with authorized academic secretariat credentials to access conferences, database sync, and registrations.
              </p>
            </div>

            {/* Error Message Alert */}
            {errorMessage && (
              <div className="p-3.5 rounded-xl bg-red-950/80 border border-red-800/80 text-xs text-red-200 flex items-start space-x-2.5 animate-in fade-in zoom-in-95">
                <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="font-semibold">{errorMessage}</p>
                  {loginAttempts > 0 && (
                    <button
                      type="button"
                      onClick={handleFillDemo}
                      className="mt-1 text-[11px] text-teal-400 hover:underline font-bold"
                    >
                      Click here to auto-fill default admin credentials
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email */}
              <div className="space-y-1.5">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Administrator Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="admin@scinsmedia.com"
                    className="w-full bg-slate-950/70 border border-slate-800 focus:border-teal-500 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-teal-500 transition-colors"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Security Password
                  </label>
                  <span className="text-[10px] text-slate-500 font-mono">256-Bit SSL Protected</span>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Enter admin password..."
                    className="w-full bg-slate-950/70 border border-slate-800 focus:border-teal-500 rounded-xl pl-10 pr-10 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-teal-500 transition-colors font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-slate-500 hover:text-slate-300 transition-colors"
                    title={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Checkboxes & Remember Me */}
              <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
                <label className="flex items-center space-x-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={e => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded border-slate-700 bg-slate-950 text-teal-600 focus:ring-teal-500"
                  />
                  <span>Keep session active</span>
                </label>
                <button
                  type="button"
                  onClick={handleFillDemo}
                  className="text-teal-400 hover:text-teal-300 font-semibold text-[11px] transition-colors"
                >
                  Fill Default Credentials
                </button>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-500 hover:to-teal-400 text-slate-950 font-bold py-3 rounded-xl text-xs flex items-center justify-center space-x-2 shadow-lg shadow-teal-500/25 transition-all cursor-pointer disabled:opacity-50"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                      <span>Verifying Credentials...</span>
                    </>
                  ) : (
                    <>
                      <span>Sign In to Admin Dashboard</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Quick Demo Credentials Box */}
            <div className="bg-slate-950/60 rounded-2xl p-4 border border-slate-800 text-xs space-y-2">
              <div className="flex items-center justify-between text-slate-400 text-[11px]">
                <span className="font-semibold text-slate-300 flex items-center space-x-1.5">
                  <KeyRound className="w-3.5 h-3.5 text-teal-400" />
                  <span>Default System Access:</span>
                </span>
                <button
                  type="button"
                  onClick={handleFillDemo}
                  className="text-teal-400 hover:underline text-[10px] font-mono font-bold"
                >
                  Quick Autofill
                </button>
              </div>
              <div className="grid grid-cols-2 gap-2 text-[11px] font-mono bg-slate-900/90 p-2 rounded-lg border border-slate-800/80">
                <div>
                  <span className="text-slate-500 block text-[9px] uppercase font-sans">Email</span>
                  <span className="text-slate-300">admin@scinsmedia.com</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[9px] uppercase font-sans">Password</span>
                  <span className="text-slate-300">Admin@2026</span>
                </div>
              </div>
            </div>

            {/* Security Compliance Badges */}
            <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-500 font-mono">
              <span className="flex items-center space-x-1">
                <CheckCircle2 className="w-3 h-3 text-teal-500" />
                <span>256-Bit Encrypted</span>
              </span>
              <span>GoDaddy cPanel Ready</span>
              <span>Audit Logged</span>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-4 text-center text-xs text-slate-600 border-t border-slate-900">
        <span>© {new Date().getFullYear()} SCINS Media International Secretariat. Administrative Authorization Required.</span>
      </footer>
    </div>
  );
};
