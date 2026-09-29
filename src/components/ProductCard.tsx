import React, { useState } from 'react';
import { Product } from '../types';
import { Eye, Check, ShoppingBag } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product, size: number) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onQuickView,
  onAddToCart,
}) => {
  const [selectedSize, setSelectedSize] = useState<number>(product.sizes[1] || product.sizes[0]);
  const [justAdded, setJustAdded] = useState(false);

  const installmentValue = (product.price / 6).toFixed(2).replace('.', ',');
  const formattedPrice = product.price.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
  const formattedOriginalPrice = product.originalPrice
    ? product.originalPrice.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      })
    : null;

  const handleBuyClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product, selectedSize);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  };

  return (
    <div 
      onClick={() => onQuickView(product)}
      className="group bg-[#FFFFFF] rounded-xl border border-[#EAE4DC] overflow-hidden flex flex-col justify-between hover:shadow-md hover:border-[#D4C4B5] transition-all duration-300 cursor-pointer"
    >
      {/* Product Image Slot */}
      <div className="relative aspect-4/3 bg-[#F7F4EE] overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />

        {/* Highlight badge if any */}
        {product.highlight && (
          <div className="absolute top-3 left-3 bg-[#241F1C]/85 backdrop-blur-xs text-white text-[11px] font-medium px-2.5 py-1 rounded tracking-wide">
            {product.highlight}
          </div>
        )}

        {/* Quick View Button on hover */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onQuickView(product);
          }}
          className="absolute bottom-3 right-3 bg-white/90 hover:bg-white text-[#241F1C] p-2 rounded-lg shadow-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          title="Ver detalhes do produto"
          aria-label={`Ver detalhes de ${product.name}`}
        >
          <Eye className="w-4 h-4" />
        </button>
      </div>

      {/* Product Content Details */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between">
        <div>
          {/* Category text separator */}
          <div className="flex items-center gap-2 text-xs text-[#8A796C] mb-1.5 uppercase tracking-wider font-semibold">
            <span>{product.categoryLabel}</span>
            <span aria-hidden="true">&bull;</span>
            <span>{product.material.split('&')[0]}</span>
          </div>

          <h3 className="font-serif-display text-xl font-bold text-[#241F1C] group-hover:text-[#9E6F45] transition-colors leading-snug">
            {product.name}
          </h3>

          <p className="mt-2 text-xs sm:text-sm text-[#66584C] line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Size Selector */}
        <div className="mt-4 pt-3 border-t border-[#F2ECE4]">
          <div className="flex items-center justify-between text-xs text-[#736357] mb-1.5">
            <span className="font-medium">Numeração:</span>
            <span className="text-[11px]">Forma Normal</span>
          </div>

          <div className="flex flex-wrap gap-1.5" onClick={(e) => e.stopPropagation()}>
            {product.sizes.map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => setSelectedSize(size)}
                className={`w-7 h-7 text-xs font-semibold rounded transition-colors flex items-center justify-center ${
                  selectedSize === size
                    ? 'bg-[#241F1C] text-white'
                    : 'bg-[#F4EFEA] text-[#4A4036] hover:bg-[#EBE2D7]'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Price & Primary Buy CTA */}
        <div className="mt-5 pt-3 border-t border-[#F2ECE4] flex items-end justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold text-[#241F1C] tabular-nums font-mono">
                {formattedPrice}
              </span>
              {formattedOriginalPrice && (
                <span className="text-xs text-[#9E8D7F] line-through tabular-nums">
                  {formattedOriginalPrice}
                </span>
              )}
            </div>
            <p className="text-[11px] text-[#736357] mt-0.5">
              ou 6x de R$ {installmentValue} sem juros
            </p>
          </div>

          <button
            onClick={handleBuyClick}
            className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all duration-200 whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
              justAdded
                ? 'bg-[#2E7D32] text-white'
                : 'bg-[#241F1C] hover:bg-[#3E342E] text-white shadow-xs'
            }`}
          >
            {justAdded ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>ADICIONADO</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>COMPRAR</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
