// @flow

import type { Action } from '../../../../ReduxTypes.js'

import { ACTIVATED, DEACTIVATED, TOGGLED } from './WalletSelectorModalActions.js'

export type WalletSelectorModalState = {
  isActive: boolean
}
export const initialState = {
  isActive: true
}
export const walletSelectorModal = (state: WalletSelectorModalState = initialState, action: Action) => {
  switch (action.type) {
    case ACTIVATED: {
      return {
        ...state,
        isActive: true
      }
    }
    case DEACTIVATED: {
      return {
        ...state,
        isActive: false
      }
    }
    case TOGGLED: {
      return {
        ...state,
        isActive: !state.isActive
      }
    }
    default:
      return state
  }
}

export default walletSelectorModal
