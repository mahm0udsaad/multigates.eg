import { getTranslations } from 'next-intl/server';
import { getPartnerBrandsWithHover } from '@/lib/data';
import { BrandLogoTile } from '@/components/ui/BrandLogoTile';
import { PageHero, HERO_IMAGES } from '@/components/layout/PageHero';

const COLORS = {
  primary: '#1e3a5f',
  secondary: '#c8a951',
};

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function PartnersPage({ params }: PageProps) {
  await params;
  const t = await getTranslations('partners');
  const brands = await getPartnerBrandsWithHover();

  return (
    <div className="w-full">
      {/* Page Header */}
      <PageHero
        eyebrow="Authorized Network"
        title={t("title")}
        subtitle={t("subtitle")}
        imageSrc={HERO_IMAGES.partners}
        imageAlt="Authorized Network"
      />

      {/* Partners Grid Section */}
      <section className="py-16 md:py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {brands.map((brand) => (
              <div
                key={brand.id}
                className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl hover:scale-105 transition-all duration-300 ease-out"
              >
                <BrandLogoTile
                  name={brand.name}
                  logoUrl={brand.logo_url}
                  hoverImageUrl={brand.hover_image_url}
                />

                <div className="p-4 text-center">
                  <h3
                    className="font-semibold text-lg group-hover:text-[#c8a951] transition-colors"
                    style={{ color: COLORS.primary }}
                  >
                    {brand.name}
                  </h3>
                  {brand.name_ar && (
                    <p className="text-gray-500 text-sm mt-1">
                      {brand.name_ar}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {brands.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">
                {t('noPartners')}
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
