export const heroScrollTransition = {
  // Hero exit phase — delayed so content stays visible until scrap section covers it
  heroExit: {
    progress: [0.3, 0.75] as [number, number],
    headlineY: [0, -60] as [number, number],
    headlineOpacity: [1, 0] as [number, number],
    imageY: [0, -40] as [number, number],
    imageScale: [1, 0.92] as [number, number],
    imageOpacity: [1, 0] as [number, number],
    bgOpacity: [1, 0.15] as [number, number],
  },
  // Transition overlay — stronger bridge, peaks later as sections overlap
  overlay: {
    progress: [0.15, 0.5, 0.85] as [number, number, number],
    opacity: [0, 0.85, 0] as [number, number, number],
  },
};
