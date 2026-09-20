import React, { useState } from 'react';
import { Language, HotelRequestData, CustomerOrder } from '../types';
import { translations } from '../lib/localization';
import { submitCustomerServiceRequest } from '../lib/api';
import {
  Building2,
  Calendar,
  Users,
  MapPin,
  Send,
  ShieldCheck,
  CheckCircle2,
  BedDouble,
} from 'lucide-react';

interface HotelBookingViewProps {
  currentLanguage: Language;
  onRequestSubmitted: (order: CustomerOrder) => void;
}

export const HotelBookingView: React.FC<HotelBookingViewProps> = ({
  currentLanguage,
  onRequestSubmitted,
}) => {
  const t = translations[currentLanguage];

  const [formData, setFormData] = useState<HotelRequestData>({
    fullName: '',
    phone: '',
    email: '',
    destination: '',
    checkInDate: '',
    checkOutDate: '',
    guests: 2,
    rooms: 1,
    hotelPreference: '4-star',
    additionalRequirements: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!formData.fullName || !formData.phone || !formData.destination || !formData.checkInDate) {
      setErrorMessage('Please fill in all required fields (marked with *).');
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await submitCustomerServiceRequest({
        serviceType: 'hotel',
        serviceName: 'Hotel Booking',
        customerName: formData.fullName,
        phone: formData.phone,
        email: formData.email,
        details: {
          destination: formData.destination,
          checkInDate: formData.checkInDate,
          checkOutDate: formData.checkOutDate || 'Flexible',
          guests: formData.guests,
          rooms: formData.rooms,
          hotelPreference: formData.hotelPreference,
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
      {/* Hotel Visual Banner */}
      <div className="relative rounded-3xl overflow-hidden border border-[#D4AF37]/30 bg-[#121212] mb-12 shadow-2xl">
        <div className="h-64 sm:h-80 w-full relative">
          <img
            src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1800&q=85"
            alt="Luxury resort with illuminated swimming pool"
            className="w-full h-full object-cover filter brightness-[0.4]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-[#121212]/60 to-transparent"></div>

          <div className="absolute bottom-6 left-6 right-6 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-xs text-amber-300 font-semibold mb-3">
              <Building2 className="w-3.5 h-3.5" />
              <span>Worldwide Accommodations & Luxury Stays</span>
            </div>
            <h1
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              Hotel & Resort Reservations
            </h1>
            <p className="text-xs sm:text-sm text-neutral-300 mt-2 max-w-2xl leading-relaxed">
              Find comfortable, vetted hotels across international capitals, pilgrimage centers, and coastal vacation resorts tailored to your schedule and party size.
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
              <span>Hotel Service Request</span>
            </h2>
            <p className="text-xs text-neutral-400 mt-1">
              Submit your hotel requirements. Prices are not shown online; our team checks availability and secures preferential rates for your stay.
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
                  placeholder="e.g. Mohamed Hassan"
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

            {/* Destination */}
            <div>
              <label className="text-xs font-medium text-neutral-300 block mb-1.5">
                Destination City or Region *
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-[#D4AF37] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Dubai Downtown, Makkah Near Haram, Istanbul Taksim, Nairobi"
                  value={formData.destination}
                  onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-neutral-900 border border-neutral-800 text-sm text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
                />
              </div>
            </div>

            {/* Check-in & Check-out Dates */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-neutral-300 block mb-1.5">
                  Check-in Date *
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="date"
                    required
                    value={formData.checkInDate}
                    onChange={(e) => setFormData({ ...formData, checkInDate: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-neutral-900 border border-neutral-800 text-sm text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-neutral-300 block mb-1.5">
                  Check-out Date (Optional)
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="date"
                    value={formData.checkOutDate}
                    onChange={(e) => setFormData({ ...formData, checkOutDate: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-neutral-900 border border-neutral-800 text-sm text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Guests, Rooms & Hotel Preference */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-medium text-neutral-300 block mb-1.5">
                  Number of Guests
                </label>
                <div className="relative">
                  <Users className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="number"
                    min="1"
                    max="50"
                    value={formData.guests}
                    onChange={(e) =>
                      setFormData({ ...formData, guests: parseInt(e.target.value, 10) || 1 })
                    }
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-neutral-900 border border-neutral-800 text-sm text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-neutral-300 block mb-1.5">
                  Number of Rooms
                </label>
                <div className="relative">
                  <BedDouble className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="number"
                    min="1"
                    max="20"
                    value={formData.rooms}
                    onChange={(e) =>
                      setFormData({ ...formData, rooms: parseInt(e.target.value, 10) || 1 })
                    }
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-neutral-900 border border-neutral-800 text-sm text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-neutral-300 block mb-1.5">
                  Hotel Category Preference
                </label>
                <select
                  value={formData.hotelPreference}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      hotelPreference: e.target.value as HotelRequestData['hotelPreference'],
                    })
                  }
                  className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-800 text-sm text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
                >
                  <option value="5-star">5-Star Luxury</option>
                  <option value="4-star">4-Star Premium</option>
                  <option value="3-star">3-Star Standard</option>
                  <option value="resort">Beach / Island Resort</option>
                  <option value="flexible">Flexible / Best Value</option>
                </select>
              </div>
            </div>

            {/* Additional Requirements */}
            <div>
              <label className="text-xs font-medium text-neutral-300 block mb-1.5">
                Additional Requirements (e.g. Breakfast included, proximity to Haram, airport shuttle, family suite)
              </label>
              <textarea
                rows={3}
                placeholder="Mention specific hotel chains, bed types (King/Twin), early check-in, or special requests..."
                value={formData.additionalRequirements}
                onChange={(e) => setFormData({ ...formData, additionalRequirements: e.target.value })}
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
                  <span>Submitting Hotel Request...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Submit Hotel Request</span>
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
              <span>Verified Stays Only</span>
            </h3>
            <ul className="space-y-3.5 text-xs text-neutral-300">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Prime Locations:</strong> Proximity to major landmarks, business centers, and holy mosques.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Flexible Booking:</strong> Options with free cancellation or amendment flexibility when possible.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Clear Vouchers:</strong> Official booking confirmations provided directly to your WhatsApp and email.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
