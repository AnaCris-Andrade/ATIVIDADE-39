import React, { useState } from 'react';
import { Product } from '../types';
import { X, ShieldCheck, Truck, RotateCcw, Check, Sparkles, Ruler } from 'lucide-react';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, size: number, quantity: number) => void;
  onOpenSizeGuide: () => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onOpenSizeGuide,
}) => {
  if (!product) return null;

  const [selectedSize, setSelectedSize] = useState<number>(product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState<string>(product.colors[0] || 'Natural');
  const [quantity, setQuantity] = useState(1);
  const [addedSuccess, setAddedSuccess] = useState(false);

  const formattedPrice = product.price.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
  const installmentValue = (product.price / 6).toFixed(2).replace('.', ',');

  const handleAdd = () => {
    onAddToCart(product, selectedSize, quantity);
    setAddedSuccess(true);
    setTimeout(() => {
      setAddedSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        className="relative bg-[#FAF8F5] rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl border border-[#E4DCCE] animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 hover:bg-white text-[#241F1C] shadow-xs transition-colors"
          aria-label="Fechar janela"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Product Image Column */}
          <div className="relative aspect-square md:aspect-auto bg-[#F4EFEA] overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover object-center"
              referrerPolicy="no-referrer"
            />
            {product.highlight && (
              <span className="absolute top-4 left-4 bg-[#241F1C]/90 text-white text-xs px-3 py-1 rounded font-medium">
                {product.highlight}
              </span>
            )}
          </div>

          {/* Product Details Column */}
          <div className="p-6 sm:p-8 flex flex-col justify-between max-h-[85vh] overflow-y-auto">
            <div>
              <div className="text-xs uppercase tracking-wider text-[#9E6F45] font-semibold">
                {product.categoryLabel} &bull; {product.material}
              </div>

              <h2 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#241F1C] mt-1">
                {product.name}
              </h2>

              <div className="mt-3 flex items-baseline gap-3">
                <span className="text-2xl font-bold text-[#241F1C] tabular-nums font-mono">
                  {formattedPrice}
                </span>
                <span className="text-xs text-[#7A6D61]">
                  ou 6x de R$ {installmentValue} sem juros
                </span>
              </div>

              <p className="mt-4 text-sm text-[#5C5046] leading-relaxed">
                {product.description}
              </p>

              {/* Sizes Selection */}
              <div className="mt-6">
                <div className="flex items-center justify-between text-xs text-[#241F1C] mb-2">
                  <span className="font-bold">Escolha seu Tamanho (BR):</span>
                  <button
                    type="button"
                    onClick={onOpenSizeGuide}
                    className="text-[#9E6F45] hover:underline flex items-center gap-1 font-medium"
                  >
                    <Ruler className="w-3.5 h-3.5" />
                    <span>Guia de Medidas</span>
                  </button>
                </div>

                <div className="grid grid-cols-6 gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      className={`py-2 text-xs font-semibold rounded-lg border transition-all ${
                        selectedSize === size
                          ? 'border-[#241F1C] bg-[#241F1C] text-white shadow-xs'
                          : 'border-[#DDD4C9] bg-white text-[#241F1C] hover:border-[#9E6F45]'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Selection if available */}
              {product.colors && product.colors.length > 0 && (
                <div className="mt-5">
                  <label className="text-xs font-bold text-[#241F1C] block mb-1.5">
                    Cor Selecionada: <span className="font-normal text-[#6E6054]">{selectedColor}</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        type="button"
                        onClick={() => setSelectedColor(color)}
                        className={`text-xs px-3 py-1.5 rounded-md border transition-all ${
                          selectedColor === color
                            ? 'border-[#241F1C] bg-[#EFEAE2] font-semibold text-[#241F1C]'
                            : 'border-[#E4DCCE] bg-white text-[#5C5046] hover:bg-[#F7F4EE]'
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Highlights & Features */}
              <div className="mt-6 pt-4 border-t border-[#EAE3D7]">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#3D332B] mb-2">
                  Diferenciais do Modelo:
                </h4>
                <ul className="space-y-1.5 text-xs text-[#5C5046]">
                  {product.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-[#9E6F45] mt-0.5">&bull;</span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Quantity and Primary Action */}
            <div className="mt-6 pt-4 border-t border-[#EAE3D7]">
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-[#DDD4C9] bg-white rounded-lg">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 text-sm font-bold text-[#241F1C] hover:bg-[#F2ECE3] transition-colors"
                  >
                    -
                  </button>
                  <span className="px-3 text-sm font-semibold tabular-nums text-[#241F1C]">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 text-sm font-bold text-[#241F1C] hover:bg-[#F2ECE3] transition-colors"
                  >
                    +
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleAdd}
                  disabled={addedSuccess}
                  className={`flex-1 py-3 px-6 rounded-lg text-sm font-bold tracking-wider uppercase transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 ${
                    addedSuccess
                      ? 'bg-[#2E7D32] text-white'
                      : 'bg-[#241F1C] hover:bg-[#3D332B] text-white shadow-xs'
                  }`}
                >
                  {addedSuccess ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>ADICIONADO À SACOLA!</span>
                    </>
                  ) : (
                    <span>ADICIONAR À SACOLA &bull; {(product.price * quantity).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                  )}
                </button>
              </div>

              {/* Trust Badges */}
              <div className="mt-4 flex items-center justify-between text-[11px] text-[#736357] px-1">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#2E7D32]" />
                  Garantia de 90 dias
                </span>
                <span className="flex items-center gap-1">
                  <RotateCcw className="w-3.5 h-3.5 text-[#9E6F45]" />
                  1ª Troca Grátis
                </span>
                <span className="flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-[#241F1C]" />
                  Envio Imediato
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
