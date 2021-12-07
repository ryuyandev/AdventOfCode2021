import { promises as fs } from 'fs'
import path from 'path'

(async () => {
  try {
    const command = process.env.npm_lifecycle_event
    if (command === 'start') {
      const puzzles = Object.keys(process.env)
        .filter(key => key.startsWith('npm_package_scripts_day'))
        .map(key => ({
          puzzle: key
            .replace('npm_package_scripts_', '')
            .replace('_', ':'),
          argv: process.env[key].split(' ')
        }))
      
      for (const { puzzle, argv } of puzzles)
        await runCommand(puzzle, argv.pop())
    } else if (command.includes(':'))
      await runCommand(command, process.argv.pop())
    else
      console.error('Unexpected input. Use npm run script')
  } catch (e) {
    console.error(e)
  }
})()

async function runCommand(command, lastArg) {
  const [day, puzzle] = command.split(':')
  await runPuzzle(day, puzzle, lastArg)
}

async function runPuzzle(day, puzzle, lastArg) {
  const inputPath = path.resolve(day, 'input.txt')
  const input = await fs.readFile(inputPath)
  const data = input.toString()
    .split(lastArg === 'csv' ? ',' : '\n')

  const { calculate } = await import(`./${day}/${puzzle}.js`)
  console.log(`${day}:${puzzle}: ${calculate(data)}`)
}