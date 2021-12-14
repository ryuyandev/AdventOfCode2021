import { numericGrid } from '../helpers.js'

export function run(data) {
  let total = 0

  for (const point of getLowPoints(numericGrid(data)))
    total += point.value + 1
  
  return total
}

export function* getLowPoints(grid) {
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      const value = grid[y][x]

      if (value === 9)
        continue
      
      const higher = []
        
      if (y)
        higher.push(grid[y - 1][x] > value)
      if (x)
        higher.push(grid[y][x - 1] > value)
      if (y < grid.length - 1)
        higher.push(grid[y + 1][x] > value)
      if (x < grid[y].length - 1)
        higher.push(grid[y][x + 1] > value)

      if (higher.every(Boolean))
        yield { value, x, y }
    }
  }
}