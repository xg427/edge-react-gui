// @flow

import type { Action } from '../../../../ReduxTypes.js'
import * as ACTION from '../action'

export const initialState = false
export type State = boolean
export const addressModalVisible = (state: State = initialState, action: Action) => {
  switch (action.type) {
    case 'saveEdgeLobby':
    case 'setLobbyError': {
      return false
    }

    case ACTION.TOGGLE_ADDRESS_MODAL_VISIBILITY:
      return !state
    default:
      return state
  }
}
