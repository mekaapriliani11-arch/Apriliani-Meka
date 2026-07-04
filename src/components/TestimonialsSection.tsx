import React, { useState } from 'react';
import { Star, MessageSquare, Quote, Heart, CheckCircle, Plus, Send } from 'lucide-react';

// @ts-ignore
import avatar1 from '../assets/images/customer_avatar_1_1781859075944.jpg';
// @ts-ignore
import avatar2 from '../assets/images/customer_avatar_2_1781859093088.jpg';
// @ts-ignore
import avatar3 from '../assets/images/customer_avatar_3_1781859110436.jpg';

interface Testimonial {
  id: string;
  name: string;
  location: string;
  avatar: string;
  rating: number;
  comment: string;
  productTag: string;
  date: string;
  isVerified: boolean;
  likes: number;
  isLiked?: boolean;
}

const initialTestimonials: Testimonial[] = [
  {
    id: 't1',
    name: 'Aprilia Salsabila',
    location: 'Surabaya',
    avatar: avatar1,
    rating: 5,
    comment: 'Pashmina silkinya juara banget! Berkilau anggun tapi nggak licin pas dipakai, flowy banget di kepala. Aku buat kondangan semua rekan kerja pada nanya beli di mana. Kemasan box-nya juga rapi dan wangi ros melati pas pertama kali dibuka!',
    productTag: 'Pashmina Silk Premium',
    date: '3 hari yang lalu',
    isVerified: true,
    likes: 24,
    isLiked: false,
  },
  {
    id: 't2',
    name: 'Fatimah Az-Zahra',
    location: 'Bandung',
    avatar: avatar2,
    rating: 5,
    comment: 'Koleksi Voal Ultrafine dan Bella Square Meka Hijab beneran lembut pol! Bahannya tegak sempurna di dahi dan anti letoy. Pilihan warna pastelnya super kalem dan manis pas dicocokkan sama gamis kesayangan. Pengiriman dari Bandung super cepat!',
    productTag: 'Voal Ultrafine Hijab',
    date: '1 minggu yang lalu',
    isVerified: true,
    likes: 18,
    isLiked: false,
  },
  {
    id: 't3',
    name: 'Nabila Putri Dian',
    location: 'Jakarta Selatan',
    avatar: avatar3,
    rating: 5,
    comment: 'Baru pertama order Khimar Syari dan Instant Jersey di sini, langsung jatuh cinta! Desain double-layer di khimarnya menutup dada dengan sangat anggun dan bahan adem dipakai seharian. Jahitan tepi laser-cut-nya rapi sekali.',
    productTag: 'Khimar Ceruty Syari',
    date: '2 minggu yang lalu',
    isVerified: true,
    likes: 31,
    isLiked: false,
  },
];

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(initialTestimonials);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [newName, setNewName] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [newComment, setNewComment] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [selectedProduct, setSelectedProduct] = useState('Pashmina Silk Premium');
  const [submitError, setSubmitError] = useState('');

  const handleLike = (id: string) => {
    setTestimonials((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            likes: item.isLiked ? item.likes - 1 : item.likes + 1,
            isLiked: !item.isLiked,
          };
        }
        return item;
      })
    );
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newComment.trim()) {
      setSubmitError('Nama dan Komentar ulasan tidak boleh kosong ya.');
      return;
    }

    const newReview: Testimonial = {
      id: `custom-${Date.now()}`,
      name: newName,
      location: newLocation.trim() || 'Pembeli Setia Meka',
      // Provide a random default placeholder/initial color avatar background
      avatar: '', 
      rating: newRating,
      comment: newComment,
      productTag: selectedProduct,
      date: 'Baru saja',
      isVerified: true,
      likes: 0,
      isLiked: false,
    };

    setTestimonials((prev) => [newReview, ...prev]);
    
    // Clear form states
    setNewName('');
    setNewLocation('');
    setNewComment('');
    setNewRating(5);
    setSubmitError('');
    setIsFormOpen(false);
  };

  return (
    <section className="py-16 bg-gradient-to-b from-white to-pink-50/10 border-t border-pink-100/40 relative overflow-hidden" id="testimonials-section">
      {/* Decorative absolute element background pattern */}
      <div className="absolute top-1/4 left-0 w-72 h-72 bg-gradient-to-tr from-pink-200/10 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-gradient-to-bl from-rose-200/10 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header content with sleek modern branding */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 relative z-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-pink-100/55 text-pink-700 rounded-full text-xs font-semibold mb-3 tracking-wide border border-pink-200/30">
              <Star className="w-3.5 h-3.5 fill-pink-500 text-pink-500 animate-pulse" />
              <span>TESTIMONI KAMI</span>
            </div>
            <h2 className="text-3xl font-serif font-extrabold text-gray-900 tracking-tight">
              Ulasan Cantik dari Muslimah Meka
            </h2>
            <p className="mt-2 text-gray-500 text-sm max-w-xl leading-relaxed">
              Dengarkan ungkapan kebahagiaan jujur dari ratusan customer setia kami yang telah merasakan kelembutan serat kain premium ulasan Meka Hijab Store.
            </p>
          </div>

          <button
            onClick={() => setIsFormOpen(!isFormOpen)}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-pink-600 hover:bg-pink-700 text-white rounded-2xl text-xs font-semibold transition-all duration-300 shadow-sm shadow-pink-200 hover:shadow-md cursor-pointer shrink-0"
            id="btn-tulis-ulasan"
          >
            <Plus className="w-4 h-4" />
            Tulis Ulasan Anda
          </button>
        </div>

        {/* Modal / Collapse form write a review */}
        {isFormOpen && (
          <div className="mb-12 bg-white/70 backdrop-blur-md border border-pink-100 p-6 sm:p-8 rounded-3xl shadow-xl max-w-2xl mx-auto animate-fade-in relative z-20">
            <h3 className="font-serif font-black text-lg text-gray-800 mb-2">Bagikan Pengalaman Berhijab Meka</h3>
            <p className="text-xs text-gray-500 mb-6">Ulasan jujur Anda sangat berarti membantu ribuan muslimah memilih produk syar'i terbaik kami.</p>

            <form onSubmit={handleSubmitReview} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-gray-600 uppercase mb-1">Nama Lengkap</label>
                  <input
                    type="text"
                    required
                    placeholder="Nama Anda (cth: Siti Aminah)"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="w-full px-4 py-2 text-xs border border-pink-100/80 rounded-xl focus:outline-hidden focus:ring-1 focus:ring-pink-400 bg-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-gray-600 uppercase mb-1">Asal Kota / Wilayah</label>
                  <input
                    type="text"
                    placeholder="Asal Kota (cth: Sidoarjo)"
                    value={newLocation}
                    onChange={(e) => setNewLocation(e.target.value)}
                    className="w-full px-4 py-2 text-xs border border-pink-100/80 rounded-xl focus:outline-hidden focus:ring-1 focus:ring-pink-400 bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-gray-600 uppercase mb-1">Hijab yang Dibeli</label>
                  <select
                    value={selectedProduct}
                    onChange={(e) => setSelectedProduct(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-pink-100/80 rounded-xl focus:outline-hidden focus:ring-1 focus:ring-pink-400 bg-white"
                  >
                    <option value="Pashmina Silk Premium">Pashmina Silk Premium</option>
                    <option value="Voal Ultrafine Hijab">Voal Ultrafine Hijab</option>
                    <option value="Bella Square Daily">Bella Square Daily</option>
                    <option value="Khimar Ceruty Syari">Khimar Ceruty Syari</option>
                    <option value="Pashmina Plisket Lurus">Pashmina Plisket Lurus</option>
                    <option value="Bergo Instant Jersey">Bergo Instant Jersey</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-gray-600 uppercase mb-1">Penilaian Rating</label>
                  <div className="flex items-center gap-1.5 py-1.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setNewRating(star)}
                        className="transition-transform active:scale-125 focus:outline-hidden"
                      >
                        <Star
                          className={`w-6 h-6 ${
                            star <= newRating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-600 uppercase mb-1">Isi Ulasan Cantik Anda</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Ceritakan mengapa Anda sangat menyukai bahan, model, jahit tepi, warna, maupun pengiriman Meka Hijab..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="w-full px-4 py-3 text-xs border border-pink-100/80 rounded-xl focus:outline-hidden focus:ring-1 focus:ring-pink-400 bg-white resize-none"
                />
              </div>

              {submitError && (
                <p className="text-xs font-semibold text-rose-500">{submitError}</p>
              )}

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="px-4 py-2 border border-gray-200 text-gray-500 rounded-xl text-xs hover:bg-gray-50 cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-pink-600 hover:bg-pink-700 text-white rounded-xl text-xs font-semibold inline-flex items-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  Kirim Ulasan
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Testimonial Cards Masonry Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10" id="testimonials-grid-container">
          {testimonials.map((test) => (
            <div
              key={test.id}
              className="bg-white border border-pink-100/40 p-6 sm:p-7 rounded-3xl hover:shadow-xl hover:border-pink-200/50 transition-all duration-300 flex flex-col justify-between group relative"
              id={`testimonial-card-${test.id}`}
            >
              {/* Cute top subtle decorative elements */}
              <div className="absolute top-5 right-6 text-pink-100 pointer-events-none group-hover:text-pink-200 transition-colors">
                <Quote className="w-8 h-8 fill-current" />
              </div>

              <div>
                {/* Rating stars display */}
                <div className="flex items-center gap-0.5 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={`${
                        i < test.rating
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-200'
                      }`}
                    />
                  ))}
                  <span className="text-[10px] text-gray-400 ml-1.5 font-mono">{test.rating}.0</span>
                </div>

                {/* Main feedback comment block */}
                <p className="text-gray-600 text-xs leading-relaxed italic mb-5 relative block font-medium">
                  "{test.comment}"
                </p>
              </div>

              {/* Bottom Metadata & User info */}
              <div className="border-t border-gray-50 pt-4 mt-auto flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {test.avatar ? (
                    <img
                      src={test.avatar}
                      alt={test.name}
                      className="w-10 h-10 rounded-full object-cover border border-pink-100"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-rose-200 to-pink-300 flex items-center justify-center text-white text-xs font-bold border border-pink-100">
                      {test.name.charAt(0)}
                    </div>
                  )}

                  <div className="min-w-0">
                    <div className="flex items-center gap-1">
                      <h4 className="text-xs font-bold text-gray-800 truncate max-w-[110px] sm:max-w-none">
                        {test.name}
                      </h4>
                      {test.isVerified && (
                        <CheckCircle className="w-3.5 h-3.5 text-pink-500 fill-pink-100 shrink-0" title="Pembeli Terverifikasi" />
                      )}
                    </div>
                    <p className="text-[10px] text-gray-400">
                      {test.location} &bull; <span className="font-mono">{test.date}</span>
                    </p>
                  </div>
                </div>

                {/* Review interactable: Likes heart indicator / Product tag */}
                <div className="flex flex-col items-end gap-1.5">
                  <span className="text-[9px] font-semibold text-pink-600 bg-pink-100/50 px-2 py-0.5 rounded-full inline-block max-w-[100px] truncate">
                    {test.productTag}
                  </span>
                  
                  <button
                    onClick={() => handleLike(test.id)}
                    className="flex items-center gap-1 text-[10px] font-mono text-gray-400 hover:text-pink-500 transition-colors group/like focus:outline-hidden cursor-pointer"
                  >
                    <Heart
                      size={11}
                      className={`transition-colors ${
                        test.isLiked
                          ? 'fill-pink-500 text-pink-500'
                          : 'group-hover/like:text-pink-400'
                      }`}
                    />
                    <span>{test.likes}</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer block statistics summary */}
        <div className="mt-10 bg-white/50 border border-pink-100/30 p-4 rounded-3xl flex flex-wrap items-center justify-center gap-6 md:gap-12 relative z-10 text-center max-w-3xl mx-auto shadow-2xs">
          <div className="text-center">
            <span className="block text-xl font-bold font-serif text-gray-800">4.9 / 5.0</span>
            <span className="text-[10px] text-gray-400 uppercase tracking-widest">Kepuasan Pelanggan</span>
          </div>
          <div className="w-px h-6 bg-pink-100 hidden sm:block" />
          <div className="text-center">
            <span className="block text-xl font-bold font-serif text-gray-800">12,500+</span>
            <span className="text-[10px] text-gray-400 uppercase tracking-widest">Hijab Terjual</span>
          </div>
          <div className="w-px h-6 bg-pink-100 hidden sm:block" />
          <div className="text-center">
            <span className="block text-xl font-bold font-serif text-gray-800">99.2%</span>
            <span className="text-[10px] text-gray-400 uppercase tracking-widest">Ulasan Positif</span>
          </div>
        </div>

      </div>
    </section>
  );
}
