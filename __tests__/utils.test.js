// @flow
/* globals describe test expect */

import {
  isValidInput,
  convertNativeToDenomination,
  convertNativeToDisplay,
  convertNativeToExchange,
  convertDisplayToNative,
  truncateDecimals,
  getNewArrayWithItem,
  getNewArrayWithoutItem,
  getSupportedFiats,
  isCompleteExchangeData,
  mergeTokens,
  getTimeMeasurement,
  getTimeWithMeasurement,
  getTimeInMinutes,
  isEdgeLogin
} from '../src/modules/utils.js'

describe('isValidInput', () => {
  describe('when input is valid', () => {
    test('1 => true', () => {
      const validInput = '1'
      const expected = true
      const actual = isValidInput(validInput)
      expect(actual).toBe(expected)
    })

    test('. => true', () => {
      const validInput = '.'
      const expected = true
      const actual = isValidInput(validInput)
      expect(actual).toBe(expected)
    })

    test('.0 => true', () => {
      const validInput = '.'
      const expected = true
      const actual = isValidInput(validInput)
      expect(actual).toBe(expected)
    })

    test('0.0 => true', () => {
      const validInput = '.'
      const expected = true
      const actual = isValidInput(validInput)
      expect(actual).toBe(expected)
    })

    test('0.01 => true', () => {
      const validInput = '.'
      const expected = true
      const actual = isValidInput(validInput)
      expect(actual).toBe(expected)
    })

    test('0 => true', () => {
      const validInput = '.'
      const expected = true
      const actual = isValidInput(validInput)
      expect(actual).toBe(expected)
    })
  })

  describe('when input is invalid', () => {
    test('R => false', () => {
      const invalidInput = 'R'
      const expected = false
      const actual = isValidInput(invalidInput)
      expect(actual).toBe(expected)
    })

    test('0R => false', () => {
      const invalidInput = '0R'
      const expected = false
      const actual = isValidInput(invalidInput)
      expect(actual).toBe(expected)
    })

    test('0.R => false', () => {
      const invalidInput = '0.R'
      const expected = false
      const actual = isValidInput(invalidInput)
      expect(actual).toBe(expected)
    })

    test('0.0. => false', () => {
      const invalidInput = '0.0.'
      const expected = false
      const actual = isValidInput(invalidInput)
      expect(actual).toBe(expected)
    })

    test('0.123q => false', () => {
      const invalidInput = '0.123q'
      const expected = false
      const actual = isValidInput(invalidInput)
      expect(actual).toBe(expected)
    })
  })
})

describe('convertNativeToDenomination', () => {
  test('100000000 => 1', () => {
    const nativeToDisplayRatio = '100000000'
    const nativeAmount = '100000000'
    const expected = '1'
    const actual = convertNativeToDenomination(nativeToDisplayRatio)(nativeAmount)
    expect(actual).toBe(expected)
  })
})

describe('convertNativeToDisplay', () => {
  test('100000000 => 1', () => {
    const nativeToDisplayRatio = '100000000'
    const nativeAmount = '100000000'
    const expected = '1'
    const actual = convertNativeToDisplay(nativeToDisplayRatio)(nativeAmount)
    expect(actual).toBe(expected)
  })
})

describe('convertNativeToExchange', () => {
  test('100000000 => 1', () => {
    const nativeToDisplayRatio = '100000000'
    const nativeAmount = '100000000'
    const expected = '1'
    const actual = convertNativeToExchange(nativeToDisplayRatio)(nativeAmount)
    expect(actual).toBe(expected)
  })
})

describe('convertDisplayToNative', () => {
  test('100000000 => 1', () => {
    const nativeToDisplayRatio = '100000000'
    const displayAmount = '1'
    const expected = '100000000'
    const actual = convertDisplayToNative(nativeToDisplayRatio)(displayAmount)
    expect(actual).toBe(expected)
  })
})

describe('truncateDecimals', () => {
  test('1 => 1', () => {
    const input = '1'
    const precision = 0
    const expected = '1'
    const actual = truncateDecimals(input, precision)
    expect(actual).toBe(expected)
  })

  test('1 => 1', () => {
    const input = '1'
    const precision = 8
    const expected = '1'
    const actual = truncateDecimals(input, precision)
    expect(actual).toBe(expected)
  })

  test('1.0 => 1', () => {
    const input = '1.0'
    const precision = 1
    const expected = '1.0'
    const actual = truncateDecimals(input, precision)
    expect(actual).toBe(expected)
  })

  test('1.123456789 => 1.0', () => {
    const input = '1.123456789'
    const precision = 1
    const expected = '1.1'
    const actual = truncateDecimals(input, precision)
    expect(actual).toBe(expected)
  })

  test('1.19 => 1.0', () => {
    const input = '1.19'
    const precision = 1
    const expected = '1.1'
    const actual = truncateDecimals(input, precision)
    expect(actual).toBe(expected)
  })

  test('1.123456789 to 0 => 1', () => {
    const input = '1.123456789'
    const precision = 0
    const expected = '1'
    const actual = truncateDecimals(input, precision)
    expect(actual).toBe(expected)
  })
})

describe('getNewArrayWithItem', () => {
  describe('returns new array', () => {
    test('input !== output', () => {
      const array = [1, 2, 3]
      const input = 4
      const expected = array
      const actual = getNewArrayWithItem(array, input)
      expect(actual).not.toBe(expected)
    })
  })

  describe('when array includes item', () => {
    test('[1, 2, 3] => [1, 2, 3]', () => {
      const array = [1, 2, 3]
      const input = 1
      const expected = [1, 2, 3]
      const actual = getNewArrayWithItem(array, input)
      expect(actual).toEqual(expected)
    })
  })

  describe('when array does not include item', () => {
    test('[1, 2, 3] => [1, 2, 3, 4]', () => {
      const array = [1, 2, 3]
      const input = 4
      const expected = [1, 2, 3, 4]
      const actual = getNewArrayWithItem(array, input)
      expect(actual).toEqual(expected)
    })
  })
})

describe('getNewArrayWithoutItem', () => {
  describe('returns new array', () => {
    test('input !== output', () => {
      const array = [1, 2, 3]
      const input = 1
      const expected = array
      const actual = getNewArrayWithoutItem(array, input)
      expect(actual).not.toBe(expected)
    })
  })

  describe('when array includes item', () => {
    test('[1, 2, 3] => [1, 2, 3]', () => {
      const array = [1, 2, 3]
      const input = 1
      const expected = [2, 3]
      const actual = getNewArrayWithoutItem(array, input)
      expect(actual).toEqual(expected)
    })
  })

  describe('when array does not include item', () => {
    test('[1, 2, 3] => [1, 2, 3, 4]', () => {
      const array = [1, 2, 3]
      const input = 4
      const expected = [1, 2, 3]
      const actual = getNewArrayWithoutItem(array, input)
      expect(actual).toEqual(expected)
    })
  })
})

describe('getSupportedFiats', () => {
  test('resolves to array of object {value, label}', () => {
    const supportedFiats = getSupportedFiats()
    supportedFiats.forEach(fiat => {
      expect(fiat).toEqual(expect.objectContaining({ label: expect.any(String), value: expect.any(String) }))
    })
  })
})

describe('isCompleteExchangeData', () => {
  describe('primaryDisplayAmount: undefined', () => {
    test('incomplete => false', () => {
      const incompleteExchangeData = {
        primaryDisplayAmount: undefined,
        primaryDisplayName: 'BTC',
        secondaryDisplaySymbol: '$',
        secondaryDisplayAmount: '4000',
        secondaryCurrencyCode: 'USD'
      }
      const expected = false
      // $FlowExpectedError
      const actual = isCompleteExchangeData(incompleteExchangeData)
      expect(actual).toBe(expected)
    })
  })

  describe('primaryDisplayName: undefined', () => {
    test('incomplete => false', () => {
      const incompleteExchangeData = {
        primaryDisplayAmount: '1',
        primaryDisplayName: undefined,
        secondaryDisplaySymbol: '$',
        secondaryDisplayAmount: '4000',
        secondaryCurrencyCode: 'USD'
      }
      const expected = false
      // $FlowExpectedError
      const actual = isCompleteExchangeData(incompleteExchangeData)
      expect(actual).toBe(expected)
    })
  })

  describe('secondaryDisplaySymbol: undefined', () => {
    test('incomplete => false', () => {
      const incompleteExchangeData = {
        primaryDisplayAmount: '1',
        primaryDisplayName: 'BTC',
        secondaryDisplaySymbol: undefined,
        secondaryDisplayAmount: '4000',
        secondaryCurrencyCode: 'USD'
      }
      const expected = false
      // $FlowExpectedError
      const actual = isCompleteExchangeData(incompleteExchangeData)
      expect(actual).toBe(expected)
    })
  })

  describe('secondaryDisplayAmount: undefined', () => {
    test('incomplete => false', () => {
      const incompleteExchangeData = {
        primaryDisplayAmount: '1',
        primaryDisplayName: 'BTC',
        secondaryDisplaySymbol: '$',
        secondaryDisplayAmount: undefined,
        secondaryCurrencyCode: 'USD'
      }
      const expected = false
      // $FlowExpectedError
      const actual = isCompleteExchangeData(incompleteExchangeData)
      expect(actual).toBe(expected)
    })
  })

  describe('secondaryCurrencyCode: undefined', () => {
    test('incomplete => false', () => {
      const incompleteExchangeData = {
        primaryDisplayAmount: '1',
        primaryDisplayName: 'BTC',
        secondaryDisplaySymbol: '$',
        secondaryDisplayAmount: '4000',
        secondaryCurrencyCode: undefined
      }
      const expected = false
      // $FlowExpectedError
      const actual = isCompleteExchangeData(incompleteExchangeData)
      expect(actual).toBe(expected)
    })
  })

  test('complete => true', () => {
    const completeExchangeData = {
      primaryDisplayAmount: '1',
      primaryDisplayName: 'BTC',
      secondaryDisplaySymbol: '$',
      secondaryDisplayAmount: '4000',
      secondaryCurrencyCode: 'USD'
    }
    const expected = true
    const actual = isCompleteExchangeData(completeExchangeData)
    expect(actual).toBe(expected)
  })
})

describe('mergeTokens', () => {
  test('Preferred tokens take precendence', () => {
    const preferredTokenA = { currencyCode: 'TA', currencyName: 'TA', preferred: true }
    const preferredTokenB = { currencyCode: 'TB', currencyName: 'TB', preferred: true }

    const tokenA = { currencyCode: 'TA', currencyName: 'TA' }
    const tokenD = { currencyCode: 'TD', currencyName: 'TD' }

    const preferredEdgeMetaTokens = [preferredTokenA, preferredTokenB]
    const edgeMetaTokens = [tokenA, tokenD]

    const expected = [
      preferredTokenA, // from preferredAbcTokens
      preferredTokenB, // from preferredAbcTokens
      tokenD
    ]
    // $FlowExpectedError
    const actual = mergeTokens(preferredEdgeMetaTokens, edgeMetaTokens)
    expect(actual).toEqual(expected)
  })

  test('Empty preferredTokens', () => {
    const tokenA = { currencyCode: 'TA', currencyName: 'TA' }
    const tokenD = { currencyCode: 'TD', currencyName: 'TD' }

    const preferredEdgeMetaTokens = []
    const edgeMetaTokens = [tokenA, tokenD]

    const expected = [tokenA, tokenD]
    // $FlowExpectedError
    const actual = mergeTokens(preferredEdgeMetaTokens, edgeMetaTokens)
    expect(actual).toEqual(expected)
  })

  test('Empty tokens', () => {
    const preferredTokenA = { currencyCode: 'TA', currencyName: 'TA', preferred: true }
    const preferredTokenB = { currencyCode: 'TB', currencyName: 'TB', preferred: true }

    const preferredEdgeMetaTokens = [preferredTokenA, preferredTokenB]
    const edgeMetaTokens = []

    const expected = [preferredTokenA, preferredTokenB]
    // $FlowExpectedError
    const actual = mergeTokens(preferredEdgeMetaTokens, edgeMetaTokens)
    expect(actual).toEqual(expected)
  })
})

describe('getTimeMeasurement', () => {
  test('should return seconds measurement', () => {
    const expected = 'seconds'
    const actual = getTimeMeasurement(0.9)
    expect(actual).toBe(expected)
  })

  test('should return minutes measurements', () => {
    // accept minutes
    const expected = 'minutes'
    expect(getTimeMeasurement(1)).toBe(expected)
    expect(getTimeMeasurement(59)).toBe(expected)
  })

  test('should return hours measurements', () => {
    const expected = 'hours'
    expect(getTimeMeasurement(60)).toBe(expected)
    expect(getTimeMeasurement(1439)).toBe(expected)
  })

  test('should return days measurements', () => {
    const expected = 'days'
    expect(getTimeMeasurement(1440)).toBe(expected)
    expect(getTimeMeasurement(50000)).toBe(expected)
  })
})

describe('getTimeWithMeasurement', () => {
  test(' => {measurement: "seconds", value: 35 }', () => {
    expect(getTimeWithMeasurement(0.58)).toEqual({ measurement: 'seconds', value: 35 })
  })
  test(' => {measurement: "minutes", value: 2 }', () => {
    expect(getTimeWithMeasurement(2)).toEqual({ measurement: 'minutes', value: 2 })
  })
  test(' => {measurement: "hours", value: 1 }', () => {
    expect(getTimeWithMeasurement(60)).toEqual({ measurement: 'hours', value: 1 })
  })
  test(' => {measurement: "days", value: 1 }', () => {
    expect(getTimeWithMeasurement(1440)).toEqual({ measurement: 'days', value: 1 })
  })
})

describe('getTimeInMinutes', () => {
  test('1 min => 1', () => {
    expect(getTimeInMinutes({ measurement: 'minutes', value: 1 })).toEqual(1)
  })
  test('2 hours => 120', () => {
    expect(getTimeInMinutes({ measurement: 'hours', value: 2 })).toEqual(120)
  })
  test('1 days => 1440', () => {
    expect(getTimeInMinutes({ measurement: 'days', value: 1 })).toEqual(1440)
  })
  test('44 seconds => 0.73', () => {
    expect(getTimeInMinutes({ measurement: 'seconds', value: 44 })).toEqual(0.73)
  })
})

describe('isEdgeLogin', () => {
  test('Edge Login', () => {
    expect(isEdgeLogin('airbitz://edge/')).toBe(true)
  })
  test('Non Edge Login', () => {
    expect(isEdgeLogin('not an edge login')).toBe(false)
  })
})
