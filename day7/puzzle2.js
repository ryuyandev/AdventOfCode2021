import { numericList } from '../helpers.js'
import { getLeastFuel } from './puzzle1.js'

export function run(data) {
  return getLeastFuel(numericList(data), getFuelCost)
}

function getFuelCost(num, num2) {
  const steps = Math.abs(num - num2)
  
  if (steps < 2)
    return steps

  return ((steps + 1) / 2) * steps
}