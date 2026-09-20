import React, { useState } from 'react';
import { Language, VisaRequestData, CustomerOrder } from '../types';
import { translations } from '../lib/localization';
import { submitCustomerServiceRequest } from '../lib/api';
import { compressDocumentImage } from '../lib/imageCompressor';
import {
  FileCheck,
  Calendar,
  Globe,
  Send,
  ShieldCheck,
  CheckCircle2,
  FileText,
} from 'lucide-react';

interface VisaServicesViewProps {
  currentLanguage: Language;
  onRequestSubmitted: (order: CustomerOrder) => void;
}

export const VisaServicesView: React.FC<VisaServicesViewProps> = ({
  currentLanguage,
  onRequestSubmitted,
}) => {
  const t = translations[currentLanguage];

  const [formData, setFormData] = useState<VisaRequestData>({
    fullName: '',
    phone: '',
    email: '',
    destinationCountry: '',
    visaType: 'Tourist Visa',
    intendedTravelDate: '',
    nationality: 'Somali',
    passportAvailability: 'valid',
    additionalInfo: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!formData.fullName || !formData.phone || !formData.destinationCountry || !formData.intendedTravelDate) {
      setErrorMessage('Fadlan buuxi dhammaan meelaha muhiimka ah (ee xiddigtu ku taal *).');
      return;
    }

    if (!formData.passportNumber) {
      setErrorMessage('Fadlan geli lambarka baasaboorkaaga (Waa muhiim/qasab).');
      return;
    }

    if (!formData.documentImageData) {
      setErrorMessage('Fadlan soo lifaaq sawirka baasaboorkaaga (Waa muhiim/qasab).');
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await submitCustomerServiceRequest({
        serviceType: 'visa',
        serviceName: 'Visa Service',
        customerName: formData.fullName,
        phone: formData.phone,
        email: formData.email,
        details: {
          destinationCountry: formData.destinationCountry,
          visaType: formData.visaType,
          intendedTravelDate: formData.intendedTravelDate,
          nationality: formData.nationality,
          passportAvailability: formData.passportAvailability,
          additionalInfo: formData.additionalInfo,
          documentType: 'Passport',
          documentNumber: formData.passportNumber,
          documentExpiry: formData.passportExpiry || 'Not specified',
          documentNationality: formData.nationality,
          documentImageName: formData.documentImageName,
          documentImageData: formData.documentImageData,
        },
      });

      if (res.success) {
        onRequestSubmitted(res.order);
      }
    } catch {
      setErrorMessage('An unexpected error occurred. Please verify your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header with Professional Visa Imagery */}
      <div className="relative rounded-3xl overflow-hidden border border-[#D4AF37]/30 bg-[#121212] mb-12 shadow-2xl">
        <div className="h-64 sm:h-80 w-full relative">
          <img
            src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1800&q=85"
            alt="Travel passport stamps and documentation"
            className="w-full h-full object-cover filter brightness-[0.4]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-[#121212]/60 to-transparent"></div>

          <div className="absolute bottom-6 left-6 right-6 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-xs text-amber-300 font-semibold mb-3">
              <FileCheck className="w-3.5 h-3.5" />
              <span>Embassy & Consular Documentation Support</span>
            </div>
            <h1
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              Visa Application Assistance
            </h1>
            <p className="text-xs sm:text-sm text-neutral-300 mt-2 max-w-2xl leading-relaxed">
              Balcad Travel Agency provides professional guidance for tourist, business, student, and Umrah visas across key international destinations including UAE, Turkey, Saudi Arabia, Malaysia, Kenya, and more.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Form Container */}
        <div className="lg:col-span-8 bg-[#141414] border border-neutral-800 rounded-3xl p-6 sm:p-8 shadow-xl">
          <div className="border-b border-neutral-800 pb-5 mb-6">
            <h2
              className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              <span>Visa Service Request</span>
            </h2>
            <p className="text-xs text-neutral-400 mt-1">
              Submit your visa request. No fees are paid online; our visa consultants will review your document eligibility and contact you.
            </p>
          </div>

          {errorMessage && (
            <div className="mb-6 p-4 rounded-xl bg-red-950/40 border border-red-800/60 text-xs text-red-200">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Customer Details */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-medium text-neutral-300 block mb-1.5">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="As written on passport"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-800 text-sm text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-neutral-300 block mb-1.5">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 612483838"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-800 text-sm text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-neutral-300 block mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="e.g. client@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-800 text-sm text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
                />
              </div>
            </div>

            {/* Destination & Visa Type */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-neutral-300 block mb-1.5">
                  Destination Country *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. United Arab Emirates (Dubai), Turkey, Saudi Arabia"
                  value={formData.destinationCountry}
                  onChange={(e) => setFormData({ ...formData, destinationCountry: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-800 text-sm text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-neutral-300 block mb-1.5">
                  Visa Type
                </label>
                <select
                  value={formData.visaType}
                  onChange={(e) => setFormData({ ...formData, visaType: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-800 text-sm text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
                >
                  <option value="Tourist Visa (Short Stay)">Tourist Visa (Short Stay)</option>
                  <option value="Tourist Visa (Long Stay)">Tourist Visa (Long Stay)</option>
                  <option value="Business / Commercial Visa">Business / Commercial Visa</option>
                  <option value="Umrah / Religious Visa">Umrah / Religious Visa</option>
                  <option value="Transit Visa">Transit Visa</option>
                  <option value="Medical / Student Visa">Medical / Student Visa</option>
                </select>
              </div>
            </div>

            {/* Travel Date & Nationality */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-neutral-300 block mb-1.5">
                  Intended Travel Date *
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="date"
                    required
                    value={formData.intendedTravelDate}
                    onChange={(e) => setFormData({ ...formData, intendedTravelDate: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-neutral-900 border border-neutral-800 text-sm text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-neutral-300 block mb-1.5">
                  Nationality / Passport Country
                </label>
                <div className="relative">
                  <Globe className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={formData.nationality}
                    onChange={(e) => setFormData({ ...formData, nationality: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-neutral-900 border border-neutral-800 text-sm text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* REQUIRED PASSPORT / DOCUMENT SECTION & PHOTO UPLOAD */}
            <div className="p-5 rounded-2xl bg-neutral-900/90 border border-neutral-800 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#D4AF37]" />
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
                    Passport Information & Scan (Required / Muhiim ah) *
                  </h3>
                </div>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-amber-500/20 text-[#F9D976] border border-amber-500/30">
                  Required
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-neutral-300 block mb-1.5">
                    Passport / Travel Doc Number *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. P01234567"
                    value={formData.passportNumber || ''}
                    onChange={(e) => setFormData({ ...formData, passportNumber: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-800 text-sm text-white focus:outline-none focus:border-[#D4AF37] transition-colors uppercase font-mono"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-neutral-300 block mb-1.5">
                    Passport Expiry Date
                  </label>
                  <input
                    type="date"
                    value={formData.passportExpiry || ''}
                    onChange={(e) => setFormData({ ...formData, passportExpiry: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-800 text-sm text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
                  />
                </div>
              </div>

              {/* Upload Box */}
              <div>
                <label className="text-xs font-medium text-neutral-300 block mb-1.5">
                  Passport Data Page Photo (Sawirka Baasaboorka) *
                </label>
                <input
                  type="file"
                  id="visa-passport-upload"
                  accept="image/jpeg,image/png,image/webp,image/jpg"
                  className="hidden"
                  onChange={async (e) => {
                    if (e.target.files && e.target.files[0]) {
                      const file = e.target.files[0];
                      if (!file.type.startsWith('image/')) {
                        setErrorMessage('Fadlan soo geli sawir sax ah oo baasaboorkaaga ah.');
                        return;
                      }
                      setErrorMessage(null);
                      try {
                        const compressed = await compressDocumentImage(file, 1280, 1280, 0.75);
                        setFormData({
                          ...formData,
                          documentImageData: compressed.dataUrl,
                          documentImageName: compressed.fileName,
                        });
                      } catch {
                        const reader = new FileReader();
                        reader.onload = () => {
                          if (typeof reader.result === 'string') {
                            setFormData({
                              ...formData,
                              documentImageData: reader.result,
                              documentImageName: file.name,
                            });
                          }
                        };
                        reader.readAsDataURL(file);
                      }
                    }
                  }}
                />

                {!formData.documentImageData ? (
                  <label
                    htmlFor="visa-passport-upload"
                    className="border-2 border-dashed border-neutral-700 hover:border-[#D4AF37] rounded-2xl p-5 text-center cursor-pointer block bg-neutral-950/60 transition-all"
                  >
                    <div className="w-10 h-10 rounded-full bg-neutral-800/80 mx-auto flex items-center justify-center text-[#D4AF37] mb-2">
                      <FileText className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-semibold text-white block">
                      Guji si aad u soo geliso sawirka baasaboorkaaga
                    </span>
                    <span className="text-[11px] text-neutral-400 mt-0.5 block">
                      Waa qasab si fiisada laguugu codsado (JPG ama PNG)
                    </span>
                  </label>
                ) : (
                  <div className="p-3.5 rounded-xl bg-black border border-[#D4AF37]/50 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg overflow-hidden border border-neutral-700 flex-shrink-0">
                        <img
                          src={formData.documentImageData}
                          alt="Passport Preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-white block truncate max-w-[200px]">
                          {formData.documentImageName || 'Passport_Scan.jpg'}
                        </span>
                        <span className="text-[11px] text-emerald-400">Sawirka waa diyaar</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        setFormData({
                          ...formData,
                          documentImageData: undefined,
                          documentImageName: undefined,
                        })
                      }
                      className="text-xs text-red-400 hover:text-red-300 font-medium px-2 py-1"
                    >
                      Ka saar
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Passport Availability */}
            <div>
              <label className="text-xs font-semibold text-neutral-300 uppercase tracking-wider block mb-2">
                Passport Status
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { value: 'valid', label: 'Valid Passport (6+ months)' },
                  { value: 'in-progress', label: 'Passport In Progress' },
                  { value: 'needs-renewal', label: 'Passport Needs Renewal' },
                ].map((item) => (
                  <button
                    type="button"
                    key={item.value}
                    onClick={() =>
                      setFormData({
                        ...formData,
                        passportAvailability: item.value as VisaRequestData['passportAvailability'],
                      })
                    }
                    className={`py-2.5 px-3 rounded-xl text-xs font-medium transition-all text-center cursor-pointer ${
                      formData.passportAvailability === item.value
                        ? 'bg-[#D4AF37] text-black font-bold shadow-md'
                        : 'bg-neutral-900 border border-neutral-800 text-neutral-300 hover:border-neutral-700'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Additional Information */}
            <div>
              <label className="text-xs font-medium text-neutral-300 block mb-1.5">
                Additional Information or Special Circumstances
              </label>
              <textarea
                rows={3}
                placeholder="Mention any family members traveling together, previous visas, or urgent timeline requirements..."
                value={formData.additionalInfo}
                onChange={(e) => setFormData({ ...formData, additionalInfo: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-800 text-sm text-white focus:outline-none focus:border-[#D4AF37] transition-colors resize-none"
              ></textarea>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-xl font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all shadow-xl disabled:opacity-50"
                style={{
                  background: 'linear-gradient(135deg, #F9D976 0%, #E5BE4A 50%, #B8861B 100%)',
                  color: '#080808',
                }}
              >
                {isSubmitting ? (
                  <span>Submitting Visa Request...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Submit Visa Request</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Sidebar Info */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-[#141414] border border-neutral-800 rounded-3xl p-6">
            <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2 text-[#D4AF37]">
              <ShieldCheck className="w-4 h-4" />
              <span>Visa Support Guarantee</span>
            </h3>
            <ul className="space-y-3.5 text-xs text-neutral-300">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Document Pre-Screening:</strong> We review photo specifications and passport validity before submission.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Official Channels:</strong> Direct handling with accredited consular and visa portals.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Status Updates:</strong> Receive direct SMS/WhatsApp notifications as your application progresses.
                </span>
              </li>
            </ul>
          </div>

          <div className="bg-[#101010] border border-amber-500/25 rounded-3xl p-6">
            <span className="text-[11px] font-semibold text-amber-300 uppercase tracking-wider block mb-2">
              No Online Payment
            </span>
            <p className="text-xs text-neutral-300 leading-relaxed">
              Visa processing fees are not paid online. All requests receive personalized document consultation prior to any formal arrangements.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
