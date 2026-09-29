import React from 'react';
import { ShoppingBag, User as UserIcon, LogOut, CheckCircle2 } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { UserAccount } from '../types';

interface HeaderProps {
  currentUser: UserAccount | null;
  cartCount: number;
  onOpenCart: () => void;
  onNavigate: (view: 'home' | 'login' | 'cadastro' | 'profile' | 'esqueci-senha') => void;
  onOpenSizeGuide: () => void;
  onScrollToCategory: (category: string) => void;
  onLogout: () => void;
  currentView: string;
}

export const Header: React.FC<HeaderProps> = ({
  currentUser,
  cartCount,
  onOpenCart,
  onNavigate,
  onOpenSizeGuide,
  onScrollToCategory,
  onLogout,
  currentView,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#EAE4DC] transition-all">
      {/* Promotional Top Bar */}
      <div className="bg-[#241F1C] text-[#EFEBE4] text-[11px] sm:text-xs py-1.5 px-4 text-center font-medium tracking-wide">
        <span className="opacity-90">✨ Frete Grátis acima de R$ 299 para todo o Brasil</span>
        <span className="hidden sm:inline mx-2 opacity-50">·</span>
        <span className="hidden sm:inline opacity-90">Parcelamento em até 6x sem juros no cartão</span>
      </div>

      {/* Main Navigation (3-Zone Top Bar Contract) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Zone 1: Brand title wordmark */}
        <button 
          onClick={() => onNavigate('home')} 
          className="flex items-center text-left focus:outline-none group"
          aria-label="Página Inicial da Loja de Calçados de Couro"
        >
          <BrandLogo size="md" />
        </button>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#4A4036]">
          <button
            onClick={() => {
              onNavigate('home');
              onScrollToCategory('todos');
            }}
            className={`transition-colors hover:text-[#241F1C] py-1 border-b-2 ${
              currentView === 'home' ? 'border-[#B58263] text-[#241F1C]' : 'border-transparent'
            }`}
          >
            Coleção Completa
          </button>
          
          <button
            onClick={() => {
              onNavigate('home');
              onScrollToCategory('rasteiras');
            }}
            className="transition-colors hover:text-[#241F1C] py-1 border-b-2 border-transparent"
          >
            Rasteiras
          </button>

          <button
            onClick={() => {
              onNavigate('home');
              onScrollToCategory('saltos');
            }}
            className="transition-colors hover:text-[#241F1C] py-1 border-b-2 border-transparent"
          >
            Saltos
          </button>

          <button
            onClick={() => {
              onNavigate('home');
              onScrollToCategory('tenis');
            }}
            className="transition-colors hover:text-[#241F1C] py-1 border-b-2 border-transparent"
          >
            Tênis & Mocassins
          </button>

          <button
            onClick={onOpenSizeGuide}
            className="transition-colors hover:text-[#241F1C] py-1 border-b-2 border-transparent text-[#9E6F45]"
          >
            Guia de Medidas
          </button>
        </nav>

        {/* Zone 3: Primary Actions (User Account + Bag) */}
        <div className="flex items-center gap-3 sm:gap-4">
          {currentUser ? (
            <div className="relative group">
              <button
                onClick={() => onNavigate('profile')}
                className="flex items-center gap-2 text-xs sm:text-sm font-medium text-[#241F1C] bg-[#EFE9DF] hover:bg-[#E4DCCE] px-3 py-2 rounded-lg transition-colors whitespace-nowrap"
                title="Minha Conta"
              >
                <div className="w-5 h-5 rounded-full bg-[#B58263] text-white flex items-center justify-center text-[10px] font-bold">
                  {currentUser.name.charAt(0).toUpperCase()}
                </div>
                <span className="hidden sm:inline max-w-[120px] truncate">
                  {currentUser.name.split(' ')[0]}
                </span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => onNavigate('login')}
                className={`text-xs sm:text-sm font-medium px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
                  currentView === 'login'
                    ? 'text-[#241F1C] bg-[#ECE5DB]'
                    : 'text-[#4A4036] hover:text-[#241F1C] hover:bg-[#F2ECE3]'
                }`}
              >
                Entrar
              </button>

              <button
                onClick={() => onNavigate('cadastro')}
                className={`text-xs sm:text-sm font-medium px-3.5 py-1.5 rounded-lg transition-colors whitespace-nowrap hidden sm:inline-block ${
                  currentView === 'cadastro'
                    ? 'bg-[#241F1C] text-white'
                    : 'bg-[#B58263] hover:bg-[#9E6F45] text-white shadow-xs'
                }`}
              >
                Cadastre-se
              </button>
            </div>
          )}

          {/* Cart Bag Button */}
          <button
            onClick={onOpenCart}
            className="relative p-2.5 rounded-lg text-[#241F1C] hover:bg-[#EFEAE2] transition-colors focus:outline-none"
            aria-label="Abrir Sacola de Compras"
          >
            <ShoppingBag className="w-5 h-5 text-[#241F1C]" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#241F1C] text-white text-[11px] font-semibold w-5 h-5 rounded-full flex items-center justify-center shadow-xs">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
