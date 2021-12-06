import { parseLines, plotLines, getIntersectionCount } from './puzzle1.js'

export function calculate(data) {
  const grid = plotLines(parseLines(data))

  return getIntersectionCount(grid)
}