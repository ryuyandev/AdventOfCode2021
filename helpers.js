export const numericList = data => data
  .map(num => parseInt(num))

export const sumList = data => data
  .reduce((a, b) => a + b)