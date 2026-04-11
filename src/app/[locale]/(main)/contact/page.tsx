'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { MapPin, Phone, Building, CheckCircle2 } from 'lucide-react';

interface FormData {
  salutation: string;
  fullName: string;
  phoneNumber: string;
  fax: string;
  email: string;
  website: string;
  companyName: string;
  country: string;
  city: string;
  address: string;
  postalCode: string;
  industrialSector: string;
  preferredLanguage: string;
  subject: string;
  hearAboutUs: string;
  message: string;
  honeypot: string;
  isNotRobot: boolean;
}

const INDUSTRIAL_SECTORS = [
  'Cement',
  'Oil & Petrochemical',
  'Steel',
  'Ceramic',
  'Marble',
  'Quarrying',
  'Mining',
  'Construction',
  'Engineering & Metal',
  'Shipbuilding',
  'Foundry',
  'Automotive',
  'Textile & Garment',
  'Food',
  'Pharmaceutical',
  'Wind & Energy',
  'Agriculture',
  'Poultry Farming',
  'Aluminum',
  'Chemical',
  'Electrical & Electronics',
  'Woodworking & Furniture',
  'Machinery & Equipment',
  'Other',
];

const HEAR_ABOUT_US_OPTIONS = [
  'Google',
  'Social Media',
  'Referral',
  'Exhibition',
  'Other',
];

const COUNTRIES = [
  'Egypt',
  'United States',
  'United Kingdom',
  'Germany',
  'France',
  'Italy',
  'Spain',
  'Canada',
  'Australia',
  'Japan',
  'China',
  'India',
  'Brazil',
  'Mexico',
  'Other',
];

export default function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const t = useTranslations('contact');
  const [formData, setFormData] = useState<FormData>({
    salutation: '',
    fullName: '',
    phoneNumber: '',
    fax: '',
    email: '',
    website: '',
    companyName: '',
    country: '',
    city: '',
    address: '',
    postalCode: '',
    industrialSector: '',
    preferredLanguage: 'English',
    subject: '',
    hearAboutUs: '',
    message: '',
    honeypot: '',
    isNotRobot: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checkboxElement = e.target as HTMLInputElement;
      setFormData((prev) => ({
        ...prev,
        [name]: checkboxElement.checked,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    // Honeypot check - if filled, it's a bot
    if (formData.honeypot) {
      console.log('Bot detected via honeypot');
      return;
    }

    // Check if "I am not a robot" is checked
    if (!formData.isNotRobot) {
      setError(t('robotCheckError') || 'Please confirm you are not a robot');
      return;
    }

    // Validate required fields
    const requiredFields = [
      'fullName',
      'phoneNumber',
      'email',
      'companyName',
      'country',
      'address',
      'postalCode',
      'industrialSector',
      'hearAboutUs',
      'message',
    ];

    const missingFields = requiredFields.filter((field) => !formData[field as keyof FormData]);
    if (missingFields.length > 0) {
      setError(t('requiredFieldsError') || 'Please fill in all required fields');
      return;
    }

    // Form submission logic - would send to backend with sales@multigates-co.com
    console.log('Form submitted:', formData);
    setSubmitted(true);

    // Reset form after successful submission
    setFormData({
      salutation: '',
      fullName: '',
      phoneNumber: '',
      fax: '',
      email: '',
      website: '',
      companyName: '',
      country: '',
      city: '',
      address: '',
      postalCode: '',
      industrialSector: '',
      preferredLanguage: 'English',
      subject: '',
      hearAboutUs: '',
      message: '',
      honeypot: '',
      isNotRobot: false,
    });

    // Reset success message after 5 seconds
    setTimeout(() => setSubmitted(false), 5000);
  };

  const locations = [
    {
      title: t('headOffice') || 'Head Office',
      address: '31 B Champollion, Qasr an Nile, Cairo, Egypt',
      icon: Building,
    },
    {
      title: t('store') || 'Store',
      address: '7 Muhammed Helmy Ibrahim Street, Champollion Street, Qasr an Nile, Cairo, Egypt',
      icon: MapPin,
    },
  ];

  const phones = [
    { type: t('landPhone') || 'Land Phone', numbers: ['+2 02 27731690', '+2 02 25748200'] },
    { type: t('cellPhone') || 'Cell Phone', numbers: ['+2 010 68847541', '+2 010 68847540'] },
  ];

  return (
    <main className="min-h-screen bg-white">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-[#1e3a5f] to-[#2d5a8c] py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {t('title')}
          </h1>
          <p className="text-lg text-gray-200 max-w-2xl">
            {t('description')}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column - Contact Form */}
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-bold text-[#1e3a5f] mb-8">
              {t('formTitle')}
            </h2>

            {submitted && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-green-800 font-medium">
                    {t('successMessage')}
                  </p>
                  <p className="text-green-700 text-sm mt-1">
                    {t('successDescription')}
                  </p>
                </div>
              </div>
            )}

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-800 font-medium">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Row 1: Salutation and Full Name */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div className="sm:col-span-1">
                  <label
                    htmlFor="salutation"
                    className="block text-sm font-medium text-[#1e3a5f] mb-2"
                  >
                    {t('salutation')}
                  </label>
                  <select
                    id="salutation"
                    name="salutation"
                    value={formData.salutation}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c8a951] focus:border-transparent transition-all duration-300"
                  >
                    <option value="">Select</option>
                    <option value="Mr">Mr</option>
                    <option value="Mrs">Mrs</option>
                    <option value="Ms">Ms</option>
                    <option value="Dr">Dr</option>
                  </select>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="fullName"
                    className="block text-sm font-medium text-[#1e3a5f] mb-2"
                  >
                    {t('fullName')} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    placeholder={t('fullNamePlaceholder')}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c8a951] focus:border-transparent transition-all duration-300"
                  />
                </div>
              </div>

              {/* Row 2: Phone and Fax */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="phoneNumber"
                    className="block text-sm font-medium text-[#1e3a5f] mb-2"
                  >
                    {t('phoneNumber')} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    required
                    placeholder={t('phoneNumberPlaceholder')}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c8a951] focus:border-transparent transition-all duration-300"
                  />
                </div>

                <div>
                  <label
                    htmlFor="fax"
                    className="block text-sm font-medium text-[#1e3a5f] mb-2"
                  >
                    {t('fax')}
                  </label>
                  <input
                    type="tel"
                    id="fax"
                    name="fax"
                    value={formData.fax}
                    onChange={handleChange}
                    placeholder={t('faxPlaceholder')}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c8a951] focus:border-transparent transition-all duration-300"
                  />
                </div>
              </div>

              {/* Row 3: Email and Website */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-[#1e3a5f] mb-2"
                  >
                    {t('email')} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder={t('emailPlaceholder')}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c8a951] focus:border-transparent transition-all duration-300"
                  />
                </div>

                <div>
                  <label
                    htmlFor="website"
                    className="block text-sm font-medium text-[#1e3a5f] mb-2"
                  >
                    {t('website')}
                  </label>
                  <input
                    type="url"
                    id="website"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    placeholder={t('websitePlaceholder')}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c8a951] focus:border-transparent transition-all duration-300"
                  />
                </div>
              </div>

              {/* Row 4: Company Name and Country */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="companyName"
                    className="block text-sm font-medium text-[#1e3a5f] mb-2"
                  >
                    {t('companyName')} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="companyName"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    required
                    placeholder={t('companyNamePlaceholder')}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c8a951] focus:border-transparent transition-all duration-300"
                  />
                </div>

                <div>
                  <label
                    htmlFor="country"
                    className="block text-sm font-medium text-[#1e3a5f] mb-2"
                  >
                    {t('country')} <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c8a951] focus:border-transparent transition-all duration-300"
                  >
                    <option value="">Select Country</option>
                    {COUNTRIES.map((country) => (
                      <option key={country} value={country}>
                        {country}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Row 5: City and Address */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="city"
                    className="block text-sm font-medium text-[#1e3a5f] mb-2"
                  >
                    {t('city')}
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder={t('cityPlaceholder')}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c8a951] focus:border-transparent transition-all duration-300"
                  />
                </div>

                <div>
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium text-[#1e3a5f] mb-2"
                  >
                    {t('address')} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    placeholder={t('addressPlaceholder')}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c8a951] focus:border-transparent transition-all duration-300"
                  />
                </div>
              </div>

              {/* Row 6: Postal Code and Industrial Sector */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="postalCode"
                    className="block text-sm font-medium text-[#1e3a5f] mb-2"
                  >
                    {t('postalCode')} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="postalCode"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    required
                    placeholder={t('postalCodePlaceholder')}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c8a951] focus:border-transparent transition-all duration-300"
                  />
                </div>

                <div>
                  <label
                    htmlFor="industrialSector"
                    className="block text-sm font-medium text-[#1e3a5f] mb-2"
                  >
                    {t('industrialSector')} <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="industrialSector"
                    name="industrialSector"
                    value={formData.industrialSector}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c8a951] focus:border-transparent transition-all duration-300"
                  >
                    <option value="">Select Sector</option>
                    {INDUSTRIAL_SECTORS.map((sector) => (
                      <option key={sector} value={sector}>
                        {sector}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Row 7: Preferred Language and Subject */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="preferredLanguage"
                    className="block text-sm font-medium text-[#1e3a5f] mb-2"
                  >
                    {t('preferredLanguage')}
                  </label>
                  <select
                    id="preferredLanguage"
                    name="preferredLanguage"
                    value={formData.preferredLanguage}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c8a951] focus:border-transparent transition-all duration-300"
                  >
                    <option value="English">English</option>
                    <option value="Arabic">Arabic</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-[#1e3a5f] mb-2"
                  >
                    {t('subject')}
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder={t('subjectPlaceholder')}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c8a951] focus:border-transparent transition-all duration-300"
                  />
                </div>
              </div>

              {/* Row 8: How did you hear about us */}
              <div>
                <label
                  htmlFor="hearAboutUs"
                  className="block text-sm font-medium text-[#1e3a5f] mb-2"
                >
                  {t('hearAboutUs')} <span className="text-red-500">*</span>
                </label>
                <select
                  id="hearAboutUs"
                  name="hearAboutUs"
                  value={formData.hearAboutUs}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c8a951] focus:border-transparent transition-all duration-300"
                >
                  <option value="">Select an option</option>
                  {HEAR_ABOUT_US_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              {/* Message Field */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-[#1e3a5f] mb-2"
                >
                  {t('message')} <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder={t('messagePlaceholder')}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c8a951] focus:border-transparent transition-all duration-300 resize-none"
                />
              </div>

              {/* Honeypot Field - Hidden from users */}
              <input
                type="hidden"
                name="honeypot"
                value={formData.honeypot}
                onChange={handleChange}
                style={{ display: 'none' }}
              />

              {/* I am not a robot Checkbox */}
              <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <input
                  type="checkbox"
                  id="isNotRobot"
                  name="isNotRobot"
                  checked={formData.isNotRobot}
                  onChange={handleChange}
                  className="w-5 h-5 mt-0.5 text-[#1e3a5f] bg-white border-gray-300 rounded focus:ring-2 focus:ring-[#c8a951] cursor-pointer"
                />
                <label htmlFor="isNotRobot" className="text-sm text-gray-700 cursor-pointer">
                  {t('notRobot')} <span className="text-red-500">*</span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-[#1e3a5f] hover:bg-[#152a47] text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300"
              >
                {t('submitButton')}
              </button>

              <p className="text-xs text-gray-500 text-center">
                {t('requiredFieldsNote')}
              </p>
            </form>
          </div>

          {/* Right Column - Contact Info */}
          <div className="lg:col-span-1">
            <h2 className="text-3xl font-bold text-[#1e3a5f] mb-8">
              {t('contactInfo')}
            </h2>

            <div className="space-y-8">
              {/* Locations */}
              {locations.map((location, index) => {
                const IconComponent = location.icon;
                return (
                  <div
                    key={index}
                    className="flex gap-4 p-6 bg-gray-50 rounded-lg border border-gray-100 hover:border-[#c8a951] transition-colors duration-300"
                  >
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-[#1e3a5f]">
                        <IconComponent className="h-6 w-6 text-[#c8a951]" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-[#1e3a5f] mb-1">
                        {location.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {location.address}
                      </p>
                    </div>
                  </div>
                );
              })}

              {/* Phone Numbers */}
              {phones.map((phoneGroup, index) => (
                <div
                  key={index}
                  className="flex gap-4 p-6 bg-gray-50 rounded-lg border border-gray-100 hover:border-[#c8a951] transition-colors duration-300"
                >
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-[#1e3a5f]">
                      <Phone className="h-6 w-6 text-[#c8a951]" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#1e3a5f] mb-2">
                      {phoneGroup.type}
                    </h3>
                    <div className="space-y-1">
                      {phoneGroup.numbers.map((number, numIndex) => (
                        <a
                          key={numIndex}
                          href={`tel:${number.replace(/\s/g, '')}`}
                          className="block text-gray-600 hover:text-[#c8a951] transition-colors duration-300 text-sm"
                        >
                          {number}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              ))}

              {/* Map */}
              <div className="w-full rounded-lg overflow-hidden border border-gray-200 shadow-sm">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3454.4726179289527!2d31.234567!3d30.047564!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14583d7e3a8e8e0d%3A0x123456789!2sCairo%2C%20Egypt!5e0!3m2!1sen!2sus!4v1234567890"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
