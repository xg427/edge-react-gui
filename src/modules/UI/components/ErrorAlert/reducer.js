// @flow

import { combineReducers } from 'redux'

const displayAlert = (state = false, action = {}) => {
  const { type } = action
  switch (type) {
    case 'ERROR_ALERT/DISPLAY_ERROR_ALERT':
      return true
    case 'ERROR_ALERT/DISMISS_ERROR_ALERT':
      return false
    default:
      return state
  }
}

const message = (state = '', action = {}) => {
  const { type, data = {} } = action
  switch (type) {
    case 'ERROR_ALERT/DISPLAY_ERROR_ALERT':
      return data.message
    case 'ERROR_ALERT/DISMISS_ERROR_ALERT':
      return ''
    default:
      return state
  }
}

export const errorAlert = combineReducers({
  displayAlert,
  message
})

export default errorAlert
