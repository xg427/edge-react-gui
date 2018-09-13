// @flow

import { Alert } from 'react-native'

import s from '../../../../locales/strings.js'
import * as ACCOUNT_API from '../../../Core/Account/api.js'
import * as SETTINGS_API from '../../../Core/Account/settings.js'
import type { Dispatch, GetState } from '../../../ReduxTypes.js'

export const CHECK_PASSWORD_START = 'PasswordReminderModal/CHECK_PASSWORD_START'
export const checkPasswordStart = () => ({
  type: CHECK_PASSWORD_START
})

export const CHECK_PASSWORD = 'PasswordReminderModal/CHECK_PASSWORD'
export const checkPassword = (password: string) => (dispatch: Dispatch, getState: GetState) => {
  const state = getState()
  const account = state.core.account

  dispatch(checkPasswordStart())
  ACCOUNT_API.checkPassword(account, password).then(isValidPassword => {
    if (isValidPassword) {
      dispatch(checkPasswordSuccess())
      setTimeout(() => Alert.alert(s.strings.password_reminder_verified, s.strings.password_reminder_great_job), 500)
    } else {
      dispatch(checkPasswordFail())
    }
  })
}

export const CHECK_PASSWORD_SUCCESS = 'PasswordReminderModal/CHECK_PASSWORD_SUCCESS'
export const checkPasswordSuccess = () => ({
  type: CHECK_PASSWORD_SUCCESS
})

export const CHECK_PASSWORD_FAIL = 'PasswordReminderModal/CHECK_PASSWORD_FAIL'
export const checkPasswordFail = () => ({
  type: CHECK_PASSWORD_FAIL
})

export const REQUEST_CHANGE_PASSWORD = 'PasswordReminderModal/REQUEST_CHANGE_PASSWORD'
export const requestChangePassword = () => ({
  type: REQUEST_CHANGE_PASSWORD
})

export const PASSWORD_REMINDER_POSTPONED = 'PasswordReminderModal/PASSWORD_REMINDER_POSTPONED'
export const postponePasswordReminder = () => ({
  type: PASSWORD_REMINDER_POSTPONED
})

// Loading data from account local folder
export const SET_PASSWORD_REMINDER_START = 'PasswordReminderModal/SET_PASSWORD_REMINDER_START'
export const setPasswordReminderStart = () => ({
  type: SET_PASSWORD_REMINDER_START
})

export const SET_PASSWORD_REMINDER_SUCCESS = 'PasswordReminderModal/SET_PASSWORD_REMINDER_SUCCESS'
export const setPasswordReminderSuccess = () => ({
  type: SET_PASSWORD_REMINDER_SUCCESS
})

export const SET_PASSWORD_REMINDER_FAIL = 'PasswordReminderModal/SET_PASSWORD_REMINDER_FAIL'
export const setPasswordReminderFail = () => ({
  type: SET_PASSWORD_REMINDER_FAIL
})

// Saving data to account local folder
export const SET_PASSWORD_REMINDER = 'PasswordReminderModal/SET_PASSWORD_REMINDER'
export const setPasswordReminder = (passwordReminder: Object) => (dispatch: Dispatch, getState: GetState) => {
  const state = getState()
  const account = state.core.account
  dispatch(setPasswordReminderStart())
  SETTINGS_API.setPasswordReminderRequest(account, passwordReminder).then(
    () => {
      dispatch(setPasswordReminderSuccess())
    },
    () => {
      dispatch(setPasswordReminderFail())
    }
  )
}
