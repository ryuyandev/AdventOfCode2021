export const numericList = data => data
  .map(num => parseInt(num))

export const numericGrid = (data) => data
  .map(line => numericList(line.split('')))

export const sumList = data => data
  .reduce((a, b) => a + b)