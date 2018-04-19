// @flow

import type { Action } from '../../../../ReduxTypes.js'

export type LegacyAddressModal = {
  isActive: boolean
}
export const initialState = {
  isActive: false
}
export const legacyAddressModal = (state: LegacyAddressModalState = initialState, action: Action) => {
  return state
}
