import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Used to merge multiple tailwind classes with conditional classes
export function cn(...inputs) {
    return twMerge(clsx(inputs));
}
