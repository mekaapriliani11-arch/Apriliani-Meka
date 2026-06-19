import React from 'react';
import { ShoppingCart, Search, Heart, Sparkles, Receipt } from 'lucide-react';
import { Category } from '../types';

interface HeaderProps {
  searchTerm: string;
  setSearchTerm: (val: string) => void;
  selectedCategory: Category;
  setSelectedCategory: (cat: Category) => void;
  cartCount: number;
  openCart: () => void;
  openOrders: () => void;
  favoritesCount: number;
  openFavorites: () => void;
}

const categories: Category[] = ['Semua', 'Pashmina', 'Voal', 'Segi Empat', 'Instan', 'Premium'];

export default function Header({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  cartCount,
  openCart,
  openOrders,
  favoritesCount,
  openFavorites
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-pink-100 shadow-xs" id="meka-main-header">
      {/* Top Welcome Bar */}
      <div className="bg-pink-600 text-white text-xs py-1.5 px-4 text-center font-medium tracking-wide flex items-center justify-center gap-1.5" id="meka-topbar">
        <Sparkles size={12} className="animate-pulse" />
        <span>Promo Spesial Ramadhan & Idul Adha: Gratis Ongkir Seluruh Indonesia Raya! 🌸</span>
        <Sparkles size={12} className="animate-pulse" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Logo Brand */}
          <div className="flex items-center gap-2 cursor-pointer group" onClick={() => { setSelectedCategory('Semua'); setSearchTerm(''); }} id="meka-logo-container">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-rose-400 via-pink-400 to-amber-200 flex items-center justify-center shadow-md shadow-pink-100 group-hover:scale-105 transition-transform duration-300">
              <span className="text-white font-serif text-xl font-bold">M</span>
            </div>
            <div>
              <h1 className="text-2xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-rose-500 tracking-wide">
                Meka Hijab Store
              </h1>
              <p className="text-[10px] text-pink-400 font-mono tracking-widest uppercase">
                Keanggunan & Kesederhanaan
              </p>
            </div>
          </div>

          {/* Search Box */}
          <div className="relative w-full max-w-md" id="meka-search-wrapper">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-pink-400">
              <Search size={18} />
            </span>
            <input
              type="text"
              id="meka-search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Cari hijab impianmu... (pashmina, voal, dll)"
              className="w-full pl-10 pr-4 py-2 border-2 border-pink-100 focus:border-pink-400 rounded-full bg-pink-50/20 text-sm outline-none transition-colors duration-200 placeholder-pink-300 text-pink-700"
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')} 
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-pink-400 hover:text-pink-600 font-bold"
              >
                Hapus
              </button>
            )}
          </div>

          {/* User Actions */}
          <div className="flex items-center gap-3" id="meka-actions-wrapper">
            {/* Wishlist Button */}
            <button
              id="btn-favorites-toggle"
              onClick={openFavorites}
              className="relative p-2.5 rounded-full text-pink-500 hover:bg-pink-50 transition-colors duration-200"
              title="Favorit Saya"
            >
              <Heart size={22} className={favoritesCount > 0 ? "fill-pink-500" : ""} />
              {favoritesCount > 0 && (
                <span className="absolute top-1 right-1 w-5 h-5 bg-pink-500 border-2 border-white rounded-full text-[10px] font-bold text-white flex items-center justify-center animate-bounce">
                  {favoritesCount}
                </span>
              )}
            </button>

            {/* Invoices/History Button */}
            <button
              id="btn-history-toggle"
              onClick={openOrders}
              className="p-2.5 rounded-full text-pink-600 hover:bg-pink-50 border border-pink-100 transition-colors duration-200 flex items-center gap-1.5"
              title="Riwayat Pesanan Anda"
            >
              <Receipt size={20} />
              <span className="text-xs font-semibold hidden sm:inline">Pesanan Saya</span>
            </button>

            {/* Cart Button */}
            <button
              id="btn-cart-toggle"
              onClick={openCart}
              className="relative py-2 px-4 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-medium shadow-md shadow-pink-100 hover:shadow-lg hover:shadow-pink-200 transition-all duration-200 flex items-center gap-2"
            >
              <ShoppingCart size={18} />
              <span className="text-sm font-semibold">{cartCount}</span>
            </button>
          </div>
        </div>

        {/* Categories Bar */}
        <div className="mt-6 flex gap-2 overflow-x-auto pb-1 no-scrollbar scroll-smooth" id="meka-categories-bar">
          {categories.map((category) => (
            <button
              key={category}
              id={`category-btn-${category.toLowerCase().replace(' ', '-')}`}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-1.5 text-xs font-medium rounded-full shrink-0 transition-all duration-200 ${
                selectedCategory === category
                  ? 'bg-pink-500 text-white shadow-sm shadow-pink-200'
                  : 'bg-pink-50/60 text-pink-600 hover:bg-pink-50 border border-pink-100/50'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}
