import { getTranslations } from 'next-intl/server';
import { getCompanyInfo } from '@/lib/data';
import { MapPin, Phone, Mail } from 'lucide-react';

const COLORS = {
  primary: '#1e3a5f',
  secondary: '#c8a951',
};

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function AboutPage({ params }: PageProps) {
  await params;
  const t = await getTranslations('about');
  const companyInfo = await getCompanyInfo();

  return (
    <div className="w-full">
      {/* Page Header */}
      <section
        className="relative w-full py-16 md:py-24 px-6"
        style={{
          background: `linear-gradient(135deg, ${COLORS.primary} 0%, #0f1f35 100%)`,
        }}
      >
        <div className="absolute inset-0 opacity-20">
          <div
            className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl"
            style={{ backgroundColor: COLORS.secondary }}
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center text-white">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            {t('title')}
          </h1>
          <p className="text-xl md:text-2xl text-gray-200">
            {t('subtitle')}
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 md:py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <h2
            className="text-3xl md:text-4xl font-bold mb-8"
            style={{ color: COLORS.primary }}
          >
            {t('story.title')}
          </h2>
          <div className="space-y-6 text-gray-700 leading-relaxed">
            <p className="text-lg">
              {t('story.paragraph1')}
            </p>
            <p className="text-lg">
              {t('story.paragraph2')}
            </p>
            <p className="text-lg">
              {t('story.paragraph3')}
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision Cards */}
      <section
        className="py-16 md:py-24 px-6"
        style={{ backgroundColor: `${COLORS.primary}10` }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Mission Card */}
            <div className="bg-white rounded-lg shadow-lg p-8 border-t-4" style={{ borderTopColor: COLORS.secondary }}>
              <h3
                className="text-2xl font-bold mb-4"
                style={{ color: COLORS.primary }}
              >
                {t('mission.title')}
              </h3>
              <p className="text-gray-700 leading-relaxed text-lg">
                {t('mission.description')}
              </p>
            </div>

            {/* Vision Card */}
            <div className="bg-white rounded-lg shadow-lg p-8 border-t-4" style={{ borderTopColor: COLORS.secondary }}>
              <h3
                className="text-2xl font-bold mb-4"
                style={{ color: COLORS.primary }}
              >
                {t('vision.title')}
              </h3>
              <p className="text-gray-700 leading-relaxed text-lg">
                {t('vision.description')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Company Info Section */}
      <section className="py-16 md:py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <h2
            className="text-3xl md:text-4xl font-bold mb-12 text-center"
            style={{ color: COLORS.primary }}
          >
            {t('info.title')}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Office Address */}
            <div className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: `${COLORS.secondary}20` }}
                >
                  <MapPin size={20} style={{ color: COLORS.secondary }} />
                </div>
                <h3
                  className="text-xl font-semibold"
                  style={{ color: COLORS.primary }}
                >
                  {t('info.office')}
                </h3>
              </div>
              <p className="text-gray-700 text-lg leading-relaxed">
                {companyInfo?.office_address || t('info.officeDefault')}
              </p>
            </div>

            {/* Showroom Address */}
            <div className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: `${COLORS.secondary}20` }}
                >
                  <MapPin size={20} style={{ color: COLORS.secondary }} />
                </div>
                <h3
                  className="text-xl font-semibold"
                  style={{ color: COLORS.primary }}
                >
                  {t('info.showroom')}
                </h3>
              </div>
              <p className="text-gray-700 text-lg leading-relaxed">
                {companyInfo?.showroom_address || t('info.showroomDefault')}
              </p>
            </div>

            {/* Phone */}
            <div className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: `${COLORS.secondary}20` }}
                >
                  <Phone size={20} style={{ color: COLORS.secondary }} />
                </div>
                <h3
                  className="text-xl font-semibold"
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

            {/* Email */}
            <div className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: `${COLORS.secondary}20` }}
                >
                  <Mail size={20} style={{ color: COLORS.secondary }} />
                </div>
                <h3
                  className="text-xl font-semibold"
                  style={{ color: COLORS.primary }}
                >
                  {t('info.email')}
                </h3>
              </div>
              <a
                href={`mailto:${companyInfo?.email || ''}`}
                className="text-lg font-semibold hover:underline break-all"
                style={{ color: COLORS.secondary }}
              >
                {companyInfo?.email || t('info.emailDefault')}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
