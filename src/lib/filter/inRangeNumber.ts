export const inRangeNumber = (value?: number, min?: number, max?: number) => {
  if (!min && !max) return true;
  if (typeof value !== 'number') return false;

  if (min && !max) {
    return value >= min;
  }

  if (!min && max) {
    return value <= max;
  }

  if (min && max) {

    if (min > max) {
      return value >= max && value <= min;
    }

    return value >= min && value <= max;
  }

  return false;
};
