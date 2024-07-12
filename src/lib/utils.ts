import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getTimeElapsedString(date: Date): string {
  const now = new Date();
  const elapsedMilliseconds = now.getTime() - date.getTime();

  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;
  const month = 30 * day;
  const year = 365 * day;

  if (elapsedMilliseconds < minute) {
    return "just now";
  } else if (elapsedMilliseconds < hour) {
    const minutesAgo = Math.floor(elapsedMilliseconds / minute);
    return `${minutesAgo} min ago`;
  } else if (elapsedMilliseconds < day) {
    const hoursAgo = Math.floor(elapsedMilliseconds / hour);
    return `${hoursAgo} hour${hoursAgo > 1 ? "s" : ""} ago`;
  } else if (elapsedMilliseconds < month) {
    const daysAgo = Math.floor(elapsedMilliseconds / day);
    return `${daysAgo} day${daysAgo > 1 ? "s" : ""} ago`;
  } else if (elapsedMilliseconds < year) {
    const monthsAgo = Math.floor(elapsedMilliseconds / month);
    return `${monthsAgo} month${monthsAgo > 1 ? "s" : ""} ago`;
  } else {
    const yearsAgo = Math.floor(elapsedMilliseconds / year);
    return `${yearsAgo} year${yearsAgo > 1 ? "s" : ""} ago`;
  }
}

export function getPublicIdFromUrl(url: string): string | null {
  const regex = /\/v\d+\/([^/.]+\/[^/.]+)(?:\.[^/.]+)?$/;

  const match = url.match(regex);
  return match ? match[1] : null;
}
