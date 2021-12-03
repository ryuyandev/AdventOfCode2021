import { promises as fs } from 'fs'
import path from 'path'

(async () => {
  try {
    const command = process.env.npm_lifecycle_event
    if (command === 'start') {
      const {
        default: { scripts }
      } = await import('./package.json')
      const puzzles = Object.keys(scripts)
        .filter(script => script.startsWith('day'))
      
      for (const puzzle of puzzles)
        await runCommand(puzzle)
    } else if (command.includes(':'))
      await runCommand(command)
    else
      console.error('Unexpected input. Use npm run script')
  } catch (e) {
    console.error(e)
  }
})()

async function runCommand(command) {
  const [day, puzzle] = command.split(':')
  await runPuzzle(day, puzzle)
}

async function runPuzzle(day, puzzle) {
  const inputPath = path.resolve(day, 'input.txt')
    const input = await fs.readFile(inputPath)
    const data = input.toString()
      .split('\n')

    const { calculate } = await import(`./${day}/${puzzle}.js`)
    console.log(`${day}:${puzzle}: ${calculate(data)}`)
}