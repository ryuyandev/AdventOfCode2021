import { numericList } from '../helpers.js'
import { calculate as findIncreases } from './puzzle1.js'

export function calculate(data) {
  const denoisedData = numericList(data).reduce((result, _, index, arr) => {
    if (index != 0 && index != arr.length - 1) {
      result.push(arr[index - 1] + arr[index] + arr[index + 1])
    }
    return result
  }, [])

  return findIncreases(denoisedData)
}