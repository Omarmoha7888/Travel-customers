import React from 'react';
import { Language, ViewRoute, DestinationItem } from '../types';
import { translations } from '../lib/localization';
import { Hero } from '../components/Hero';
import { ServiceCard } from '../components/ServiceCard';
import { DestinationCard } from '../components/DestinationCard';
import { SERVICES_DATA, DESTINATIONS_DATA, COMPANY_INFO } from '../lib/data';
import {
  ArrowRight,
  ShieldCheck,
  Clock,
  HeartHandshake,
  PhoneCall,
  Mail,
  Plane,
  Sparkles,
  FileCheck,
  Compass,
} from 'lucide-react';

interface HomeViewProps {
  currentLanguage: Language;
  onNavigate: (route: ViewRoute) => void;
  onSelectService: (serviceId: string) => void;
  onSelectDestination: (destination: DestinationItem) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  currentLanguage,
  onNavigate,
  onSelectService,
  onSelectDestination,
}) => {
  const t = translations[currentLanguage];

  return (
    <div className="w-full">
      {/* 1. Hero Section */}
      <Hero currentLanguage={currentLanguage} onNavigate={onNavigate} />

      {/* 2. Key Pillars / Trust Highlights */}
      <section className="bg-[#0f0f0f] border-b border-neutral-900 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-start gap-3.5 p-4 rounded-xl bg-[#141414] border border-neutral-800/80">
            <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-[#D4AF37] flex-shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">{t.badge_support_title}</h4>
              <p className="text-xs text-neutral-400 mt-1 leading-relaxed">{t.badge_support_desc}</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 p-4 rounded-xl bg-[#141414] border border-neutral-800/80">
            <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-[#D4AF37] flex-shrink-0">
              <FileCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">{t.badge_visa_title}</h4>
              <p className="text-xs text-neutral-400 mt-1 leading-relaxed">{t.badge_visa_desc}</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 p-4 rounded-xl bg-[#141414] border border-neutral-800/80">
            <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-[#D4AF37] flex-shrink-0">
              <Plane className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">{t.badge_flights_title}</h4>
              <p className="text-xs text-neutral-400 mt-1 leading-relaxed">{t.badge_flights_desc}</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 p-4 rounded-xl bg-[#141414] border border-neutral-800/80">
            <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-[#D4AF37] flex-shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">{t.badge_spiritual_title}</h4>
              <p className="text-xs text-neutral-400 mt-1 leading-relaxed">{t.badge_spiritual_desc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Services Section: "Travel Services Made Simple" */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto" id="services-section">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-4 border-b border-neutral-800">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-6 h-[2px] bg-[#D4AF37]"></span>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#D4AF37]">
                {t.services_eyebrow}
              </span>
            </div>
            <h2
              className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              {t.services_heading}
            </h2>
          </div>

          <button
            onClick={() => onNavigate('services')}
            className="mt-4 sm:mt-0 inline-flex items-center gap-2 text-xs font-bold text-[#E5BE4A] hover:text-[#FFF2A3] transition-colors cursor-pointer group"
          >
            <span>{t.services_view_all}</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 10 Service Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {SERVICES_DATA.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              currentLanguage={currentLanguage}
              onRequest={onSelectService}
              onExplore={(route) => onNavigate(route as ViewRoute)}
            />
          ))}
        </div>
      </section>

      {/* 4. Popular Destinations Section: "Discover Amazing Places" */}
      <section className="py-16 bg-[#090909] border-y border-neutral-900 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-4 border-b border-neutral-800">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-6 h-[2px] bg-[#D4AF37]"></span>
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#D4AF37]">
                  {t.destinations_eyebrow}
                </span>
              </div>
              <h2
                className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight"
                style={{ fontFamily: "'Cinzel', serif" }}
              >
                {t.destinations_heading}
              </h2>
              <p className="text-xs text-neutral-400 mt-1">{t.destinations_subtitle}</p>
            </div>

            <button
              onClick={() => onNavigate('destinations')}
              className="mt-4 sm:mt-0 inline-flex items-center gap-2 text-xs font-bold text-[#E5BE4A] hover:text-[#FFF2A3] transition-colors cursor-pointer group"
            >
              <span>{t.destinations_view_all}</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            {DESTINATIONS_DATA.map((dest) => (
              <DestinationCard
                key={dest.id}
                destination={dest}
                currentLanguage={currentLanguage}
                onExploreOrRequest={onSelectDestination}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 5. Special Spotlight: Umrah & Hajj + Flight Tickets Concierge */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Spotlight 1: Umrah & Hajj */}
          <div className="relative rounded-3xl overflow-hidden border border-[#D4AF37]/40 bg-[#141414] p-8 flex flex-col justify-between shadow-2xl">
            <div className="absolute inset-0 z-0">
              <img
                src="https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=1200&q=85"
                alt="Kaaba in Masjid al-Haram Makkah"
                className="w-full h-full object-cover filter brightness-[0.25]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/70 to-transparent"></div>
            </div>

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-xs text-amber-300 font-semibold mb-4">
                <Sparkles className="w-3.5 h-3.5 text-[#E5BE4A]" />
                <span>Spiritual Journey Services</span>
              </div>
              <h3
                className="text-2xl sm:text-3xl font-bold text-white leading-tight"
                style={{ fontFamily: "'Cinzel', serif" }}
              >
                Umrah & Hajj Pilgrimage Support
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300 mt-3 leading-relaxed">
                Experience peace of mind for your holy journey to Makkah and Madinah. We handle flight schedules, hotel reservations near the Haram, ground transport, and pilgrim visa documentation.
              </p>
            </div>

            <div className="relative z-10 mt-8 flex flex-wrap items-center gap-3">
              <button
                onClick={() => onNavigate('umrah-hajj')}
                className="px-5 py-2.5 rounded-full text-xs font-bold transition-all shadow-md cursor-pointer"
                style={{
                  background: 'linear-gradient(135deg, #F9D976 0%, #E5BE4A 50%, #B8861B 100%)',
                  color: '#080808',
                }}
              >
                View Umrah & Hajj Details
              </button>
              <button
                onClick={() => onSelectService('umrah-hajj')}
                className="px-5 py-2.5 rounded-full text-xs font-semibold text-amber-200 border border-amber-500/40 hover:bg-neutral-800 transition-colors cursor-pointer"
              >
                Submit Request
              </button>
            </div>
          </div>

          {/* Spotlight 2: Flight Tickets & Visa Assistance */}
          <div className="relative rounded-3xl overflow-hidden border border-neutral-800 bg-[#141414] p-8 flex flex-col justify-between shadow-2xl">
            <div className="absolute inset-0 z-0">
              <img
                src="https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1200&q=85"
                alt="Airplane wings over clouds"
                className="w-full h-full object-cover filter brightness-[0.25]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/70 to-transparent"></div>
            </div>

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-500/30 text-xs text-blue-300 font-semibold mb-4">
                <Plane className="w-3.5 h-3.5 text-blue-400" />
                <span>Global Air Travel</span>
              </div>
              <h3
                className="text-2xl sm:text-3xl font-bold text-white leading-tight"
                style={{ fontFamily: "'Cinzel', serif" }}
              >
                Flight Ticketing & Visa Assistance
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300 mt-3 leading-relaxed">
                Whether traveling for business, family, or leisure, our ticketing specialists connect you with premier routes across international airlines alongside prompt visa document review.
              </p>
            </div>

            <div className="relative z-10 mt-8 flex flex-wrap items-center gap-3">
              <button
                onClick={() => onNavigate('flight-tickets')}
                className="px-5 py-2.5 rounded-full text-xs font-bold text-black bg-[#E5BE4A] hover:bg-[#F3C64F] transition-colors cursor-pointer"
              >
                Flight Booking Form
              </button>
              <button
                onClick={() => onNavigate('visa-services')}
                className="px-5 py-2.5 rounded-full text-xs font-semibold text-amber-200 border border-amber-500/40 hover:bg-neutral-800 transition-colors cursor-pointer"
              >
                Visa Service Form
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Call to Action Banner */}
      <section className="bg-gradient-to-b from-[#0a0a0a] to-[#121212] border-t border-[#D4AF37]/20 py-16 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
        <div className="max-w-3xl mx-auto space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#181818] border border-amber-500/30 text-xs text-[#E5BE4A] font-semibold">
            <Clock className="w-3.5 h-3.5" />
            <span>Fast Customer Support</span>
          </div>

          <h2
            className="text-3xl sm:text-4xl font-extrabold text-white"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            Ready to Begin Your Next Journey?
          </h2>

          <p className="text-sm text-neutral-300 max-w-xl mx-auto leading-relaxed">
            Submit your travel specifications online. Our dedicated coordinators in Mogadishu will review airline schedules, visa requirements, and accommodation choices to assist you promptly.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => onNavigate('request-service')}
              className="px-7 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all shadow-xl cursor-pointer"
              style={{
                background: 'linear-gradient(135deg, #F9D976 0%, #E5BE4A 50%, #B8861B 100%)',
                color: '#080808',
              }}
            >
              {t.nav_request_service}
            </button>

            <a
              href="tel:612483838"
              className="px-6 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider text-amber-300 border border-[#D4AF37]/60 hover:bg-[#D4AF37]/10 transition-colors flex items-center gap-2"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Call 612483838</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
