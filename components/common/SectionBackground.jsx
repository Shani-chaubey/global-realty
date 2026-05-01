"use client";

// Real-estate themed SVG icons as inline React components
const HouseIcon = () => (
  <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 45L50 10l40 35v45H10V45z" />
    <path d="M35 90V65h30v25" />
    <path d="M20 55h15v20H20z" />
    <path d="M65 55h15v20H65z" />
    <path d="M50 10v5" />
  </svg>
);

const KeyIcon = () => (
  <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="35" cy="40" r="20" />
    <path d="M50 50l35 35" />
    <path d="M72 72l10-10" />
    <path d="M80 80l10-10" />
  </svg>
);

const LocationPinIcon = () => (
  <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <path d="M50 10C33 10 20 23 20 40c0 22 30 50 30 50s30-28 30-50c0-17-13-30-30-30z" />
    <circle cx="50" cy="40" r="10" />
  </svg>
);

const BuildingIcon = () => (
  <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <rect x="15" y="20" width="30" height="70" />
    <rect x="55" y="35" width="30" height="55" />
    <path d="M15 90h70" />
    <rect x="22" y="28" width="8" height="8" />
    <rect x="38" y="28" width="8" height="8" />
    <rect x="22" y="45" width="8" height="8" />
    <rect x="38" y="45" width="8" height="8" />
    <rect x="22" y="62" width="8" height="8" />
    <rect x="38" y="62" width="8" height="8" />
    <rect x="62" y="45" width="8" height="8" />
    <rect x="75" y="45" width="8" height="8" />
    <rect x="62" y="62" width="8" height="8" />
    <rect x="75" y="62" width="8" height="8" />
  </svg>
);

const BlueprintIcon = () => (
  <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <rect x="10" y="10" width="80" height="80" rx="3" />
    <path d="M25 10v80M10 25h80M10 50h80M10 75h80M50 10v80M75 10v80" />
    <rect x="30" y="30" width="20" height="25" />
    <path d="M38 55v10" />
  </svg>
);

const TreeIcon = () => (
  <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <path d="M50 8L20 45h20L25 72h50L60 45h20L50 8z" />
    <path d="M50 72v20M40 92h20" />
  </svg>
);

const PoolIcon = () => (
  <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <rect x="10" y="45" width="80" height="40" rx="5" />
    <path d="M10 62c10-8 20 8 30 0s20-8 30 0s10 8 20 0" />
    <path d="M35 45V30M65 45V30" />
    <path d="M25 30h50" />
  </svg>
);

const CoinsIcon = () => (
  <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <ellipse cx="40" cy="30" rx="25" ry="10" />
    <path d="M15 30v15c0 5.5 11.2 10 25 10s25-4.5 25-10V30" />
    <path d="M15 45v15c0 5.5 11.2 10 25 10s25-4.5 25-10V45" />
    <ellipse cx="65" cy="65" rx="20" ry="8" />
    <path d="M45 65v15c0 4.4 9 8 20 8s20-3.6 20-8V65" />
  </svg>
);

const GrowthIcon = () => (
  <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 85h80" />
    <path d="M10 85V20" />
    <polyline points="20,75 40,50 58,62 82,25" />
    <circle cx="20" cy="75" r="4" fill="currentColor" />
    <circle cx="40" cy="50" r="4" fill="currentColor" />
    <circle cx="58" cy="62" r="4" fill="currentColor" />
    <circle cx="82" cy="25" r="4" fill="currentColor" />
  </svg>
);

const SofaIcon = () => (
  <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <rect x="15" y="50" width="70" height="30" rx="5" />
    <rect x="25" y="35" width="50" height="20" rx="4" />
    <rect x="10" y="45" width="15" height="35" rx="4" />
    <rect x="75" y="45" width="15" height="35" rx="4" />
    <path d="M20 80v10M80 80v10" />
  </svg>
);

const WindowIcon = () => (
  <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <rect x="15" y="15" width="70" height="70" rx="3" />
    <path d="M50 15v70M15 50h70" />
    <path d="M22 22l12 12M66 22l12 12M22 66l12 12M66 66l12 12" />
  </svg>
);

const GarageIcon = () => (
  <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <rect x="10" y="35" width="80" height="55" rx="3" />
    <path d="M10 55h80M10 70h80" />
    <path d="M50 15L15 35h70L50 15z" />
    <rect x="35" y="82" width="30" height="8" />
  </svg>
);

const ICON_MAP = {
  house: HouseIcon,
  key: KeyIcon,
  location: LocationPinIcon,
  building: BuildingIcon,
  blueprint: BlueprintIcon,
  tree: TreeIcon,
  pool: PoolIcon,
  coins: CoinsIcon,
  growth: GrowthIcon,
  sofa: SofaIcon,
  window: WindowIcon,
  garage: GarageIcon,
};

const DEFAULT_CONFIGS = {
  hero:    [
    { icon: "house",    top: "8%",   left: "5%",   size: 160, rotate: -10, delay: 0 },
    { icon: "key",      top: "15%",  right: "6%",  size: 140, rotate: 15,  delay: 2 },
    { icon: "location", bottom: "12%", left: "8%",  size: 120, rotate: -5,  delay: 4 },
    { icon: "building", bottom: "8%", right: "4%",  size: 180, rotate: 8,   delay: 1 },
  ],
  about: [
    { icon: "coins",    top: "5%",   left: "3%",   size: 150, rotate: -12, delay: 0 },
    { icon: "growth",   top: "10%",  right: "5%",  size: 130, rotate: 10,  delay: 3 },
    { icon: "house",    bottom: "5%",right: "8%",  size: 160, rotate: -6,  delay: 1 },
  ],
  services: [
    { icon: "blueprint",top: "8%",   left: "2%",   size: 140, rotate: 15,  delay: 2 },
    { icon: "key",      top: "5%",   right: "3%",  size: 120, rotate: -8,  delay: 0 },
    { icon: "house",    bottom: "8%",left: "5%",   size: 155, rotate: 5,   delay: 3 },
    { icon: "growth",   bottom: "5%",right: "5%",  size: 130, rotate: -10, delay: 1 },
  ],
  properties: [
    { icon: "house",    top: "5%",   left: "2%",   size: 170, rotate: -8,  delay: 0 },
    { icon: "location", top: "10%",  right: "4%",  size: 130, rotate: 12,  delay: 2 },
    { icon: "coins",    bottom: "5%",left: "6%",   size: 140, rotate: 5,   delay: 4 },
    { icon: "garage",   bottom: "8%",right: "3%",  size: 155, rotate: -12, delay: 1 },
  ],
  testimonials: [
    { icon: "sofa",     top: "5%",   left: "2%",   size: 160, rotate: -10, delay: 0 },
    { icon: "window",   top: "8%",   right: "4%",  size: 130, rotate: 8,   delay: 3 },
    { icon: "tree",     bottom: "5%",left: "5%",   size: 140, rotate: 5,   delay: 1 },
  ],
  contact: [
    { icon: "location", top: "5%",   left: "3%",   size: 150, rotate: -15, delay: 0 },
    { icon: "house",    top: "10%",  right: "5%",  size: 140, rotate: 10,  delay: 2 },
    { icon: "pool",     bottom: "5%",right: "4%",  size: 130, rotate: -5,  delay: 1 },
  ],
};

export default function SectionBackground({ section = "hero", icons, className = "" }) {
  const iconConfig = icons || DEFAULT_CONFIGS[section] || DEFAULT_CONFIGS.hero;

  return (
    <div
      className={`section-bg-icons ${className}`}
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 0,
      }}
    >
      {iconConfig.map((cfg, i) => {
        const IconComponent = ICON_MAP[cfg.icon] || HouseIcon;
        const posStyle = {};
        if (cfg.top !== undefined) posStyle.top = cfg.top;
        if (cfg.bottom !== undefined) posStyle.bottom = cfg.bottom;
        if (cfg.left !== undefined) posStyle.left = cfg.left;
        if (cfg.right !== undefined) posStyle.right = cfg.right;

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              width: cfg.size || 150,
              height: cfg.size || 150,
              opacity: 0.055,
              color: "var(--primary, #dc3545)",
              ...posStyle,
              animationDelay: `${cfg.delay || 0}s`,
              animation: `floatIcon 18s ease-in-out ${cfg.delay || 0}s infinite`,
              transform: `rotate(${cfg.rotate || 0}deg)`,
            }}
          >
            <IconComponent />
          </div>
        );
      })}
    </div>
  );
}
