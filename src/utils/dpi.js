export const qrSizePx = (sizeMm) => {
  // Convert mm to pixels using a DPI value (default: 96 DPI for web)
  return !import.meta.env.SSR
    ? Math.round(sizeMm * ((window.devicePixelRatio * 96) / 25.4))
    : (sizeMm * 96) / 25.4;
};
