// @flow

import type { Action } from '../../../../ReduxTypes.js'
import * as ACTION from '../action'

export const initialState = false
export type State = boolean
export const selectedWalletListModalVisibility = (state: State = initialState, action: Action) => {
  switch (action.type) {
    case 'TOGGLE_SELECTED_WALLET_LIST_MODAL': {
      return !state
    }

    case 'TOGGLE_SCAN_TO_WALLET_LIST_MODAL': {
      return false
    }

    case 'TOGGLE_TRANSACTIONS_WALLET_LIST_MODAL': {
      return false
    }

    case ACTION.TOGGLE_ADDRESS_MODAL_VISIBILITY:
      return false

    case 'DISABLE_WALLET_LIST_MODAL_VISIBILITY': {
      return false
    }

    default:
      return state
  }
}
