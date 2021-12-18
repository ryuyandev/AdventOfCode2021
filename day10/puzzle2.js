import { parseLine, SyntaxError, symbols } from './puzzle1.js'

export function run(data) {
  const scoreList = data
    .reduce((scoreList, line) => {
      const { error, openSymbols } = parseLine(line)
      if (error === SyntaxError.incomplete) {
        scoreList.push(openSymbols
          .reverse()
          .reduce((total, char) => (total * 5) + scores[symbols[char]], 0))
      }

      return scoreList
    }, [])
    .sort((a, b) => a - b)

  return scoreList[Math.floor(scoreList.length / 2)]
}

const scores = {
  ')': 1,
  ']': 2,
  '}': 3,
  '>': 4
}