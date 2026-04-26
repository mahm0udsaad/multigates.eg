import { findCrossReferences } from "@/lib/data";
import { PageHero, HERO_IMAGES } from "@/components/layout/PageHero";
import { Link } from "@/i18n/routing";
import { Search, ArrowLeftRight, Package, ArrowRight } from "lucide-react";
import Image from "next/image";

interface PageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ pn?: string }>;
}

export default async function CrossReferencePage({
  params,
  searchParams,
}: PageProps) {
  const { locale } = await params;
  const sp = await searchParams;
  const isAr = locale === "ar";

  const partNumber = sp.pn?.trim() || "";
  const results = partNumber ? await findCrossReferences(partNumber) : [];

  return (
    <div className="w-full">
      <PageHero
        eyebrow={isAr ? "خدمة المراجعة المتقاطعة" : "Cross Reference"}
        title={
          isAr
            ? "ابحث عن مكافئ القطعة عبر ماركاتنا"
            : "Find an equivalent bearing across our brands"
        }
        subtitle={
          isAr
            ? "أدخل رقم القطعة لأي ماركة وسنعرض لك ما يكافئها لدى الماركات الأخرى المعتمدة."
            : "Enter a part number from any brand and we'll show you the equivalents from our other authorized brands."
        }
        imageSrc={HERO_IMAGES.services}
        imageAlt="Cross reference"
      />

      <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Search form */}
        <form
          method="GET"
          className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 md:p-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-[#c8a951]/15 flex items-center justify-center">
              <ArrowLeftRight size={20} className="text-[#c8a951]" />
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-[#1e3a5f]">
              {isAr ? "رقم القطعة" : "Part number"}
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              name="pn"
              defaultValue={partNumber}
              placeholder={isAr ? "مثال: 6205" : "e.g. 6205"}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c8a951] focus:border-transparent text-base"
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 bg-[#c8a951] text-[#1e3a5f] font-semibold px-7 py-3 rounded-lg hover:bg-[#b89742] transition-colors"
            >
              <Search size={16} />
              {isAr ? "ابحث عن المكافئ" : "Find equivalents"}
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-5 text-xs">
            <span className="text-gray-500 mr-2 self-center col-span-2 sm:col-span-1">
              {isAr ? "أمثلة:" : "Try:"}
            </span>
            {["6205", "6206", "22210", "30205"].map((pn) => (
              <Link
                key={pn}
                href={`/cross-reference?pn=${pn}` as `/cross-reference`}
                className="px-3 py-1.5 rounded-full bg-gray-100 text-gray-700 hover:bg-[#c8a951]/15 hover:text-[#c8a951] text-center font-mono"
              >
                {pn}
              </Link>
            ))}
          </div>
        </form>

        {/* Results */}
        {partNumber && (
          <div className="mt-10">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-xl font-bold text-[#1e3a5f]">
                {isAr ? "المكافئات لـ" : "Equivalents for"}{" "}
                <span className="font-mono text-[#c8a951]">{partNumber}</span>
              </h3>
              {results.length > 0 && (
                <span className="text-sm text-gray-500">
                  {results.length} {isAr ? "نتيجة" : "matches"}
                </span>
              )}
            </div>

            {results.length === 0 ? (
              <div className="bg-white border border-gray-200 rounded-xl p-8 text-center">
                <Package className="mx-auto text-gray-300 mb-3" size={48} />
                <p className="font-semibold text-[#1e3a5f] mb-1">
                  {isAr
                    ? "لم نجد قطعة مكافئة لهذا الرقم"
                    : "We couldn't find that part number in our catalog"}
                </p>
                <p className="text-sm text-gray-500 mb-4">
                  {isAr
                    ? "تواصل معنا — قد تكون متوفرة دون أن تكون مدرجة على الموقع بعد."
                    : "Contact us — we may stock it without it being listed online yet."}
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#c8a951] hover:text-[#1e3a5f]"
                >
                  {isAr ? "تواصل معنا" : "Contact us"}
                  <ArrowRight size={14} className="rtl:rotate-180" />
                </Link>
              </div>
            ) : (
              <>
                {/* Dimensions banner */}
                {results[0]?.bore_diameter_mm !== null && (
                  <div className="bg-[#1e3a5f]/5 border border-[#1e3a5f]/10 rounded-xl p-4 mb-5 text-sm">
                    <span className="font-semibold text-[#1e3a5f]">
                      {isAr ? "الأبعاد المشتركة:" : "Shared dimensions:"}
                    </span>{" "}
                    <span className="text-gray-700">
                      {results[0].bore_diameter_mm} ×{" "}
                      {results[0].outer_diameter_mm} × {results[0].width_mm} mm
                      {results[0].bearing_type
                        ? ` · ${results[0].bearing_type}`
                        : ""}
                    </span>
                  </div>
                )}

                {/* Results grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {results.map((r) => (
                    <Link
                      key={r.id}
                      href={`/brands/${r.brand_slug}` as `/brands/${string}`}
                      className="group flex items-center gap-3 bg-white border border-gray-200 rounded-xl p-4 hover:border-[#c8a951]/60 hover:shadow-md transition"
                    >
                      <div className="relative w-12 h-12 flex-shrink-0 rounded bg-gray-50 border border-gray-100 overflow-hidden">
                        {r.brand_logo_url ? (
                          <Image
                            src={r.brand_logo_url}
                            alt={r.brand_name}
                            fill
                            sizes="48px"
                            className="object-contain p-1.5"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-[10px] font-black text-[#1e3a5f]">
                            {r.brand_name.substring(0, 3).toUpperCase()}
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[11px] font-bold text-[#c8a951] uppercase tracking-wide">
                          {r.brand_name}
                        </div>
                        <div className="font-bold text-[#1e3a5f] group-hover:text-[#c8a951] transition-colors font-mono">
                          {r.part_number || r.name}
                        </div>
                      </div>
                      <ArrowRight
                        size={16}
                        className="text-gray-300 group-hover:text-[#c8a951] transition-colors rtl:rotate-180"
                      />
                    </Link>
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {/* Promo */}
        <div className="mt-10 bg-gradient-to-br from-[#1e3a5f] to-[#0f1f35] text-white rounded-2xl p-6 md:p-8 text-center">
          <h3 className="text-xl md:text-2xl font-bold mb-2">
            {isAr
              ? "ابحث برقم القطعة أو بالأبعاد"
              : "Search by part number or by dimensions"}
          </h3>
          <p className="text-gray-300 max-w-xl mx-auto mb-5 text-sm">
            {isAr
              ? "إذا كنت تعرف فقط الأبعاد، استخدم خدمة البحث بالأبعاد."
              : "If you only know the dimensions, use our dimension finder instead."}
          </p>
          <Link
            href="/bearing-search"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[#c8a951] text-[#1e3a5f] font-semibold hover:bg-[#b89742]"
          >
            {isAr ? "ابحث بالأبعاد" : "Bearing finder"}
            <ArrowRight size={16} className="rtl:rotate-180" />
          </Link>
        </div>
      </div>
    </div>
  );
}
