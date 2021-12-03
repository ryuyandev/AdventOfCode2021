import { numericList } from '../helpers.js'

export function calculate(data) {
  let result = 0

  numericList(data).reduce((a, b) => {
    if (b > a)
      result++
    return b
  })

  return result
}