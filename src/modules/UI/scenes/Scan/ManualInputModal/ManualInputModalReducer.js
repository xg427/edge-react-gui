// @flow

import type { Action } from '../../../../ReduxTypes.js'
import { TOGGLED, ACTIVATED, DEACTIVATED } from './ManualInputModalActions.js'

export const initialState = {
  isActive: false
}
export type ManualInputModalState = {
  isActive: boolean
}
export const manualInputModal = (state: ManualInputModalState = initialState, action: Action) => {
  switch (action.type) {
    case TOGGLED:
      return {
        ...state,
        isActive: !state.isActive
      }
    case ACTIVATED:
      return {
        ...state,
        isActive: true
      }
    case DEACTIVATED:
      return {
        ...state,
        isActive: false
      }
    default:
      return state
  }
}

export default manualInputModal
