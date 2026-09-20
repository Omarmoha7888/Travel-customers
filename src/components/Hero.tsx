import React from 'react';
import { Language, ViewRoute } from '../types';
import { translations } from '../lib/localization';
import { Send, Compass, ShieldCheck, Award, Headphones } from 'lucide-react';

interface HeroProps {
  currentLanguage: Language;
  onNavigate: (route: ViewRoute) => void;
}

export const Hero: React.FC<HeroProps> = ({ currentLanguage, onNavigate }) => {
  const t = translations[currentLanguage];

  return (
    <section className="relative w-full overflow-hidden bg-[#0a0a0a] min-h-[560px] lg:min-h-[640px] flex items-center border-b border-[#D4AF37]/20">
      {/* Background Photography: Large Commercial Jet at Golden Sunset Runway */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=2000&q=88"
          alt="International commercial airplane gleaming on runway at sunset"
          className="w-full h-full object-cover object-center transform scale-105 filter brightness-90"
        />
        {/* Layered luxury dark overlays for pristine contrast and legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/80 to-black/40 sm:to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-black/40 to-black/60"></div>
        <div className="absolute inset-0 bg-radial-at-c from-amber-500/10 via-transparent to-transparent pointer-events-none"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 w-full">
        <div className="max-w-2xl lg:max-w-3xl">
          {/* Eyebrow Branding */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-black/60 border border-amber-500/40 backdrop-blur-md mb-5">
            <span className="w-2 h-2 rounded-full bg-[#E5BE4A] animate-pulse"></span>
            <span className="text-xs font-bold tracking-[0.25em] text-[#F3C64F] uppercase">
              {t.hero_eyebrow}
            </span>
          </div>

          {/* Hero Headline: "Your Journey. Our Support." */}
          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-[1.08]"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            <span className="block text-white drop-shadow-md">{t.hero_title_line1}</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#FFF4B8] via-[#E5BE4A] to-[#B8861B] drop-shadow-lg">
              {t.hero_title_line2}
            </span>
          </h1>

          {/* Supporting Text */}
          <p className="mt-5 text-base sm:text-lg text-neutral-200 font-normal leading-relaxed max-w-xl text-balance drop-shadow">
            {t.hero_subtitle}
          </p>

          {/* Action Buttons */}
          <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4">
            <button
              id="hero-primary-cta"
              onClick={() => onNavigate('request-service')}
              className="px-7 py-3.5 rounded-full font-bold text-sm tracking-wide transition-all duration-300 flex items-center gap-2.5 shadow-xl shadow-amber-950/40 hover:scale-[1.02] cursor-pointer"
              style={{
                background: 'linear-gradient(135deg, #F9D976 0%, #E5BE4A 45%, #B8861B 100%)',
                color: '#080808',
              }}
            >
              <Send className="w-4 h-4" />
              <span>{t.hero_cta_request}</span>
            </button>

            <button
              id="hero-secondary-cta"
              onClick={() => onNavigate('services')}
              className="px-6 py-3.5 rounded-full font-semibold text-sm tracking-wide text-amber-200 border border-[#D4AF37]/60 hover:bg-[#D4AF37]/10 hover:border-[#D4AF37] transition-all duration-300 flex items-center gap-2 cursor-pointer backdrop-blur-sm"
            >
              <Compass className="w-4 h-4 text-[#D4AF37]" />
              <span>{t.hero_cta_explore}</span>
            </button>
          </div>

          {/* Quick Value Metrics / Features */}
          <div className="mt-12 pt-8 border-t border-white/10 grid grid-cols-2 sm:grid-cols-3 gap-6 max-w-xl">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-neutral-900/80 border border-amber-500/30 flex items-center justify-center text-[#D4AF37] flex-shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <span className="block text-xs font-bold text-white uppercase tracking-wider">
                  Verified Booking
                </span>
                <span className="block text-[11px] text-neutral-400">Trusted Global Airlines</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-neutral-900/80 border border-amber-500/30 flex items-center justify-center text-[#D4AF37] flex-shrink-0">
                <Headphones className="w-4 h-4" />
              </div>
              <div>
                <span className="block text-xs font-bold text-white uppercase tracking-wider">
                  Personal Support
                </span>
                <span className="block text-[11px] text-neutral-400">Direct Travel Advisor</span>
              </div>
            </div>

            <div className="hidden sm:flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-neutral-900/80 border border-amber-500/30 flex items-center justify-center text-[#D4AF37] flex-shrink-0">
                <Award className="w-4 h-4" />
              </div>
              <div>
                <span className="block text-xs font-bold text-white uppercase tracking-wider">
                  Complete Scope
                </span>
                <span className="block text-[11px] text-neutral-400">Flights, Visas & Hotels</span>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Luxury Badge on the Right (matches mockup "Travel More Worry Less") */}
        <div className="hidden lg:block absolute bottom-12 right-8 pointer-events-none select-none">
          <div className="relative p-4 text-right">
            <span
              className="text-4xl xl:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#F9D976] via-[#E5BE4A] to-[#B8861B] italic block drop-shadow-lg opacity-90"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              {t.hero_slogan}
            </span>
            <div className="flex items-center justify-end gap-2 mt-1">
              <span className="h-[1px] w-12 bg-gradient-to-l from-amber-500 to-transparent"></span>
              <span className="text-[10px] text-amber-300 tracking-[0.3em] uppercase">
                BALCAD TRAVEL
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
