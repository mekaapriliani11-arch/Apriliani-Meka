import React from 'react';
import { X, SearchCode, Eye, CheckCircle2, AlertTriangle, Truck, ShoppingBag, Receipt } from 'lucide-react';
import { Order } from '../types';
import { formatRupiah } from '../data';

interface OrderHistoryProps {
  isOpen: boolean;
  onClose: () => void;
  orders: Order[];
  onSelectOrder: (order: Order) => void;
}

export default function OrderHistory({
  isOpen,
  onClose,
  orders,
  onSelectOrder
}: OrderHistoryProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" id="order-history-overlay">
      <div className="absolute inset-0 overflow-hidden">
        {/* Backdrop overlay */}
        <div 
          onClick={onClose}
          className="absolute inset-0 bg-pink-950/40 backdrop-blur-xs transition-opacity" 
        />

        <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
          {/* Drawer content */}
          <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between border-l border-pink-100">
            
            {/* Header */}
            <div className="p-6 border-b border-pink-50 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Receipt className="text-pink-600" size={22} />
                <h2 className="text-lg font-serif font-bold text-gray-800">Riwayat Pesanan Saya</h2>
              </div>
              <button
                id="btn-close-history"
                onClick={onClose}
                className="p-1 px-2.5 rounded-full hover:bg-pink-50 text-gray-400 hover:text-pink-600 transition-colors"
                title="Tutup Panel"
              >
                <X size={20} />
              </button>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 no-scrollbar">
              {orders.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-4">
                  <div className="w-20 h-20 bg-pink-50 rounded-full flex items-center justify-center text-pink-300">
                    <Receipt size={40} />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-gray-700 text-base mb-1">
                      Belum Ada Pesanan
                    </h3>
                    <p className="text-xs text-gray-400 max-w-[240px] leading-relaxed mx-auto">
                      Semua transaksi pembelian hijab Anda di Meka Hijab Store akan tercatat secara rapi di sini.
                    </p>
                  </div>
                  <button
                    onClick={onClose}
                    className="py-2.5 px-6 rounded-full bg-pink-100 text-pink-700 font-bold text-xs hover:bg-pink-200 transition-colors"
                  >
                    Cari Hijab Sekarang
                  </button>
                </div>
              ) : (
                <div className="space-y-3.5">
                  <p className="text-[11px] text-pink-600 font-medium">
                    Ditemukan {orders.length} Pemesanan Aktif. Silakan klik pesanan untuk melihat detail tagihan / barcode QRIS.
                  </p>
                  
                  {orders.map((ord) => (
                    <div
                      key={ord.id}
                      onClick={() => onSelectOrder(ord)}
                      className="border border-pink-100 hover:border-pink-300 p-4 rounded-2xl bg-white hover:bg-pink-50/10 cursor-pointer shadow-xs hover:shadow-md transition-all duration-200 space-y-2.5 relative"
                      id={`order-history-row-${ord.id}`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="text-[10px] text-gray-400 font-semibold block uppercase tracking-wider">
                            ID PESANAN
                          </span>
                          <strong className="text-sm font-bold font-mono text-pink-700">{ord.id}</strong>
                        </div>
                        
                        {/* Interactive Status Badges with matching styling */}
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          ord.status === 'Menunggu Pembayaran'
                            ? 'bg-amber-100 text-amber-800 border border-amber-200/50'
                            : ord.status === 'Diproses'
                            ? 'bg-sky-100 text-sky-800 border border-sky-200/50'
                            : ord.status === 'Dikirim'
                            ? 'bg-indigo-100 text-indigo-800 border border-indigo-200/50'
                            : 'bg-emerald-100 text-emerald-800 border border-emerald-200/50'
                        }`}>
                          {ord.status}
                        </span>
                      </div>

                      {/* Items and Date */}
                      <div className="text-xs text-gray-500 leading-normal">
                        <p className="font-semibold text-gray-700">
                          {ord.items[0]?.product.name || 'Produk Meka'} {ord.items.length > 1 ? `& ${ord.items.length - 1} produk lainnya` : ''}
                        </p>
                        <p className="text-[10px] text-gray-400 mt-1">Metode: {ord.payment.method} • Kurir: {ord.shipping.courier}</p>
                        <p className="text-[10px] text-gray-400">Tanggal: {ord.date.split(',')[0]} / {ord.date.split(',')[1] || ''}</p>
                      </div>

                      {/* Cash value & View details prompt */}
                      <div className="flex items-center justify-between border-t border-pink-50 pt-3">
                        <div>
                          <span className="text-[9px] text-gray-400 block font-medium">TOTAL TRANSFER</span>
                          <span className="font-bold text-pink-600 font-mono text-sm">{formatRupiah(ord.total)}</span>
                        </div>

                        <span className="text-[11px] font-bold text-pink-500 hover:text-pink-700 flex items-center gap-1">
                          <span>Lihat Invoice</span>
                          <Eye size={12} />
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-pink-50 bg-pink-50/25">
              <button
                onClick={onClose}
                className="w-full py-3 px-6 rounded-2xl bg-pink-600 hover:bg-pink-700 text-white font-bold text-xs shadow-sm transition-all text-center"
              >
                Tutup Catatan Pesanan
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
