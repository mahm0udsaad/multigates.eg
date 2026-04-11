import { getTranslations } from 'next-intl/server';
import { getBrands } from '@/lib/data';
import Image from 'next/image';

const COLORS = {
  primary: '#1e3a5f',
  secondary: '#c8a951',
};

interface PageProps {
  params: Promise<{ locale: string }>;
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export default async function PartnersPage({ params }: PageProps) {
  await params;
  const t = await getTranslations('partners');
  const brands = await getBrands();

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

      {/* Partners Grid Section */}
      <section className="py-16 md:py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {brands.map((brand) => (
              <div
                key={brand.id}
                className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl hover:scale-105 transition-all duration-300 ease-out"
              >
                <div
                  className="relative w-full h-48 flex items-center justify-center overflow-hidden"
                  style={{ backgroundColor: `${COLORS.primary}05` }}
                >
                  {brand.logo_url ? (
                    <Image
                      src={brand.logo_url}
                      alt={brand.name}
                      width={200}
                      height={150}
                      className="object-contain p-4 max-h-40 w-auto group-hover:scale-110 transition-transform duration-300"
                    />
                  ) : (
                    <div
                      className="w-full h-full flex items-center justify-center text-white text-2xl font-bold"
                      style={{ backgroundColor: COLORS.primary }}
                    >
                      {getInitials(brand.name)}
                    </div>
                  )}
                </div>

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
