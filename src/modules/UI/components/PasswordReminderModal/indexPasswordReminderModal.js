// @flow

import { checkPassword, setPasswordReminder } from './actions.js'
import { PasswordReminderModal } from './PasswordReminderModal.ui.js'
import { passwordReminderModalConnector } from './passwordReminderModalConnector.js'
import { INVALID, IS_CHECKING, VERIFIED, initialState, passwordReminderModalReducer } from './passwordReminderModalReducer.js'
import type { PasswordReminderModalState } from './passwordReminderModalReducer.js'

export {
  initialState,
  checkPassword,
  passwordReminderModalConnector,
  PasswordReminderModal,
  passwordReminderModalReducer,
  setPasswordReminder,
  IS_CHECKING,
  VERIFIED,
  INVALID
}

export type { PasswordReminderModalState }
