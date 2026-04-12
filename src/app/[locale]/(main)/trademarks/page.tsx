import { getTranslations } from "next-intl/server";
import {
  getBrandBySlug,
  getCertificatesByBrand,
} from "@/lib/data";
import { Award, Lock, FileText } from "lucide-react";
import Image from "next/image";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function TrademarksPage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations("trademarks");
  const isAr = locale === "ar";

  // Fetch KSM and Quaval brands + their certificates
  const [ksmBrand, quavalBrand] = await Promise.all([
    getBrandBySlug("ksm"),
    getBrandBySlug("quaval"),
  ]);

  const [ksmCerts, quavalCerts] = await Promise.all([
    ksmBrand ? getCertificatesByBrand(ksmBrand.id) : [],
    quavalBrand ? getCertificatesByBrand(quavalBrand.id) : [],
  ]);

  const trademarks = [
    {
      id: "ksm",
      brand: ksmBrand,
      certificates: ksmCerts,
      titleKey: "ksmTitle" as const,
      descriptionKey: "ksmDescription" as const,
    },
    {
      id: "quaval",
      brand: quavalBrand,
      certificates: quavalCerts,
      titleKey: "quavalTitle" as const,
      descriptionKey: "quavalDescription" as const,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0f1f35] via-[#1e3a5f] to-[#0f1f35] text-white">
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(#c8a951 1px, transparent 1px), linear-gradient(90deg, #c8a951 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div className="relative z-10 container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-14 md:py-20 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Award className="w-10 h-10 text-[#c8a951]" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t("title")}</h1>
          <p className="text-xl text-gray-300">{t("subtitle")}</p>
        </div>
      </section>

      {/* Trademarks Section */}
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {trademarks.map((trademark) => (
            <div
              key={trademark.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden"
            >
              {/* Card Header */}
              <div className="bg-gradient-to-r from-[#1e3a5f] to-[#2d5180] px-6 py-8 text-white">
                <div className="flex items-center gap-4">
                  {trademark.brand?.logo_url && (
                    <div className="relative w-16 h-16 rounded-xl bg-white/10 p-2 flex-shrink-0">
                      <Image
                        src={trademark.brand.logo_url}
                        alt={trademark.brand.name}
                        fill
                        sizes="64px"
                        className="object-contain p-1"
                      />
                    </div>
                  )}
                  <div>
                    <h2 className="text-2xl font-bold">
                      {t(trademark.titleKey)}
                    </h2>
                    <p className="text-gray-300 text-sm mt-1">
                      {t(trademark.descriptionKey)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Certificates */}
              <div className="p-6">
                <h3 className="text-sm font-semibold text-[#1e3a5f] uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Award size={16} className="text-[#c8a951]" />
                  {isAr ? "الشهادات" : "Certificates"}
                </h3>
                {trademark.certificates.length > 0 ? (
                  <div className="space-y-4">
                    {trademark.certificates.map((cert) => {
                      const isPdf = cert.file_url
                        ?.toLowerCase()
                        .endsWith(".pdf");
                      return (
                        <div
                          key={cert.id}
                          className="border border-gray-200 rounded-xl overflow-hidden"
                        >
                          {cert.file_url && !isPdf && (
                            <div className="relative w-full h-56 bg-gray-50">
                              <Image
                                src={cert.file_url}
                                alt={cert.title}
                                fill
                                sizes="(max-width: 768px) 100vw, 50vw"
                                className="object-contain p-4"
                              />
                            </div>
                          )}
                          {cert.file_url && isPdf && (
                            <div className="relative w-full h-56 bg-gray-50 flex items-center justify-center">
                              <a
                                href={cert.file_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex flex-col items-center gap-2 text-[#1e3a5f] hover:text-[#c8a951] transition-colors"
                              >
                                <FileText
                                  size={40}
                                  className="text-[#c8a951]"
                                />
                                <span className="font-semibold text-sm">
                                  {isAr
                                    ? "عرض الشهادة"
                                    : "View Certificate"}
                                </span>
                              </a>
                            </div>
                          )}
                          <div className="px-4 py-3 flex items-center justify-between bg-gray-50/50">
                            <span className="text-sm font-semibold text-[#1e3a5f]">
                              {isAr
                                ? cert.title_ar || cert.title
                                : cert.title}
                            </span>
                            <span className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-500 rounded text-xs">
                              <Lock size={10} />
                              {isAr ? "عرض فقط" : "View Only"}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-400">
                    <Award size={32} className="mx-auto mb-2 opacity-30" />
                    <p className="text-sm">
                      {isAr
                        ? "سيتم إضافة الشهادات قريباً"
                        : "Certificates coming soon"}
                    </p>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="px-6 py-3 bg-gray-50 border-t border-gray-100">
                <p className="text-xs text-gray-500">
                  {t("trademarkOwner")}: Multi Gates for Industrial Development
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info Section */}
        <div className="mt-12 bg-white rounded-2xl shadow-lg p-8">
          <h3 className="text-2xl font-bold mb-4 pb-4 border-b-2 text-[#1e3a5f] border-[#c8a951]">
            {t("aboutTrademarksTitle")}
          </h3>
          <div className="space-y-4 text-gray-700">
            <p>{t("aboutTrademarksText1")}</p>
            <p>{t("aboutTrademarksText2")}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
