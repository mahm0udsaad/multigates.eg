'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { ExternalLink, Lock, X } from 'lucide-react';

interface ProtectedDocumentViewerProps {
  src: string;
  title: string;
  isPdf?: boolean;
  isExternal?: boolean;
  locale?: string;
}

export function ProtectedDocumentViewer({
  src,
  title,
  isPdf = false,
  isExternal = false,
  locale = 'en',
}: ProtectedDocumentViewerProps) {
  const [open, setOpen] = useState(false);
  const isAr = locale === 'ar';

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const preventProtectedShortcuts = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
      if (
        (event.ctrlKey || event.metaKey) &&
        ['p', 's', 'u'].includes(event.key.toLowerCase())
      ) {
        event.preventDefault();
      }
    };

    window.addEventListener('keydown', preventProtectedShortcuts);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', preventProtectedShortcuts);
    };
  }, [open]);

  const viewerSrc = isPdf
    ? `${src}${src.includes('#') ? '&' : '#'}toolbar=0&navpanes=0&statusbar=0`
    : src;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 px-4 py-2 bg-[#c8a951] text-[#1e3a5f] font-semibold rounded-lg hover:bg-[#b89742] transition-colors text-sm"
      >
        <ExternalLink size={14} />
        {isAr ? 'عرض فقط' : 'View only'}
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[100] bg-[#07111f]/95 p-3 md:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={title}
          onContextMenu={(event) => event.preventDefault()}
        >
          <div className="mx-auto flex h-full max-w-6xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between gap-4 border-b border-gray-200 px-4 py-3 md:px-6">
              <div className="min-w-0">
                <p className="truncate font-semibold text-[#1e3a5f]">{title}</p>
                <p className="mt-0.5 flex items-center gap-1.5 text-xs text-gray-500">
                  <Lock size={12} />
                  {isAr
                    ? 'العرض داخل الموقع فقط — تم تعطيل أزرار الحفظ والطباعة'
                    : 'On-site viewing only — save and print controls are disabled'}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-[#1e3a5f]"
                aria-label={isAr ? 'إغلاق' : 'Close'}
              >
                <X size={22} />
              </button>
            </div>

            <div className="relative flex-1 select-none overflow-hidden bg-gray-100">
              {isPdf || isExternal ? (
                <iframe
                  src={viewerSrc}
                  title={title}
                  className="h-full w-full border-0"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <Image
                  src={src}
                  alt={title}
                  fill
                  sizes="100vw"
                  className="pointer-events-none object-contain p-4"
                  draggable={false}
                />
              )}

              <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center overflow-hidden opacity-[0.075]">
                <p className="-rotate-12 whitespace-nowrap text-4xl font-black tracking-[0.2em] text-[#1e3a5f] md:text-6xl">
                  MULTI GATES · VIEW ONLY
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
