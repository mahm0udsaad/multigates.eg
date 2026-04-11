"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Phone, Mail, MapPin } from "lucide-react";

export function Footer() {
  const t = useTranslations("footer");
  const nav = useTranslations("nav");
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#1e3a5f] text-white py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-[#c8a951] rounded-lg flex items-center justify-center">
                <span className="text-[#1e3a5f] font-bold text-lg">MG</span>
              </div>
              <span className="text-xl font-bold">Multi Gates</span>
            </div>
            <p className="text-gray-300 text-sm">
              Leading supplier of bearings, belts, chains, and industrial
              components in Egypt and the Middle East.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">{t("quickLinks")}</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-gray-300 hover:text-[#c8a951] transition-colors"
                >
                  {nav("home")}
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="text-gray-300 hover:text-[#c8a951] transition-colors"
                >
                  {nav("products")}
                </Link>
              </li>
              <li>
                <Link
                  href="/brands"
                  className="text-gray-300 hover:text-[#c8a951] transition-colors"
                >
                  {nav("brands")}
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-300 hover:text-[#c8a951] transition-colors"
                >
                  {nav("about")}
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-300 hover:text-[#c8a951] transition-colors"
                >
                  {nav("contact")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-4">{t("contactInfo")}</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <Phone
                  size={18}
                  className="text-[#c8a951] flex-shrink-0 mt-1"
                />
                <span className="text-gray-300">+2 02 27731690</span>
              </li>
              <li className="flex items-start gap-2">
                <Mail
                  size={18}
                  className="text-[#c8a951] flex-shrink-0 mt-1"
                />
                <span className="text-gray-300">
                  sameh.ahmed@multigates-co.com
                </span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin
                  size={18}
                  className="text-[#c8a951] flex-shrink-0 mt-1"
                />
                <span className="text-gray-300">
                  31 B Champollion Street, Cairo, Egypt
                </span>
              </li>
            </ul>
          </div>

          {/* Follow Us */}
          <div>
            <h3 className="text-lg font-bold mb-4">{t("followUs")}</h3>
            <p className="text-gray-300 text-sm mb-4">
              Stay connected for the latest industrial solutions and product
              updates.
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              &copy; {currentYear} Multi Gates for Industrial Development.{" "}
              {t("rights")}.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
