export default function Logo({ size = 'default', showText = true }) {
  const isSmall = size === 'small';

  return (
    <div className="flex items-center gap-2.5 group select-none">
      <div 
        className={`relative flex items-center justify-center rounded-xl bg-gradient-to-br from-red-600 via-rose-600 to-amber-500 text-white shadow-lg shadow-red-600/30 group-hover:shadow-red-600/50 group-hover:scale-105 transition-all duration-300 ${
          isSmall ? 'w-8 h-8' : 'w-10 h-10'
        }`}
      >
        <svg 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg" 
          className={isSmall ? 'w-4 h-4' : 'w-5 h-5'}
        >
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" strokeDasharray="4 2" className="opacity-60" />
          <path 
            d="M10 8.5L16 12L10 15.5V8.5Z" 
            fill="currentColor" 
          />
          <circle cx="17.5" cy="6.5" r="1.5" fill="#fef08a" />
        </svg>

        <span className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-red-500 to-amber-500 opacity-0 group-hover:opacity-30 blur-sm transition-opacity duration-300 -z-10" />
      </div>

      {showText && (
        <span className={`font-black tracking-tight flex items-center ${isSmall ? 'text-lg' : 'text-xl sm:text-2xl'}`}>
          <span className="text-white">Cine</span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-rose-400">Verse</span>
        </span>
      )}
    </div>
  );
}
