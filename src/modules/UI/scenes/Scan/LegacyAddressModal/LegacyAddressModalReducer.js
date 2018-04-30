// @flow

import type { Action } from '../../../../ReduxTypes.js'

import { ACTIVATED, DEACTIVATED, TOGGLED } from './LegacyAddressModalActions.js'

export type LegacyAddressModalState = {
  isVisible: boolean
}
export const initialState = {
  isVisible: false
}
export const legacyAddressModal = (state: LegacyAddressModalState = initialState, action: Action) => {
  switch (action.type) {
    case ACTIVATED: {
      return {
        ...state,
        isVisible: true
      }
    }
    case DEACTIVATED: {
      return {
        ...state,
        isVisible: false
      }
    }
    case TOGGLED: {
      return {
        ...state,
        isVisible: !state.isVisible
      }
    }
    default:
      return state
  }
}

export default legacyAddressModal
