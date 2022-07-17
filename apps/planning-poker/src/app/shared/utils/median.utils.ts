export const median = (numbers: number[]) => {
  if (!numbers.length) return undefined;
  let middle = Math.floor(numbers.length / 2);
  numbers = [...numbers].sort((a, b) => a - b);
  return numbers.length % 2 !== 0 ? numbers[middle] : (numbers[middle - 1] + numbers[middle]) / 2;
};
