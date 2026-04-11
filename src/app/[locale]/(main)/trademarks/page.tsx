'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Award, ChevronDown, ChevronUp, Image as ImageIcon } from 'lucide-react';

interface TrademarkData {
  id: 'ksm' | 'quaval';
  titleKey: string;
  descriptionKey: string;
  showCertificates: boolean;
}

export default function TrademarksPage() {
  const t = useTranslations('trademarks');

  const [trademarks, setTrademarks] = useState<TrademarkData[]>([
    {
      id: 'ksm',
      titleKey: 'ksmTitle',
      descriptionKey: 'ksmDescription',
      showCertificates: false,
    },
    {
      id: 'quaval',
      titleKey: 'quavalTitle',
      descriptionKey: 'quavalDescription',
      showCertificates: false,
    },
  ]);

  const toggleCertificates = (id: 'ksm' | 'quaval') => {
    setTrademarks((prev) =>
      prev.map((tm) =>
        tm.id === id ? { ...tm, showCertificates: !tm.showCertificates } : tm
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Gradient Section */}
      <div
        className="relative h-80 flex items-center justify-center text-white"
        style={{
          background: `linear-gradient(135deg, #1e3a5f 0%, #2d5a8c 100%)`,
        }}
      >
        <div className="text-center px-4">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Award className="w-10 h-10" />
            <h1 className="text-5xl font-bold">{t('title')}</h1>
          </div>
          <p className="text-xl text-gray-100">{t('subtitle')}</p>
        </div>
      </div>

      {/* Trademarks Section */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {trademarks.map((trademark) => (
            <div key={trademark.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              {/* Trademark Card Header */}
              <div
                className="px-6 py-8 text-white"
                style={{ backgroundColor: '#1e3a5f' }}
              >
                <h2 className="text-3xl font-bold mb-2">{t(trademark.titleKey)}</h2>
                <p className="text-gray-200">{t(trademark.descriptionKey)}</p>
              </div>

              {/* Certificate Toggle Button */}
              <div className="px-6 py-4 border-b border-gray-200">
                <button
                  onClick={() => toggleCertificates(trademark.id)}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors"
                  style={{
                    backgroundColor: trademark.showCertificates ? '#c8a951' : '#f3f4f6',
                    color: trademark.showCertificates ? 'white' : '#374151',
                  }}
                >
                  <span className="font-semibold flex items-center gap-2">
                    <ImageIcon className="w-5 h-5" />
                    {t('certificatesButton')}
                  </span>
                  {trademark.showCertificates ? (
                    <ChevronUp className="w-5 h-5" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                </button>
              </div>

              {/* Certificate Placeholder Section */}
              {trademark.showCertificates && (
                <div className="px-6 py-8 bg-gray-50">
                  <div className="space-y-4">
                    {/* Placeholder for certificate images */}
                    <div
                      className="aspect-video rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center bg-white"
                      style={{ borderColor: '#c8a951' }}
                    >
                      <div className="text-center text-gray-400">
                        <ImageIcon className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                        <p className="text-sm">{t('certificatePlaceholder')}</p>
                      </div>
                    </div>
                    {/* Info text */}
                    <p className="text-sm text-gray-600 text-center">
                      {t('certificateInfo')}
                    </p>
                  </div>
                </div>
              )}

              {/* Card Footer */}
              <div className="px-6 py-4" style={{ backgroundColor: '#f9fafb' }}>
                <p className="text-sm text-gray-600">
                  {t('trademarkOwner')}: Multi Gates
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info Section */}
        <div className="mt-12 bg-white rounded-lg shadow-lg p-8">
          <h3
            className="text-2xl font-bold mb-4 pb-4 border-b-2"
            style={{ color: '#1e3a5f', borderColor: '#c8a951' }}
          >
            {t('aboutTrademarksTitle')}
          </h3>
          <div className="space-y-4 text-gray-700">
            <p>{t('aboutTrademarksText1')}</p>
            <p>{t('aboutTrademarksText2')}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
