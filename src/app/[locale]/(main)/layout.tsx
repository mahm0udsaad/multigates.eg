import { ReactNode } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { getBrandsWithProductsForMenu } from '@/lib/data';
import { CustomerSupportChat } from '@/components/ui/CustomerSupportChat';

type Props = {
  children: ReactNode;
};

export default async function MainLayout({ children }: Props) {
  // Pre-fetched data for the products mega-menu in the header.
  const productsMenuData = await getBrandsWithProductsForMenu(8);

  return (
    <div className="flex flex-col min-h-screen">
      <Header productsMenu={productsMenuData} />
      <main className="flex-1">
        {children}
      </main>
      <CustomerSupportChat />
      <Footer />
    </div>
  );
}
