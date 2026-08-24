import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import {
  getBrandBySlug,
  getProductsByBrand,
  getCatalogsByBrand,
  getCertificatesByBrand,
} from "@/lib/data";
import { PageHero, HERO_IMAGES } from "@/components/layout/PageHero";
import {
  FileText,
  Award,
  ArrowLeft,
  Lock,
  Package,
  Mail,
  Phone,
} from "lucide-react";
import Image from "next/image";
import { ProtectedDocumentViewer } from "@/components/ui/ProtectedDocumentViewer";

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
  const hasContent =
    products.length > 0 || catalogs.length > 0 || certificates.length > 0;

  return (
    <div className="min-h-screen bg-white">
      {/* Brand Header with Background Image */}
      <section className="relative overflow-hidden text-white">
        <Image
          src={HERO_IMAGES.brands}
          alt="Brand Hero"
          fill
          priority
          className="absolute inset-0 object-cover -z-10"
        />
        {/* Dark gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0f1f35]/95 via-[#1e3a5f]/85 to-[#0f1f35]/70 -z-5" />
        <div
          className="absolute inset-0 opacity-[0.06] -z-5"
          style={{
            backgroundImage:
              'linear-gradient(#c8a951 1px, transparent 1px), linear-gradient(90deg, #c8a951 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
        <div className="absolute -top-40 -right-40 w-[520px] h-[520px] rounded-full blur-3xl bg-[#c8a951]/20 -z-5" />

        <div className="relative z-10 container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-14 md:py-20">
          <Link
            href="/brands"
            className="inline-flex items-center gap-1.5 text-[#c8a951] hover:text-white transition-colors mb-6 text-sm font-medium"
          >
            <ArrowLeft size={16} className="rtl:rotate-180" />
            {t("title")}
          </Link>
          <div className="flex items-start gap-6">
            {brand.logo_url ? (
              <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-2xl bg-white/95 p-3 shadow-xl flex-shrink-0">
                <Image
                  src={brand.logo_url}
                  alt={brand.name}
                  fill
                  sizes="112px"
                  className="object-contain p-2"
                />
              </div>
            ) : (
              <div className="w-24 h-24 md:w-28 md:h-28 rounded-2xl bg-[#c8a951] flex-shrink-0 flex items-center justify-center shadow-xl">
                <span className="text-3xl md:text-4xl font-black text-[#1e3a5f] tracking-tight">
                  {brand.name.substring(0, 3).toUpperCase()}
                </span>
              </div>
            )}
            <div className="flex-1 min-w-0">
              <span className="inline-block text-[11px] font-semibold tracking-[0.2em] uppercase text-[#c8a951] mb-2">
                Authorized Distributor
              </span>
              <h1 className="text-3xl md:text-5xl font-bold leading-tight">
                {isAr ? brand.name_ar || brand.name : brand.name}
              </h1>
              {brand.description && (
                <p className="mt-3 text-gray-300 max-w-2xl leading-relaxed">
                  {isAr
                    ? brand.description_ar || brand.description
                    : brand.description}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16">
        {/* Products Section */}
        {products.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-[#1e3a5f] mb-8">
              {t("products")}{" "}
              <span className="text-[#c8a951]">({products.length})</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="bg-white border border-gray-200 rounded-xl p-5 hover:border-[#c8a951]/60 hover:shadow-lg transition-all duration-300"
                >
                  {product.image_url ? (
                    <div className="relative w-full h-44 bg-gray-50 rounded-lg mb-4 overflow-hidden">
                      <Image
                        src={product.image_url}
                        alt={product.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-contain p-3"
                      />
                    </div>
                  ) : (
                    <div className="w-full h-44 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg mb-4 flex items-center justify-center">
                      <Package size={40} className="text-gray-300" />
                    </div>
                  )}
                  <h3 className="text-base font-semibold text-[#1e3a5f] leading-tight">
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
            <h2 className="text-2xl md:text-3xl font-bold text-[#1e3a5f] mb-8">
              {t("catalogs")}{" "}
              <span className="text-[#c8a951]">({catalogs.length})</span>
            </h2>
            <div className="space-y-3">
              {catalogs.map((catalog) => (
                <div
                  key={catalog.id}
                  className="bg-white border border-gray-200 rounded-xl p-5 hover:border-[#c8a951]/60 hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-10 h-10 rounded-lg bg-[#c8a951]/10 flex items-center justify-center flex-shrink-0">
                        <FileText className="w-5 h-5 text-[#c8a951]" />
                      </div>
                      <h3 className="text-base font-semibold text-[#1e3a5f] truncate">
                        {isAr
                          ? catalog.title_ar || catalog.title
                          : catalog.title}
                      </h3>
                    </div>
                    <div className="flex items-center gap-2">
                      {(catalog.file_url || catalog.external_url) ? (
                        <ProtectedDocumentViewer
                          src={(catalog.external_url || catalog.file_url)!}
                          title={isAr ? catalog.title_ar || catalog.title : catalog.title}
                          isPdf={Boolean(catalog.file_url?.toLowerCase().endsWith('.pdf'))}
                          isExternal={Boolean(catalog.external_url)}
                          locale={locale}
                        />
                      ) : (
                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-600 font-semibold rounded-lg text-sm">
                          <Lock size={14} />
                          View Only
                        </span>
                      )}
                      <span className="inline-flex items-center gap-1 px-3 py-2 bg-gray-100 text-gray-500 rounded-lg text-xs">
                        <Lock size={12} />
                        {isAr ? "عرض فقط" : "No Download"}
                      </span>
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
            <h2 className="text-2xl md:text-3xl font-bold text-[#1e3a5f] mb-8">
              {t("certificates")}{" "}
              <span className="text-[#c8a951]">({certificates.length})</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {certificates.map((certificate) => {
                const isPdf = certificate.file_url?.toLowerCase().endsWith('.pdf');
                return (
                  <div
                    key={certificate.id}
                    className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-[#c8a951]/60 hover:shadow-lg transition-all duration-300"
                  >
                    {certificate.file_url && (
                      <div className="flex h-48 flex-col items-center justify-center gap-4 bg-gray-50 p-5">
                        {isPdf ? (
                          <FileText size={48} className="text-[#c8a951]" />
                        ) : (
                          <Award size={48} className="text-[#c8a951]" />
                        )}
                        <ProtectedDocumentViewer
                          src={certificate.file_url}
                          title={isAr ? certificate.title_ar || certificate.title : certificate.title}
                          isPdf={isPdf}
                          locale={locale}
                        />
                      </div>
                    )}
                    <div className="p-5">
                      <div className="flex items-center justify-between flex-wrap gap-3">
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-10 h-10 rounded-lg bg-[#c8a951]/10 flex items-center justify-center flex-shrink-0">
                            <Award className="w-5 h-5 text-[#c8a951]" />
                          </div>
                          <h3 className="text-base font-semibold text-[#1e3a5f] truncate">
                            {isAr
                              ? certificate.title_ar || certificate.title
                              : certificate.title}
                          </h3>
                        </div>
                        <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-gray-100 text-gray-500 rounded-lg text-xs">
                          <Lock size={12} />
                          {isAr ? "عرض فقط" : "View Only"}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Empty State */}
        {!hasContent && (
          <div className="max-w-3xl mx-auto">
            <div className="relative bg-gradient-to-br from-[#1e3a5f]/5 to-[#c8a951]/5 border border-gray-200 rounded-2xl p-8 md:p-12 text-center overflow-hidden">
              <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-[#c8a951]/10 blur-3xl" />
              <div className="relative">
                <div className="w-16 h-16 rounded-2xl bg-[#c8a951]/15 text-[#c8a951] flex items-center justify-center mx-auto mb-5">
                  <Package size={28} />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-[#1e3a5f] mb-3">
                  {brand.name} catalog is being prepared
                </h2>
                <p className="text-gray-600 mb-8 max-w-xl mx-auto leading-relaxed">
                  We&apos;re finalizing the product listing, technical catalog,
                  and distribution certificates for {brand.name}. In the
                  meantime, our team can share complete product information and
                  availability on request.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold bg-[#c8a951] text-[#1e3a5f] hover:bg-[#b89742] transition-colors"
                  >
                    <Mail size={16} />
                    Request {brand.name} catalog
                  </Link>
                  <a
                    href="tel:+20227731690"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold border-2 border-[#1e3a5f]/15 text-[#1e3a5f] hover:border-[#1e3a5f]/40 hover:bg-[#1e3a5f]/5 transition-colors"
                  >
                    <Phone size={16} />
                    +2 02 27731690
                  </a>
                </div>
                <p className="mt-6 text-xs uppercase tracking-wider text-gray-500">
                  Authorized distributor · Multi Gates · Since 1995
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
