export interface Product {
  id: string;
  name: string;
  category: 'rasteiras' | 'saltos' | 'tenis' | 'mocassins';
  categoryLabel: string;
  price: number;
  originalPrice?: number;
  description: string;
  details: string[];
  image: string;
  sizes: number[];
  colors: string[];
  material: string;
  highlight?: string;
}

export interface CartItem {
  product: Product;
  size: number;
  color?: string;
  quantity: number;
}

export interface UserAccount {
  name: string;
  email: string;
  rg: string;
  cpf: string;
  address: string;
  cep: string;
  city: string;
  state: string;
  country: string;
  birthDate: string;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  paymentMethod: 'pix' | 'credit_card' | 'boleto';
  status: 'Confirmado' | 'Preparando Envio' | 'A caminho' | 'Entregue';
  trackingCode: string;
  address: {
    street: string;
    city: string;
    state: string;
    cep: string;
  };
}
