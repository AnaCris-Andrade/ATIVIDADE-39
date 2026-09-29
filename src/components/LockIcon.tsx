import React from 'react';

interface LockIconProps {
  className?: string;
  size?: number;
}

export const LockIcon: React.FC<LockIconProps> = ({ className = '', size = 80 }) => {
  return (
    <div 
      className={`relative inline-flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Outer Circular Refresh / Cycle Arrows in deep navy / indigo */}
        <path
          d="M 50 14 A 36 36 0 0 1 86 50 A 36 36 0 0 1 76 74"
          stroke="#2A385B"
          strokeWidth="6"
          strokeLinecap="round"
        />
        {/* Bottom Arrow Head */}
        <path
          d="M 82 66 L 76 74 L 66 70"
          stroke="#2A385B"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <path
          d="M 50 86 A 36 36 0 0 1 14 50 A 36 36 0 0 1 24 26"
          stroke="#2A385B"
          strokeWidth="6"
          strokeLinecap="round"
        />
        {/* Top Arrow Head */}
        <path
          d="M 18 34 L 24 26 L 34 30"
          stroke="#2A385B"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Padlock Shackle in Gold */}
        <path
          d="M 37 42 V 33 C 37 26 42 21 50 21 C 58 21 63 26 63 33 V 42"
          stroke="#F5A623"
          strokeWidth="7"
          strokeLinecap="round"
        />

        {/* Padlock Body in Warm Red/Orange */}
        <rect
          x="30"
          y="42"
          width="40"
          height="34"
          rx="9"
          fill="#EE523C"
        />

        {/* Padlock Highlight */}
        <path
          d="M 39 46 Q 50 43 61 46"
          stroke="#FF7B68"
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        {/* Keyhole */}
        <circle cx="50" cy="56" r="3" fill="#D9F1FF" />
        <rect x="48.5" y="56" width="3" height="6" rx="1.5" fill="#D9F1FF" />
      </svg>
    </div>
  );
};
