//* Story: Player earns Xenogen by completing missions, stores, defeating enemies, etc.
//* Story: Applying a gene or a specific mutation costs Xenogen
export interface Xenogen {
  standard: number;
  rare: number;
  epic: number;
  legendary: number;
}

export const getXenogen = (): Xenogen => {
  return {} as Xenogen;
};

const setXenogen = (xenogen: Xenogen): void => {};

export const useXenogen = (cost: Xenogen): void => {
  // setXenogen(getXenogen() - cost);
};

export const addXenogen = (amount: Xenogen): void => {
  // setXenogen(getXenogen() + amount);
};
