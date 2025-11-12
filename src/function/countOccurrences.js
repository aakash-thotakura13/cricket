
export function countOccurrences(arr) {

  const result = {};

  for (let i = 0; i <= 6; i++) {
    result[i] = 0;
  };

  for (const num of arr) {
    if (num >= 0 && num <= 6) {
      result[num] += 1;
    }
  };

  return result;

};