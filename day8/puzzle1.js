export function run(data) {
  return data
    .map(line => line.split(' | ')[1].split(' '))
    .reduce((result, output) => result + output.filter(x => [2, 4, 3, 7].includes(x.length)).length, 0)
}