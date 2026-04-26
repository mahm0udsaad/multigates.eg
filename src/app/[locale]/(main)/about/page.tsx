import { getTranslations } from 'next-intl/server';
import { getCompanyInfo } from '@/lib/data';
import {
  MapPin,
  Phone,
  Building2,
  Target,
  ScrollText,
  Sparkles,
  Calendar,
  ArrowRight,
} from 'lucide-react';

const COLORS = {
  primary: '#1e3a5f',
  secondary: '#c8a951',
};

interface PageProps {
  params: Promise<{ locale: string }>;
}

interface Milestone {
  year: string;
  title: string;
  body: string;
}

export default async function AboutPage({ params }: PageProps) {
  await params;
  const t = await getTranslations('about');
  const companyInfo = await getCompanyInfo();
  const milestones = (t.raw('history.milestones') as Milestone[]) || [];

  const brandSpotlight: { key: 'ntn' | 'ksm' | 'quaval' | 'dkf' | 'stcSteyr'; subKey?: 'subBrands' }[] = [
    { key: 'ntn', subKey: 'subBrands' },
    { key: 'ksm' },
    { key: 'quaval' },
    { key: 'dkf' },
    { key: 'stcSteyr' },
  ];

  return (
    <div className="w-full">
      {/* Hero */}
      <section
        className="relative w-full py-16 md:py-24 px-6 overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${COLORS.primary} 0%, #0f1f35 100%)`,
        }}
      >
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              'linear-gradient(#c8a951 1px, transparent 1px), linear-gradient(90deg, #c8a951 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
        <div className="absolute -top-40 -right-40 w-[520px] h-[520px] rounded-full blur-3xl bg-[#c8a951]/20" />
        <div className="relative z-10 max-w-4xl mx-auto text-center text-white">
          <span className="inline-block text-[11px] font-semibold tracking-[0.2em] uppercase text-[#c8a951] mb-3">
            Since 1995
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            {t('title')}
          </h1>
          <p className="text-xl md:text-2xl text-gray-200">{t('subtitle')}</p>
        </div>
      </section>

      {/* Who Are We */}
      <section className="py-16 md:py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-start gap-4 mb-8">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: `${COLORS.secondary}20` }}
            >
              <Building2 size={24} style={{ color: COLORS.secondary }} />
            </div>
            <div>
              <h2
                className="text-3xl md:text-4xl font-bold"
                style={{ color: COLORS.primary }}
              >
                {t('whoWeAre.title')}
              </h2>
            </div>
          </div>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            {t('whoWeAre.intro')}
          </p>
          <ul className="space-y-3 mb-6">
            {[
              'whoWeAre.ntnLine',
              'whoWeAre.ksmLine',
              'whoWeAre.dkfLine',
              'whoWeAre.stcLine',
              'whoWeAre.quavalLine',
              'whoWeAre.samLine',
            ].map((key) => (
              <li key={key} className="flex items-start gap-3">
                <span
                  className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: COLORS.secondary }}
                />
                <span className="text-gray-700 leading-relaxed">{t(key)}</span>
              </li>
            ))}
          </ul>
          <div
            className="border-l-4 rtl:border-l-0 rtl:border-r-4 rounded-r-lg rtl:rounded-r-none rtl:rounded-l-lg p-5 bg-gray-50"
            style={{ borderColor: COLORS.secondary }}
          >
            <p className="font-semibold mb-2" style={{ color: COLORS.primary }}>
              {t('whoWeAre.importedTitle')}
            </p>
            <p className="text-gray-700">{t('whoWeAre.importedList')}</p>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section
        className="py-16 md:py-20 px-6"
        style={{ backgroundColor: `${COLORS.primary}08` }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="flex items-start gap-4 mb-8">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: `${COLORS.secondary}20` }}
            >
              <Target size={24} style={{ color: COLORS.secondary }} />
            </div>
            <h2
              className="text-3xl md:text-4xl font-bold"
              style={{ color: COLORS.primary }}
            >
              {t('whatWeDo.title')}
            </h2>
          </div>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            {t('whatWeDo.lead')}
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div
              className="bg-white rounded-xl p-6 border-t-4 shadow-sm"
              style={{ borderTopColor: COLORS.secondary }}
            >
              <h3
                className="font-bold text-lg mb-2"
                style={{ color: COLORS.primary }}
              >
                Commercial Sector
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {t('whatWeDo.commercial')}
              </p>
            </div>
            <div
              className="bg-white rounded-xl p-6 border-t-4 shadow-sm"
              style={{ borderTopColor: COLORS.secondary }}
            >
              <h3
                className="font-bold text-lg mb-2"
                style={{ color: COLORS.primary }}
              >
                MRO Sector
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {t('whatWeDo.mro')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Ethics, Policy */}
      <section className="py-16 md:py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Sparkles, key: 'mission' as const },
              { icon: ScrollText, key: 'ethics' as const },
              { icon: Target, key: 'policy' as const },
            ].map(({ icon: Icon, key }) => (
              <div
                key={key}
                className="rounded-2xl p-7 border border-gray-100 shadow-sm hover:shadow-lg transition"
                style={{ backgroundColor: `${COLORS.primary}05` }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${COLORS.secondary}20` }}
                >
                  <Icon size={22} style={{ color: COLORS.secondary }} />
                </div>
                <h3
                  className="text-xl font-bold mb-3"
                  style={{ color: COLORS.primary }}
                >
                  {t(`${key}.title`)}
                </h3>
                <p className="text-gray-700 leading-relaxed text-sm">
                  {t(`${key}.body`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Spotlight */}
      <section
        className="py-16 md:py-20 px-6"
        style={{ backgroundColor: `${COLORS.primary}08` }}
      >
        <div className="max-w-5xl mx-auto">
          <h2
            className="text-3xl md:text-4xl font-bold mb-10 text-center"
            style={{ color: COLORS.primary }}
          >
            {t('brandSpotlightTitle')}
          </h2>
          <div className="space-y-5">
            {brandSpotlight.map(({ key, subKey }) => (
              <div
                key={key}
                className="bg-white rounded-2xl p-7 shadow-sm border-l-4 rtl:border-l-0 rtl:border-r-4"
                style={{ borderColor: COLORS.secondary }}
              >
                <h3
                  className="text-xl md:text-2xl font-bold mb-3"
                  style={{ color: COLORS.primary }}
                >
                  {t(`${key}.title`)}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {t(`${key}.body`)}
                </p>
                {subKey && (
                  <p className="text-sm text-gray-600 mt-3 italic">
                    {t(`${key}.${subKey}`)}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* History Timeline */}
      <section className="py-16 md:py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span
              className="inline-block text-[11px] font-semibold tracking-[0.2em] uppercase mb-3"
              style={{ color: COLORS.secondary }}
            >
              30+ Years Journey
            </span>
            <h2
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{ color: COLORS.primary }}
            >
              {t('history.title')}
            </h2>
          </div>
          <p className="text-lg text-gray-700 leading-relaxed mb-12">
            {t('history.intro')}
          </p>
          <div className="relative">
            {/* Vertical line */}
            <div
              className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2"
              style={{ backgroundColor: `${COLORS.secondary}40` }}
            />
            <div className="space-y-10">
              {milestones.map((m, idx) => {
                const isLeft = idx % 2 === 0;
                return (
                  <div
                    key={m.year}
                    className={`relative flex md:items-center md:gap-8 ${
                      isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                    }`}
                  >
                    {/* Year badge on the line */}
                    <div className="absolute left-6 md:left-1/2 -translate-x-1/2 z-10">
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xs shadow-md"
                        style={{ backgroundColor: COLORS.secondary }}
                      >
                        <Calendar size={16} />
                      </div>
                    </div>
                    {/* Spacer */}
                    <div className="hidden md:block flex-1" />
                    {/* Card */}
                    <div className="flex-1 ml-20 md:ml-0">
                      <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:border-[#c8a951]/40 transition">
                        <div
                          className="text-2xl font-black mb-1"
                          style={{ color: COLORS.secondary }}
                        >
                          {m.year}
                        </div>
                        <h3
                          className="text-lg font-bold mb-2"
                          style={{ color: COLORS.primary }}
                        >
                          {m.title}
                        </h3>
                        <p className="text-gray-700 text-sm leading-relaxed">
                          {m.body}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Visit Us */}
      <section
        className="py-16 md:py-20 px-6"
        style={{ backgroundColor: `${COLORS.primary}08` }}
      >
        <div className="max-w-4xl mx-auto">
          <h2
            className="text-3xl md:text-4xl font-bold mb-10 text-center"
            style={{ color: COLORS.primary }}
          >
            {t('info.title')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: `${COLORS.secondary}20` }}
                >
                  <MapPin size={18} style={{ color: COLORS.secondary }} />
                </div>
                <h3
                  className="text-lg font-semibold"
                  style={{ color: COLORS.primary }}
                >
                  {t('info.office')}
                </h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                {companyInfo?.office_address || t('info.officeDefault')}
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: `${COLORS.secondary}20` }}
                >
                  <MapPin size={18} style={{ color: COLORS.secondary }} />
                </div>
                <h3
                  className="text-lg font-semibold"
                  style={{ color: COLORS.primary }}
                >
                  {t('info.showroom')}
                </h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                {companyInfo?.showroom_address || t('info.showroomDefault')}
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: `${COLORS.secondary}20` }}
                >
                  <Phone size={18} style={{ color: COLORS.secondary }} />
                </div>
                <h3
                  className="text-lg font-semibold"
                  style={{ color: COLORS.primary }}
                >
                  {t('info.phone')}
                </h3>
              </div>
              <a
                href={`tel:${companyInfo?.phone || ''}`}
                className="text-lg font-semibold hover:underline"
                style={{ color: COLORS.secondary }}
              >
                {companyInfo?.phone || t('info.phoneDefault')}
              </a>
            </div>
          </div>
          <div className="text-center mt-10">
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg font-semibold transition-all text-white"
              style={{ backgroundColor: COLORS.primary }}
            >
              Contact Us
              <ArrowRight size={18} className="rtl:rotate-180" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
