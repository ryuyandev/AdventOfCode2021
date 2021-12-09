import { numericList } from '../helpers.js'

export function run(data) {
  return getLeastFuel(numericList(data), (num, num2) => Math.abs(num - num2))
}

export function getLeastFuel(data, getFuelCost) {
  const checkedCosts = {}
  return range(Math.min(...data), Math.max(...data))
    .reduce((result, num) => {
      if (num in checkedCosts)
        return result
      
      checkedCosts[num] = true
      const newResult = data.reduce((cost, num2) => cost + getFuelCost(num, num2), 0)

      if (newResult < result || result === null)
        return newResult

      return result
    }, null)
}

function range(start, end) {
  return Array.from({ length: end - start + 1}, (_, i) => i + start)
}