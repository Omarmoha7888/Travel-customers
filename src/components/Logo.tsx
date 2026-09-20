import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  variant?: 'horizontal' | 'stacked' | 'emblem';
  showText?: boolean;
  onClick?: () => void;
}

/**
 * Official Balcad Travel Agency Emblem Mark.
 * Exact 1:1 vector recreation of the official uploaded brand logo:
 * - 100% Solid 3D polished metallic Gold letter 'B' (both top & bottom lobes)
 * - 3D Spherical globe nestled inside the lower loop of 'B' with golden grid & continents
 * - Dynamic golden orbital swoosh wrapping from lower-left around the globe
 * - Soaring golden commercial airliner flying out towards the top-right
 */
export const BalcadEmblem: React.FC<{
  size?: number;
  className?: string;
  glow?: boolean;
}> = ({ size = 48, className = '', glow = true }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 500 500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`select-none shrink-0 transition-transform duration-300 ${className}`}
      aria-label="Balcad Travel Agency Official Emblem"
    >
      <defs>
        {/* Core Rich Metallic Gold Gradient */}
        <linearGradient id="balcadGoldMain" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF2A3" />
          <stop offset="20%" stopColor="#F5D061" />
          <stop offset="50%" stopColor="#DE9F18" />
          <stop offset="80%" stopColor="#B37805" />
          <stop offset="100%" stopColor="#7E5202" />
        </linearGradient>

        {/* Specular Highlight Gold Gradient */}
        <linearGradient id="balcadGoldHighlight" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#E2AE29" />
          <stop offset="35%" stopColor="#FFFCE5" />
          <stop offset="65%" stopColor="#F5D061" />
          <stop offset="100%" stopColor="#B37805" />
        </linearGradient>

        {/* Dynamic Bevel Gold Gradient */}
        <linearGradient id="balcadGoldBevel" x1="15%" y1="0%" x2="85%" y2="100%">
          <stop offset="0%" stopColor="#FFF9D2" />
          <stop offset="30%" stopColor="#F7C948" />
          <stop offset="70%" stopColor="#C88E12" />
          <stop offset="100%" stopColor="#8C5C00" />
        </linearGradient>

        {/* Dynamic Swoosh Flight Gradient */}
        <linearGradient id="balcadSwooshGrad" x1="0%" y1="90%" x2="100%" y2="10%">
          <stop offset="0%" stopColor="#FFEAA0" />
          <stop offset="30%" stopColor="#FFF8D0" />
          <stop offset="60%" stopColor="#EAB324" />
          <stop offset="100%" stopColor="#BA7B05" />
        </linearGradient>

        {/* Globe Sphere Radial Depth */}
        <radialGradient id="balcadGlobeSphere" cx="38%" cy="32%" r="68%">
          <stop offset="0%" stopColor="#2D3035" />
          <stop offset="45%" stopColor="#15171A" />
          <stop offset="85%" stopColor="#0A0B0D" />
          <stop offset="100%" stopColor="#000000" />
        </radialGradient>

        {/* Subtle Ambient Gold Glow */}
        {glow && (
          <filter id="balcadGoldGlow" x="-15%" y="-15%" width="130%" height="130%">
            <feDropShadow dx="0" dy="2" stdDeviation="3.5" floodColor="#F5D061" floodOpacity="0.32" />
          </filter>
        )}

        {/* Soft 3D Drop Shadow */}
        <filter id="balcadDepthShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="5" stdDeviation="5" floodColor="#000000" floodOpacity="0.55" />
        </filter>
      </defs>

      {/* ---------------------------------------------------- */}
      {/* 1. SOLID ALL-GOLD LETTER 'B' BODY (TOP & BOTTOM)     */}
      {/* ---------------------------------------------------- */}
      <g filter="url(#balcadDepthShadow)">
        {/* Main Vertical Stem of 'B' */}
        <path
          d="M 125 58 
             L 215 58 
             L 215 442 
             L 125 442 
             Z"
          fill="url(#balcadGoldMain)"
        />

        {/* Top Serif Foot */}
        <path
          d="M 85 58 
             L 215 58 
             L 215 95 
             L 155 95 
             C 142 95, 130 85, 125 75 
             L 85 58 
             Z"
          fill="url(#balcadGoldHighlight)"
        />

        {/* Bottom Serif Foot */}
        <path
          d="M 85 442 
             L 215 442 
             L 215 405 
             L 155 405 
             C 142 405, 130 415, 125 425 
             L 85 442 
             Z"
          fill="url(#balcadGoldBevel)"
        />

        {/* Upper Lobe of 'B' (Outer) */}
        <path
          d="M 215 58 
             L 305 58 
             C 362 58, 405 92, 405 152 
             C 405 208, 362 238, 305 238 
             L 215 238 
             Z"
          fill="url(#balcadGoldBevel)"
        />

        {/* Upper Lobe Counter Cutout */}
        <path
          d="M 215 110 
             L 295 110 
             C 328 110, 348 126, 348 152 
             C 348 178, 328 192, 295 192 
             L 215 192 
             Z"
          fill="#0a0a0c"
        />

        {/* Lower Lobe of 'B' (Outer) - 100% Solid Gold */}
        <path
          d="M 215 225 
             L 325 225 
             C 395 225, 452 268, 452 334 
             C 452 402, 395 442, 325 442 
             L 215 442 
             Z"
          fill="url(#balcadGoldMain)"
        />

        {/* Lower Lobe Bevel Highlight */}
        <path
          d="M 215 225 
             L 325 225 
             C 390 225, 442 265, 448 325 
             C 435 272, 385 240, 325 240 
             L 215 240 
             Z"
          fill="url(#balcadGoldHighlight)"
          opacity="0.8"
        />

        {/* Lower Lobe Counter Cavity (Housing the Globe) */}
        <path
          d="M 215 285 
             L 315 285 
             C 362 285, 388 308, 388 340 
             C 388 375, 362 395, 315 395 
             L 215 395 
             Z"
          fill="#050608"
        />

        {/* Stem Left Edge Bevel Sheen */}
        <path
          d="M 125 58 
             L 142 58 
             L 142 442 
             L 125 442 
             Z"
          fill="url(#balcadGoldHighlight)"
          opacity="0.65"
        />
      </g>

      {/* ---------------------------------------------------- */}
      {/* 2. 3D GOLD & BLACK GLOBE (INSIDE LOWER 'B' LOOP)      */}
      {/* ---------------------------------------------------- */}
      <g id="globe-unit" transform="translate(290, 342)" filter="url(#balcadDepthShadow)">
        {/* Dark Globe Base Sphere */}
        <circle cx="0" cy="0" r="76" fill="url(#balcadGlobeSphere)" stroke="url(#balcadGoldMain)" strokeWidth="2.5" />

        {/* Golden Longitude & Latitude Coordinate Grid */}
        <ellipse cx="0" cy="0" rx="76" ry="38" fill="none" stroke="#D89E19" strokeWidth="1.2" strokeOpacity="0.6" />
        <ellipse cx="0" cy="0" rx="38" ry="76" fill="none" stroke="#D89E19" strokeWidth="1.2" strokeOpacity="0.6" />
        <line x1="-76" y1="0" x2="76" y2="0" stroke="#F5D061" strokeWidth="1.4" strokeOpacity="0.75" />
        <line x1="0" y1="-76" x2="0" y2="76" stroke="#F5D061" strokeWidth="1.4" strokeOpacity="0.75" />

        {/* Golden African Continent (Front & Center) */}
        <path
          d="M -16 -46 
             C -4 -50, 16 -42, 22 -32 
             C 26 -22, 14 -15, 18 0 
             C 24 14, 30 32, 15 48 
             C 5 58, -8 54, -18 44 
             C -28 34, -26 22, -20 8 
             C -15 -4, -22 -18, -16 -34 
             Z"
          fill="url(#balcadGoldHighlight)"
          opacity="0.95"
        />

        {/* Golden Europe & Middle East Landmass */}
        <path
          d="M 14 -34 
             C 26 -42, 45 -38, 54 -26 
             C 62 -12, 58 10, 46 22 
             C 34 26, 26 18, 24 6 
             C 22 -8, 16 -22, 14 -34 
             Z"
          fill="url(#balcadGoldHighlight)"
          opacity="0.9"
        />

        {/* Horn of Africa Detail (Somalia) */}
        <path
          d="M 18 -2 
             C 28 2, 38 10, 32 18 
             C 26 22, 20 12, 18 -2 
             Z"
          fill="#FFF4A3"
          opacity="0.95"
        />

        {/* Ambient Specular Sheen */}
        <ellipse cx="-22" cy="-28" rx="36" ry="22" fill="#FFFFFF" opacity="0.14" />
      </g>

      {/* ---------------------------------------------------- */}
      {/* 3. DYNAMIC GOLDEN ORBITAL SWOOSH LOOP                 */}
      {/* ---------------------------------------------------- */}
      <g filter={glow ? 'url(#balcadGoldGlow)' : undefined}>
        {/* Main Sweeping Orbital Flight Path */}
        <path
          d="M 52 352 
             C 38 318, 62 258, 140 215 
             C 225 168, 335 152, 422 142 
             C 362 165, 258 198, 178 248 
             C 108 292, 75 352, 105 385 
             C 135 418, 235 442, 335 415 
             C 305 428, 215 435, 145 420 
             C 85 405, 58 375, 52 352 
             Z"
          fill="url(#balcadSwooshGrad)"
        />

        {/* Inner Light Ring Accent */}
        <path
          d="M 68 348 
             C 88 288, 175 222, 325 175 
             C 255 198, 155 248, 108 315 
             C 82 352, 92 375, 125 392 
             C 102 382, 82 368, 68 348 
             Z"
          fill="#FFF8D0"
          opacity="0.7"
        />
      </g>

      {/* ---------------------------------------------------- */}
      {/* 4. SOARING GOLD COMMERCIAL AIRPLANE                  */}
      {/* ---------------------------------------------------- */}
      <g
        id="soaring-airliner"
        transform="translate(422, 146) rotate(42) scale(1.18)"
        filter={glow ? 'url(#balcadGoldGlow)' : undefined}
      >
        {/* Fuselage, Wings & Tail Fin in Pure Gleaming Gold */}
        <path
          d="M 0 -34 
             C 2.5 -34, 5.5 -20, 5.5 -6 
             L 32 10 
             L 30 16 
             L 5.5 9 
             L 4.5 24 
             L 14 31 
             L 12 36 
             L 0 32 
             L -12 36 
             L -14 31 
             L -4.5 24 
             L -5.5 9 
             L -30 16 
             L -32 10 
             L -5.5 -6 
             C -5.5 -20, -2.5 -34, 0 -34 
             Z"
          fill="url(#balcadGoldHighlight)"
        />

        {/* Airliner Center Dorsal Specular Highlight */}
        <ellipse cx="0" cy="-6" rx="2" ry="18" fill="#FFFFFF" opacity="0.65" />

        {/* Wing Tip Navigation Beacons */}
        <circle cx="31" cy="13" r="1.5" fill="#FFFCE5" />
        <circle cx="-31" cy="13" r="1.5" fill="#FFFCE5" />
      </g>
    </svg>
  );
};

/**
 * Universal Balcad Travel Agency Brand Logo.
 * Exact horizontal and stacked layout matching the user's uploaded official banner:
 * [ 3D Golden B Emblem with Globe & Plane ] | [ BALCAD ]
 *                                            [ TRAVEL AGENCY ]
 */
export const Logo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
  variant = 'horizontal',
  showText = true,
  onClick,
}) => {
  // Scaling settings across responsive breakpoints
  const sizeMap = {
    xs: {
      emblem: 32,
      dividerH: 'h-7',
      title: 'text-base sm:text-lg tracking-[0.06em]',
      sub: 'text-[7.5px] sm:text-[8px] tracking-[0.24em]',
      gap: 'gap-2 sm:gap-2.5',
    },
    sm: {
      emblem: 42,
      dividerH: 'h-9',
      title: 'text-lg sm:text-xl tracking-[0.07em]',
      sub: 'text-[9px] sm:text-[9.5px] tracking-[0.26em]',
      gap: 'gap-2.5 sm:gap-3',
    },
    md: {
      emblem: 52,
      dividerH: 'h-11 sm:h-12',
      title: 'text-2xl sm:text-[28px] tracking-[0.08em]',
      sub: 'text-[10px] sm:text-[11px] tracking-[0.28em]',
      gap: 'gap-3 sm:gap-3.5',
    },
    lg: {
      emblem: 64,
      dividerH: 'h-14 sm:h-16',
      title: 'text-3xl sm:text-4xl tracking-[0.08em]',
      sub: 'text-[12px] sm:text-[13px] tracking-[0.3em]',
      gap: 'gap-3.5 sm:gap-4',
    },
    xl: {
      emblem: 80,
      dividerH: 'h-18 sm:h-20',
      title: 'text-4xl sm:text-5xl tracking-[0.09em]',
      sub: 'text-[14px] sm:text-[15px] tracking-[0.32em]',
      gap: 'gap-4 sm:gap-5',
    },
    '2xl': {
      emblem: 110,
      dividerH: 'h-24 sm:h-28',
      title: 'text-6xl sm:text-7xl tracking-[0.1em]',
      sub: 'text-[18px] sm:text-[20px] tracking-[0.35em]',
      gap: 'gap-5 sm:gap-6',
    },
  };

  const conf = sizeMap[size];

  // 1. EMBLEM ONLY VARIANT
  if (variant === 'emblem' || !showText) {
    return (
      <div
        onClick={onClick}
        className={`inline-flex items-center justify-center ${onClick ? 'cursor-pointer hover:opacity-95 transition-opacity' : ''} ${className}`}
        id="balcad-emblem-badge"
      >
        <BalcadEmblem size={conf.emblem} />
      </div>
    );
  }

  // 2. STACKED VARIANT
  if (variant === 'stacked') {
    return (
      <div
        onClick={onClick}
        className={`inline-flex flex-col items-center text-center select-none ${onClick ? 'cursor-pointer group' : ''} ${className}`}
        id="balcad-logo-stacked"
      >
        <div className="relative group-hover:scale-105 transition-transform duration-300">
          <BalcadEmblem size={conf.emblem} />
        </div>

        {/* Wordmark BALCAD */}
        <span
          className={`font-black uppercase leading-none mt-2.5 text-transparent bg-clip-text bg-gradient-to-b from-[#FFF5A5] via-[#F3C53C] to-[#996904] drop-shadow-[0_2px_4px_rgba(0,0,0,0.85)] ${conf.title}`}
          style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", fontWeight: 900 }}
        >
          BALCAD
        </span>

        {/* Subtitle TRAVEL AGENCY */}
        <span
          className={`font-bold uppercase leading-none mt-1.5 text-[#F5D061] drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)] ${conf.sub}`}
          style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", fontWeight: 700 }}
        >
          TRAVEL AGENCY
        </span>
      </div>
    );
  }

  // 3. HORIZONTAL LOCKUP (The exact official layout in the user's uploaded banner)
  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center ${conf.gap} select-none ${onClick ? 'cursor-pointer group' : ''} ${className}`}
      id="brand-logo-container"
    >
      {/* 1. Official 3D Gold Emblem */}
      <div className="relative shrink-0 group-hover:scale-105 transition-transform duration-300">
        <BalcadEmblem size={conf.emblem} />
      </div>

      {/* 2. Vertical Gold Divider Line (from user's logo) */}
      <div
        className={`w-[1.8px] sm:w-[2.2px] ${conf.dividerH} rounded-full bg-gradient-to-b from-[#FFF2A3] via-[#E2AE29] to-[#8C5C00] shadow-[0_0_6px_rgba(226,174,41,0.4)] shrink-0`}
      />

      {/* 3. Typography Lockup (BALCAD / TRAVEL AGENCY) */}
      <div className="flex flex-col justify-center">
        {/* BALCAD Header */}
        <span
          className={`font-black uppercase leading-none text-transparent bg-clip-text bg-gradient-to-b from-[#FFF8B0] via-[#F3C53C] to-[#996904] drop-shadow-[0_2px_4px_rgba(0,0,0,0.85)] ${conf.title}`}
          style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", fontWeight: 900 }}
        >
          BALCAD
        </span>

        {/* TRAVEL AGENCY Subtitle */}
        <span
          className={`font-bold uppercase leading-none mt-1.5 text-[#F5D061] drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)] ${conf.sub}`}
          style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", fontWeight: 700 }}
        >
          TRAVEL AGENCY
        </span>
      </div>
    </div>
  );
};

export default Logo;
