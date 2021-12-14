import { numericGrid } from '../helpers.js'

export function run(data) {
  return simulateOctopuses(numericGrid(data), 100)
}

export function simulateOctopuses(grid, steps) {
  const gridSize = grid.length
  let flashCount = 0,
    flashes = []

  function flash(x, y) {
    grid[y][x] = 0
    flashes[y][x] = true
    flashCount++

    const startingY = y === 0 ? 0 : y - 1,
      endingY = y + 1 === gridSize ? y : y + 1,
      startingX = x === 0 ? 0 : x - 1,
      endingX = x + 1 === gridSize ? x : x + 1
    for (y = startingY; y <= endingY; y++) {
      for (x = startingX; x <= endingX; x++) {
        if (flashes[y][x])
          continue
        
        if (++grid[y][x] > 9)
          flash(x, y)
      }
    }
  }
  
  for (let i = 0; i < steps; i++) {
    flashes = Array.from({ length: gridSize }, () => 
      Array.from({ length: gridSize }, () => false))

    for (let y = 0; y < gridSize; y++) {
      for (let x = 0; x < gridSize; x++) {
        if (flashes[y][x])
          continue

        if (++grid[y][x] > 9)
          flash(x, y)
      }
    }
  }

  return flashCount
}