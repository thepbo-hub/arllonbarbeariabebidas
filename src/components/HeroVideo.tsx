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
    <section className="relative w-full min-h-[580px] sm:min-h-[640px] md:min-h-[720px] flex items-center justify-center overflow-hidden">
      {/* Background Video Layer */}
      {!videoError ? (
        <video
          autoPlay
          loop
          muted
          playsInline
          aria-label="Vídeo institucional em apresentação da barbearia"
          onError={() => setVideoError(true)}
          className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none select-none opacity-80"
          style={{ filter: 'brightness(0.7) contrast(1.15)' }}
        >
          <source src={HERO_VIDEO_URL} type="video/mp4" />
        </video>
      ) : (
        /* Fallback if video fails to load */
        <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-[#082E5A] via-[#0B2340] to-[#04172B]" />
      )}

      {/* Cinematic Gradient Overlays */}
      {/* Top overlay */}
      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-[#082E5A]/90 via-[#04172B]/50 to-transparent pointer-events-none" />

      {/* Center atmospheric blue tint */}
      <div className="absolute inset-0 bg-[#04172B]/35 mix-blend-multiply pointer-events-none" />

      {/* Bottom progressive transition to #04172B */}
      <div className="absolute bottom-0 inset-x-0 h-64 bg-gradient-to-t from-[#04172B] via-[#04172B]/85 to-transparent pointer-events-none" />

      {/* Hero Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center pt-24 pb-16 flex flex-col items-center">
        {/* Subtle kicker badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#082E5A]/80 border border-[#1687FF]/40 text-xs font-semibold text-[#42C8FF] mb-6 backdrop-blur-md shadow-[0_0_20px_rgba(22,135,255,0.2)]"
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
            <span>EXPLORAR CATÁLOGO</span>
            <ChevronDown className="w-4 h-4 text-[#42C8FF] animate-bounce" aria-hidden="true" />
          </button>
        </motion.div>

        {/* Subtle Animated Scroll Invitation Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          onClick={onExploreClick}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onExploreClick();
            }
          }}
          className="mt-14 sm:mt-16 flex flex-col items-center gap-2 cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1687FF] rounded-xl p-1"
          role="button"
          tabIndex={0}
          aria-label="Rolar para baixo e ver catálogo de bebidas"
        >
          <span className="text-[11px] font-medium tracking-wider text-[#AAB8CA] uppercase group-hover:text-white transition-colors">
            Deslize para ver o catálogo
          </span>
          <div className="w-5 h-8 rounded-full border border-[#42C8FF]/40 flex items-start justify-center p-1 group-hover:border-[#42C8FF] transition-colors" aria-hidden="true">
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              className="w-1.5 h-1.5 rounded-full bg-[#42C8FF]"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};
