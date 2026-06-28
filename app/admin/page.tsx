'use client';

import React from 'react';

export default function Page() {
  return (
    <div className="p-xl font-sans bg-surface min-h-screen">
      <div className="max-w-4xl mx-auto bg-surface-container-lowest p-lg rounded-2xl shadow-ambient border border-outline-variant/30">
        <span className="text-label-sm text-secondary uppercase font-semibold tracking-wider block mb-1">
          Wild & Water E-Commerce
        </span>
        <h1 className="text-headline-lg font-bold text-on-surface tracking-tight mb-md">
          Trang quản trị
        </h1>
        <p className="text-body-md text-on-surface-variant leading-relaxed mb-sm">
          Đường dẫn hiện tại: <code className="bg-surface-container px-2 py-1 rounded text-primary text-label-sm">/app/admin</code>
        </p>
        <div className="mt-md text-label-sm text-outline">
          Sẵn sàng để triển khai các component chức năng.
        </div>
      </div>
    </div>
  );
}
