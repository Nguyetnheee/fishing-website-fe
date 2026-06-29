'use client';

import React, { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { User, Mail, Lock, ShieldCheck, ArrowRight, Eye, EyeOff, Compass } from 'lucide-react';

export default function RegisterPage() {
  const [fullname, setFullname] = useState('');
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullname || !emailOrPhone || !password || !confirmPassword) {
      alert('Vui lòng điền đầy đủ thông tin đăng ký!');
      return;
    }
    if (password !== confirmPassword) {
      alert('Mật khẩu và Xác nhận mật khẩu không khớp!');
      return;
    }
    if (!agreeTerms) {
      alert('Vui lòng đồng ý với Điều khoản dịch vụ và Chính sách bảo mật!');
      return;
    }

    setLoading(true);
    // Simulate register operation
    setTimeout(() => {
      setLoading(false);
      alert('Tạo tài khoản thành công! Bạn sẽ được chuyển hướng đến trang Đăng nhập.');
      window.location.href = '/login';
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-on-surface flex flex-col font-sans">
      {/* Navigation Header */}
      <Header />

      {/* Main Container - Centering Card */}
      <main className="flex-grow flex items-center justify-center px-margin-mobile py-lg">
        
        {/* REGISTER CARD: White, rounded-2xl, shadow-ambient */}
        <div className="w-full max-w-md bg-white rounded-2xl shadow-ambient border border-outline-variant/10 p-md sm:p-lg text-left">
          
          {/* HEADER: Headline & Subtext */}
          <div className="text-center mb-md">
            {/* Custom Brand Icon / Logo */}
            <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-xs">
              <Compass className="w-6 h-6" />
            </div>
            <h2 className="text-body-lg font-extrabold text-on-surface-variant font-sans tracking-wide">
              WILDSTREAM GEAR
            </h2>
            <h1 className="text-headline-md font-bold text-[#00288e] tracking-tight mt-1">
              Tạo tài khoản mới
            </h1>
            <p className="text-[12px] text-on-surface-variant mt-1">
              Bắt đầu hành trình khám phá của bạn
            </p>
          </div>

          {/* FORM FIELDS */}
          <form onSubmit={handleSubmit} className="space-y-sm">
            
            {/* Input 1: Họ và tên */}
            <div className="flex flex-col gap-xs">
              <label className="text-label-sm font-bold text-on-surface-variant uppercase tracking-wider flex items-center gap-xs">
                <User className="w-4 h-4 text-outline" /> Họ và tên
              </label>
              <input
                type="text"
                placeholder="Nguyễn Văn A"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
                className="bg-[#f8f9fa] border border-[#e5e7eb] rounded-lg py-2 pl-3 px-3.5 text-body-md text-on-surface placeholder-on-surface-variant/40 focus:outline-none focus:border-[#00288e] focus:ring-1 focus:ring-[#00288e] transition-all duration-200"
                required
              />
            </div>

            {/* Input 2: Email hoặc Số điện thoại */}
            <div className="flex flex-col gap-xs">
              <label className="text-label-sm font-bold text-on-surface-variant uppercase tracking-wider flex items-center gap-xs">
                <Mail className="w-4 h-4 text-outline" /> Email hoặc Số điện thoại
              </label>
              <input
                type="text"
                placeholder="email@example.com hoặc 09xxxxxxxx"
                value={emailOrPhone}
                onChange={(e) => setEmailOrPhone(e.target.value)}
                className="bg-[#f8f9fa] border border-[#e5e7eb] rounded-lg py-2 pl-3 px-3.5 text-body-md text-on-surface placeholder-on-surface-variant/40 focus:outline-none focus:border-[#00288e] focus:ring-1 focus:ring-[#00288e] transition-all duration-200"
                required
              />
            </div>

            {/* Input 3: Mật khẩu */}
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
                  className="w-full bg-[#f8f9fa] border border-[#e5e7eb] rounded-lg py-2 pl-3 pr-10 text-body-md text-on-surface placeholder-on-surface-variant/40 focus:outline-none focus:border-[#00288e] focus:ring-1 focus:ring-[#00288e] transition-all duration-200"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-outline hover:text-primary transition-colors cursor-pointer"
                  aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                >
                  {showPassword ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
                </button>
              </div>
            </div>

            {/* Input 4: Xác nhận mật khẩu */}
            <div className="flex flex-col gap-xs relative">
              <label className="text-label-sm font-bold text-on-surface-variant uppercase tracking-wider flex items-center gap-xs">
                <ShieldCheck className="w-4 h-4 text-outline" /> Xác nhận mật khẩu
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-[#f8f9fa] border border-[#e5e7eb] rounded-lg py-2 pl-3 pr-10 text-body-md text-on-surface placeholder-on-surface-variant/40 focus:outline-none focus:border-[#00288e] focus:ring-1 focus:ring-[#00288e] transition-all duration-200"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-2.5 text-outline hover:text-primary transition-colors cursor-pointer"
                  aria-label={showConfirmPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                >
                  {showConfirmPassword ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
                </button>
              </div>
            </div>

            {/* Checkbox: Agreement checkbox */}
            <div className="pt-xs flex items-start gap-xs">
              <input
                type="checkbox"
                id="terms-checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="mt-1 text-primary focus:ring-primary cursor-pointer w-4 h-4 rounded"
              />
              <label
                htmlFor="terms-checkbox"
                className="text-[11px] text-on-surface-variant leading-relaxed font-sans font-medium select-none cursor-pointer"
              >
                Tôi đồng ý với{' '}
                <a href="#terms" className="text-[#00288e] hover:underline font-bold">
                  Điều khoản dịch vụ
                </a>{' '}
                và{' '}
                <a href="#privacy" className="text-[#00288e] hover:underline font-bold">
                  Chính sách bảo mật
                </a>{' '}
                của WildStream Gear
              </label>
            </div>

            {/* Primary Action Button (Ocean Blue, full-width, bold) */}
            <div className="pt-sm">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#00288e] hover:bg-[#1e40af] disabled:bg-primary/50 text-white text-label-md font-bold rounded-md py-3.5 px-md flex items-center justify-center gap-xs shadow-sm hover:shadow transition-all duration-200 cursor-pointer focus-visible:outline-none active:scale-[0.98]"
              >
                <span>{loading ? 'ĐANG ĐĂNG KÝ...' : 'ĐĂNG KÝ'}</span>
                {!loading && <ArrowRight className="w-4.5 h-4.5" />}
              </button>
            </div>

          </form>

          {/* FOOTER: Already have an account link */}
          <div className="text-center mt-md pt-sm border-t border-outline-variant/10 text-label-sm text-on-surface-variant/80">
            <span>Đã có tài khoản? </span>
            <a
              href="/login"
              className="text-[#00288e] hover:underline font-bold"
            >
              Đăng nhập
            </a>
          </div>

        </div>

      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
