import React from 'react';
import { Logo } from './Logo';
import { Language, ViewRoute } from '../types';
import { translations } from '../lib/localization';
import { COMPANY_INFO, SERVICES_DATA } from '../lib/data';
import {
  Phone,
  Mail,
  Clock,
  MapPin,
  Globe,
  ArrowRight,
  ShieldCheck,
  Plane,
} from 'lucide-react';

interface FooterProps {
  currentLanguage: Language;
  onNavigate: (route: ViewRoute) => void;
  onLanguageChange: (lang: Language) => void;
}

export const Footer: React.FC<FooterProps> = ({
  currentLanguage,
  onNavigate,
  onLanguageChange,
}) => {
  const t = translations[currentLanguage];

  const handleNav = (route: ViewRoute) => {
    onNavigate(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#070707] text-neutral-300 border-t border-[#d4af37]/20 relative overflow-hidden">
      {/* Subtle gold glow accents */}
      <div className="absolute top-0 left-1/4 w-96 h-32 bg-amber-500/5 blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-32 bg-amber-500/5 blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Col 1: Brand & Identity */}
          <div className="space-y-4">
            <Logo size="lg" onClick={() => handleNav('home')} />
            <p className="text-sm text-neutral-400 leading-relaxed max-w-sm pt-2">
              {t.footer_tagline}
            </p>

            <div className="pt-2">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#121212] border border-amber-500/30 text-xs text-amber-300">
                <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                <span className="font-medium">Official Customer Portal</span>
              </div>
            </div>

            {/* Language Selector in Footer */}
            <div className="pt-3">
              <label className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider block mb-1.5">
                Website Language
              </label>
              <div className="inline-flex rounded-lg border border-neutral-800 bg-[#121212] p-1 gap-1">
                {(['en', 'so', 'ar'] as Language[]).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => onLanguageChange(lang)}
                    className={`px-3 py-1 text-xs rounded font-medium uppercase transition-colors cursor-pointer ${
                      currentLanguage === lang
                        ? 'bg-[#D4AF37] text-black font-bold'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    {lang === 'en' ? 'English' : lang === 'so' ? 'Soomaali' : 'العربية'}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-white tracking-wider uppercase mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#D4AF37]"></span>
              {t.footer_quick_links}
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => handleNav('home')}
                  className="text-neutral-400 hover:text-[#f3c64f] transition-colors cursor-pointer"
                >
                  {t.nav_home}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('about')}
                  className="text-neutral-400 hover:text-[#f3c64f] transition-colors cursor-pointer"
                >
                  {t.nav_about}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('services')}
                  className="text-neutral-400 hover:text-[#f3c64f] transition-colors cursor-pointer"
                >
                  {t.nav_services}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('destinations')}
                  className="text-neutral-400 hover:text-[#f3c64f] transition-colors cursor-pointer"
                >
                  {t.nav_destinations}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('faq')}
                  className="text-neutral-400 hover:text-[#f3c64f] transition-colors cursor-pointer"
                >
                  {t.nav_faq}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('contact')}
                  className="text-neutral-400 hover:text-[#f3c64f] transition-colors cursor-pointer"
                >
                  {t.nav_contact}
                </button>
              </li>
              <li className="pt-2">
                <button
                  onClick={() => handleNav('check-order')}
                  className="inline-flex items-center gap-1.5 text-xs text-[#e5be4a] hover:text-white px-2.5 py-1 rounded bg-amber-500/10 border border-amber-500/30 transition-colors cursor-pointer font-semibold"
                >
                  <span>{t.nav_check_order}</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Key Services */}
          <div>
            <h4 className="text-sm font-bold text-white tracking-wider uppercase mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#D4AF37]"></span>
              {t.footer_services_links}
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => handleNav('flight-tickets')}
                  className="text-neutral-400 hover:text-[#f3c64f] transition-colors cursor-pointer text-left"
                >
                  {t.service_flight_title}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('visa-services')}
                  className="text-neutral-400 hover:text-[#f3c64f] transition-colors cursor-pointer text-left"
                >
                  {t.service_visa_title}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('hotel-booking')}
                  className="text-neutral-400 hover:text-[#f3c64f] transition-colors cursor-pointer text-left"
                >
                  {t.service_hotel_title}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('umrah-hajj')}
                  className="text-neutral-400 hover:text-[#f3c64f] transition-colors cursor-pointer text-left"
                >
                  {t.service_umrah_title}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('tour-packages')}
                  className="text-neutral-400 hover:text-[#f3c64f] transition-colors cursor-pointer text-left"
                >
                  {t.service_tour_title}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('request-service')}
                  className="text-neutral-400 hover:text-[#f3c64f] transition-colors cursor-pointer text-left"
                >
                  {t.service_transfer_title}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('request-service')}
                  className="text-neutral-400 hover:text-[#f3c64f] transition-colors cursor-pointer text-left"
                >
                  {t.service_doc_title}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Phone Numbers */}
          <div>
            <h4 className="text-sm font-bold text-white tracking-wider uppercase mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#D4AF37]"></span>
              {t.footer_contact_info}
            </h4>
            <div className="space-y-3.5 text-sm">
              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#D4AF37] flex-shrink-0 mt-1" />
                <div className="flex flex-col">
                  <span className="text-xs text-neutral-400">Direct Travel Lines:</span>
                  <a
                    href="tel:612483838"
                    className="text-white hover:text-[#e5be4a] font-semibold transition-colors"
                  >
                    612483838
                  </a>
                  <a
                    href="tel:612141414"
                    className="text-white hover:text-[#e5be4a] font-semibold transition-colors"
                  >
                    612141414
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#D4AF37] flex-shrink-0 mt-1" />
                <div className="flex flex-col">
                  <span className="text-xs text-neutral-400">Official Email:</span>
                  <a
                    href={`mailto:${COMPANY_INFO.email}`}
                    className="text-neutral-200 hover:text-[#e5be4a] transition-colors break-all"
                  >
                    {COMPANY_INFO.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-[#D4AF37] flex-shrink-0 mt-1" />
                <div className="flex flex-col">
                  <span className="text-xs text-neutral-400">Operating Hours:</span>
                  <span className="text-neutral-300 text-xs">{COMPANY_INFO.hours}</span>
                </div>
              </div>

              {/* Social Channels */}
              <div className="pt-2">
                <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider block mb-2">
                  Connect With Us
                </span>
                <div className="flex items-center gap-2.5">
                  <a
                    href={COMPANY_INFO.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-300 hover:text-green-400 hover:border-green-500/50 transition-colors"
                    aria-label="WhatsApp"
                  >
                    <span className="font-bold text-xs">WA</span>
                  </a>
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-300 hover:text-blue-400 hover:border-blue-500/50 transition-colors"
                    aria-label="Facebook"
                  >
                    <span className="font-bold text-xs">FB</span>
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-300 hover:text-pink-400 hover:border-pink-500/50 transition-colors"
                    aria-label="Instagram"
                  >
                    <span className="font-bold text-xs">IG</span>
                  </a>
                  <a
                    href="https://x.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-300 hover:text-white hover:border-neutral-500 transition-colors"
                    aria-label="X"
                  >
                    <span className="font-bold text-xs">X</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar with Copyright & Rule Confirmation */}
        <div className="mt-14 pt-8 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <p>{t.footer_rights}</p>
          <div className="flex items-center gap-4 text-[11px]">
            <span className="text-neutral-400">Customer-Facing Portal</span>
            <span>•</span>
            <button
              onClick={() => handleNav('faq')}
              className="hover:text-amber-400 transition-colors"
            >
              No Online Payment Needed
            </button>
            <span>•</span>
            <button
              onClick={() => handleNav('contact')}
              className="hover:text-amber-400 transition-colors"
            >
              Direct Consultation
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
