import React, { useState } from 'react';
import { BrandLogo } from './BrandLogo';
import { LockIcon } from './LockIcon';
import { ArrowLeft, Mail, CheckCircle2 } from 'lucide-react';

interface EsqueciSenhaProps {
  onNavigate: (view: 'home' | 'login') => void;
}

export const EsqueciSenha: React.FC<EsqueciSenhaProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setIsSent(true);
    }, 800);
  };

  return (
    <div className="min-h-[85vh] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 bg-[#FAF8F5]">
      {/* Return nav */}
      <div className="max-w-md w-full mx-auto mb-6 flex items-center justify-between">
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
          Voltar à página de login
        </button>
      </div>

      <div className="max-w-md w-full mx-auto bg-white rounded-2xl p-8 sm:p-10 border border-[#EAE4DC] shadow-sm text-center">
        {/* Logo and title */}
        <BrandLogo size="md" className="mx-auto mb-3" />
        <h1 className="font-serif-display text-xl font-bold text-[#241F1C] leading-snug">
          Calçados de Couro com Qualidade e Elegância
        </h1>
        <p className="text-xs text-[#7A6D61] mt-1 mb-6">
          Recuperação e redefinição de acesso seguro
        </p>

        {/* Lock visual based on user's cadiado.png */}
        <div className="flex justify-center my-4">
          <LockIcon size={95} />
        </div>

        {isSent ? (
          <div className="my-6 p-5 rounded-xl bg-[#E8F5E9] border border-[#C8E6C9] text-left">
            <div className="flex items-center gap-2 text-[#2E7D32] mb-1">
              <CheckCircle2 className="w-5 h-5 shrink-0" />
              <h3 className="font-bold text-sm">Instruções Enviadas!</h3>
            </div>
            <p className="text-xs text-[#388E3C] leading-relaxed mt-2">
              Enviamos um link de redefinição para <strong>{email}</strong>. 
              Por favor, verifique sua caixa de entrada e também a pasta de spam.
            </p>
            <button
              onClick={() => onNavigate('login')}
              className="mt-5 w-full py-2.5 bg-[#2E7D32] hover:bg-[#1B5E20] text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-colors"
            >
              IR PARA O LOGIN
            </button>
          </div>
        ) : (
          <>
            <p className="text-xs sm:text-sm text-[#5C5046] leading-relaxed mb-6 px-2">
              <strong>Digite o e-mail cadastrado</strong> para receber as instruções de redefinição de senha. 
              Após o envio, verifique sua caixa de entrada ou seu spam.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#3D332B] mb-1.5">
                  Digite seu E-mail Cadastrado
                </label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Digite seu email"
                    className="w-full pl-10 pr-3 py-2.5 text-sm bg-[#FAF8F5] border border-[#DDD4C9] rounded-lg focus:outline-none focus:border-[#241F1C] text-[#241F1C]"
                  />
                  <Mail className="w-4 h-4 text-[#8C7D70] absolute left-3 top-3.5" />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-4 bg-[#241F1C] hover:bg-[#3D332B] text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-colors shadow-xs flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {loading ? <span>ENVIANDO...</span> : <span>ENVIAR E-MAIL</span>}
              </button>
            </form>
          </>
        )}

        <div className="mt-8 pt-4 border-t border-[#F2ECE4]">
          <button
            onClick={() => onNavigate('login')}
            className="text-xs font-bold text-[#736357] hover:text-[#241F1C] transition-colors"
          >
            Lembrou a senha? <u>Fazer Login</u>
          </button>
        </div>
      </div>
    </div>
  );
};
