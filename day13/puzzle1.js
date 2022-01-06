import { numericList } from '../helpers.js'

export function run(data) {
  const { paper, folds } = parseData(data)
  const result = foldPaper(paper, [folds[0]])

  return result.reduce((total, line) => {
    return total + line.filter(Boolean).length
  }, 0)
}

export function parseData(data) {
  const separatorIndex = data.indexOf('')
  
  const dots = data
    .slice(0, separatorIndex)
    .map(line => {
      const [x, y] = numericList(line.split(','))
      return { x, y }
    })

  const width = Math.max(...dots.map(({ x }) => x)) + 1
  const height = Math.max(...dots.map(({ y }) => y)) + 1
  const row = Array.from({ length: width }, () => false)
  const paper = Array.from({ length: height }, () => [...row])

  for (const { x, y } of dots)
    paper[y][x] = true

  const folds = data
    .slice(separatorIndex + 1)
    .reduce((folds, line) => {
      const [instruction, value] = line.split('=')
      folds.push({
        [`${instruction === 'fold along y' ? 'y' : 'x' }`]: parseInt(value)
      })

      return folds
    }, [])

  return { paper, folds }
}

export function foldPaper(paper, folds) {
  let fold = null
  for (const { x, y } of folds) {
    if (y) {
      fold = paper
        .slice(y + 1)
        .reverse()

      paper = paper
        .slice(0, y)
    } else {
      fold = paper
        .map(line => line
          .slice(x + 1)
          .reverse())

      paper = paper
        .map(line => line
          .slice(0, x))
    }

    const foldWidth = fold[0].length,
      paperWidth = paper[0].length
    const paperY = paper.length - fold.length,
      paperX = paperWidth - foldWidth 
    
    for (let y = 0; y < fold.length; y++) {
      for (let x = 0; x < foldWidth; x++) {
        paper[paperY + y][paperX + x] = paper[paperY + y][paperX + x] || fold[y][x]
      }
    }
  }

  return paper
}