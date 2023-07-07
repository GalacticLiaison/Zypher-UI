const MINIMUM_SLOTS = 3;

export const determineNumberOfSlots = (slotLayout: Map<number, any>) => {
  return Math.max(MINIMUM_SLOTS, slotLayout.size);
};

export const determineSlotWidth = (slotLayout: Map<number, any>) => {
  return 12 / determineNumberOfSlots(slotLayout) > 3
    ? 2
    : 12 / determineNumberOfSlots(slotLayout);
};
