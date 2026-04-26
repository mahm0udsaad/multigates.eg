import Image from "next/image";
import { ReactNode } from "react";

interface PageHeroProps {
  /** Main heading. */
  title: string;
  /** Subheading shown below the title. */
  subtitle?: string;
  /** Small uppercase label/eyebrow above the title. */
  eyebrow?: string;
  /** Background image URL (public/Supabase/Unsplash). */
  imageSrc: string;
  /** Alt text for the background image. */
  imageAlt?: string;
  /** Vertical padding intensity. */
  size?: "sm" | "md" | "lg";
  /** Extra content (CTAs, stats, etc.) rendered under the subtitle. */
  children?: ReactNode;
  /** Override text alignment (default: left). */
  align?: "left" | "center";
}

/**
 * Reusable page hero with a background photo, dark gradient overlay,
 * decorative grid + glow, and consistent spacing across the site.
 */
export function PageHero({
  title,
  subtitle,
  eyebrow,
  imageSrc,
  imageAlt = "",
  size = "md",
  children,
  align = "left",
}: PageHeroProps) {
  const padY =
    size === "sm"
      ? "py-12 md:py-16"
      : size === "lg"
      ? "py-20 md:py-28 lg:py-32"
      : "py-16 md:py-24";

  const alignment = align === "center" ? "text-center mx-auto" : "";

  return (
    <section
      className={`relative w-full overflow-hidden text-white ${padY}`}
    >
      {/* Background image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        {/* Dark gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0f1f35]/95 via-[#1e3a5f]/85 to-[#0f1f35]/70" />
        {/* Bottom fade so the section blends into the next */}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white/10 to-transparent" />
      </div>

      {/* Decorative grid (very subtle) */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#c8a951 1px, transparent 1px), linear-gradient(90deg, #c8a951 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      {/* Gold glow */}
      <div className="absolute -top-40 -right-40 w-[520px] h-[520px] rounded-full blur-3xl bg-[#c8a951]/15 pointer-events-none" />

      <div className="relative z-10 container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className={`max-w-3xl ${alignment}`}>
          {eyebrow && (
            <span className="inline-block text-[11px] font-semibold tracking-[0.2em] uppercase text-[#c8a951] mb-3">
              {eyebrow}
            </span>
          )}
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 drop-shadow-md">
            {title}
          </h1>
          {subtitle && (
            <p className="text-lg md:text-xl text-gray-100/90 leading-relaxed max-w-2xl">
              {subtitle}
            </p>
          )}
          {children && <div className="mt-8">{children}</div>}
        </div>
      </div>
    </section>
  );
}

/**
 * Curated catalog of hero background image URLs. Centralized so we can
 * swap images globally without hunting through pages. All images are
 * either Supabase storage assets or stable Unsplash CDN URLs.
 */
export const HERO_IMAGES = {
  home: "https://images.unsplash.com/photo-1565843708714-52ecf69ab81f?auto=format&fit=crop&w=1920&q=80",
  about:
    "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1920&q=80",
  products:
    "https://images.unsplash.com/photo-1611288875785-f15a4f3a16e8?auto=format&fit=crop&w=1920&q=80",
  brands:
    "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=1920&q=80",
  industries:
    "https://rvhmhbtacshzcicwrdjn.supabase.co/storage/v1/object/public/product-images/industries/cement-industry.jpg",
  contact:
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=80",
  services:
    "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=1920&q=80",
  partners:
    "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1920&q=80",
  b2b: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1920&q=80",
  investment:
    "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1920&q=80",
  trademarks:
    "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1920&q=80",
  careers:
    "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1920&q=80",
  blog: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=1920&q=80",
  news: "https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&w=1920&q=80",
  media:
    "https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=1920&q=80",
};
