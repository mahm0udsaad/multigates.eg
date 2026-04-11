"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Phone, Mail, MapPin, Store } from "lucide-react";
import Image from "next/image";

// Social icons as inline SVG (lucide v1 doesn't ship brand icons)
const FacebookIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" />
  </svg>
);

const LinkedinIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14zM8.34 18.34V10.5H5.67v7.84h2.67zM7 9.32a1.55 1.55 0 1 0 0-3.1 1.55 1.55 0 0 0 0 3.1zm11.34 9.02v-4.53c0-2.46-1.31-3.6-3.06-3.6a2.64 2.64 0 0 0-2.4 1.32v-1.03H10.2v7.84h2.67v-4.35c0-1.15.22-2.26 1.64-2.26 1.4 0 1.42 1.31 1.42 2.33v4.28h2.41z" />
  </svg>
);

const InstagramIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

export function Footer() {
  const t = useTranslations("footer");
  const nav = useTranslations("nav");
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0f1f35] text-white">
      {/* Top divider strip */}
      <div className="h-1 bg-gradient-to-r from-transparent via-[#c8a951] to-transparent" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="relative w-14 h-14 bg-white/5 rounded-xl p-1.5 ring-1 ring-white/10">
                <Image
                  src="/logo.png"
                  alt="Multi Gates"
                  fill
                  sizes="56px"
                  className="object-contain p-1"
                />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-xl font-bold">Multi Gates</span>
                <span className="text-[11px] font-medium text-[#c8a951] tracking-[0.2em] uppercase">
                  Since 1995
                </span>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed mb-5">
              Authorized distributor for world-renowned bearings, belts,
              chains, and industrial components across Egypt and the Middle
              East.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="#"
                aria-label="Facebook"
                className="w-9 h-9 rounded-lg bg-white/5 hover:bg-[#c8a951] hover:text-[#0f1f35] transition-colors flex items-center justify-center"
              >
                <FacebookIcon size={16} />
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-lg bg-white/5 hover:bg-[#c8a951] hover:text-[#0f1f35] transition-colors flex items-center justify-center"
              >
                <LinkedinIcon size={16} />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="w-9 h-9 rounded-lg bg-white/5 hover:bg-[#c8a951] hover:text-[#0f1f35] transition-colors flex items-center justify-center"
              >
                <InstagramIcon size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-base font-semibold mb-5 text-white">
              {t("quickLinks")}
            </h3>
            <ul className="space-y-3">
              {[
                { href: "/products", label: nav("products") },
                { href: "/brands", label: nav("brands") },
                { href: "/industries", label: nav("industries") },
                { href: "/services", label: nav("services") },
                { href: "/about", label: nav("about") },
                { href: "/contact", label: nav("contact") },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href as "/products" | "/brands" | "/industries" | "/services" | "/about" | "/contact"}
                    className="text-gray-300 hover:text-[#c8a951] transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-base font-semibold mb-5 text-white">
              {t("contactInfo")}
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone
                  size={16}
                  className="text-[#c8a951] flex-shrink-0 mt-0.5"
                />
                <div className="text-gray-300 text-sm space-y-0.5">
                  <div>+2 02 27731690</div>
                  <div>+2 010 68847541</div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail
                  size={16}
                  className="text-[#c8a951] flex-shrink-0 mt-0.5"
                />
                <a
                  href="mailto:sameh.ahmed@multigates-co.com"
                  className="text-gray-300 hover:text-[#c8a951] transition-colors text-sm break-all"
                >
                  sameh.ahmed@multigates-co.com
                </a>
              </li>
            </ul>
          </div>

          {/* Addresses */}
          <div>
            <h3 className="text-base font-semibold mb-5 text-white">
              Our Locations
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin
                  size={16}
                  className="text-[#c8a951] flex-shrink-0 mt-0.5"
                />
                <div className="text-gray-300 text-sm">
                  <div className="font-medium text-white mb-0.5">Office</div>
                  31 B Champollion Street,
                  <br />
                  Ma&apos;arouf, Qasr an Nile, Cairo
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Store
                  size={16}
                  className="text-[#c8a951] flex-shrink-0 mt-0.5"
                />
                <div className="text-gray-300 text-sm">
                  <div className="font-medium text-white mb-0.5">Showroom</div>
                  7 Muhammed Helmy Ibrahim Street,
                  <br />
                  Cairo
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3">
            <p className="text-gray-400 text-xs">
              &copy; {currentYear} Multi Gates for Industrial Development.{" "}
              {t("rights")}.
            </p>
            <p className="text-gray-500 text-xs">
              Authorized distributor for 17+ international brands
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
