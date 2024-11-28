export const inRangeNumber = (value?: number, min?: number, max?: number) => {
  console.log(min, max, value)

  if (min === null && max === null) return true;
  if (typeof value !== 'number') return false;

  if (min != null && max === null) {
    return value >= min;
  }

  if (min === null && max != null) {
    return value <= max;
  }

  if (min != null && max != null) {

    if (min > max) {
      return value >= max && value <= min;
    }

    return value >= min && value <= max;
  }

  return false;
};
