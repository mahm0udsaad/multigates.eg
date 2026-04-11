import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { routing } from "@/i18n/routing";
import "../globals.css";

export const metadata: Metadata = {
  title: {
    default: "Multi Gates for Industrial Development",
    template: "%s | Multi Gates",
  },
  description:
    "Authorized distributor for world-class bearings, belts, chains, and industrial components in Egypt and the Middle East. Serving 18+ industries since 1995.",
  keywords:
    "bearings, industrial components, Egypt, NTN, SNR, Timken, STC-STEYR, KSM, Kinex, JIB, IKO, DKF, Quaval",
  icons: {
    icon: [
      { url: "/logo.png", type: "image/png" },
    ],
    apple: "/logo.png",
    shortcut: "/logo.png",
  },
  openGraph: {
    title: "Multi Gates for Industrial Development",
    description:
      "Authorized distributor for world-class bearings and industrial components in Egypt. Since 1995.",
    images: ["/logo.png"],
    type: "website",
  },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "en" | "ar")) {
    notFound();
  }

  const messages = await getMessages();
  const isRTL = locale === "ar";

  return (
    <html lang={locale} dir={isRTL ? "rtl" : "ltr"}>
      <body className="antialiased">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
