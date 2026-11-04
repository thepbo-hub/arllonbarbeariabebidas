import React, { useState } from 'react';
import { Product } from '../types';
import { formatCurrency } from '../utils/formatters';
import { Eye, Sparkles, Flame } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
  index: number;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelect,
  index,
}) => {
  const [imgError, setImgError] = useState(false);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -7;
    const rotateY = ((x - centerX) / centerX) * 7;
    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  return (
    <div
      onClick={() => onSelect(product)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(product);
        }
      }}
      className="catalog-product-card group relative flex flex-col justify-between rounded-2xl p-4 sm:p-5 cursor-pointer select-none outline-none focus-visible:ring-2 focus-visible:ring-[#1687FF]"
      style={{
        transform: `perspective(900px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
        transformStyle: 'preserve-3d',
        background: 'linear-gradient(180deg, #093566 0%, #082E5A 100%)',
        border: '1px solid rgba(66, 200, 255, 0.22)',
        boxShadow: '0 12px 30px -10px rgba(4, 23, 43, 0.9), 0 0 18px rgba(22, 135, 255, 0.1)',
        transition: 'transform 0.15s ease-out, box-shadow 0.25s ease, border-color 0.25s ease',
      }}
    >
      {/* Top subtle highlight reflection bar */}
      <div className="absolute top-0 inset-x-4 h-[1px] bg-gradient-to-r from-transparent via-white/35 to-transparent pointer-events-none" />

      {/* Category / Variant / Mais Vendido indicator bar */}
      <div className="flex items-center justify-between gap-1.5 mb-2 flex-wrap">
        <span className="text-[11px] font-medium text-[#AAB8CA] uppercase tracking-wider">
          {product.category}
        </span>
        <div className="flex items-center gap-1.5">
          {product.mais_vendido && (
            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#F5F8FC] bg-gradient-to-r from-[#1687FF] to-[#082E5A] px-2 py-0.5 rounded-md border border-[#42C8FF]/60 shadow-[0_0_12px_rgba(22,135,255,0.45)]">
              <Flame className="w-3 h-3 text-[#42C8FF]" />
              <span>Mais Vendido</span>
            </span>
          )}
          {product.hasVariants && (
            <span className="text-[10px] font-semibold text-[#42C8FF] bg-[#04172B]/60 px-2 py-0.5 rounded border border-[#42C8FF]/30">
              Original / Zero
            </span>
          )}
        </div>
      </div>

      {/* Product Image Stage (Main visual, contain, proportional, no clipping) */}
      <div className="relative w-full h-48 sm:h-56 md:h-60 flex items-center justify-center my-1 overflow-hidden">
        {/* Soft radial background glow */}
        <div className="absolute w-36 h-36 rounded-full bg-[#1687FF]/15 blur-xl group-hover:bg-[#1687FF]/25 transition-all duration-300" />

        {!imgError ? (
          <img
            src={product.image}
            alt={`Embalagem original da bebida ${product.name}`}
            onError={() => setImgError(true)}
            loading={index < 4 ? 'eager' : 'lazy'}
            decoding="async"
            referrerPolicy="no-referrer"
            className="relative z-10 max-h-44 sm:max-h-52 w-auto object-contain filter drop-shadow-[0_12px_18px_rgba(4,23,43,0.85)] transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="w-32 h-44 flex flex-col items-center justify-center rounded-xl bg-[#04172B]/60 border border-[#1687FF]/30 text-center p-3">
            <Sparkles className="w-8 h-8 text-[#42C8FF] mb-2" aria-hidden="true" />
            <span className="text-xs text-[#AAB8CA]">{product.name}</span>
          </div>
        )}

        {/* Hover interaction preview pill */}
        <div className="absolute inset-x-0 bottom-2 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20 pointer-events-none">
          <span className="px-3 py-1 rounded-full bg-[#04172B]/90 border border-[#42C8FF]/40 text-xs font-semibold text-[#42C8FF] backdrop-blur-md shadow-lg flex items-center gap-1.5">
            <Eye className="w-3.5 h-3.5" aria-hidden="true" />
            {product.localVideoUrl || product.videoUrl ? 'Ver Vídeo' : 'Ver Animação'}
          </span>
        </div>
      </div>

      {/* Information & Price Bar */}
      <div className="mt-3 pt-3 border-t border-white/10 flex flex-col gap-1.5">
        <h3 className="text-base sm:text-lg font-bold text-[#F5F8FC] leading-snug group-hover:text-white transition-colors">
          {product.name}
        </h3>

        <div className="flex items-center justify-between gap-2 mt-1">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase text-[#AAB8CA] font-medium">Preço</span>
            <span className="text-lg sm:text-xl font-extrabold text-[#F5F8FC] font-mono-numbers">
              {formatCurrency(product.priceInCents)}
            </span>
          </div>

          {/* 3D Secondary Button to explore */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onSelect(product);
            }}
            aria-label={`Ver detalhes e animação de ${product.name}`}
            className="btn-3d-secondary px-3.5 py-2 text-xs font-bold text-[#F5F8FC] flex items-center gap-1.5 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1687FF]"
          >
            <span>Explorar</span>
            <Sparkles className="w-3 h-3 text-[#42C8FF]" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
};
