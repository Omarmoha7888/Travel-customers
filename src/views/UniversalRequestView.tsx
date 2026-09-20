import React, { useState, useEffect, useRef } from 'react';
import { Language, CustomerOrder } from '../types';
import { translations } from '../lib/localization';
import { submitCustomerServiceRequest } from '../lib/api';
import { SERVICES_DATA } from '../lib/data';
import { compressDocumentImage } from '../lib/imageCompressor';
import {
  Send,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Users,
  MapPin,
  Sparkles,
  FileText,
  Upload,
  Image as ImageIcon,
  X,
  AlertCircle,
} from 'lucide-react';

interface UniversalRequestViewProps {
  currentLanguage: Language;
  initialServiceId?: string;
  initialDetails?: string;
  onRequestSubmitted: (order: CustomerOrder) => void;
}

export const UniversalRequestView: React.FC<UniversalRequestViewProps> = ({
  currentLanguage,
  initialServiceId,
  initialDetails,
  onRequestSubmitted,
}) => {
  const t = translations[currentLanguage];

  const [serviceType, setServiceType] = useState<string>(initialServiceId || 'flight');
  const [fullName, setFullName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [destination, setDestination] = useState<string>('');
  const [travelDate, setTravelDate] = useState<string>('');
  const [travelers, setTravelers] = useState<number>(1);
  const [additionalDetails, setAdditionalDetails] = useState<string>(initialDetails || '');

  // Required Document Information & Upload
  const [documentType, setDocumentType] = useState<string>('Passport');
  const [documentNumber, setDocumentNumber] = useState<string>('');
  const [documentNationality, setDocumentNationality] = useState<string>('Somali');
  const [documentExpiry, setDocumentExpiry] = useState<string>('');
  const [documentImageName, setDocumentImageName] = useState<string>('');
  const [documentImageData, setDocumentImageData] = useState<string>('');
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (initialServiceId) {
      setServiceType(initialServiceId);
    }
    if (initialDetails) {
      setAdditionalDetails(initialDetails);
    }
  }, [initialServiceId, initialDetails]);

  const serviceOptions = [
    { id: 'flight', label: 'Flight Ticket Booking' },
    { id: 'visa', label: 'Visa Application Service' },
    { id: 'hotel', label: 'Hotel & Resort Booking' },
    { id: 'umrah-hajj', label: 'Umrah & Hajj Pilgrimage' },
    { id: 'tour', label: 'Holiday & Tour Package' },
    { id: 'transfer', label: 'Airport Transfer / Chauffeur' },
    { id: 'custom-package', label: 'Custom Travel Package' },
    { id: 'doc-assistance', label: 'Travel Document Assistance' },
    { id: 'other', label: 'Other Travel Services' },
  ];

  const selectedServiceObj = serviceOptions.find((s) => s.id === serviceType) || serviceOptions[0];

  const handleProcessFile = async (file: File) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setErrorMessage('Fadlan soo geli sawir sax ah (JPG, PNG, WebP) oo dukumeentigaaga ah.');
      return;
    }
    if (file.size > 15 * 1024 * 1024) {
      setErrorMessage('Cabbirka sawirku waa inuu ka yaraadaa 15MB.');
      return;
    }

    setErrorMessage(null);

    try {
      // Compress and optimize image to ensure clean transmission without payload size errors
      const compressed = await compressDocumentImage(file, 1280, 1280, 0.75);
      setDocumentImageName(compressed.fileName);
      setDocumentImageData(compressed.dataUrl);
    } catch {
      // Fallback to standard FileReader if canvas processing fails
      setDocumentImageName(file.name);
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setDocumentImageData(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleProcessFile(e.dataTransfer.files[0]);
    }
  };

  const handleRemoveImage = () => {
    setDocumentImageData('');
    setDocumentImageName('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!fullName || !phone) {
      setErrorMessage('Fadlan geli magacaaga oo buuxa iyo taleefankaaga la xiriirka.');
      return;
    }

    if (!documentNumber) {
      setErrorMessage('Fadlan geli lambarka Baasaboorkaaga (Passport Number) - waa qasab.');
      return;
    }

    if (!documentImageData) {
      setErrorMessage('Fadlan soo lifaaq sawirka cad ee Baasaboorkaaga (Bogga 1-aad) - waa qasab.');
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await submitCustomerServiceRequest({
        serviceType,
        serviceName: selectedServiceObj.label,
        customerName: fullName,
        phone,
        email,
        details: {
          destinationSummary: destination || 'Unspecified destination',
          travelDate: travelDate || 'Flexible / To be discussed',
          travelers,
          additionalDetails,
          documentType,
          documentNumber,
          documentNationality,
          documentExpiry: documentExpiry || 'Not specified',
          documentImageName,
          documentImageData,
        },
      });

      if (res.success) {
        onRequestSubmitted(res.order);
      }
    } catch {
      setErrorMessage('Waxaa dhacay cilad xilliga gudbinta. Fadlan dib u hubi khadkaaga internet-ka.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full py-10 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#D4AF37] block mb-2">
          Customer Inquiry Desk
        </span>
        <h1
          className="text-3xl sm:text-4xl font-extrabold text-white"
          style={{ fontFamily: "'Cinzel', serif" }}
        >
          {t.request_service_title}
        </h1>
        <p className="text-xs sm:text-sm text-neutral-300 mt-2 leading-relaxed">
          {t.request_service_subtitle}
        </p>
      </div>

      <div className="bg-[#141414] border border-neutral-800 rounded-3xl p-6 sm:p-10 shadow-2xl">
        {errorMessage && (
          <div className="mb-6 p-4 rounded-xl bg-red-950/40 border border-red-800/60 text-xs text-red-200">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Service Selection Buttons */}
          <div>
            <label className="text-xs font-semibold text-neutral-300 uppercase tracking-wider block mb-2.5">
              Select Service Required *
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {serviceOptions.map((opt) => (
                <button
                  type="button"
                  key={opt.id}
                  onClick={() => setServiceType(opt.id)}
                  className={`py-3 px-3 rounded-xl text-xs font-semibold transition-all text-left flex items-center justify-between cursor-pointer ${
                    serviceType === opt.id
                      ? 'bg-[#D4AF37] text-black font-bold shadow-md shadow-amber-950/30'
                      : 'bg-neutral-900 border border-neutral-800 text-neutral-300 hover:border-neutral-700'
                  }`}
                >
                  <span className="line-clamp-1">{opt.label}</span>
                  {serviceType === opt.id && <span className="w-2 h-2 rounded-full bg-black ml-1.5 flex-shrink-0"></span>}
                </button>
              ))}
            </div>
          </div>

          {/* Contact Information */}
          <div className="pt-4 border-t border-neutral-800/80">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#D4AF37] mb-3">
              Your Contact Details
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-medium text-neutral-300 block mb-1.5">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Abdirahman Ali"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-800 text-sm text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-neutral-300 block mb-1.5">
                  Phone Number (WhatsApp) *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 612483838"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-800 text-sm text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-neutral-300 block mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="e.g. customer@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-800 text-sm text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Travel Specifications */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-medium text-neutral-300 block mb-1.5">
                Destination or Route
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="e.g. Mogadishu to Istanbul"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-neutral-900 border border-neutral-800 text-sm text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-neutral-300 block mb-1.5">
                Preferred Travel Date
              </label>
              <div className="relative">
                <Calendar className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="date"
                  value={travelDate}
                  onChange={(e) => setTravelDate(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-neutral-900 border border-neutral-800 text-sm text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-neutral-300 block mb-1.5">
                Number of Travelers
              </label>
              <div className="relative">
                <Users className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={travelers}
                  onChange={(e) => setTravelers(parseInt(e.target.value, 10) || 1)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-neutral-900 border border-neutral-800 text-sm text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
                />
              </div>
            </div>
          </div>

          {/* REQUIRED PASSPORT DETAILS & PHOTO UPLOAD SECTION */}
          <div className="pt-6 border-t border-neutral-800/80">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#D4AF37]" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
                  Passport Verification & Photo (Baasaboor Kaliya / Required) *
                </h3>
              </div>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                Passport Only
              </span>
            </div>
            <p className="text-xs text-neutral-400 mb-4">
              Dukumeentiga kaliya ee rasmiga ah ee la aqbalayo waa <strong className="text-white">Baasaboor (Passport)</strong>. Fadlan geli lambarka saxda ah ee baasaboorkaaga isla markaana soo lifaaq sawir cad oo bogga 1-aad ah.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="text-xs font-medium text-neutral-300 block mb-1.5">
                  Document Required *
                </label>
                <div className="w-full px-4 py-3 rounded-xl bg-neutral-900/90 border border-[#D4AF37]/50 text-sm text-[#F9D976] font-semibold flex items-center justify-between">
                  <span>Passport (Baasaboor)</span>
                  <span className="text-[10px] font-bold bg-[#D4AF37]/20 text-[#D4AF37] px-2 py-0.5 rounded uppercase">
                    Required
                  </span>
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-neutral-300 block mb-1.5">
                  Passport Number (Lambarka Baasaboorka) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. P01234567"
                  value={documentNumber}
                  onChange={(e) => setDocumentNumber(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-800 text-sm text-white focus:outline-none focus:border-[#D4AF37] transition-colors uppercase font-mono"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-neutral-300 block mb-1.5">
                  Passport Country / Nationality (Dalka) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Somali"
                  value={documentNationality}
                  onChange={(e) => setDocumentNationality(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-800 text-sm text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="text-xs font-medium text-neutral-300 block mb-1.5">
                Passport Expiry Date (Taariikhda uu Dhacayo Baasaboorku)
              </label>
              <div className="relative max-w-sm">
                <Calendar className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="date"
                  value={documentExpiry}
                  onChange={(e) => setDocumentExpiry(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-neutral-900 border border-neutral-800 text-sm text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
                />
              </div>
            </div>

            {/* Document Photo Upload Box */}
            <div>
              <label className="text-xs font-medium text-neutral-300 block mb-1.5">
                Upload Passport Photo / Scan (Sawirka Bogga 1-aad ee Baasaboorka) *
              </label>

              <input
                type="file"
                ref={fileInputRef}
                accept="image/jpeg,image/png,image/webp,image/jpg"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    handleProcessFile(e.target.files[0]);
                  }
                }}
              />

              {!documentImageData ? (
                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragging(true);
                  }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-2xl p-6 sm:p-8 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-3 ${
                    isDragging
                      ? 'border-[#D4AF37] bg-[#D4AF37]/10'
                      : 'border-neutral-700 hover:border-[#D4AF37]/70 bg-neutral-900/60'
                  }`}
                >
                  <div className="w-12 h-12 rounded-full bg-neutral-800/80 border border-neutral-700 flex items-center justify-center text-[#D4AF37]">
                    <Upload className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-white block">
                      Guji halkan ama soo jiid sawirka Baasaboorkaaga (Bogga 1-aad)
                    </span>
                    <span className="text-xs text-neutral-400 mt-1 block">
                      Taageeraya JPG, PNG, WebP (Ilaa 5MB) • Sawirka waa inuu ahaadaa mid cad oo la akhrin karo
                    </span>
                  </div>
                  <button
                    type="button"
                    className="px-4 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 text-xs font-semibold text-[#D4AF37] transition-colors"
                  >
                    Dooro Sawirka Baasaboorka
                  </button>
                </div>
              ) : (
                <div className="p-4 rounded-2xl bg-neutral-900 border border-[#D4AF37]/40 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-4 w-full sm:w-auto">
                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-black border border-neutral-700 flex-shrink-0 relative">
                      <img
                        src={documentImageData}
                        alt="Document Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="overflow-hidden">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                        <span className="text-xs font-bold text-white truncate block">
                          {documentImageName || 'Dukumeenti_Sawir.jpg'}
                        </span>
                      </div>
                      <span className="text-[11px] text-[#D4AF37] block mt-0.5">
                        Sawirka si guul leh ayaa loo lifaaqay (Diyaar u ah gudbin)
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-xs font-semibold text-neutral-300 transition-colors cursor-pointer"
                    >
                      Beddel Sawirka
                    </button>
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="p-2 rounded-lg bg-red-950/40 hover:bg-red-900/60 text-red-300 border border-red-800/40 transition-colors cursor-pointer"
                      title="Ka saar sawirka"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Additional Information */}
          <div>
            <label className="text-xs font-medium text-neutral-300 block mb-1.5">
              Additional Information or Specific Instructions
            </label>
            <textarea
              rows={4}
              placeholder="Provide any extra details: hotel stars, preferred airline, luggage needs, special visa requirements..."
              value={additionalDetails}
              onChange={(e) => setAdditionalDetails(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-800 text-sm text-white focus:outline-none focus:border-[#D4AF37] transition-colors resize-none"
            ></textarea>
          </div>

          <div className="p-4 rounded-xl bg-neutral-900/80 border border-neutral-800 text-xs text-neutral-400 flex items-start gap-3">
            <ShieldCheck className="w-4 h-4 text-[#D4AF37] flex-shrink-0 mt-0.5" />
            <span>
              By clicking "Submit Request", your inquiry will be assigned a unique tracking reference and dispatched directly to <strong className="text-white">balcadtravel@gmail.com</strong>. A consultant will contact you via phone or WhatsApp. No payment is required at this stage.
            </span>
          </div>

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
              <span>Submitting Your Request...</span>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Submit Request</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
