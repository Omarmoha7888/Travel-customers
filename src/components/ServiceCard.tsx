import React from 'react';
import { ServiceItem, Language } from '../types';
import { translations } from '../lib/localization';
import {
  Plane,
  FileCheck,
  Building2,
  Moon,
  Compass,
  Car,
  BookOpen,
  Globe,
  MapPin,
  PlusCircle,
  ArrowRight,
} from 'lucide-react';

interface ServiceCardProps {
  service: ServiceItem;
  currentLanguage: Language;
  onRequest: (serviceId: string) => void;
  onExplore?: (route: string) => void;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  currentLanguage,
  onRequest,
  onExplore,
}) => {
  const t = translations[currentLanguage];

  // Title & description from localization
  const title = (t as any)[service.titleKey] || service.id;
  const description = (t as any)[service.descKey] || '';

  // Icon mapping
  const renderIcon = () => {
    const iconClass = 'w-5 h-5 text-black';
    switch (service.iconName) {
      case 'Plane':
        return <Plane className={iconClass} />;
      case 'FileCheck':
        return <FileCheck className={iconClass} />;
      case 'Building2':
        return <Building2 className={iconClass} />;
      case 'Moon':
        return <Moon className={iconClass} />;
      case 'Compass':
        return <Compass className={iconClass} />;
      case 'Car':
        return <Car className={iconClass} />;
      case 'BookOpen':
        return <BookOpen className={iconClass} />;
      case 'Globe':
        return <Globe className={iconClass} />;
      case 'MapPin':
        return <MapPin className={iconClass} />;
      default:
        return <PlusCircle className={iconClass} />;
    }
  };

  const handleCardClick = () => {
    if (service.pageRoute && onExplore) {
      onExplore(service.pageRoute);
    } else {
      onRequest(service.id);
    }
  };

  return (
    <div
      onClick={handleCardClick}
      className="group relative rounded-2xl overflow-hidden bg-[#121212] border border-neutral-800/80 hover:border-[#D4AF37]/60 transition-all duration-300 flex flex-col justify-between cursor-pointer shadow-lg hover:shadow-2xl hover:shadow-amber-950/20"
      id={`service-card-${service.id}`}
    >
      {/* Background Image Container with Gradient Overlay */}
      <div className="relative h-44 w-full overflow-hidden">
        <img
          src={service.image}
          alt={title}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
          loading="lazy"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-[#121212]/50 to-transparent"></div>

        {service.badge && (
          <span className="absolute top-3 right-3 text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full bg-[#0a0a0a]/80 text-[#f3c64f] border border-amber-500/30 backdrop-blur-sm">
            {service.badge}
          </span>
        )}

        {/* Circular Gold Icon Badge sitting at the boundary */}
        <div className="absolute -bottom-3 left-4 w-10 h-10 rounded-xl bg-gradient-to-tr from-[#C59B27] via-[#F3C64F] to-[#FFE28A] flex items-center justify-center shadow-md shadow-black/60 group-hover:scale-110 transition-transform">
          {renderIcon()}
        </div>
      </div>

      {/* Content details */}
      <div className="p-5 pt-6 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-base font-bold text-white group-hover:text-[#F3C64F] transition-colors leading-snug">
            {title}
          </h3>
          <p className="text-xs text-neutral-400 mt-2 leading-relaxed line-clamp-2">
            {description}
          </p>
        </div>

        {/* Bottom action row with "Request Service" & circular gold arrow */}
        <div className="mt-5 pt-3 border-t border-neutral-900 flex items-center justify-between">
          <span className="text-xs font-semibold text-[#D4AF37] group-hover:text-white transition-colors">
            {t.service_request_btn}
          </span>

          <div className="w-7 h-7 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#F3C64F] flex items-center justify-center text-black shadow-sm group-hover:translate-x-1 transition-transform">
            <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
          </div>
        </div>
      </div>
    </div>
  );
};
