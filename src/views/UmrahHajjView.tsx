import React, { useState } from 'react';
import { Language, UmrahHajjRequestData, CustomerOrder } from '../types';
import { translations } from '../lib/localization';
import { submitCustomerServiceRequest } from '../lib/api';
import {
  Sparkles,
  Calendar,
  Users,
  Send,
  ShieldCheck,
  CheckCircle2,
  Building,
  Car,
  FileCheck,
  Moon,
} from 'lucide-react';

interface UmrahHajjViewProps {
  currentLanguage: Language;
  onRequestSubmitted: (order: CustomerOrder) => void;
}

export const UmrahHajjView: React.FC<UmrahHajjViewProps> = ({
  currentLanguage,
  onRequestSubmitted,
}) => {
  const t = translations[currentLanguage];

  const [formData, setFormData] = useState<UmrahHajjRequestData>({
    fullName: '',
    phone: '',
    email: '',
    service: 'umrah',
    travelers: 2,
    preferredTravelDate: '',
    additionalRequirements: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!formData.fullName || !formData.phone || !formData.preferredTravelDate) {
      setErrorMessage('Please fill in all required fields (marked with *).');
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await submitCustomerServiceRequest({
        serviceType: 'umrah-hajj',
        serviceName: formData.service === 'hajj' ? 'Hajj Service' : formData.service === 'both' ? 'Umrah & Hajj Service' : 'Umrah Pilgrimage',
        customerName: formData.fullName,
        phone: formData.phone,
        email: formData.email,
        details: {
          serviceCategory: formData.service.toUpperCase(),
          travelers: formData.travelers,
          preferredTravelDate: formData.preferredTravelDate,
          additionalRequirements: formData.additionalRequirements,
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
      {/* Hero with Respectful Makkah & Madinah Imagery */}
      <div className="relative rounded-3xl overflow-hidden border border-[#D4AF37]/40 bg-[#0f0f0f] mb-12 shadow-2xl">
        <div className="h-72 sm:h-96 w-full relative">
          <img
            src="https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=2000&q=88"
            alt="The Holy Kaaba in Masjid al-Haram at Makkah"
            className="w-full h-full object-cover filter brightness-[0.38]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-[#0f0f0f]/60 to-transparent"></div>

          <div className="absolute bottom-6 left-6 right-6 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-xs text-amber-300 font-semibold mb-3">
              <Moon className="w-3.5 h-3.5 text-[#E5BE4A]" />
              <span>Sacred Pilgrimage Services</span>
            </div>
            <h1
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              Umrah & Hajj Services
            </h1>
            <p className="text-xs sm:text-sm text-neutral-300 mt-2 max-w-2xl leading-relaxed">
              Serving pilgrims with heartfelt dedication. Comprehensive support for your blessed visit to Masjid al-Haram in Makkah and Masjid an-Nabawi in Madinah al-Munawwarah.
            </p>
          </div>
        </div>
      </div>

      {/* 4 Pillars of Assistance */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
        <div className="p-5 rounded-2xl bg-[#141414] border border-neutral-800">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-[#D4AF37] mb-3">
            <Calendar className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-white mb-1">Travel Planning</h3>
          <p className="text-xs text-neutral-400 leading-relaxed">
            Convenient flight itineraries coordinating direct and connecting routes tailored for pilgrims and families.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-[#141414] border border-neutral-800">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-[#D4AF37] mb-3">
            <Building className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-white mb-1">Accommodation Assistance</h3>
          <p className="text-xs text-neutral-400 leading-relaxed">
            Hotels situated within walking distance of the Haram in Makkah and the Prophet's Mosque in Madinah.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-[#141414] border border-neutral-800">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-[#D4AF37] mb-3">
            <Car className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-white mb-1">Transportation Assistance</h3>
          <p className="text-xs text-neutral-400 leading-relaxed">
            Air-conditioned VIP coaches, Haramain high-speed train coordination, and private Jeddah-Makkah-Madinah transfers.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-[#141414] border border-neutral-800">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-[#D4AF37] mb-3">
            <FileCheck className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-white mb-1">Visa-Related Assistance</h3>
          <p className="text-xs text-neutral-400 leading-relaxed">
            Official Umrah e-visa processing, Nusuk platform guidance, and consular document review.
          </p>
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
              <span>Umrah & Hajj Request Form</span>
            </h2>
            <p className="text-xs text-neutral-400 mt-1">
              Submit your pilgrimage preferences. No prices are displayed online; our religious travel specialists will connect with you to review package schedules.
            </p>
          </div>

          {errorMessage && (
            <div className="mb-6 p-4 rounded-xl bg-red-950/40 border border-red-800/60 text-xs text-red-200">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Service Selection */}
            <div>
              <label className="text-xs font-semibold text-neutral-300 uppercase tracking-wider block mb-2">
                Select Service Program
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: 'umrah', label: 'Umrah Pilgrimage' },
                  { id: 'hajj', label: 'Hajj Program' },
                  { id: 'both', label: 'Custom Spiritual Tour' },
                ].map((s) => (
                  <button
                    type="button"
                    key={s.id}
                    onClick={() =>
                      setFormData({
                        ...formData,
                        service: s.id as UmrahHajjRequestData['service'],
                      })
                    }
                    className={`py-3 px-3 rounded-xl text-xs font-semibold transition-all text-center cursor-pointer ${
                      formData.service === s.id
                        ? 'bg-[#D4AF37] text-black font-bold shadow-md'
                        : 'bg-neutral-900 border border-neutral-800 text-neutral-300 hover:border-neutral-700'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Customer Details */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-medium text-neutral-300 block mb-1.5">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Fatima Abdi"
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
                  placeholder="e.g. 612141414"
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

            {/* Travelers & Preferred Date */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-neutral-300 block mb-1.5">
                  Number of Travelers *
                </label>
                <div className="relative">
                  <Users className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="number"
                    min="1"
                    max="100"
                    required
                    value={formData.travelers}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        travelers: parseInt(e.target.value, 10) || 1,
                      })
                    }
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-neutral-900 border border-neutral-800 text-sm text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-neutral-300 block mb-1.5">
                  Preferred Travel Date / Month *
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="date"
                    required
                    value={formData.preferredTravelDate}
                    onChange={(e) =>
                      setFormData({ ...formData, preferredTravelDate: e.target.value })
                    }
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-neutral-900 border border-neutral-800 text-sm text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Additional Requirements */}
            <div>
              <label className="text-xs font-medium text-neutral-300 block mb-1.5">
                Additional Requirements (Elderly assistance, wheelchair service, specific hotel preference in Makkah or Madinah)
              </label>
              <textarea
                rows={3}
                placeholder="Mention room sharing preference (Double/Triple/Quad), hotel distance preference, or special medical needs..."
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

        {/* Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-[#141414] border border-neutral-800 rounded-3xl p-6">
            <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2 text-[#D4AF37]">
              <ShieldCheck className="w-4 h-4" />
              <span>Pilgrim Care Commitment</span>
            </h3>
            <ul className="space-y-3.5 text-xs text-neutral-300">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Haram Proximity:</strong> Curated accommodations within convenient distance of the holy sites.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Ziyarah Guidance:</strong> Scheduled historical visits in Makkah (Jabal al-Nour, Thawr) and Madinah (Quba Mosque, Uhud).
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Dedicated Group Leaders:</strong> Experienced guides assisting travelers throughout their spiritual journey.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
