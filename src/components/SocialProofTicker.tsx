import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ShoppingBag, Check, X } from 'lucide-react';
import { formatRupiah } from '../data';

interface SocialNotification {
  name: string;
  city: string;
  product: string;
  timeAgo: string;
  color: string;
}

const mockPurchases: SocialNotification[] = [
  { name: 'Siti Aminah', city: 'Sidoarjo', product: 'Pashmina Silk Premium', color: 'Warm Nude', timeAgo: '2 menit yang lalu' },
  { name: 'Rania Kartika', city: 'Bandung', product: 'Voal Ultrafine Hijab', color: 'Lavender Lilac', timeAgo: '5 menit yang lalu' },
  { name: 'Zahra Aulia', city: 'Jakarta Selatan', product: 'Bella Square Daily', color: 'Soft Pink', timeAgo: '1 menit yang lalu' },
  { name: 'Fatmawati', city: 'Surabaya', product: 'Khimar Ceruty Syari', color: 'Midnight Navy', timeAgo: '12 detik yang lalu' },
  { name: 'Nabila Putri', city: 'Semarang', product: 'Pashmina Plisket Lurus', color: 'Mocca Coffee', timeAgo: '8 menit yang lalu' },
  { name: 'Khairunnisa', city: 'Medan', product: 'Bergo Instant Jersey', color: 'Classic Black', timeAgo: '4 menit yang lalu' },
  { name: 'Dian Safira', city: 'Sleman', product: 'Pashmina Silk Premium', color: 'Dusty Pink', timeAgo: '15 detik yang lalu' },
  { name: 'Aisyah Humaira', city: 'Makassar', product: 'Voal Ultrafine Hijab', color: 'Beige Cream', timeAgo: '3 menit yang lalu' },
];

export default function SocialProofTicker() {
  const [currentNotification, setCurrentNotification] = useState<SocialNotification | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Initial delay before showing the very first social proof toast
    const initialTimer = setTimeout(() => {
      showNextNotification();
    }, 4000);

    // Dynamic interval to display/hide notifications periodically
    const intervalTimer = setInterval(() => {
      // Rotate if not currently showing
      if (!isVisible) {
        showNextNotification();
      }
    }, 15000); // Trigger every 15 seconds

    return () => {
      clearTimeout(initialTimer);
      clearInterval(intervalTimer);
    };
  }, [isVisible]);

  const showNextNotification = () => {
    // Select random purchase record
    const randomIndex = Math.floor(Math.random() * mockPurchases.length);
    setCurrentNotification(mockPurchases[randomIndex]);
    setIsVisible(true);

    // Auto-hide after 5 seconds
    setTimeout(() => {
      setIsVisible(false);
    }, 5500);
  };

  return (
    <AnimatePresence>
      {isVisible && currentNotification && (
        <motion.div
          id="social-proof-toast"
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="fixed bottom-4 left-4 z-50 max-w-sm w-[calc(100vw-2rem)] bg-white/95 backdrop-blur-md rounded-2xl shadow-xl shadow-pink-100/40 border border-pink-100 p-4 flex items-start gap-3 select-none"
        >
          {/* Circular Icon with verify check badge */}
          <div className="relative shrink-0">
            <div className="w-10 h-10 rounded-full bg-pink-100/80 text-pink-600 flex items-center justify-center">
              <ShoppingBag size={18} className="animate-bounce" />
            </div>
            <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-white rounded-full p-0.5 border border-white">
              <Check size={8} strokeWidth={4} />
            </div>
          </div>

          {/* Social Notification Message Content */}
          <div className="flex-1 min-w-0 pr-2">
            <p className="text-[11px] font-bold text-gray-800 leading-tight">
              {currentNotification.name} <span className="text-gray-400 font-normal">dari</span> {currentNotification.city}
            </p>
            <p className="text-[12px] text-gray-600 mt-1 leading-snug">
              Baru saja membeli <span className="font-bold text-pink-600">{currentNotification.product}</span>
            </p>
            {currentNotification.color && (
              <p className="text-[10px] text-gray-400 mt-0.5">
                Varian: <span className="font-semibold text-gray-500">{currentNotification.color}</span>
              </p>
            )}
            <p className="text-[9px] text-pink-400 font-mono mt-1.5 flex items-center gap-1">
              <span>●</span> {currentNotification.timeAgo}
            </p>
          </div>

          {/* Explicit close action */}
          <button
            onClick={() => setIsVisible(false)}
            className="text-gray-400 hover:text-gray-600 p-1 hover:bg-gray-50 rounded-lg transition-colors shrink-0 cursor-pointer"
            aria-label="Tutup notifikasi"
          >
            <X size={14} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
