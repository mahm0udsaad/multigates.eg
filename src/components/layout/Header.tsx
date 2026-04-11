"use client";

import { useState, useRef, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link, useRouter, usePathname } from "@/i18n/routing";
import { Menu, X, Globe, ChevronDown } from "lucide-react";

interface NavItem {
  key: string;
  href: string;
  children?: { key: string; href: string }[];
}

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const t = useTranslations("nav");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const isArabic = locale === "ar";
  const dropdownRef = useRef<HTMLDivElement>(null);

  const navLinks: NavItem[] = [
    { key: "home", href: "/" },
    { key: "products", href: "/products" },
    { key: "brands", href: "/brands" },
    { key: "partners", href: "/partners" },
    { key: "industries", href: "/industries" },
    { key: "services", href: "/services" },
    {
      key: "more",
      href: "#",
      children: [
        { key: "b2b", href: "/b2b" },
        { key: "investment", href: "/investment" },
        { key: "trademarks", href: "/trademarks" },
        { key: "careers", href: "/careers" },
        { key: "media", href: "/media" },
        { key: "blog", href: "/blog" },
        { key: "news", href: "/news" },
      ],
    },
    { key: "about", href: "/about" },
    { key: "contact", href: "/contact" },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleLanguage = () => {
    const newLocale = isArabic ? "en" : "ar";
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-[#1e3a5f] to-[#c8a951] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">MG</span>
              </div>
              <span className="text-xl font-bold text-[#1e3a5f]">
                Multi Gates
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6" ref={dropdownRef}>
            {navLinks.map((link) =>
              link.children ? (
                <div key={link.key} className="relative">
                  <button
                    onClick={() =>
                      setOpenDropdown(openDropdown === link.key ? null : link.key)
                    }
                    className="flex items-center gap-1 text-gray-700 hover:text-[#c8a951] transition-colors font-medium"
                  >
                    {t(link.key)}
                    <ChevronDown
                      size={16}
                      className={`transition-transform ${openDropdown === link.key ? "rotate-180" : ""}`}
                    />
                  </button>
                  {openDropdown === link.key && (
                    <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-50">
                      {link.children.map((child) => (
                        <Link
                          key={child.key}
                          href={child.href as "/b2b" | "/investment" | "/trademarks" | "/careers" | "/media" | "/blog" | "/news"}
                          className="block px-4 py-2 text-gray-700 hover:text-[#c8a951] hover:bg-gray-50 transition-colors text-sm font-medium"
                          onClick={() => setOpenDropdown(null)}
                        >
                          {t(child.key)}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.key}
                  href={link.href as "/" | "/products" | "/brands" | "/partners" | "/industries" | "/services" | "/about" | "/contact"}
                  className="text-gray-700 hover:text-[#c8a951] transition-colors font-medium"
                >
                  {t(link.key)}
                </Link>
              )
            )}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1 px-3 py-2 rounded-lg border border-[#c8a951] text-[#1e3a5f] hover:bg-[#c8a951] hover:text-white transition-colors"
              aria-label="Toggle language"
            >
              <Globe size={18} />
              <span className="text-sm font-medium">
                {isArabic ? "EN" : "AR"}
              </span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden pb-4 border-t border-gray-200">
            <div className="flex flex-col gap-1 pt-4">
              {navLinks.map((link) =>
                link.children ? (
                  <div key={link.key}>
                    <button
                      onClick={() =>
                        setOpenDropdown(openDropdown === link.key ? null : link.key)
                      }
                      className="w-full flex items-center justify-between text-gray-700 hover:text-[#c8a951] transition-colors font-medium px-4 py-2 rounded-lg hover:bg-gray-50"
                    >
                      {t(link.key)}
                      <ChevronDown
                        size={16}
                        className={`transition-transform ${openDropdown === link.key ? "rotate-180" : ""}`}
                      />
                    </button>
                    {openDropdown === link.key && (
                      <div className="ml-4 border-l-2 border-[#c8a951]/30 pl-4">
                        {link.children.map((child) => (
                          <Link
                            key={child.key}
                            href={child.href as "/b2b" | "/investment" | "/trademarks" | "/careers" | "/media" | "/blog" | "/news"}
                            className="block text-gray-600 hover:text-[#c8a951] transition-colors font-medium px-4 py-2 rounded-lg hover:bg-gray-50 text-sm"
                            onClick={() => {
                              setMobileMenuOpen(false);
                              setOpenDropdown(null);
                            }}
                          >
                            {t(child.key)}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={link.key}
                    href={link.href as "/" | "/products" | "/brands" | "/partners" | "/industries" | "/services" | "/about" | "/contact"}
                    className="text-gray-700 hover:text-[#c8a951] transition-colors font-medium px-4 py-2 rounded-lg hover:bg-gray-50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {t(link.key)}
                  </Link>
                )
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
