import React, { useState } from 'react';
import { Language, DestinationItem } from '../types';
import { translations } from '../lib/localization';
import { DESTINATIONS_DATA } from '../lib/data';
import { DestinationCard } from '../components/DestinationCard';
import { MapPin, Globe, Sparkles, Filter } from 'lucide-react';

interface DestinationsViewProps {
  currentLanguage: Language;
  onSelectDestination: (destination: DestinationItem) => void;
}

export const DestinationsView: React.FC<DestinationsViewProps> = ({
  currentLanguage,
  onSelectDestination,
}) => {
  const t = translations[currentLanguage];
  const [filterRegion, setFilterRegion] = useState<string>('all');

  const filteredDestinations =
    filterRegion === 'all'
      ? DESTINATIONS_DATA
      : DESTINATIONS_DATA.filter((d) => d.region === filterRegion);

  const regions = [
    { id: 'all', label: 'All Destinations' },
    { id: 'middle-east', label: 'Middle East & Gulf' },
    { id: 'europe', label: 'Europe & Turkey' },
    { id: 'africa', label: 'Africa & East Africa' },
    { id: 'asia', label: 'Asia & Southeast Asia' },
  ];

  return (
    <div className="w-full py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Banner */}
      <div className="relative rounded-3xl overflow-hidden border border-[#D4AF37]/30 bg-[#121212] mb-10 shadow-2xl">
        <div className="h-64 sm:h-80 w-full relative">
          <img
            src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1800&q=85"
            alt="Dubai skyline at dusk"
            className="w-full h-full object-cover filter brightness-[0.4]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-[#121212]/60 to-transparent"></div>

          <div className="absolute bottom-6 left-6 right-6 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-xs text-amber-300 font-semibold mb-3">
              <Globe className="w-3.5 h-3.5" />
              <span>Global Travel Network</span>
            </div>
            <h1
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              Discover Premier Destinations
            </h1>
            <p className="text-xs sm:text-sm text-neutral-300 mt-2 max-w-2xl leading-relaxed">
              Explore the world's most sought-after travel hubs. Balcad Travel Agency manages flights, visas, and accommodations for every stop along your route.
            </p>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-neutral-800">
        <div className="flex items-center gap-2 text-xs text-neutral-400">
          <Filter className="w-4 h-4 text-[#D4AF37]" />
          <span>Filter by Region:</span>
        </div>

        <div className="flex flex-wrap gap-2">
          {regions.map((reg) => (
            <button
              key={reg.id}
              onClick={() => setFilterRegion(reg.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                filterRegion === reg.id
                  ? 'bg-[#D4AF37] text-black font-bold shadow-md'
                  : 'bg-neutral-900 border border-neutral-800 text-neutral-300 hover:border-neutral-700'
              }`}
            >
              {reg.label}
            </button>
          ))}
        </div>
      </div>

      {/* Destination Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDestinations.map((dest) => (
          <DestinationCard
            key={dest.id}
            destination={dest}
            currentLanguage={currentLanguage}
            onExploreOrRequest={onSelectDestination}
          />
        ))}
      </div>
    </div>
  );
};
