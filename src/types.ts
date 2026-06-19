export type Category = 'Semua' | 'Pashmina' | 'Voal' | 'Segi Empat' | 'Instan' | 'Premium';

export interface ProductColor {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  name: string;
  category: Category;
  price: number;
  description: string;
  rating: number;
  reviewsCount: number;
  material: string;
  size: string;
  colors: ProductColor[];
  image: string; // Tailwind color grade or placeholder illustration background
  features: string[];
  stock: number;
  badge?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor: ProductColor;
}

export interface ShippingDetails {
  fullName: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  courier: string;
  shippingCost: number;
}

export interface PaymentDetails {
  method: 'QRIS' | 'GoPay' | 'ShopeePay' | 'Transfer BCA' | 'Transfer Mandiri';
  accountName: string;
  accountNumber?: string;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  shipping: ShippingDetails;
  payment: PaymentDetails;
  subtotal: number;
  shippingCost: number;
  total: number;
  status: 'Menunggu Pembayaran' | 'Diproses' | 'Dikirim' | 'Selesai';
}
