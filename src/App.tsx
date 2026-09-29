/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { PRODUCTS } from './data/products';
import { Product, CartItem, UserAccount, Order } from './types';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProductCard } from './components/ProductCard';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { Login } from './components/Login';
import { Cadastro } from './components/Cadastro';
import { EsqueciSenha } from './components/EsqueciSenha';
import { SizeGuideModal } from './components/SizeGuideModal';
import { ProfileView } from './components/ProfileView';
import { CraftsmanshipSection } from './components/CraftsmanshipSection';
import { Footer } from './components/Footer';
import { Check, Sparkles, Filter, Search, ArrowRight } from 'lucide-react';

const INITIAL_DEMO_USER: UserAccount = {
  name: 'Ana Ferreira',
  email: 'ana.ferreira@email.com',
  rg: '45.123.789-0',
  cpf: '321.654.987-00',
  address: 'Rua das Orquídeas, 240, Jardim São Luiz',
  cep: '14402-100',
  city: 'Franca',
  state: 'SP',
  country: 'Brasil',
  birthDate: '1992-04-18',
};

export default function App() {
  // Navigation View State
  const [currentView, setCurrentView] = useState<'home' | 'login' | 'cadastro' | 'esqueci-senha' | 'profile'>('home');

  // Authentication State
  const [currentUser, setCurrentUser] = useState<UserAccount | null>(() => {
    try {
      const saved = localStorage.getItem('calcados_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [savedUsers, setSavedUsers] = useState<UserAccount[]>(() => {
    try {
      const saved = localStorage.getItem('calcados_registered_users');
      return saved ? JSON.parse(saved) : [INITIAL_DEMO_USER];
    } catch {
      return [INITIAL_DEMO_USER];
    }
  });

  // Shopping Bag / Cart State
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('calcados_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Orders State
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('calcados_orders');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Coupon State
  const [discount, setDiscount] = useState<number>(0);
  const [couponCode, setCouponCode] = useState<string>('');

  // Modals & Drawers
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Filters & Search
  const [activeCategory, setActiveCategory] = useState<'todos' | 'rasteiras' | 'saltos' | 'tenis' | 'mocassins'>('todos');
  const [searchQuery, setSearchQuery] = useState('');

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const collectionRef = useRef<HTMLDivElement>(null);

  // Sync state to localStorage
  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem('calcados_user', JSON.stringify(currentUser));
      } else {
        localStorage.removeItem('calcados_user');
      }
    } catch (e) {
      console.error(e);
    }
  }, [currentUser]);

  useEffect(() => {
    try {
      localStorage.setItem('calcados_registered_users', JSON.stringify(savedUsers));
    } catch (e) {
      console.error(e);
    }
  }, [savedUsers]);

  useEffect(() => {
    try {
      localStorage.setItem('calcados_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error(e);
    }
  }, [cartItems]);

  useEffect(() => {
    try {
      localStorage.setItem('calcados_orders', JSON.stringify(orders));
    } catch (e) {
      console.error(e);
    }
  }, [orders]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  // Cart operations
  const handleAddToCart = (product: Product, size: number, quantity: number = 1) => {
    setCartItems((prev) => {
      const existingIdx = prev.findIndex(
        (it) => it.product.id === product.id && it.size === size
      );

      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += quantity;
        return updated;
      }
      return [...prev, { product, size, quantity }];
    });
    showToast(`Adicionado à sacola: ${product.name} (Tam: ${size})`);
  };

  const handleUpdateQuantity = (index: number, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(index);
      return;
    }
    setCartItems((prev) => {
      const updated = [...prev];
      updated[index].quantity = newQty;
      return updated;
    });
  };

  const handleRemoveItem = (index: number) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
    showToast('Item removido da sacola');
  };

  const handleApplyCoupon = (code: string) => {
    if (code === 'PRIMEIRACOMPRA' || code === 'BEMVINDA10' || code === 'COURO10') {
      setDiscount(0.1);
      setCouponCode(code);
      return true;
    }
    return false;
  };

  const handleOrderPlaced = (newOrder: Order) => {
    setOrders((prev) => [newOrder, ...prev]);
    setCartItems([]);
    showToast(`Pedido ${newOrder.id} realizado com sucesso!`);
  };

  // Auth operations
  const handleLoginSuccess = (user: UserAccount) => {
    setCurrentUser(user);
    setCurrentView('home');
    showToast(`Bem-vinda de volta, ${user.name.split(' ')[0]}!`);
  };

  const handleRegisterSuccess = (newUser: UserAccount) => {
    setSavedUsers((prev) => [...prev, newUser]);
    setCurrentUser(newUser);
    setCurrentView('home');
    showToast(`Cadastro realizado com sucesso! Seja bem-vinda, ${newUser.name.split(' ')[0]}.`);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentView('home');
    showToast('Você saiu da sua conta.');
  };

  const scrollToCollection = () => {
    if (currentView !== 'home') {
      setCurrentView('home');
      setTimeout(() => {
        collectionRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      collectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCategoryScroll = (category: string) => {
    setActiveCategory(category as any);
    scrollToCollection();
  };

  // Filter products
  const filteredProducts = PRODUCTS.filter((product) => {
    const matchesCategory =
      activeCategory === 'todos' || product.category === activeCategory;
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.material.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const cartTotalItems = cartItems.reduce((acc, it) => acc + it.quantity, 0);
  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discountAmount = subtotal * discount;
  const shippingCost = subtotal >= 299 || cartItems.length === 0 ? 0 : 19.90;
  const finalTotal = Math.max(0, subtotal - discountAmount + shippingCost);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#241F1C]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#241F1C] text-white px-4 py-3 rounded-xl shadow-lg border border-[#443831] text-xs font-semibold flex items-center gap-2 animate-in slide-in-from-bottom-5 duration-300">
          <Check className="w-4 h-4 text-[#4ADE80]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Header with Top Bar Contract */}
      <Header
        currentUser={currentUser}
        cartCount={cartTotalItems}
        onOpenCart={() => setIsCartOpen(true)}
        onNavigate={(view) => {
          setCurrentView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
        onScrollToCategory={handleCategoryScroll}
        onLogout={handleLogout}
        currentView={currentView}
      />

      {/* View Routing */}
      {currentView === 'login' && (
        <Login
          onLoginSuccess={handleLoginSuccess}
          onNavigate={(view) => {
            setCurrentView(view);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          savedUsers={savedUsers}
        />
      )}

      {currentView === 'cadastro' && (
        <Cadastro
          onRegisterSuccess={handleRegisterSuccess}
          onNavigate={(view) => {
            setCurrentView(view);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      )}

      {currentView === 'esqueci-senha' && (
        <EsqueciSenha
          onNavigate={(view) => {
            setCurrentView(view);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      )}

      {currentView === 'profile' && currentUser && (
        <ProfileView
          user={currentUser}
          orders={orders}
          onLogout={handleLogout}
          onNavigate={(view) => {
            setCurrentView(view);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      )}

      {currentView === 'home' && (
        <main className="flex-1">
          {/* Hero Campaign Section */}
          <Hero onExploreClick={scrollToCollection} />

          {/* Collection Showcase Section */}
          <section ref={collectionRef} className="py-14 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-[#EAE4DC]">
              <div>
                <span className="text-xs uppercase tracking-[0.25em] text-[#9E6F45] font-semibold">
                  Catálogo Selecionado
                </span>
                <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-[#241F1C] mt-1">
                  Nossos Modelos em Couro
                </h2>
                <p className="text-xs sm:text-sm text-[#7A6D61] mt-1">
                  Design autoral com bicos, tiras e solados desenvolvidos para o máximo conforto
                </p>
              </div>

              {/* Search & Category Filter Controls (interactive segmented buttons) */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                {/* Search Bar */}
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Buscar modelo..."
                    className="w-full sm:w-48 pl-8 pr-3 py-2 text-xs bg-white border border-[#DDD4C9] rounded-lg focus:outline-none focus:border-[#241F1C] text-[#241F1C]"
                  />
                  <Search className="w-3.5 h-3.5 text-[#8C7D70] absolute left-2.5 top-2.5" />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-2 top-2 text-[10px] text-[#8C7D70] hover:text-[#241F1C]"
                    >
                      Limpar
                    </button>
                  )}
                </div>

                {/* Filter Tabs */}
                <div className="flex items-center gap-1 p-1 bg-[#EFE9DF] rounded-lg overflow-x-auto">
                  <button
                    onClick={() => setActiveCategory('todos')}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                      activeCategory === 'todos'
                        ? 'bg-white text-[#241F1C] shadow-xs'
                        : 'text-[#66584C] hover:text-[#241F1C]'
                    }`}
                  >
                    Todos ({PRODUCTS.length})
                  </button>

                  <button
                    onClick={() => setActiveCategory('rasteiras')}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                      activeCategory === 'rasteiras'
                        ? 'bg-white text-[#241F1C] shadow-xs'
                        : 'text-[#66584C] hover:text-[#241F1C]'
                    }`}
                  >
                    Rasteiras
                  </button>

                  <button
                    onClick={() => setActiveCategory('saltos')}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                      activeCategory === 'saltos'
                        ? 'bg-white text-[#241F1C] shadow-xs'
                        : 'text-[#66584C] hover:text-[#241F1C]'
                    }`}
                  >
                    Saltos
                  </button>

                  <button
                    onClick={() => setActiveCategory('tenis')}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                      activeCategory === 'tenis'
                        ? 'bg-white text-[#241F1C] shadow-xs'
                        : 'text-[#66584C] hover:text-[#241F1C]'
                    }`}
                  >
                    Tênis
                  </button>

                  <button
                    onClick={() => setActiveCategory('mocassins')}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                      activeCategory === 'mocassins'
                        ? 'bg-white text-[#241F1C] shadow-xs'
                        : 'text-[#66584C] hover:text-[#241F1C]'
                    }`}
                  >
                    Mocassins
                  </button>
                </div>
              </div>
            </div>

            {/* Product Grid: 3 columns desktop, 2 tablet, 1 mobile */}
            {filteredProducts.length === 0 ? (
              <div className="py-16 text-center bg-white rounded-2xl border border-[#EAE4DC] p-8">
                <p className="font-serif-display text-xl font-bold text-[#241F1C]">
                  Nenhum modelo encontrado com esse filtro
                </p>
                <p className="text-xs text-[#7A6D61] mt-1">
                  Tente limpar a busca ou selecionar outra categoria.
                </p>
                <button
                  onClick={() => {
                    setActiveCategory('todos');
                    setSearchQuery('');
                  }}
                  className="mt-4 px-4 py-2 bg-[#241F1C] text-white text-xs font-semibold rounded-lg"
                >
                  Ver Todos os Modelos
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onQuickView={(p) => setSelectedProduct(p)}
                    onAddToCart={(p, sz) => handleAddToCart(p, sz, 1)}
                  />
                ))}
              </div>
            )}
          </section>

          {/* Craftsmanship & Leather story */}
          <CraftsmanshipSection />
        </main>
      )}

      {/* Footer */}
      <Footer
        onNavigate={(view) => {
          setCurrentView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
        onScrollToCategory={handleCategoryScroll}
      />

      {/* Product Detail Modal */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={(prod, sz, qty) => handleAddToCart(prod, sz, qty)}
        onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
      />

      {/* Cart Slide-over Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={() => setIsCheckoutOpen(true)}
        discount={discount}
        onApplyCoupon={handleApplyCoupon}
        couponCode={couponCode}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        subtotal={subtotal}
        discount={discountAmount}
        shipping={shippingCost}
        total={finalTotal}
        currentUser={currentUser}
        onOrderPlaced={handleOrderPlaced}
      />

      {/* Size Guide Modal */}
      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
      />
    </div>
  );
}
