

export type PreferencesType = {
  userId: string,
  theme: "system" | "dark" | "light",
  distanceUnit: "metric" | "imperial",
  elevationUnit: "meters" | "feet",
  timeFormat: "12h" | "24h",
}