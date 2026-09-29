import React from 'react';
import { BrandLogo } from './BrandLogo';
import { ShieldCheck, Truck, RotateCcw, CreditCard, Heart } from 'lucide-react';

interface FooterProps {
  onNavigate: (view: 'home' | 'login' | 'cadastro' | 'esqueci-senha') => void;
  onOpenSizeGuide: () => void;
  onScrollToCategory: (cat: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenSizeGuide,
  onScrollToCategory,
}) => {
  return (
    <footer className="bg-[#1F1916] text-[#EFEBE4] pt-14 pb-10 border-t border-[#382F2A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-12 border-b border-[#382F2A]">
          {/* Brand info */}
          <div className="space-y-4">
            <BrandLogo size="md" className="items-start text-white" />
            <p className="text-xs text-[#B8AAA0] leading-relaxed max-w-xs">
              Calçados femininos artesanais em couro 100% legítimo. O encontro perfeito entre elegância clássica, sofisticação e conforto diário.
            </p>
            <div className="flex items-center gap-3 text-xs text-[#D8C7B8]">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-[#B58263]" />
                Site 100% Seguro
              </span>
              <span>&bull;</span>
              <span>Franca - SP</span>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-serif-display text-base font-bold text-white mb-4 uppercase tracking-wider">
              Categorias
            </h4>
            <ul className="space-y-2 text-xs text-[#B8AAA0]">
              <li>
                <button
                  onClick={() => {
                    onNavigate('home');
                    onScrollToCategory('todos');
                  }}
                  className="hover:text-white transition-colors"
                >
                  Todos os Modelos
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate('home');
                    onScrollToCategory('rasteiras');
                  }}
                  className="hover:text-white transition-colors"
                >
                  Rasteiras & Gladiadoras
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate('home');
                    onScrollToCategory('saltos');
                  }}
                  className="hover:text-white transition-colors"
                >
                  Sandálias de Salto
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate('home');
                    onScrollToCategory('tenis');
                  }}
                  className="hover:text-white transition-colors"
                >
                  Tênis Knit Casual
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate('home');
                    onScrollToCategory('mocassins');
                  }}
                  className="hover:text-white transition-colors"
                >
                  Mocassins em Couro
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Support & Guides */}
          <div>
            <h4 className="font-serif-display text-base font-bold text-white mb-4 uppercase tracking-wider">
              Atendimento & Dúvidas
            </h4>
            <ul className="space-y-2 text-xs text-[#B8AAA0]">
              <li>
                <button
                  onClick={onOpenSizeGuide}
                  className="hover:text-white transition-colors text-[#D8C7B8]"
                >
                  Tabela e Guia de Medidas
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('esqueci-senha')}
                  className="hover:text-white transition-colors"
                >
                  Redefinição de Senha
                </button>
              </li>
              <li>
                <span className="text-[#8E7E73]">Política de 1ª Troca Grátis (30 dias)</span>
              </li>
              <li>
                <span className="text-[#8E7E73]">Cuidados e Limpeza do Couro</span>
              </li>
              <li>
                <span className="text-[#8E7E73]">WhatsApp: (16) 99876-5432</span>
              </li>
            </ul>
          </div>

          {/* Payment and trust */}
          <div>
            <h4 className="font-serif-display text-base font-bold text-white mb-4 uppercase tracking-wider">
              Pagamento Facilitado
            </h4>
            <p className="text-xs text-[#B8AAA0] mb-3 leading-relaxed">
              Aceitamos PIX com aprovação instantânea e cartões de crédito em até 6x sem juros.
            </p>
            <div className="flex flex-wrap gap-2 text-[10px] text-[#A6978C]">
              <span className="px-2.5 py-1 bg-[#2C2420] rounded border border-[#443831]">PIX</span>
              <span className="px-2.5 py-1 bg-[#2C2420] rounded border border-[#443831]">Visa</span>
              <span className="px-2.5 py-1 bg-[#2C2420] rounded border border-[#443831]">Mastercard</span>
              <span className="px-2.5 py-1 bg-[#2C2420] rounded border border-[#443831]">Elo</span>
              <span className="px-2.5 py-1 bg-[#2C2420] rounded border border-[#443831]">Boleto</span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#8E7E73] gap-3">
          <p>
            &copy; {new Date().getFullYear()} Calçados Feminino. Todos os direitos reservados.
          </p>
          <p className="flex items-center gap-1 text-[11px]">
            Calçados de Couro com Qualidade e Elegância
          </p>
        </div>
      </div>
    </footer>
  );
};
