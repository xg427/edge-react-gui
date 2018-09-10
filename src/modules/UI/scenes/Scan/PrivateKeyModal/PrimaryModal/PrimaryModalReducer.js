// @flow

import type { Action } from '../../../../../ReduxTypes.js'

export const initialState = { isActive: false }
export type State = { isActive: boolean }
export const primaryModal = (state: State = initialState, action: Action) => {
  switch (action.type) {
    case 'PRIVATE_KEY_MODAL/PRIMARY_MODAL_ACTIVATED': {
      return {
        isActive: true
      }
    }

    case 'PRIVATE_KEY_MODAL/PRIMARY_MODAL_DEACTIVATED': {
      return {
        isActive: false
      }
    }

    default:
      return state
  }
}
