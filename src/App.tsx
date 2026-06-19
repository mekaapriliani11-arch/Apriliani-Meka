/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Sparkles, ShieldCheck, Truck, ThumbsUp, Heart, Gift, ShoppingCart, MessageSquare, ArrowRight, Instagram, Info, ChevronRight, Check } from 'lucide-react';
import { products, formatRupiah } from './data';
import { Product, CartItem, Order, Category, ProductColor } from './types';
import Header from './components/Header';
import ProductCard from './components/ProductCard';
import ProductDetailModal from './components/ProductDetailModal';
import CartSidebar from './components/CartSidebar';
import FavoritesSidebar from './components/FavoritesSidebar';
import CheckoutModal from './components/CheckoutModal';
import InvoiceDetail from './components/InvoiceDetail';
import OrderHistory from './components/OrderHistory';

export default function App() {
  // Persistence Loading state
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  // UI state controllers
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category>('Semua');
  const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc' | 'rating-desc'>('default');

  // Modals / Overlays triggers
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeInvoice, setActiveInvoice] = useState<Order | null>(null);
  
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isOrdersOpen, setIsOrdersOpen] = useState(false);

  // Quick Action Notification Alert toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync state from LocalStorage on mount
  useEffect(() => {
    try {
      const storedCart = localStorage.getItem('meka_cart');
      const storedFavs = localStorage.getItem('meka_favs');
      const storedOrders = localStorage.getItem('meka_orders');

      if (storedCart) setCartItems(JSON.parse(storedCart));
      if (storedFavs) setFavorites(JSON.parse(storedFavs));
      if (storedOrders) setOrders(JSON.parse(storedOrders));
    } catch (e) {
      console.error('Gagal memuat database lokal', e);
    }
  }, []);

  // Save states to LocalStorage on updates
  const saveCart = (items: CartItem[]) => {
    setCartItems(items);
    localStorage.setItem('meka_cart', JSON.stringify(items));
  };

  const saveFavorites = (items: Product[]) => {
    setFavorites(items);
    localStorage.setItem('meka_favs', JSON.stringify(items));
  };

  const saveOrders = (items: Order[]) => {
    setOrders(items);
    localStorage.setItem('meka_orders', JSON.stringify(items));
  };

  // Toast notifier trigger helper
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(prev => prev === msg ? null : prev);
    }, 3000);
  };

  // Add Item to cart logic
  const handleAddToCart = (product: Product, color: ProductColor, qty: number = 1) => {
    const existingIndex = cartItems.findIndex(
      (item) => item.product.id === product.id && item.selectedColor.name === color.name
    );

    if (existingIndex > -1) {
      const updated = [...cartItems];
      const newQty = updated[existingIndex].quantity + qty;
      if (newQty > product.stock) {
        showToast(`❌ Maaf, stok maksimal hanya ${product.stock} pcs!`);
        return;
      }
      updated[existingIndex].quantity = newQty;
      saveCart(updated);
    } else {
      saveCart([...cartItems, { product, quantity: qty, selectedColor: color }]);
    }
    showToast(`🌸 ${qty}x ${product.name} (${color.name}) ditambahkan ke keranjang!`);
  };

  const handleUpdateCartQuantity = (index: number, qty: number) => {
    const item = cartItems[index];
    if (qty > item.product.stock) {
      showToast(`❌ Hanya tersedia ${item.product.stock} pcs untuk hijab ini.`);
      return;
    }
    const updated = [...cartItems];
    updated[index].quantity = qty;
    saveCart(updated);
  };

  const handleRemoveCartItem = (index: number) => {
    const item = cartItems[index];
    const updated = cartItems.filter((_, i) => i !== index);
    saveCart(updated);
    showToast(`🗑️ ${item.product.name} dihapus dari keranjang.`);
  };

  // Favorites trigger
  const handleToggleFavorite = (product: Product) => {
    const isFav = favorites.some((item) => item.id === product.id);
    if (isFav) {
      const updated = favorites.filter((item) => item.id !== product.id);
      saveFavorites(updated);
      showToast(`💔 Hijab dihapus dari daftar favorit Anda.`);
    } else {
      const updated = [...favorites, product];
      saveFavorites(updated);
      showToast(`💖 Hijab disimpan ke daftar favorit!`);
    }
  };

  // Place order from Checkout
  const handlePlaceOrder = (newOrder: Order) => {
    const updatedOrders = [newOrder, ...orders];
    saveOrders(updatedOrders);
    
    // Empty the shopping cart
    saveCart([]);
    setIsCheckoutOpen(false);
    
    // View newly formed invoice
    setActiveInvoice(newOrder);
    showToast('🎉 Pesanan Meka Hijab Store berhasil dibuat!');
  };

  // Simulated bank wire checkout verifier
  const handleSimulatePaymentSuccess = (orderId: string) => {
    const updated = orders.map((ord) => {
      if (ord.id === orderId) {
        return { ...ord, status: 'Diproses' as const };
      }
      return ord;
    });
    saveOrders(updated);
    
    // Sync current active invoice overlay
    if (activeInvoice && activeInvoice.id === orderId) {
      setActiveInvoice({ ...activeInvoice, status: 'Diproses' });
    }
    showToast('💸 Pembayaran Berhasil Diverifikasi! Hijab Anda sedang dipacking.');
  };

  // Filtration and Sorting algorithms
  const filteredProducts = products.filter((p) => {
    const matchesCategory = selectedCategory === 'Semua' || p.category === selectedCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.material.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'rating-desc') return b.rating - a.rating;
    return 0; // default index sequence
  });

  return (
    <div className="min-h-screen bg-pink-50/15 flex flex-col font-sans" id="meka-hijab-store-root">
      
      {/* Toast Alert Popups */}
      {toastMessage && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-gray-900/90 text-white text-xs px-5 py-3 rounded-full shadow-xl flex items-center gap-2 backdrop-blur-md animate-bounce" id="meka-app-toast">
          <span className="w-1.5 h-1.5 bg-pink-400 rounded-full animate-ping" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main navigation Header bar */}
      <Header
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        cartCount={cartItems.reduce((acc, it) => acc + it.quantity, 0)}
        openCart={() => setIsCartOpen(true)}
        openOrders={() => setIsOrdersOpen(true)}
        favoritesCount={favorites.length}
        openFavorites={() => setIsFavoritesOpen(true)}
      />

      {/* Hero promo slide banner */}
      <section className="bg-gradient-to-r from-pink-100 to-pink-50 py-10 md:py-16 border-b border-pink-100 relative overflow-hidden" id="meka-hero">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center relative z-10">
          
          <div className="space-y-6 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 bg-pink-100 px-3.5 py-1.5 rounded-full text-pink-700 text-xs font-bold leading-none shadow-xs">
              <Sparkles size={13} className="text-pink-600" />
              <span>Gaya Hijab Populer Masa Kini</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-serif font-extrabold text-gray-800 leading-tight">
              Tampil Anggun setiap hari dengan <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-rose-500">Meka Hijab</span>
            </h1>

            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed max-w-lg mx-auto md:mx-0">
              Koleksi jilbab kualitas premium buatan pengrajin lokal terpilih. Dari Pashmina Silk yang berkilau mewah untuk kondangan, hingga Voal Ultrafine Laser Cut ternyaman untuk berjam-jam kuliah & bekerja.
            </p>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
              <button
                onClick={() => {
                  setSelectedCategory('Semua');
                  document.getElementById('meka-catalog-title')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="py-3 px-6 rounded-full bg-pink-600 hover:bg-pink-700 text-white font-bold text-xs shadow-md shadow-pink-200 hover:shadow-lg transition-all duration-200 flex items-center gap-1.5"
              >
                <span>Mulai Belanja Hijab</span>
                <ArrowRight size={13} />
              </button>
              
              <a
                href="#meka-value-props"
                className="py-3 px-6 rounded-full bg-white hover:bg-pink-50 text-pink-600 font-bold text-xs border border-pink-200 transition-all flex items-center gap-1"
              >
                <span>Kenapa Meka Store?</span>
              </a>
            </div>
          </div>

          {/* Graphical Right Panel representation */}
          <div className="relative flex justify-center items-center">
            {/* Visual Backdrops Circles */}
            <div className="absolute w-72 h-72 rounded-full bg-pink-200/50 blur-3xl animate-pulse" />
            <div className="absolute w-56 h-56 rounded-full bg-rose-200/40 blur-2xl top-10" />

            <div className="relative bg-white/40 border border-white/60 p-6 md:p-8 rounded-3xl backdrop-blur-md shadow-xl max-w-sm w-full space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-pink-600 flex items-center justify-center text-white font-bold">🌸</div>
                <div>
                  <h3 className="font-bold text-gray-800 text-sm">Rekomendasi Hari Ini</h3>
                  <p className="text-[10px] text-pink-500">Pashmina Silk Premium Al-Meka</p>
                </div>
              </div>

              {/* Little interactive preview element inside hero banner */}
              <div className="bg-gradient-to-tr from-rose-100 to-pink-200 h-40 rounded-2xl p-4 flex items-center justify-center relative overflow-hidden group">
                {/* Embedded SVG mockup */}
                <svg viewBox="0 0 100 120" className="w-28 h-28 drop-shadow-md" xmlns="http://www.w3.org/2000/svg">
                  <path d="M50 32 C41 32 37 42 37 50 C37 58 41 64 50 64 C59 64 63 58 63 50 C63 42 59 32 50 32 Z" fill="#FFEAEB" />
                  <path d="M38 45 C43 38 57 38 62 45 C56 42 44 42 38 45 Z" fill="#7D6F6F" opacity="0.75" />
                  <path d="M50 22 C34 22 28 36 28 52 C28 59 31 66 35 70 C35 70 38 55 50 55 C62 55 65 70 65 70 C69 66 72 59 72 52 C72 36 66 22 50 22 Z" fill="#E1A2B8" /> {/* Dusty Pink */}
                  <path d="M37 50 C37 55 42 66 50 66 C58 66 63 55 63 50 C63 50 54 62 50 62 C46 62 37 50 37 50 Z" fill="#E1A2B8" filter="brightness(0.92)" />
                  <path d="M32 68 C32 68 35 106 50 106 C65 106 68 68 68 68 C68 68 59 88 50 88 C41 88 32 68 32 68 Z" fill="#E1A2B8" filter="brightness(0.97)" />
                </svg>
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <div>
                  <span className="text-gray-400 block text-[9px]">Pilihan Warna</span>
                  <strong className="text-gray-800 font-mono">5 Warna Cantik</strong>
                </div>
                <div>
                  <span className="text-gray-400 block text-[9px]">Promo Spesial</span>
                  <strong className="text-pink-600 font-mono">Rp 115.000</strong>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Diagonal Soft Divider Pattern */}
        <div className="absolute bottom-0 inset-x-0 h-12 bg-pink-50/15" />
      </section>

      {/* Value Propositions feature widgets row */}
      <section className="bg-white py-8 border-b border-pink-100/50" id="meka-value-props">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          
          <div className="flex items-center gap-3 p-2 font-sans">
            <span className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 shrink-0">
              <Truck size={18} />
            </span>
            <div>
              <h4 className="text-xs font-bold text-gray-800">Gratis Ongkir</h4>
              <p className="text-[10px] text-gray-400">Pengiriman se-Indonesia</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2 font-sans">
            <span className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 shrink-0">
              <ShieldCheck size={18} />
            </span>
            <div>
              <h4 className="text-xs font-bold text-gray-800">100% Premium</h4>
              <p className="text-[10px] text-gray-400">Bahan serat kain Grade A</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2 font-sans">
            <span className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 shrink-0">
              <ThumbsUp size={18} />
            </span>
            <div>
              <h4 className="text-xs font-bold text-gray-800">Ulasan Real</h4>
              <p className="text-[10px] text-gray-400">Paling direkomendasikan</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2 font-sans">
            <span className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 shrink-0">
              <Gift size={18} />
            </span>
            <div>
              <h4 className="text-xs font-bold text-gray-800">Box Cantik</h4>
              <p className="text-[10px] text-gray-400">Tiap pembelian premium</p>
            </div>
          </div>

        </div>
      </section>

      {/* Main product view Section */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full" id="meka-main-content">
        
        {/* Title view & Filter sorting panel */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8" id="meka-catalog-header">
          <div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-gray-800 flex items-center gap-2" id="meka-catalog-title">
              <span>Katalog Hijab Eksklusif</span>
              <span className="text-xs bg-pink-100 text-pink-700 px-2.5 py-1 rounded-full font-bold">
                Kategori: {selectedCategory}
              </span>
            </h2>
            <p className="text-xs text-gray-400 mt-1">Ditemukan {sortedProducts.length} model jilbab premium yang pas untuk kulit wajah hangat maupun dingin.</p>
          </div>

          {/* Sorter Selector dropdown */}
          <div className="flex items-center gap-2" id="meka-sorter-panel">
            <label className="text-xs font-medium text-gray-500 shrink-0">Urutkan:</label>
            <select
              id="meka-sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-white border-2 border-pink-100 focus:border-pink-300 rounded-xl px-3 py-1.5 text-xs text-gray-700 outline-none hover:border-pink-200 transition-colors"
            >
              <option value="default">Terbaru & Rekomendasi</option>
              <option value="price-asc">Harga: Terendah ke Tinggi</option>
              <option value="price-desc">Harga: Tertinggi ke Rendah</option>
              <option value="rating-desc">Rating Pembeli Terbaik</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        {sortedProducts.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-3xl border border-pink-100 p-8 max-w-md mx-auto space-y-4" id="empty-search-state">
            <div className="text-pink-300 text-5xl font-mono">🔍</div>
            <p className="font-bold text-gray-800 text-base">Hijab Tidak Ditemukan</p>
            <p className="text-xs text-gray-400 leading-normal">Maaf, kami tidak dapat menemukan hijab yang cocok dengan kata kunci kata &quot;{searchTerm}&quot;. Coba cari kata kunci lainnya seperti "voal" atau "pashmina".</p>
            <button
              onClick={() => { setSearchTerm(''); setSelectedCategory('Semua'); }}
              className="py-2 px-5 bg-pink-100 hover:bg-pink-200 text-pink-700 font-bold text-xs rounded-xl transition"
            >
              Reset Semua Filter
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" id="product-grid-container">
            {sortedProducts.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onViewDetails={setSelectedProduct}
                onAddToCart={(prod, col) => handleAddToCart(prod, col, 1)}
                isFavorite={favorites.some((fav) => fav.id === p.id)}
                onToggleFavorite={() => handleToggleFavorite(p)}
              />
            ))}
          </div>
        )}

      </main>

      {/* Helpful FAQ / Customer service section */}
      <section className="bg-pink-50/20 py-12 border-t border-pink-100/50" id="customer-info-faq">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Promo Info */}
            <div className="p-5 bg-white border border-pink-100/40 rounded-3xl space-y-3 shadow-xs">
              <span className="text-xl">🌸</span>
              <h3 className="font-serif font-bold text-sm text-gray-800">Cara Pembelian Online</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Pilih hijab, warna, dan klik "Keranjang". Buka keranjang lalu isi data alamat Anda pada form checkout. Sistem akan menghitung ongkos kirim dan membuat invoice secara instan.
              </p>
            </div>

            {/* Packaging info */}
            <div className="p-5 bg-white border border-pink-100/40 rounded-3xl space-y-3 shadow-xs">
              <span className="text-xl">📦</span>
              <h3 className="font-serif font-bold text-sm text-gray-800">Kemasan & Keamanan</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Setiap hijab dikemas mengunakan box aesthetic Meka tebal, dibungkus dual-wrap tahan air, serta diberi wewangian bunga ros melati segar saat paket dibuka di rumah Anda.
              </p>
            </div>

            {/* WA Helpdesk info */}
            <div className="p-5 bg-white border border-pink-100/40 rounded-3xl space-y-3 shadow-xs">
              <span className="text-xl">💬</span>
              <h3 className="font-serif font-bold text-sm text-gray-800">Butuh Bantuan Cepat?</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Tanya admin kami mengenai rekomendasi model hijab, ketersediaan stok grosir eksklusif, maupun keluhan kendala pengiriman melalui nomor WhatsApp: <strong>0822-9864-2131</strong>.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Footer copyright platform branding */}
      <footer className="bg-gray-900 text-gray-400 py-10 border-t border-gray-850" id="meka-footer">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-gray-800">
          
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-pink-500 flex items-center justify-center text-white text-sm font-serif font-bold">M</div>
              <h2 className="text-lg font-serif font-bold text-white tracking-wide">Meka Hijab Store</h2>
            </div>
            <p className="text-xs leading-relaxed text-gray-400">
              Menghadirkan keindahan, keanggunan, dan kesederhanaan bersyari’at bagi seluruh muslimah di Indonesia sejak 2024. Hijab berkualitas premium namun tetap ramah di dompet.
            </p>
            <div className="flex gap-3 text-pink-400">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-pink-300">
                <Instagram size={16} />
              </a>
              <span className="text-gray-700">|</span>
              <a href="https://api.whatsapp.com" target="_blank" rel="noreferrer" className="hover:text-pink-300">
                <MessageSquare size={16} />
              </a>
            </div>
          </div>

          <div className="space-y-3 text-xs">
            <h3 className="font-bold text-white tracking-wider">Navigasi Belanja</h3>
            <div className="grid grid-cols-2 gap-2 text-gray-400">
              <span className="hover:text-pink-400 cursor-pointer" onClick={() => setSelectedCategory('Pashmina')}>Pashmina Silk</span>
              <span className="hover:text-pink-400 cursor-pointer" onClick={() => setSelectedCategory('Voal')}>Voal Premium</span>
              <span className="hover:text-pink-400 cursor-pointer" onClick={() => setSelectedCategory('Segi Empat')}>Segi Empat Daily</span>
              <span className="hover:text-pink-400 cursor-pointer" onClick={() => setSelectedCategory('Instan')}>Bergo Instan</span>
              <span className="hover:text-pink-400 cursor-pointer" onClick={() => setSelectedCategory('Semua')}>Semua Produk</span>
              <span className="hover:text-pink-400 cursor-pointer" onClick={() => setIsOrdersOpen(true)}>Pesanan Saya</span>
            </div>
          </div>

          <div className="space-y-3 text-xs">
            <h3 className="font-bold text-white tracking-wider">Jam Operasional Toko</h3>
            <p className="leading-relaxed">
              Senin - Minggu: 08:30 WIB - 21:00 WIB<br />
              Pengiriman Paket: JNE & J&T (tiap jam 16:00 WIB), Sicepat (tiap jam 18:00 WIB).<br />
              <em>Gudang Meka: Soreang, Kabupaten Bandung, Jawa Barat.</em>
            </p>
          </div>

        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col md:flex-row justify-between items-center text-[10px] text-gray-500 gap-4">
          <p>© 2026 Meka Hijab Store Indonesia. All Rights Reserved. Crafted with Pink Elegance 🌸</p>
          <div className="flex items-center gap-1.5">
            <span>Metode Aman:</span>
            <span className="px-2 py-0.5 border border-gray-800 rounded bg-gray-950 font-mono text-[9px]">QRIS GPN</span>
            <span className="px-2 py-0.5 border border-gray-800 rounded bg-gray-950 font-mono text-[9px]">GoPay</span>
            <span className="px-2 py-0.5 border border-gray-800 rounded bg-gray-950 font-mono text-[9px]">BCA/Mandiri VA</span>
          </div>
        </div>
      </footer>

      {/* Floating Drawers & Overlays state widgets */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={handleAddToCart}
        />
      )}

      {isCartOpen && (
        <CartSidebar
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          cartItems={cartItems}
          onUpdateQuantity={handleUpdateCartQuantity}
          onRemoveItem={handleRemoveCartItem}
          onCheckout={() => {
            setIsCartOpen(false);
            setIsCheckoutOpen(true);
          }}
        />
      )}

      {isFavoritesOpen && (
        <FavoritesSidebar
          isOpen={isFavoritesOpen}
          onClose={() => setIsFavoritesOpen(false)}
          favorites={favorites}
          onRemoveFavorite={(id) => {
            const updated = favorites.filter((item) => item.id !== id);
            saveFavorites(updated);
          }}
          onAddToCartDirectly={(p, col) => handleAddToCart(p, col, 1)}
          onViewDetails={setSelectedProduct}
        />
      )}

      {isCheckoutOpen && (
        <CheckoutModal
          isOpen={isCheckoutOpen}
          onClose={() => setIsCheckoutOpen(false)}
          cartItems={cartItems}
          onPlaceOrder={handlePlaceOrder}
        />
      )}

      {activeInvoice && (
        <InvoiceDetail
          order={activeInvoice}
          onClose={() => setActiveInvoice(null)}
          onSimulatePaymentSuccess={handleSimulatePaymentSuccess}
        />
      )}

      {isOrdersOpen && (
        <OrderHistory
          isOpen={isOrdersOpen}
          onClose={() => setIsOrdersOpen(false)}
          orders={orders}
          onSelectOrder={(ord) => {
            setIsOrdersOpen(false);
            setActiveInvoice(ord);
          }}
        />
      )}

    </div>
  );
}

