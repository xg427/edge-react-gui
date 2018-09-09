// @flow

import { combineReducers } from 'redux'

import type { Action } from '../../../ReduxTypes'

export const isVisible = (state: boolean = false, action: Action) => {
  switch (action.type) {
    case 'PASSWORD_RECOVERY_REMINDER_MODAL/SHOW_PASSWORD_RECOVERY_REMINDER_MODAL':
      return true
    case 'PASSWORD_RECOVERY_REMINDER_MODAL/HIDE_PASSWORD_RECOVERY_REMINDER_MODAL':
      return false
    default:
      return state
  }
}

export const passwordRecoveryReminderModal = combineReducers({
  isVisible
})
