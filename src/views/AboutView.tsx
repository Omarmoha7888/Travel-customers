import React from 'react';
import { Language, ViewRoute } from '../types';
import { translations } from '../lib/localization';
import { COMPANY_INFO } from '../lib/data';
import { Logo } from '../components/Logo';
import {
  ShieldCheck,
  Compass,
  HeartHandshake,
  Award,
  Users,
  Clock,
  ArrowRight,
  PhoneCall,
  Globe,
  CheckCircle2,
} from 'lucide-react';

interface AboutViewProps {
  currentLanguage: Language;
  onNavigate: (route: ViewRoute) => void;
}

export const AboutView: React.FC<AboutViewProps> = ({
  currentLanguage,
  onNavigate,
}) => {
  const t = translations[currentLanguage];

  return (
    <div className="w-full py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Visual Banner */}
      <div className="relative rounded-3xl overflow-hidden border border-[#D4AF37]/30 bg-[#121212] mb-12 shadow-2xl">
        <div className="h-64 sm:h-80 w-full relative">
          <img
            src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1800&q=85"
            alt="Commercial airliner in flight"
            className="w-full h-full object-cover filter brightness-[0.38]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-[#121212]/60 to-transparent"></div>

          <div className="absolute bottom-6 left-6 right-6 max-w-3xl">
            <div className="mb-4">
              <Logo size="lg" variant="horizontal" />
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-xs text-amber-300 font-semibold mb-3">
              <Compass className="w-3.5 h-3.5" />
              <span>Reliable & Dedicated Agency</span>
            </div>
            <h1
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              About Balcad Travel Agency
            </h1>
            <p className="text-xs sm:text-sm text-neutral-300 mt-2 max-w-2xl leading-relaxed">
              Your Journey. Our Support. We simplify air travel, consular documentation, holy pilgrimages, and hotel arrangements for travelers in Somalia and the global diaspora.
            </p>
          </div>
        </div>
      </div>

      {/* Main Narrative */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16">
        <div className="lg:col-span-7 space-y-6 text-sm text-neutral-300 leading-relaxed">
          <div>
            <h2
              className="text-2xl sm:text-3xl font-bold text-white mb-4"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              {t.about_mission_title}
            </h2>
            <p className="text-neutral-300">
              {t.about_mission_desc}
            </p>
          </div>

          <div>
            <h3
              className="text-xl font-bold text-white mb-3"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              {t.about_values_title}
            </h3>
            <p className="text-neutral-300">
              {t.about_values_desc}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800">
            <h4 className="text-sm font-bold text-white mb-3 text-[#D4AF37] uppercase tracking-wider">
              Our Core Agency Pillars
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#D4AF37] flex-shrink-0 mt-1" />
                <span>
                  <strong>Clear, Direct Communication:</strong> Direct phone and WhatsApp consultation without automated robot loops.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#D4AF37] flex-shrink-0 mt-1" />
                <span>
                  <strong>Reliable Airline Booking:</strong> Direct partnerships and ticketing credentials for reputable international and regional carriers.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#D4AF37] flex-shrink-0 mt-1" />
                <span>
                  <strong>Pilgrim Welfare & Care:</strong> Experienced guidance for Umrah & Hajj groups ensuring sacred journeys are peaceful and organized.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#D4AF37] flex-shrink-0 mt-1" />
                <span>
                  <strong>Customer-First Integrity:</strong> Transparent fee explanations and honest advice regarding transit times and visa approval timelines.
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Right Info Box */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#141414] border border-[#D4AF37]/30 rounded-3xl p-8 shadow-xl">
            <h3
              className="text-xl font-bold text-white mb-4 text-[#D4AF37]"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              Why Choose Balcad Travel
            </h3>
            <div className="space-y-5">
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-[#D4AF37] flex-shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Trust & Reliability</h4>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    Recognized agency operations ensuring each booking is legitimate and guaranteed.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-[#D4AF37] flex-shrink-0">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Customer Satisfaction</h4>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    Repeat travelers trust our staff with family, business, and medical travel plans.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-[#D4AF37] flex-shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Dedicated Travel Support</h4>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    Support lines open daily to assist with flight changes, inquiries, and check-in.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-neutral-800">
              <button
                onClick={() => onNavigate('request-service')}
                className="w-full py-3.5 px-4 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all shadow-md"
                style={{
                  background: 'linear-gradient(135deg, #F9D976 0%, #E5BE4A 50%, #B8861B 100%)',
                  color: '#080808',
                }}
              >
                <span>Request a Service</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
