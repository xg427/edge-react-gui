// @flow

import type { Action } from '../../../../ReduxTypes.js'

export const initialState = false
export type State = boolean
export const selectedWalletListModalVisibility = (state: State = initialState, action: Action) => {
  switch (action.type) {
    case 'WALLET_LIST_MODAL/TOGGLE_SELECTED_WALLET_LIST_MODAL':
      return !state
    case 'WALLET_LIST_MODAL/TOGGLE_SCAN_TO_WALLET_LIST_MODAL':
      return false
    case 'WALLET_LIST_MODAL/TOGGLE_TRANSACTIONS_WALLET_LIST_MODAL':
      return false
    case 'SCAN/TOGGLE_ADDRESS_MODAL_VISIBILITY':
      return false
    case 'WALLET_LIST_MODAL/DISABLE_WALLET_LIST_MODAL_VISIBILITY':
      return false
    default:
      return state
  }
}
