'use client';

import { useRouter, usePathname } from '@/i18n/routing';

interface MediaFilterProps {
  categories: { value: string; label: string }[];
  activeCategory: string;
}

export default function MediaFilter({ categories, activeCategory }: MediaFilterProps) {
  const router = useRouter();
  const pathname = usePathname();

  const handleCategoryChange = (category: string) => {
    const params = category === 'all' ? '' : `?category=${category}`;
    router.push(`${pathname}${params}`);
  };

  return (
    <div className="mb-12">
      <div className="flex flex-wrap gap-3 justify-center">
        {categories.map((category) => (
          <button
            key={category.value}
            onClick={() => handleCategoryChange(category.value)}
            className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
              activeCategory === category.value
                ? 'bg-[#1e3a5f] text-white shadow-lg'
                : 'bg-gray-100 text-[#1e3a5f] hover:bg-gray-200'
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>
    </div>
  );
}
