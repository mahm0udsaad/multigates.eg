import { getTranslations } from 'next-intl/server';
import {
  Headphones,
  FileText,
  Truck,
  Import,
  Package,
  Building2,
  Link2,
  AlertTriangle,
  Database,
  Clock,
} from 'lucide-react';

interface Service {
  id: string;
  icon: React.ReactNode;
  title: string;
  description?: string;
  comingSoon?: boolean;
}

export default async function ServicesPage() {
  const t = await getTranslations('services');

  const services: Service[] = [
    {
      id: 'technical-support',
      icon: <Headphones className="w-12 h-12" />,
      title: t('technicalSupport'),
    },
    {
      id: 'catalogs',
      icon: <FileText className="w-12 h-12" />,
      title: t('catalogs'),
    },
    {
      id: 'shipping',
      icon: <Truck className="w-12 h-12" />,
      title: t('shipping'),
    },
    {
      id: 'import-services',
      icon: <Import className="w-12 h-12" />,
      title: t('importServices'),
      description: t('importServicesDesc'),
    },
    {
      id: 'stock-at-site',
      icon: <Package className="w-12 h-12" />,
      title: t('stockAtSite'),
      description: t('stockAtSiteDesc'),
    },
    {
      id: 'partner-brands',
      icon: <Building2 className="w-12 h-12" />,
      title: t('partnerBrands'),
      description: t('partnerBrandsDesc'),
    },
    {
      id: 'cross-reference',
      icon: <Link2 className="w-12 h-12" />,
      title: t('crossReference'),
      description: t('crossReferenceDesc'),
    },
    {
      id: 'failure-analysis',
      icon: <AlertTriangle className="w-12 h-12" />,
      title: t('failureAnalysis'),
    },
    {
      id: 'interchange-catalog',
      icon: <Database className="w-12 h-12" />,
      title: t('interchangeCatalog'),
      description: t('interchangeCatalogDesc'),
      comingSoon: true,
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Header Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-[#1e3a5f] mb-6">
            {t('title')}
          </h1>
          <p className="text-lg text-gray-600">
            {t('description')}
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div
                key={service.id}
                className="group relative h-full"
              >
                <div
                  className={`
                    h-full rounded-lg border-2 border-gray-200 p-8
                    transition-all duration-300 ease-out
                    ${service.description
                      ? 'hover:border-[#c8a951] hover:shadow-lg hover:bg-gradient-to-br hover:from-[#1e3a5f]/5 hover:to-[#c8a951]/5'
                      : 'hover:border-[#1e3a5f] hover:shadow-lg hover:bg-gray-50'
                    }
                    ${service.comingSoon ? 'opacity-75' : ''}
                  `}
                >
                  {/* Icon */}
                  <div className="flex justify-center mb-6">
                    <div
                      className={`
                        p-4 rounded-lg
                        ${service.description
                          ? 'bg-gradient-to-br from-[#1e3a5f]/10 to-[#c8a951]/10 group-hover:from-[#1e3a5f]/20 group-hover:to-[#c8a951]/20'
                          : 'bg-[#1e3a5f]/10 group-hover:bg-[#1e3a5f]/20'
                        }
                        transition-all duration-300
                      `}
                    >
                      <div
                        className={`
                          transition-colors duration-300
                          ${service.description
                            ? 'text-[#1e3a5f] group-hover:text-[#c8a951]'
                            : 'text-[#1e3a5f]'
                          }
                        `}
                      >
                        {service.icon}
                      </div>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-semibold text-[#1e3a5f] mb-4 text-center">
                    {service.title}
                  </h3>

                  {/* Description - Only visible on hover if it exists */}
                  {service.description && (
                    <div className="overflow-hidden">
                      <p
                        className={`
                          text-gray-600 text-sm leading-relaxed
                          transition-all duration-300 ease-out
                          max-h-0 group-hover:max-h-40
                          opacity-0 group-hover:opacity-100
                          text-center
                        `}
                      >
                        {service.description}
                      </p>
                    </div>
                  )}

                  {/* Coming Soon Badge */}
                  {service.comingSoon && (
                    <div className="absolute top-4 right-4">
                      <div className="flex items-center gap-1 bg-[#c8a951]/20 text-[#1e3a5f] px-3 py-1 rounded-full text-xs font-semibold">
                        <Clock className="w-3 h-3" />
                        {t('comingSoon')}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#1e3a5f]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            {t('ctaTitle')}
          </h2>
          <p className="text-lg text-gray-200 mb-8">
            {t('ctaDescription')}
          </p>
          <button
            className={`
              px-8 py-3 rounded-lg font-semibold
              bg-[#c8a951] text-[#1e3a5f]
              hover:bg-[#b89a3f] transition-colors duration-300
            `}
          >
            {t('ctaButton')}
          </button>
        </div>
      </section>
    </main>
  );
}
