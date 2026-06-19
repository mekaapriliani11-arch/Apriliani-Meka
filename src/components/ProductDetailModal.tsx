import React, { useState } from 'react';
import { X, Star, ShoppingBag, Truck, BadgePercent, Heart } from 'lucide-react';
import { Product, ProductColor } from '../types';
import { formatRupiah } from '../data';
import { HijabIcon } from './ProductCard';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, selectedColor: ProductColor, qty: number) => void;
}

export default function ProductDetailModal({
  product,
  onClose,
  onAddToCart
}: ProductDetailModalProps) {
  if (!product) return null;

  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0]);
  const [quantity, setQuantity] = useState<number>(1);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  const handleAddToCart = () => {
    onAddToCart(product, selectedColor, quantity);
    onClose();
  };

  const increaseQty = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const decreaseQty = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true" id="product-detail-overlay">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        
        {/* Backdrop overlay */}
        <div 
          onClick={onClose}
          className="fixed inset-0 bg-pink-950/40 backdrop-blur-xs transition-opacity" 
          aria-hidden="true" 
        />

        {/* Trick to center the modal contents */}
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        {/* Modal panel container */}
        <div className="inline-block align-bottom bg-white rounded-3xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full border border-pink-100 flex flex-col md:flex-row relative">
          
          {/* Close button */}
          <button
            id="btn-close-details"
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/90 text-gray-400 hover:text-pink-600 hover:scale-105 transition-all duration-150 border border-pink-100"
          >
            <X size={20} />
          </button>

          {/* Left panel: dynamic preview banner */}
          <div className={`w-full md:w-1/2 min-h-[320px] md:min-h-[460px] ${product.image} flex flex-col items-center justify-center p-8 relative`}>
            {/* Visual sparkles */}
            <div className="absolute top-12 left-12 w-16 h-16 bg-white/20 rounded-full blur-lg animate-pulse" />
            <div className="absolute bottom-12 right-12 w-20 h-20 bg-rose-200/20 rounded-full blur-xl" />
            
            <div className="w-56 h-64 flex items-center justify-center">
              <HijabIcon color={selectedColor.hex} />
            </div>

            {/* Hint message */}
            <div className="mt-4 px-4 py-1.5 bg-white/30 backdrop-blur-md rounded-full text-[11px] text-pink-900 font-medium">
              Warna Mockup: <strong className="font-bold">{selectedColor.name}</strong>
            </div>
          </div>

          {/* Right panel: Information and configurations */}
          <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-between">
            <div>
              {/* Product Badges and Category */}
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-pink-500">
                  {product.category}
                </span>
                {product.badge && (
                  <span className="px-2 py-0.5 text-[9px] font-bold text-white bg-pink-500 rounded-md">
                    {product.badge}
                  </span>
                )}
              </div>

              {/* Product Name */}
              <h2 className="text-2xl font-serif font-bold text-gray-800 leading-snug mb-2">
                {product.name}
              </h2>

              {/* Price and Ratings */}
              <div className="flex items-center justify-between mb-4 pb-4 border-b border-pink-50">
                <span className="text-2xl font-bold font-mono text-pink-600">
                  {formatRupiah(product.price)}
                </span>
                
                <div className="flex items-center gap-1 bg-pink-50 py-1 px-2.5 rounded-full">
                  <Star size={14} className="text-amber-400 fill-amber-400" />
                  <span className="text-pink-700 text-xs font-bold">{product.rating}</span>
                  <span className="text-pink-400 text-xs font-medium">({product.reviewsCount} Ulasan)</span>
                </div>
              </div>

              {/* Story Description */}
              <div className="mb-4">
                <h4 className="text-[11px] uppercase tracking-wider text-gray-400 font-semibold mb-1">
                  Deskripsi Produk
                </h4>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Fabric Specs Grid */}
              <div className="grid grid-cols-2 gap-3 mb-5 bg-pink-50/30 p-3 rounded-2xl border border-pink-100/50">
                <div>
                  <span className="text-[10px] text-gray-400 font-medium block">Bahan Kain</span>
                  <span className="text-xs text-pink-800 font-bold">{product.material}</span>
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 font-medium block">Ukuran Dimensi</span>
                  <span className="text-xs text-pink-800 font-bold">{product.size}</span>
                </div>
              </div>

              {/* Highlights Bullet List */}
              <div className="mb-5">
                <h4 className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold mb-2">
                  Kelebihan Hijab Ini:
                </h4>
                <ul className="grid grid-cols-2 gap-x-2 gap-y-1 text-xs text-gray-600">
                  {product.features.map((feat, i) => (
                    <li key={i} className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-pink-400 shrink-0" />
                      <span className="truncate">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Color selectors */}
              <div className="mb-6">
                <h4 className="text-[11px] uppercase tracking-wider text-gray-400 font-semibold mb-2">
                  Pilih Warna Eksklusif: <span className="text-pink-700 font-bold">{selectedColor.name}</span>
                </h4>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      id={`modal-color-${color.name.toLowerCase().replace(' ', '-')}`}
                      onClick={() => setSelectedColor(color)}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                      className={`w-8 h-8 rounded-full border-2 transition-transform duration-200 relative flex items-center justify-center ${
                        selectedColor.name === color.name
                          ? 'border-pink-600 scale-110 shadow-md'
                          : 'border-transparent hover:scale-105'
                      }`}
                    >
                      {selectedColor.name === color.name && (
                        <span 
                          className="w-2 h-2 rounded-full" 
                          style={{ backgroundColor: color.hex === '#FFFFFF' ? '#000000' : '#FFFFFF' }}
                        />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity config */}
              <div className="flex items-center justify-between gap-4 mb-6">
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-gray-400 font-semibold block mb-1">
                    Jumlah Pembelian
                  </span>
                  <span className="text-[11px] text-pink-500 font-bold">
                    Tersedia {product.stock} pcs di gudang
                  </span>
                </div>

                <div className="flex items-center border border-pink-200 rounded-xl overflow-hidden bg-white shadow-xs">
                  <button
                    onClick={decreaseQty}
                    className="p-2 w-9 hover:bg-pink-50 text-pink-600 font-bold text-center border-r border-pink-100 transition-colors"
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <span className="px-4 font-bold text-gray-700 text-sm w-10 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={increaseQty}
                    className="p-2 w-9 hover:bg-pink-50 text-pink-600 font-bold text-center border-l border-pink-100 transition-colors"
                    disabled={quantity >= product.stock}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Add to bag triggering */}
            <div className="flex gap-2">
              <button
                id="btn-modal-add-to-cart"
                onClick={handleAddToCart}
                className="flex-1 py-3 px-6 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold text-sm shadow-md shadow-pink-100 hover:shadow-lg hover:shadow-pink-200 transition-all duration-200 flex items-center justify-center gap-2"
              >
                <ShoppingBag size={18} />
                <span>Masukkan {quantity} Item Ke Keranjang</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
