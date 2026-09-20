import React, { useState } from 'react';
import { Language, ViewRoute } from '../types';
import { translations } from '../lib/localization';
import { FAQ_ITEMS } from '../lib/data';
import {
  HelpCircle,
  ChevronDown,
  PhoneCall,
  Search,
  Send,
  MessageCircle,
} from 'lucide-react';

interface FaqViewProps {
  currentLanguage: Language;
  onNavigate: (route: ViewRoute) => void;
}

export const FaqView: React.FC<FaqViewProps> = ({
  currentLanguage,
  onNavigate,
}) => {
  const t = translations[currentLanguage];
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full py-10 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#D4AF37] block mb-2">
          Clear Answers & Guidance
        </span>
        <h1
          className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white"
          style={{ fontFamily: "'Cinzel', serif" }}
        >
          {t.faq_title}
        </h1>
        <p className="text-xs sm:text-sm text-neutral-300 mt-2 leading-relaxed">
          {t.faq_subtitle}
        </p>
      </div>

      {/* Accordion List */}
      <div className="space-y-4">
        {FAQ_ITEMS.map((item, idx) => {
          const isOpen = openIndex === idx;
          const question =
            currentLanguage === 'so'
              ? item.questionSo
              : currentLanguage === 'ar'
              ? item.questionAr
              : item.questionEn;
          const answer =
            currentLanguage === 'so'
              ? item.answerSo
              : currentLanguage === 'ar'
              ? item.answerAr
              : item.answerEn;

          return (
            <div
              key={item.id}
              className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                isOpen
                  ? 'bg-[#161616] border-[#D4AF37]/50 shadow-lg'
                  : 'bg-[#121212] border-neutral-800/80 hover:border-neutral-700'
              }`}
            >
              <button
                onClick={() => toggleItem(idx)}
                className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 cursor-pointer"
                aria-expanded={isOpen}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                      isOpen
                        ? 'bg-[#D4AF37] text-black'
                        : 'bg-neutral-800 text-neutral-400'
                    }`}
                  >
                    Q{idx + 1}
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-white leading-snug">
                    {question}
                  </h3>
                </div>

                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-neutral-400 transform transition-transform ${
                    isOpen ? 'rotate-180 text-[#D4AF37]' : ''
                  }`}
                >
                  <ChevronDown className="w-4 h-4" />
                </div>
              </button>

              {isOpen && (
                <div className="px-5 sm:px-6 pb-6 pt-1 border-t border-neutral-800/60 text-xs sm:text-sm text-neutral-300 leading-relaxed animate-fade-in pl-14">
                  <p>{answer}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Still Have Questions Box */}
      <div className="mt-14 p-8 rounded-3xl bg-gradient-to-r from-[#141414] to-[#1a1813] border border-[#D4AF37]/30 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-lg font-bold text-white" style={{ fontFamily: "'Cinzel', serif" }}>
            Still Have Questions?
          </h3>
          <p className="text-xs text-neutral-400 mt-1 max-w-md">
            Our ticketing coordinators in Mogadishu are on standby to answer your questions regarding routes, transit visas, or bookings.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => onNavigate('contact')}
            className="px-5 py-2.5 rounded-full text-xs font-bold text-black bg-[#E5BE4A] hover:bg-[#F3C64F] transition-colors cursor-pointer"
          >
            Contact Support
          </button>
          <button
            onClick={() => onNavigate('check-order')}
            className="px-5 py-2.5 rounded-full text-xs font-semibold text-neutral-200 border border-neutral-700 hover:bg-neutral-800 transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <Search className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Track Order</span>
          </button>
        </div>
      </div>
    </div>
  );
};
