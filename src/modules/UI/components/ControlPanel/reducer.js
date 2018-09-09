// @flow

import { combineReducers } from 'redux'

const usersView = (state = false, action) => {
  switch (action.type) {
    case 'CONTROL_PANEL/OPEN_SELECT_USER':
      return true
    case 'CONTROL_PANEL/CLOSE_SELECT_USER':
      return false
    default:
      return state
  }
}

export const controlPanel = combineReducers({
  usersView
})

export default controlPanel
