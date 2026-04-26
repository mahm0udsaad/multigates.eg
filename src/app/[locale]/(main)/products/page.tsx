import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import {
  getBrands,
  getTopLevelCategories,
  getProducts,
  getProductCountsByBrand,
} from "@/lib/data";
import { Package, ArrowRight, Grid3X3, Factory, Train, Car, Store, Briefcase } from "lucide-react";
import Image from "next/image";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function ProductsPage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations("products");
  const isAr = locale === "ar";

  const [brands, categories, allProducts, productCounts] = await Promise.all([
    getBrands(),
    getTopLevelCategories(),
    getProducts(),
    getProductCountsByBrand(),
  ]);

  // Group products by brand for preview images
  const productsByBrand: Record<string, typeof allProducts> = {};
  for (const product of allProducts) {
    if (!productsByBrand[product.brand_id]) {
      productsByBrand[product.brand_id] = [];
    }
    productsByBrand[product.brand_id].push(product);
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Page Header */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0f1f35] via-[#1e3a5f] to-[#0f1f35] text-white">
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(#c8a951 1px, transparent 1px), linear-gradient(90deg, #c8a951 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div className="absolute -top-40 -right-40 w-[520px] h-[520px] rounded-full blur-3xl bg-[#c8a951]/20" />
        <div className="relative z-10 container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-14 md:py-20">
          <span className="inline-block text-[11px] font-semibold tracking-[0.2em] uppercase text-[#c8a951] mb-3">
            {isAr ? "كتالوج المنتجات" : "Product Catalog"}
          </span>
          <h1 className="text-3xl md:text-5xl font-bold mb-4">{t("title")}</h1>
          <p className="text-lg text-gray-300 max-w-2xl">{t("subtitle")}</p>
          <div className="flex items-center gap-6 mt-6 text-sm text-gray-400">
            <span className="flex items-center gap-2">
              <Package size={16} className="text-[#c8a951]" />
              {allProducts.length} {isAr ? "منتج" : "Products"}
            </span>
            <span className="flex items-center gap-2">
              <Grid3X3 size={16} className="text-[#c8a951]" />
              {brands.length} {isAr ? "علامة تجارية" : "Brands"}
            </span>
          </div>
        </div>
      </section>

      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16">
        {/* Bearings Segments */}
        <div className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-[#1e3a5f] mb-2">
            {isAr ? "قطاعات الرولمان" : "Bearings Segments"}
          </h2>
          <p className="text-gray-600 mb-8">
            {isAr
              ? "نخدم القطاعات الصناعية والتجارية الكبرى عبر مجموعتنا الكاملة من رولمان البلي."
              : "We serve major industrial and commercial segments across our full range of rolling bearings."}
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { icon: Factory, label: isAr ? "صناعي" : "Industry" },
              { icon: Train, label: isAr ? "السكك الحديدية" : "Railway" },
              { icon: Car, label: isAr ? "السيارات" : "Automotive" },
              { icon: Store, label: isAr ? "تجزئة" : "Retail" },
              { icon: Briefcase, label: isAr ? "القطاع التجاري" : "Trading Sector" },
            ].map((seg) => {
              const Icon = seg.icon;
              return (
                <div
                  key={seg.label}
                  className="bg-white border border-gray-200 rounded-xl p-5 text-center hover:border-[#c8a951]/60 hover:shadow-md transition group"
                >
                  <div className="w-12 h-12 mx-auto mb-3 rounded-xl flex items-center justify-center bg-[#c8a951]/10 group-hover:bg-[#c8a951] transition">
                    <Icon size={22} className="text-[#c8a951] group-hover:text-[#1e3a5f] transition" />
                  </div>
                  <h3 className="text-sm md:text-base font-bold text-[#1e3a5f]">
                    {seg.label}
                  </h3>
                </div>
              );
            })}
          </div>
        </div>

        {/* Categories Section */}
        {categories.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-[#1e3a5f] mb-8">
              {t("categories")}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className="bg-gradient-to-br from-[#1e3a5f] to-[#2d5180] text-white rounded-xl p-5 hover:shadow-lg transition-all duration-300 group"
                >
                  <Package className="w-6 h-6 text-[#c8a951] mb-3" />
                  <h3 className="text-sm md:text-base font-bold group-hover:text-[#c8a951] transition-colors leading-tight">
                    {isAr ? category.name_ar || category.name : category.name}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Products by Brand */}
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-[#1e3a5f] mb-8">
            {t("byBrand")}
          </h2>
          <div className="space-y-6">
            {brands.map((brand) => {
              const count = productCounts[brand.id] || 0;
              const preview = (productsByBrand[brand.id] || [])
                .filter((p) => p.image_url)
                .slice(0, 4);

              return (
                <Link
                  key={brand.id}
                  href={`/brands/${brand.slug}`}
                  className="group block"
                >
                  <div className="bg-white border border-gray-200 rounded-xl p-5 md:p-6 hover:border-[#c8a951]/60 hover:shadow-xl transition-all duration-300">
                    <div className="flex items-start gap-5">
                      {/* Brand logo */}
                      <div className="flex-shrink-0">
                        {brand.logo_url ? (
                          <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-xl bg-gray-50 border border-gray-100 overflow-hidden">
                            <Image
                              src={brand.logo_url}
                              alt={brand.name}
                              fill
                              sizes="80px"
                              className="object-contain p-2 grayscale group-hover:grayscale-0 transition-all"
                            />
                          </div>
                        ) : (
                          <div className="w-16 h-16 md:w-20 md:h-20 rounded-xl bg-gradient-to-br from-[#1e3a5f] to-[#1e3a5f]/80 flex items-center justify-center">
                            <span className="text-xl font-black text-white">
                              {brand.name.substring(0, 3).toUpperCase()}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Brand info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="text-xl font-bold text-[#1e3a5f] group-hover:text-[#c8a951] transition-colors">
                            {isAr ? brand.name_ar || brand.name : brand.name}
                          </h3>
                          {count > 0 && (
                            <span className="px-2.5 py-0.5 bg-[#c8a951]/10 text-[#c8a951] text-xs font-bold rounded-full">
                              {count} {isAr ? "منتج" : "products"}
                            </span>
                          )}
                        </div>
                        {brand.description && (
                          <p className="text-sm text-gray-500 line-clamp-1 mb-3">
                            {isAr
                              ? brand.description_ar || brand.description
                              : brand.description}
                          </p>
                        )}

                        {/* Product preview thumbnails */}
                        {preview.length > 0 && (
                          <div className="flex items-center gap-2 mt-2">
                            {preview.map((product) => (
                              <div
                                key={product.id}
                                className="relative w-12 h-12 md:w-14 md:h-14 rounded-lg bg-gray-50 border border-gray-100 overflow-hidden"
                              >
                                <Image
                                  src={product.image_url!}
                                  alt={product.name}
                                  fill
                                  sizes="56px"
                                  className="object-contain p-1"
                                />
                              </div>
                            ))}
                            {count > 4 && (
                              <div className="w-12 h-12 md:w-14 md:h-14 rounded-lg bg-[#1e3a5f]/5 flex items-center justify-center">
                                <span className="text-xs font-bold text-[#1e3a5f]">
                                  +{count - 4}
                                </span>
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Arrow */}
                      <div className="flex-shrink-0 self-center">
                        <div className="w-10 h-10 rounded-lg bg-gray-50 group-hover:bg-[#c8a951] flex items-center justify-center transition-colors">
                          <ArrowRight
                            size={18}
                            className="text-gray-400 group-hover:text-[#1e3a5f] transition-colors rtl:rotate-180"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
