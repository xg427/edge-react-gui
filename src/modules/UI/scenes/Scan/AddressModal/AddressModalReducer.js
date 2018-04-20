// @flow

import type { Action } from '../../../../ReduxTypes.js'
import { TOGGLED, ACTIVATED, DEACTIVATED } from './AddressModalActions.js'

export const initialState = {
  isActive: false
}
export type AddressModalState = {
  isActive: boolean
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
    default:
      return state
  }
}

export default addressModal
