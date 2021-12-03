import { promises as fs } from 'fs'
import path from 'path'

(async () => {
  try {
    const [day, puzzle] = process.env.npm_lifecycle_event.split(':')
    const inputPath = path.resolve(day, 'input.txt')
    const input = await fs.readFile(inputPath)
    const data = input.toString()
      .split('\n')

    const { calculate } = await import(`./${day}/${puzzle}.js`)
    console.log(calculate(data))
  } catch (e) {
    console.error(e)
  }
})()