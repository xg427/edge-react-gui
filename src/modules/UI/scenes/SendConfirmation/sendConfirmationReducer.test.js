// @flow

/* globals describe test expect */

import { clone } from 'ramda'

// import { makeSpendFailed, newPin, newSpendInfo, reset, updatePaymentProtocolTransaction, updateSpendPending, updateTransaction } from './action.js'
import { sendConfirmation } from './reducer.js'
import { initialState } from './selectors.js'

describe('sendConfirmation reducer', () => {
  test('initialState', () => {
    // $FlowExpectedError
    const actual = sendConfirmation(undefined, {})

    expect(actual).toMatchSnapshot()
  })

  test('reset', () => {
    const action = { type: 'SEND_CONFIRMATION/RESET' }
    const actual = sendConfirmation(undefined, action)

    expect(actual).toMatchSnapshot()
  })

  describe('destination', () => {
    describe('updateTransaction', () => {
      test('with transaction and legacyAddress', () => {
        const parsedUri = {
          publicAddress: 'bitcoincash:qpltjkre069mp80ylcj87832ju3zt2gr6gercn9j2z',
          legacyAddress: '123412341234',
          nativeAmount: '100000',
          currencyCode: 'BCH',
          metadata: {}
        }
        const transaction = {
          blockHeight: 0,
          currencyCode: 'BCH',
          date: 0,
          nativeAmount: '-681',
          networkFee: '681',
          otherParams: {},
          ourReceiveAddresses: ['123123123'],
          signedTx: '',
          txid: ''
        }
        const error = null
        const forceUpdateGui = true
        const initialStateClone = clone(initialState)

        const action = {
          type: 'SEND_CONFIRMATION/UPDATE_TRANSACTION',
          data: {
            transaction,
            parsedUri,
            forceUpdateGui,
            error
          }
        }
        const actual = sendConfirmation(initialStateClone, action) // use initialState after sendConfirmation reducer not longer mutates state

        expect(actual).toMatchSnapshot()
      })

      test('with transaction and name', () => {
        const parsedUri = {
          publicAddress: 'bitcoincash:qpltjkre069mp80ylcj87832ju3zt2gr6gercn9j2z',
          nativeAmount: '100000',
          currencyCode: 'BCH',
          metadata: {
            name: 'airbitz'
          }
        }
        const transaction = {
          blockHeight: 0,
          currencyCode: 'BCH',
          date: 0,
          nativeAmount: '-681',
          networkFee: '681',
          otherParams: {},
          ourReceiveAddresses: ['123123123'],
          signedTx: '',
          txid: ''
        }
        const error = null
        const forceUpdateGui = true
        const initialStateClone = clone(initialState)
        const action = {
          type: 'SEND_CONFIRMATION/UPDATE_TRANSACTION',
          data: {
            transaction,
            parsedUri,
            forceUpdateGui,
            error
          }
        }
        const actual = sendConfirmation(initialStateClone, action) // use initialState after sendConfirmation reducer not longer mutates state

        expect(actual).toMatchSnapshot()
      })

      test('with error', () => {
        const transaction = null
        const parsedUri = { nativeAmount: '100000' }
        const forceUpdateGui = true
        const error = new Error()
        const initialStateClone = clone(initialState)
        const action = {
          type: 'SEND_CONFIRMATION/UPDATE_TRANSACTION',
          data: {
            transaction,
            parsedUri,
            forceUpdateGui,
            error
          }
        }
        const actual = sendConfirmation(initialStateClone, action) // use initialState after sendConfirmation reducer not longer mutates state

        expect(actual).toMatchSnapshot()
      })

      test('with pin error', () => {
        const parsedUri = null
        const transaction = {
          blockHeight: 0,
          currencyCode: 'BCH',
          date: 0,
          nativeAmount: '-681',
          networkFee: '681',
          otherParams: {},
          ourReceiveAddresses: ['123123123'],
          signedTx: '',
          txid: ''
        }
        const error = new Error('Incorrect Pin')
        const forceUpdateGui = true
        const initialStateClone = clone(initialState)
        const action = {
          type: 'SEND_CONFIRMATION/UPDATE_TRANSACTION',
          data: {
            transaction,
            parsedUri,
            forceUpdateGui,
            error
          }
        }
        const actual = sendConfirmation(initialStateClone, action) // use initialState after sendConfirmation reducer not longer mutates state

        expect(actual).toMatchSnapshot()
      })
    })

    describe('newSpendInfo', () => {
      test('with name', () => {
        const spendInfo = {
          currencyCode: 'BTC',
          nativeAmount: '1000',
          spendTargets: [{ currencyCode: 'BTC', nativeAmount: '1000', publicAddress: '123123123' }],
          metadata: { name: 'airbitz' }
        }
        const action = {
          type: 'SEND_CONFIRMATION/NEW_SPEND_INFO',
          data: {
            spendInfo,
            authType: 'none'
          }
        }
        const initialStateClone = clone(initialState)
        const actual = sendConfirmation(initialStateClone, action)

        expect(actual).toMatchSnapshot()
      })

      test('without name', () => {
        const spendInfo = {
          currencyCode: 'BTC',
          nativeAmount: '1000',
          spendTargets: [{ currencyCode: 'BTC', nativeAmount: '1000', publicAddress: '123123123' }],
          metadata: {}
        }
        const action = {
          type: 'SEND_CONFIRMATION/NEW_SPEND_INFO',
          data: {
            spendInfo,
            authType: 'none'
          }
        }
        const initialStateClone = clone(initialState)
        const actual = sendConfirmation(initialStateClone, action)

        expect(actual).toMatchSnapshot()
      })
    })
  })

  describe('address', () => {
    test('NEW_SPEND_INFO', () => {
      const spendInfo = {
        spendTargets: [{ publicAddress: '123123123', nativeAmount: '0' }],
        metadata: {}
      }
      const action = {
        type: 'SEND_CONFIRMATION/NEW_SPEND_INFO',
        data: {
          spendInfo,
          authType: 'none'
        }
      }
      const initialStateClone = clone(initialState)

      const actual = sendConfirmation(initialStateClone, action)

      expect(actual).toMatchSnapshot()
    })
  })

  describe('isEditable', () => {
    test('UPDATE_PAYMENT_PROTOCOL_TRANSACTION', () => {
      const transaction = { id: '123', nativeAmount: '123' }
      const action = { type: 'SEND_CONFIRMATION/UPDATE_PAYMENT_PROTOCOL_TRANSACTION', data: { transaction } }
      const initialStateClone = clone(initialState)
      const actual = sendConfirmation(initialStateClone, action)

      expect(actual).toMatchSnapshot()
    })

    test('MAKE_PAYMENT_PROTOCOL_TRANSACTION_FAILED', () => {
      const error = new Error()
      const action = { type: 'SEND_CONFIRMATION/MAKE_PAYMENT_PROTOCOL_TRANSACTION_FAILED', data: { error } }
      const initialStateClone = clone(initialState)
      const actual = sendConfirmation(initialStateClone, action)

      expect(actual).toMatchSnapshot()
    })
  })

  describe('error', () => {
    test('UPDATE_TRANSACTION', () => {
      const transaction = null
      const parsedUri = null
      const forceUpdateGui = null
      const error = new Error()
      const action = { type: 'SEND_CONFIRMATION/UPDATE_TRANSACTION', data: { transaction, parsedUri, forceUpdateGui, error } }

      const initialStateClone = clone(initialState)
      const actual = sendConfirmation(initialStateClone, action)

      expect(actual).toMatchSnapshot()
    })

    test('MAKE_PAYMENT_PROTOCOL_TRANSACTION_FAILED', () => {
      const error = new Error()
      const action = { type: 'SEND_CONFIRMATION/MAKE_PAYMENT_PROTOCOL_TRANSACTION_FAILED', data: { error } }
      const initialStateClone = clone(initialState)
      const actual = sendConfirmation(initialStateClone, action)

      expect(actual).toMatchSnapshot()
    })
  })

  test('pin', () => {
    const pin = '1234'
    const action = { type: 'SEND_CONFIRMATION/NEW_PIN', data: { pin } }
    const initialStateClone = clone(initialState)
    const actual = sendConfirmation(initialStateClone, action)

    expect(actual).toMatchSnapshot()
  })

  test('pending', () => {
    const action = { type: 'SEND_CONFIRMATION/UPDATE_SPEND_PENDING', data: { pending: true } }
    const initialStateClone = clone(initialState)
    const actual = sendConfirmation(initialStateClone, action)

    expect(actual).toMatchSnapshot()
  })
})
