import React from 'react';
import { DestinationItem, Language } from '../types';
import { translations } from '../lib/localization';
import { MapPin, ArrowUpRight } from 'lucide-react';

interface DestinationCardProps {
  destination: DestinationItem;
  currentLanguage: Language;
  onExploreOrRequest: (destination: DestinationItem) => void;
}

export const DestinationCard: React.FC<DestinationCardProps> = ({
  destination,
  currentLanguage,
  onExploreOrRequest,
}) => {
  const t = translations[currentLanguage];
  const country = (t as any)[destination.countryKey] || destination.countryKey;
  const description = (t as any)[destination.descKey] || '';

  return (
    <div
      onClick={() => onExploreOrRequest(destination)}
      className="group relative rounded-2xl overflow-hidden bg-[#141414] border border-neutral-800/80 hover:border-[#D4AF37]/60 transition-all duration-300 flex flex-col justify-between cursor-pointer shadow-lg hover:shadow-2xl hover:shadow-amber-950/20"
      id={`destination-card-${destination.id}`}
    >
      {/* Visual Image Banner */}
      <div className="relative h-52 w-full overflow-hidden">
        <img
          src={destination.image}
          alt={`${destination.nameKey} travel destination`}
          className="w-full h-full object-cover transform group-hover:scale-108 transition-transform duration-700 ease-out"
          loading="lazy"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/30 to-black/30"></div>

        {/* Floating Location Tag */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-xs text-neutral-200">
          <MapPin className="w-3.5 h-3.5 text-[#F3C64F]" />
          <span>{country}</span>
        </div>
      </div>

      {/* Editorial Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between">
            <h3
              className="text-lg font-bold text-white group-hover:text-[#F3C64F] transition-colors"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              {destination.nameKey}
            </h3>
            <span className="text-[11px] font-semibold text-[#D4AF37] uppercase tracking-wider">
              {country}
            </span>
          </div>

          <p className="text-xs text-neutral-400 mt-2 leading-relaxed line-clamp-2">
            {description}
          </p>

          {/* Highlights tags */}
          <div className="flex flex-wrap gap-1.5 mt-3">
            {destination.highlights.slice(0, 3).map((hl, i) => (
              <span
                key={i}
                className="text-[10px] px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-neutral-400"
              >
                {hl}
              </span>
            ))}
          </div>
        </div>

        {/* CTA button */}
        <div className="mt-5 pt-3 border-t border-neutral-800/60 flex items-center justify-between">
          <span className="text-xs font-semibold text-[#D4AF37] group-hover:text-amber-300 transition-colors">
            {t.destinations_explore_btn}
          </span>
          <div className="w-7 h-7 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-black transition-all">
            <ArrowUpRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
  );
};
