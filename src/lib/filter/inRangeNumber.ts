export const inRangeNumber = (value?: number, min?: number, max?: number) => {
  const minIsNumber = typeof min === 'number';
  const maxIsNumber = typeof max === 'number';

  if (!minIsNumber && !maxIsNumber) return true;
  if (typeof value !== 'number') return false;

  if (minIsNumber && !maxIsNumber) {
    return value >= min;
  }

  if (!minIsNumber && maxIsNumber) {
    return value <= max;
  }

  if (minIsNumber && maxIsNumber) {

    if (min > max) {
      return value >= max && value <= min;
    }

    return value >= min && value <= max;
  }

  return false;
};
