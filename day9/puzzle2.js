import { numericGrid, getLowPoints } from './puzzle1.js'

export function run(data) {
  const grid = numericGrid(data)
  const basinSizes = [...getLowPoints(grid)]
    .map(({ x, y }) => getBasinSize(grid, x, y))
    .sort((a, b) => b - a)

  return basinSizes[0] * basinSizes[1] * basinSizes[2]
}

function getBasinSize(grid, x, y) {
  const points = new Set([`${x},${y}`])
  
  let nextPoints = [{x, y}]
  while (nextPoints.length) {
    nextPoints = nextPoints.reduce((newPoints, { x, y }) => {
      function checkPoint(x, y) {
        const point = `${x},${y}`
        if (grid[y] !== undefined && grid[y][x] !== undefined && grid[y][x] !== 9 && !points.has(point)) {
          newPoints.push({ x, y })
          points.add(point)
        }
      }
      
      checkPoint(x - 1, y)
      checkPoint(x + 1, y)
      checkPoint(x, y - 1)
      checkPoint(x, y + 1)

      return newPoints
    }, [])
  }

  return points.size
}