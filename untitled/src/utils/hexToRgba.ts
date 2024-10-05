export const hexToRgba = (hex: string, newOpacity: number) => {
  let r = 0,
    g = 0,
    b = 0,
    a = 1;

  // Check if the hex includes an alpha channel
  if (hex.length === 9) {
    r = parseInt(hex.slice(1, 3), 16);
    g = parseInt(hex.slice(3, 5), 16);
    b = parseInt(hex.slice(5, 7), 16);
    a = parseInt(hex.slice(7, 9), 16) / 255; // Convert alpha from 0-255 to 0-1
  }
  // Check if the hex is a short form (e.g., #RGB)
  else if (hex.length === 7) {
    r = parseInt(hex.slice(1, 3), 16);
    g = parseInt(hex.slice(3, 5), 16);
    b = parseInt(hex.slice(5, 7), 16);
  }
  // Handle short form with opacity
  else if (hex.length === 5) {
    r = parseInt(hex[1] + hex[1], 16);
    g = parseInt(hex[2] + hex[2], 16);
    b = parseInt(hex[3] + hex[3], 16);
    a = parseInt(hex[4] + hex[4], 16) / 255; // Convert alpha from 0-255 to 0-1
  }

  // Override the opacity with the new value
  return `rgba(${r}, ${g}, ${b}, ${newOpacity || a})`;
};
