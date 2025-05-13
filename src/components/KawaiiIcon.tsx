
import React from 'react';

interface KawaiiIconProps {
  name: 'cherry-blossom' | 'heart' | 'star' | 'sparkle';
  className?: string;
  size?: number;
  color?: string;
}

export function KawaiiIcon({ name, className = "", size = 24, color = "currentColor" }: KawaiiIconProps) {
  const icons = {
    'cherry-blossom': (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width={size} height={size} className={className} fill={color}>
        <path d="M16,4c-1.1,0-2,0.9-2,2c0,0.7,0.4,1.4,1,1.7V11c0,0.6,0.4,1,1,1s1-0.4,1-1V7.7c0.6-0.3,1-1,1-1.7C18,4.9,17.1,4,16,4z"/>
        <path d="M7.7,15H4c-1.1,0-2,0.9-2,2s0.9,2,2,2h3.7c0.3,0.6,1,1,1.7,1c1.1,0,2-0.9,2-2C11.4,16.4,9.8,14.8,7.7,15z"/>
        <path d="M15,22.6V28c0,1.1,0.9,2,2,2s2-0.9,2-2v-5.4c0.6-0.3,1-1,1-1.7c0-1.1-0.9-2-2-2s-2,0.9-2,2C16,21.6,16.4,22.3,15,22.6z"/>
        <path d="M24.3,15H28c1.1,0,2,0.9,2,2s-0.9,2-2,2h-3.7c-0.3,0.6-1,1-1.7,1c-1.1,0-2-0.9-2-2C20.6,16.4,22.2,14.8,24.3,15z"/>
        <circle cx="16" cy="16" r="5"/>
      </svg>
    ),
    'heart': (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width={size} height={size} className={className} fill={color}>
        <path d="M16,28c-0.3,0-0.5-0.1-0.7-0.3L6.9,19.3C4.8,17.2,4,14.7,4,12c0-5,4-9,9-9c2.4,0,4.7,0.9,6.4,2.6l0.6,0.6l0.6-0.6 c1.7-1.7,4-2.6,6.4-2.6c5,0,9,4,9,9c0,2.7-0.8,5.2-2.9,7.3l-8.4,8.4C16.5,27.9,16.3,28,16,28z"/>
      </svg>
    ),
    'star': (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width={size} height={size} className={className} fill={color}>
        <path d="M16,4l3.5,7.1L28,12.5l-6,5.9l1.4,8.1L16,22.4l-7.4,3.9l1.4-8.1l-6-5.9l8.5-1.2L16,4z"/>
      </svg>
    ),
    'sparkle': (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width={size} height={size} className={className} fill={color}>
        <path d="M16,4v8l8-8l-8,8l8,8l-8-8l-8,8l8-8V4z M4,16h8l-8,8l8-8l-8-8l8,8l8-8l-8,8H4z M16,28v-8l-8,8l8-8l-8-8l8,8l8-8l-8,8V28z M28,16h-8l8-8l-8,8l8,8l-8-8l-8,8l8-8H28z"/>
      </svg>
    )
  };

  return <>{icons[name] || null}</>;
}
