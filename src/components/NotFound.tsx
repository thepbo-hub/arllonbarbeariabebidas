import React from 'react';
import { OFFICIAL_LOGO_URL } from '../data/products';
import { Sparkles, ArrowLeft, Home } from 'lucide-react';

interface NotFoundProps {
  onGoHome: () => void;
}

export const NotFound: React.FC<NotFoundProps> = ({ onGoHome }) => {
  return (
    <div className="min-h-screen bg-[#04172B] text-[#F5F8FC] flex flex-col items-center justify-center p-6 text-center select-none">
      <div className="relative mb-6">
        <div className="absolute -inset-3 bg-[#1687FF]/20 rounded-full blur-2xl pointer-events-none" />
        <img
          src={OFFICIAL_LOGO_URL}
          alt="Logotipo oficial da Arllon Fernandes Barbearia"
          referrerPolicy="no-referrer"
          className="relative h-16 w-auto object-contain filter drop-shadow-[0_4px_16px_rgba(22,135,255,0.35)]"
        />
      </div>

      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#082E5A]/80 border border-[#1687FF]/40 text-xs font-semibold text-[#42C8FF] mb-4">
        <Sparkles className="w-3.5 h-3.5 text-[#42C8FF]" />
        <span>PÁGINA NÃO ENCONTRADA</span>
      </div>

      <h1 className="text-6xl sm:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-[#42C8FF] to-[#1687FF] font-mono-numbers">
        404
      </h1>

      <h2 className="text-xl sm:text-2xl font-extrabold text-white uppercase tracking-tight mt-3">
        Esse endereço não existe ou foi movido
      </h2>

      <p className="mt-2 text-sm text-[#AAB8CA] max-w-md leading-relaxed">
        Não se preocupe! O catálogo completo de bebidas geladas da barbearia está à sua disposição.
      </p>

      <div className="mt-8 flex flex-col sm:flex-row items-center gap-3">
        <button
          type="button"
          onClick={onGoHome}
          className="btn-3d-primary px-6 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center gap-2 text-white"
        >
          <Home className="w-4 h-4" />
          <span>Voltar ao Cardápio Oficial</span>
        </button>
      </div>
    </div>
  );
};
