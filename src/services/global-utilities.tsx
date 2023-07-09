export const isMobile = () => {
  return window.matchMedia("(max-width: 480px)").matches;
};

export const wait = (milliseconds: number) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};
