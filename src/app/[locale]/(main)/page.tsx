import { getTranslations } from 'next-intl/server';
import { getBrands, getIndustries } from '@/lib/data';
import { Link } from '@/i18n/routing';
import {
  Award,
  Package,
  HeadphonesIcon,
  Factory,
  ArrowRight,
  ShieldCheck,
  Globe2,
  Wrench,
} from 'lucide-react';
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

  const stats = [
    { value: '30+', label: 'Years of Experience' },
    { value: '17+', label: 'Authorized Brands' },
    { value: '18+', label: 'Industries Served' },
    { value: '100+', label: 'Product Types' },
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative w-full overflow-hidden bg-gradient-to-br from-[#0f1f35] via-[#1e3a5f] to-[#0f1f35] text-white">
        {/* Decorative grid */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              'linear-gradient(#c8a951 1px, transparent 1px), linear-gradient(90deg, #c8a951 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
        {/* Glows */}
        <div className="absolute -top-40 -right-40 w-[520px] h-[520px] rounded-full blur-3xl bg-[#c8a951]/20" />
        <div className="absolute -bottom-40 -left-40 w-[520px] h-[520px] rounded-full blur-3xl bg-[#1e3a5f]/40" />

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 lg:py-32">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c8a951]/15 border border-[#c8a951]/30 text-[#c8a951] text-xs font-semibold tracking-wider uppercase mb-6">
              <ShieldCheck size={14} />
              Authorized Distributor Since 1995
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              {t('hero.title')}
            </h1>
            <p className="text-lg md:text-xl mb-10 text-gray-300 max-w-2xl leading-relaxed">
              {t('hero.subtitle')}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/products"
                className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-lg font-semibold transition-all duration-300 bg-[#c8a951] text-[#1e3a5f] hover:bg-[#b89742] hover:shadow-xl hover:shadow-[#c8a951]/20"
              >
                {t('hero.cta')}
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform rtl:rotate-180 rtl:group-hover:-translate-x-1"
                />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg font-semibold transition-all duration-300 border-2 border-white/20 text-white hover:bg-white/5 hover:border-white/40"
              >
                Contact Sales
              </Link>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="relative z-10 border-t border-white/10 bg-black/20 backdrop-blur-sm">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10 rtl:divide-x-reverse">
              {stats.map((stat) => (
                <div key={stat.label} className="py-6 md:py-7 px-4 text-center">
                  <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#c8a951]">
                    {stat.value}
                  </div>
                  <div className="text-xs md:text-sm text-gray-300 mt-1 uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Brands Grid Section */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-[#c8a951] mb-2">
              Global Partners
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#1e3a5f]">
              {t('brands.title')}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t('brands.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
            {brands.map((brand) => (
              <Link
                key={brand.id}
                href={`/brands/${brand.slug}`}
                className="group bg-white rounded-xl p-6 border border-gray-100 hover:border-[#c8a951]/50 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col items-center justify-center min-h-[160px] relative overflow-hidden"
              >
                <div className="absolute inset-x-0 top-0 h-1 bg-[#c8a951] scale-x-0 group-hover:scale-x-100 transition-transform origin-left rtl:origin-right" />
                {brand.logo_url ? (
                  <div className="relative w-28 h-20 mb-3 grayscale group-hover:grayscale-0 transition-all">
                    <Image
                      src={brand.logo_url}
                      alt={brand.name}
                      fill
                      sizes="(max-width: 768px) 40vw, 20vw"
                      className="object-contain"
                    />
                  </div>
                ) : (
                  <div className="w-20 h-20 mx-auto mb-3 rounded-xl flex items-center justify-center bg-gradient-to-br from-[#1e3a5f] to-[#1e3a5f]/80 text-white shadow-inner">
                    <span className="text-2xl font-black tracking-tight">
                      {brand.name.substring(0, 3).toUpperCase()}
                    </span>
                  </div>
                )}
                <p className="font-semibold text-sm md:text-base truncate text-[#1e3a5f] group-hover:text-[#c8a951] transition-colors">
                  {brand.name}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Grid Section */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-[#c8a951] mb-2">
              Sectors We Power
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#1e3a5f]">
              {t('industries.title')}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t('industries.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {industries.slice(0, 9).map((industry) => (
              <Link
                key={industry.id}
                href={`/industries`}
                className="group relative rounded-xl overflow-hidden bg-gray-100 aspect-[4/3] shadow-sm hover:shadow-xl transition-all duration-300"
              >
                {industry.image_url ? (
                  <>
                    <Image
                      src={industry.image_url}
                      alt={industry.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0f1f35]/90 via-[#0f1f35]/30 to-transparent" />
                  </>
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-[#1e3a5f] to-[#0f1f35]" />
                )}
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <div className="flex items-end justify-between gap-3">
                    <h3 className="text-lg md:text-xl font-bold text-white leading-tight">
                      {industry.name}
                    </h3>
                    <div className="w-9 h-9 rounded-lg bg-[#c8a951] text-[#1e3a5f] flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all">
                      <ArrowRight size={16} className="rtl:rotate-180" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/industries"
              className="inline-flex items-center gap-2 text-[#1e3a5f] font-semibold hover:text-[#c8a951] transition-colors"
            >
              View all industries
              <ArrowRight size={16} className="rtl:rotate-180" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-[#c8a951] mb-2">
              The Multi Gates Advantage
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a5f]">
              {t('why.title')}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div
                  key={index}
                  className="relative bg-white rounded-xl p-7 border border-gray-100 hover:border-[#c8a951]/40 shadow-sm hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 bg-gradient-to-br from-[#c8a951]/15 to-[#c8a951]/5 group-hover:from-[#c8a951] group-hover:to-[#b89742] transition-colors">
                    <IconComponent
                      size={26}
                      className="text-[#c8a951] group-hover:text-[#1e3a5f] transition-colors"
                    />
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-[#1e3a5f]">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-[#c8a951] mb-2">
                Beyond Distribution
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-5 text-[#1e3a5f]">
                Complete industrial solutions, backed by expertise
              </h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                From technical support and cross-reference services to stock
                management at your site — we deliver more than just products.
              </p>
              <div className="space-y-4 mb-8">
                {[
                  {
                    icon: Wrench,
                    title: 'Technical Support & After-Sales',
                    description:
                      'Expert guidance from specification to installation and beyond.',
                  },
                  {
                    icon: Globe2,
                    title: 'Cross Reference Service',
                    description:
                      'Find equivalent bearings across brands in seconds.',
                  },
                  {
                    icon: ShieldCheck,
                    title: 'Genuine Products, Guaranteed',
                    description:
                      'Every product sourced directly through authorized channels.',
                  },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.title} className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#c8a951]/10 text-[#c8a951] flex items-center justify-center">
                        <Icon size={20} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-[#1e3a5f] mb-1">
                          {item.title}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 text-[#1e3a5f] font-semibold hover:text-[#c8a951] transition-colors"
              >
                Explore all services
                <ArrowRight size={16} className="rtl:rotate-180" />
              </Link>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-[#c8a951]/10 to-transparent rounded-2xl blur-2xl" />
              <div className="relative grid grid-cols-2 gap-4">
                {industries.slice(0, 4).map((industry) => (
                  <div
                    key={industry.id}
                    className="relative aspect-square rounded-xl overflow-hidden shadow-md"
                  >
                    {industry.image_url && (
                      <Image
                        src={industry.image_url}
                        alt={industry.name}
                        fill
                        sizes="(max-width: 1024px) 50vw, 25vw"
                        className="object-cover"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0f1f35]/80 via-transparent to-transparent" />
                    <span className="absolute bottom-2 left-3 right-3 text-white text-xs font-semibold">
                      {industry.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-16 md:py-24 px-4 sm:px-6 lg:px-8 text-white overflow-hidden bg-gradient-to-br from-[#1e3a5f] to-[#0f1f35]">
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              'linear-gradient(#c8a951 1px, transparent 1px), linear-gradient(90deg, #c8a951 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl bg-[#c8a951]/15" />
        <div className="relative z-10 container mx-auto max-w-3xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-5">
            {t('cta.title')}
          </h2>
          <p className="text-lg mb-10 text-gray-300 max-w-2xl mx-auto">
            {t('cta.subtitle')}
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 px-8 py-4 rounded-lg font-semibold transition-all duration-300 bg-[#c8a951] text-[#1e3a5f] hover:bg-[#b89742] hover:shadow-xl hover:shadow-[#c8a951]/20"
            >
              {t('cta.button')}
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform rtl:rotate-180 rtl:group-hover:-translate-x-1"
              />
            </Link>
            <Link
              href="/brands"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg font-semibold transition-all duration-300 border-2 border-white/20 text-white hover:bg-white/5 hover:border-white/40"
            >
              Browse Brands
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
