/* eslint-disable import/prefer-default-export */
export const inRange = (
  number: number,
  start: number,
  end: number
): boolean => {
  if (number >= start && number <= end) return true;
  return false;
};
