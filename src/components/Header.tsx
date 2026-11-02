import React, { useEffect, useState } from 'react';
import { OFFICIAL_LOGO_URL } from '../data/products';
import { useCart } from '../context/CartContext';
import { ShoppingBag, Sparkles } from 'lucide-react';

interface HeaderProps {
  onScrollToCatalog: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onScrollToCatalog }) => {
  const { totalItemsCount, openCart } = useCart();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, progress)));
      }
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Top thin Scroll Progress Bar (GSAP / scroll listener) */}
      <div className="fixed top-0 left-0 right-0 h-[3px] z-50 bg-[#04172B]/50 pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-[#1687FF] via-[#42C8FF] to-[#1687FF] shadow-[0_0_8px_#42C8FF] transition-all duration-75"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Main Navigation Bar */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#04172B]/90 backdrop-blur-md border-b border-[#1687FF]/20 shadow-[0_10px_30px_rgba(4,23,43,0.8)] py-3'
            : 'bg-gradient-to-b from-[#082E5A]/85 via-[#04172B]/40 to-transparent py-4 sm:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          {/* Left: Official Barbershop Logo & Section Tag */}
          <div className="flex items-center gap-3 sm:gap-4">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="group relative flex items-center shrink-0"
              title="Barbearia — Início"
            >
              <div className="absolute -inset-1 rounded-full bg-[#1687FF]/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
              <img
                src={OFFICIAL_LOGO_URL}
                alt="Logotipo oficial da Arllon Fernandes Barbearia"
                referrerPolicy="no-referrer"
                className="h-10 sm:h-12 w-auto object-contain filter drop-shadow-[0_2px_8px_rgba(22,135,255,0.3)] transition-transform group-hover:scale-105"
              />
            </a>

            <div className="h-6 w-px bg-white/15 hidden sm:block" />

            <div className="flex flex-col">
              <span className="text-[11px] sm:text-xs font-bold tracking-widest text-[#42C8FF] uppercase">
                ARLLON FERNANDES BARBEARIA
              </span>
              <span className="text-[10px] text-[#AAB8CA] hidden md:inline">
                Experiência Premium de Bebidas
              </span>
            </div>
          </div>

          {/* Right: Cart Button & Drink Availability Indicator */}
          <div className="flex items-center gap-3">
            <button
              onClick={onScrollToCatalog}
              className="hidden lg:inline-flex items-center gap-1.5 text-xs font-semibold text-[#AAB8CA] hover:text-white transition-colors px-3 py-1.5 rounded-lg hover:bg-white/5"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#1687FF]" />
              Catálogo de Bebidas
            </button>

            {/* 3D Cart Button */}
            <button
              onClick={openCart}
              aria-label={`Carrinho com ${totalItemsCount} ${totalItemsCount === 1 ? 'item' : 'itens'}`}
              className="btn-3d-secondary flex items-center gap-2.5 px-3.5 sm:px-4 py-2 text-xs sm:text-sm font-semibold text-white shrink-0"
            >
              <ShoppingBag className="w-4 h-4 text-[#42C8FF]" />
              <span className="hidden sm:inline">Carrinho</span>
              <span
                className={`min-w-[20px] h-5 px-1.5 rounded-full flex items-center justify-center text-xs font-bold font-mono-numbers transition-all ${
                  totalItemsCount > 0
                    ? 'bg-[#1687FF] text-white shadow-[0_0_10px_#1687FF]'
                    : 'bg-[#082E5A] text-[#AAB8CA]'
                }`}
              >
                {totalItemsCount}
              </span>
            </button>
          </div>
        </div>
      </header>
    </>
  );
};
