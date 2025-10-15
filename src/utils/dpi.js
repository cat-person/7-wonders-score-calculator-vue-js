export const qrSizePx = (sizeMm) => {
  // Convert mm to pixels using a DPI value (default: 96 DPI for web)
  const dpi = typeof window !== "undefined" ? window.devicePixelRatio * 96 : 96;
  return Math.round(sizeMm * (dpi / 25.4)); // Round to nearest integer for pixel value
};
