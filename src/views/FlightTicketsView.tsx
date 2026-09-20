import React, { useState } from 'react';
import { Language, FlightRequestData, CustomerOrder } from '../types';
import { translations } from '../lib/localization';
import { submitCustomerServiceRequest } from '../lib/api';
import { compressDocumentImage } from '../lib/imageCompressor';
import {
  Plane,
  Calendar,
  Users,
  MapPin,
  Send,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Sparkles,
  FileText,
} from 'lucide-react';

interface FlightTicketsViewProps {
  currentLanguage: Language;
  onRequestSubmitted: (order: CustomerOrder) => void;
}

export const FlightTicketsView: React.FC<FlightTicketsViewProps> = ({
  currentLanguage,
  onRequestSubmitted,
}) => {
  const t = translations[currentLanguage];

  const [formData, setFormData] = useState<FlightRequestData>({
    fullName: '',
    phone: '',
    email: '',
    from: '',
    to: '',
    departureDate: '',
    returnDate: '',
    tripType: 'round-trip',
    passengers: 1,
    travelClass: 'Economy',
    additionalRequirements: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!formData.fullName || !formData.phone || !formData.from || !formData.to || !formData.departureDate) {
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
        serviceType: 'flight',
        serviceName: 'Flight Ticket',
        customerName: formData.fullName,
        phone: formData.phone,
        email: formData.email,
        details: {
          tripType: formData.tripType,
          from: formData.from,
          to: formData.to,
          departureDate: formData.departureDate,
          returnDate: formData.returnDate || 'N/A (One-way)',
          passengers: formData.passengers,
          travelClass: formData.travelClass,
          additionalRequirements: formData.additionalRequirements,
          documentType: 'Passport',
          documentNumber: formData.passportNumber,
          documentNationality: formData.documentNationality || 'Somali',
          documentExpiry: formData.passportExpiry || 'Not specified',
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
      {/* Page Header with Airplane Banner */}
      <div className="relative rounded-3xl overflow-hidden border border-[#D4AF37]/30 bg-[#121212] mb-12 shadow-2xl">
        <div className="h-64 sm:h-80 w-full relative">
          <img
            src="https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1800&q=85"
            alt="Commercial airliner in clear sky"
            className="w-full h-full object-cover filter brightness-[0.4]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-[#121212]/60 to-transparent"></div>

          <div className="absolute bottom-6 left-6 right-6 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-xs text-amber-300 font-semibold mb-3">
              <Plane className="w-3.5 h-3.5" />
              <span>International & Domestic Airline Support</span>
            </div>
            <h1
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              Flight Booking Assistance
            </h1>
            <p className="text-xs sm:text-sm text-neutral-300 mt-2 max-w-2xl leading-relaxed">
              Submit your flight route preferences. Balcad Travel Agency compares official airline schedules to secure optimal itineraries for individual and group travelers.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Col: Request Form */}
        <div className="lg:col-span-8 bg-[#141414] border border-neutral-800 rounded-3xl p-6 sm:p-8 shadow-xl">
          <div className="border-b border-neutral-800 pb-5 mb-6">
            <h2
              className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              <span>Flight Service Request</span>
            </h2>
            <p className="text-xs text-neutral-400 mt-1">
              Please enter your travel details. Pricing is not displayed online; our ticketing desk will contact you directly with confirmed schedules.
            </p>
          </div>

          {errorMessage && (
            <div className="mb-6 p-4 rounded-xl bg-red-950/40 border border-red-800/60 text-xs text-red-200">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Trip Type Selector */}
            <div>
              <label className="text-xs font-semibold text-neutral-300 uppercase tracking-wider block mb-2">
                Trip Type
              </label>
              <div className="grid grid-cols-3 gap-3">
                {(['round-trip', 'one-way', 'multi-city'] as const).map((type) => (
                  <button
                    type="button"
                    key={type}
                    onClick={() => setFormData({ ...formData, tripType: type })}
                    className={`py-2.5 px-3 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                      formData.tripType === type
                        ? 'bg-[#D4AF37] text-black font-bold shadow-md shadow-amber-950/30'
                        : 'bg-neutral-900 border border-neutral-800 text-neutral-300 hover:border-neutral-700'
                    }`}
                  >
                    {type.replace('-', ' ')}
                  </button>
                ))}
              </div>
            </div>

            {/* From and To */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-neutral-300 block mb-1.5">
                  Departure City / Airport (From) *
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Mogadishu (MGQ)"
                    value={formData.from}
                    onChange={(e) => setFormData({ ...formData, from: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-neutral-900 border border-neutral-800 text-sm text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-neutral-300 block mb-1.5">
                  Destination City / Airport (To) *
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-[#D4AF37] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dubai, Istanbul, Nairobi"
                    value={formData.to}
                    onChange={(e) => setFormData({ ...formData, to: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-neutral-900 border border-neutral-800 text-sm text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Travel Dates */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-neutral-300 block mb-1.5">
                  Departure Date *
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="date"
                    required
                    value={formData.departureDate}
                    onChange={(e) => setFormData({ ...formData, departureDate: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-neutral-900 border border-neutral-800 text-sm text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
                  />
                </div>
              </div>

              {formData.tripType === 'round-trip' && (
                <div>
                  <label className="text-xs font-medium text-neutral-300 block mb-1.5">
                    Return Date (Optional)
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="date"
                      value={formData.returnDate}
                      onChange={(e) => setFormData({ ...formData, returnDate: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-neutral-900 border border-neutral-800 text-sm text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Passengers & Travel Class */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-neutral-300 block mb-1.5">
                  Number of Passengers *
                </label>
                <div className="relative">
                  <Users className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="number"
                    min="1"
                    max="50"
                    required
                    value={formData.passengers}
                    onChange={(e) =>
                      setFormData({ ...formData, passengers: parseInt(e.target.value, 10) || 1 })
                    }
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-neutral-900 border border-neutral-800 text-sm text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-neutral-300 block mb-1.5">
                  Travel Class
                </label>
                <select
                  value={formData.travelClass}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      travelClass: e.target.value as FlightRequestData['travelClass'],
                    })
                  }
                  className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-800 text-sm text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
                >
                  <option value="Economy">Economy</option>
                  <option value="Premium Economy">Premium Economy</option>
                  <option value="Business">Business Class</option>
                  <option value="First Class">First Class</option>
                </select>
              </div>
            </div>

            {/* Customer Contact Details */}
            <div className="pt-4 border-t border-neutral-800/80">
              <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-wider text-[#D4AF37]">
                Customer Information
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-medium text-neutral-300 block mb-1.5">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Mohamed Hassan"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
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
            </div>

            {/* Document Information & Photo Upload Section (Required) */}
            <div className="pt-6 border-t border-neutral-800">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#D4AF37]" />
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
                    Passport / Travel Document Information & Photo (Required / Muhiim ah) *
                  </h3>
                </div>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-amber-500/20 text-[#F9D976] border border-amber-500/30">
                  Required
                </span>
              </div>
              <p className="text-xs text-neutral-400 mb-4">
                Si tigidhkaaga loogu jaro xog sax ah oo baasaboorkaaga la mid ah, fadlan geli lambarka baasaboorkaaga iyo sawirkiisa oo cad.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="text-xs font-medium text-neutral-300 block mb-1.5">
                    Passport Number *
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
                    Nationality / Issuing State *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Somali"
                    value={formData.documentNationality || ''}
                    onChange={(e) => setFormData({ ...formData, documentNationality: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-800 text-sm text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
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

              {/* Upload Passport Box */}
              <div>
                <label className="text-xs font-medium text-neutral-300 block mb-1.5">
                  Passport Data Page Photo (Sawirka Baasaboorka) *
                </label>
                <input
                  type="file"
                  id="flight-passport-upload"
                  accept="image/jpeg,image/png,image/webp,image/jpg"
                  className="hidden"
                  onChange={async (e) => {
                    if (e.target.files && e.target.files[0]) {
                      const file = e.target.files[0];
                      if (!file.type.startsWith('image/')) {
                        setErrorMessage('Fadlan soo geli sawir sax ah oo baasaboorkaaga ah (JPG, PNG).');
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
                    htmlFor="flight-passport-upload"
                    className="border-2 border-dashed border-neutral-700 hover:border-[#D4AF37] rounded-2xl p-5 text-center cursor-pointer block bg-neutral-950/60 transition-all"
                  >
                    <div className="w-10 h-10 rounded-full bg-neutral-800/80 mx-auto flex items-center justify-center text-[#D4AF37] mb-2">
                      <FileText className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-semibold text-white block">
                      Guji si aad u soo geliso sawirka baasaboorkaaga
                    </span>
                    <span className="text-[11px] text-neutral-400 mt-0.5 block">
                      Waa muhiim si tigidhka loogu jaro magacaaga iyo xogta saxda ah (JPG, PNG)
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
                        <span className="text-[11px] text-emerald-400">Sawirka baasaboorka waa lifaaqan yahay</span>
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
                      className="text-xs text-red-400 hover:text-red-300 font-medium px-2 py-1 cursor-pointer"
                    >
                      Ka saar
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Additional Requirements */}
            <div>
              <label className="text-xs font-medium text-neutral-300 block mb-1.5">
                Additional Requirements or Preferred Airlines
              </label>
              <textarea
                rows={3}
                placeholder="Specify preferred airlines (e.g. Turkish Airlines, Qatar Airways, Ethiopian Airlines, Flydubai), seat preferences, or luggage needs..."
                value={formData.additionalRequirements}
                onChange={(e) =>
                  setFormData({ ...formData, additionalRequirements: e.target.value })
                }
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
                  <span>Submitting Request...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Submit Request</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Right Col: Process & Transparency */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-[#141414] border border-neutral-800 rounded-3xl p-6">
            <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2 text-[#D4AF37]">
              <ShieldCheck className="w-4 h-4" />
              <span>How We Assist You</span>
            </h3>
            <ul className="space-y-3.5 text-xs text-neutral-300">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Inventory Verification:</strong> We query live airline Global Distribution Systems for direct and transit flights.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Transit & Visa Checks:</strong> Ensuring your transit stops match your passport requirements.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Direct Response:</strong> A dedicated ticketing officer will contact you by phone or WhatsApp with options.
                </span>
              </li>
            </ul>
          </div>

          <div className="bg-[#101010] border border-amber-500/25 rounded-3xl p-6">
            <span className="text-[11px] font-semibold text-amber-300 uppercase tracking-wider block mb-2">
              Important Business Rule
            </span>
            <p className="text-xs text-neutral-300 leading-relaxed">
              Ticket prices are not shown on our public website. You are submitting a service request only. Our travel consultants will present official quotes once routes are confirmed.
            </p>
          </div>

          <div className="bg-[#141414] border border-neutral-800 rounded-3xl p-6 text-center">
            <span className="text-xs text-neutral-400 block mb-1">Need immediate flight advice?</span>
            <a
              href="tel:612483838"
              className="text-lg font-bold text-white hover:text-amber-300 transition-colors"
            >
              612483838 | 612141414
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
