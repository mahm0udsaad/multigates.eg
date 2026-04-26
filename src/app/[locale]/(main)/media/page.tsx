import { getTranslations } from 'next-intl/server';
import { getMedia } from '@/lib/data';
import Image from 'next/image';
import MediaFilter from './MediaFilter';
import { PageHero, HERO_IMAGES } from '@/components/layout/PageHero';

interface Props {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ category?: string }>;
}

export default async function MediaPage({ params, searchParams }: Props) {
  const { locale } = await params;
  const { category } = await searchParams;
  const t = await getTranslations('media');
  const isAr = locale === 'ar';

  const activeCategory = category || 'all';
  const media = await getMedia(activeCategory);

  const categories = [
    { value: 'all', label: t('all') },
    { value: 'products', label: t('products') },
    { value: 'company', label: t('company') },
    { value: 'showroom', label: t('showroom') },
  ];

  return (
    <main className="min-h-screen bg-white">
      {/* Header Section */}
      <PageHero
        eyebrow="Gallery"
        title={t("title")}
        subtitle={t("subtitle")}
        imageSrc={HERO_IMAGES.media}
        imageAlt="Gallery"
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Category Filter */}
        <MediaFilter categories={categories} activeCategory={activeCategory} />

        {/* Media Grid */}
        {media.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {media.map((item) => {
              const displayTitle = isAr
                ? item.title_ar || item.title || ''
                : item.title || '';

              return (
                <div
                  key={item.id}
                  className="group relative bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
                >
                  {/* Image Container */}
                  <div className="relative w-full h-64 overflow-hidden">
                    {item.image_url ? (
                      <>
                        <Image
                          src={item.image_url}
                          alt={displayTitle}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                      </>
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[#1e3a5f] to-[#2d5a8c] flex items-center justify-center">
                        <svg
                          className="w-16 h-16 text-white/30"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" />
                        </svg>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    {item.category && (
                      <span className="inline-block bg-[#c8a951]/20 text-[#1e3a5f] text-xs font-semibold px-3 py-1 rounded-full mb-2 capitalize">
                        {item.category}
                      </span>
                    )}
                    <h3 className="text-lg font-semibold text-[#1e3a5f] group-hover:text-[#c8a951] transition-colors">
                      {displayTitle}
                    </h3>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-600 text-lg">{t('noMedia')}</p>
          </div>
        )}
      </div>
    </main>
  );
}
