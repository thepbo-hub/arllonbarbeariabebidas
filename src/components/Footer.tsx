import React from 'react';
import { OFFICIAL_LOGO_URL } from '../data/products';
import { useCart } from '../context/CartContext';
import { ArrowUp, ShoppingBag, Sparkles, Shield, FileText, Cookie, AlertCircle } from 'lucide-react';
import { LegalModalType } from './LegalModal';

interface FooterProps {
  onBackToTop: () => void;
  onOpenLegal: (type: LegalModalType) => void;
}

export const Footer: React.FC<FooterProps> = ({ onBackToTop, onOpenLegal }) => {
  const { totalItemsCount, openCart } = useCart();

  return (
    <footer className="relative bg-gradient-to-b from-[#04172B] via-[#04172B] to-[#020b15] pt-16 pb-12 border-t border-[#1687FF]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        {/* Subtle ambient glow behind logo */}
        <div className="relative mb-6">
          <div className="absolute -inset-2 bg-[#1687FF]/20 rounded-full blur-xl pointer-events-none" />
          <img
            src={OFFICIAL_LOGO_URL}
            alt="Logotipo oficial da Arllon Fernandes Barbearia"
            referrerPolicy="no-referrer"
            className="relative h-12 sm:h-14 w-auto object-contain filter drop-shadow-[0_2px_10px_rgba(22,135,255,0.25)]"
          />
        </div>

        {/* Section title & thank you note */}
        <h4 className="text-sm sm:text-base font-bold tracking-widest text-[#42C8FF] uppercase">
          ARLLON FERNANDES BARBEARIA
        </h4>
        <span className="text-xs text-[#AAB8CA] mt-1 font-semibold tracking-wider uppercase">
          Catálogo Oficial de Bebidas
        </span>

        <p className="mt-3 text-xs sm:text-sm text-[#AAB8CA] max-w-md leading-relaxed">
          Agradecemos pela sua preferência. Aproveite cada detalhe do seu atendimento com a máxima qualidade e sofisticação.
        </p>

        {/* Informative notice badge required by consumer protection / LGPD */}
        <div className="mt-5 p-3 rounded-xl bg-[#082E5A]/30 border border-[#1687FF]/20 max-w-xl text-left flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 text-[#42C8FF] shrink-0 mt-0.5" aria-hidden="true" />
          <p className="text-[11px] text-[#AAB8CA] leading-normal">
            <strong>Aviso de Transparência:</strong> Os preços, horários e itens em cardápio têm caráter estritamente informativo. A confirmação de disponibilidade física em estoque e atendimento ocorre diretamente com a equipe.
          </p>
        </div>

        {/* Action buttons in footer */}
        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={onBackToTop}
            className="btn-3d-secondary px-4 py-2.5 text-xs font-semibold flex items-center gap-2 text-white"
          >
            <ArrowUp className="w-3.5 h-3.5 text-[#42C8FF]" aria-hidden="true" />
            <span>Voltar ao topo</span>
          </button>

          <button
            type="button"
            onClick={openCart}
            className="btn-3d-secondary px-4 py-2.5 text-xs font-semibold flex items-center gap-2 text-white"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-[#1687FF]" aria-hidden="true" />
            <span>Ver Carrinho ({totalItemsCount})</span>
          </button>
        </div>

        {/* Legal & LGPD Navigation Links */}
        <nav aria-label="Informações legais e privacidade" className="mt-8 pt-6 border-t border-white/10 w-full flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs">
          <button
            type="button"
            onClick={() => onOpenLegal('privacy')}
            className="text-[#AAB8CA] hover:text-[#42C8FF] transition-colors flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#1687FF] rounded px-1.5 py-0.5"
          >
            <Shield className="w-3.5 h-3.5 text-[#1687FF]" aria-hidden="true" />
            <span>Política de Privacidade (LGPD)</span>
          </button>

          <span className="text-white/20 hidden sm:inline" aria-hidden="true">&bull;</span>

          <button
            type="button"
            onClick={() => onOpenLegal('terms')}
            className="text-[#AAB8CA] hover:text-[#42C8FF] transition-colors flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#1687FF] rounded px-1.5 py-0.5"
          >
            <FileText className="w-3.5 h-3.5 text-[#1687FF]" aria-hidden="true" />
            <span>Termos de Uso</span>
          </button>

          <span className="text-white/20 hidden sm:inline" aria-hidden="true">&bull;</span>

          <button
            type="button"
            onClick={() => onOpenLegal('cookies')}
            className="text-[#AAB8CA] hover:text-[#42C8FF] transition-colors flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#1687FF] rounded px-1.5 py-0.5"
          >
            <Cookie className="w-3.5 h-3.5 text-[#1687FF]" aria-hidden="true" />
            <span>Política de Cookies</span>
          </button>
        </nav>

        {/* Bottom copyright and compliance strip */}
        <div className="mt-6 pt-4 border-t border-white/5 w-full flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#AAB8CA]/70 gap-3">
          <span>ARLLON FERNANDES BARBEARIA &bull; Experiência Premium &bull; Em conformidade com a LGPD</span>
          <span className="flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-[#1687FF]" aria-hidden="true" /> Bebidas geladas selecionadas
          </span>
        </div>
      </div>
    </footer>
  );
};
