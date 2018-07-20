// @flow

import { combineReducers } from 'redux'
import type { EdgeSpendInfo, EdgeTransaction } from 'edge-core-js'
import { add } from 'biggystring'
import type { Action } from '../../../ReduxTypes.js'
import * as ACTION from './action'

export type SpendOptions = {
  lock: boolean,
  sign: boolean,
  broadcast: boolean,
  save: boolean
}

export type SendConfirmationState = {
  destination: string,
  error: Error | null,
  nativeAmount: string,
  pending: boolean,
  pin: string,
  spendInfo: EdgeSpendInfo | null,
  spendOptions: SpendOptions | null,
  transaction: EdgeTransaction | null
}

export const initialState = {
  destination: '',
  error: null,
  isEditable: true,
  nativeAmount: '0',
  pending: false,
  pin: '',
  spendInfo: null,
  transaction: null
}

export const spendInfo = (state: EdgeSpendInfo | null = null, action: Action) => {
  switch (action.type) {
    case ACTION.NEW_NATIVE_AMOUNT: {
      const { nativeAmount } = action.data
      const [first, ...rest] = state.spendTargets
      return {
        ...state,
        spendTargets: [{ ...first, nativeAmount }, ...rest]
      }
    }
    case ACTION.NEW_UNIQUE_IDENTIFIER: {
      const { uniqueIdentifier } = action.data
      const [first, ...rest] = state.spendTargets
      return {
        ...state,
        spendTargets: [
          {
            ...first,
            otherParams: {
              ...first.otherParams,
              uniqueIdentifier
            }
          },
          ...rest
        ]
      }
    }
    case ACTION.NEW_NETWORK_FEES: {
      const { customNetworkFee, networkFeeOption } = action.data
      return {
        ...state,
        networkFeeOption,
        customNetworkFee
      }
    }
    case ACTION.NEW_SPEND_REQUEST: {
      return action.data.spendInfo
    }
    case ACTION.RESET: {
      return null
    }
    default:
      return state
  }
}

export const error = (state: Error | null = null, action: Action) => {
  switch (action.type) {
    case ACTION.NEW_ERROR: {
      return action.data.error
    }
    case ACTION.NEW_SPEND_REQUEST:
    case ACTION.NEW_TRANSACTION:
    case ACTION.RESET: {
      return null
    }
    default:
      return state
  }
}

export const isEditable = (state: boolean = true, action: Action) => {
  switch (action.type) {
    case ACTION.NEW_SPEND_REQUEST: {
      return !action.data.options.locked
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
    case ACTION.NEW_SPEND_REQUEST: {
      return action.data.options.sign
    }
    case ACTION.NEW_ERROR:
    case ACTION.RESET: {
      return false
    }
    default:
      return state
  }
}

export const pin = (state: string = '', action: Action) => {
  switch (action.type) {
    case ACTION.NEW_PIN: {
      return action.data.pin
    }
    case ACTION.NEW_ERROR:
    case ACTION.RESET: {
      return ''
    }
    default:
      return state
  }
}

export const authRequired = (state: 'pin' | 'none' = 'none', action: Action) => {
  switch (action.type) {
    case ACTION.NEW_SPEND_REQUEST: {
      return action.data.options.authRequired
    }
    case ACTION.RESET: {
      return false
    }
    default:
      return state
  }
}

export const transaction = (state: EdgeTransaction | null = null, action: Action) => {
  switch (action.type) {
    case ACTION.NEW_TRANSACTION: {
      return action.data.transaction
    }
    case ACTION.NEW_SPEND_REQUEST:
    case ACTION.RESET: {
      return null
    }
    default:
      return state
  }
}

export const nativeAmount = (state: string = '0', action: Action) => {
  switch (action.type) {
    case ACTION.NEW_NATIVE_AMOUNT: {
      return action.data.nativeAmount
    }
    case ACTION.NEW_SPEND_REQUEST: {
      return action.data.spendInfo.spendTargets.reduce((sum, { nativeAmount }) => {
        return add(sum, nativeAmount)
      }, '0')
    }
    case ACTION.RESET: {
      return ''
    }
    default:
      return state
  }
}

export const destination = (state: string = '', action: Action) => {
  switch (action.type) {
    case ACTION.NEW_SPEND_REQUEST: {
      return action.data.spendInfo.metadata.name
    }
    case ACTION.RESET: {
      return ''
    }
    default:
      return state
  }
}

export const resetSlider = (state: boolea = false, action: Action) => {
  switch (action.type) {
    case ACTION.NEW_ERROR:
    case ACTION.RESET: {
      return true
    }
    default:
      return state
  }
}

export const sliderDisabled = (state: boolea = false, action: Action) => {
  switch (action.type) {
    case ACTION.NEW_TRANSACTION: {
      return false
    }
    case ACTION.NEW_SPEND_REQUEST:
    case ACTION.RESET: {
      return true
    }
    default:
      return state
  }
}

export const sendConfirmation = combineReducers({
  authRequired,
  error,
  isEditable,
  nativeAmount,
  pending,
  pin,
  spendInfo,
  transaction,
  destination,
  resetSlider
})

export default sendConfirmation
