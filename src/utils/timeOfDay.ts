export const TimeOfDay = {
  MORNING: "MORNING",
  AFTERNOON: "AFTERNOON",
  EVENING: "EVENING",
  NIGHT: "NIGHT",
} as const;

export const timeOfDay = (
  longitude: number,
): (typeof TimeOfDay)[keyof typeof TimeOfDay] => {
  const now = new Date();
  const hours = now.getUTCHours() + longitude / 15; // Convert longitude to time offset
  const localHours = Math.floor((hours + 24) % 24); // Ensure hours are within 0-23 range

  if (localHours >= 5 && localHours < 12) {
    return TimeOfDay.MORNING;
  } else if (localHours >= 12 && localHours < 18) {
    return TimeOfDay.AFTERNOON;
  } else if (localHours >= 18 && localHours < 21) {
    return TimeOfDay.EVENING;
  }

  return TimeOfDay.NIGHT;
};
