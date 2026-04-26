import { searchBearingsByDimensions } from "@/lib/data";
import { PageHero, HERO_IMAGES } from "@/components/layout/PageHero";
import { Link } from "@/i18n/routing";
import { Search, Ruler, Package, ArrowRight, Info } from "lucide-react";
import Image from "next/image";

interface PageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{
    bore?: string;
    outer?: string;
    width?: string;
    type?: string;
    pn?: string;
  }>;
}

const BEARING_TYPES = [
  "Deep Groove Ball Bearing",
  "Spherical Roller Bearing",
  "Tapered Roller Bearing",
  "Cylindrical Roller Bearing",
  "Angular Contact Ball Bearing",
  "Self-Aligning Ball Bearing",
  "Thrust Ball Bearing",
  "Needle Roller Bearing",
];

function num(s?: string): number | undefined {
  if (!s) return undefined;
  const n = Number(s);
  return Number.isFinite(n) ? n : undefined;
}

export default async function BearingSearchPage({
  params,
  searchParams,
}: PageProps) {
  const { locale } = await params;
  const sp = await searchParams;
  const isAr = locale === "ar";

  const bore = num(sp.bore);
  const outer = num(sp.outer);
  const width = num(sp.width);
  const type = sp.type || undefined;
  const partNumber = sp.pn || undefined;

  const hasQuery = Boolean(
    bore !== undefined ||
      outer !== undefined ||
      width !== undefined ||
      type ||
      partNumber
  );

  const results = hasQuery
    ? await searchBearingsByDimensions({
        bore,
        outer,
        width,
        type,
        partNumber,
      })
    : [];

  return (
    <div className="w-full">
      <PageHero
        eyebrow={isAr ? "بحث الأبعاد" : "Bearing Finder"}
        title={
          isAr
            ? "ابحث عن الرولمان بالأبعاد أو رقم القطعة"
            : "Find a bearing by dimensions or part number"
        }
        subtitle={
          isAr
            ? "أدخل القطر الداخلي والخارجي والعرض ونوع الرولمان لنعرض لك المنتج المطابق عبر ماركاتنا."
            : "Enter the bore, outer diameter, width and bearing type and we'll find the matching part across our brands."
        }
        imageSrc={HERO_IMAGES.products}
        imageAlt="Bearing dimension search"
      />

      <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Search form */}
        <form
          method="GET"
          className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 md:p-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-[#c8a951]/15 flex items-center justify-center">
              <Ruler size={20} className="text-[#c8a951]" />
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-[#1e3a5f]">
              {isAr ? "أبعاد الرولمان" : "Bearing dimensions"}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <label className="block">
              <span className="text-sm font-semibold text-[#1e3a5f] mb-1.5 block">
                {isAr ? "القطر الداخلي (مم)" : "Bore Ø (mm)"}
              </span>
              <input
                type="number"
                step="0.01"
                name="bore"
                defaultValue={sp.bore || ""}
                placeholder="25"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c8a951] focus:border-transparent"
              />
            </label>
            <label className="block">
              <span className="text-sm font-semibold text-[#1e3a5f] mb-1.5 block">
                {isAr ? "القطر الخارجي (مم)" : "Outer Ø (mm)"}
              </span>
              <input
                type="number"
                step="0.01"
                name="outer"
                defaultValue={sp.outer || ""}
                placeholder="52"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c8a951] focus:border-transparent"
              />
            </label>
            <label className="block">
              <span className="text-sm font-semibold text-[#1e3a5f] mb-1.5 block">
                {isAr ? "العرض (مم)" : "Width (mm)"}
              </span>
              <input
                type="number"
                step="0.01"
                name="width"
                defaultValue={sp.width || ""}
                placeholder="15"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c8a951] focus:border-transparent"
              />
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <label className="block">
              <span className="text-sm font-semibold text-[#1e3a5f] mb-1.5 block">
                {isAr ? "نوع الرولمان" : "Bearing type"}
              </span>
              <select
                name="type"
                defaultValue={sp.type || ""}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c8a951] focus:border-transparent bg-white"
              >
                <option value="">
                  {isAr ? "كل الأنواع" : "All types"}
                </option>
                {BEARING_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="text-sm font-semibold text-[#1e3a5f] mb-1.5 block">
                {isAr ? "رقم القطعة (اختياري)" : "Part number (optional)"}
              </span>
              <input
                type="text"
                name="pn"
                defaultValue={sp.pn || ""}
                placeholder="6205"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c8a951] focus:border-transparent"
              />
            </label>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-xs text-gray-500 flex items-center gap-1.5">
              <Info size={13} className="text-[#c8a951]" />
              {isAr
                ? "تسامح ±0.5 مم في الأبعاد للحصول على نتائج أكثر."
                : "±0.5 mm tolerance is applied to dimensions."}
            </p>
            <button
              type="submit"
              className="inline-flex items-center gap-2 bg-[#c8a951] text-[#1e3a5f] font-semibold px-6 py-2.5 rounded-lg hover:bg-[#b89742] transition-colors"
            >
              <Search size={16} />
              {isAr ? "بحث" : "Search"}
            </button>
          </div>
        </form>

        {/* Results */}
        <div className="mt-10">
          {hasQuery ? (
            <>
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-xl font-bold text-[#1e3a5f]">
                  {isAr ? "النتائج" : "Results"}{" "}
                  <span className="text-[#c8a951]">({results.length})</span>
                </h3>
                <Link
                  href="/bearing-search"
                  className="text-sm font-semibold text-[#c8a951] hover:text-[#1e3a5f]"
                >
                  {isAr ? "بحث جديد" : "New search"}
                </Link>
              </div>

              {results.length === 0 ? (
                <div className="bg-white border border-gray-200 rounded-xl p-8 text-center">
                  <Package className="mx-auto text-gray-300 mb-3" size={48} />
                  <p className="font-semibold text-[#1e3a5f] mb-1">
                    {isAr
                      ? "لم نجد رولمان بهذه المواصفات"
                      : "No bearings match these specifications"}
                  </p>
                  <p className="text-sm text-gray-500">
                    {isAr
                      ? "جرّب توسيع نطاق البحث أو تواصل معنا للحصول على المساعدة."
                      : "Try widening the search or contact us — we may stock it without it being listed online yet."}
                  </p>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 mt-4 text-sm font-semibold text-[#c8a951] hover:text-[#1e3a5f]"
                  >
                    {isAr ? "تواصل معنا" : "Contact us"}
                    <ArrowRight size={14} className="rtl:rotate-180" />
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {results.map((r) => (
                    <Link
                      key={r.id}
                      href={`/brands/${r.brand_slug}` as `/brands/${string}`}
                      className="group flex items-center gap-4 bg-white border border-gray-200 rounded-xl p-4 hover:border-[#c8a951]/60 hover:shadow-md transition"
                    >
                      <div className="relative w-14 h-14 flex-shrink-0 rounded-lg bg-gray-50 border border-gray-100 overflow-hidden">
                        {r.brand_logo_url ? (
                          <Image
                            src={r.brand_logo_url}
                            alt={r.brand_name}
                            fill
                            sizes="56px"
                            className="object-contain p-1.5"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-xs font-black text-[#1e3a5f]">
                            {r.brand_name.substring(0, 3).toUpperCase()}
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="text-xs font-bold text-[#c8a951] uppercase tracking-wide">
                            {r.brand_name}
                          </span>
                          {r.bearing_type && (
                            <span className="text-[11px] text-gray-500">
                              · {r.bearing_type}
                            </span>
                          )}
                        </div>
                        <h4 className="font-bold text-[#1e3a5f] group-hover:text-[#c8a951] transition-colors">
                          {r.part_number || r.name}
                        </h4>
                        <div className="text-xs text-gray-500 mt-1 flex flex-wrap gap-x-4 gap-y-1">
                          {r.bore_diameter_mm !== null && (
                            <span>
                              {isAr ? "د/خ" : "Bore"}:{" "}
                              <strong>{r.bore_diameter_mm} mm</strong>
                            </span>
                          )}
                          {r.outer_diameter_mm !== null && (
                            <span>
                              {isAr ? "د/خ" : "OD"}:{" "}
                              <strong>{r.outer_diameter_mm} mm</strong>
                            </span>
                          )}
                          {r.width_mm !== null && (
                            <span>
                              {isAr ? "العرض" : "Width"}:{" "}
                              <strong>{r.width_mm} mm</strong>
                            </span>
                          )}
                        </div>
                      </div>
                      <ArrowRight
                        size={18}
                        className="text-gray-300 group-hover:text-[#c8a951] transition-colors rtl:rotate-180"
                      />
                    </Link>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="bg-gradient-to-br from-[#1e3a5f]/5 to-white border border-gray-100 rounded-2xl p-8 md:p-10 text-center">
              <div className="w-16 h-16 mx-auto rounded-full bg-[#c8a951]/15 flex items-center justify-center mb-4">
                <Search size={28} className="text-[#c8a951]" />
              </div>
              <h3 className="text-xl font-bold text-[#1e3a5f] mb-2">
                {isAr ? "كيف يعمل" : "How it works"}
              </h3>
              <p className="text-gray-600 max-w-xl mx-auto mb-6">
                {isAr
                  ? "أدخل أي مزيج من الأبعاد ونوع الرولمان أو رقم القطعة. سنبحث في كل ماركاتنا (NTN, SNR, KSM, DKF, Quaval, Kinex, STC-STEYR, JIB...) ونعرض لك القطع المطابقة."
                  : "Enter any combination of dimensions, bearing type, or part number. We'll search across all our brands (NTN, SNR, KSM, DKF, Quaval, Kinex, STC-STEYR, JIB...) and show you matching parts."}
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-2xl mx-auto text-xs text-gray-500">
                {[
                  { pn: "6205", body: "25 × 52 × 15" },
                  { pn: "6206", body: "30 × 62 × 16" },
                  { pn: "22210", body: "50 × 90 × 23" },
                  { pn: "30205", body: "25 × 52 × 16.25" },
                ].map((s) => (
                  <Link
                    key={s.pn}
                    href={`/bearing-search?pn=${s.pn}` as `/bearing-search`}
                    className="block bg-white border border-gray-200 rounded-lg p-3 hover:border-[#c8a951]/60 hover:shadow-sm transition"
                  >
                    <div className="font-bold text-[#1e3a5f]">{s.pn}</div>
                    <div className="mt-0.5">{s.body} mm</div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
