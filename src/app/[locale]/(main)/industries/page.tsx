import { getTranslations } from 'next-intl/server';
import { getIndustries } from '@/lib/data';
import Image from 'next/image';
import { Factory } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { PageHero, HERO_IMAGES } from '@/components/layout/PageHero';

export default async function IndustriesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations('industries');
  const industries = await getIndustries();
  const isAr = locale === 'ar';

  return (
    <main className="min-h-screen bg-white">
      {/* Header Section */}
      <PageHero
        eyebrow="Sectors We Power"
        title={t("title")}
        subtitle={t("subtitle")}
        imageSrc={HERO_IMAGES.industries}
        imageAlt="Sectors We Power"
      />

      {/* Industries Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {industries.map((industry) => {
            const displayName =
              isAr ? industry.name_ar || industry.name : industry.name;
            const displayDesc =
              isAr ? industry.description_ar || industry.description : industry.description;

            return (
              <div
                key={industry.id}
                className="group bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-[#c8a951]"
              >
                {/* Image */}
                <div className="relative w-full h-48 overflow-hidden">
                  {industry.image_url ? (
                    <>
                      <Image
                        src={industry.image_url}
                        alt={displayName}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    </>
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#1e3a5f] to-[#2d5a8c] flex items-center justify-center">
                      <Factory className="w-16 h-16 text-white/30" />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-[#1e3a5f] group-hover:text-[#c8a951] transition-colors duration-300 mb-2">
                    {displayName}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {displayDesc || t('cardDescription')}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-[#1e3a5f] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            {t('ctaTitle')}
          </h2>
          <p className="text-gray-200 mb-8 max-w-2xl mx-auto">
            {t('ctaDescription')}
          </p>
          <Link
            href="/contact"
            className="inline-block bg-[#c8a951] hover:bg-[#b8932f] text-[#1e3a5f] font-semibold py-3 px-8 rounded-lg transition-colors duration-300"
          >
            {t('contactUs')}
          </Link>
        </div>
      </div>
    </main>
  );
}
