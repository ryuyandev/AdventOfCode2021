export function run(data) {
  const { template, rules } = parseData(data)
  const polymer = processPolymer(template, rules, 10)
  const elementsCounts = polymer
    .reduce((elements, element) => {
      if (!elements[element])
        elements[element] = 1
      else
        elements[element]++

      return elements
    }, {})

  return calculateResult(elementsCounts)
}

export function parseData(data) {
  const template = data.shift()
  const rules = data
    .slice(1)
    .reduce((rules, line) => {
      const [pair, element] = line.split(' -> ')
      rules[pair] = element

      return rules
    }, {})

  return { template, rules }
}

function processPolymer(template, rules, steps) {
  let result = template.split('')

  for (let i = 0; i < steps; i++) {
    const newResult = []
    for (let j = 0; j < result.length - 1; j++) {
      newResult.push(result[j])
      newResult.push(rules[result[j] + result[j + 1]])
    }

    newResult.push(result[result.length - 1])

    result = newResult
  }

  return result
}

export function calculateResult(elementCounts) {
  const orderedCounts = Object.entries(elementCounts)
    .filter(elementCount => elementCount[1])
    .sort((a, b) => a[1] - b[1])
  
  return orderedCounts[orderedCounts.length - 1][1] - orderedCounts[0][1]
}