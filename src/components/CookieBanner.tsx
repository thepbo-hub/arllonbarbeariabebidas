import React, { useState, useEffect } from 'react';
import { ShieldCheck, Cookie, Settings, Check, X } from 'lucide-react';
import { safeLocalStorage } from '../utils/storage';

interface CookiePreferences {
  essential: boolean; // Always true
  analytics: boolean;
  marketing: boolean;
  decided: boolean;
  updatedAt: string;
}

const STORAGE_KEY = 'barbearia_cookie_consent_v1';

export const CookieBanner: React.FC = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [analyticsAllowed, setAnalyticsAllowed] = useState(false);
  const [marketingAllowed, setMarketingAllowed] = useState(false);

  useEffect(() => {
    try {
      const stored = safeLocalStorage.getItem(STORAGE_KEY);
      if (!stored) {
        setShowBanner(true);
      } else {
        const parsed = JSON.parse(stored) as CookiePreferences;
        if (!parsed.decided) {
          setShowBanner(true);
        } else {
          // If user previously accepted analytics, initialize here
          if (parsed.analytics) {
            initAnalytics();
          }
        }
      }
    } catch {
      setShowBanner(true);
    }
  }, []);

  const savePreferences = (essential: boolean, analytics: boolean, marketing: boolean) => {
    const prefs: CookiePreferences = {
      essential: true,
      analytics,
      marketing,
      decided: true,
      updatedAt: new Date().toISOString(),
    };
    try {
      safeLocalStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
    } catch {
      // Ignore
    }
    setShowBanner(false);
    setShowPreferences(false);

    if (analytics) {
      initAnalytics();
    }
  };

  const handleAcceptAll = () => {
    savePreferences(true, true, true);
  };

  const handleRejectNonEssential = () => {
    savePreferences(true, false, false);
  };

  const handleSaveCustom = () => {
    savePreferences(true, analyticsAllowed, marketingAllowed);
  };

  const initAnalytics = () => {
    // Only executed after explicit consent
    // Placeholder for Google Analytics / Tag Manager
    // (window as any).dataLayer = (window as any).dataLayer || [];
    // Currently, this application does NOT embed third-party tracking tags.
    // If you add Google Analytics / Meta Pixel in the future, initialize here.
  };

  if (!showBanner) return null;

  return (
    <aside
      aria-label="Aviso de Privacidade e Cookies"
      role="region"
      className="fixed bottom-0 inset-x-0 z-50 p-4 sm:p-6 bg-[#04172B]/95 backdrop-blur-md border-t border-[#1687FF]/30 shadow-[0_-10px_30px_rgba(4,23,43,0.9)] animate-fadeIn text-[#F5F8FC]"
    >
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        {/* Text information */}
        <div className="flex-1 pr-0 lg:pr-6">
          <div className="flex items-center gap-2 mb-1.5">
            <Cookie className="w-4 h-4 text-[#42C8FF]" aria-hidden="true" />
            <h2 className="text-sm font-bold text-white tracking-wide">
              Privacidade & Controle de Cookies (LGPD)
            </h2>
          </div>
          <p className="text-xs text-[#AAB8CA] leading-relaxed">
            Utilizamos cookies estritamente necessários para o funcionamento do carrinho (sessão local) e navegação. Cookies opcionais de análise e personalização só serão carregados se você concordar expressamente. Você pode rever suas preferências a qualquer momento.{' '}
            <button
              type="button"
              onClick={() => {
                window.dispatchEvent(new CustomEvent('open-legal-modal', { detail: 'cookies' }));
              }}
              className="text-[#42C8FF] hover:underline font-semibold focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#1687FF]"
            >
              Consulte nossa Política de Cookies
            </button>
            .
          </p>

          {/* Granular Preferences Box */}
          {showPreferences && (
            <div className="mt-4 p-3.5 rounded-xl bg-[#082E5A]/60 border border-[#1687FF]/30 text-xs flex flex-col gap-3">
              <div className="flex items-center justify-between gap-3 pb-2 border-b border-white/10">
                <div>
                  <span className="font-bold text-white">1. Cookies Estritamente Necessários</span>
                  <p className="text-[11px] text-[#AAB8CA]">Essenciais para o carrinho, carrinho por sessão e segurança do site.</p>
                </div>
                <span className="text-[10px] uppercase font-bold text-[#35D49A] px-2 py-0.5 rounded bg-[#35D49A]/10 border border-[#35D49A]/30 shrink-0">
                  Sempre Ativos
                </span>
              </div>

              <div className="flex items-center justify-between gap-3 pb-2 border-b border-white/10">
                <div>
                  <span className="font-bold text-white">2. Cookies Analíticos (Métricas)</span>
                  <p className="text-[11px] text-[#AAB8CA]">Permitem entender visitas e produtos mais vistos de forma anônima.</p>
                </div>
                <label className="flex items-center gap-2 cursor-pointer shrink-0">
                  <input
                    type="checkbox"
                    checked={analyticsAllowed}
                    onChange={(e) => setAnalyticsAllowed(e.target.checked)}
                    className="w-4 h-4 rounded border-gray-400 text-[#1687FF] focus:ring-[#1687FF]"
                  />
                  <span className="text-[11px] font-semibold text-white">{analyticsAllowed ? 'Permitido' : 'Recusado'}</span>
                </label>
              </div>

              <div className="flex items-center justify-between gap-3">
                <div>
                  <span className="font-bold text-white">3. Cookies de Marketing / Pixel</span>
                  <p className="text-[11px] text-[#AAB8CA]">Utilizados para mensurar campanhas nas redes sociais (Meta/Google).</p>
                </div>
                <label className="flex items-center gap-2 cursor-pointer shrink-0">
                  <input
                    type="checkbox"
                    checked={marketingAllowed}
                    onChange={(e) => setMarketingAllowed(e.target.checked)}
                    className="w-4 h-4 rounded border-gray-400 text-[#1687FF] focus:ring-[#1687FF]"
                  />
                  <span className="text-[11px] font-semibold text-white">{marketingAllowed ? 'Permitido' : 'Recusado'}</span>
                </label>
              </div>
            </div>
          )}
        </div>

        {/* Buttons / Actions */}
        <div className="flex items-center flex-wrap gap-2.5 shrink-0 w-full sm:w-auto">
          {!showPreferences ? (
            <>
              <button
                type="button"
                onClick={() => setShowPreferences(true)}
                className="btn-3d-secondary px-3.5 py-2 text-xs font-semibold flex items-center justify-center gap-1.5 flex-1 sm:flex-initial"
              >
                <Settings className="w-3.5 h-3.5 text-[#42C8FF]" aria-hidden="true" />
                <span>Personalizar</span>
              </button>

              <button
                type="button"
                onClick={handleRejectNonEssential}
                className="btn-3d-secondary px-4 py-2 text-xs font-semibold flex items-center justify-center gap-1.5 flex-1 sm:flex-initial text-[#AAB8CA] hover:text-white"
              >
                <X className="w-3.5 h-3.5 text-[#FF5A65]" aria-hidden="true" />
                <span>Recusar Opcionais</span>
              </button>

              <button
                type="button"
                onClick={handleAcceptAll}
                className="btn-3d-primary px-4 py-2 text-xs font-bold flex items-center justify-center gap-1.5 flex-1 sm:flex-initial text-white"
              >
                <Check className="w-3.5 h-3.5 text-[#35D49A]" aria-hidden="true" />
                <span>Aceitar Todos</span>
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={() => setShowPreferences(false)}
                className="btn-3d-secondary px-3.5 py-2 text-xs font-semibold flex-1 sm:flex-initial"
              >
                <span>Voltar</span>
              </button>

              <button
                type="button"
                onClick={handleSaveCustom}
                className="btn-3d-primary px-4 py-2 text-xs font-bold flex-1 sm:flex-initial text-white"
              >
                <span>Salvar Minhas Preferências</span>
              </button>
            </>
          )}
        </div>
      </div>
    </aside>
  );
};
