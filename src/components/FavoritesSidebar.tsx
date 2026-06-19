import React from 'react';
import { X, Heart, ShoppingBag, ShoppingCart } from 'lucide-react';
import { Product, ProductColor } from '../types';
import { formatRupiah } from '../data';
import { HijabIcon } from './ProductCard';

interface FavoritesSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  favorites: Product[];
  onRemoveFavorite: (id: string) => void;
  onAddToCartDirectly: (product: Product, color: ProductColor) => void;
  onViewDetails: (product: Product) => void;
}

export default function FavoritesSidebar({
  isOpen,
  onClose,
  favorites,
  onRemoveFavorite,
  onAddToCartDirectly,
  onViewDetails
}: FavoritesSidebarProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" id="favorites-sidebar-overlay">
      <div className="absolute inset-0 overflow-hidden">
        {/* Backdrop */}
        <div 
          onClick={onClose}
          className="absolute inset-0 bg-pink-950/40 backdrop-blur-xs transition-opacity" 
        />

        <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
          <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between border-l border-pink-100">
            {/* Header */}
            <div className="p-6 border-b border-pink-50 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Heart className="text-pink-500 fill-pink-500 animate-pulse" size={22} />
                <h2 className="text-lg font-serif font-bold text-gray-800">Hijab Favorit Saya</h2>
                <span className="text-xs bg-pink-100 text-pink-700 px-2.5 py-0.5 rounded-full font-bold">
                  {favorites.length}
                </span>
              </div>
              <button
                id="btn-close-favorites"
                onClick={onClose}
                className="p-1 px-2.5 rounded-full hover:bg-pink-50 text-gray-400 hover:text-pink-600 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content list */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 no-scrollbar">
              {favorites.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-4">
                  <div className="w-16 h-16 bg-pink-50 rounded-full flex items-center justify-center text-pink-300">
                    <Heart size={32} />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-gray-700 text-base mb-1">
                      Belum Ada Hijab Favorit
                    </h3>
                    <p className="text-xs text-gray-400 max-w-[240px] leading-relaxed mx-auto">
                      Ketuk ikon hati pada gambar produk hijab dambaan Anda agar tersimpan rapi di halaman ini.
                    </p>
                  </div>
                  <button
                    onClick={onClose}
                    className="py-2.5 px-6 rounded-full bg-pink-100 text-pink-700 font-bold text-xs hover:bg-pink-200 transition-colors"
                  >
                    Jelajahi Produk Hijab
                  </button>
                </div>
              ) : (
                favorites.map((product) => (
                  <div
                    key={product.id}
                    className="flex gap-4 p-3 border border-pink-50 rounded-2xl bg-white hover:border-pink-200 transition-all cursor-pointer relative"
                    onClick={() => onViewDetails(product)}
                  >
                    {/* SVG preview */}
                    <div className={`w-16 h-16 rounded-xl ${product.image} flex items-center justify-center shrink-0 p-1 overflow-hidden`}>
                      <div className="w-12 h-12">
                        <HijabIcon color={product.colors[0].hex} />
                      </div>
                    </div>

                    <div className="flex-1 min-w-0 pr-6">
                      <p className="text-[10px] text-pink-400 uppercase tracking-wider font-semibold">{product.category}</p>
                      <h4 className="font-bold text-gray-800 text-sm truncate">{product.name}</h4>
                      <p className="font-bold font-mono text-xs text-pink-600 mt-1">{formatRupiah(product.price)}</p>
                    </div>

                    {/* Trash remove heart button */}
                    <button
                      id={`btn-remove-fav-${product.id}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        onRemoveFavorite(product.id);
                      }}
                      className="absolute top-2.5 right-2.5 text-pink-400 hover:text-rose-600 p-1"
                      title="Hapus dari Favorit"
                    >
                      <X size={16} />
                    </button>

                    {/* Instant add action */}
                    <button
                      id={`btn-fav-add-to-cart-${product.id}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddToCartDirectly(product, product.colors[0]);
                        onRemoveFavorite(product.id);
                      }}
                      className="absolute bottom-2.5 right-2.5 bg-pink-50 text-pink-600 border border-pink-100 hover:bg-pink-500 hover:text-white hover:border-pink-500 rounded-lg p-1.5 transition-colors"
                      title="Masukkan ke keranjang"
                    >
                      <ShoppingCart size={14} />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Close footer button */}
            <div className="p-6 border-t border-pink-50 bg-pink-50/25">
              <button
                onClick={onClose}
                className="w-full py-3 px-6 rounded-2xl bg-pink-600 hover:bg-pink-700 text-white font-bold text-xs"
              >
                Kembali Jelajah Katalog
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
