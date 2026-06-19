import { Product } from './types';

export const products: Product[] = [
  {
    id: 'p1',
    name: 'Pashmina Silk Premium Al-Meka',
    category: 'Pashmina',
    price: 115000,
    description: 'Pashmina berbahan silk premium dengan kilau yang elegan dan anggun. Sangat lembut di kulit, mudah diatur, dan tidak licin. Sangat cocok untuk acara formal, kondangan, maupun tampilan kasual mewah sehari-hari.',
    rating: 4.9,
    reviewsCount: 124,
    material: 'Premium Silk Armani',
    size: '180 x 75 cm',
    colors: [
      { name: 'Dusty Pink', hex: '#E1A2B8' },
      { name: 'Rose Gold', hex: '#B76E79' },
      { name: 'Warm Nude', hex: '#D2B48C' },
      { name: 'Mauve', hex: '#905E7B' },
      { name: 'Sage Green', hex: '#8F9779' }
    ],
    image: 'bg-gradient-to-tr from-pink-200 to-rose-300',
    features: ['Efek kilau mewah (Glossy)', 'Tepian jahit tepi rapi', 'Bahan jatuh dan flowy', 'Dingin dan nyaman dipakai'],
    stock: 15,
    badge: 'Terlaris'
  },
  {
    id: 'p2',
    name: 'Voal Ultrafine Laser Cut',
    category: 'Voal',
    price: 85000,
    description: 'Hijab segi empat voal ultrafine dengan detail pinggiran laser cut yang presisi dan cantik. Bahannya sangat ringan, tegak di dahi, menyerap keringat dengan baik, dan tidak membuat telinga berdengung.',
    rating: 4.8,
    reviewsCount: 218,
    material: 'Voal Ultrafine Grade A',
    size: '115 x 115 cm',
    colors: [
      { name: 'Blossom Pink', hex: '#FBCFE8' },
      { name: 'Soft Peach', hex: '#FFEDD5' },
      { name: 'Beige Cream', hex: '#F5F5DC' },
      { name: 'Lilac', hex: '#D8B4FE' },
      { name: 'Slate Grey', hex: '#E2E8F0' }
    ],
    image: 'bg-gradient-to-tr from-rose-100 to-pink-200',
    features: ['Pinggiran Laser Cut eksklusif', 'Tegak sempurna di dahi', 'Serat kain padat & lembut', 'Anti kusut tanpa disetrika'],
    stock: 25,
    badge: 'Eksklusif'
  },
  {
    id: 'p3',
    name: 'Bella Square Daily',
    category: 'Segi Empat',
    price: 35000,
    description: 'Hijab segi empat paling populer untuk penggunaan sehari-hari. Berbahan double hycon yang adem, lembut, mudah dibentuk, serta tersedia dalam puluhan warna pastel yang manis dan ceria.',
    rating: 4.7,
    reviewsCount: 540,
    material: 'Double Hycon Premium',
    size: '115 x 115 cm',
    colors: [
      { name: 'Dusty Rose', hex: '#F43F5E' },
      { name: 'Soft Pink', hex: '#FCE7F3' },
      { name: 'Milk Tea', hex: '#E5BA73' },
      { name: 'Navy Blue', hex: '#1E3A8A' },
      { name: 'Black Coal', hex: '#111827' }
    ],
    image: 'bg-gradient-to-tr from-pink-100 to-red-100',
    features: ['Sangat terjangkau', 'Neci rapi di semua sisi', 'Ringan dan menyerap keringat', 'Mudah dimodelkan apa saja'],
    stock: 50,
    badge: 'Terpopuler'
  },
  {
    id: 'p4',
    name: 'Khimar Syar\'i Elena Ceruty',
    category: 'Instan',
    price: 135000,
    description: 'Khimar instan syar\'i dua layer dengan desain pet antem (anti tembem) yang membingkai wajah dengan sempurna. Anggun, menutup dada dan punggung, serta menggunakan bahan ceruty premium yang anggun.',
    rating: 4.9,
    reviewsCount: 88,
    material: 'Premium Ceruty Baby Doll Dual-Layer',
    size: 'Depan 90 cm, Belakang 120 cm',
    colors: [
      { name: 'Sakura Pink', hex: '#FFE4E1' },
      { name: 'Deep Rose', hex: '#9E3D60' },
      { name: 'Soft Mocca', hex: '#C68B59' },
      { name: 'Midnight Navy', hex: '#0F172A' },
      { name: 'Emerald', hex: '#064E3B' }
    ],
    image: 'bg-gradient-to-tr from-rose-200 to-amber-200',
    features: ['Pet Antem (Anti Tembem)', 'Desain Double Layer tidak menerawang', 'Menutup dada dan pantat', 'Tekstur pasir eksklusif'],
    stock: 12,
    badge: 'Syar\'i Elegant'
  },
  {
    id: 'p5',
    name: 'Pashmina Plisket Full (No Seam)',
    category: 'Pashmina',
    price: 65000,
    description: 'Pashmina plisket premium dengan lipatan konsisten, lembut, dan tanpa garis tengah. Memberikan kesan kasual yang stylish, modis, dan menghemat waktu Anda karena tidak perlu disetrika.',
    rating: 4.6,
    reviewsCount: 172,
    material: 'Plisket Premium Ceruty',
    size: '175 x 75 cm (sebelum diplisket)',
    colors: [
      { name: 'Baby Pink', hex: '#FFDBE9' },
      { name: 'Camel Brown', hex: '#D7A15C' },
      { name: 'Matcha Green', hex: '#A9DFBF' },
      { name: 'Charcoal Grey', hex: '#374151' },
      { name: 'Nude Almond', hex: '#ECCDB4' }
    ],
    image: 'bg-gradient-to-tr from-pink-100 to-purple-100',
    features: ['Lipatan plisket lurus konsisten', 'Tidak ada garis sambungan tengah', 'Anti kusut & anti ribet', 'Memberikan volume indah'],
    stock: 30,
    badge: 'Best Seller'
  },
  {
    id: 'p6',
    name: 'Instant Jersey Sport & Daily Al-Meka',
    category: 'Instan',
    price: 49000,
    description: 'Hijab instan bergo berbahan jersey premium yang elastis, dingin, dan lembut. Sangat nyaman untuk olahraga, kuliah online, belanja ke pasar, maupun bersantai di rumah. Dilengkapi dengan pet busa mini.',
    rating: 4.8,
    reviewsCount: 312,
    material: 'Jersey Premium Stretch',
    size: 'Depan 70 cm, Belakang 80 cm',
    colors: [
      { name: 'Rosewood', hex: '#651A14' },
      { name: 'Blush Pink', hex: '#EFA4BC' },
      { name: 'Deep Grey', hex: '#4B5563' },
      { name: 'Soft Mint', hex: '#E8F8F5' },
      { name: 'Snow White', hex: '#FFFFFF' }
    ],
    image: 'bg-gradient-to-tr from-rose-200 to-pink-300',
    features: ['Bahan jersey melar & adem', 'Pinggiran dijahit kelim mini', 'Menutup dada secara proporsional', 'Anti pusing & menyerap keringat'],
    stock: 40,
    badge: 'Diskon'
  },
  {
    id: 'p7',
    name: 'Voal Plain Scarf Satin Edge',
    category: 'Voal',
    price: 95000,
    description: 'Paduan kelembutan voal premium berpita list satin sutra yang mengkilap di bagian pinggir. Tampilan berkelas yang mempercantik gaya busana syar\'i maupun semi-formal harian Anda.',
    rating: 4.9,
    reviewsCount: 64,
    material: 'Voal Ultrafine mix Satin Glossy Ribbon',
    size: '120 x 120 cm',
    colors: [
      { name: 'Chiffon Pink', hex: '#FFEDF7' },
      { name: 'Golden Nude', hex: '#EAA484' },
      { name: 'Muted Mauve', hex: '#937E88' },
      { name: 'Deep Sage', hex: '#879F84' }
    ],
    image: 'bg-gradient-to-tr from-orange-100 to-rose-200',
    features: ['Bahan Voal bernapas tinggi', 'Hiasan satin ribbon mewah', 'Ukuran lebar mudah dimodifikasi', 'Kemasan pouch eksklusif'],
    stock: 18,
    badge: 'Premium'
  },
  {
    id: 'p8',
    name: 'Pashmina Instant Oval Inner',
    category: 'Instan',
    price: 79000,
    description: 'Pashmina yang sudah terjahit langsung dengan inner (ciput) premium di dalamnya. Bagian belakang didesain berbentuk oval membulat sehingga menutupi rambut leher dan punggung secara total dan rapi.',
    rating: 4.7,
    reviewsCount: 145,
    material: 'Ceruty Baby Doll + Inner Jersey',
    size: '175 x 70 cm',
    colors: [
      { name: 'Watermelon Pink', hex: '#FF6F91' },
      { name: 'Sand Brown', hex: '#E6C594' },
      { name: 'Olive Green', hex: '#A8B896' },
      { name: 'Navy Blue', hex: '#2C3E50' },
      { name: 'Basic Black', hex: '#1A1A1A' }
    ],
    image: 'bg-gradient-to-tr from-pink-200 to-indigo-100',
    features: ['Sudah terjahit dengan ciput bandana', 'Ujung pashmina berbentuk oval anggun', 'Tidak menerawang di kepala', 'Sangat hemat waktu berdandan'],
    stock: 22,
    badge: 'Terlaris'
  }
];

export const couriers = [
  { name: 'Sicepat Reguler', cost: 12000, time: '2-3 Hari' },
  { name: 'JNE Reguler', cost: 15000, time: '2-4 Hari' },
  { name: 'J&T Express', cost: 14000, time: '1-3 Hari' },
  { name: 'Meka Instant Delivery (Promo)', cost: 5000, time: '1 Hari' }
];

export const formatRupiah = (value: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(value);
};
