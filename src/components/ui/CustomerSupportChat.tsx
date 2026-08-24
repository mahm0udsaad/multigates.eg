'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { useLocale } from 'next-intl';
import { MessageCircle, Phone, X } from 'lucide-react';

const AVATAR_URL =
  'https://rvhmhbtacshzcicwrdjn.supabase.co/storage/v1/object/public/product-images/site/chat/customer-support.jpg';

export function CustomerSupportChat() {
  const locale = useLocale();
  const isAr = locale === 'ar';
  const [open, setOpen] = useState(false);

  const prompts = isAr
    ? [
        ['أحتاج مساعدة في اختيار رولمان', 'استخدم بحث الأبعاد أو أرسل المقاسات وفريقنا سيساعدك في تحديد رقم الرولمان المناسب.'],
        ['أريد عرض سعر', 'أرسل اسم الماركة ورقم القطعة والكمية من نموذج التواصل وسيتواصل معك فريق المبيعات.'],
        ['أحتاج كتالوجاً أو شهادة', 'افتح صفحة الماركة لعرض الكتالوجات والشهادات المتاحة داخل الموقع.'],
      ]
    : [
        ['Help me identify a bearing', 'Use the bearing finder, or send us the dimensions and our team will help identify the right part number.'],
        ['I need a quotation', 'Send the brand, part number and quantity through the contact form and our sales team will follow up.'],
        ['I need a catalog or certificate', 'Open the relevant brand page to view its available catalogs and certificates on the website.'],
      ];
  const [answer, setAnswer] = useState(prompts[0][1]);

  return (
    <div className="fixed bottom-5 right-5 z-50 rtl:left-5 rtl:right-auto">
      {open && (
        <div className="mb-3 w-[min(360px,calc(100vw-2.5rem))] overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl">
          <div className="flex items-center gap-3 bg-[#1e3a5f] p-4 text-white">
            <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-full border-2 border-[#c8a951] bg-white">
              <Image src={AVATAR_URL} alt="Multi Gates customer support" fill sizes="48px" className="object-cover" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-bold">{isAr ? 'مساعدة ملتي جيتس' : 'Multi Gates Support'}</p>
              <p className="text-xs text-gray-300">{isAr ? 'كيف يمكننا مساعدتك؟' : 'How can we help?'}</p>
            </div>
            <button type="button" onClick={() => setOpen(false)} aria-label={isAr ? 'إغلاق' : 'Close'} className="rounded-lg p-1.5 hover:bg-white/10">
              <X size={19} />
            </button>
          </div>

          <div className="space-y-3 p-4">
            <div className="rounded-xl rounded-tl-sm bg-gray-100 p-3 text-sm leading-relaxed text-gray-700 rtl:rounded-tr-sm">
              {answer}
            </div>
            <div className="space-y-2">
              {prompts.map(([question, response]) => (
                <button
                  key={question}
                  type="button"
                  onClick={() => setAnswer(response)}
                  className="block w-full rounded-lg border border-gray-200 px-3 py-2 text-start text-sm font-medium text-[#1e3a5f] transition hover:border-[#c8a951] hover:bg-[#c8a951]/5"
                >
                  {question}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-2 pt-1">
              <Link href="/contact" className="rounded-lg bg-[#c8a951] px-3 py-2.5 text-center text-sm font-bold text-[#1e3a5f] hover:bg-[#b89742]">
                {isAr ? 'أرسل طلباً' : 'Send request'}
              </Link>
              <a href="tel:+20227731690" className="flex items-center justify-center gap-1.5 rounded-lg border border-[#1e3a5f]/20 px-3 py-2.5 text-sm font-bold text-[#1e3a5f] hover:bg-[#1e3a5f]/5">
                <Phone size={14} />
                {isAr ? 'اتصل بنا' : 'Call us'}
              </a>
            </div>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-label={isAr ? 'فتح محادثة المساعدة' : 'Open customer support chat'}
        className="ml-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#c8a951] text-[#1e3a5f] shadow-xl ring-4 ring-white transition hover:scale-105 hover:bg-[#b89742] rtl:ml-0 rtl:mr-auto"
      >
        {open ? <X size={24} /> : <MessageCircle size={25} />}
      </button>
    </div>
  );
}
