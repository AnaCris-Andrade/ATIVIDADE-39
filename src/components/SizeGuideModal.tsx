import React from 'react';
import { X, Ruler, Check } from 'lucide-react';
import { SIZE_CHART } from '../data/products';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SizeGuideModal: React.FC<SizeGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        className="relative bg-white rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-[#E4DCCE] animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 border-b border-[#EAE4DC]">
          <div className="flex items-center gap-2 text-[#241F1C]">
            <Ruler className="w-5 h-5 text-[#9E6F45]" />
            <h2 className="font-serif-display text-xl font-bold">
              Guia de Medidas de Calçados
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#736357] hover:text-[#241F1C] hover:bg-[#F2ECE3] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-4 space-y-4">
          <p className="text-xs text-[#5C5046] leading-relaxed">
            Nossos calçados possuem <strong>forma padrão brasileira</strong>. Caso fique em dúvida entre dois tamanhos, recomendamos optar pelo número maior para tênis e pelo número exato para rasteiras e sandálias.
          </p>

          {/* Table */}
          <div className="overflow-x-auto rounded-lg border border-[#EAE4DC]">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAF8F5] text-[#241F1C] font-bold border-b border-[#EAE4DC]">
                <tr>
                  <th className="py-2.5 px-4">Tamanho (BR)</th>
                  <th className="py-2.5 px-4">Comprimento do Pé (cm)</th>
                  <th className="py-2.5 px-4">Largura Recomendada</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F2ECE4] text-[#4A4036]">
                {SIZE_CHART.map((row) => (
                  <tr key={row.size} className="hover:bg-[#FAF8F5]">
                    <td className="py-2.5 px-4 font-bold text-[#241F1C]">{row.size}</td>
                    <td className="py-2.5 px-4 font-mono tabular-nums">{row.lengthCm}</td>
                    <td className="py-2.5 px-4 font-mono tabular-nums text-[#736357]">{row.footWidth}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* How to measure tips */}
          <div className="p-4 bg-[#FAF8F5] rounded-xl border border-[#EAE4DC] text-xs space-y-1.5">
            <h4 className="font-bold text-[#241F1C]">Como Medir Seu Pé em Casa:</h4>
            <ol className="list-decimal list-inside space-y-1 text-[#5C5046]">
              <li>Pise sobre uma folha de papel rente a uma parede.</li>
              <li>Com uma caneta na vertical, marque onde termina o seu dedo mais longo.</li>
              <li>Meça a distância da borda do calcanhar até a marcação com uma régua.</li>
              <li>Consulte a tabela acima para encontrar seu tamanho perfeito.</li>
            </ol>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-[#241F1C] text-white text-xs font-bold uppercase tracking-wider rounded-lg hover:bg-[#3D332B] transition-colors"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};
