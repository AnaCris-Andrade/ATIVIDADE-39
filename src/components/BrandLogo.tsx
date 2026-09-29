import React from 'react';

interface BrandLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ 
  className = '', 
  size = 'md',
  showSubtitle = true 
}) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-10 h-10',
    lg: 'w-16 h-16'
  };

  const titleSizes = {
    sm: 'text-sm tracking-[0.2em]',
    md: 'text-lg tracking-[0.25em]',
    lg: 'text-2xl tracking-[0.3em]'
  };

  const subSizes = {
    sm: 'text-[9px] tracking-[0.3em]',
    md: 'text-[11px] tracking-[0.35em]',
    lg: 'text-[13px] tracking-[0.4em]'
  };

  return (
    <div className={`flex flex-col items-center select-none ${className}`}>
      {/* High heel silhouette based on user logo */}
      <svg 
        className={`${iconSizes[size]} text-[#B58263] transition-transform duration-300 hover:scale-105`} 
        viewBox="0 0 100 100" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path 
          d="M38 28C38 34 39.5 41 42 47C44.5 53 49 57.5 55 60.5C61 63.5 67 65 74 65.5C79 66 84 65 86 64L83 62C76 61.5 70 59.5 64 56.5C59 54 54 50 51 44C48 38 46.5 32 46.5 28L43 28L40 45L40 68C40 70 41 72 43 72.5L42 74C39 73 38 70 38 67L38 28Z" 
          stroke="currentColor" 
          strokeWidth="2.5" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
        />
        <circle cx="50" cy="74" r="1.5" fill="currentColor" />
      </svg>

      <span className={`font-serif-display font-medium text-[#241F1C] uppercase ${titleSizes[size]}`}>
        Calçados
      </span>

      {showSubtitle && (
        <div className="flex items-center gap-1.5 mt-0.5">
          <span className="w-4 h-[1px] bg-[#D4C3B3]"></span>
          <span className="text-[#B58263] text-[10px]">♥</span>
          <span className={`font-sans uppercase text-[#736357] font-medium ${subSizes[size]}`}>
            Feminino
          </span>
          <span className="w-4 h-[1px] bg-[#D4C3B3]"></span>
        </div>
      )}
    </div>
  );
};
