import React from 'react';
import { Sparkles, Feather, Shield, HeartHandshake } from 'lucide-react';

export const CraftsmanshipSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-[#FAF8F5] border-t border-[#EAE4DC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-[0.25em] text-[#9E6F45] font-semibold">
            Tradição & Matéria-Prima Nobre
          </span>
          <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-[#241F1C] mt-2">
            A Nobreza do Couro Legítimo
          </h2>
          <p className="mt-3 text-sm text-[#66584C] leading-relaxed">
            Diferente de materiais sintéticos que ressecam e desgastam com facilidade, nossos calçados em couro legítimo amolecem e se adaptam perfeitamente ao formato dos seus pés.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#EAE4DC] shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#F5EFE6] text-[#9E6F45] flex items-center justify-center mb-4">
                <Feather className="w-5 h-5" />
              </div>
              <h3 className="font-serif-display text-xl font-bold text-[#241F1C]">
                Conforto que Abraça
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-[#66584C] leading-relaxed">
                O couro genuíno possui poros naturais que permitem aos pés respirarem livremente ao longo do dia, evitando odores, superaquecimento e atrito excessivo.
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-[#F2ECE4] text-[11px] text-[#8C7D70] font-medium">
              Palmilha interna anatômica com espuma de memória
            </div>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#EAE4DC] shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#F5EFE6] text-[#9E6F45] flex items-center justify-center mb-4">
                <Shield className="w-5 h-5" />
              </div>
              <h3 className="font-serif-display text-xl font-bold text-[#241F1C]">
                Durabilidade de Anos
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-[#66584C] leading-relaxed">
                Um par de calçados de couro de alta qualidade é um investimento atemporal. Com os cuidados básicos, ele mantém o brilho, a maciez e a estrutura por muitas temporadas.
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-[#F2ECE4] text-[11px] text-[#8C7D70] font-medium">
              Costuras duplas reforçadas e solados colados e pespontados
            </div>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#EAE4DC] shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#F5EFE6] text-[#9E6F45] flex items-center justify-center mb-4">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <h3 className="font-serif-display text-xl font-bold text-[#241F1C]">
                Acabamento Artesanal
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-[#66584C] leading-relaxed">
                Cada tira da rasteira gladiadora, cada pedraria aplicada e cada costura do mocassim passam pelas mãos habilidosas de artesãos dedicados à perfeição de cada detalhe.
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-[#F2ECE4] text-[11px] text-[#8C7D70] font-medium">
              Cuidado rigoroso em 100% dos pares antes do envio
            </div>
          </div>
        </div>

        {/* Customer Testimonial adjacent */}
        <div className="mt-12 bg-[#F3ECE1] rounded-2xl p-6 sm:p-8 border border-[#E4DCCE] flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="max-w-2xl">
            <p className="font-serif-display italic text-lg sm:text-xl text-[#241F1C]">
              &ldquo;A rasteira gladiadora e o mocassim superaram todas as minhas expectativas. O couro é extremamente macio logo no primeiro uso e não machucou nada o calcanhar. Já vou pedir a sandália de salto!&rdquo;
            </p>
            <p className="text-xs text-[#7A6D61] mt-2 font-medium">
              Marina Albuquerque &bull; Belo Horizonte, MG &bull; Pedido #CC-729104
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-1.5 text-xs font-bold text-[#241F1C] bg-white px-4 py-2.5 rounded-lg border border-[#DDD4C9]">
            <span className="text-[#F5A623]">★★★★★</span>
            <span>4.9 / 5.0 (Mais de 1.400 clientes)</span>
          </div>
        </div>
      </div>
    </section>
  );
};
