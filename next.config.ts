import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https" as const,
        hostname: "rvhmhbtacshzcicwrdjn.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
      {
        protocol: "https" as const,
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https" as const,
        hostname: "logos.hunter.io",
        pathname: "/**",
      },
      {
        protocol: "https" as const,
        hostname: "upload.wikimedia.org",
        pathname: "/**",
      },
    ],
  },
};

export default withNextIntl(nextConfig);
