import React, { useState } from 'react';
import { HERO_VIDEO_URL } from '../data/products';
import { ChevronDown, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

interface HeroVideoProps {
  onExploreClick: () => void;
}

export const HeroVideo: React.FC<HeroVideoProps> = ({ onExploreClick }) => {
  const [videoError, setVideoError] = useState(false);

  return (
    <section className="relative w-full min-h-screen min-h-[100dvh] flex flex-col justify-between items-center overflow-hidden bg-[#04172B] md:bg-transparent">
      {/* Background Video Layer: dedicated for mobile (on desktop, App.tsx provides the full-page video) */}
      {!videoError && (
        <video
          autoPlay
          loop
          muted
          playsInline
          aria-label="Vídeo institucional em apresentação da barbearia"
          onError={() => setVideoError(true)}
          className="md:hidden absolute inset-0 w-full h-full min-w-full min-h-full object-cover object-center pointer-events-none select-none opacity-80"
          style={{ filter: 'brightness(0.72) contrast(1.15)' }}
        >
          <source src={HERO_VIDEO_URL} type="video/mp4" />
        </video>
      )}

      {/* Cinematic Multi-stage Color Gradient Overlays to soften transitions */}
      {/* 1. Top gradient smoothly emerging from the dark blue header */}
      <div
        className="absolute top-0 inset-x-0 h-44 sm:h-56 pointer-events-none z-[1]"
        style={{
          background:
            'linear-gradient(to bottom, #04172B 0%, rgba(4, 23, 43, 0.95) 25%, rgba(8, 46, 90, 0.6) 60%, rgba(22, 135, 255, 0.08) 85%, transparent 100%)',
        }}
      />

      {/* 2a. Mobile atmospheric brand color wash: fades seamlessly to solid #04172B at the bottom */}
      <div
        className="md:hidden absolute inset-0 pointer-events-none z-[1]"
        style={{
          background:
            'linear-gradient(180deg, rgba(8, 46, 90, 0.3) 0%, rgba(4, 23, 43, 0.15) 30%, rgba(22, 135, 255, 0.06) 50%, rgba(4, 23, 43, 0.45) 70%, #04172B 92%, #04172B 100%)',
        }}
      />

      {/* 2b. Desktop atmospheric brand wash: transparent & luminous so video extends across the whole page */}
      <div
        className="hidden md:block absolute inset-0 pointer-events-none z-[1]"
        style={{
          background:
            'linear-gradient(180deg, rgba(8, 46, 90, 0.25) 0%, rgba(4, 23, 43, 0.1) 40%, rgba(4, 23, 43, 0.3) 100%)',
        }}
      />

      {/* 3. Cinematic Vignette for depth on all viewports */}
      <div
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 35%, rgba(4, 23, 43, 0.4) 70%, rgba(4, 23, 43, 0.85) 100%)',
        }}
      />

      {/* 4a. Mobile ultra-smooth bottom degradê: 100% solid #04172B from bottom up to 35% */}
      <div
        className="md:hidden absolute bottom-0 inset-x-0 h-[420px] sm:h-[500px] pointer-events-none z-[2]"
        style={{
          background:
            'linear-gradient(to top, #04172B 0%, #04172B 35%, rgba(4, 23, 43, 0.98) 48%, rgba(4, 23, 43, 0.9) 60%, rgba(8, 46, 90, 0.6) 74%, rgba(22, 135, 255, 0.16) 86%, rgba(66, 200, 255, 0.05) 94%, transparent 100%)',
        }}
      />

      {/* 4b. Desktop bottom degradê: gentle soft wash so video continues across the entire catalog and page */}
      <div
        className="hidden md:block absolute bottom-0 inset-x-0 h-48 pointer-events-none z-[2]"
        style={{
          background:
            'linear-gradient(to bottom, transparent 0%, rgba(4, 23, 43, 0.35) 100%)',
        }}
      />

      {/* 5. Subtle glowing blue aura positioned well above the base */}
      <div
        className="absolute bottom-36 sm:bottom-44 left-1/2 -translate-x-1/2 w-[90vw] max-w-3xl h-36 pointer-events-none z-[2]"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(22, 135, 255, 0.14) 0%, rgba(66, 200, 255, 0.06) 50%, transparent 80%)',
        }}
      />

      {/* Hero Content (Centered between header and cardapio) */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center pt-28 sm:pt-32 pb-8 flex flex-col items-center my-auto">
        {/* Subtle kicker badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#082E5A]/85 border border-[#1687FF]/40 text-xs font-semibold text-[#42C8FF] mb-6 backdrop-blur-md shadow-[0_0_20px_rgba(22,135,255,0.25)]"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#42C8FF]" aria-hidden="true" />
          <span>ARLLON FERNANDES BARBEARIA</span>
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[#F5F8FC] uppercase leading-tight sm:leading-none max-w-3xl"
          style={{ textWrap: 'balance' }}
        >
          UMA EXPERIÊNCIA <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F5F8FC] via-[#42C8FF] to-[#1687FF]">AINDA MELHOR.</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-5 text-base sm:text-lg md:text-xl text-[#AAB8CA] max-w-2xl font-normal leading-relaxed"
          style={{ textWrap: 'balance' }}
        >
          Escolha sua bebida favorita e aproveite cada momento na barbearia.
        </motion.p>

        {/* Action button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="mt-8 flex flex-col sm:flex-row items-center gap-4"
        >
          <button
            type="button"
            onClick={onExploreClick}
            className="btn-3d-primary btn-shimmer px-7 py-3 text-sm sm:text-base font-bold flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <span>VER CARDÁPIO OFICIAL</span>
            <ChevronDown className="w-4 h-4 text-[#42C8FF] animate-bounce" aria-hidden="true" />
          </button>
        </motion.div>
      </div>

      {/* Subtle Animated Scroll Invitation Indicator positioned at bottom right above Cardápio */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.9 }}
        transition={{ delay: 0.9, duration: 0.8 }}
        onClick={onExploreClick}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onExploreClick();
          }
        }}
        className="relative z-10 pb-6 sm:pb-8 flex flex-col items-center gap-2 cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1687FF] rounded-xl p-2"
        role="button"
        tabIndex={0}
        aria-label="Rolar para baixo até o Cardápio Oficial de bebidas"
      >
        <span className="text-[11px] font-semibold tracking-wider text-[#AAB8CA] uppercase group-hover:text-[#42C8FF] transition-colors flex items-center gap-1.5">
          <span>Cardápio Oficial</span>
          <ChevronDown className="w-3.5 h-3.5 text-[#42C8FF] animate-bounce" aria-hidden="true" />
        </span>
        <div className="w-5 h-8 rounded-full border border-[#42C8FF]/50 flex items-start justify-center p-1 group-hover:border-[#42C8FF] transition-colors bg-[#04172B]/60 backdrop-blur-sm" aria-hidden="true">
          <motion.div
            animate={{ y: [0, 11, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="w-1.5 h-1.5 rounded-full bg-[#42C8FF]"
          />
        </div>
      </motion.div>
    </section>
  );
};
