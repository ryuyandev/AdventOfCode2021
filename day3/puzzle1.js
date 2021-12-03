export function calculate(data) {
  const totalBits = data[0].length

  let gamma = '',
    epsilon = ''
  for (let i = 0; i < totalBits; i++) {
    const currentBit = mostCommonBit(data.map(x => x[i]))
    gamma += currentBit
    epsilon += currentBit === '1'
      ? '0'
      : '1'
  }

  return parseInt(gamma, 2) * parseInt(epsilon, 2)
}

export function mostCommonBit(bits) {
  return bits
      .filter(bit => bit === '1')
      .length >= bits.length / 2
      ? '1'
      : '0'
}