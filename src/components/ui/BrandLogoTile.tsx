"use client";

import Image from "next/image";
import { useState } from "react";

interface Props {
  name: string;
  logoUrl: string | null;
  hoverImageUrl?: string | null;
}

function getInitials(name: string): string {
  return name
    .split(/\s|-/)
    .filter(Boolean)
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function BrandLogoTile({ name, logoUrl, hoverImageUrl }: Props) {
  const [logoFailed, setLogoFailed] = useState(false);
  const showLogo = logoUrl && !logoFailed;

  return (
    <div
      className="relative w-full h-48 flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: "#1e3a5f0d" }}
    >
      {!showLogo && (
        <div className="absolute inset-0 flex items-center justify-center text-white text-2xl font-bold bg-[#1e3a5f]">
          {getInitials(name)}
        </div>
      )}
      {showLogo && logoUrl && (
        <div
          className={`relative z-10 transition-all duration-300 ${
            hoverImageUrl ? "group-hover:opacity-0" : "group-hover:scale-110"
          }`}
        >
          <Image
            src={logoUrl}
            alt={name}
            width={200}
            height={150}
            className="object-contain p-4 max-h-40 w-auto"
            onError={() => setLogoFailed(true)}
          />
        </div>
      )}
      {hoverImageUrl && (
        <Image
          src={hoverImageUrl}
          alt={`${name} product`}
          fill
          sizes="(max-width: 768px) 100vw, 25vw"
          className="z-20 object-contain p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white"
        />
      )}
    </div>
  );
}
