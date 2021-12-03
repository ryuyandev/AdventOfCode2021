import { mostCommonBit } from './puzzle1.js'

export function calculate(data) {
  const oxygen = getReading(data, true),
    co2 = getReading(data, false)

  return parseInt(oxygen, 2) * parseInt(co2, 2)
}

function getReading(data, findMostCommon) {
  const totalBits = data[0].length
  
  for (let i = 0; i < totalBits; i++) {
    const currentBit = mostCommonBit(data
      .map(option => option[i]))
    
    data = data
      .filter(option => (option[i] === currentBit) === findMostCommon)
    
    if (data.length === 1)
      return data[0]
  }
}