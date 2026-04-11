import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { TrendingUp, Globe, Target, Zap, ArrowRight } from 'lucide-react';

export default async function InvestmentPage() {
  const t = await getTranslations('investment');

  const highlights = [
    { icon: TrendingUp, titleKey: 'highlight1.title', descriptionKey: 'highlight1.description' },
    { icon: Globe, titleKey: 'highlight2.title', descriptionKey: 'highlight2.description' },
    { icon: Target, titleKey: 'highlight3.title', descriptionKey: 'highlight3.description' },
    { icon: Zap, titleKey: 'highlight4.title', descriptionKey: 'highlight4.description' },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#1e3a5f] to-[#2d5a8c]">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">{t('title')}</h1>
          <p className="text-lg sm:text-xl opacity-90">{t('subtitle')}</p>
        </div>
      </section>

      {/* Highlights */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {highlights.map((highlight, index) => {
              const IconComponent = highlight.icon;
              return (
                <div key={index} className="bg-white rounded-lg p-8 shadow-md hover:shadow-lg transition-shadow duration-300">
                  <div className="w-14 h-14 rounded-lg flex items-center justify-center text-white mb-4 bg-[#c8a951]">
                    <IconComponent className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{t(highlight.titleKey)}</h3>
                  <p className="text-gray-600 leading-relaxed">{t(highlight.descriptionKey)}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Description */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <p className="text-lg text-gray-700 leading-relaxed text-center mb-8">{t('description')}</p>
          <div className="border-l-4 border-[#c8a951] pl-6 py-4">
            <p className="text-gray-600 italic">{t('descriptionHighlight')}</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#1e3a5f] to-[#2d5a8c]">
        <div className="max-w-2xl mx-auto text-center text-white">
          <h2 className="text-3xl font-bold mb-4">{t('ctaTitle')}</h2>
          <p className="text-lg opacity-90 mb-8">{t('ctaDescription')}</p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-3 font-semibold rounded-lg bg-[#c8a951] text-[#1e3a5f] hover:scale-105 transition-transform duration-300"
          >
            {t('ctaButton')}
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-600 mb-2">{t('trustLabel')}</p>
          <p className="text-2xl font-bold text-gray-900">{t('trustValue')}</p>
        </div>
      </section>
    </div>
  );
}
