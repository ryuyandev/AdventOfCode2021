import { numericList } from '../helpers.js'
import { simulateFish } from './puzzle1.js'

export function run(data) {
  return simulateFish(numericList(data), 256)
}