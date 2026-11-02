import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import { DrinkAnimationStage } from './animations/DrinkAnimationStage';
import { formatCurrency } from '../utils/formatters';
import { useCart } from '../context/CartContext';
import { ArrowLeft, Check, Minus, Plus, ShoppingBag, Sparkles, Flame } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
}) => {
  const { addToCart, openCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState<string | undefined>(undefined);
  const [variantError, setVariantError] = useState(false);
  const [showAddedSuccess, setShowAddedSuccess] = useState(false);

  // Reset state whenever product changes
  useEffect(() => {
    if (product) {
      setQuantity(1);
      setShowAddedSuccess(false);
      setVariantError(false);
      if (product.hasVariants && product.defaultVariant) {
        setSelectedVariant(product.defaultVariant);
      } else {
        setSelectedVariant(undefined);
      }
    }
  }, [product]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!product) return null;

  const handleDecrease = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };

  const handleIncrease = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleAddToCart = () => {
    if (product.hasVariants && !selectedVariant) {
      setVariantError(true);
      return;
    }

    addToCart(product, quantity, selectedVariant);
    setShowAddedSuccess(true);

    // Fire gentle celebratory confetti with barbershop blue / cyan colors
    try {
      confetti({
        particleCount: 25,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#1687FF', '#42C8FF', '#35D49A'],
      });
    } catch {
      // ignore
    }

    // Auto-hide success feedback after 3.5 seconds
    setTimeout(() => {
      setShowAddedSuccess(false);
    }, 3500);
  };

  const subtotalCents = product.priceInCents * quantity;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-drink-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-[#04172B]/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 md:p-8 animate-fadeIn"
    >
      {/* Container Surface */}
      <div
        className="relative w-full max-w-4xl bg-[#0B2340] border border-[#1687FF]/30 rounded-3xl overflow-hidden shadow-[0_25px_60px_rgba(4,23,43,0.95)] flex flex-col my-auto max-h-[95vh]"
        style={{
          boxShadow: '0 0 50px rgba(22, 135, 255, 0.15), 0 20px 40px rgba(4, 23, 43, 0.9)',
        }}
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-5 sm:px-8 py-4 border-b border-white/10 bg-[#082E5A]/60 flex-wrap gap-2">
          <button
            onClick={onClose}
            className="btn-3d-secondary px-3.5 py-2 text-xs sm:text-sm font-semibold flex items-center gap-2 text-white"
          >
            <ArrowLeft className="w-4 h-4 text-[#42C8FF]" />
            <span>Voltar ao catálogo</span>
          </button>

          <div className="flex items-center gap-2">
            {product.mais_vendido && (
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#F5F8FC] bg-gradient-to-r from-[#1687FF] to-[#082E5A] px-2.5 py-1 rounded-md border border-[#42C8FF]/60 shadow-[0_0_12px_rgba(22,135,255,0.4)]">
                <Flame className="w-3.5 h-3.5 text-[#42C8FF]" />
                <span>Mais Vendido</span>
              </span>
            )}
            <span className="text-xs font-bold uppercase tracking-wider text-[#AAB8CA]">
              {product.category}
            </span>
          </div>
        </div>

        {/* Modal Body: Split 2 columns on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-5 sm:p-8 overflow-y-auto">
          {/* Left Column: Interactive Animation Stage */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <DrinkAnimationStage
              animationType={product.animationType}
              image={product.image}
              name={product.name}
              videoUrl={product.videoUrl}
            />
            <p className="text-[11px] text-center text-[#AAB8CA] mt-2.5">
              {product.videoUrl
                ? 'Toque na mídia acima para reiniciar o vídeo oficial da bebida'
                : 'Toque na bebida acima para reiniciar a animação exclusiva'}
            </p>
          </div>

          {/* Right Column: Contiguous Purchase Module */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-5 bg-[#082E5A]/40 p-5 sm:p-6 rounded-2xl border border-white/5">
            <div>
              {/* Drink Title */}
              <h2
                id="modal-drink-title"
                className="text-2xl sm:text-3xl font-extrabold text-[#F5F8FC] uppercase tracking-tight"
              >
                {product.name}
              </h2>

              {/* Unit Price */}
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-2xl sm:text-3xl font-black text-[#1687FF] font-mono-numbers">
                  {formatCurrency(product.priceInCents)}
                </span>
                <span className="text-xs text-[#AAB8CA]">/ unidade</span>
              </div>

              {/* Description */}
              <p className="mt-4 text-sm text-[#AAB8CA] leading-relaxed">
                {product.description}
              </p>

              {/* Coca-Cola Variant Selector (Original vs Zero) */}
              {product.hasVariants && product.variants && (
                <div className="mt-6 pt-5 border-t border-white/10">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#F5F8FC] mb-2.5">
                    Escolha a Versão (Obrigatório):
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {product.variants.map((v) => {
                      const isSelected = selectedVariant === v;
                      return (
                        <button
                          key={v}
                          type="button"
                          onClick={() => {
                            setSelectedVariant(v);
                            setVariantError(false);
                          }}
                          className={`btn-3d-secondary py-2.5 px-3 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                            isSelected
                              ? 'border-[#42C8FF] text-white shadow-[0_0_15px_rgba(66,200,255,0.4)] ring-2 ring-[#1687FF]'
                              : 'text-[#AAB8CA] opacity-80'
                          }`}
                          style={
                            isSelected
                              ? {
                                  background:
                                    'linear-gradient(180deg, #1687FF 0%, #082E5A 100%)',
                                }
                              : {}
                          }
                        >
                          {isSelected && <Check className="w-4 h-4 text-[#42C8FF]" />}
                          <span>{v}</span>
                        </button>
                      );
                    })}
                  </div>
                  {variantError && (
                    <p className="text-xs text-[#FF5A65] font-semibold mt-2">
                      Por favor, selecione Original ou Zero antes de adicionar.
                    </p>
                  )}
                </div>
              )}

              {/* Quantity Stepper */}
              <div className="mt-6 pt-5 border-t border-white/10">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#F5F8FC]">
                    Quantidade:
                  </span>
                  {quantity > 1 && (
                    <span className="text-xs text-[#AAB8CA]">
                      Subtotal: <strong className="text-[#F5F8FC] font-mono-numbers">{formatCurrency(subtotalCents)}</strong>
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  {/* Minus button */}
                  <button
                    type="button"
                    onClick={handleDecrease}
                    disabled={quantity <= 1}
                    aria-label="Diminuir quantidade"
                    className="btn-3d-secondary w-11 h-11 flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <Minus className="w-4 h-4" />
                  </button>

                  {/* Quantity display */}
                  <div className="flex-1 h-11 flex items-center justify-center rounded-xl bg-[#04172B] border border-white/10 text-lg font-bold text-white font-mono-numbers">
                    {quantity}
                  </div>

                  {/* Plus button */}
                  <button
                    type="button"
                    onClick={handleIncrease}
                    aria-label="Aumentar quantidade"
                    className="btn-3d-secondary w-11 h-11 flex items-center justify-center"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Actions Area */}
            <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
              {/* Success Notification Banner */}
              <AnimatePresence>
                {showAddedSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="p-3 rounded-xl bg-[#35D49A]/20 border border-[#35D49A]/50 flex items-center justify-between text-xs text-[#35D49A] font-bold"
                  >
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4" />
                      <span>{quantity}x adicionado ao carrinho!</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        openCart();
                      }}
                      className="underline hover:text-white"
                    >
                      Abrir Carrinho
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Main Primary 3D Add to Cart Button */}
              <button
                type="button"
                onClick={handleAddToCart}
                className="btn-3d-primary btn-shimmer w-full py-3.5 px-4 text-sm sm:text-base font-bold flex items-center justify-center gap-2 uppercase tracking-wide"
              >
                <ShoppingBag className="w-4 h-4 text-[#42C8FF]" />
                <span>
                  ADICIONAR AO CARRINHO — {formatCurrency(subtotalCents)}
                </span>
              </button>

              {/* Secondary button: Open Cart or Keep shopping */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="btn-3d-secondary flex-1 py-2.5 text-xs font-semibold text-[#AAB8CA] hover:text-white"
                >
                  Continuar Escolhendo
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    openCart();
                  }}
                  className="btn-3d-secondary flex-1 py-2.5 text-xs font-bold text-[#42C8FF] flex items-center justify-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Ver Carrinho</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
