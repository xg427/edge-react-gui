// @flow

import { isEqual } from 'lodash'

import type { Action } from '../../../ReduxTypes.js'
import * as ACTION from './action'
import { initialState } from './selectors'
import type { SendConfirmationState } from './selectors'

export const sendConfirmationLegacy = (state: SendConfirmationState = initialState, action: Action) => {
  const { type, data = {} } = action
  switch (type) {
    case ACTION.UPDATE_TRANSACTION: {
      const { transaction, parsedUri, forceUpdateGui, error } = data
      let forceUpdateGuiCounter = state.forceUpdateGuiCounter
      if (forceUpdateGui) {
        forceUpdateGuiCounter++
      }
      if (!parsedUri) return { ...state, forceUpdateGuiCounter, transaction }

      const { metadata, customNetworkFee, ...others } = parsedUri
      if (!isEqual(state.parsedUri.metadata, metadata)) {
        state.parsedUri.metadata = { ...state.parsedUri.metadata, ...metadata }
      }

      if (customNetworkFee && !isEqual(state.parsedUri.customNetworkFee, customNetworkFee)) {
        state.parsedUri.customNetworkFee = customNetworkFee
      }

      const nativeAmount = parsedUri.nativeAmount || state.nativeAmount || '0'
      const destination = parsedUri.publicAddress || state.destination

      return {
        ...state,
        transaction,
        forceUpdateGuiCounter,
        nativeAmount,
        destination,
        parsedUri: {
          ...state.parsedUri,
          ...others
        }
      }
    }

    case ACTION.UPDATE_PAYMENT_PROTOCOL_TRANSACTION: {
      if (!action.data) return state
      const { transaction } = data

      return {
        ...state,
        transaction
      }
    }

    case ACTION.NEW_SPEND_INFO: {
      if (!action.data) return state
      const {
        spendInfo: {
          nativeAmount,
          metadata: { name: destination }
        }
      } = data

      return {
        ...state,
        destination,
        nativeAmount,
        transaction: null
      }
    }

    case ACTION.RESET: {
      return initialState
    }

    default:
      return state
  }
}

export const error = (state: Error | null = null, action: Action) => {
  switch (action.type) {
    case ACTION.MAKE_PAYMENT_PROTOCOL_TRANSACTION_FAILED:
    case ACTION.UPDATE_TRANSACTION: {
      return action.data.error
    }
    case ACTION.RESET: {
      return null
    }
    default:
      return state
  }
}

export const spendInfo = (state: EdgeSpendInfo | null = null, action: Action) => {
  switch (action.type) {
    case ACTION.NEW_SPEND_INFO: {
      return action.data.spendInfo
    }
    case ACTION.RESET: {
      return null
    }
    default:
      return state
  }
}

export const isEditable = (state: boolean = true, action: Action) => {
  switch (action.type) {
    case ACTION.UPDATE_PAYMENT_PROTOCOL_TRANSACTION:
    case ACTION.MAKE_PAYMENT_PROTOCOL_TRANSACTION_FAILED: {
      return false
    }
    case ACTION.RESET: {
      true
    }
    default:
      return state
  }
}

export const pending = (state: boolean = false, action: Action) => {
  switch (action.type) {
    case ACTION.UPDATE_SPEND_PENDING: {
      const { pending } = data
      return pending
    }
    case ACTION.INCORRECT_PIN:
    case ACTION.RESET: {
      return false
    }
    default:
      return state
  }
}

export const pin = (state: string = '', action) => {
  switch (action.type) {
    case ACTION.PIN_CHANGED: {
      return action.data.pin
    }
    case ACTION.INCORRECT_PIN:
    case ACTION.RESET: {
      return ''
    }
    default:
      return state
  }
}

export const pinIsRequired = (state: boolean = false, action) => {
  switch (action.type) {
    case ACTION.UPDATE_TRANSACTION: {
      const { data: pinIsEnabled, pinAmount, fiatAmount } = action
      return !!(pinIsEnabled && fiatAmount >= pinAmount)
    }
    case ACTION.UPDATE_PAYMENT_PROTOCOL_TRANSACTION: {
      return state
    }
    case ACTION.NEW_SPEND_INFO: {
      return state
    }
    case ACTION.RESET: {
      return false
    }
    default:
      return state
  }
}

export const sendConfirmation = (state: SendConfirmationState = initialState, action: Action) => {
  const legacy = sendConfirmationLegacy(state, action)
  const result = {
    ...legacy,
    error: error(state.error, action),
    spendInfo: spendInfo(state.spendInfo, action),
    isEditable: isEditable(state.isEditable, action),
    pending: pending(state.pending, action),
    pinIsRequired: pinIsRequired(state.pinIsRequired, action),
    pin: pin(state.pin, action)
  }

  return result
}

export default sendConfirmation
