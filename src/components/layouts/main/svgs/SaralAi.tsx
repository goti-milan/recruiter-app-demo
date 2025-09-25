import * as React from "react";

const SaralAiIcon: React.FC<{
    isActive?: boolean;
}> = ({ isActive = false }) =>
    isActive ? (
<svg width="24" height="24" viewBox="0 0 24 24" role="img" aria-label="Saral AI (selected)" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="saralGradient" x1="3" y1="21" x2="21" y2="3" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#6C2BD9"/>
      <stop offset="1" stop-color="#22D3EE"/>
    </linearGradient>
    <filter id="saralGlow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="1.2" result="blur"/>
      <feMerge>
        <feMergeNode in="blur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>

  <rect x="2" y="2" width="20" height="20" rx="6" fill="url(#saralGradient)"/>

  <path filter="url(#saralGlow)"
        d="M7.2 9.1c0-2.2 2.1-3.7 5-3.7 2 0 3.8.6 4.7 1.5M16.8 14.9c0 2.2-2.1 3.7-5 3.7-2 0-3.8-.6-4.7-1.5"
        fill="none" stroke="#FFFFFF" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
  
  <circle cx="17.2" cy="6.4" r="1.1" fill="#FFFFFF" opacity=".95"/>
</svg>

    ) : (
<svg width="24" height="24" viewBox="0 0 24 24" role="img" aria-label="Saral AI (unselected)" xmlns="http://www.w3.org/2000/svg">
  <rect x="2.5" y="2.5" width="19" height="19" rx="6" fill="none" stroke="currentColor" stroke-width="1.5" opacity=".6"/>

  <path d="M7.4 9.2c0-2.1 2-3.5 4.8-3.5 1.9 0 3.5.6 4.4 1.4M16.6 14.8c0 2.1-2 3.5-4.8 3.5-1.9 0-3.5-.6-4.4-1.4"
        fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" opacity=".9"/>

  <circle cx="17" cy="6.6" r="1" fill="currentColor" opacity=".8"/>
</svg>

    );

export default SaralAiIcon;
