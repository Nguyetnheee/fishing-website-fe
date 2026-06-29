'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { CreditCard, Truck, ShieldCheck, ArrowRight, User, Phone, MapPin, Building } from 'lucide-react';

export default function CheckoutPage() {
  const router = useRouter();
  const [fullname, setFullname] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'bank'>('cod');
  const [loading, setLoading] = useState(false);

  // Hardcoded subtotal matching typical cart scenario for display
  const subtotal = 4950000; // Lều Horizon 4 người (3.450.000) + Ghế dã ngoại (750.000 x 2)
  const shippingFee = 0; // Free shipping for orders over 3M
  const total = subtotal + shippingFee;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullname || !phone || !address) {
      alert('Vui lòng điền đầy đủ Họ tên, Số điện thoại và Địa chỉ!');
      return;
    }

    setLoading(true);
    // Simulate order placement
    setTimeout(() => {
      setLoading(false);
      // Pass order information through sessionStorage or URL query if needed, or redirect directly
      if (typeof window !== 'undefined') {
        const orderData = {
          fullname,
          phone,
          address: `${address}, ${city || 'Hà Nội'}`,
          paymentMethod: paymentMethod === 'cod' ? 'Thanh toán khi nhận hàng (COD)' : 'Chuyển khoản Ngân hàng',
          total,
          orderId: 'WSG-' + Math.floor(100000 + Math.random() * 900000),
          date: new Date().toLocaleDateString('vi-VN'),
        };
        sessionStorage.setItem('lastOrder', JSON.stringify(orderData));
      }
      router.push('/order-success');
    }, 1200);
  };

  const formatPrice = (value: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-on-surface flex flex-col font-sans">
      {/* Navigation Header */}
      <Header />

      {/* Checkout Form Main Content */}
      <main className="flex-grow w-full max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop py-sm md:py-md">
        
        {/* Title */}
        <div className="mb-md text-left">
          <h1 className="text-headline-md md:text-headline-lg font-bold text-on-surface tracking-tight">
            Thanh toán đơn hàng
          </h1>
          <p className="text-label-sm text-on-surface-variant font-medium mt-1">
            Vui lòng nhập thông tin giao hàng và chọn phương thức thanh toán phù hợp
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-md md:gap-lg items-start">
          
          {/* LEFT COLUMN: Checkout Form (8 columns) */}
          <div className="lg:col-span-8">
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-ambient border border-outline-variant/5 p-md md:p-lg space-y-md text-left">
              
              {/* SECTION: Delivery Address Info */}
              <div>
                <h3 className="text-label-md font-extrabold text-on-surface uppercase tracking-wider mb-md border-b border-outline-variant/10 pb-xs">
                  Thông tin giao hàng
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-md">
                  {/* Fullname input field */}
                  <div className="flex flex-col gap-xs">
                    <label className="text-label-md font-bold text-on-surface uppercase tracking-wider flex items-center gap-1">
                      <User className="w-4 h-4 text-outline" /> HỌ TÊN <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Nguyễn Văn A"
                      value={fullname}
                      onChange={(e) => setFullname(e.target.value)}
                      className="bg-[#f8f9fa] border border-[#e5e7eb] rounded-md py-2.5 px-3 text-body-md text-on-surface placeholder-on-surface-variant/40 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-200"
                      required
                    />
                  </div>

                  {/* Phone input field */}
                  <div className="flex flex-col gap-xs">
                    <label className="text-label-md font-bold text-on-surface uppercase tracking-wider flex items-center gap-1">
                      <Phone className="w-4 h-4 text-outline" /> SĐT <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      placeholder="0912345678"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="bg-[#f8f9fa] border border-[#e5e7eb] rounded-md py-2.5 px-3 text-body-md text-on-surface placeholder-on-surface-variant/40 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-200"
                      required
                    />
                  </div>

                  {/* Address input field (Full width span) */}
                  <div className="sm:col-span-2 flex flex-col gap-xs">
                    <label className="text-label-md font-bold text-on-surface uppercase tracking-wider flex items-center gap-1">
                      <MapPin className="w-4 h-4 text-outline" /> ĐỊA CHỈ <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Số 10, ngõ 123 đường Xuân Thủy"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="bg-[#f8f9fa] border border-[#e5e7eb] rounded-md py-2.5 px-3 text-body-md text-on-surface placeholder-on-surface-variant/40 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-200"
                      required
                    />
                  </div>

                  {/* City Selection input field */}
                  <div className="sm:col-span-2 flex flex-col gap-xs">
                    <label className="text-label-md font-bold text-on-surface uppercase tracking-wider flex items-center gap-1">
                      <Building className="w-4 h-4 text-outline" /> TỈNH / THÀNH PHỐ
                    </label>
                    <input
                      type="text"
                      placeholder="Hà Nội (hoặc Tp. Hồ Chí Minh...)"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="bg-[#f8f9fa] border border-[#e5e7eb] rounded-md py-2.5 px-3 text-body-md text-on-surface placeholder-on-surface-variant/40 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-200"
                    />
                  </div>
                </div>
              </div>

              {/* SECTION: Payment Method choice */}
              <div className="pt-sm">
                <h3 className="text-label-md font-extrabold text-on-surface uppercase tracking-wider mb-md border-b border-outline-variant/10 pb-xs">
                  Phương thức thanh toán
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-sm">
                  {/* COD Payment Method */}
                  <label
                    className={`border rounded-xl p-md flex items-start gap-sm cursor-pointer transition-all duration-200 ${
                      paymentMethod === 'cod'
                        ? 'border-primary bg-primary/5 shadow-sm'
                        : 'border-[#e5e7eb] hover:bg-surface-container-low'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                      className="mt-1 text-primary focus:ring-primary cursor-pointer w-4 h-4"
                    />
                    <div className="-mt-0.5">
                      <span className="text-label-md font-bold text-on-surface block">COD</span>
                      <span className="text-[11px] text-on-surface-variant block mt-0.5">
                        Thanh toán bằng tiền mặt trực tiếp khi nhận hàng.
                      </span>
                    </div>
                  </label>

                  {/* Bank Transfer Payment Method */}
                  <label
                    className={`border rounded-xl p-md flex items-start gap-sm cursor-pointer transition-all duration-200 ${
                      paymentMethod === 'bank'
                        ? 'border-primary bg-primary/5 shadow-sm'
                        : 'border-[#e5e7eb] hover:bg-surface-container-low'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'bank'}
                      onChange={() => setPaymentMethod('bank')}
                      className="mt-1 text-primary focus:ring-primary cursor-pointer w-4 h-4"
                    />
                    <div className="-mt-0.5">
                      <span className="text-label-md font-bold text-on-surface block">Chuyển khoản Ngân hàng</span>
                      <span className="text-[11px] text-on-surface-variant block mt-0.5">
                        Thanh toán qua mã QR/tài khoản ngân hàng của WildStream.
                      </span>
                    </div>
                  </label>
                </div>
              </div>

              {/* Ocean Blue confirmation CTA button */}
              <div className="pt-md">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#00288e] hover:bg-[#1e40af] disabled:bg-primary/50 text-white text-label-md font-bold rounded-md py-3.5 px-md flex items-center justify-center gap-xs shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer focus-visible:outline-none"
                >
                  <span>{loading ? 'ĐANG XỬ LÝ...' : 'XÁC NHẬN ĐẶT HÀNG'}</span>
                  {!loading && <ArrowRight className="w-5 h-5" />}
                </button>
              </div>

            </form>
          </div>

          {/* RIGHT COLUMN: Order Summary Card (4 columns) */}
          <div className="lg:col-span-4 flex flex-col gap-sm sticky top-24">
            
            {/* White card layout summary */}
            <div className="bg-white rounded-2xl shadow-ambient border border-outline-variant/5 p-md text-left">
              <h3 className="text-label-md font-extrabold text-on-surface uppercase tracking-wider mb-sm pb-xs border-b border-outline-variant/10">
                Đơn hàng của bạn
              </h3>

              {/* Items summary */}
              <div className="space-y-sm py-xs border-b border-outline-variant/10 mb-sm">
                <div className="flex gap-xs items-center justify-between">
                  <div className="flex gap-xs items-center">
                    <div className="w-10 h-10 bg-surface-container rounded-md overflow-hidden flex-shrink-0">
                      <img src="/images/product-tent.png" alt="Lều Horizon" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <span className="text-label-sm font-bold text-on-surface block line-clamp-1">Lều Horizon 4 người</span>
                      <span className="text-[10px] text-on-surface-variant font-medium">SL: 1 | Green</span>
                    </div>
                  </div>
                  <span className="text-label-sm font-bold text-on-surface font-sans">3.450.000 ₫</span>
                </div>

                <div className="flex gap-xs items-center justify-between">
                  <div className="flex gap-xs items-center">
                    <div className="w-10 h-10 bg-surface-container rounded-md overflow-hidden flex-shrink-0">
                      <img src="/images/product-chair-terrain.png" alt="Ghế xếp gọn" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <span className="text-label-sm font-bold text-on-surface block line-clamp-1">Ghế dã ngoại Naturehike</span>
                      <span className="text-[10px] text-on-surface-variant font-medium">SL: 2 | Orange</span>
                    </div>
                  </div>
                  <span className="text-label-sm font-bold text-on-surface font-sans">1.500.000 ₫</span>
                </div>
              </div>

              {/* Calculation Summary details */}
              <div className="space-y-sm py-xs">
                <div className="flex justify-between text-label-sm text-on-surface-variant font-medium">
                  <span>Tạm tính</span>
                  <span className="font-sans font-bold text-on-surface">{formatPrice(subtotal)}</span>
                </div>

                <div className="flex justify-between text-label-sm text-on-surface-variant font-medium">
                  <span>Phí giao hàng</span>
                  <span className="font-sans font-bold text-secondary">Miễn phí</span>
                </div>

                <div className="flex justify-between items-end border-t border-outline-variant/10 pt-sm mt-xs">
                  <span className="text-label-md font-bold text-on-surface">Tổng cộng</span>
                  <span className="text-headline-md font-extrabold text-primary font-sans leading-none block">
                    {formatPrice(total)}
                  </span>
                </div>
              </div>

              {/* Security info */}
              <div className="flex items-center gap-xs mt-md pt-xs border-t border-outline-variant/10 text-outline text-[11px]">
                <ShieldCheck className="w-4.5 h-4.5 text-secondary flex-shrink-0" />
                <span>Thanh toán an toàn bảo mật tuyệt đối</span>
              </div>
            </div>

            {/* Support Box */}
            <div className="bg-surface-container-low border border-outline-variant/20 rounded-2xl p-md text-left flex items-start gap-xs">
              <Truck className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-label-sm font-bold text-on-surface">Vận chuyển nhanh chóng</h4>
                <p className="text-[11px] text-on-surface-variant leading-relaxed">
                  Đơn hàng của bạn sẽ được xử lý đóng gói và bàn giao cho đối tác vận chuyển trong 24 giờ.
                </p>
              </div>
            </div>

          </div>

        </div>

      </main>

      {/* Redesigned Footer complying with Ministry of Industry and Trade regulations */}
      <Footer />
    </div>
  );
}
