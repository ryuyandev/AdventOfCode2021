import { parseData, foldPaper } from './puzzle1.js'

export function run(data) {
  const { paper, folds } = parseData(data)
  const result = foldPaper(paper, folds)

  return `\n${result
    .map(line => line
      .map(point => point ? '#' : '.')
      .join(''))
    .join('\n')}\n`
}