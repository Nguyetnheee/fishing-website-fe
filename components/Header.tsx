'use client';

import React, { useState, useEffect } from 'react';
import { Search, ShoppingCart, User, Menu, X } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState('Sông');

  const navLinks = [
    { label: 'Trang chủ', href: '/' },
    { label: 'Biển', href: '/category#sea' },
    { label: 'Sông', href: '/category#river' },
    { label: 'Hồ', href: '/category#lake' },
    { label: 'Hoạt động', href: '#activities' },
    { label: 'Giới thiệu', href: '#about' },
  ];

  // Auto-set active tab based on pathname and hash
  useEffect(() => {
    const handleHashAndPath = () => {
      const hash = typeof window !== 'undefined' ? window.location.hash.replace('#', '') : '';
      
      if (pathname === '/category') {
        if (hash === 'sea') {
          setActiveTab('Biển');
        } else if (hash === 'lake') {
          setActiveTab('Hồ');
        } else {
          setActiveTab('Sông');
        }
      } else if (pathname === '/') {
        setActiveTab('Trang chủ');
      } else {
        setActiveTab('');
      }
    };

    handleHashAndPath();
    
    if (typeof window !== 'undefined') {
      window.addEventListener('hashchange', handleHashAndPath);
      return () => window.removeEventListener('hashchange', handleHashAndPath);
    }
  }, [pathname]);

  return (
    <header className="relative w-full h-20 bg-surface-container-lowest border-b border-outline-variant/30 px-margin-mobile md:px-margin-desktop transition-all duration-300 z-50">
      <div className="max-w-7xl mx-auto h-full flex items-center justify-between">
        
        {/* Brand Logo */}
        <div className="flex items-center">
          <a href="/" className="font-sans text-body-lg md:text-headline-md tracking-tight font-extrabold text-primary select-none focus-visible:outline-none">
            WildStream Gear
          </a>
        </div>

        {/* Center Desktop Navigation with Bottom Blue Active Line */}
        <nav className="hidden md:flex items-center h-full gap-md">
          {navLinks.map((link) => {
            const isActive = activeTab === link.label;
            return (
              <a
                key={link.label}
                href={link.href}
                onClick={() => {
                  setActiveTab(link.label);
                }}
                className={`relative flex items-center h-full px-xs font-sans text-label-md text-on-surface-variant hover:text-primary transition-colors duration-200 focus-visible:outline-none`}
              >
                {/* Blue border line at the bottom of active tab */}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-full" />
                )}
                <span className={isActive ? 'text-primary font-bold' : ''}>
                  {link.label}
                </span>
              </a>
            );
          })}
        </nav>

        {/* Right Search and Actions */}
        <div className="flex items-center gap-sm md:gap-md">
          {/* Search Bar */}
          <div className="relative hidden md:block">
            <input
              type="text"
              placeholder="Tìm kiếm trang bị..."
              className="bg-surface-container-low border border-outline-variant/40 rounded-full py-2 pl-4 pr-10 text-label-sm text-on-surface placeholder-on-surface-variant/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary w-48 lg:w-64 transition-all duration-200"
            />
            <Search className="w-4 h-4 text-outline absolute right-3 top-2.5 cursor-pointer hover:text-primary transition-colors" />
          </div>

          {/* Cart Icon with Orange Badge "3" (Matches Mockup) */}
          <button 
            type="button"
            className="p-2 rounded-full hover:bg-surface-container text-on-surface hover:text-primary transition-all duration-200 focus-visible:outline-primary relative"
            aria-label="Giỏ hàng"
          >
            <ShoppingCart className="w-5 h-5" />
            <span className="absolute top-0.5 right-0.5 bg-accent-orange text-white text-[9px] w-[18px] h-[18px] rounded-full flex items-center justify-center font-sans font-bold shadow-sm leading-none">
              3
            </span>
          </button>

          {/* User Icon */}
          <button 
            type="button"
            className="p-2 rounded-full hover:bg-surface-container text-on-surface hover:text-primary transition-all duration-200 focus-visible:outline-primary"
            aria-label="Tài khoản"
          >
            <User className="w-5 h-5" />
          </button>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            className="md:hidden p-2 rounded-md hover:bg-surface-container text-on-surface hover:text-primary transition-all duration-200"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Trình đơn di động"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-surface-container-lowest border-b border-outline-variant/30 shadow-lg px-margin-mobile py-sm z-40 transition-all duration-200">
          {/* Mobile Search */}
          <div className="relative mb-sm">
            <input
              type="text"
              placeholder="Tìm kiếm trang bị..."
              className="w-full bg-surface-container-low border border-outline-variant/40 rounded-full py-2 pl-4 pr-10 text-label-sm text-on-surface placeholder-on-surface-variant/50 focus:outline-none"
            />
            <Search className="w-4 h-4 text-outline absolute right-3 top-2.5" />
          </div>
          <nav className="flex flex-col gap-sm py-xs">
            {navLinks.map((link) => {
              const isActive = activeTab === link.label;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  className={`text-body-md py-2 px-3 rounded-md hover:bg-surface-container transition-all duration-200 font-sans ${
                    isActive ? 'text-primary font-bold bg-surface-container' : 'text-on-surface-variant'
                  }`}
                  onClick={() => {
                    setActiveTab(link.label);
                    setIsMobileMenuOpen(false);
                  }}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
