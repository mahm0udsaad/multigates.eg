'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Send, CheckCircle } from 'lucide-react';
import { PageHero, HERO_IMAGES } from "@/components/layout/PageHero";

interface FormData {
  fullName: string;
  address: string;
  postalCode: string;
  city: string;
  country: string;
  nationality: string;
  landPhone: string;
  cellPhone: string;
  email: string;
  currentJob: string;
  currentSalary: string;
  certificates: string;
  educationQualification: string;
  dateOfBirth: string;
  graduationYear: string;
  yearsOfExperience: string;
  expectedSalary: string;
}

export default function CareersPage() {
  const t = useTranslations('careers');
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    address: '',
    postalCode: '',
    city: '',
    country: '',
    nationality: '',
    landPhone: '',
    cellPhone: '',
    email: '',
    currentJob: '',
    currentSalary: '',
    certificates: '',
    educationQualification: '',
    dateOfBirth: '',
    graduationYear: '',
    yearsOfExperience: '',
    expectedSalary: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validate required fields
    if (
      !formData.fullName ||
      !formData.address ||
      !formData.country ||
      !formData.cellPhone ||
      !formData.email ||
      !formData.educationQualification ||
      !formData.yearsOfExperience
    ) {
      alert(t('requiredFieldsError'));
      return;
    }
    setSubmitted(true);
    // Reset form after 3 seconds
    setTimeout(() => {
      setFormData({
        fullName: '',
        address: '',
        postalCode: '',
        city: '',
        country: '',
        nationality: '',
        landPhone: '',
        cellPhone: '',
        email: '',
        currentJob: '',
        currentSalary: '',
        certificates: '',
        educationQualification: '',
        dateOfBirth: '',
        graduationYear: '',
        yearsOfExperience: '',
        expectedSalary: '',
      });
      setSubmitted(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHero
        eyebrow="Join Us"
        title={t("title")}
        subtitle={t("subtitle")}
        imageSrc={HERO_IMAGES.careers}
        imageAlt="Join Us"
      />

      {/* Form Section */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        {submitted ? (
          <div className="bg-white rounded-lg shadow-lg p-12 text-center">
            <CheckCircle className="w-16 h-16 mx-auto mb-4" style={{ color: '#c8a951' }} />
            <h2 className="text-3xl font-bold mb-2 text-gray-800">{t('successTitle')}</h2>
            <p className="text-gray-600 text-lg">{t('successMessage')}</p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-lg shadow-lg p-8"
          >
            {/* Personal Information Section */}
            <div className="mb-8">
              <h2
                className="text-2xl font-bold mb-6 pb-3 border-b-2"
                style={{ color: '#1e3a5f', borderColor: '#c8a951' }}
              >
                {t('personalInfoTitle')}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {t('fullName')} *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={t('fullNamePlaceholder')}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {t('dateOfBirth')}
                  </label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {t('address')} *
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={t('addressPlaceholder')}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {t('postalCode')}
                  </label>
                  <input
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={t('postalCodePlaceholder')}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {t('city')}
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={t('cityPlaceholder')}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {t('country')} *
                  </label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={t('countryPlaceholder')}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {t('nationality')}
                  </label>
                  <input
                    type="text"
                    name="nationality"
                    value={formData.nationality}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={t('nationalityPlaceholder')}
                  />
                </div>
              </div>
            </div>

            {/* Contact Information Section */}
            <div className="mb-8">
              <h2
                className="text-2xl font-bold mb-6 pb-3 border-b-2"
                style={{ color: '#1e3a5f', borderColor: '#c8a951' }}
              >
                {t('contactInfoTitle')}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {t('landPhone')}
                  </label>
                  <input
                    type="tel"
                    name="landPhone"
                    value={formData.landPhone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={t('landPhonePlaceholder')}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {t('cellPhone')} *
                  </label>
                  <input
                    type="tel"
                    name="cellPhone"
                    value={formData.cellPhone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={t('cellPhonePlaceholder')}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {t('email')} *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={t('emailPlaceholder')}
                  />
                </div>
              </div>
            </div>

            {/* Education Section */}
            <div className="mb-8">
              <h2
                className="text-2xl font-bold mb-6 pb-3 border-b-2"
                style={{ color: '#1e3a5f', borderColor: '#c8a951' }}
              >
                {t('educationTitle')}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {t('educationQualification')} *
                  </label>
                  <input
                    type="text"
                    name="educationQualification"
                    value={formData.educationQualification}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={t('educationQualificationPlaceholder')}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {t('graduationYear')}
                  </label>
                  <input
                    type="number"
                    name="graduationYear"
                    value={formData.graduationYear}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={t('graduationYearPlaceholder')}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {t('certificates')}
                  </label>
                  <textarea
                    name="certificates"
                    value={formData.certificates}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={t('certificatesPlaceholder')}
                  />
                </div>
              </div>
            </div>

            {/* Employment Section */}
            <div className="mb-8">
              <h2
                className="text-2xl font-bold mb-6 pb-3 border-b-2"
                style={{ color: '#1e3a5f', borderColor: '#c8a951' }}
              >
                {t('employmentTitle')}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {t('yearsOfExperience')} *
                  </label>
                  <input
                    type="number"
                    name="yearsOfExperience"
                    value={formData.yearsOfExperience}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={t('yearsOfExperiencePlaceholder')}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {t('currentJob')}
                  </label>
                  <input
                    type="text"
                    name="currentJob"
                    value={formData.currentJob}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={t('currentJobPlaceholder')}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {t('currentSalary')}
                  </label>
                  <input
                    type="text"
                    name="currentSalary"
                    value={formData.currentSalary}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={t('currentSalaryPlaceholder')}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {t('expectedSalary')}
                  </label>
                  <input
                    type="text"
                    name="expectedSalary"
                    value={formData.expectedSalary}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={t('expectedSalaryPlaceholder')}
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 px-6 py-3 text-white font-bold rounded-lg hover:opacity-90 transition-opacity"
              style={{ backgroundColor: '#1e3a5f' }}
            >
              <Send className="w-5 h-5" />
              {t('submitButton')}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
