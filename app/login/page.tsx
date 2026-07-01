'use client';

import React, { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Eye, EyeOff, Mail, Lock, Compass, ArrowRight } from 'lucide-react';

export default function LoginPage() {
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailOrPhone || !password) {
      alert('Vui lòng điền đầy đủ thông tin đăng nhập!');
      return;
    }

    setLoading(true);
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || '';
      const loginUrl = baseUrl ? `${baseUrl}/auth/login` : '/api/auth/login';

      const response = await fetch(loginUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: emailOrPhone,
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('email', data.email);
        localStorage.setItem('role', data.role);
        alert('Đăng nhập thành công!');
        window.location.href = '/';
      } else {
        alert(data.message || 'Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin!');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Đã xảy ra lỗi kết nối đến máy chủ. Vui lòng thử lại sau!');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    // Redirect to backend Google OAuth2 login flow
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || '';
    window.location.href = baseUrl ? `${baseUrl}/oauth2/authorization/google` : 'http://localhost:8080/oauth2/authorization/google';
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-on-surface flex flex-col font-sans">
      {/* Navigation Header */}
      <Header />

      {/* Main Container - Centering Card */}
      <main className="flex-grow flex items-center justify-center px-margin-mobile py-lg">
        
        {/* LOGIN CARD: White, rounded-2xl, shadow-ambient */}
        <div className="w-full max-w-md bg-white rounded-2xl shadow-ambient border border-outline-variant/10 p-md sm:p-lg text-left">
          
          {/* HEADER: Brand Logo & Headline */}
          <div className="text-center mb-md">
            {/* Custom Brand Icon / Logo */}
            <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-xs">
              <Compass className="w-6 h-6 animate-pulse" />
            </div>
            <h2 className="text-body-lg font-extrabold text-on-surface-variant font-sans tracking-wide">
              WILDSTREAM GEAR
            </h2>
            <h1 className="text-headline-md font-bold text-[#00288e] tracking-tight mt-1">
              Đăng nhập
            </h1>
            <p className="text-[12px] text-on-surface-variant mt-1">
              Nhập tài khoản để tiếp tục hành trình thám hiểm của bạn
            </p>
          </div>

          {/* FORM FIELDS */}
          <form onSubmit={handleSubmit} className="space-y-md">
            
            {/* Input 1: Email or Phone */}
            <div className="flex flex-col gap-xs">
              <label className="text-label-sm font-bold text-on-surface-variant uppercase tracking-wider flex items-center gap-xs">
                <Mail className="w-4 h-4 text-outline" /> Email hoặc Số điện thoại
              </label>
              <input
                type="text"
                placeholder="email@example.com hoặc 09xxxxxxxx"
                value={emailOrPhone}
                onChange={(e) => setEmailOrPhone(e.target.value)}
                className="bg-[#f8f9fa] border border-[#e5e7eb] rounded-lg py-2.5 px-3.5 text-body-md text-on-surface placeholder-on-surface-variant/40 focus:outline-none focus:border-[#00288e] focus:ring-1 focus:ring-[#00288e] transition-all duration-200"
                required
              />
            </div>

            {/* Input 2: Password */}
            <div className="flex flex-col gap-xs relative">
              <label className="text-label-sm font-bold text-on-surface-variant uppercase tracking-wider flex items-center gap-xs">
                <Lock className="w-4 h-4 text-outline" /> Mật khẩu
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#f8f9fa] border border-[#e5e7eb] rounded-lg py-2.5 pl-3.5 pr-10 text-body-md text-on-surface placeholder-on-surface-variant/40 focus:outline-none focus:border-[#00288e] focus:ring-1 focus:ring-[#00288e] transition-all duration-200"
                  required
                />
                
                {/* Toggle Password Visibility */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3 text-outline hover:text-primary transition-colors cursor-pointer"
                  aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                >
                  {showPassword ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
                </button>
              </div>
            </div>

            {/* Link: Quên mật khẩu? (Ocean Blue) */}
            <div className="flex justify-end -mt-xs">
              <a
                href="/forgot-password"
                className="text-label-sm text-[#00288e] hover:underline font-semibold"
              >
                Quên mật khẩu?
              </a>
            </div>

            {/* Primary Action Button (Ocean Blue, rounded-md, bold) */}
            <div className="pt-xs">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#00288e] hover:bg-[#1e40af] disabled:bg-primary/50 text-white text-label-md font-bold rounded-md py-3 px-md flex items-center justify-center gap-xs shadow-sm hover:shadow transition-all duration-200 cursor-pointer focus-visible:outline-none active:scale-[0.98]"
              >
                <span>{loading ? 'ĐANG ĐĂNG NHẬP...' : 'ĐĂNG NHẬP'}</span>
                {!loading && <ArrowRight className="w-4.5 h-4.5" />}
              </button>
            </div>

          </form>

          {/* SOCIAL LOGIN DIVIDER */}
          <div className="relative my-md text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-outline-variant/20"></div>
            </div>
            <span className="relative bg-white px-3 text-label-sm text-on-surface-variant/60 font-sans font-medium uppercase">
              Hoặc
            </span>
          </div>

          {/* Google Login Ghost Button */}
          <div>
            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full border border-outline-variant/60 hover:bg-surface-container-low text-on-surface text-label-md font-bold rounded-md py-3 px-md flex items-center justify-center gap-sm transition-all duration-200 cursor-pointer focus-visible:outline-none active:scale-[0.98]"
            >
              {/* Google Brand Color Logo Vector SVG */}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
              </svg>
              <span>Đăng nhập bằng Google</span>
            </button>
          </div>

          {/* FOOTER: Register account link */}
          <div className="text-center mt-md pt-sm border-t border-outline-variant/10 text-label-sm text-on-surface-variant/80">
            <span>Chưa có tài khoản? </span>
            <a
              href="/register"
              className="text-[#00288e] hover:underline font-bold"
            >
              Đăng ký ngay
            </a>
          </div>

        </div>

      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
