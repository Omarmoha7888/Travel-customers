import React, { useState, useEffect } from 'react';
import { Logo } from './Logo';
import { Language, ViewRoute } from '../types';
import { translations } from '../lib/localization';
import {
  Globe,
  Menu,
  X,
  Send,
  Search,
  Phone,
  ChevronDown,
} from 'lucide-react';

interface NavbarProps {
  currentRoute: ViewRoute;
  onNavigate: (route: ViewRoute) => void;
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentRoute,
  onNavigate,
  currentLanguage,
  onLanguageChange,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  const t = translations[currentLanguage];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: { route: ViewRoute; label: string }[] = [
    { route: 'home', label: t.nav_home },
    { route: 'about', label: t.nav_about },
    { route: 'services', label: t.nav_services },
    { route: 'destinations', label: t.nav_destinations },
    { route: 'faq', label: t.nav_faq },
    { route: 'contact', label: t.nav_contact },
  ];

  const handleLinkClick = (route: ViewRoute) => {
    onNavigate(route);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const languages = [
    { code: 'en' as Language, label: 'English', native: 'English' },
    { code: 'so' as Language, label: 'Somali', native: 'Soomaali' },
    { code: 'ar' as Language, label: 'Arabic', native: 'العربية' },
  ];

  return (
    <>
      {/* Top micro contact notification bar */}
      <div className="bg-[#080808] border-b border-[#262115] text-[11px] text-neutral-400 py-1.5 px-4 hidden sm:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <a
              href="tel:612483838"
              className="flex items-center gap-1.5 hover:text-[#e5be4a] transition-colors"
            >
              <Phone className="w-3 h-3 text-[#d4af37]" />
              <span>612483838 / 612141414</span>
            </a>
            <a
              href="mailto:balcadtravel@gmail.com"
              className="hidden md:inline-flex items-center gap-1.5 hover:text-[#e5be4a] transition-colors"
            >
              <span>balcadtravel@gmail.com</span>
            </a>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => handleLinkClick('check-order')}
              className="flex items-center gap-1 text-[#e5be4a] hover:text-[#ffd666] font-medium transition-colors cursor-pointer"
            >
              <Search className="w-3 h-3" />
              <span>{t.nav_check_order}</span>
            </button>
            <span className="text-neutral-600">|</span>
            <span className="text-neutral-400 tracking-wider text-[10px]">
              MOGADISHU & INTERNATIONAL
            </span>
          </div>
        </div>
      </div>

      {/* Main Sticky Luxury Header */}
      <header
        id="main-navigation-header"
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#0a0a0a]/95 backdrop-blur-md border-b border-[#d4af37]/25 shadow-2xl shadow-black/80 py-2.5'
            : 'bg-[#0d0d0d]/90 backdrop-blur-sm border-b border-neutral-900 py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* LEFT: Official Balcad logo + Balcad Travel Agency branding */}
          <div className="flex-shrink-0">
            <Logo
              size="md"
              onClick={() => handleLinkClick('home')}
            />
          </div>

          {/* CENTER: Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const isActive = currentRoute === link.route;
              return (
                <button
                  key={link.route}
                  onClick={() => handleLinkClick(link.route)}
                  className={`relative px-3.5 py-2 text-sm font-medium transition-colors cursor-pointer rounded-md ${
                    isActive
                      ? 'text-[#F3C64F] font-semibold'
                      : 'text-neutral-300 hover:text-white hover:bg-neutral-900/60'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent shadow-[0_0_8px_#D4AF37]"></span>
                  )}
                </button>
              );
            })}

            {/* Check My Order button in desktop menu */}
            <button
              onClick={() => handleLinkClick('check-order')}
              className={`px-3 py-1.5 text-xs rounded-full border transition-all cursor-pointer flex items-center gap-1.5 ml-2 ${
                currentRoute === 'check-order'
                  ? 'border-[#D4AF37] text-[#D4AF37] bg-[#D4AF37]/10'
                  : 'border-neutral-800 text-neutral-300 hover:border-neutral-700 hover:text-amber-300'
              }`}
            >
              <Search className="w-3 h-3 text-[#D4AF37]" />
              <span>{t.nav_check_order}</span>
            </button>
          </nav>

          {/* RIGHT: Language Selector & Primary CTA */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Language Selector Dropdown */}
            <div className="relative">
              <button
                id="language-selector-button"
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-neutral-800 bg-[#141414] text-xs text-neutral-200 hover:border-amber-500/40 transition-colors cursor-pointer"
                aria-haspopup="true"
                aria-expanded={langDropdownOpen}
              >
                <Globe className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span className="font-semibold uppercase tracking-wider">{currentLanguage}</span>
                <ChevronDown className="w-3 h-3 text-neutral-400" />
              </button>

              {langDropdownOpen && (
                <div
                  className="absolute right-0 mt-2 w-36 bg-[#141414] border border-[#d4af37]/30 rounded-lg shadow-xl shadow-black/80 py-1.5 z-50 overflow-hidden"
                  id="language-dropdown-menu"
                >
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        onLanguageChange(lang.code);
                        setLangDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3.5 py-2 text-xs flex items-center justify-between transition-colors cursor-pointer ${
                        currentLanguage === lang.code
                          ? 'bg-[#d4af37]/15 text-[#f3c64f] font-semibold'
                          : 'text-neutral-300 hover:bg-neutral-800/80 hover:text-white'
                      }`}
                    >
                      <span>{lang.native}</span>
                      <span className="text-[10px] text-neutral-500 uppercase">{lang.code}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Primary CTA: "Request a Service" */}
            <button
              id="header-cta-request-service"
              onClick={() => handleLinkClick('request-service')}
              className="relative group px-4 py-2 rounded-full font-semibold text-xs tracking-wide cursor-pointer transition-all duration-300 flex items-center gap-2 overflow-hidden shadow-md shadow-amber-950/30"
              style={{
                background: 'linear-gradient(135deg, #F9D976 0%, #E5BE4A 45%, #B8861B 100%)',
                color: '#0D0D0D',
              }}
            >
              <span className="font-bold">{t.nav_request_service}</span>
              <Send className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* Mobile Right Controls: Request CTA + Menu Toggle */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => handleLinkClick('request-service')}
              className="px-3 py-1.5 rounded-full text-xs font-bold transition-all shadow-sm"
              style={{
                background: 'linear-gradient(135deg, #F9D976 0%, #E5BE4A 50%, #B8861B 100%)',
                color: '#0a0a0a',
              }}
            >
              {t.nav_request_service}
            </button>

            {/* Language Quick Switcher on mobile */}
            <button
              onClick={() => {
                const nextLang: Language =
                  currentLanguage === 'en' ? 'so' : currentLanguage === 'so' ? 'ar' : 'en';
                onLanguageChange(nextLang);
              }}
              className="p-2 rounded-lg bg-neutral-900 border border-neutral-800 text-xs font-bold text-[#D4AF37]"
              title="Switch Language"
            >
              <span className="uppercase">{currentLanguage}</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-200 hover:text-white focus:outline-none"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-amber-400" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div
            id="mobile-navigation-drawer"
            className="lg:hidden bg-[#111111] border-b border-[#D4AF37]/30 px-5 pt-3 pb-6 space-y-2 mt-2.5 shadow-2xl"
          >
            <div className="flex items-center justify-between py-2 border-b border-neutral-800 mb-2">
              <span className="text-xs text-neutral-400 font-medium">Select Language:</span>
              <div className="flex gap-1.5">
                {languages.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => {
                      onLanguageChange(l.code);
                    }}
                    className={`px-2.5 py-1 rounded text-xs font-semibold uppercase ${
                      currentLanguage === l.code
                        ? 'bg-[#D4AF37] text-black'
                        : 'bg-neutral-800 text-neutral-300'
                    }`}
                  >
                    {l.code}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-1 pt-1">
              {navLinks.map((link) => (
                <button
                  key={link.route}
                  onClick={() => handleLinkClick(link.route)}
                  className={`w-full text-left py-2.5 px-3 rounded-lg text-sm font-medium transition-colors ${
                    currentRoute === link.route
                      ? 'bg-[#D4AF37]/15 text-[#F3C64F] font-semibold border-l-2 border-[#D4AF37]'
                      : 'text-neutral-200 hover:bg-neutral-900'
                  }`}
                >
                  {link.label}
                </button>
              ))}

              <button
                onClick={() => handleLinkClick('check-order')}
                className={`w-full text-left py-2.5 px-3 rounded-lg text-sm font-medium flex items-center justify-between mt-2 border border-amber-500/25 ${
                  currentRoute === 'check-order'
                    ? 'bg-[#D4AF37]/20 text-[#F3C64F]'
                    : 'bg-neutral-900/80 text-amber-300'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Search className="w-4 h-4 text-[#D4AF37]" />
                  <span>{t.nav_check_order}</span>
                </div>
                <span className="text-[10px] bg-amber-400/20 text-amber-300 px-2 py-0.5 rounded-full">
                  Status
                </span>
              </button>
            </div>

            <div className="pt-3 border-t border-neutral-800 flex flex-col gap-2">
              <a
                href="tel:612483838"
                className="w-full py-2.5 px-3 rounded-lg bg-neutral-900 text-neutral-300 text-xs flex items-center justify-center gap-2"
              >
                <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Call 612483838 / 612141414</span>
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
