import { numericGrid, numericList, sumList } from '../helpers.js'

export function run(data) {
  const costs = numericGrid(data)
  const grid = new Grid(costs, costs.length, costs[0].length)

  return getLowestRisk(grid)
}

export class Grid {
  constructor(costs, rows, cols) {
    this.costs = costs
    this.rows = rows
    this.cols = cols
  }

  *getAdjacentPoints(x, y) {
    if (x)
      yield { x: x - 1, y, cost: this.costs[y][x - 1] }
    if (y)
      yield { x, y: y - 1, cost: this.costs[y - 1][x] }
    if (x < this.cols - 1)
      yield { x: x + 1, y, cost: this.costs[y][x + 1] }
    if (y < this.rows - 1)
      yield { x, y: y + 1, cost: this.costs[y + 1][x] }
  }
}

export function getLowestRisk(grid) {
  const distanceGrid = Array.from({ length: grid.rows },
    () => Array.from({ length: grid.cols }, () => Infinity)),
    currentNodes = [{ x: 0, y: 0}]
    
  distanceGrid[0][0] = 0

  while (currentNodes.length) {
    const currentNodeCount = currentNodes.length
    for (let i = currentNodeCount - 1; i >= 0; i--) {
      const { x: currentX, y: currentY } = currentNodes[i]
      const currentCost = distanceGrid[currentY][currentX]
      
      for (const { x, y, cost } of grid.getAdjacentPoints(currentX, currentY)) {
        const newCost = cost + currentCost
        if (newCost < distanceGrid[y][x]) {
          distanceGrid[y][x] = newCost
          currentNodes.push({ x, y })
        }
      }
    }

    currentNodes.splice(0, currentNodeCount)
  }

  return distanceGrid[grid.rows - 1][grid.cols - 1]
}