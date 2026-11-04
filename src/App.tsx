import React, { useState, useEffect, useRef } from 'react';
import { Header } from './components/Header';
import { HeroVideo } from './components/HeroVideo';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { Footer } from './components/Footer';
import { CookieBanner } from './components/CookieBanner';
import { LegalModal, LegalModalType } from './components/LegalModal';
import { NotFound } from './components/NotFound';
import { ErrorBoundary } from './components/ErrorBoundary';
import { PRODUCTS, HERO_VIDEO_URL, LOCAL_HERO_VIDEO_URL } from './data/products';
import { Product } from './types';
import { CartProvider, useCart } from './context/CartContext';
import { Sparkles, Flame, AlertCircle } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CATEGORIES = [
  'Todos',
  'Mais Vendidos',
  'Refrigerantes',
  'Energéticos',
  'Águas',
  'Sucos e Refrescos',
  'Isotônicos',
] as const;

const VALID_STATIC_PATHS = new Set(['', '/', '/index.html', '/privacidade', '/termos', '/cookies', '/cardapio']);

function CatalogContent() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('Todos');
  const [legalModal, setLegalModal] = useState<LegalModalType>(null);
  const [currentPath, setCurrentPath] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.location.pathname.replace(/\/$/, '') || '/';
    }
    return '/';
  });
  const catalogRef = useRef<HTMLDivElement>(null);
  const { totalItemsCount, openCart } = useCart();

  // Listen to popstate (back/forward in browser)
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname.replace(/\/$/, '') || '/';
      setCurrentPath(path);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Sync direct paths like /privacidade, /termos, /cookies, /cardapio
  useEffect(() => {
    const normalized = currentPath.replace(/\/$/, '') || '/';
    if (normalized === '/privacidade') {
      setLegalModal('privacy');
    } else if (normalized === '/termos') {
      setLegalModal('terms');
    } else if (normalized === '/cookies') {
      setLegalModal('cookies');
    } else if (normalized === '/cardapio') {
      setTimeout(() => scrollToCatalog(), 150);
    }
  }, [currentPath]);

  // Listen to open-legal-modal custom events (e.g. from cookie banner)
  useEffect(() => {
    const handleOpenModal = (e: Event) => {
      const customEvent = e as CustomEvent<LegalModalType>;
      if (customEvent.detail) {
        setLegalModal(customEvent.detail);
      }
    };
    window.addEventListener('open-legal-modal', handleOpenModal);
    return () => window.removeEventListener('open-legal-modal', handleOpenModal);
  }, []);

  const filteredProducts = activeCategory === 'Todos'
    ? PRODUCTS
    : activeCategory === 'Mais Vendidos'
    ? PRODUCTS.filter((p) => p.mais_vendido)
    : PRODUCTS.filter((p) => p.category === activeCategory);

  const scrollToCatalog = () => {
    catalogRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // GSAP & ScrollTrigger orchestration with prefers-reduced-motion check
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const triggerElement = catalogRef.current;
    if (!triggerElement) return;

    const ctx = gsap.context(() => {
      // Staggered reveal for catalog cards
      const cards = triggerElement.querySelectorAll('.catalog-product-card');
      if (cards.length > 0) {
        gsap.from(cards, {
          scrollTrigger: {
            trigger: triggerElement,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          y: 45,
          opacity: 0,
          scale: 0.95,
          duration: 0.7,
          stagger: 0.07,
          ease: 'power2.out',
        });
      }

      // Ambient Parallax on background light glows
      const orb1 = triggerElement.querySelector('.ambient-orb-1');
      if (orb1) {
        gsap.to(orb1, {
          scrollTrigger: {
            trigger: triggerElement,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5,
          },
          y: -90,
          ease: 'none',
        });
      }

      const orb2 = triggerElement.querySelector('.ambient-orb-2');
      if (orb2) {
        gsap.to(orb2, {
          scrollTrigger: {
            trigger: triggerElement,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 2,
          },
          y: 110,
          ease: 'none',
        });
      }
    }, triggerElement);

    return () => ctx.revert();
  }, [activeCategory]);

  const handleOpenLegal = (type: LegalModalType) => {
    setLegalModal(type);
    if (type) {
      const path = type === 'privacy' ? '/privacidade' : type === 'terms' ? '/termos' : '/cookies';
      window.history.pushState({}, '', path);
      setCurrentPath(path);
    }
  };

  const handleCloseLegal = () => {
    setLegalModal(null);
    if (['/privacidade', '/termos', '/cookies'].includes(currentPath)) {
      window.history.pushState({}, '', '/');
      setCurrentPath('/');
    }
  };

  // 404 handler for invalid routes/deep links
  if (!VALID_STATIC_PATHS.has(currentPath)) {
    return (
      <NotFound
        onGoHome={() => {
          window.history.pushState({}, '', '/');
          setCurrentPath('/');
        }}
      />
    );
  }

  return (
    <div className="relative min-h-screen bg-[#04172B] text-[#F5F8FC] selection:bg-[#1687FF]/30 flex flex-col justify-between overflow-x-hidden">
      {/* Full-Page Background Video on Desktop (Computador) */}
      <div className="hidden md:block fixed inset-0 w-full h-full pointer-events-none select-none z-0 overflow-hidden">
        <video
          ref={(el) => {
            if (el) {
              el.muted = true;
              el.defaultMuted = true;
              el.play().catch(() => {});
            }
          }}
          autoPlay
          loop
          muted
          playsInline
          aria-hidden="true"
          className="w-full h-full object-cover object-center opacity-65"
          style={{ filter: 'brightness(0.68) contrast(1.15)' }}
        >
          <source src={LOCAL_HERO_VIDEO_URL} type="video/mp4" />
          <source src={HERO_VIDEO_URL} type="video/mp4" />
        </video>
        {/* Full-page ambient barbershop overlays on desktop */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#082E5A]/45 via-[#04172B]/65 to-[#04172B]/85 mix-blend-multiply" />
        <div className="absolute inset-0 bg-radial from-transparent via-[#04172B]/40 to-[#04172B]/80" />
      </div>

      {/* Top Header */}
      <ErrorBoundary fallbackTitle="Falha no cabeçalho">
        <Header onScrollToCatalog={scrollToCatalog} />
      </ErrorBoundary>

      {/* Main Content */}
      <main id="main-content" tabIndex={-1} className="relative z-10 flex-1 outline-none">
        {/* Upper Hero Cinematic Video Section */}
        <ErrorBoundary fallbackTitle="Falha na apresentação principal">
          <HeroVideo onExploreClick={scrollToCatalog} />
        </ErrorBoundary>

        {/* Catalog Section */}
        <ErrorBoundary fallbackTitle="Falha no carregamento do catálogo">
          <section
            id="catalog-section"
            ref={catalogRef}
            aria-labelledby="catalog-heading"
            className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 scroll-mt-20"
          >
            {/* Ambient Parallax Orbs in background */}
            <div className="ambient-orb-1 absolute top-20 left-4 w-96 h-96 rounded-full bg-[#1687FF]/10 blur-3xl pointer-events-none" aria-hidden="true" />
            <div className="ambient-orb-2 absolute bottom-20 right-4 w-96 h-96 rounded-full bg-[#42C8FF]/10 blur-3xl pointer-events-none" aria-hidden="true" />

            {/* Section Heading */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-white/10">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-[#42C8FF] uppercase mb-2">
                  <Sparkles className="w-3.5 h-3.5 text-[#1687FF]" aria-hidden="true" />
                  <span>Cardápio Oficial</span>
                </div>
                <h2 id="catalog-heading" className="text-2xl sm:text-4xl font-extrabold tracking-tight text-[#F5F8FC] uppercase">
                  Bebidas
                </h2>
                <p className="mt-2 text-sm text-[#AAB8CA] max-w-xl">
                  Selecione sua bebida para abrir a experiência 3D exclusiva, definir a quantidade e encaminhar o pedido pelo WhatsApp.
                </p>
              </div>

              {/* Category Filter Buttons */}
              <nav aria-label="Categorias do cardápio" className="flex items-center gap-1.5 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
                {CATEGORIES.map((cat) => {
                  const isActive = activeCategory === cat;
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setActiveCategory(cat)}
                      aria-pressed={isActive}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap shrink-0 transition-all cursor-pointer inline-flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1687FF] ${
                        isActive
                          ? 'bg-[#1687FF] text-white shadow-[0_0_15px_rgba(22,135,255,0.4)] border border-[#42C8FF]'
                          : cat === 'Mais Vendidos'
                          ? 'bg-[#0B2340] text-[#42C8FF] border border-[#1687FF]/30 hover:border-[#42C8FF]'
                          : 'bg-[#0B2340] text-[#AAB8CA] hover:text-white border border-white/5 hover:border-white/20'
                      }`}
                    >
                      {cat === 'Mais Vendidos' && (
                        <Flame className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-[#42C8FF]'}`} aria-hidden="true" />
                      )}
                      <span>{cat}</span>
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Product Cards Grid: 4 columns desktop, 3-2 tablet, 2 mobile */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6" role="region" aria-label="Lista de bebidas disponíveis">
              {filteredProducts.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  index={index}
                  onSelect={(p) => setSelectedProduct(p)}
                />
              ))}
            </div>

            {/* Quick Order Banner / Reminder with Informative Notice */}
            <div className="mt-16 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#082E5A] via-[#0B2340] to-[#082E5A] border border-[#1687FF]/30 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
              <div>
                <span className="text-xs font-bold text-[#42C8FF] uppercase tracking-wider flex items-center justify-center md:justify-start gap-1.5">
                  <AlertCircle className="w-4 h-4 text-[#42C8FF]" aria-hidden="true" />
                  Atendimento Personalizado &bull; Preços Informativos
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
                  Deseja que sua bebida esteja pronta assim que sentar na cadeira?
                </h3>
                <p className="text-xs sm:text-sm text-[#AAB8CA] mt-1.5 max-w-2xl leading-relaxed">
                  Monte seu pedido e envie direto para o WhatsApp da barbearia. É rápido, prático e sem filas. Confirmação de estoque e pagamento são formalizados pelo atendimento.
                </p>
              </div>

              <button
                type="button"
                onClick={openCart}
                className="btn-3d-primary btn-shimmer px-6 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider shrink-0 flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <span>Ver Pedido ({totalItemsCount})</span>
              </button>
            </div>
          </section>
        </ErrorBoundary>
      </main>

      {/* Footer */}
      <Footer onBackToTop={scrollToTop} onOpenLegal={handleOpenLegal} />

      {/* Individual Drink Interactive Modal (Section 7 & 8) */}
      <ErrorBoundary fallbackTitle="Falha na experiência da bebida">
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      </ErrorBoundary>

      {/* Slide-out Cart Drawer (Section 10 & 11) */}
      <ErrorBoundary fallbackTitle="Falha no carrinho de compras">
        <CartDrawer />
      </ErrorBoundary>

      {/* LGPD Separate Legal Modals (Privacy, Terms, Cookies) */}
      <LegalModal type={legalModal} onClose={handleCloseLegal} />

      {/* LGPD Cookie Consent Banner */}
      <CookieBanner />
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <CatalogContent />
    </CartProvider>
  );
}
