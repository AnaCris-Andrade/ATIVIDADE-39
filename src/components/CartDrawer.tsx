import React, { useState } from 'react';
import { CartItem } from '../types';
import { X, Trash2, ShoppingBag, ArrowRight, Tag, Truck } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (index: number, newQty: number) => void;
  onRemoveItem: (index: number) => void;
  onProceedToCheckout: () => void;
  discount: number;
  onApplyCoupon: (code: string) => boolean;
  couponCode: string;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  discount,
  onApplyCoupon,
  couponCode,
}) => {
  const [couponInput, setCouponInput] = useState('');
  const [couponMsg, setCouponMsg] = useState<{ text: string; isError: boolean } | null>(null);
  const [cepInput, setCepInput] = useState('');
  const [freteCalc, setFreteCalc] = useState<{ valor: number; prazo: string } | null>(null);

  if (!isOpen) return null;

  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const shippingCost = subtotal >= 299 || freteCalc?.valor === 0 ? 0 : (items.length > 0 ? 19.90 : 0);
  const discountAmount = subtotal * discount;
  const total = Math.max(0, subtotal - discountAmount + shippingCost);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const success = onApplyCoupon(couponInput.trim().toUpperCase());
    if (success) {
      setCouponMsg({ text: 'Cupom de 10% aplicado com sucesso!', isError: false });
    } else {
      setCouponMsg({ text: 'Cupom inválido. Use PRIMEIRACOMPRA', isError: true });
    }
  };

  const handleCalcCep = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCep = cepInput.replace(/\D/g, '');
    if (cleanCep.length === 8) {
      if (subtotal >= 299) {
        setFreteCalc({ valor: 0, prazo: '3 a 6 dias úteis (Frete Grátis)' });
      } else {
        setFreteCalc({ valor: 19.90, prazo: '3 a 6 dias úteis - SEDEX Express' });
      }
    } else {
      setCouponMsg({ text: 'Digite um CEP válido com 8 dígitos', isError: true });
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end">
      <div 
        className="w-full max-w-md bg-[#FAF8F5] h-full shadow-2xl flex flex-col border-l border-[#E2D8CC] animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="px-6 py-5 border-b border-[#EAE4DC] flex items-center justify-between bg-white">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#241F1C]" />
            <h2 className="font-serif-display text-xl font-bold text-[#241F1C]">
              Sua Sacola ({items.reduce((acc, it) => acc + it.quantity, 0)})
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#6E6054] hover:text-[#241F1C] hover:bg-[#F2ECE3] transition-colors"
            aria-label="Fechar Sacola"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress bar */}
        <div className="bg-[#F5EFE6] px-6 py-2.5 border-b border-[#EAE4DC] text-xs text-[#5C5046]">
          {subtotal >= 299 ? (
            <span className="font-semibold text-[#2E7D32] flex items-center gap-1.5">
              🎉 Parabéns! Você ganhou Frete Grátis!
            </span>
          ) : (
            <div>
              <span>
                Faltam apenas{' '}
                <strong className="text-[#241F1C]">
                  {(299 - subtotal).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </strong>{' '}
                para frete grátis!
              </span>
              <div className="w-full bg-[#E5DDD0] h-1.5 rounded-full mt-1.5 overflow-hidden">
                <div
                  className="bg-[#B58263] h-full rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(100, (subtotal / 299) * 100)}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto px-6 py-4 divide-y divide-[#EFEAE2]">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <ShoppingBag className="w-12 h-12 text-[#C4B7AA] mb-3 stroke-[1.5]" />
              <p className="font-serif-display text-lg font-bold text-[#241F1C]">
                Sua sacola está vazia
              </p>
              <p className="text-xs text-[#7A6D61] mt-1 max-w-xs">
                Explore nossos calçados em couro legítimo e adicione seus modelos favoritos.
              </p>
              <button
                onClick={onClose}
                className="mt-6 px-5 py-2.5 bg-[#241F1C] hover:bg-[#3D332B] text-white text-xs font-semibold rounded-lg uppercase tracking-wider transition-colors"
              >
                Explorar Coleção
              </button>
            </div>
          ) : (
            items.map((item, idx) => (
              <div key={`${item.product.id}-${item.size}-${idx}`} className="py-4 flex gap-4">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-20 h-20 rounded-lg object-cover bg-[#F2ECE3] border border-[#E4DCCE] shrink-0"
                  referrerPolicy="no-referrer"
                />

                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="text-sm font-bold text-[#241F1C] leading-snug">
                        {item.product.name}
                      </h4>
                      <div className="flex items-center gap-2 text-xs text-[#7A6D61] mt-0.5">
                        <span>Tam: <strong className="text-[#241F1C]">{item.size}</strong></span>
                        {item.color && (
                          <>
                            <span>&bull;</span>
                            <span>{item.color}</span>
                          </>
                        )}
                      </div>
                    </div>

                    <button
                      onClick={() => onRemoveItem(idx)}
                      className="text-[#9E8D7F] hover:text-[#C62828] p-1 transition-colors"
                      title="Remover produto"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    {/* Stepper */}
                    <div className="flex items-center border border-[#DDD4C9] bg-white rounded-md text-xs">
                      <button
                        onClick={() => onUpdateQuantity(idx, item.quantity - 1)}
                        className="px-2 py-1 hover:bg-[#F2ECE3] font-bold text-[#241F1C]"
                      >
                        -
                      </button>
                      <span className="px-2.5 font-semibold text-[#241F1C] tabular-nums">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(idx, item.quantity + 1)}
                        className="px-2 py-1 hover:bg-[#F2ECE3] font-bold text-[#241F1C]"
                      >
                        +
                      </button>
                    </div>

                    <span className="text-sm font-bold text-[#241F1C] tabular-nums font-mono">
                      {(item.product.price * item.quantity).toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                      })}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer with Calculations and Checkout */}
        {items.length > 0 && (
          <div className="p-6 bg-white border-t border-[#EAE4DC] space-y-3">
            {/* Cupom de desconto */}
            <form onSubmit={handleApplyCoupon} className="flex gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Cupom (ex: PRIMEIRACOMPRA)"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                  className="w-full text-xs px-3 py-2 border border-[#DDD4C9] rounded-lg bg-[#FAF8F5] focus:outline-none focus:border-[#241F1C] uppercase"
                />
              </div>
              <button
                type="submit"
                className="px-3 py-2 bg-[#F0EAE1] hover:bg-[#E5DEC4] text-[#241F1C] text-xs font-semibold rounded-lg transition-colors whitespace-nowrap"
              >
                Aplicar
              </button>
            </form>

            {couponMsg && (
              <p className={`text-[11px] font-medium ${couponMsg.isError ? 'text-[#C62828]' : 'text-[#2E7D32]'}`}>
                {couponMsg.text}
              </p>
            )}

            {/* Calculations Breakdown */}
            <div className="space-y-1.5 pt-2 text-xs text-[#5C5046] border-t border-[#F2ECE4]">
              <div className="flex justify-between">
                <span>Subtotal dos produtos</span>
                <span className="tabular-nums font-medium text-[#241F1C]">
                  {subtotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between text-[#2E7D32]">
                  <span>Desconto cupom (10%)</span>
                  <span className="tabular-nums font-medium">
                    - {discountAmount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  </span>
                </div>
              )}

              <div className="flex justify-between">
                <span className="flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5" />
                  Frete
                </span>
                <span className="tabular-nums font-medium">
                  {shippingCost === 0 ? (
                    <span className="text-[#2E7D32] font-semibold">GRÁTIS</span>
                  ) : (
                    shippingCost.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
                  )}
                </span>
              </div>

              <div className="flex justify-between text-base font-bold text-[#241F1C] pt-2 border-t border-[#EAE4DC]">
                <span>Total</span>
                <span className="tabular-nums font-mono">
                  {total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </span>
              </div>
            </div>

            {/* Primary Checkout CTA */}
            <button
              onClick={() => {
                onClose();
                onProceedToCheckout();
              }}
              className="w-full py-3.5 px-4 bg-[#241F1C] hover:bg-[#3D332B] text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-colors shadow-xs flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Finalizar Compra</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
