import { sumList } from '../helpers.js'

export function run(data) {
  const { numbers, boards } = parseData(data)

  for (const num of numbers) {
    const winningBoards = boards.filter(board => board.markNumber(num))

    if (winningBoards.length)
      return Math.max(...winningBoards.map(board => board.getScore()))
  }
}

export function parseData(data) {
  const numbers = data.shift().split(',')
  const boards = data.reduce((boards, row) => {
    if (row === '')
      boards.push(new BingoBoard())
    else
      boards[boards.length - 1].addRow(row)

    return boards
  }, [])

  return { numbers, boards }
}

class BingoBoard {
  rows = []
  numbers = {}
  lastNum = ''

  addRow(row) {
    const newNumbers = [...row.matchAll(/\d+/g)].map(match => match[0])
    this.numbers = newNumbers
      .reduce((numbers, num, index) => {
        numbers[num] = {
          row: this.rows.length,
          col: index
        }
        
        return numbers
      }, this.numbers)
    
    this.rows.push(newNumbers.map(num => false))
  }

  markNumber(num) {
    if (!this.numbers[num])
      return false

    const { row, col } = this.numbers[num]
    this.rows[row][col] = this.numbers[num].marked = true
    this.lastNum = num
    
    return this.rows[row].every(cell => cell)
      || this.rows.every(row => row[col])
  }

  getScore() {
    return parseInt(this.lastNum) * sumList(Object.keys(this.numbers)
        .filter(boardNum => !this.numbers[boardNum].marked)
        .map(boardNum => parseInt(boardNum)))
  }
}