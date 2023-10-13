export const matchString = (a: string | number | null, b: string | number | null): boolean => {

  if (
    a === null ||
    b === null ||
    a === undefined ||
    b === undefined
  ) return false

  let newB = b.toString()
  let negative = false
  if (newB.charAt(0) === '!') {
    newB = newB.substring(1)
    negative = true
  }

  const cmpA = a.toString().normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  const cmpB = newB.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  const result = cmpA.includes(cmpB);

  if (negative) {
    return !result
  }

  return result;
};
