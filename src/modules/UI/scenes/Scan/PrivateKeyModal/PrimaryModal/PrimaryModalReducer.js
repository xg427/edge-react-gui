// @flow

import type { Action } from '../../../../../ReduxTypes.js'
import { ACTIVATED, DEACTIVATED } from './PrimaryModalActions.js'

export const initialState = { isVisible: false }
export type State = { isVisible: boolean }
export const primaryModal = (state: State = initialState, action: Action) => {
  switch (action.type) {
    case ACTIVATED: {
      return {
        isVisible: true
      }
    }
    case DEACTIVATED: {
      return {
        isVisible: false
      }
    }
    default:
      return state
  }
}
