import { getTranslations } from 'next-intl/server';
import { Newspaper } from 'lucide-react';
import { PageHero, HERO_IMAGES } from '@/components/layout/PageHero';

const COLORS = {
  primary: '#1e3a5f',
  secondary: '#c8a951',
};

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function NewsPage({ params }: PageProps) {
  await params;
  const t = await getTranslations('news');

  return (
    <div className="w-full">
      <PageHero
        eyebrow="Updates"
        title={t('title')}
        subtitle={t('comingSoonDesc')}
        imageSrc={HERO_IMAGES.news}
        imageAlt="News"
      />

      {/* Coming Soon Section */}
      <section className="py-24 md:py-32 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8 flex justify-center">
            <div
              className="w-24 h-24 rounded-full flex items-center justify-center"
              style={{ backgroundColor: `${COLORS.secondary}15` }}
            >
              <Newspaper size={48} style={{ color: COLORS.secondary }} />
            </div>
          </div>

          <h2
            className="text-3xl md:text-4xl font-bold mb-6"
            style={{ color: COLORS.primary }}
          >
            {t('comingSoon')}
          </h2>

          <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
            {t('comingSoonDesc')}
          </p>
        </div>
      </section>
    </div>
  );
}
