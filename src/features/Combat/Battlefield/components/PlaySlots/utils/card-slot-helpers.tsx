const MINIMUM_SLOTS = 3;

export const determineNumberOfSlots = (slotLayout: Map<number, any>) => {
  return Math.max(MINIMUM_SLOTS, slotLayout.size);
};

export const determineSlotWidth = (slotLayout: Map<number, any>) => {
  return 12 / determineNumberOfSlots(slotLayout) > 3
    ? 2
    : 12 / determineNumberOfSlots(slotLayout);
};

//   const MINIMUM_SLOTS = 3;

// export const determineNumberOfSlots = (slotLayout: any[]) => {
//   return Math.max(MINIMUM_SLOTS, slotLayout.length);
// };

// export const determineSlotWidth = (slotLayout: any[]) => {
//   return 12 / determineNumberOfSlots(slotLayout) > 3
//     ? 2
//     : 12 / determineNumberOfSlots(slotLayout);
// };

// export const determineSlots = (slotLayout: Map<number, any>) => {
//   const slots = mapToSlots(slotLayout);
//   if (slots.length < MINIMUM_SLOTS) {
//     for (let i = slots.length; i < MINIMUM_SLOTS; i++) {
//       slots.push(null);
//     }
//   }
//   return slots;
// };

// export const mapToSlots = (slotLayout: Map<number, any>): any[] => {
//   const slots: any[] = [];
//   for (let i = 0; i < slotLayout.size; i++) {
//     const slot = slotLayout.get(i);
//     if (slot === undefined) {
//       console.warn("slot is undefined");
//       continue;
//     }
//     // Developer Note: Again be careful with complex props,
//     // need to pass a fresh reference to detect change
//     slots.push(slot ? { ...slot } : null);
//   }
//   return slots;
// };
