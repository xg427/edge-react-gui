// @flow

import type { Action } from '../../../../ReduxTypes.js'
import { ADDRESS_MODAL_TOGGLED, ADDRESS_MODAL_ACTIVATED, ADDRESS_MODAL_DEACTIVATED, ADDRESS_MODAL_HIDDEN, ADDRESS_MODAL_INPUT_CHANGED } from '../scanActions.js'

export const initialState = {
  isActive: false,
  input: ''
}
export type AddressModalState = {
  isActive: boolean,
  input: string
}
export const addressModal = (state: AddressModalState = initialState, action: Action) => {
  switch (action.type) {
    case ADDRESS_MODAL_TOGGLED:
      return {
        ...state,
        isActive: !state.isActive
      }
    case ADDRESS_MODAL_ACTIVATED:
      return {
        ...state,
        isActive: true
      }
    case ADDRESS_MODAL_DEACTIVATED:
      return {
        ...state,
        isActive: false
      }
    case ADDRESS_MODAL_INPUT_CHANGED: {
      return {
        ...state,
        input: action.data.input
      }
    }
    case ADDRESS_MODAL_HIDDEN: {
      return initialState
    }
    default:
      return state
  }
}
