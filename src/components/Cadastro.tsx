import React, { useState } from 'react';
import { BrandLogo } from './BrandLogo';
import { ArrowLeft, CheckCircle2, AlertCircle } from 'lucide-react';
import { UserAccount } from '../types';

interface CadastroProps {
  onRegisterSuccess: (newUser: UserAccount) => void;
  onNavigate: (view: 'home' | 'login') => void;
}

export const Cadastro: React.FC<CadastroProps> = ({
  onRegisterSuccess,
  onNavigate,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    rg: '',
    cpf: '',
    address: '',
    cep: '',
    city: '',
    state: 'SP',
    country: 'Brasil',
    birthDate: '',
  });

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isSearchingCep, setIsSearchingCep] = useState(false);

  // Formatting helpers
  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, '');
    if (val.length > 11) val = val.slice(0, 11);
    if (val.length > 9) {
      val = val.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/, '$1.$2.$3-$4');
    } else if (val.length > 6) {
      val = val.replace(/(\d{3})(\d{3})(\d{1,3})/, '$1.$2.$3');
    } else if (val.length > 3) {
      val = val.replace(/(\d{3})(\d{1,3})/, '$1.$2');
    }
    setFormData((prev) => ({ ...prev, cpf: val }));
  };

  const handleCepChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, '');
    if (val.length > 8) val = val.slice(0, 8);
    const masked = val.length > 5 ? val.replace(/(\d{5})(\d{1,3})/, '$1-$2') : val;
    setFormData((prev) => ({ ...prev, cep: masked }));

    if (val.length === 8) {
      setIsSearchingCep(true);
      try {
        const res = await fetch(`https://viacep.com.br/ws/${val}/json/`);
        const data = await res.json();
        if (!data.erro) {
          setFormData((prev) => ({
            ...prev,
            address: data.logradouro ? `${data.logradouro}, ` : prev.address,
            city: data.localidade || prev.city,
            state: data.uf || prev.state,
          }));
        }
      } catch (err) {
        // Fallback silently if offline or blocked
      } finally {
        setIsSearchingCep(false);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (formData.password !== formData.confirmPassword) {
      setError('As senhas digitadas não coincidem. Por favor, verifique.');
      return;
    }

    if (formData.password.length < 6) {
      setError('A senha deve conter no mínimo 6 caracteres.');
      return;
    }

    const newUser: UserAccount = {
      name: formData.name,
      email: formData.email,
      rg: formData.rg,
      cpf: formData.cpf,
      address: formData.address,
      cep: formData.cep,
      city: formData.city,
      state: formData.state,
      country: formData.country,
      birthDate: formData.birthDate,
    };

    setSuccess(true);
    setTimeout(() => {
      onRegisterSuccess(newUser);
    }, 1200);
  };

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 bg-[#FAF8F5]">
      {/* Top bar with back buttons */}
      <div className="max-w-2xl mx-auto mb-6 flex items-center justify-between">
        <button
          onClick={() => onNavigate('home')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#736357] hover:text-[#241F1C] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar para a Página Inicial</span>
        </button>

        <button
          onClick={() => onNavigate('login')}
          className="text-xs font-semibold text-[#9E6F45] hover:underline"
        >
          Já tem conta? Fazer Login
        </button>
      </div>

      <div className="max-w-2xl mx-auto bg-white rounded-2xl p-6 sm:p-10 border border-[#EAE4DC] shadow-sm">
        {/* Brand header */}
        <div className="text-center mb-8">
          <BrandLogo size="md" className="mx-auto mb-3" />
          <h1 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#241F1C]">
            Criar Cadastro de Cliente
          </h1>
          <p className="text-xs sm:text-sm text-[#7A6D61] mt-1">
            Preencha seus dados para ter acesso a compras seguras e acompanhar pedidos
          </p>
        </div>

        {error && (
          <div className="mb-6 p-3.5 rounded-lg bg-[#FFEBEE] border border-[#FFCDD2] text-[#C62828] text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="mb-6 p-4 rounded-xl bg-[#E8F5E9] border border-[#C8E6C9] text-[#2E7D32] text-xs flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 shrink-0" />
            <div>
              <p className="font-bold">Cadastro realizado com sucesso!</p>
              <p className="text-[11px] text-[#388E3C] mt-0.5">
                Redirecionando você para a loja...
              </p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Informações Pessoais */}
          <div className="border-b border-[#F2ECE4] pb-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#9E6F45] mb-3">
              Dados Pessoais
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="sm:col-span-2">
                <label className="block text-[#4A4036] font-medium mb-1">
                  Digite Seu Nome Completo *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Ex: Ana Maria Ferreira"
                  className="w-full px-3 py-2.5 bg-[#FAF8F5] border border-[#DDD4C9] rounded-lg focus:outline-none focus:border-[#241F1C] text-[#241F1C]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-[#4A4036] font-medium mb-1">
                  Digite Seu E-mail *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="seuemail@exemplo.com"
                  className="w-full px-3 py-2.5 bg-[#FAF8F5] border border-[#DDD4C9] rounded-lg focus:outline-none focus:border-[#241F1C] text-[#241F1C]"
                />
              </div>

              <div>
                <label className="block text-[#4A4036] font-medium mb-1">
                  Digite Seu CPF *
                </label>
                <input
                  type="text"
                  required
                  maxLength={14}
                  value={formData.cpf}
                  onChange={handleCpfChange}
                  placeholder="000.000.000-00"
                  className="w-full px-3 py-2.5 bg-[#FAF8F5] border border-[#DDD4C9] rounded-lg focus:outline-none focus:border-[#241F1C] text-[#241F1C]"
                />
              </div>

              <div>
                <label className="block text-[#4A4036] font-medium mb-1">
                  Digite Seu RG
                </label>
                <input
                  type="text"
                  value={formData.rg}
                  onChange={(e) => setFormData({ ...formData, rg: e.target.value })}
                  placeholder="Ex: 12.345.678-9"
                  className="w-full px-3 py-2.5 bg-[#FAF8F5] border border-[#DDD4C9] rounded-lg focus:outline-none focus:border-[#241F1C] text-[#241F1C]"
                />
              </div>

              <div>
                <label className="block text-[#4A4036] font-medium mb-1">
                  Digite Sua Data de Nascimento *
                </label>
                <input
                  type="date"
                  required
                  value={formData.birthDate}
                  onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                  className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#DDD4C9] rounded-lg focus:outline-none focus:border-[#241F1C] text-[#241F1C]"
                />
              </div>
            </div>
          </div>

          {/* Segurança da Conta */}
          <div className="border-b border-[#F2ECE4] pb-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#9E6F45] mb-3">
              Senha de Acesso
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block text-[#4A4036] font-medium mb-1">
                  Digite Sua Senha *
                </label>
                <input
                  type="password"
                  required
                  minLength={6}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="Mínimo 6 caracteres"
                  className="w-full px-3 py-2.5 bg-[#FAF8F5] border border-[#DDD4C9] rounded-lg focus:outline-none focus:border-[#241F1C] text-[#241F1C]"
                />
              </div>

              <div>
                <label className="block text-[#4A4036] font-medium mb-1">
                  Confirme Sua Senha *
                </label>
                <input
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  placeholder="Repita sua senha"
                  className="w-full px-3 py-2.5 bg-[#FAF8F5] border border-[#DDD4C9] rounded-lg focus:outline-none focus:border-[#241F1C] text-[#241F1C]"
                />
              </div>
            </div>
          </div>

          {/* Endereço de Entrega */}
          <div className="pb-2">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#9E6F45]">
                Endereço de Entrega
              </h3>
              {isSearchingCep && (
                <span className="text-[11px] text-[#9E6F45]">Buscando CEP...</span>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div>
                <label className="block text-[#4A4036] font-medium mb-1">
                  Digite Seu CEP *
                </label>
                <input
                  type="text"
                  required
                  maxLength={9}
                  value={formData.cep}
                  onChange={handleCepChange}
                  placeholder="00000-000"
                  className="w-full px-3 py-2.5 bg-[#FAF8F5] border border-[#DDD4C9] rounded-lg focus:outline-none focus:border-[#241F1C] text-[#241F1C]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-[#4A4036] font-medium mb-1">
                  Digite Seu Endereço (Rua, Número, Bairro) *
                </label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="Rua / Av., número, apto, bairro"
                  className="w-full px-3 py-2.5 bg-[#FAF8F5] border border-[#DDD4C9] rounded-lg focus:outline-none focus:border-[#241F1C] text-[#241F1C]"
                />
              </div>

              <div>
                <label className="block text-[#4A4036] font-medium mb-1">
                  Digite Sua Cidade *
                </label>
                <input
                  type="text"
                  required
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  placeholder="Ex: Franca"
                  className="w-full px-3 py-2.5 bg-[#FAF8F5] border border-[#DDD4C9] rounded-lg focus:outline-none focus:border-[#241F1C] text-[#241F1C]"
                />
              </div>

              <div>
                <label className="block text-[#4A4036] font-medium mb-1">
                  Digite Seu Estado (UF) *
                </label>
                <select
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  className="w-full px-3 py-2.5 bg-[#FAF8F5] border border-[#DDD4C9] rounded-lg focus:outline-none focus:border-[#241F1C] text-[#241F1C]"
                >
                  {['AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS','MG','PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO'].map((uf) => (
                    <option key={uf} value={uf}>{uf}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[#4A4036] font-medium mb-1">
                  Digite Seu País
                </label>
                <input
                  type="text"
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  className="w-full px-3 py-2.5 bg-[#FAF8F5] border border-[#DDD4C9] rounded-lg focus:outline-none focus:border-[#241F1C] text-[#241F1C]"
                />
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="pt-4 flex flex-col sm:flex-row items-center gap-3">
            <button
              type="submit"
              disabled={success}
              className="w-full sm:flex-1 py-3.5 px-6 bg-[#241F1C] hover:bg-[#3D332B] text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-colors shadow-xs cursor-pointer disabled:opacity-50"
            >
              FINALIZAR CADASTRO
            </button>

            <button
              type="button"
              onClick={() => onNavigate('login')}
              className="w-full sm:w-auto py-3.5 px-6 bg-[#F2ECE3] hover:bg-[#E5DEC4] text-[#241F1C] text-xs font-bold uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
            >
              VOLTAR AO LOGIN
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
