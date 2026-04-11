import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import {
  Briefcase,
  TrendingUp,
  Package,
  Headphones,
  FileText,
  ArrowRight,
} from 'lucide-react';

export default async function B2BPage() {
  const t = await getTranslations('b2b');

  const services = [
    { number: 1, icon: TrendingUp, titleKey: 'item1.title', descriptionKey: 'item1.description' },
    { number: 2, icon: Briefcase, titleKey: 'item2.title', descriptionKey: 'item2.description' },
    { number: 3, icon: Package, titleKey: 'item3.title', descriptionKey: 'item3.description' },
    { number: 4, icon: Headphones, titleKey: 'item4.title', descriptionKey: 'item4.description' },
    { number: 5, icon: FileText, titleKey: 'item5.title', descriptionKey: 'item5.description' },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#1e3a5f] to-[#2d5a8c]">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">{t('title')}</h1>
          <p className="text-lg sm:text-xl opacity-90">{t('subtitle')}</p>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service) => {
              const IconComponent = service.icon;
              return (
                <div
                  key={service.number}
                  className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300 border-l-4 border-l-[#c8a951]"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center text-white bg-[#1e3a5f]">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-semibold mb-1 text-[#c8a951]">
                        {String(service.number).padStart(2, '0')}
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {t(service.titleKey)}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {t(service.descriptionKey)}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('ctaTitle')}</h2>
          <p className="text-gray-600 mb-8">{t('ctaDescription')}</p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-3 font-semibold text-white rounded-lg bg-[#1e3a5f] hover:bg-[#152a47] transition-colors duration-300"
          >
            {t('ctaButton')}
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
