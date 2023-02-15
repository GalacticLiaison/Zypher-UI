export const isMobile = () => {
  return window.matchMedia("(max-width: 480px)").matches;
};
