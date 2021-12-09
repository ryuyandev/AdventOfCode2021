export function run(data) {
  const { Screen, signalBits } = getImportantStuff()
  return data.reduce((result, line) => {
    const screenBits = {}
    
    const [signals, output] = line
      .split(' | ')
      .map(piece => piece
        .split(' ')
        .map(word => word
          .split('')
          .reduce((bits, letter) => bits |= signalBits[letter], 0)))
    
    const translator = new Translator(signals)
    
    // Deduction 🕵
    translator.setByFilters(1, 2)
    translator.setByFilters(7, 3)
    translator.setByFilters(4, 4)
    translator.setByFilters(8, 7)
    const nineMask = translator.numbers[4] | translator.numbers[7]
    translator.setByFilters(9, 6, nineMask)
    screenBits[Screen.top] = translator.numbers[7] ^ translator.numbers[1]
    screenBits[Screen.bottom] = translator.numbers[9] ^ nineMask
    screenBits[Screen.bottomLeft] = translator.numbers[8] ^ translator.numbers[9]
    const threeMask = translator.numbers[1] | screenBits[Screen.top] | screenBits[Screen.bottom]
    translator.setByFilters(3, 5, threeMask)
    screenBits[Screen.center] = translator.numbers[3] ^ threeMask
    screenBits[Screen.topLeft] = translator.numbers[4] ^ (translator.numbers[1] | screenBits[Screen.center])
    translator.set(0, translator.numbers[8] ^ screenBits[Screen.center])
    translator.setByFilters(6, 6, screenBits[Screen.bottomLeft] | screenBits[Screen.center])
    screenBits[Screen.topRight] = translator.numbers[8] ^ translator.numbers[6]
    screenBits[Screen.bottomRight] = translator.numbers[1] ^ screenBits[Screen.topRight]
    translator.set(2, screenBits[Screen.top]
      | screenBits[Screen.topRight]
      | screenBits[Screen.center]
      | screenBits[Screen.bottomLeft]
      | screenBits[Screen.bottom])
    translator.set(5, screenBits[Screen.top]
      | screenBits[Screen.topLeft]
      | screenBits[Screen.center]
      | screenBits[Screen.bottomRight]
      | screenBits[Screen.bottom])

    return result + parseInt(output
      .reduce((translatedOutput, digit) => translatedOutput + translator[digit], ''))
  }, 0)
}

function getImportantStuff() {
  const Screen = {},
    signalBits = {},
    pieces = [
      'top',
      'topRight',
      'bottomRight',
      'bottom',
      'bottomLeft',
      'topLeft',
      'center'
    ]

  for (let i = 0; i < pieces.length; i++) {
    signalBits[String.fromCharCode(97 + i)] = 1 << i
    Screen[pieces[i]] = pieces[i]
  }

  return {
    Screen,
    signalBits
  }
}

class Translator {
  signals = []
  bitCounts = {}
  numbers = {}

  constructor(signals) {
    this.signals = signals
    this.bitCounts = signals
      .reduce((bitCounts, signal) => {
        bitCounts[signal] = signal
          .toString(2)
          .split('')
          .filter(bit => bit === '1')
          .length
        
        return bitCounts
      }, {})
  }

  set(number, value) {
    this[value] = number.toString()
    this.numbers[this[value]] = value
  }

  setByFilters(number, bitCount, mask=null) {
    this.set(number, this.signals
      .find(signal => this.bitCounts[signal] === bitCount
        && (mask === null || ((signal & mask) === mask))))
  }
}