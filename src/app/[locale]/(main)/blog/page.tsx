import { getTranslations } from 'next-intl/server';
import { BookOpen } from 'lucide-react';

const COLORS = {
  primary: '#1e3a5f',
  secondary: '#c8a951',
};

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function BlogPage({ params }: PageProps) {
  await params;
  const t = await getTranslations('blog');

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
        </div>
      </section>

      {/* Coming Soon Section */}
      <section className="py-24 md:py-32 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8 flex justify-center">
            <div
              className="w-24 h-24 rounded-full flex items-center justify-center"
              style={{ backgroundColor: `${COLORS.secondary}15` }}
            >
              <BookOpen size={48} style={{ color: COLORS.secondary }} />
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
