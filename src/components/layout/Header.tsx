"use client";

import { useState, useRef, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link, useRouter, usePathname } from "@/i18n/routing";
import { Menu, X, Globe, ChevronDown, Phone, Mail } from "lucide-react";
import Image from "next/image";

interface NavItem {
  key: string;
  href: string;
  children?: { key: string; href: string }[];
}

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleLanguage = () => {
    const newLocale = isArabic ? "en" : "ar";
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <header className="sticky top-0 z-50">
      {/* Top contact bar */}
      <div className="hidden md:block bg-[#1e3a5f] text-white text-xs">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-9 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <a
              href="tel:+20227731690"
              className="flex items-center gap-1.5 hover:text-[#c8a951] transition-colors"
            >
              <Phone size={13} />
              <span>+2 02 27731690</span>
            </a>
            <a
              href="mailto:sameh.ahmed@multigates-co.com"
              className="flex items-center gap-1.5 hover:text-[#c8a951] transition-colors"
            >
              <Mail size={13} />
              <span>sameh.ahmed@multigates-co.com</span>
            </a>
          </div>
          <div className="text-[#c8a951] font-medium tracking-wide">
            Authorized distributor since 1995
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <nav
        className={`bg-white transition-shadow duration-200 ${
          scrolled ? "shadow-md" : "shadow-sm"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center gap-3 group">
                <div className="relative w-12 h-12 md:w-14 md:h-14">
                  <Image
                    src="/logo.png"
                    alt="Multi Gates"
                    fill
                    sizes="56px"
                    priority
                    className="object-contain"
                  />
                </div>
                <div className="flex flex-col leading-tight">
                  <span className="text-lg md:text-xl font-bold text-[#1e3a5f] tracking-tight">
                    Multi Gates
                  </span>
                  <span className="text-[10px] md:text-xs font-medium text-[#c8a951] tracking-[0.2em] uppercase">
                    Since 1995
                  </span>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-5 xl:gap-6" ref={dropdownRef}>
              {navLinks.map((link) =>
                link.children ? (
                  <div key={link.key} className="relative">
                    <button
                      onClick={() =>
                        setOpenDropdown(openDropdown === link.key ? null : link.key)
                      }
                      className="flex items-center gap-1 text-gray-700 hover:text-[#c8a951] transition-colors font-medium text-sm"
                    >
                      {t(link.key)}
                      <ChevronDown
                        size={14}
                        className={`transition-transform ${openDropdown === link.key ? "rotate-180" : ""}`}
                      />
                    </button>
                    {openDropdown === link.key && (
                      <div className="absolute top-full left-0 mt-3 w-52 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50 overflow-hidden">
                        {link.children.map((child) => (
                          <Link
                            key={child.key}
                            href={child.href as "/b2b" | "/investment" | "/trademarks" | "/careers" | "/media" | "/blog" | "/news"}
                            className="block px-4 py-2.5 text-gray-700 hover:text-[#c8a951] hover:bg-[#c8a951]/5 transition-colors text-sm font-medium"
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
                    className="text-gray-700 hover:text-[#c8a951] transition-colors font-medium text-sm"
                  >
                    {t(link.key)}
                  </Link>
                )
              )}
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-2 md:gap-3">
              <Link
                href="/contact"
                className="hidden md:inline-flex items-center px-4 py-2 rounded-lg text-sm font-semibold bg-[#c8a951] text-[#1e3a5f] hover:bg-[#b89742] transition-colors"
              >
                {t("contact")}
              </Link>
              <button
                onClick={toggleLanguage}
                className="flex items-center gap-1 px-3 py-2 rounded-lg border border-[#c8a951]/70 text-[#1e3a5f] hover:bg-[#c8a951] hover:text-white transition-colors"
                aria-label="Toggle language"
              >
                <Globe size={16} />
                <span className="text-sm font-semibold">
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
                        className="w-full flex items-center justify-between text-gray-700 hover:text-[#c8a951] transition-colors font-medium px-4 py-2.5 rounded-lg hover:bg-gray-50"
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
                      className="text-gray-700 hover:text-[#c8a951] transition-colors font-medium px-4 py-2.5 rounded-lg hover:bg-gray-50"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {t(link.key)}
                    </Link>
                  )
                )}
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
