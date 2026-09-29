import React, { useState } from 'react';
import { UserAccount, Order } from '../types';
import { User, Package, MapPin, LogOut, ArrowLeft, Calendar, FileText, CheckCircle2 } from 'lucide-react';

interface ProfileViewProps {
  user: UserAccount;
  orders: Order[];
  onLogout: () => void;
  onNavigate: (view: 'home') => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  user,
  orders,
  onLogout,
  onNavigate,
}) => {
  const [activeTab, setActiveTab] = useState<'orders' | 'profile'>('orders');

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Return button */}
      <div className="mb-6 flex items-center justify-between">
        <button
          onClick={() => onNavigate('home')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#736357] hover:text-[#241F1C] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar para a Loja</span>
        </button>

        <button
          onClick={onLogout}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#C62828] hover:text-[#B71C1C] transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Sair da Conta</span>
        </button>
      </div>

      {/* Profile Header Card */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#EAE4DC] shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-[#EFEAE2] border-2 border-[#B58263] flex items-center justify-center text-xl font-bold font-serif-display text-[#241F1C]">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h1 className="font-serif-display text-2xl font-bold text-[#241F1C]">
              Olá, {user.name}
            </h1>
            <p className="text-xs text-[#7A6D61] mt-0.5">{user.email}</p>
            <p className="text-[11px] text-[#9E6F45] mt-1 font-medium">
              Cliente VIP &bull; Calçados de Couro
            </p>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 p-1 bg-[#F5EFE6] rounded-xl self-stretch sm:self-auto">
          <button
            onClick={() => setActiveTab('orders')}
            className={`flex-1 sm:flex-initial px-4 py-2 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-2 ${
              activeTab === 'orders'
                ? 'bg-white text-[#241F1C] shadow-xs'
                : 'text-[#6E6054] hover:text-[#241F1C]'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Meus Pedidos ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`flex-1 sm:flex-initial px-4 py-2 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-2 ${
              activeTab === 'profile'
                ? 'bg-white text-[#241F1C] shadow-xs'
                : 'text-[#6E6054] hover:text-[#241F1C]'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Dados Cadastrais</span>
          </button>
        </div>
      </div>

      {/* Tab 1: Orders */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          <h2 className="font-serif-display text-xl font-bold text-[#241F1C]">
            Histórico de Compras
          </h2>

          {orders.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center border border-[#EAE4DC]">
              <Package className="w-12 h-12 text-[#C8BCB0] mx-auto mb-3" />
              <p className="font-serif-display text-lg font-bold text-[#241F1C]">
                Você ainda não realizou nenhum pedido
              </p>
              <p className="text-xs text-[#7A6D61] mt-1 max-w-sm mx-auto">
                Confira nossa coleção de calçados de couro legítimo e faça sua primeira compra com frete grátis acima de R$ 299.
              </p>
              <button
                onClick={() => onNavigate('home')}
                className="mt-6 px-6 py-2.5 bg-[#241F1C] hover:bg-[#3D332B] text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-colors"
              >
                Conhecer Produtos
              </button>
            </div>
          ) : (
            orders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-2xl border border-[#EAE4DC] p-6 shadow-xs space-y-4"
              >
                <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#F2ECE4] text-xs">
                  <div>
                    <span className="text-[#7A6D61]">Pedido: </span>
                    <strong className="text-[#241F1C] font-mono text-sm">{order.id}</strong>
                    <span className="mx-2 text-[#DDD4C9]">&bull;</span>
                    <span className="text-[#7A6D61]">{order.date}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-[#E8F5E9] text-[#2E7D32]">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {order.status}
                    </span>

                    <span className="font-mono text-xs text-[#7A6D61]">
                      Rastreio: <strong className="text-[#241F1C]">{order.trackingCode}</strong>
                    </span>
                  </div>
                </div>

                {/* Items in order */}
                <div className="divide-y divide-[#F6F2EC]">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="py-3 flex items-center justify-between gap-4 text-xs">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-14 h-14 object-cover rounded-lg bg-[#FAF8F5] border border-[#EAE4DC]"
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <p className="font-bold text-[#241F1C] text-sm">{item.product.name}</p>
                          <p className="text-[#7A6D61] mt-0.5">
                            Tamanho: <strong>{item.size}</strong> &bull; Qtd: {item.quantity}
                          </p>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="font-mono font-bold text-[#241F1C] text-sm tabular-nums">
                          {(item.product.price * item.quantity).toLocaleString('pt-BR', {
                            style: 'currency',
                            currency: 'BRL',
                          })}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Order Footer */}
                <div className="pt-3 border-t border-[#F2ECE4] flex flex-wrap items-center justify-between text-xs text-[#7A6D61]">
                  <span>Entregar em: {order.address.street} - {order.address.city}/{order.address.state}</span>
                  <div className="flex items-center gap-2">
                    <span>Total do Pedido:</span>
                    <strong className="text-base text-[#241F1C] font-mono tabular-nums">
                      {order.total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </strong>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Tab 2: Profile details */}
      {activeTab === 'profile' && (
        <div className="bg-white rounded-2xl border border-[#EAE4DC] p-6 sm:p-8 shadow-xs">
          <h2 className="font-serif-display text-xl font-bold text-[#241F1C] mb-6">
            Dados Pessoais e Endereço Cadastrado
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
            <div className="space-y-1">
              <label className="text-[#8C7D70] font-medium">Nome Completo</label>
              <p className="text-sm font-semibold text-[#241F1C]">{user.name}</p>
            </div>

            <div className="space-y-1">
              <label className="text-[#8C7D70] font-medium">E-mail Cadastrado</label>
              <p className="text-sm font-semibold text-[#241F1C]">{user.email}</p>
            </div>

            <div className="space-y-1">
              <label className="text-[#8C7D70] font-medium">CPF</label>
              <p className="text-sm font-semibold text-[#241F1C] font-mono">{user.cpf || 'Não informado'}</p>
            </div>

            <div className="space-y-1">
              <label className="text-[#8C7D70] font-medium">RG</label>
              <p className="text-sm font-semibold text-[#241F1C] font-mono">{user.rg || 'Não informado'}</p>
            </div>

            <div className="space-y-1">
              <label className="text-[#8C7D70] font-medium">Data de Nascimento</label>
              <p className="text-sm font-semibold text-[#241F1C]">{user.birthDate || 'Não informado'}</p>
            </div>

            <div className="space-y-1">
              <label className="text-[#8C7D70] font-medium">País</label>
              <p className="text-sm font-semibold text-[#241F1C]">{user.country || 'Brasil'}</p>
            </div>

            <div className="sm:col-span-2 space-y-1 pt-4 border-t border-[#F2ECE4]">
              <label className="text-[#8C7D70] font-medium flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#9E6F45]" />
                Endereço de Entrega Principal
              </label>
              <p className="text-sm font-semibold text-[#241F1C]">
                {user.address}
              </p>
              <p className="text-xs text-[#7A6D61]">
                CEP: {user.cep} &bull; {user.city} - {user.state}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
