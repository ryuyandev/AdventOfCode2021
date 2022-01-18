import { numericGrid, numericList, sumList } from '../helpers.js'
import { Grid, getLowestRisk } from './puzzle1.js'

export function run(data) {
  const costs = numericGrid(data)
  const grid = new BigGrid(costs, costs.length, costs[0].length)
  
  return getLowestRisk(grid)
}

class BigGrid extends Grid {
  constructor(costs, rows, cols) {
    super(costs, rows * 5, cols * 5)
    this.realRows = rows
    this.realCols = cols
  }

  *getAdjacentPoints(x, y) {
    if (x)
      yield { x: x - 1, y, cost: this.getCost(x - 1, y) }
    if (y)
      yield { x, y: y - 1, cost: this.getCost(x, y - 1) }
    if (x < this.cols - 1)
      yield { x: x + 1, y, cost: this.getCost(x + 1, y) }
    if (y < this.rows - 1)
      yield { x, y: y + 1, cost: this.getCost(x, y + 1) }
  }

  getCost(x, y) {
    const adjustment = Math.floor(x / this.realCols) + Math.floor(y / this.realRows)
    const cost = this.costs[y % this.realRows][x % this.realCols] + adjustment
    return cost > 9 ? cost - 9 : cost
  }
}