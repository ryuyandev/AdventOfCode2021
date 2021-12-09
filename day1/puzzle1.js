import { numericList } from '../helpers.js'

export function run(data) {
  return findIncreases(numericList(data))
}

export function findIncreases(data) {
  let result = 0

  data.reduce((a, b) => {
    if (b > a)
      result++
    return b
  })

  return result
}