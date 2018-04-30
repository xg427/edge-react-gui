// @flow

import type { Action } from '../../../../../ReduxTypes.js'
import { ACTIVATED, DEACTIVATED } from './SecondaryModalActions.js'

export const initialState = { isVisible: false }
export type State = { isVisible: boolean }
export const secondaryModal = (state: State = initialState, action: Action) => {
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
