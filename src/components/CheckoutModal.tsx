import React, { useState } from 'react';
import { X, Truck, CreditCard, ChevronRight, CheckCircle, Smartphone } from 'lucide-react';
import { CartItem, ShippingDetails, PaymentDetails, Order } from '../types';
import { couriers, formatRupiah } from '../data';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onPlaceOrder: (order: Order) => void;
}

export default function CheckoutModal({
  isOpen,
  onClose,
  cartItems,
  onPlaceOrder
}: CheckoutModalProps) {
  if (!isOpen || cartItems.length === 0) return null;

  // Form states
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  
  // Courier selection
  const [selectedCourier, setSelectedCourier] = useState(couriers[0]);
  
  // Payment option
  const [paymentMethod, setPaymentMethod] = useState<'QRIS' | 'GoPay' | 'ShopeePay' | 'Transfer BCA' | 'Transfer Mandiri'>('QRIS');
  const [accountName, setAccountName] = useState('');

  // Form error verification
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const subtotal = cartItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  const shippingCost = selectedCourier.cost;
  const total = subtotal + shippingCost;

  const validateForm = () => {
    const tempErrors: { [key: string]: string } = {};
    if (!fullName.trim()) tempErrors.fullName = 'Nama lengkap wajib diisi';
    if (!phone.trim()) {
      tempErrors.phone = 'Nomor telepon wajib diisi';
    } else if (!/^[0-9+ ]{8,15}$/.test(phone.trim())) {
      tempErrors.phone = 'Nomor telepon tidak valid (8-15 digit)';
    }
    if (!address.trim()) tempErrors.address = 'Alamat pengiriman lengkap wajib diisi';
    if (!city.trim()) tempErrors.city = 'Kota/Kabupaten wajib diisi';
    if (!postalCode.trim()) {
      tempErrors.postalCode = 'Kode pos wajib diisi';
    } else if (!/^\d{5}$/.test(postalCode.trim())) {
      tempErrors.postalCode = 'Kode pos tidak valid (harus 5 digit)';
    }
    if (paymentMethod.startsWith('Transfer') || paymentMethod.startsWith('Go') || paymentMethod.startsWith('Shopee')) {
      if (!accountName.trim()) tempErrors.accountName = 'Nama pemilik rekening / akun e-wallet wajib diisi';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const shipping: ShippingDetails = {
      fullName,
      phone,
      address,
      city,
      postalCode,
      courier: selectedCourier.name,
      shippingCost
    };

    const payment: PaymentDetails = {
      method: paymentMethod,
      accountName: accountName || fullName, // Default to fullName if empty (e.g. QRIS auto)
      accountNumber: paymentMethod === 'Transfer BCA' ? '38209028111' : paymentMethod === 'Transfer Mandiri' ? '1320048209991' : undefined
    };

    const newOrder: Order = {
      id: 'MEKA-' + Math.floor(Math.random() * 900000 + 100000),
      date: new Date().toLocaleDateString('id-ID', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      items: [...cartItems],
      shipping,
      payment,
      subtotal,
      shippingCost,
      total,
      status: 'Menunggu Pembayaran'
    };

    onPlaceOrder(newOrder);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" id="checkout-modal-overlay">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        {/* Backdrop */}
        <div 
          onClick={onClose}
          className="fixed inset-0 bg-pink-950/40 backdrop-blur-xs transition-opacity" 
        />

        {/* Trick to center modal content */}
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <div className="inline-block align-bottom bg-white rounded-3xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full border border-pink-100 flex flex-col md:flex-row relative">
          
          {/* Close button */}
          <button
            id="btn-close-checkout"
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/90 text-gray-400 hover:text-pink-600 transition-colors border border-pink-50"
          >
            <X size={20} />
          </button>

          {/* Form and configs */}
          <form onSubmit={handleSubmit} className="w-full flex flex-col md:flex-row" id="checkout-form">
            
            {/* Left Col: Customer Shipping details */}
            <div className="w-full md:w-3/5 p-6 md:p-8 space-y-6 max-h-[85vh] overflow-y-auto no-scrollbar">
              <div>
                <h2 className="text-xl font-serif font-bold text-gray-800">Detail Pengiriman & Pembayaran</h2>
                <p className="text-xs text-gray-400">Silakan isi formulir di bawah ini dengan benar untuk memproses pengiriman produk hijab Anda.</p>
              </div>

              {/* Shipping info items */}
              <div className="space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-pink-500 mb-1">1. Alamat Pengiriman</h3>
                
                {/* Full name */}
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Nama Lengkap Penerima</label>
                  <input
                    type="text"
                    id="input-fullname"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Contoh: Meka Apriliani"
                    className={`w-full p-2.5 text-xs border rounded-xl outline-none focus:border-pink-500 ${errors.fullName ? 'border-rose-500 bg-rose-50/20' : 'border-gray-200 bg-gray-50/20'}`}
                  />
                  {errors.fullName && <p className="text-[10px] text-rose-500 mt-1">{errors.fullName}</p>}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Nomor WhatsApp Aktif</label>
                  <input
                    type="text"
                    id="input-phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Contoh: 081234567890"
                    className={`w-full p-2.5 text-xs border rounded-xl outline-none focus:border-pink-500 ${errors.phone ? 'border-rose-500 bg-rose-50/20' : 'border-gray-200 bg-gray-50/20'}`}
                  />
                  {errors.phone && <p className="text-[10px] text-rose-500 mt-1">{errors.phone}</p>}
                </div>

                {/* Street Address */}
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Alamat Rumah Lengkap (Jalan, RT/RW, Dusun, No. Rumah)</label>
                  <textarea
                    id="input-address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    rows={2}
                    placeholder="Contoh: Jl. Mawar Indah No. 11, RT 02/RW 04, Kelurahan Mekarsari"
                    className={`w-full p-2.5 text-xs border rounded-xl outline-none focus:border-pink-500 ${errors.address ? 'border-rose-500 bg-rose-50/20' : 'border-gray-200 bg-gray-50/20'}`}
                  />
                  {errors.address && <p className="text-[10px] text-rose-500 mt-1">{errors.address}</p>}
                </div>

                {/* City & Postal Code */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Kota atau Kabupaten</label>
                    <input
                      type="text"
                      id="input-city"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="Contoh: Bandung"
                      className={`w-full p-2.5 text-xs border rounded-xl outline-none focus:border-pink-500 ${errors.city ? 'border-rose-500 bg-rose-50/20' : 'border-gray-200 bg-gray-50/20'}`}
                    />
                    {errors.city && <p className="text-[10px] text-rose-500 mt-1">{errors.city}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Kode Pos</label>
                    <input
                      type="text"
                      id="input-postalcode"
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      placeholder="5 digit"
                      maxLength={5}
                      className={`w-full p-2.5 text-xs border rounded-xl outline-none focus:border-pink-500 ${errors.postalCode ? 'border-rose-500 bg-rose-50/20' : 'border-gray-200 bg-gray-50/20'}`}
                    />
                    {errors.postalCode && <p className="text-[10px] text-rose-500 mt-1">{errors.postalCode}</p>}
                  </div>
                </div>
              </div>

              {/* Kurir Ekspedisi */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-pink-500">2. Pilih Ekspedisi Pengiriman</h3>
                <div className="grid grid-cols-2 gap-2">
                  {couriers.map((cur) => (
                    <button
                      key={cur.name}
                      type="button"
                      id={`courier-option-${cur.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                      onClick={() => setSelectedCourier(cur)}
                      className={`p-3 text-left border rounded-2xl flex flex-col justify-between transition-all duration-200 ${
                        selectedCourier.name === cur.name
                          ? 'border-pink-500 bg-pink-50/30 ring-2 ring-pink-500/20'
                          : 'border-gray-200 hover:border-pink-200'
                      }`}
                    >
                      <div className="flex items-center justify-between w-full">
                        <span className="text-xs font-bold text-gray-800">{cur.name}</span>
                        <input
                          type="radio"
                          checked={selectedCourier.name === cur.name}
                          onChange={() => setSelectedCourier(cur)}
                          className="accent-pink-500 w-3 h-3"
                        />
                      </div>
                      <div className="flex items-center justify-between mt-2 text-[10px] text-gray-400">
                        <span>Estimasi: {cur.time}</span>
                        <strong className="text-pink-600 font-mono font-bold">{formatRupiah(cur.cost)}</strong>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Cara Pembayaran */}
              <div className="space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-pink-500">3. Pilih Metode Pembayaran</h3>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {(['QRIS', 'GoPay', 'ShopeePay', 'Transfer BCA', 'Transfer Mandiri'] as const).map((method) => (
                    <button
                      key={method}
                      type="button"
                      id={`payment-method-btn-${method.toLowerCase().replace(' ', '-')}`}
                      onClick={() => setPaymentMethod(method)}
                      className={`p-2.5 text-center border rounded-xl flex flex-col items-center justify-center gap-1.5 transition-all duration-200 text-xs font-bold ${
                        paymentMethod === method
                          ? 'border-pink-500 bg-pink-500 text-white shadow-md shadow-pink-100'
                          : 'border-gray-200 text-gray-600 hover:bg-pink-50/30 hover:border-pink-200'
                      }`}
                    >
                      {method.includes('Transfer') ? <CreditCard size={14} /> : <Smartphone size={14} />}
                      <span className="text-[11px] truncate">{method}</span>
                    </button>
                  ))}
                </div>

                {/* Wallet / Bank Acc Owner block */}
                {paymentMethod !== 'QRIS' && (
                  <div className="bg-pink-50/30 p-3 rounded-2xl border border-pink-100/50">
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Nama Pemilik Rekening / Akun E-Wallet Pengirim
                    </label>
                    <input
                      type="text"
                      id="input-accountname"
                      value={accountName}
                      onChange={(e) => setAccountName(e.target.value)}
                      placeholder="Contoh: Meka Apriliani"
                      className={`w-full p-2.5 text-xs bg-white border rounded-xl outline-none focus:border-pink-500 ${errors.accountName ? 'border-rose-500 bg-rose-50' : 'border-gray-200'}`}
                    />
                    {errors.accountName && <p className="text-[10px] text-rose-500 mt-1">{errors.accountName}</p>}
                    <p className="text-[10px] text-gray-400 mt-1.5">
                      ⚠️ Digunakan untuk validasi verifikasi pembayaran otomatis oleh sistem kami.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Right Col: Summary Checkout Card */}
            <div className="w-full md:w-2/5 p-6 md:p-8 bg-pink-50/35 border-t md:border-t-0 md:border-l border-pink-100 flex flex-col justify-between">
              <div>
                <h3 className="text-base font-serif font-bold text-gray-800 mb-4 pb-2 border-b border-pink-100/60">
                  Ringkasan Belanja Anda
                </h3>

                {/* Items preview list */}
                <div className="space-y-3 max-h-56 overflow-y-auto no-scrollbar mb-4">
                  {cartItems.map((item, index) => (
                    <div 
                      key={`${item.product.id}-${index}`}
                      className="flex items-center gap-2 text-xs"
                    >
                      <span className="w-5 h-5 bg-pink-100 text-pink-600 rounded-full flex items-center justify-center font-bold text-[10px] shrink-0">
                        {item.quantity}x
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-700 truncate">{item.product.name}</p>
                        <p className="text-[10px] text-pink-400">Warna: {item.selectedColor.name}</p>
                      </div>
                      <span className="text-gray-500 font-mono text-[11px]">
                        {formatRupiah(item.product.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Divider */}
                <div className="pt-4 border-t border-dashed border-pink-200 space-y-2">
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>Subtotal Produk ({cartItems.reduce((acc, item) => acc + item.quantity, 0)} pcs)</span>
                    <span className="font-mono">{formatRupiah(subtotal)}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>Biaya Ongkos Kirim ({selectedCourier.name})</span>
                    <span className="font-mono">{formatRupiah(shippingCost)}</span>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-pink-200 flex items-center justify-between">
                  <span className="text-sm font-serif font-bold text-gray-800">Total Pembayaran</span>
                  <span className="text-xl font-bold font-mono text-pink-600 animate-pulse">
                    {formatRupiah(total)}
                  </span>
                </div>

                <div className="mt-4 p-3 bg-pink-100/30 rounded-xl space-y-2 text-[11px] text-pink-600 border border-pink-100/50">
                  <p className="font-bold flex items-center gap-1 text-[12px]">
                    <CheckCircle size={12} />
                    <span>Garansi Meka Hijab Store</span>
                  </p>
                  <p className="leading-relaxed">
                    Pengiriman dilapisi bubble-wrap dan plastik tahan air gratis agar hijab Anda selamat seutuhnya sampai ke alamat tujuan.
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-pink-100/60">
                <button
                  type="submit"
                  id="btn-place-order"
                  className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold text-sm shadow-md shadow-pink-100 hover:shadow-lg hover:shadow-pink-200 transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <CheckCircle size={18} />
                  <span>Proses Pemesanan Sekarang!</span>
                </button>
                <p className="text-[10px] text-gray-400 text-center mt-2.5">
                  Dengan mengklik tombol, Anda menyetujui syarat pengemasan & pengiriman dari Meka Hijab Store.
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
