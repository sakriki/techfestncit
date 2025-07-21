import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Censors profane words in a message, showing only the first letter and replacing the rest with asterisks.
 * @param message The message string to censor.
 * @param profaneWords Array of lowercase profane words to censor.
 * @returns The censored message.
 */
export function censorProfanity(message: string, profaneWords: string[]): string {
  // Split on word boundaries, keep punctuation
  return message.split(/(\b)/).map(word => {
    const lower = word.toLowerCase();
    if (profaneWords.includes(lower) && word.length > 1) {
      return word[0] + '*'.repeat(word.length - 1);
    }
    return word;
  }).join('');
}
