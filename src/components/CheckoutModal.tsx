import React, { useState } from 'react';
import { CartItem, Order, UserAccount } from '../types';
import { X, CheckCircle2, ShieldCheck, CreditCard, QrCode, FileText, ArrowRight, Truck } from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  currentUser: UserAccount | null;
  onOrderPlaced: (order: Order) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  subtotal,
  discount,
  shipping,
  total,
  currentUser,
  onOrderPlaced,
}) => {
  if (!isOpen) return null;

  const [paymentMethod, setPaymentMethod] = useState<'pix' | 'credit_card' | 'boleto'>('pix');
  const [addressData, setAddressData] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    cpf: currentUser?.cpf || '',
    street: currentUser?.address || '',
    cep: currentUser?.cep || '',
    city: currentUser?.city || 'Franca',
    state: currentUser?.state || 'SP',
  });

  const [cardData, setCardData] = useState({
    number: '',
    holder: '',
    expiry: '',
    cvv: '',
    installments: '1',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const orderId = `CC-${Math.floor(100000 + Math.random() * 900000)}`;
      const trackingCode = `BR${Math.floor(100000000 + Math.random() * 900000000)}CO`;

      const newOrder: Order = {
        id: orderId,
        date: new Date().toLocaleDateString('pt-BR'),
        items: [...items],
        subtotal,
        discount,
        shipping,
        total,
        paymentMethod,
        status: 'Confirmado',
        trackingCode,
        address: {
          street: addressData.street || 'Endereço Principal',
          city: addressData.city || 'São Paulo',
          state: addressData.state || 'SP',
          cep: addressData.cep || '01000-000',
        },
      };

      setCompletedOrder(newOrder);
      onOrderPlaced(newOrder);
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        className="relative bg-[#FAF8F5] rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl border border-[#E4DCCE] animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 bg-white border-b border-[#EAE4DC] flex items-center justify-between">
          <div>
            <span className="text-[11px] uppercase tracking-wider text-[#9E6F45] font-semibold">
              Checkout Seguro 256-bit
            </span>
            <h2 className="font-serif-display text-xl font-bold text-[#241F1C]">
              {completedOrder ? 'Pedido Concluído com Sucesso' : 'Finalizar seu Pedido'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#6E6054] hover:text-[#241F1C] hover:bg-[#F2ECE3] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* If Order Placed successfully */}
        {completedOrder ? (
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-[#E8F5E9] text-[#2E7D32] rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <h3 className="font-serif-display text-2xl font-bold text-[#241F1C]">
              Obrigado pela sua compra!
            </h3>
            <p className="text-sm text-[#5C5046] mt-2 max-w-md mx-auto">
              Seu pedido foi confirmado e nossa equipe já está separando seus calçados de couro com todo o cuidado artesanal.
            </p>

            <div className="mt-6 bg-white p-5 rounded-xl border border-[#EAE4DC] text-left max-w-md mx-auto space-y-2 text-xs">
              <div className="flex justify-between pb-2 border-b border-[#F2ECE4]">
                <span className="text-[#7A6D61]">Número do Pedido:</span>
                <span className="font-bold text-[#241F1C] font-mono">{completedOrder.id}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-[#F2ECE4]">
                <span className="text-[#7A6D61]">Código de Rastreamento:</span>
                <span className="font-bold text-[#241F1C] font-mono">{completedOrder.trackingCode}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-[#F2ECE4]">
                <span className="text-[#7A6D61]">Forma de Pagamento:</span>
                <span className="font-semibold text-[#241F1C] uppercase">{completedOrder.paymentMethod}</span>
              </div>
              <div className="flex justify-between pt-1 text-sm font-bold text-[#241F1C]">
                <span>Valor Total Pago:</span>
                <span className="tabular-nums font-mono">
                  {completedOrder.total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </span>
              </div>
            </div>

            <div className="mt-8 flex justify-center gap-3">
              <button
                onClick={onClose}
                className="px-6 py-3 bg-[#241F1C] hover:bg-[#3D332B] text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-colors"
              >
                Continuar Comprando
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 max-h-[80vh] overflow-y-auto space-y-6">
            {/* Delivery address */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#3D332B] mb-3 flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#9E6F45]" />
                1. Endereço de Entrega
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-[#4A4036] font-medium mb-1">Nome Completo *</label>
                  <input
                    type="text"
                    required
                    value={addressData.name}
                    onChange={(e) => setAddressData({ ...addressData, name: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-[#DDD4C9] rounded-lg focus:outline-none focus:border-[#241F1C]"
                    placeholder="Seu nome"
                  />
                </div>

                <div>
                  <label className="block text-[#4A4036] font-medium mb-1">E-mail para Rastreio *</label>
                  <input
                    type="email"
                    required
                    value={addressData.email}
                    onChange={(e) => setAddressData({ ...addressData, email: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-[#DDD4C9] rounded-lg focus:outline-none focus:border-[#241F1C]"
                    placeholder="seuemail@exemplo.com"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[#4A4036] font-medium mb-1">Endereço Completo com Número e Bairro *</label>
                  <input
                    type="text"
                    required
                    value={addressData.street}
                    onChange={(e) => setAddressData({ ...addressData, street: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-[#DDD4C9] rounded-lg focus:outline-none focus:border-[#241F1C]"
                    placeholder="Rua / Avenida, Número, Bairro, Complemento"
                  />
                </div>

                <div>
                  <label className="block text-[#4A4036] font-medium mb-1">CEP *</label>
                  <input
                    type="text"
                    required
                    maxLength={9}
                    value={addressData.cep}
                    onChange={(e) => setAddressData({ ...addressData, cep: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-[#DDD4C9] rounded-lg focus:outline-none focus:border-[#241F1C]"
                    placeholder="00000-000"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[#4A4036] font-medium mb-1">Cidade</label>
                    <input
                      type="text"
                      required
                      value={addressData.city}
                      onChange={(e) => setAddressData({ ...addressData, city: e.target.value })}
                      className="w-full px-3 py-2 bg-white border border-[#DDD4C9] rounded-lg focus:outline-none focus:border-[#241F1C]"
                    />
                  </div>
                  <div>
                    <label className="block text-[#4A4036] font-medium mb-1">Estado</label>
                    <input
                      type="text"
                      required
                      maxLength={2}
                      value={addressData.state}
                      onChange={(e) => setAddressData({ ...addressData, state: e.target.value.toUpperCase() })}
                      className="w-full px-3 py-2 bg-white border border-[#DDD4C9] rounded-lg focus:outline-none focus:border-[#241F1C] uppercase"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="pt-4 border-t border-[#EAE4DC]">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#3D332B] mb-3 flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-[#9E6F45]" />
                2. Forma de Pagamento
              </h3>

              <div className="grid grid-cols-3 gap-3 mb-4">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('pix')}
                  className={`p-3 rounded-xl border text-xs flex flex-col items-center gap-1.5 transition-all ${
                    paymentMethod === 'pix'
                      ? 'border-[#241F1C] bg-[#241F1C] text-white shadow-xs'
                      : 'border-[#DDD4C9] bg-white text-[#241F1C] hover:bg-[#F7F4EE]'
                  }`}
                >
                  <QrCode className="w-5 h-5" />
                  <span className="font-semibold">PIX Instantâneo</span>
                  <span className="text-[10px] opacity-80">Aprovação imediata</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('credit_card')}
                  className={`p-3 rounded-xl border text-xs flex flex-col items-center gap-1.5 transition-all ${
                    paymentMethod === 'credit_card'
                      ? 'border-[#241F1C] bg-[#241F1C] text-white shadow-xs'
                      : 'border-[#DDD4C9] bg-white text-[#241F1C] hover:bg-[#F7F4EE]'
                  }`}
                >
                  <CreditCard className="w-5 h-5" />
                  <span className="font-semibold">Cartão de Crédito</span>
                  <span className="text-[10px] opacity-80">Até 6x sem juros</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('boleto')}
                  className={`p-3 rounded-xl border text-xs flex flex-col items-center gap-1.5 transition-all ${
                    paymentMethod === 'boleto'
                      ? 'border-[#241F1C] bg-[#241F1C] text-white shadow-xs'
                      : 'border-[#DDD4C9] bg-white text-[#241F1C] hover:bg-[#F7F4EE]'
                  }`}
                >
                  <FileText className="w-5 h-5" />
                  <span className="font-semibold">Boleto Bancário</span>
                  <span className="text-[10px] opacity-80">Vence em 3 dias</span>
                </button>
              </div>

              {/* Payment Details Container */}
              {paymentMethod === 'pix' && (
                <div className="p-4 bg-white rounded-xl border border-[#EAE4DC] text-xs text-[#5C5046] flex items-center gap-4">
                  <div className="w-20 h-20 bg-[#FAF8F5] border border-[#DDD4C9] rounded-lg flex items-center justify-center p-2 shrink-0">
                    <QrCode className="w-16 h-16 text-[#241F1C]" />
                  </div>
                  <div>
                    <p className="font-bold text-[#241F1C]">Chave PIX Dinâmica Gerada</p>
                    <p className="mt-1 text-[11px] leading-relaxed">
                      Ao clicar em confirmar, você receberá o QR Code e o código Pix Copia e Cola para pagamento no aplicativo do seu banco.
                    </p>
                  </div>
                </div>
              )}

              {paymentMethod === 'credit_card' && (
                <div className="p-4 bg-white rounded-xl border border-[#EAE4DC] space-y-3 text-xs">
                  <div>
                    <label className="block text-[#4A4036] font-medium mb-1">Número do Cartão</label>
                    <input
                      type="text"
                      placeholder="0000 0000 0000 0000"
                      maxLength={19}
                      value={cardData.number}
                      onChange={(e) => setCardData({ ...cardData, number: e.target.value })}
                      className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#DDD4C9] rounded-lg focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[#4A4036] font-medium mb-1">Validade</label>
                      <input
                        type="text"
                        placeholder="MM/AA"
                        maxLength={5}
                        value={cardData.expiry}
                        onChange={(e) => setCardData({ ...cardData, expiry: e.target.value })}
                        className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#DDD4C9] rounded-lg focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[#4A4036] font-medium mb-1">CVV</label>
                      <input
                        type="password"
                        placeholder="123"
                        maxLength={4}
                        value={cardData.cvv}
                        onChange={(e) => setCardData({ ...cardData, cvv: e.target.value })}
                        className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#DDD4C9] rounded-lg focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[#4A4036] font-medium mb-1">Opções de Parcelamento</label>
                    <select
                      value={cardData.installments}
                      onChange={(e) => setCardData({ ...cardData, installments: e.target.value })}
                      className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#DDD4C9] rounded-lg focus:outline-none text-xs"
                    >
                      <option value="1">1x de {total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} à vista</option>
                      <option value="2">2x de {(total / 2).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} sem juros</option>
                      <option value="3">3x de {(total / 3).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} sem juros</option>
                      <option value="4">4x de {(total / 4).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} sem juros</option>
                      <option value="5">5x de {(total / 5).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} sem juros</option>
                      <option value="6">6x de {(total / 6).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} sem juros</option>
                    </select>
                  </div>
                </div>
              )}

              {paymentMethod === 'boleto' && (
                <div className="p-4 bg-white rounded-xl border border-[#EAE4DC] text-xs text-[#5C5046] flex items-center gap-3">
                  <FileText className="w-8 h-8 text-[#9E6F45] shrink-0" />
                  <div>
                    <p className="font-bold text-[#241F1C]">Boleto Bancário</p>
                    <p className="text-[11px] mt-0.5">O boleto será emitido após a confirmação com vencimento em 3 dias úteis.</p>
                  </div>
                </div>
              )}
            </div>

            {/* Order summary row */}
            <div className="pt-4 border-t border-[#EAE4DC] flex items-center justify-between text-xs">
              <span className="text-[#5C5046]">Total a pagar:</span>
              <span className="text-xl font-bold text-[#241F1C] tabular-nums font-mono">
                {total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </span>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-4 bg-[#241F1C] hover:bg-[#3D332B] text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-colors shadow-xs flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>PROCESSANDO PEDIDO...</span>
              ) : (
                <>
                  <span>CONFIRMAR COMPRA</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
