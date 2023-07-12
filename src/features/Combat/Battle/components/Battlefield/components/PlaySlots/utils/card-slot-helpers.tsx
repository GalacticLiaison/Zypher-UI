import { MINIMUM_SLOTS } from "../../../../../../Combat";

export const determineSlotWidth = (slotLayout: Array<any>) => {
  return 12 / determineNumberOfSlots(slotLayout) > 3
    ? 2
    : 12 / determineNumberOfSlots(slotLayout);
};

export const determineNumberOfSlots = (slotLayout: Array<any>) => {
  return Math.max(MINIMUM_SLOTS, slotLayout.length);
};
