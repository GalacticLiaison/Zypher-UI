export function updateObject<T, K extends keyof T>(
  obj: T,
  propertyName: K,
  value: T[K]
): T {
  return {
    ...obj,
    [propertyName]: value,
  };
}
