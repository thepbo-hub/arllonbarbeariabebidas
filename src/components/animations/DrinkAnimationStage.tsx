import React, { useEffect, useState, useRef } from 'react';
import { DrinkAnimationType } from '../../types';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, RefreshCw } from 'lucide-react';

interface Props {
  animationType: DrinkAnimationType;
  image: string;
  name: string;
  videoUrl?: string;
  onImageLoaded?: () => void;
}

export const DrinkAnimationStage: React.FC<Props> = ({
  animationType,
  image,
  name,
  videoUrl,
  onImageLoaded,
}) => {
  const [triggerKey, setTriggerKey] = useState(0);
  const [imgError, setImgError] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleReplay = () => {
    setTriggerKey((prev) => prev + 1);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  };

  return (
    <div
      onClick={handleReplay}
      className="relative w-full h-[360px] sm:h-[420px] md:h-[460px] flex items-center justify-center overflow-hidden rounded-2xl cursor-pointer select-none group"
      style={{
        background: 'radial-gradient(circle at 50% 50%, #082E5A 0%, #04172B 80%)',
        border: '1px solid rgba(66, 200, 255, 0.2)',
        boxShadow: 'inset 0 0 60px rgba(4, 23, 43, 0.9), 0 15px 35px rgba(4, 23, 43, 0.7)',
      }}
      title={videoUrl ? 'Toque para reiniciar o vídeo oficial' : 'Clique na bebida para reviver a animação'}
    >
      {/* Replay indicator pill */}
      <div className="absolute top-3 right-3 z-30 flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#04172B]/75 border border-[#42C8FF]/30 text-xs font-medium text-[#AAB8CA] backdrop-blur-md opacity-80 group-hover:opacity-100 group-hover:border-[#42C8FF] transition-all">
        <RefreshCw className="w-3.5 h-3.5 text-[#42C8FF] group-hover:rotate-180 transition-transform duration-500" />
        <span>{videoUrl ? 'Reiniciar Vídeo' : 'Toque para animar'}</span>
      </div>

      {/* Render Video if provided and functional, otherwise render signature animation */}
      {videoUrl && !videoError ? (
        <div className="relative w-full h-full flex flex-col items-center justify-center p-4">
          <div className="relative max-h-[300px] sm:max-h-[360px] flex items-center justify-center overflow-hidden rounded-xl">
            <video
              ref={videoRef}
              src={videoUrl}
              autoPlay
              loop
              muted
              playsInline
              aria-label={`Apresentação em vídeo oficial da bebida ${name}`}
              onError={() => setVideoError(true)}
              className="max-h-[300px] sm:max-h-[360px] w-auto object-contain filter drop-shadow-[0_15px_30px_rgba(4,23,43,0.9)]"
            />
          </div>
          <span className="text-[11px] font-semibold text-[#42C8FF] mt-2 flex items-center gap-1">
            <Sparkles className="w-3 h-3" aria-hidden="true" /> Vídeo Oficial da Bebida
          </span>
        </div>
      ) : (
        <AnimatePresence mode="wait">
          <div key={triggerKey} className="relative w-full h-full flex items-center justify-center">
            {renderAnimation(animationType, image, name, onImageLoaded, imgError, () => setImgError(true))}
          </div>
        </AnimatePresence>
      )}
    </div>
  );
};

function renderAnimation(
  type: DrinkAnimationType,
  image: string,
  name: string,
  onLoaded?: () => void,
  imgError?: boolean,
  onError?: () => void
) {
  switch (type) {
    case 'guarana':
      return <GuaranaAnimation image={image} name={name} onLoaded={onLoaded} imgError={imgError} onError={onError} />;
    case 'guaravita':
      return <GuaravitaAnimation image={image} name={name} onLoaded={onLoaded} imgError={imgError} onError={onError} />;
    case 'guaraviton':
      return <GuaravitonAnimation image={image} name={name} onLoaded={onLoaded} imgError={imgError} onError={onError} />;
    case 'h2oh':
      return <H2ohAnimation image={image} name={name} onLoaded={onLoaded} imgError={imgError} onError={onError} />;
    case 'monster':
      return <MonsterAnimation image={image} name={name} onLoaded={onLoaded} imgError={imgError} onError={onError} />;
    case 'powerade':
      return <PoweradeAnimation image={image} name={name} onLoaded={onLoaded} imgError={imgError} onError={onError} />;
    case 'redbull':
      return <RedBullAnimation image={image} name={name} onLoaded={onLoaded} imgError={imgError} onError={onError} />;
    case 'aguacomgas':
      return <AguaComGasAnimation image={image} name={name} onLoaded={onLoaded} imgError={imgError} onError={onError} />;
    case 'cocacola':
      return <CocaColaAnimation image={image} name={name} onLoaded={onLoaded} imgError={imgError} onError={onError} />;
    case 'fanta':
      return <FantaAnimation image={image} name={name} onLoaded={onLoaded} imgError={imgError} onError={onError} />;
    case 'limoneto':
      return <LimonetoAnimation image={image} name={name} onLoaded={onLoaded} imgError={imgError} onError={onError} />;
    case 'sprite':
      return <SpriteAnimation image={image} name={name} onLoaded={onLoaded} imgError={imgError} onError={onError} />;
    case 'tita':
      return <TitaAnimation image={image} name={name} onLoaded={onLoaded} imgError={imgError} onError={onError} />;
    default:
      return <GuaranaAnimation image={image} name={name} onLoaded={onLoaded} imgError={imgError} onError={onError} />;
  }
}

// Common Image Wrapper with fallback
const BottleImage: React.FC<{
  src: string;
  alt: string;
  className?: string;
  onLoaded?: () => void;
  imgError?: boolean;
  onError?: () => void;
}> = ({ src, alt, className = '', onLoaded, imgError, onError }) => {
  if (imgError) {
    return (
      <div className="w-52 h-72 flex flex-col items-center justify-center p-4 rounded-xl bg-[#082E5A] border border-[#1687FF]/40 text-center">
        <Sparkles className="w-12 h-12 text-[#42C8FF] mb-2 animate-pulse" />
        <span className="text-sm font-bold text-white">{alt}</span>
        <span className="text-xs text-[#AAB8CA] mt-1">Bebida Gelada</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      onLoad={onLoaded}
      onError={onError}
      referrerPolicy="no-referrer"
      className={`max-h-[290px] sm:max-h-[340px] w-auto object-contain filter drop-shadow-[0_15px_25px_rgba(4,23,43,0.85)] select-none pointer-events-none transition-transform ${className}`}
    />
  );
};

/* 1. GUARANÁ ANTARCTICA — Gaseificação */
const GuaranaAnimation: React.FC<{
  image: string;
  name: string;
  onLoaded?: () => void;
  imgError?: boolean;
  onError?: () => void;
}> = ({ image, name, onLoaded, imgError, onError }) => {
  // Generate 20 bubbling particles
  const bubbles = Array.from({ length: 22 }, (_, i) => ({
    id: i,
    x: (i % 6) * 35 - 90 + Math.sin(i) * 15,
    size: 4 + (i % 5) * 3,
    delay: (i * 0.12) % 2.4,
    duration: 1.8 + (i % 4) * 0.4,
  }));

  return (
    <div className="relative flex items-center justify-center w-full h-full">
      {/* Background radial glow */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.6, scale: 1 }}
        transition={{ duration: 1 }}
        className="absolute w-64 h-64 rounded-full bg-[#1687FF]/15 blur-2xl pointer-events-none"
      />

      {/* Bubbles ascending around the bottle */}
      {bubbles.map((b) => (
        <motion.div
          key={b.id}
          initial={{ y: 150, opacity: 0, x: b.x, scale: 0.4 }}
          animate={{
            y: [-20, -180],
            opacity: [0, 0.8, 0.9, 0],
            scale: [0.6, 1.2, 1],
            x: [b.x, b.x + (b.id % 2 === 0 ? 12 : -12)],
          }}
          transition={{
            duration: b.duration,
            delay: b.delay,
            repeat: Infinity,
            ease: 'easeOut',
          }}
          className="absolute z-20 rounded-full border border-[#42C8FF]/60 bg-[#42C8FF]/20 backdrop-blur-[1px] pointer-events-none"
          style={{ width: b.size, height: b.size }}
        />
      ))}

      {/* Can entrance with 3D rotation and gleam */}
      <motion.div
        initial={{ y: 90, opacity: 0, rotateY: -22, scale: 0.85 }}
        animate={{ y: 0, opacity: 1, rotateY: 0, scale: 1 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 flex items-center justify-center"
      >
        <BottleImage src={image} alt={name} onLoaded={onLoaded} imgError={imgError} onError={onError} />

        {/* Gleam light streak sweep */}
        <motion.div
          initial={{ x: '-150%', opacity: 0 }}
          animate={{ x: '180%', opacity: [0, 0.85, 0] }}
          transition={{ delay: 0.8, duration: 1.2, ease: 'easeInOut' }}
          className="absolute top-0 bottom-0 w-24 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-25deg] pointer-events-none"
        />
      </motion.div>
    </div>
  );
};

/* 2. GUARAVITA — Impacto e Ricochete */
const GuaravitaAnimation: React.FC<{
  image: string;
  name: string;
  onLoaded?: () => void;
  imgError?: boolean;
  onError?: () => void;
}> = ({ image, name, onLoaded, imgError, onError }) => {
  return (
    <div className="relative flex items-center justify-center w-full h-full">
      {/* Floor luminous shockwave circle */}
      <motion.div
        initial={{ scale: 0.2, opacity: 0 }}
        animate={{ scale: [0.2, 1.4, 1.1], opacity: [0, 0.8, 0.3] }}
        transition={{ delay: 0.4, duration: 1.2, ease: 'easeOut' }}
        className="absolute bottom-12 w-48 h-12 rounded-full border-2 border-[#1687FF]/50 bg-[#1687FF]/15 blur-sm pointer-events-none"
      />

      {/* Vertical entry with elastic bounce */}
      <motion.div
        initial={{ y: -160, opacity: 0, scaleY: 1.15, scaleX: 0.9 }}
        animate={{
          y: [-160, 15, -8, 0],
          opacity: 1,
          scaleY: [1.15, 0.88, 1.05, 1],
          scaleX: [0.9, 1.12, 0.98, 1],
        }}
        transition={{ duration: 0.85, times: [0, 0.55, 0.75, 1], ease: 'easeOut' }}
        className="relative z-10 flex items-center justify-center"
      >
        <BottleImage src={image} alt={name} onLoaded={onLoaded} imgError={imgError} onError={onError} />

        {/* Shimmer sweep */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: [0, 0.6, 0], x: 120 }}
          transition={{ delay: 0.8, duration: 0.9 }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-[#42C8FF]/30 to-transparent skew-x-[-20deg] pointer-events-none"
        />
      </motion.div>
    </div>
  );
};

/* 3. GUARAVITON — Ondas de Energia */
const GuaravitonAnimation: React.FC<{
  image: string;
  name: string;
  onLoaded?: () => void;
  imgError?: boolean;
  onError?: () => void;
}> = ({ image, name, onLoaded, imgError, onError }) => {
  return (
    <div className="relative flex items-center justify-center w-full h-full">
      {/* Expanding energy waves in background */}
      <motion.div
        initial={{ scale: 0.4, opacity: 0 }}
        animate={{ scale: [0.4, 2, 2.5], opacity: [0, 0.6, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
        className="absolute w-44 h-44 rounded-full border border-[#1687FF] bg-[#1687FF]/10 pointer-events-none"
      />
      <motion.div
        initial={{ scale: 0.2, opacity: 0 }}
        animate={{ scale: [0.2, 1.8, 2.2], opacity: [0, 0.7, 0] }}
        transition={{ delay: 0.6, duration: 2, repeat: Infinity, ease: 'easeOut' }}
        className="absolute w-44 h-44 rounded-full border border-[#42C8FF] bg-[#42C8FF]/10 pointer-events-none"
      />

      {/* Orbiting blue energy particles */}
      {[0, 60, 120, 180, 240, 300].map((deg, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 0.9, 0],
            rotate: [deg, deg + 360],
            scale: [0.5, 1.2, 0.4],
          }}
          transition={{ duration: 3, delay: i * 0.15, repeat: Infinity, ease: 'linear' }}
          className="absolute w-44 h-44 pointer-events-none"
        >
          <div className="w-2.5 h-2.5 rounded-full bg-[#42C8FF] shadow-[0_0_10px_#42C8FF]" />
        </motion.div>
      ))}

      {/* Bottle entrance with lateral tilt and silhouette glow */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85, rotate: -8 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 flex items-center justify-center"
      >
        <BottleImage src={image} alt={name} onLoaded={onLoaded} imgError={imgError} onError={onError} />
      </motion.div>
    </div>
  );
};

/* 4. H2OH! — Gotas e Frescor */
const H2ohAnimation: React.FC<{
  image: string;
  name: string;
  onLoaded?: () => void;
  imgError?: boolean;
  onError?: () => void;
}> = ({ image, name, onLoaded, imgError, onError }) => {
  // Cascading condensation droplets
  const drops = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    left: `${15 + (i * 4.2)}%`,
    delay: (i * 0.2) % 2.5,
    duration: 2.2 + (i % 3) * 0.5,
    size: 3 + (i % 3) * 2,
  }));

  return (
    <div className="relative flex items-center justify-center w-full h-full">
      {/* Icy cool glow */}
      <div className="absolute inset-0 bg-radial from-[#42C8FF]/15 via-transparent to-transparent pointer-events-none" />

      {/* Condensation mist on bottom */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: [0.3, 0.6, 0.3], y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-6 w-72 h-16 bg-[#42C8FF]/15 blur-xl rounded-full pointer-events-none"
      />

      {/* Falling fresh water droplets */}
      {drops.map((d) => (
        <motion.div
          key={d.id}
          initial={{ y: -80, opacity: 0 }}
          animate={{
            y: [ -60, 200 ],
            opacity: [0, 0.7, 0.8, 0],
          }}
          transition={{
            duration: d.duration,
            delay: d.delay,
            repeat: Infinity,
            ease: 'easeIn',
          }}
          className="absolute z-20 rounded-full bg-white/70 shadow-[0_0_6px_#42C8FF] pointer-events-none"
          style={{
            left: d.left,
            width: d.size,
            height: d.size * 1.5,
            borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
          }}
        />
      ))}

      {/* Bottle entrance with gentle rotation */}
      <motion.div
        initial={{ y: 50, opacity: 0, rotate: 6 }}
        animate={{ y: 0, opacity: 1, rotate: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 flex items-center justify-center"
      >
        <BottleImage src={image} alt={name} onLoaded={onLoaded} imgError={imgError} onError={onError} />
      </motion.div>
    </div>
  );
};

/* 5. MONSTER ENERGY — Energia Controlada */
const MonsterAnimation: React.FC<{
  image: string;
  name: string;
  onLoaded?: () => void;
  imgError?: boolean;
  onError?: () => void;
}> = ({ image, name, onLoaded, imgError, onError }) => {
  return (
    <div className="relative flex items-center justify-center w-full h-full">
      {/* High contrast dark blue energy strobe pulse */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: [0, 0.5, 0.15, 0.4, 0.2], scale: [0.9, 1.1, 1] }}
        transition={{ duration: 1.2, times: [0, 0.3, 0.5, 0.7, 1] }}
        className="absolute w-80 h-80 rounded-full bg-[#1687FF]/25 blur-3xl pointer-events-none"
      />

      {/* Vertical electric streaks traveling up the sides */}
      {[-80, 80].map((xOffset, i) => (
        <motion.div
          key={i}
          initial={{ y: 140, opacity: 0 }}
          animate={{ y: [-140, -40], opacity: [0, 1, 0] }}
          transition={{ duration: 0.7, delay: 0.4 + i * 0.15, repeat: 2 }}
          className="absolute z-20 w-1 h-32 bg-gradient-to-t from-transparent via-[#42C8FF] to-transparent pointer-events-none"
          style={{ transform: `translateX(${xOffset}px)` }}
        />
      ))}

      {/* Swift lateral entry with impact micro-vibration */}
      <motion.div
        initial={{ x: -200, opacity: 0, scale: 0.9 }}
        animate={{
          x: [-200, 10, -4, 2, 0],
          opacity: 1,
          scale: 1,
        }}
        transition={{ duration: 0.75, times: [0, 0.65, 0.8, 0.9, 1], ease: 'easeOut' }}
        className="relative z-10 flex items-center justify-center"
      >
        <BottleImage src={image} alt={name} onLoaded={onLoaded} imgError={imgError} onError={onError} />
      </motion.div>
    </div>
  );
};

/* 6. POWERADE — Movimento Fluido & Faixa de Velocidade */
const PoweradeAnimation: React.FC<{
  image: string;
  name: string;
  onLoaded?: () => void;
  imgError?: boolean;
  onError?: () => void;
}> = ({ image, name, onLoaded, imgError, onError }) => {
  return (
    <div className="relative flex items-center justify-center w-full h-full">
      {/* High-speed diagonal light beam across screen */}
      <motion.div
        initial={{ x: '-150%', y: '-100%', opacity: 0 }}
        animate={{ x: '180%', y: '120%', opacity: [0, 0.9, 0] }}
        transition={{ duration: 1.1, ease: 'easeInOut' }}
        className="absolute z-0 w-[450px] h-10 bg-gradient-to-r from-transparent via-[#42C8FF] to-transparent rotate-[-35deg] blur-md pointer-events-none"
      />

      {/* Fluid translucent wave surge */}
      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: [0.7, 1.3], opacity: [0, 0.4, 0] }}
        transition={{ delay: 0.4, duration: 1.4, ease: 'easeOut' }}
        className="absolute w-72 h-72 rounded-full border border-[#1687FF]/40 bg-[#1687FF]/10 pointer-events-none"
      />

      {/* Kinetic particles along the beam path */}
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.div
          key={i}
          initial={{ x: -100, y: -60, opacity: 0 }}
          animate={{ x: 120, y: 80, opacity: [0, 1, 0] }}
          transition={{ duration: 0.9, delay: 0.2 + i * 0.12, ease: 'easeOut' }}
          className="absolute z-20 w-2 h-2 rounded-full bg-[#42C8FF] shadow-[0_0_8px_#42C8FF] pointer-events-none"
        />
      ))}

      {/* Bottle entrance with subtle 3D tilt */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, rotateY: 25 }}
        animate={{ opacity: 1, scale: 1, rotateY: 0 }}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 flex items-center justify-center"
      >
        <BottleImage src={image} alt={name} onLoaded={onLoaded} imgError={imgError} onError={onError} />
      </motion.div>
    </div>
  );
};

/* 7. RED BULL — Ascensão e Asas de Luz */
const RedBullAnimation: React.FC<{
  image: string;
  name: string;
  onLoaded?: () => void;
  imgError?: boolean;
  onError?: () => void;
}> = ({ image, name, onLoaded, imgError, onError }) => {
  return (
    <div className="relative flex items-center justify-center w-full h-full">
      {/* 3D Ground Shadow */}
      <motion.div
        initial={{ scale: 0.3, opacity: 0 }}
        animate={{ scale: [0.3, 1], opacity: [0, 0.7] }}
        transition={{ delay: 0.4, duration: 0.9 }}
        className="absolute bottom-12 w-32 h-6 bg-black/60 blur-md rounded-full pointer-events-none"
      />

      {/* Twin discrete luminous light arcs flaring outward */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: [0, 1.3, 1.1], opacity: [0, 0.8, 0.4] }}
        transition={{ delay: 0.6, duration: 1.2, ease: 'easeOut' }}
        className="absolute z-0 w-80 h-32 border-t-2 border-[#1687FF] rounded-[100%] pointer-events-none blur-[1px]"
      />
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: [0, 1.5, 1.2], opacity: [0, 0.6, 0.2] }}
        transition={{ delay: 0.7, duration: 1.3, ease: 'easeOut' }}
        className="absolute z-0 w-96 h-40 border-t border-[#42C8FF] rounded-[100%] pointer-events-none blur-[2px]"
      />

      {/* Ascension trailing particles */}
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <motion.div
          key={i}
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: [100, -20], opacity: [0, 0.9, 0] }}
          transition={{ duration: 1.2, delay: 0.2 + i * 0.1, ease: 'easeOut' }}
          className="absolute z-15 w-2 h-2 rounded-full bg-[#1687FF] shadow-[0_0_8px_#42C8FF] pointer-events-none"
          style={{ left: `${45 + (i % 3) * 5}%` }}
        />
      ))}

      {/* Smooth ascension from bottom to center */}
      <motion.div
        initial={{ y: 120, opacity: 0, scale: 0.88 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 flex items-center justify-center"
      >
        <BottleImage src={image} alt={name} onLoaded={onLoaded} imgError={imgError} onError={onError} />
      </motion.div>
    </div>
  );
};

/* 8. ÁGUA COM GÁS — Gotas e Ondas Circulares */
const AguaComGasAnimation: React.FC<{
  image: string;
  name: string;
  onLoaded?: () => void;
  imgError?: boolean;
  onError?: () => void;
}> = ({ image, name, onLoaded, imgError, onError }) => {
  return (
    <div className="relative flex items-center justify-center w-full h-full">
      {/* Expanding circular ripple wave from base */}
      {[0, 0.5, 1].map((delay, idx) => (
        <motion.div
          key={idx}
          initial={{ scale: 0.3, opacity: 0 }}
          animate={{ scale: [0.3, 1.6], opacity: [0, 0.7, 0] }}
          transition={{ delay, duration: 2, repeat: Infinity, ease: 'easeOut' }}
          className="absolute bottom-12 w-48 h-12 rounded-full border border-[#42C8FF]/60 pointer-events-none"
        />
      ))}

      {/* Ascending clear micro-bubbles */}
      {Array.from({ length: 14 }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ y: 100, opacity: 0 }}
          animate={{
            y: [100, -140],
            opacity: [0, 0.8, 0],
            x: Math.sin(i) * 30,
          }}
          transition={{
            duration: 2.2 + (i % 3) * 0.4,
            delay: (i * 0.18) % 2,
            repeat: Infinity,
            ease: 'easeOut',
          }}
          className="absolute z-20 w-2 h-2 rounded-full bg-white/60 border border-[#42C8FF] pointer-events-none"
        />
      ))}

      {/* Gentle floating entrance */}
      <motion.div
        initial={{ y: 40, opacity: 0, scale: 0.94 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="relative z-10 flex items-center justify-center"
      >
        <BottleImage src={image} alt={name} onLoaded={onLoaded} imgError={imgError} onError={onError} />
      </motion.div>
    </div>
  );
};

/* 9. COCA-COLA — Abertura e Efervescência */
const CocaColaAnimation: React.FC<{
  image: string;
  name: string;
  onLoaded?: () => void;
  imgError?: boolean;
  onError?: () => void;
}> = ({ image, name, onLoaded, imgError, onError }) => {
  return (
    <div className="relative flex items-center justify-center w-full h-full">
      {/* Top simulated can hiss vapor burst spray */}
      <motion.div
        initial={{ scale: 0, opacity: 0, y: -90 }}
        animate={{
          scale: [0, 1.4, 1.8],
          opacity: [0, 0.85, 0],
          y: [-90, -140],
        }}
        transition={{ delay: 0.5, duration: 0.85, ease: 'easeOut' }}
        className="absolute z-25 w-24 h-12 rounded-full bg-white/40 blur-md pointer-events-none"
      />

      {/* Spray particles shooting upward from top rim */}
      {[-25, -12, 0, 12, 25].map((x, i) => (
        <motion.div
          key={i}
          initial={{ y: -80, x: 0, opacity: 0 }}
          animate={{
            y: [-80, -160 - Math.random() * 30],
            x: [0, x * 1.8],
            opacity: [0, 0.9, 0],
          }}
          transition={{ delay: 0.52 + i * 0.04, duration: 0.7, ease: 'easeOut' }}
          className="absolute z-25 w-2 h-2 rounded-full bg-white shadow-[0_0_8px_#42C8FF] pointer-events-none"
        />
      ))}

      {/* Push-in camera movement and reflex sweep */}
      <motion.div
        initial={{ scale: 0.88, opacity: 0 }}
        animate={{
          scale: [0.88, 1.04, 1],
          opacity: 1,
        }}
        transition={{ duration: 0.9, times: [0, 0.7, 1], ease: 'easeOut' }}
        className="relative z-10 flex items-center justify-center"
      >
        <BottleImage src={image} alt={name} onLoaded={onLoaded} imgError={imgError} onError={onError} />

        {/* Top can rim reflex sweep */}
        <motion.div
          initial={{ x: -120, opacity: 0 }}
          animate={{ x: 140, opacity: [0, 0.9, 0] }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="absolute top-4 w-16 h-8 bg-gradient-to-r from-transparent via-white/80 to-transparent skew-x-[-30deg] pointer-events-none"
        />
      </motion.div>
    </div>
  );
};

/* 10. FANTA LARANJA — Expansão Cítrica */
const FantaAnimation: React.FC<{
  image: string;
  name: string;
  onLoaded?: () => void;
  imgError?: boolean;
  onError?: () => void;
}> = ({ image, name, onLoaded, imgError, onError }) => {
  return (
    <div className="relative flex items-center justify-center w-full h-full">
      {/* Glowing background arc */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: [0.5, 1.3], opacity: [0, 0.6, 0.2] }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        className="absolute w-72 h-72 rounded-full border-2 border-[#1687FF]/50 bg-[#1687FF]/10 pointer-events-none"
      />

      {/* Citrus circular floating discs */}
      {Array.from({ length: 12 }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: [0, 1, 0.8],
            opacity: [0, 0.8, 0],
            x: Math.cos((i * 30 * Math.PI) / 180) * 110,
            y: Math.sin((i * 30 * Math.PI) / 180) * 110,
          }}
          transition={{ delay: 0.3 + i * 0.06, duration: 1.4, ease: 'easeOut' }}
          className="absolute z-20 w-4 h-4 rounded-full border border-[#42C8FF] bg-[#1687FF]/30 backdrop-blur-sm pointer-events-none"
        />
      ))}

      {/* Entrance */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 flex items-center justify-center"
      >
        <BottleImage src={image} alt={name} onLoaded={onLoaded} imgError={imgError} onError={onError} />
      </motion.div>
    </div>
  );
};

/* 11. H2OH! LIMONETO — Espiral Refrescante */
const LimonetoAnimation: React.FC<{
  image: string;
  name: string;
  onLoaded?: () => void;
  imgError?: boolean;
  onError?: () => void;
}> = ({ image, name, onLoaded, imgError, onError }) => {
  return (
    <div className="relative flex items-center justify-center w-full h-full">
      {/* 3D Spiral ribbon winding around bottle */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-20" viewBox="0 0 400 400">
        <motion.path
          d="M 120 320 C 280 300, 280 240, 130 220 C 270 200, 270 140, 140 120 C 260 100, 240 60, 200 40"
          fill="none"
          stroke="#42C8FF"
          strokeWidth="3"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: [0, 1], opacity: [0, 0.9, 0.4, 0] }}
          transition={{ duration: 1.6, ease: 'easeInOut' }}
        />
      </svg>

      {/* Sparkling droplets along the spiral */}
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: [0, 1, 0], scale: [0, 1.2, 0] }}
          transition={{ delay: 0.4 + i * 0.25, duration: 0.8 }}
          className="absolute z-25 w-2 h-2 rounded-full bg-white shadow-[0_0_8px_#42C8FF] pointer-events-none"
          style={{ top: `${25 + i * 14}%`, left: `${35 + (i % 2 === 0 ? 25 : -15)}%` }}
        />
      ))}

      {/* Bottle entrance */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative z-10 flex items-center justify-center"
      >
        <BottleImage src={image} alt={name} onLoaded={onLoaded} imgError={imgError} onError={onError} />
      </motion.div>
    </div>
  );
};

/* 12. SPRITE — Efervescência & Bifurcação Luminosa */
const SpriteAnimation: React.FC<{
  image: string;
  name: string;
  onLoaded?: () => void;
  imgError?: boolean;
  onError?: () => void;
}> = ({ image, name, onLoaded, imgError, onError }) => {
  return (
    <div className="relative flex items-center justify-center w-full h-full">
      {/* Continuously ascending effervescent bubbles */}
      {Array.from({ length: 16 }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ y: 130, opacity: 0 }}
          animate={{
            y: [130, -150],
            opacity: [0, 0.9, 0],
            x: Math.sin(i * 1.5) * 45,
          }}
          transition={{
            duration: 1.7 + (i % 3) * 0.3,
            delay: (i * 0.12) % 1.8,
            repeat: Infinity,
            ease: 'easeOut',
          }}
          className="absolute z-20 w-2.5 h-2.5 rounded-full bg-white/70 border border-[#42C8FF] pointer-events-none"
        />
      ))}

      {/* Bifurcated curving light rays hugging the bottle sides */}
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: ['0%', '80%', '0%'], opacity: [0, 0.8, 0] }}
        transition={{ delay: 0.4, duration: 1.2, ease: 'easeInOut' }}
        className="absolute left-[36%] z-25 w-1 bg-gradient-to-t from-transparent via-[#42C8FF] to-transparent pointer-events-none rounded-full"
      />
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: ['0%', '80%', '0%'], opacity: [0, 0.8, 0] }}
        transition={{ delay: 0.4, duration: 1.2, ease: 'easeInOut' }}
        className="absolute right-[36%] z-25 w-1 bg-gradient-to-t from-transparent via-[#42C8FF] to-transparent pointer-events-none rounded-full"
      />

      {/* Bottle entrance with subtle 3D tilt */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, rotate: -4 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative z-10 flex items-center justify-center"
      >
        <BottleImage src={image} alt={name} onLoaded={onLoaded} imgError={imgError} onError={onError} />
      </motion.div>
    </div>
  );
};

/* 13. TITA CITRUS — Pulsação & Vibração Ágil */
const TitaAnimation: React.FC<{
  image: string;
  name: string;
  onLoaded?: () => void;
  imgError?: boolean;
  onError?: () => void;
}> = ({ image, name, onLoaded, imgError, onError }) => {
  return (
    <div className="relative flex items-center justify-center w-full h-full">
      {/* Expanding luminous circle under bottle */}
      <motion.div
        initial={{ scale: 0.2, opacity: 0 }}
        animate={{ scale: [0.2, 1.4, 1.1], opacity: [0, 0.8, 0.35] }}
        transition={{ delay: 0.35, duration: 1, ease: 'easeOut' }}
        className="absolute bottom-10 w-44 h-12 rounded-full bg-[#1687FF]/20 border border-[#42C8FF]/50 blur-sm pointer-events-none"
      />

      {/* Entrance with quick twin micro-shakes */}
      <motion.div
        initial={{ y: -60, opacity: 0 }}
        animate={{
          y: [-60, 0],
          opacity: 1,
          rotate: [0, 4, -4, 2, 0],
        }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative z-10 flex items-center justify-center"
      >
        <BottleImage src={image} alt={name} onLoaded={onLoaded} imgError={imgError} onError={onError} />
      </motion.div>
    </div>
  );
};
