// @flow

import type { Action } from '../../../../ReduxTypes.js'

import {
  ACTIVATED,
  DEACTIVATED,
  TOGGLED,
  DEPLOYED,
  HIDDEN,
  BACKDROP_PRESSED,
  BACK_BUTTON_PRESSED
} from './LegacyAddressModalActions.js'

export type LegacyAddressModalState = {
  status: 'HIDDEN' | 'OPENING' | 'DEPLOYED' | 'CLOSING'
}
export const initialState = {
  isActive: false,
  status: 'HIDDEN'
}
export const legacyAddressModal = (state: LegacyAddressModalState = initialState, action: Action) => {
  switch (action.type) {
    case ACTIVATED: {
      return {
        ...state,
        isActive: true
      }
    }
    case BACKDROP_PRESSED:
    case BACK_BUTTON_PRESSED:
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
    case HIDDEN: {
      return initialState
    }
    case DEPLOYED:
    default:
      return state
  }
}

export default legacyAddressModal
