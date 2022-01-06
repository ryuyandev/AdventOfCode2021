import { parseData, calculateResult } from './puzzle1.js'

export function run(data) {
  const { template, rules } = parseData(data)
  const pairs = processPolymer(template, rules, 40)
  const elementCounts = Object.entries(pairs)
    .reduce((elementCounts, [pair, count]) => {
      if (!elementCounts[pair[0]])
        elementCounts[pair[0]] = count
      else
        elementCounts[pair[0]] += count

      return elementCounts
    }, {})
  
  elementCounts[template[template.length - 1]]++

  return calculateResult(elementCounts)
}

function processPolymer(template, rules, steps) {
  let pairs = Object.keys(rules)
    .reduce((pairs, pair) => {
      pairs[pair] = 0

      return pairs
    }, {})
  
  template
    .split('')
    .reduce((a, b) => {
      pairs[a + b] = 1

      return b
    })

  for (let i = 0; i < steps; i++) {
    const newPairs = Object.assign({}, pairs)
    for (const pair in pairs) {
      const [firstElement, secondElement] = pair.split('')
      newPairs[firstElement + rules[pair]] += pairs[pair]
      newPairs[rules[pair] + secondElement] += pairs[pair]
      newPairs[pair] -= pairs[pair]
    }
    
    pairs = newPairs
  }
  
  return pairs
}