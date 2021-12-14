  export function run(data) {
  const result = data.reduce((result, command) => {
    let [direction, value] = command.split(' ')
    value = parseInt(value)
    
    switch (direction) {
      case 'forward':
        result.horizontal += value
        result.depth += result.aim * value
        break
      case 'down':
        result.aim += value
        break
      case 'up':
        result.aim -= value
        break
      default:
        console.log(`invalid input: ${direction}`)
    }

    return result
  }, {
    horizontal: 0,
    depth: 0,
    aim: 0
  })

  return result.horizontal * result.depth
}