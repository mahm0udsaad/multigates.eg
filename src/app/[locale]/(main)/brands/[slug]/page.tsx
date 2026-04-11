import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import {
  getBrandBySlug,
  getProductsByBrand,
  getCatalogsByBrand,
  getCertificatesByBrand,
} from "@/lib/data";
import { FileText, Award, ArrowLeft, ExternalLink, Lock } from "lucide-react";

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

export default async function BrandDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  const t = await getTranslations("brands");

  const brand = await getBrandBySlug(slug);
  if (!brand) {
    notFound();
  }

  const [products, catalogs, certificates] = await Promise.all([
    getProductsByBrand(brand.id),
    getCatalogsByBrand(brand.id),
    getCertificatesByBrand(brand.id),
  ]);

  const isAr = locale === "ar";

  return (
    <div className="min-h-screen bg-white">
      {/* Brand Header */}
      <div className="bg-gradient-to-r from-[#1e3a5f] to-[#2d5180] text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-4">
            <Link
              href="/brands"
              className="text-[#c8a951] hover:underline inline-flex items-center gap-1"
            >
              <ArrowLeft size={16} />
              {t("title")}
            </Link>
          </div>
          <h1 className="text-4xl font-bold">
            {isAr ? brand.name_ar || brand.name : brand.name}
          </h1>
          {brand.description && (
            <p className="mt-2 text-gray-300">
              {isAr ? brand.description_ar || brand.description : brand.description}
            </p>
          )}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Products Section */}
        {products.length > 0 && (
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-[#1e3a5f] mb-8">
              {t("products")} ({products.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-[#c8a951] hover:shadow-lg transition-all duration-300"
                >
                  {product.image_url && (
                    <div className="w-full h-40 bg-gray-100 rounded mb-4 flex items-center justify-center overflow-hidden">
                      <img
                        src={product.image_url}
                        alt={product.name}
                        className="max-h-full object-contain"
                      />
                    </div>
                  )}
                  <h3 className="text-lg font-bold text-[#1e3a5f]">
                    {isAr ? product.name_ar || product.name : product.name}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Catalogs Section */}
        {catalogs.length > 0 && (
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-[#1e3a5f] mb-8">
              {t("catalogs")} ({catalogs.length})
            </h2>
            <div className="space-y-4">
              {catalogs.map((catalog) => (
                <div
                  key={catalog.id}
                  className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-[#c8a951] hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-[#c8a951]" />
                      <h3 className="text-lg font-bold text-[#1e3a5f]">
                        {isAr
                          ? catalog.title_ar || catalog.title
                          : catalog.title}
                      </h3>
                    </div>
                    <div>
                      {catalog.external_url ? (
                        <a
                          href={catalog.external_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 bg-[#c8a951] text-[#1e3a5f] font-semibold rounded hover:bg-opacity-90 transition-all"
                        >
                          <ExternalLink size={16} />
                          {t("viewProducts")}
                        </a>
                      ) : (
                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-600 font-semibold rounded">
                          <Lock size={16} />
                          View Only
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certificates Section */}
        {certificates.length > 0 && (
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-[#1e3a5f] mb-8">
              {t("certificates")} ({certificates.length})
            </h2>
            <div className="space-y-4">
              {certificates.map((certificate) => (
                <div
                  key={certificate.id}
                  className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-[#c8a951] hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center gap-3">
                      <Award className="w-5 h-5 text-[#c8a951]" />
                      <h3 className="text-lg font-bold text-[#1e3a5f]">
                        {isAr
                          ? certificate.title_ar || certificate.title
                          : certificate.title}
                      </h3>
                    </div>
                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-600 font-semibold rounded">
                      <Lock size={16} />
                      View Only
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {products.length === 0 &&
          catalogs.length === 0 &&
          certificates.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-600 text-lg">
                No data available for this brand yet.
              </p>
            </div>
          )}
      </div>
    </div>
  );
}
