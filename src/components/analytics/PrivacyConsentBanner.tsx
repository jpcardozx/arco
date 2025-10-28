/**
 * Privacy Consent Banner
 *
 * LGPD/GDPR compliant cookie consent banner
 */

'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Cookie, X, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAnalyticsContext } from './AnalyticsProvider';

// ============================================================================
// TYPES
// ============================================================================

interface ConsentPreferences {
  necessary: boolean; // Always true
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
}

// ============================================================================
// COMPONENT
// ============================================================================

export function PrivacyConsentBanner() {
  const { hasConsent, grantConsent, revokeConsent } = useAnalyticsContext();
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState<ConsentPreferences>({
    necessary: true,
    analytics: true,
    marketing: true,
    preferences: true,
  });

  // Check if user has already made a choice
  useEffect(() => {
    const consentChoice = localStorage.getItem('analytics_consent');
    const consentTimestamp = localStorage.getItem('analytics_consent_timestamp');

    // Show banner if no choice or choice is older than 6 months
    if (!consentChoice || !consentTimestamp) {
      setShowBanner(true);
    } else {
      const sixMonthsAgo = Date.now() - 6 * 30 * 24 * 60 * 60 * 1000;
      if (parseInt(consentTimestamp) < sixMonthsAgo) {
        setShowBanner(true);
      }
    }
  }, []);

  const handleAcceptAll = () => {
    grantConsent();
    localStorage.setItem('analytics_consent_timestamp', Date.now().toString());
    localStorage.setItem('analytics_consent_preferences', JSON.stringify(preferences));
    setShowBanner(false);
  };

  const handleRejectAll = () => {
    revokeConsent();
    localStorage.setItem('analytics_consent_timestamp', Date.now().toString());
    setShowBanner(false);
  };

  const handleSavePreferences = () => {
    if (preferences.analytics || preferences.marketing) {
      grantConsent();
    } else {
      revokeConsent();
    }

    localStorage.setItem('analytics_consent_timestamp', Date.now().toString());
    localStorage.setItem('analytics_consent_preferences', JSON.stringify(preferences));
    setShowBanner(false);
    setShowSettings(false);
  };

  const togglePreference = (key: keyof ConsentPreferences) => {
    if (key === 'necessary') return; // Can't disable necessary cookies

    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <AnimatePresence>
      {showBanner && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[9998]"
            onClick={() => setShowSettings(false)}
          />

          {/* Banner */}
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed bottom-0 left-0 right-0 z-[9999] p-4 sm:p-6"
          >
            <div className="max-w-6xl mx-auto">
              <div className="relative bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
                {/* Gradient accent */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-500 via-blue-500 to-purple-500" />

                <div className="p-6 sm:p-8">
                  {/* Header */}
                  <div className="flex items-start gap-4 mb-6">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500 to-blue-600 flex items-center justify-center">
                      <Cookie className="w-6 h-6 text-white" />
                    </div>

                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                        Privacidade e Cookies
                        <Shield className="w-5 h-5 text-teal-500" />
                      </h3>
                      <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                        Utilizamos cookies e tecnologias semelhantes para melhorar sua experiência, personalizar conteúdo,
                        analisar tráfego e medir a eficácia de nossas campanhas de marketing. Ao clicar em "Aceitar tudo",
                        você concorda com o uso de cookies conforme nossa{' '}
                        <a href="/privacy" className="text-teal-600 hover:text-teal-700 underline font-medium">
                          Política de Privacidade
                        </a>.
                      </p>
                    </div>

                    <button
                      onClick={() => setShowBanner(false)}
                      className="flex-shrink-0 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                      aria-label="Fechar"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Settings panel */}
                  <AnimatePresence>
                    {showSettings && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="mb-6 overflow-hidden"
                      >
                        <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl space-y-4">
                          {/* Necessary */}
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <div className="font-semibold text-slate-900 dark:text-white">Cookies Necessários</div>
                              <div className="text-sm text-slate-600 dark:text-slate-400">
                                Essenciais para o funcionamento do site
                              </div>
                            </div>
                            <div className="px-3 py-1 bg-slate-300 dark:bg-slate-600 rounded-full text-sm font-medium text-slate-700 dark:text-slate-300">
                              Sempre ativo
                            </div>
                          </div>

                          {/* Analytics */}
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <div className="font-semibold text-slate-900 dark:text-white">Cookies de Análise</div>
                              <div className="text-sm text-slate-600 dark:text-slate-400">
                                Nos ajudam a entender como você usa o site
                              </div>
                            </div>
                            <button
                              onClick={() => togglePreference('analytics')}
                              className={`relative w-12 h-6 rounded-full transition-colors ${
                                preferences.analytics ? 'bg-teal-500' : 'bg-slate-300 dark:bg-slate-600'
                              }`}
                            >
                              <span
                                className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                                  preferences.analytics ? 'translate-x-6' : 'translate-x-0'
                                }`}
                              />
                            </button>
                          </div>

                          {/* Marketing */}
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <div className="font-semibold text-slate-900 dark:text-white">Cookies de Marketing</div>
                              <div className="text-sm text-slate-600 dark:text-slate-400">
                                Para personalizar anúncios e medir campanhas
                              </div>
                            </div>
                            <button
                              onClick={() => togglePreference('marketing')}
                              className={`relative w-12 h-6 rounded-full transition-colors ${
                                preferences.marketing ? 'bg-teal-500' : 'bg-slate-300 dark:bg-slate-600'
                              }`}
                            >
                              <span
                                className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                                  preferences.marketing ? 'translate-x-6' : 'translate-x-0'
                                }`}
                              />
                            </button>
                          </div>

                          {/* Preferences */}
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <div className="font-semibold text-slate-900 dark:text-white">Cookies de Preferências</div>
                              <div className="text-sm text-slate-600 dark:text-slate-400">
                                Lembram suas escolhas (idioma, região, etc)
                              </div>
                            </div>
                            <button
                              onClick={() => togglePreference('preferences')}
                              className={`relative w-12 h-6 rounded-full transition-colors ${
                                preferences.preferences ? 'bg-teal-500' : 'bg-slate-300 dark:bg-slate-600'
                              }`}
                            >
                              <span
                                className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                                  preferences.preferences ? 'translate-x-6' : 'translate-x-0'
                                }`}
                              />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    {!showSettings ? (
                      <>
                        <Button
                          onClick={handleAcceptAll}
                          className="flex-1 bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all"
                        >
                          Aceitar tudo
                        </Button>

                        <Button
                          onClick={() => setShowSettings(true)}
                          variant="outline"
                          className="flex-1 border-2 font-semibold"
                        >
                          <Settings className="w-4 h-4 mr-2" />
                          Personalizar
                        </Button>

                        <Button onClick={handleRejectAll} variant="ghost" className="flex-1 font-semibold">
                          Rejeitar tudo
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          onClick={handleSavePreferences}
                          className="flex-1 bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all"
                        >
                          Salvar preferências
                        </Button>

                        <Button
                          onClick={() => setShowSettings(false)}
                          variant="outline"
                          className="flex-1 border-2 font-semibold"
                        >
                          Cancelar
                        </Button>
                      </>
                    )}
                  </div>

                  {/* Footer note */}
                  <p className="mt-4 text-xs text-center text-slate-500 dark:text-slate-400">
                    Conforme{' '}
                    <a href="/privacy" className="underline hover:text-teal-600">
                      LGPD
                    </a>{' '}
                    e{' '}
                    <a href="/privacy" className="underline hover:text-teal-600">
                      GDPR
                    </a>
                    . Você pode alterar suas preferências a qualquer momento.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default PrivacyConsentBanner;
