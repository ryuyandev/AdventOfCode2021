export function run(data) {
  return data
    .reduce((total, line) => {
      const { error, char } = parseLine(line)
      if (error === SyntaxError.corrupt)
        total += scores[char]

      return total
    }, 0)
}

export const SyntaxError = {
  incomplete: 'incomplete',
  corrupt: 'corrupt'
}

export function parseLine(line) {
  const openSymbols = []
  for (const char of line.split('')) {
    if (char in symbols)
      openSymbols.push(char)
    else if (symbols[openSymbols.pop()] !== char)
      return {
        error: SyntaxError.corrupt,
        char
      }
  }

  if (openSymbols.length)
    return {
      error: SyntaxError.incomplete,
      openSymbols
    }
  
  return {
    error: null
  }
}

export const symbols = {
  '(': ')',
  '[': ']',
  '{': '}',
  '<': '>'
}

const scores = {
  ')': 3,
  ']': 57,
  '}': 1197,
  '>': 25137
}