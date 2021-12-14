import { numericGrid } from '../helpers.js'
import { simulateOctopuses } from './puzzle1.js'

export function run(data) {
  const grid = numericGrid(data)
  
  let steps = 0
  while (true) {
    steps++
    simulateOctopuses(grid, 1)
    
    if (grid.every(row => row.every(col => col === 0)))
      return steps
  }
}