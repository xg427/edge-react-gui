// @flow

import * as Constants from '../../../../../constants/indexConstants'
import type { Action } from '../../../../ReduxTypes.js'

export const initialState = false
export type State = boolean
export const addressModalVisible = (state: State = initialState, action: Action) => {
  switch (action.type) {
    case Constants.SAVE_ABC_LOBBY:
    case Constants.SET_LOBBY_ERROR:
      return false
    case 'SCAN/TOGGLE_ADDRESS_MODAL_VISIBILITY':
      return !state
    default:
      return state
  }
}
