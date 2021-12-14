import { promises as fs } from 'fs'
import path from 'path'

(async () => {
  try {
    const command = process.env.npm_lifecycle_event
    if (command === 'start') {
      const puzzles = Object.keys(process.env)
        .filter(key => key.startsWith('npm_package_scripts_day'))
        .map(key => {
          const command = key
            .replace('npm_package_scripts_', '')
            .replace('_', ':')
          const [day, puzzle] = command.split(':')

          return {
            command,
            sortOrder: parseInt(day.substring(3)) * 10 + parseInt(puzzle.substring(6)),
            argv: process.env[key].split(' ')
          }
        })
        .sort((a, b) => a.sortOrder - b.sortOrder)
      
      for (const { command, argv } of puzzles)
        await runCommand(command, argv.pop())
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

  const { run } = await import(`./${day}/${puzzle}.js`)
  console.log(`${day}:${puzzle}: ${run(data)}`)
}