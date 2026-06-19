import React, { useState } from 'react';
import { X, Copy, Check, CheckCircle, Clock, Send, HelpCircle, ArrowLeft } from 'lucide-react';
import { Order } from '../types';
import { formatRupiah } from '../data';

interface InvoiceDetailProps {
  order: Order | null;
  onClose: () => void;
  onSimulatePaymentSuccess: (orderId: string) => void;
}

export default function InvoiceDetail({
  order,
  onClose,
  onSimulatePaymentSuccess
}: InvoiceDetailProps) {
  const [copied, setCopied] = useState(false);
  const [successPaid, setSuccessPaid] = useState(false);

  if (!order) return null;

  const handleCopyText = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSimulatePayment = () => {
    onSimulatePaymentSuccess(order.id);
    setSuccessPaid(true);
  };

  // Pre-formatted message for WhatsApp Order confirmation (standard custom flow in Indonesia)
  const getWhatsAppMessage = () => {
    const listItems = order.items
      .map((it) => `- ${it.product.name} (${it.selectedColor.name}) x${it.quantity}`)
      .join('%0A');

    return `Halo Admin Meka Hijab Store, Saya ingin konfirmasi pembayaran untuk pesanan berikut:%0A%0A*ID PESANAN:* ${order.id}%0A*Nama:* ${order.shipping.fullName}%0A*Telepon:* ${order.shipping.phone}%0A*Alamat:* ${order.shipping.address}, ${order.shipping.city}%0A%0A*Produk:*%0A${listItems}%0A%0A*Kurir:* ${order.shipping.courier}%0A*Metode Pembayaran:* ${order.payment.method}%0A%0A*TOTAL TRANSFER:* *${formatRupiah(order.total)}*%0A%0AApakah sudah terverifikasi? Terima kasih! 🌸`;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" id="invoice-detail-overlay">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        {/* Backdrop overlay */}
        <div 
          onClick={onClose}
          className="fixed inset-0 bg-pink-950/40 backdrop-blur-xs transition-opacity" 
        />

        {/* Trick to center modal content */}
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <div className="inline-block align-bottom bg-white rounded-3xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-xl sm:w-full border border-pink-100 relative">
          
          {/* Header */}
          <div className="bg-pink-600 text-white p-5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-bold">✓</span>
              <div>
                <h2 className="text-base font-serif font-bold">Invoice Pemesanan Hijab</h2>
                <span className="text-[10px] uppercase font-mono tracking-wider opacity-90">{order.id}</span>
              </div>
            </div>
            <button
              id="invoice-close-btn"
              onClick={onClose}
              className="p-1 rounded-full hover:bg-white/10 text-white transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <div className="p-6 md:p-8 space-y-6 max-h-[80vh] overflow-y-auto no-scrollbar">
            {/* Status box alert */}
            <div className={`p-4 rounded-2xl flex items-start gap-3 border ${
              order.status === 'Menunggu Pembayaran' 
                ? 'bg-amber-50 border-amber-100 text-amber-800' 
                : 'bg-emerald-50 border-emerald-100 text-emerald-800'
            }`}>
              {order.status === 'Menunggu Pembayaran' ? (
                <Clock className="text-amber-500 shrink-0 mt-0.5" size={20} />
              ) : (
                <CheckCircle className="text-emerald-500 shrink-0 mt-0.5" size={20} />
              )}
              <div className="text-xs">
                <p className="font-bold text-sm">Status Pesanan: {order.status}</p>
                <p className="mt-1 leading-normal">
                  {order.status === 'Menunggu Pembayaran' 
                    ? 'Silakan selesaikan pembayaran Anda di bawah agar Admin Meka Store bisa langsung mengirimkan paket hijab cantik ke rumah Anda.'
                    : 'Terima kasih banyak! Pembayaran untuk pesanan ini telah berhasil disimulasi. Kami akan memproses pengiriman dalam waktu 1x24 jam.'}
                </p>
              </div>
            </div>

            {/* Price section instructions */}
            <div className="text-center py-4 bg-pink-50/20 rounded-2xl border border-pink-100/50 space-y-1">
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest block">Total Tagihan</span>
              <span className="text-3xl font-bold font-mono text-pink-600 block">{formatRupiah(order.total)}</span>
              <span className="text-[10px] text-pink-400 font-mono block">Pembuatan Pesanan: {order.date}</span>
            </div>

            {/* Custom Interactive Payment Steps */}
            {order.status === 'Menunggu Pembayaran' && (
              <div className="space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500">Petunjuk Pembayaran ({order.payment.method})</h3>

                {order.payment.method === 'QRIS' ? (
                  <div className="flex flex-col items-center justify-center p-4 bg-white border border-pink-100 rounded-3xl space-y-3 shadow-xs">
                    <span className="text-[10px] font-bold text-red-500 uppercase tracking-widest">QRIS STANDAR NASIONAL</span>
                    
                    {/* Mock QRIS Code graphic container */}
                    <div className="w-48 h-48 bg-gray-50 border-2 border-gray-100 p-2 rounded-2xl relative flex flex-col justify-between items-center overflow-hidden">
                      {/* Stylized QR dots design inside */}
                      <div className="w-full h-full grid grid-cols-6 gap-2">
                        {Array.from({ length: 36 }).map((_, i) => {
                          const isCorner = i === 0 || i === 1 || i === 6 || i === 7 || i === 4 || i === 5 || i === 10 || i === 11 || i === 24 || i === 25 || i === 30 || i === 31;
                          return (
                            <div 
                              key={i} 
                              className={`rounded-xs ${isCorner ? 'bg-black' : (i * 7 + 13) % 4 === 0 ? 'bg-gray-800' : 'bg-transparent'}`} 
                            />
                          );
                        })}
                      </div>

                      {/* Floating overlay brand logo in center */}
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-1.5 rounded-xl border-2 border-pink-100">
                        <span className="text-[10px] font-bold text-pink-600 font-serif">Meka</span>
                      </div>
                    </div>

                    <div className="text-center">
                      <p className="text-xs font-bold text-gray-700">Scan QR Code Diatas</p>
                      <p className="text-[10px] text-gray-400 mt-1 max-w-[280px]">Bisa discan melalui GoPay, ShopeePay, OVO, Dana, LinkAja, BCA Mobile, Livin Mandiri, atau aplikasi e-wallet digital lainnya.</p>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 bg-pink-50/20 rounded-2xl border border-pink-100/50 space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-gray-400 font-semibold block">Jenis Rekening Tujuan</span>
                        <strong className="text-sm text-gray-800">{order.payment.method}</strong>
                      </div>
                      <span className="px-2.5 py-1 text-[10px] font-bold bg-pink-100 text-pink-700 rounded-lg">Meka Store</span>
                    </div>

                    <div className="flex items-center justify-between p-3.5 bg-white border border-pink-100 rounded-xl relative">
                      <div>
                        <span className="text-[9px] text-gray-400 block uppercase tracking-wider font-semibold">Nomor Rekening Vault</span>
                        <span className="text-base font-serif font-bold text-pink-700 tracking-wide font-mono">
                          {order.payment.accountNumber || '081234567890'}
                        </span>
                      </div>
                      <button
                        type="button"
                        id="btn-copy-account"
                        onClick={() => handleCopyText(order.payment.accountNumber || '081234567890')}
                        className="p-2 text-pink-500 hover:bg-pink-50/80 rounded-lg border border-pink-100"
                        title="Salin Nomor"
                      >
                        {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                      </button>
                    </div>

                    <div className="text-[11px] text-gray-500 space-y-1 leading-relaxed">
                      <p>• Masukkan nominal transfer tepat: <strong className="text-gray-800 font-mono">{formatRupiah(order.total)}</strong></p>
                      <p>• Atas nama pemilik rekening: <strong className="text-gray-850">Meka Hijab Store</strong></p>
                    </div>
                  </div>
                )}

                {/* Instant verification simulator */}
                <div className="p-4 rounded-3xl bg-pink-50/40 border border-pink-150 space-y-3 text-center">
                  <p className="text-xs text-pink-800 font-bold">⚡ Ingin Mencoba Simulasi Transaksi Instan?</p>
                  <p className="text-[10px] text-gray-500">Klik tombol di bawah ini untuk mensimulasikan sistem perbankan menerima dana transfer Anda secara langsung!</p>
                  <button
                    type="button"
                    id="btn-simulate-pay-success"
                    onClick={handleSimulatePayment}
                    className="w-full py-2 px-4 rounded-xl bg-pink-500 hover:bg-pink-600 text-white font-bold text-xs shadow-sm transition-all duration-150 flex items-center justify-center gap-1.5"
                  >
                    <CheckCircle size={14} />
                    <span>Konfirmasi Simulasi Pembayaran Berhasil</span>
                  </button>
                </div>
              </div>
            )}

            {/* Shipping & Delivery details summaries */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500">Informasi Penerima</h3>
              <div className="p-4 bg-gray-50 rounded-2xl text-xs space-y-2 text-gray-650">
                <div className="flex justify-between">
                  <span className="text-gray-400">Nama Penerima:</span>
                  <span className="font-bold text-gray-800">{order.shipping.fullName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Nomor Telepon WA:</span>
                  <span className="font-mono">{order.shipping.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Metode Pengiriman:</span>
                  <span>{order.shipping.courier}</span>
                </div>
                <div className="flex justify-between border-t border-gray-200/50 pt-2 flex-col">
                  <span className="text-gray-400 block mb-0.5">Alamat Tujuan Lengkap:</span>
                  <span className="font-medium text-gray-800 leading-normal bg-white p-2 rounded-lg border border-gray-200/30">
                    {order.shipping.address}, {order.shipping.city}, {order.shipping.postalCode}
                  </span>
                </div>
              </div>
            </div>

            {/* Selected items receipt list */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500">Daftar Hijab Dibeli</h3>
              <div className="divide-y divide-gray-100">
                {order.items.map((item, index) => (
                  <div key={index} className="py-2.5 flex items-center justify-between text-xs">
                    <div className="max-w-[70%]">
                      <p className="font-semibold text-gray-850 truncate">{item.product.name}</p>
                      <p className="text-[10px] text-pink-500 font-medium">Warna: {item.selectedColor.name} | qty: {item.quantity}</p>
                    </div>
                    <span className="font-mono text-gray-600 shrink-0">
                      {formatRupiah(item.product.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer containing WhatsApp confirmation and Close buttons */}
          <div className="p-6 border-t border-pink-50 bg-pink-50/20 flex flex-col sm:flex-row gap-2">
            <a
              id="whatsapp-confirm-link"
              href={`https://api.whatsapp.com/send?phone=6282298642131&text=${getWhatsAppMessage()}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-3 px-5 rounded-2xl bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-bold text-center text-xs shadow-md shadow-emerald-100 flex items-center justify-center gap-2 transition-all"
            >
              <Send size={14} />
              <span>Kirim Konfirmasi Ke WA Admin Meka</span>
            </a>

            <button
              id="invoice-footer-close"
              onClick={onClose}
              className="py-3 px-5 rounded-2xl bg-white border border-pink-200 text-pink-600 hover:bg-pink-50 text-xs font-bold transition-all"
            >
              Kembali Belanja
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
