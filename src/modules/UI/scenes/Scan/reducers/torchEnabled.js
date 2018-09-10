// @flow

import type { Action } from '../../../../ReduxTypes.js'

export const initialState = false
export type State = boolean
export const torchEnabled = (state: State = initialState, action: Action) => {
  switch (action.type) {
    case 'SCAN/TOGGLE_ENABLE_TORCH':
      return !state
    default:
      return state
  }
}
