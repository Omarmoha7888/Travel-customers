import React from 'react';
import { Language, ViewRoute } from '../types';
import { translations } from '../lib/localization';
import { SERVICES_DATA } from '../lib/data';
import { ServiceCard } from '../components/ServiceCard';
import {
  ShieldCheck,
  Plane,
  FileCheck,
  Building2,
  Moon,
  Clock,
  Send,
  CheckCircle2,
} from 'lucide-react';

interface ServicesViewProps {
  currentLanguage: Language;
  onNavigate: (route: ViewRoute) => void;
  onSelectService: (serviceId: string) => void;
}

export const ServicesView: React.FC<ServicesViewProps> = ({
  currentLanguage,
  onNavigate,
  onSelectService,
}) => {
  const t = translations[currentLanguage];

  return (
    <div className="w-full py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Banner */}
      <div className="relative rounded-3xl overflow-hidden border border-[#D4AF37]/30 bg-[#121212] mb-12 shadow-2xl">
        <div className="h-64 sm:h-80 w-full relative">
          <img
            src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1800&q=85"
            alt="Commercial airport airplane"
            className="w-full h-full object-cover filter brightness-[0.4]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-[#121212]/60 to-transparent"></div>

          <div className="absolute bottom-6 left-6 right-6 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-xs text-amber-300 font-semibold mb-3">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Full-Scope Agency Assistance</span>
            </div>
            <h1
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              Our Comprehensive Services
            </h1>
            <p className="text-xs sm:text-sm text-neutral-300 mt-2 max-w-2xl leading-relaxed">
              From global airline reservations and visa applications to holy pilgrimage packages and ground transfers, Balcad Travel Agency delivers end-to-end support for every traveler.
            </p>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 mb-16">
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

      {/* Process Workflow: How It Works */}
      <div className="bg-[#141414] border border-neutral-800 rounded-3xl p-8 sm:p-12 mb-12">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest block mb-2">
            Simple 3-Step Process
          </span>
          <h3
            className="text-2xl sm:text-3xl font-bold text-white"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            How To Book With Balcad Travel
          </h3>
          <p className="text-xs text-neutral-400 mt-2">
            We operate without online payments to give you full transparency and personal verification before any commitment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          <div className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 text-center relative">
            <div className="w-12 h-12 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/40 text-[#D4AF37] font-black text-lg flex items-center justify-center mx-auto mb-4">
              01
            </div>
            <h4 className="text-base font-bold text-white mb-2">Submit Online Request</h4>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Select your required service (Flight, Visa, Hotel, Umrah) and provide travel dates and preferences through our secure portal.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 text-center relative">
            <div className="w-12 h-12 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/40 text-[#D4AF37] font-black text-lg flex items-center justify-center mx-auto mb-4">
              02
            </div>
            <h4 className="text-base font-bold text-white mb-2">Consultation & Quote</h4>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Our travel specialists in Mogadishu review availability, verify visa requirements, and contact you via Phone or WhatsApp with clear options.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 text-center relative">
            <div className="w-12 h-12 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/40 text-[#D4AF37] font-black text-lg flex items-center justify-center mx-auto mb-4">
              03
            </div>
            <h4 className="text-base font-bold text-white mb-2">Ticket & Voucher Delivery</h4>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Once you confirm your choice, e-tickets, hotel vouchers, and visa papers are issued and dispatched directly to your inbox and phone.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
