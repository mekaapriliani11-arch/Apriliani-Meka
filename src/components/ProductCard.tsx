import React, { useState } from 'react';
import { Star, Heart, Eye, ShoppingCart, Check } from 'lucide-react';
import { Product, ProductColor } from '../types';
import { formatRupiah } from '../data';

interface ProductCardProps {
  key?: any;
  product: Product;
  onViewDetails: (product: Product) => void;
  onAddToCart: (product: Product, selectedColor: ProductColor) => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

// Beautiful Dynamic SVG Hijab Drape Graphic
export function HijabIcon({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 100 120" className="w-full h-full object-contain drop-shadow-md" xmlns="http://www.w3.org/2000/svg">
      {/* Background Frame Circle */}
      <circle cx="50" cy="55" r="43" fill="#FFF5F7" opacity="0.6" />
      
      {/* Elegant Face Oval Outline representing Mannequin */}
      <path d="M50 32 C41 32 37 42 37 50 C37 58 41 64 50 64 C59 64 63 58 63 50 C63 42 59 32 50 32 Z" fill="#FFEAEB" />
      
      {/* Inner Cap (Ciput) */}
      <path d="M38 45 C43 38 57 38 62 45 C56 42 44 42 38 45 Z" fill="#7D6F6F" opacity="0.75" />

      {/* Hijab Main Drape Over Head */}
      <path 
        d="M50 22 C34 22 28 36 28 52 C28 59 31 66 35 70 C35 70 38 55 50 55 C62 55 65 70 65 70 C69 66 72 59 72 52 C72 36 66 22 50 22 Z" 
        fill={color} 
      />

      {/* Hijab Folds around Face and Chin */}
      <path 
        d="M37 50 C37 55 42 66 50 66 C58 66 63 55 63 50 C63 50 54 62 50 62 C46 62 37 50 37 50 Z" 
        fill={color} 
        filter="brightness(0.92)" 
      />

      {/* Hanging Flowy Drapes (Dada & Pundak) */}
      <path 
        d="M32 68 C32 68 35 106 50 106 C65 106 68 68 68 68 C68 68 59 88 50 88 C41 88 32 68 32 68 Z" 
        fill={color} 
        filter="brightness(0.97)" 
      />

      {/* Soft folds lines for realism */}
      <path d="M42 27 C46 25 54 25 58 27" stroke="#ffffff" strokeWidth="1" fill="none" opacity="0.4" />
      <path d="M31 55 C33 60 36 64 36 64" stroke="#000000" strokeWidth="1.2" fill="none" opacity="0.08" />
      <path d="M69 55 C67 60 64 64 64 64" stroke="#000000" strokeWidth="1.2" fill="none" opacity="0.08" />
    </svg>
  );
}

export default function ProductCard({
  product,
  onViewDetails,
  onAddToCart,
  isFavorite,
  onToggleFavorite
}: ProductCardProps) {
  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0]);
  const [added, setAdded] = useState(false);

  const handleAddClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product, selectedColor);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div
      id={`product-card-${product.id}`}
      className="group relative bg-white border border-pink-100 rounded-3xl overflow-hidden shadow-xs hover:shadow-lg hover:shadow-pink-100/50 hover:-translate-y-1 transition-all duration-300 flex flex-col cursor-pointer"
      onClick={() => onViewDetails(product)}
    >
      {/* Badges and Favorite Button */}
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-1.5 pointer-events-none">
        {product.badge && (
          <span className="px-3 py-1 text-[10px] font-bold tracking-wider uppercase text-white bg-pink-500 rounded-full shadow-xs">
            {product.badge}
          </span>
        )}
        {product.stock <= 15 && (
          <span className="px-3 py-1 text-[10px] font-bold tracking-wider uppercase text-rose-700 bg-rose-100 rounded-full">
            Stok Menipis
          </span>
        )}
      </div>

      <button
        id={`btn-fav-${product.id}`}
        onClick={(e) => {
          e.stopPropagation();
          onToggleFavorite();
        }}
        className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 backdrop-blur-xs text-pink-500 hover:bg-white hover:scale-110 shadow-xs transition-all duration-200"
      >
        <Heart size={18} className={isFavorite ? "fill-pink-500" : ""} />
      </button>

      {/* Decorative Gradient Image Box with SVG previewer */}
      <div className={`relative h-64 ${product.image} flex items-center justify-center p-6 select-none overflow-hidden group-hover:scale-[1.02] transition-transform duration-550`}>
        {/* Soft background sparkles circles */}
        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/20 rounded-full blur-xl" />
        <div className="absolute -top-10 -left-10 w-24 h-24 bg-rose-300/20 rounded-full blur-lg" />
        
        {/* Main interactive SVG drape artwork */}
        <div className="w-48 h-56 flex items-center justify-center relative">
          <HijabIcon color={selectedColor.hex} />
        </div>
      </div>

      {/* Description Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Category & Ratings */}
          <div className="flex items-center justify-between gap-1 text-[11px] font-semibold text-pink-400 mb-1">
            <span>{product.category}</span>
            <div className="flex items-center gap-0.5 bg-pink-50 py-0.5 px-2 rounded-full">
              <Star size={11} className="text-amber-400 fill-amber-400" />
              <span className="text-pink-700 text-xs font-bold">{product.rating}</span>
              <span className="text-pink-400/80 font-normal">({product.reviewsCount})</span>
            </div>
          </div>

          {/* Product Name */}
          <h3 className="font-serif font-bold text-gray-800 text-base line-clamp-1 group-hover:text-pink-600 transition-colors duration-200 mb-1">
            {product.name}
          </h3>

          {/* Mini short description clipping */}
          <p className="text-xs text-gray-500 line-clamp-2 mb-3 h-8 leading-relaxed">
            {product.description}
          </p>

          {/* Color Chips Selector */}
          <div className="mb-4">
            <span className="text-[10px] uppercase tracking-wider text-pink-400/80 font-semibold block mb-1.5">
              Warna Hijab: <span className="text-pink-700 font-bold">{selectedColor.name}</span>
            </span>
            <div className="flex flex-wrap gap-1.5">
              {product.colors.map((color) => (
                <button
                  key={color.name}
                  id={`color-select-${product.id}-${color.name.toLowerCase().replace(' ', '-')}`}
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedColor(color);
                  }}
                  className={`w-6 h-6 rounded-full border-2 transition-all duration-200 relative flex items-center justify-center ${
                    selectedColor.name === color.name
                      ? 'border-pink-600 scale-110 shadow-sm'
                      : 'border-transparent hover:scale-105'
                  }`}
                >
                  {selectedColor.name === color.name && (
                    <span 
                      className="w-1.5 h-1.5 rounded-full" 
                      style={{ backgroundColor: color.hex === '#FFFFFF' ? '#000000' : '#FFFFFF' }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Price and Cart Addition Row */}
        <div className="flex items-center justify-between gap-2 pt-3 border-t border-pink-50/80">
          <div>
            <p className="text-[10px] text-gray-400">Harga Terbaik</p>
            <p className="text-base font-bold text-pink-600 font-mono">
              {formatRupiah(product.price)}
            </p>
          </div>

          <button
            id={`btn-add-to-cart-${product.id}`}
            onClick={handleAddClick}
            className={`py-2 px-3.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all duration-200 ${
              added 
                ? 'bg-emerald-500 text-white shadow-emerald-100' 
                : 'bg-pink-50 text-pink-600 hover:bg-pink-100'
            }`}
          >
            {added ? (
              <>
                <Check size={14} className="animate-bounce" />
                <span>Masuk!</span>
              </>
            ) : (
              <>
                <ShoppingCart size={14} />
                <span>+ Keranjang</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
