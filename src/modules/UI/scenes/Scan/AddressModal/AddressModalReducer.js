// @flow

import type { Action } from '../../../../ReduxTypes.js'
import { TOGGLED, ACTIVATED, DEACTIVATED, HIDDEN, INPUT_CHANGED } from './AddressModalActions.js'

export const initialState = {
  isActive: false,
  input: ''
}
export type AddressModalState = {
  isActive: boolean,
  input: string
}
export const addressModal = (state: AddressModalState = initialState, action: Action) => {
  if (!action.data) return state
  switch (action.type) {
    case TOGGLED:
      return {
        ...state,
        isActive: !state.isActive
      }
    case ACTIVATED:
      return {
        ...state,
        isActive: true,
        input: action.data.input
      }
    case DEACTIVATED:
      return {
        ...state,
        isActive: false
      }
    case INPUT_CHANGED: {
      return {
        ...state,
        input: action.data.input
      }
    }
    case HIDDEN: {
      return initialState
    }
    default:
      return state
  }
}

export default addressModal
