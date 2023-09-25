import { DateTime } from "luxon";

export const inRangeDateTime = (value?: number, min?: number, max?: number): boolean => {
  if (!min && !max) return true;
  if (typeof value !== 'number') return false;

  const valueDate = DateTime.fromMillis(value);
  if (!valueDate) return false;

  const newMin = min ? DateTime.fromMillis(min) : null;
  const newMax = max ? DateTime.fromMillis(max) : null;

  if (newMin && !newMax) {
    return valueDate >= newMin.set({ second: 0, millisecond: 0 });
  }

  if (!newMin && newMax) {
    return valueDate <= newMax.set({ second: 59, millisecond: 59 });
  }

  if (newMin && newMax) {

    if (newMin > newMax) {
      return valueDate >= newMax.set({ second: 0, millisecond: 0 }) && valueDate <= newMin.set({ second: 59, millisecond: 59 });
    }

    return valueDate >= newMin.set({ second: 0, millisecond: 0 }) && valueDate <= newMax.set({ second: 59, millisecond: 59 });
  }

  return false;
};
