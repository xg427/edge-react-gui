// @flow

import { Alert } from 'react-native'

import s from '../../../../locales/strings.js'
import * as ACCOUNT_API from '../../../Core/Account/api.js'
import * as SETTINGS_API from '../../../Core/Account/settings.js'
import type { Dispatch, GetState } from '../../../ReduxTypes.js'

type CheckPasswordStartAction = {
  type: 'PASSWORD_REMINDER_MODAL/CHECK_PASSWORD_START'
}
type CheckPasswordSuccessAction = {
  type: 'PASSWORD_REMINDER_MODAL/CHECK_PASSWORD_SUCCESS'
}

type CheckPasswordFailAction = {
  type: 'PASSWORD_REMINDER_MODAL/CHECK_PASSWORD_FAIL'
}

type RequestChangePasswordAction = {
  type: 'PASSWORD_REMINDER_MODAL/REQUEST_CHANGE_PASSWORD'
}

type PasswprdReminderPostponedAction = {
  type: 'PASSWORD_REMINDER_MODAL/PASSWORD_REMINDER_POSTPONED'
}

// Loading data from account local folder
type SetPasswprdReminderStartAction = {
  type: 'PASSWORD_REMINDER_MODAL/SET_PASSWORD_REMINDER_START'
}

type SetPasswprdReminderSuccessAction = {
  type: 'PASSWORD_REMINDER_MODAL/SET_PASSWORD_REMINDER_SUCCESS'
}

type SetPasswprdReminderFailAction = {
  type: 'PASSWORD_REMINDER_MODAL/SET_PASSWORD_REMINDER_FAIL'
}

export type PasswordReminderModalAction =
  | CheckPasswordStartAction
  | CheckPasswordSuccessAction
  | CheckPasswordFailAction
  | SetPasswprdReminderStartAction
  | SetPasswprdReminderSuccessAction
  | SetPasswprdReminderFailAction
  | RequestChangePasswordAction
  | PasswprdReminderPostponedAction

export const checkPassword = (password: string) => (dispatch: Dispatch, getState: GetState) => {
  const state = getState()
  const account = state.core.account

  dispatch({ type: 'PASSWORD_REMINDER_MODAL/CHECK_PASSWORD_START' })
  ACCOUNT_API.checkPassword(account, password).then(isValidPassword => {
    if (isValidPassword) {
      dispatch({ type: 'PASSWORD_REMINDER_MODAL/CHECK_PASSWORD_SUCCESS' })
      setTimeout(() => Alert.alert(s.strings.password_reminder_verified, s.strings.password_reminder_great_job), 500)
    } else {
      dispatch({ type: 'PASSWORD_REMINDER_MODAL/CHECK_PASSWORD_FAIL' })
    }
  })
}

// Saving data to account local folder
export const setPasswordReminder = (passwordReminder: Object) => (dispatch: Dispatch, getState: GetState) => {
  const state = getState()
  const account = state.core.account
  dispatch({ type: 'PASSWORD_REMINDER_MODAL/SET_PASSWORD_REMINDER_START' })
  SETTINGS_API.setPasswordReminderRequest(account, passwordReminder).then(
    () => {
      dispatch({ type: 'PASSWORD_REMINDER_MODAL/SET_PASSWORD_REMINDER_SUCCESS' })
    },
    () => {
      dispatch({ type: 'PASSWORD_REMINDER_MODAL/SET_PASSWORD_REMINDER_FAIL' })
    }
  )
}
