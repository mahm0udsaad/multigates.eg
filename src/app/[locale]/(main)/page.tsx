import { getTranslations } from 'next-intl/server';
import { getBrands, getIndustries } from '@/lib/data';
import { Link } from '@/i18n/routing';
import { Award, Package, HeadphonesIcon, Factory } from 'lucide-react';
import Image from 'next/image';

export default async function HomePage() {
  const t = await getTranslations('home');
  const brands = await getBrands();
  const industries = await getIndustries();

  const features = [
    {
      icon: Award,
      title: t('features.authorized.title'),
      description: t('features.authorized.description'),
    },
    {
      icon: Package,
      title: t('features.range.title'),
      description: t('features.range.description'),
    },
    {
      icon: HeadphonesIcon,
      title: t('features.support.title'),
      description: t('features.support.description'),
    },
    {
      icon: Factory,
      title: t('features.industry.title'),
      description: t('features.industry.description'),
    },
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative w-full min-h-[500px] flex items-center justify-center text-white overflow-hidden bg-gradient-to-br from-[#1e3a5f] to-[#0f1f35]">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl bg-[#c8a951]" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 py-16 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            {t('hero.title')}
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200">
            {t('hero.subtitle')}
          </p>
          <Link
            href="/products"
            className="inline-block px-8 py-4 rounded-lg font-semibold transition-all duration-300 bg-[#c8a951] text-[#1e3a5f] hover:scale-105"
          >
            {t('hero.cta')}
          </Link>
        </div>
      </section>

      {/* Brands Grid Section */}
      <section className="py-16 md:py-24 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-[#1e3a5f]">
            {t('brands.title')}
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            {t('brands.subtitle')}
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {brands.map((brand) => (
              <Link
                key={brand.id}
                href={`/brands/${brand.slug}`}
                className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex items-center justify-center min-h-[140px]"
              >
                <div className="text-center">
                  {brand.logo_url ? (
                    <div className="relative w-24 h-24 mx-auto mb-2">
                      <Image
                        src={brand.logo_url}
                        alt={brand.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                  ) : (
                    <div className="w-24 h-24 mx-auto mb-2 rounded-lg flex items-center justify-center bg-[#c8a951]/10">
                      <span className="text-xl font-semibold text-[#1e3a5f]">
                        {brand.name.substring(0, 2).toUpperCase()}
                      </span>
                    </div>
                  )}
                  <p className="font-semibold text-sm md:text-base truncate text-[#1e3a5f]">
                    {brand.name}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Grid Section */}
      <section className="py-16 md:py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-[#1e3a5f]">
            {t('industries.title')}
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            {t('industries.subtitle')}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {industries.map((industry) => (
              <div
                key={industry.id}
                className="group bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden"
              >
                {industry.image_url ? (
                  <div className="relative w-full h-48 overflow-hidden">
                    <Image
                      src={industry.image_url}
                      alt={industry.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <h3 className="absolute bottom-4 left-4 right-4 text-lg font-semibold text-white">
                      {industry.name}
                    </h3>
                  </div>
                ) : (
                  <div className="p-6 border-l-4 border-[#c8a951]">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 bg-[#c8a951]/10">
                      <Factory size={24} className="text-[#c8a951]" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2 text-[#1e3a5f]">
                      {industry.name}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {industry.description || `Leading solutions for ${industry.name.toLowerCase()}`}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 md:py-24 px-6 bg-[#1e3a5f]/5">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#1e3a5f]">
            {t('why.title')}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-all duration-300 text-center"
                >
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 bg-[#c8a951]/10">
                    <IconComponent size={32} className="text-[#c8a951]" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-[#1e3a5f]">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 px-6 text-white text-center bg-gradient-to-br from-[#1e3a5f] to-[#0f1f35]">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {t('cta.title')}
          </h2>
          <p className="text-lg mb-8 text-gray-200">
            {t('cta.subtitle')}
          </p>
          <Link
            href="/contact"
            className="inline-block px-8 py-4 rounded-lg font-semibold transition-all duration-300 bg-[#c8a951] text-[#1e3a5f] hover:scale-105"
          >
            {t('cta.button')}
          </Link>
        </div>
      </section>
    </div>
  );
}
