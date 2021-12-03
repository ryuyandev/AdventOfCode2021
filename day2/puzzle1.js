export function calculate(data) {
  const result = data.reduce((result, command) => {
    let [direction, value] = command.split(' ')
    value = parseInt(value)
    
    switch (direction) {
      case 'forward':
        result.horizontal += value
        break
      case 'down':
        result.depth += value
        break
      case 'up':
        result.depth -= value
        break
      default:
        console.log(`invalid input: ${direction}`)
    }

    return result
  }, {
    horizontal: 0,
    depth: 0
  })

  return result.horizontal * result.depth
}