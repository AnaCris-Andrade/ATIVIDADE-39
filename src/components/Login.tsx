import React, { useState } from 'react';
import { BrandLogo } from './BrandLogo';
import { ArrowLeft, Mail, Lock, Check, AlertCircle } from 'lucide-react';
import { UserAccount } from '../types';

interface LoginProps {
  onLoginSuccess: (user: UserAccount) => void;
  onNavigate: (view: 'home' | 'cadastro' | 'esqueci-senha') => void;
  savedUsers: UserAccount[];
}

export const Login: React.FC<LoginProps> = ({
  onLoginSuccess,
  onNavigate,
  savedUsers,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    setTimeout(() => {
      // Find matching user from saved users, or use demo user
      const existing = savedUsers.find(
        (u) => u.email.toLowerCase() === email.trim().toLowerCase()
      );

      if (existing) {
        onLoginSuccess(existing);
      } else if (email.trim().toLowerCase() === 'cliente@exemplo.com' || email.includes('@')) {
        // Fallback default demo account
        const demoUser: UserAccount = {
          name: email.split('@')[0].replace('.', ' '),
          email: email.trim(),
          rg: '12.345.678-9',
          cpf: '123.456.789-00',
          address: 'Rua das Palmeiras, 150, Centro',
          cep: '14400-000',
          city: 'Franca',
          state: 'SP',
          country: 'Brasil',
          birthDate: '1995-06-15',
        };
        onLoginSuccess(demoUser);
      } else {
        setError('Por favor, informe um endereço de e-mail válido.');
      }
      setLoading(false);
    }, 600);
  };

  const handleQuickDemo = () => {
    setEmail('ana.ferreira@email.com');
    setPassword('senha123');
  };

  return (
    <div className="min-h-[85vh] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 bg-[#FAF8F5]">
      {/* Return to home button */}
      <div className="max-w-md w-full mx-auto mb-6">
        <button
          onClick={() => onNavigate('home')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#736357] hover:text-[#241F1C] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar para a Página Inicial</span>
        </button>
      </div>

      <div className="max-w-md w-full mx-auto bg-white rounded-2xl p-8 sm:p-10 border border-[#EAE4DC] shadow-sm">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <BrandLogo size="md" className="mx-auto mb-3" />
          <h2 className="font-serif-display text-2xl font-bold text-[#241F1C]">
            Acessar Minha Conta
          </h2>
          <p className="text-xs text-[#7A6D61] mt-1">
            Entre para gerenciar seus pedidos e endereços
          </p>
        </div>

        {error && (
          <div className="mb-5 p-3 rounded-lg bg-[#FFEBEE] border border-[#FFCDD2] text-[#C62828] text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#3D332B] mb-1.5">
              Digite seu E-mail
            </label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seuemail@exemplo.com"
                className="w-full pl-10 pr-3 py-2.5 text-sm bg-[#FAF8F5] border border-[#DDD4C9] rounded-lg focus:outline-none focus:border-[#241F1C] text-[#241F1C]"
              />
              <Mail className="w-4 h-4 text-[#8C7D70] absolute left-3 top-3.5" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#3D332B] mb-1.5">
              Digite sua Senha
            </label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-3 py-2.5 text-sm bg-[#FAF8F5] border border-[#DDD4C9] rounded-lg focus:outline-none focus:border-[#241F1C] text-[#241F1C]"
              />
              <Lock className="w-4 h-4 text-[#8C7D70] absolute left-3 top-3.5" />
            </div>
          </div>

          <div className="flex items-center justify-between text-xs pt-1">
            <label className="flex items-center gap-2 text-[#5C5046] cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded border-[#DDD4C9] text-[#241F1C] focus:ring-0"
              />
              <span>Lembrar de mim</span>
            </label>

            <button
              type="button"
              onClick={() => onNavigate('esqueci-senha')}
              className="text-[#9E6F45] hover:underline font-medium"
            >
              Esqueci Minha Senha
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3 px-4 bg-[#241F1C] hover:bg-[#3D332B] text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-colors shadow-xs flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {loading ? <span>ENTRANDO...</span> : <span>ENVIAR / ENTRAR</span>}
          </button>
        </form>

        {/* Demo Fast Login Helper */}
        <div className="mt-5 pt-4 border-t border-[#F2ECE4] text-center">
          <button
            type="button"
            onClick={handleQuickDemo}
            className="text-[11px] text-[#9E6F45] hover:text-[#7D5431] font-semibold underline"
          >
            Preencher dados de teste rápido
          </button>
        </div>

        {/* Not registered link */}
        <div className="mt-6 text-center text-xs text-[#5C5046]">
          <span>Não tem Cadastro? </span>
          <button
            onClick={() => onNavigate('cadastro')}
            className="font-bold text-[#241F1C] hover:underline"
          >
            Cadastre-se Agora
          </button>
        </div>
      </div>
    </div>
  );
};
