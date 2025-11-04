
import React from 'react';

// FIX: Added explicit type to iconProps to satisfy SVG property type requirements.
const iconProps: React.SVGAttributes<SVGSVGElement> = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "2",
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

export const Sparkles: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...iconProps} {...props}><path d="m12 3-1.9 5.8-5.8 1.9 5.8 1.9 1.9 5.8 1.9-5.8 5.8-1.9-5.8-1.9z"/></svg>
);

export const Library: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...iconProps} {...props}><path d="m16 6 4 14"/><path d="M12 6v14"/><path d="M8 8v12"/><path d="M4 4v16"/></svg>
);

export const Copy: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg {...iconProps} {...props}><rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path></svg>
);

export const Check: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg {...iconProps} {...props}><polyline points="20 6 9 17 4 12"></polyline></svg>
);
