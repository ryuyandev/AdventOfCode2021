export function calculate(data) {
  const grid = plotLines(parseLines(data)
    .filter(([x1, y1, x2, y2]) => x1 === x2 || y1 === y2))

  return getIntersectionCount(grid)
}

export function parseLines(data) {
  return data
    .map(item => item.replace(' -> ', ',')
      .split(',')
      .map(num => parseInt(num)))
}

export function plotLines(lines) {
  return lines
    .reduce((grid, [x1, y1, x2, y2]) => {
      const xDirection = -Math.sign(x1 - x2),
        yDirection = -Math.sign(y1 - y2)
      
      plotPoint(grid, x1, y1) // starting point
      while (x1 != x2 || y1 != y2) {
        if (x1 != x2)
          x1 += xDirection

        if (y1 != y2)
          y1 += yDirection
        
        plotPoint(grid, x1, y1)
      }
        
      return grid
    }, [])
}

function plotPoint(grid, x, y) {
  if (!grid[y])
    grid[y] = []

  if (!grid[y][x])
    grid[y][x] = 1
  else
    grid[y][x]++
}

export function getIntersectionCount(grid) {
  return grid
    .flat()
    .filter(point => point > 1)
    .length
}