// @flow

import type { GuiReceiveAddress } from '../../../../types.js'
import type { Action } from '../../../ReduxTypes.js'

export type RequestSceneState = {
  inputCurrencySelected: string,
  receiveAddress: GuiReceiveAddress
}

const receiveAddress: GuiReceiveAddress = {
  publicAddress: '',
  nativeAmount: '0',
  metadata: {}
}

const initialState: RequestSceneState = {
  inputCurrencySelected: 'fiat',
  receiveAddress
}

export const request = (state: RequestSceneState = initialState, action: Action): RequestSceneState => {
  switch (action.type) {
    case 'REQUEST/UPDATE_RECEIVE_ADDRESS_SUCCESS': {
      if (!action.data) throw new Error('Invalid action')
      return {
        ...state,
        receiveAddress: action.data.receiveAddress
      }
    }

    case 'REQUEST/UPDATE_INPUT_CURRENCY_SELECTED': {
      if (!action.data) throw new Error('Invalid action')
      return {
        ...state,
        inputCurrencySelected: action.data.inputCurrencySelected
      }
    }

    case 'REQUEST/UPDATE_AMOUNT_REQUESTED_IN_CRYPTO': {
      const { receiveAddress } = state
      if (!action.data) throw new Error('Invalid action')
      return {
        ...state,
        receiveAddress: {
          ...receiveAddress,
          amountSatoshi: action.data.amountRequestedInCrypto
        }
      }
    }

    case 'REQUEST/UPDATE_METADATA': {
      const { receiveAddress } = state
      const { metadata = {} } = receiveAddress
      return {
        ...state,
        receiveAddress: {
          ...receiveAddress,
          metadata
        }
      }
    }

    case 'REQUEST/UPDATE_AMOUNT_REQUESTED_IN_FIAT': {
      const { receiveAddress } = state
      const { metadata = {} } = receiveAddress
      if (!action.data) throw new Error('Invalid action')
      const amountFiat = action.data.amountRequestedInFiat

      return {
        ...state,
        receiveAddress: {
          ...receiveAddress,
          metadata: {
            ...metadata,
            amountFiat: amountFiat
          }
        }
      }
    }

    default:
      return state
  }
}

export default request
