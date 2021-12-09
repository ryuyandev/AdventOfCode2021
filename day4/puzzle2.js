import { parseData } from './puzzle1.js'

export function run(data) {
  let { numbers, boards } = parseData(data)

  let lastBoards = null
  for (const num of numbers) {
    const winningBoards = boards.filter(board => board.markNumber(num))

    if (winningBoards.length) {
      boards = boards.filter(board => !winningBoards.includes(board))
      lastBoards = winningBoards
    }
  }

  return Math.min(...lastBoards.map(board => board.getScore()))
}