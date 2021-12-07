import { numericList, sumList } from '../helpers.js'

export function calculate(data) {
  return simulateFish(numericList(data), 80)
}

export function simulateFishSlowly(fish, days) {
  for (let i = 0; i < days; i++) {
  	const newFish = Array.from({
      length: fish.filter(f => !f).length
    }, () => 8)
  	
    fish = fish
      .map(f => !f ? 6 : f - 1)
      .concat(newFish)
  }
  
  return fish.length
}

export function simulateFishLessSlowly(fish, days) {
  for (let i = 0; i < days; i++) {
    const currentFish = fish.length
  	for (let j = 0; j < currentFish; j++) {
      if (fish[j])
        fish[j]--
      else {
        fish[j] = 6
        fish.push(8)
      }
    }
  }
  
  return fish.length
}

export function simulateFish(fish, days) {
  const fishDays = 9
  let fishCounts = fish.reduce((result, fishCount) => {
    result[fishCount]++
    return result
  }, Array.from({ length: fishDays }, () => 0))

  for (let i = 0; i < days; i++) {
    fishCounts = fishCounts.reduce((result, fishCount, index) => {
      if (!index)
        result[6] = result[8] = fishCount
      else
        result[index - 1] += fishCount
        
      return result
    }, Array.from({ length: fishDays }, () => 0))
  }

  return sumList(fishCounts)
}