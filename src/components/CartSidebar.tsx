import React from 'react';
import { X, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { CartItem } from '../types';
import { formatRupiah } from '../data';
import { HijabIcon } from './ProductCard';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (index: number, quantity: number) => void;
  onRemoveItem: (index: number) => void;
  onCheckout: () => void;
}

export default function CartSidebar({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout
}: CartSidebarProps) {
  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" id="cart-sidebar-wrapper">
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
                <ShoppingBag className="text-pink-600" size={22} />
                <h2 className="text-lg font-serif font-bold text-gray-800">Keranjang Belanja</h2>
                <span className="text-xs bg-pink-100 text-pink-700 px-2 py-0.5 rounded-full font-bold">
                  {cartItems.length}
                </span>
              </div>
              <button
                id="btn-close-cart"
                onClick={onClose}
                className="p-1 px-2.5 rounded-full hover:bg-pink-50 text-gray-400 hover:text-pink-600 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Item list */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 no-scrollbar">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-4">
                  <div className="w-20 h-20 bg-pink-50 rounded-full flex items-center justify-center text-pink-300">
                    <ShoppingBag size={40} />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-gray-700 text-base mb-1">
                      Keranjangmu Masih Kosong
                    </h3>
                    <p className="text-xs text-gray-400 max-w-[240px] leading-relaxed mx-auto">
                      Silakan pilih hijab cantik impianmu dan masukkan pilihan warna favoritmu di sini.
                    </p>
                  </div>
                  <button
                    onClick={onClose}
                    className="py-2.5 px-6 rounded-full bg-pink-100 text-pink-700 font-bold text-xs hover:bg-pink-200 transition-colors"
                  >
                    Mulai Belanja Hijab
                  </button>
                </div>
              ) : (
                cartItems.map((item, index) => (
                  <div
                    key={`${item.product.id}-${item.selectedColor.name}-${index}`}
                    className="flex gap-4 p-3 border border-pink-50/80 rounded-2xl bg-pink-50/10 hover:bg-pink-50/20 transition-colors relative"
                  >
                    {/* SVG graphic preview */}
                    <div className={`w-20 h-20 rounded-xl ${item.product.image} flex items-center justify-center shrink-0 p-1 overflow-hidden`}>
                      <div className="w-16 h-16">
                        <HijabIcon color={item.selectedColor.hex} />
                      </div>
                    </div>

                    {/* Metadata fields */}
                    <div className="flex-1 flex flex-col justify-between min-w-0">
                      <div>
                        {/* Name */}
                        <h4 className="font-semibold text-gray-800 text-sm truncate pr-6">
                          {item.product.name}
                        </h4>

                        {/* Color & Size info */}
                        <div className="flex flex-wrap gap-x-2 text-[11px] text-gray-400 mt-0.5">
                          <span>Warna: <strong className="text-pink-600 font-semibold">{item.selectedColor.name}</strong></span>
                          <span>•</span>
                          <span>Ukuran: {item.product.size}</span>
                        </div>
                      </div>

                      {/* Quantity Modifier & Subprice */}
                      <div className="flex items-center justify-between gap-2 mt-2">
                        <div className="flex items-center border border-pink-200 rounded-lg overflow-hidden bg-white">
                          <button
                            onClick={() => onUpdateQuantity(index, item.quantity - 1)}
                            className="p-1 w-6 text-pink-600 font-bold text-center hover:bg-pink-50 border-r border-pink-100 text-xs transition-colors"
                            disabled={item.quantity <= 1}
                          >
                            -
                          </button>
                          <span className="px-2 font-bold text-gray-700 text-xs text-center w-7">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(index, item.quantity + 1)}
                            className="p-1 w-6 text-pink-600 font-bold text-center hover:bg-pink-50 border-l border-pink-100 text-xs transition-colors"
                            disabled={item.quantity >= item.product.stock}
                          >
                            +
                          </button>
                        </div>

                        {/* Subtotal Item cost */}
                        <span className="font-bold font-mono text-xs text-pink-600">
                          {formatRupiah(item.product.price * item.quantity)}
                        </span>
                      </div>
                    </div>

                    {/* Delete block */}
                    <button
                      id={`btn-cart-remove-${index}`}
                      onClick={() => onRemoveItem(index)}
                      className="absolute top-2 right-2 text-gray-300 hover:text-rose-500 transition-colors p-1"
                      title="Hapus item"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Footer Summary & Action triggers */}
            {cartItems.length > 0 && (
              <div className="p-6 border-t border-pink-100 bg-pink-50/30 space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500 font-medium">Subtotal Produk</span>
                  <span className="font-bold text-lg font-mono text-pink-700">
                    {formatRupiah(subtotal)}
                  </span>
                </div>
                
                <p className="text-[10px] text-pink-500 text-center leading-normal">
                  💡 Pajak sudah termasuk. Biaya pengiriman JNE/J&T/Sicepat akan dihitung otomatis saat Anda mengisi data alamat checkout.
                </p>

                <button
                  id="btn-sidebar-checkout"
                  onClick={onCheckout}
                  className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold text-sm shadow-md shadow-pink-100 hover:shadow-lg hover:shadow-pink-200 transition-all duration-200 flex items-center justify-center gap-2 group"
                >
                  <span>Lanjutkan ke Alamat Checkout</span>
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
