import React from 'react';
import heroImg from '../assets/images/hero_calcados_couro_1790640130328.jpg';
import { ArrowDown, ShieldCheck, Sparkles, Truck, RotateCcw } from 'lucide-react';

interface HeroProps {
  onExploreClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick }) => {
  return (
    <section className="relative overflow-hidden bg-[#F5EFE6] border-b border-[#EAE4DC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Text Content */}
          <div className="lg:col-span-6 flex flex-col justify-center text-left">
            <span className="text-xs uppercase tracking-[0.25em] text-[#9E6F45] font-semibold mb-3">
              Couro Legítimo &bull; Feito com Alma
            </span>
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif-display font-bold text-[#241F1C] leading-[1.15] text-balance">
              Calçados de Couro com Qualidade e Elegância
            </h1>

            <p className="mt-4 text-base sm:text-lg text-[#5A5046] leading-relaxed max-w-xl">
              Modelos criados para unir sofisticação autêntica e bem-estar em cada pisada. 
              Do conforto do tênis knit ao requinte da sandália de salto geométrico e rasteiras artesanais.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                onClick={onExploreClick}
                className="px-6 py-3.5 bg-[#241F1C] hover:bg-[#3B322D] text-white text-sm font-medium rounded-lg transition-colors shadow-xs inline-flex items-center gap-2 group cursor-pointer"
              >
                <span>Ver Coleção Completa</span>
                <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
              </button>

              <div className="text-xs text-[#7A6D61] flex items-center gap-1.5 font-medium">
                <span className="w-2 h-2 rounded-full bg-[#34A853]"></span>
                <span>Todos os 5 modelos em estoque</span>
              </div>
            </div>

            {/* Quality Badges */}
            <div className="mt-10 pt-6 border-t border-[#E4DCCE] grid grid-cols-3 gap-4 text-left">
              <div>
                <p className="text-xs font-semibold text-[#241F1C]">100% Couro Nobre</p>
                <p className="text-[11px] text-[#7A6D61] mt-0.5">Durabilidade e toque macio</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-[#241F1C]">Primeira Troca Grátis</p>
                <p className="text-[11px] text-[#7A6D61] mt-0.5">Sem complicações em 30 dias</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-[#241F1C]">Envio com Rastreio</p>
                <p className="text-[11px] text-[#7A6D61] mt-0.5">Direto até sua residência</p>
              </div>
            </div>
          </div>

          {/* Hero Photography Asset */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-md border border-[#E6DEC9]/60 aspect-16/10 sm:aspect-16/9 lg:aspect-4/3 bg-[#EAE2D5]">
              <img
                src={heroImg}
                alt="Coleção de calçados de couro elegantes em atelier artesanal"
                className="w-full h-full object-cover object-center transform hover:scale-102 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              
              <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md p-3.5 rounded-xl border border-white/40 shadow-xs flex items-center justify-between text-xs">
                <div>
                  <p className="font-semibold text-[#241F1C]">Coleção Primavera / Verão</p>
                  <p className="text-[#6C5E53] text-[11px]">Rasteiras, mocassins, tênis e sandálias</p>
                </div>
                <span className="text-[#9E6F45] font-semibold text-xs whitespace-nowrap">
                  A partir de R$ 199,90
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
