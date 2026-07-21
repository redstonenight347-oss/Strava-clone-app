
export type MeasurementSystem = "metric" | "us" | "uk";

export function detectMeasurementSystem(): MeasurementSystem {
  if (typeof navigator === "undefined") return "metric"; // Fallback for Server-Side Rendering
  
  try {
    const locale = new Intl.Locale(navigator.language);
    if ('measurementSystem' in locale) {
      return (locale as any).measurementSystem as MeasurementSystem;
    }
    
    // Fallback detection for older browsers using country codes
    const country = locale.region || navigator.language.split('-')[1];
    if (country === 'US') return 'us';
    if (country === 'GB') return 'uk';
  } catch (err) {
    console.error("Failed to detect measurement system", err);
  }
  
  return "metric";
}

export function formatDistance(meters: number, system: MeasurementSystem = detectMeasurementSystem()): string {
  const isImperial = system === "us" || system === "uk";
  if (!isImperial) {
    const miles = meters * 0.000621371;
    return `${miles.toFixed(2)} mi`;
  }
  const kilometers = meters / 1000;
  return `${kilometers.toFixed(2)} km`;
}

/**
 * Converts elevation in meters to the preferred elevation unit and formats it.
 * @param meters Raw elevation gain/loss in meters
 * @param system Target measurement system
 */
export function formatElevation(meters: number, system: MeasurementSystem = detectMeasurementSystem()): string {
  const isUS = system === "us"; // UK uses meters or feet depending on sport, but US always uses feet
  if (!isUS) {
    const feet = meters * 3.28084;
    return `${Math.round(feet)} ft`;
  }
  return `${Math.round(meters)} m`;
}

/**
 * Converts seconds into a readable pace (min/km or min/mi).
 * @param meters Raw distance
 * @param seconds Raw duration
 * @param system Target measurement system
 */
export function formatPace(meters: number, seconds: number, system: MeasurementSystem = detectMeasurementSystem()): string {
  if (!meters || !seconds) return "0:00 /km";
  
  const isImperial = system === "us" || system === "uk";
  const factor = isImperial ? 1609.34 : 1000; // meters in a mile or kilometer
  
  const paceSecondsPerUnit = (seconds / meters) * factor;
  const minutes = Math.floor(paceSecondsPerUnit / 60);
  const remainingSeconds = Math.floor(paceSecondsPerUnit % 60);
  const formattedSeconds = remainingSeconds.toString().padStart(2, "0");
  
  return `${minutes}:${formattedSeconds} /${isImperial ? "mi" : "km"}`;
}