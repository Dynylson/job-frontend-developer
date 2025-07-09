import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function playBotSound() {
  const audio = new Audio('/sounds/bot-message.mp3');

  audio.play().catch((error) => console.warn(error));
}

export function isMobile(): boolean {
  if (typeof window === 'undefined') return false;

  return window.innerWidth <= 640;
}
