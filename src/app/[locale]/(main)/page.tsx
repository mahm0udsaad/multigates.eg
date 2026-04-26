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
      <section className="relative w-full overflow-hidden text-white">
        {/* Background image */}
        <div className="absolute inset-0 -z-10">
          <Image
            src="https://images.unsplash.com/photo-1565843708714-52ecf69ab81f?auto=format&fit=crop&w=1920&q=80"
            alt="Industrial bearings and machinery"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0f1f35]/95 via-[#1e3a5f]/85 to-[#0f1f35]/70" />
        </div>
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

          {/* Continuously scrolling brand marquee (hover to pause) */}
          <div className="relative overflow-hidden">
            {/* Edge fade masks */}
            <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-r from-gray-50 to-transparent" />
            <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-l from-gray-50 to-transparent" />
            <div className="flex gap-5 w-max animate-brand-marquee">
              {[...brands, ...brands].map((brand, idx) => (
                <Link
                  key={`${brand.id}-${idx}`}
                  href={`/brands/${brand.slug}`}
                  className="group bg-white rounded-xl p-5 border border-gray-100 hover:border-[#c8a951]/50 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col items-center justify-center w-[180px] h-[140px] relative overflow-hidden flex-shrink-0"
                >
                  <div className="absolute inset-x-0 top-0 h-1 bg-[#c8a951] scale-x-0 group-hover:scale-x-100 transition-transform origin-left rtl:origin-right" />
                  {brand.logo_url ? (
                    <div className="relative w-24 h-16 mb-2 grayscale group-hover:grayscale-0 transition-all">
                      <Image
                        src={brand.logo_url}
                        alt={brand.name}
                        fill
                        sizes="120px"
                        className="object-contain"
                      />
                    </div>
                  ) : (
                    <div className="w-16 h-16 mx-auto mb-2 rounded-xl flex items-center justify-center bg-gradient-to-br from-[#1e3a5f] to-[#1e3a5f]/80 text-white">
                      <span className="text-xl font-black tracking-tight">
                        {brand.name.substring(0, 3).toUpperCase()}
                      </span>
                    </div>
                  )}
                  <p className="font-semibold text-xs md:text-sm truncate text-[#1e3a5f] group-hover:text-[#c8a951] transition-colors">
                    {brand.name}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission / Code of Ethics / Policy */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: t('values.missionTitle'), body: t('values.missionBody') },
              { title: t('values.ethicsTitle'), body: t('values.ethicsBody') },
              { title: t('values.policyTitle'), body: t('values.policyBody') },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-gradient-to-br from-[#1e3a5f]/5 to-white border border-gray-100 rounded-2xl p-7 hover:shadow-lg transition"
              >
                <div className="w-10 h-1 rounded-full bg-[#c8a951] mb-5" />
                <h3 className="text-xl font-bold mb-3 text-[#1e3a5f]">
                  {item.title}
                </h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* History of the Bearings Industry */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-10">
            <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-[#c8a951] mb-2">
              {t('bearingHistory.label')}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#1e3a5f]">
              {t('bearingHistory.title')}
            </h2>
          </div>
          <div className="space-y-5 text-gray-700 leading-relaxed text-base md:text-lg">
            <p>{t('bearingHistory.p1')}</p>
            <p>{t('bearingHistory.p2')}</p>
            <p>{t('bearingHistory.p3')}</p>
          </div>
          <p className="mt-6 text-xs text-gray-500 italic">
            {t('bearingHistory.source')}
          </p>
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

          {(() => {
            // The client (Sameh, email 2025-09-22) asked for these specific 15 industries
            // at the bottom of the home page in this exact order.
            const HOME_INDUSTRY_SLUGS = [
              'cement',
              'food',
              'marine-shipyards',
              'medical',
              'mining',
              'oil',
              'palm-oil',
              'power-plants',
              'pulp-paper',
              'robotic-automation',
              'semiconductor',
              'steel',
              'textile',
              'ceramic',
              'foundry',
            ];
            const homeIndustries = HOME_INDUSTRY_SLUGS
              .map((slug) => industries.find((i) => i.slug === slug))
              .filter((i): i is NonNullable<typeof i> => Boolean(i));
            return (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-5">
            {homeIndustries.map((industry) => (
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
                <div className="absolute inset-x-0 bottom-0 p-3 md:p-4">
                  <h3 className="text-sm md:text-base font-bold text-white leading-tight">
                    {industry.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
            );
          })()}

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
