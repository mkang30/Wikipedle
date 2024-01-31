export function isWithin24Hours(date1: Date, date2: Date): boolean {
  const MILLISECONDS_IN_DAY = 86400000; // 24 hours in milliseconds
  const date1StartOfDay = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate());
  const date2StartOfDay = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate());
  const date1Time = date1.getTime() - date1StartOfDay.getTime();
  const date2Time = date2.getTime() - date2StartOfDay.getTime();
  const timeDiff = Math.abs(date1Time - date2Time);
  return timeDiff < MILLISECONDS_IN_DAY && date1StartOfDay.getTime() !== date2StartOfDay.getTime();
}

export function formatElapsedTime(elapsedTime: number): string {
  if (elapsedTime < 0) throw new Error('elapsedTime cannot be negative');
  const totalSeconds = Math.floor(elapsedTime / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}m ${seconds}s`;
}