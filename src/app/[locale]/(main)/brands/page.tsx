import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { getBrands } from "@/lib/data";
import { PageHero, HERO_IMAGES } from "@/components/layout/PageHero";

export default async function BrandsPage() {
  const t = await getTranslations("brands");
  const brands = await getBrands();

  return (
    <div className="min-h-screen bg-white">
      <PageHero
        eyebrow="Global Partners"
        title={t("title")}
        subtitle={t("subtitle")}
        imageSrc={HERO_IMAGES.brands}
        imageAlt="Global Partners"
      />

      {/* Brands Grid */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {brands.map((brand) => (
            <Link
              key={brand.id}
              href={`/brands/${brand.slug}`}
              className="group"
            >
              <div className="h-full bg-white border-2 border-gray-200 rounded-lg p-6 transition-all duration-300 hover:border-[#c8a951] hover:shadow-lg cursor-pointer">
                <div className="flex flex-col h-full">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#1e3a5f] to-[#c8a951] rounded-lg flex items-center justify-center mb-4">
                    <span className="text-white font-bold text-sm">
                      {brand.name.slice(0, 3).toUpperCase()}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-[#1e3a5f] mb-2 group-hover:text-[#c8a951] transition-colors">
                    {brand.name}
                  </h3>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200 mt-auto">
                    <span className="text-[#c8a951] font-semibold">
                      {t("viewProducts")}
                    </span>
                    <span className="text-[#1e3a5f] font-bold text-lg group-hover:translate-x-1 transition-transform">
                      →
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
