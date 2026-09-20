import React from 'react';
import { Language, ViewRoute } from '../types';
import { translations } from '../lib/localization';
import { TOUR_PACKAGES_DATA } from '../lib/data';
import {
  Compass,
  Clock,
  MapPin,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

interface TourPackagesViewProps {
  currentLanguage: Language;
  onSelectPackage: (packageTitle: string) => void;
  onNavigate: (route: ViewRoute) => void;
}

export const TourPackagesView: React.FC<TourPackagesViewProps> = ({
  currentLanguage,
  onSelectPackage,
  onNavigate,
}) => {
  const t = translations[currentLanguage];

  return (
    <div className="w-full py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Banner */}
      <div className="relative rounded-3xl overflow-hidden border border-[#D4AF37]/30 bg-[#121212] mb-12 shadow-2xl">
        <div className="h-64 sm:h-80 w-full relative">
          <img
            src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1800&q=85"
            alt="Scenic road journey"
            className="w-full h-full object-cover filter brightness-[0.4]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-[#121212]/60 to-transparent"></div>

          <div className="absolute bottom-6 left-6 right-6 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-xs text-amber-300 font-semibold mb-3">
              <Compass className="w-3.5 h-3.5" />
              <span>Curated International Itineraries</span>
            </div>
            <h1
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              Tour Packages & Holidays
            </h1>
            <p className="text-xs sm:text-sm text-neutral-300 mt-2 max-w-2xl leading-relaxed">
              Explore bespoke holiday itineraries across the Middle East, East Africa, Asia, and beyond. Inquire about custom package details, flights, and excursions.
            </p>
          </div>
        </div>
      </div>

      {/* Tour Packages Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {TOUR_PACKAGES_DATA.map((pkg) => (
          <div
            key={pkg.id}
            className="group rounded-2xl overflow-hidden bg-[#141414] border border-neutral-800/80 hover:border-[#D4AF37]/60 transition-all duration-300 flex flex-col justify-between shadow-xl"
            id={`tour-package-${pkg.id}`}
          >
            {/* Image */}
            <div className="relative h-56 w-full overflow-hidden">
              <img
                src={pkg.image}
                alt={pkg.title}
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-black/30"></div>

              {/* Destination Tag */}
              <div className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-xs text-neutral-200">
                <MapPin className="w-3.5 h-3.5 text-[#F3C64F]" />
                <span>{pkg.destination}</span>
              </div>

              {/* Duration Tag */}
              <div className="absolute bottom-3 right-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4AF37] text-black font-bold text-xs shadow-md">
                <Clock className="w-3.5 h-3.5" />
                <span>{pkg.duration}</span>
              </div>
            </div>

            {/* Details */}
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <h3
                  className="text-xl font-bold text-white group-hover:text-[#F3C64F] transition-colors"
                  style={{ fontFamily: "'Cinzel', serif" }}
                >
                  {pkg.title}
                </h3>
                <p className="text-xs text-neutral-400 mt-2 leading-relaxed">
                  {pkg.description}
                </p>

                {/* Highlights */}
                <div className="mt-4 pt-4 border-t border-neutral-800/80">
                  <span className="text-[11px] font-semibold text-amber-300 uppercase tracking-wider block mb-2">
                    Package Highlights
                  </span>
                  <ul className="space-y-1.5">
                    {pkg.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-neutral-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Button: "Request Details" */}
              <div className="mt-6 pt-4 border-t border-neutral-800">
                <button
                  onClick={() => onSelectPackage(pkg.title)}
                  className="w-full py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-all shadow-md group-hover:scale-[1.01]"
                  style={{
                    background: 'linear-gradient(135deg, #F9D976 0%, #E5BE4A 50%, #B8861B 100%)',
                    color: '#080808',
                  }}
                >
                  <span>Request Details</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Notice on pricing */}
      <div className="mt-12 p-6 rounded-2xl bg-[#111111] border border-amber-500/20 text-center max-w-2xl mx-auto">
        <ShieldCheck className="w-6 h-6 text-[#D4AF37] mx-auto mb-2" />
        <h4 className="text-sm font-bold text-white">Transparent Custom Quotations</h4>
        <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
          Package prices vary based on seasonal airline fares, hotel star rating, and private vs. group excursions. Inquire using the button above to receive a full itemized itinerary.
        </p>
      </div>
    </div>
  );
};
