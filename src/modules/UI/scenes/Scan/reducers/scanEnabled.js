// @flow

import type { Action } from '../../../../ReduxTypes.js'

export const initialState = false
export type State = boolean
export const scanEnabled = (state: State = initialState, action: Action) => {
  switch (action.type) {
    case 'SCAN/ENABLE_SCAN': {
      return true
    }

    case 'PRIVATE_KEY_MODAL/PRIMARY_MODAL_DEACTIVATED': {
      return true
    }

    case 'SCAN/DISABLE_SCAN': {
      return false
    }

    default:
      return state
  }
}
