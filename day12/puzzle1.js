export function run(data, doubleVisits=false) {
  const caveSystem = getCaveSystem(data)
  const paths = getPaths(caveSystem, doubleVisits)

  return paths.length
}

function getCaveSystem(data) {
  return data.reduce((caveSystem, connection) => {
    const [cave, destination] = connection.split('-')

    if (!caveSystem[cave])
      caveSystem[cave] = []

    if (!caveSystem[destination])
      caveSystem[destination] = []
    
    if (destination !== 'start')
      caveSystem[cave].push({
        name: destination,
        large: destination === destination.toUpperCase()
      })
    
    if (cave !== 'start')
      caveSystem[destination].push({
        name: cave,
        large: cave === cave.toUpperCase()
      })

    return caveSystem
  }, {})
}

function getPaths(caveSystem, doubleVisits) {
  const paths = []

  let currentPaths = [{ moves: ['start'], doubleVisited: false }]
  while (currentPaths.length) {
    currentPaths = currentPaths
      .reduce((currentPaths, { moves, doubleVisited }) => {
        currentPaths.push(...caveSystem[moves[moves.length - 1]]
          .reduce((newPaths, { name, large }) => {
            if (name === 'end')
              paths.push(moves.concat('end'))
            else if (large || !moves.includes(name))
              newPaths.push({ doubleVisited, moves: moves.concat(name) })
            else if (doubleVisits && !doubleVisited)
              newPaths.push({ doubleVisited: true, moves: moves.concat(name) })

            return newPaths
          }, []))

        return currentPaths
      }, [])
    }

  return paths
}