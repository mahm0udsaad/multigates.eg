import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { getBrands, getTopLevelCategories } from "@/lib/data";
import { Package, ArrowRight } from "lucide-react";

export default async function ProductsPage() {
  const t = await getTranslations("products");
  const [brands, categories] = await Promise.all([
    getBrands(),
    getTopLevelCategories(),
  ]);

  return (
    <div className="min-h-screen bg-white">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-[#1e3a5f] to-[#2d5180] text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">{t("title")}</h1>
          <p className="text-lg opacity-90">{t("subtitle")}</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Categories Section */}
        {categories.length > 0 && (
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-[#1e3a5f] mb-8">
              {t("categories")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className="bg-gradient-to-br from-[#1e3a5f] to-[#2d5180] text-white rounded-lg p-8 hover:shadow-lg transition-all duration-300 group"
                >
                  <Package className="w-8 h-8 text-[#c8a951] mb-4" />
                  <h3 className="text-xl font-bold mb-2 group-hover:text-[#c8a951] transition-colors">
                    {category.name}
                  </h3>
                  {category.name_ar && (
                    <p className="text-white opacity-60 text-sm">
                      {category.name_ar}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Brands Section */}
        <div>
          <h2 className="text-3xl font-bold text-[#1e3a5f] mb-8">
            {t("byBrand")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {brands.map((brand) => (
              <Link
                key={brand.id}
                href={`/brands/${brand.slug}`}
                className="group"
              >
                <div className="h-full bg-white border-2 border-gray-200 rounded-lg p-6 transition-all duration-300 hover:border-[#c8a951] hover:shadow-lg cursor-pointer">
                  <div className="flex flex-col h-full">
                    <h3 className="text-2xl font-bold text-[#1e3a5f] mb-4 group-hover:text-[#c8a951] transition-colors">
                      {brand.name}
                    </h3>
                    <div className="flex items-center justify-between pt-4 border-t border-gray-200 mt-auto">
                      <span className="text-[#c8a951] font-semibold">
                        {t("viewCatalog")}
                      </span>
                      <ArrowRight
                        size={20}
                        className="text-[#1e3a5f] group-hover:translate-x-1 transition-transform"
                      />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
