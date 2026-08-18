export const getWeatherIcon = (
  code: number | undefined,
) => {
  switch (code) {
    case 0:
    case 1:
      return { src: "src/assets/images/icon-sunny.webp", alt: "Sunny Weather" };
    case 2:
      return {
        src: "src/assets/images/icon-partly-cloudy.webp",
        alt: "Partly cloudy Weather",
      };
    case 3:
      return {
        src: "src/assets/images/icon-overcast.webp",
        alt: "Overcast Weather",
      };
    case 45:
    case 48:
      return { src: "src/assets/images/icon-fog.webp", alt: "Foggy Weather" };
    case 51:
    case 53:
    case 55:
    case 56:
    case 57:
      return {
        src: "src/assets/images/icon-drizzle.webp",
        alt: "Drizzle Weather",
      };
    case 61:
    case 63:
    case 65:
    case 66:
    case 67:
    case 80:
    case 81:
    case 82:
      return { src: "src/assets/images/icon-rain.webp", alt: "Rainy Weather" };
    case 71:
    case 73:
    case 75:
    case 77:
    case 85:
    case 86:
      return { src: "src/assets/images/icon-snow.webp", alt: "Snow Weather" };
    case 95:
    case 96:
    case 99:
    default:
      return {
        src: "src/assets/images/icon-storm.webp",
        alt: "Stormy Weather",
      };
  }
};
