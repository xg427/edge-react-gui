// @flow

import { bns } from 'biggystring'
import { Actions } from 'react-native-router-flux'

import { RECOVER_PASSWORD as PASSWORD_RECOVERY_SCENE } from '../../../../constants/indexConstants.js'
import { setPasswordRecoveryRemindersAsync } from '../../../Core/Account/settings.js'
import type { Dispatch, GetState } from '../../../ReduxTypes.js'
import { getTotalFiatAmount } from '../../../utils.js'

type UpdatePasswordRecoveryReminderModalAction = {
  type: 'PASSWORD_RECOVERY_REMINDER_MODAL/UPDATE_PASSWORD_RECOVERY_REMINDER_MODAL',
  data: { level: string, wasShown: boolean }
}

type ShowPasswordRecoveryReminderModalAction = {
  type: 'PASSWORD_RECOVERY_REMINDER_MODAL/SHOW_PASSWORD_RECOVERY_REMINDER_MODAL'
}

type HidePasswordRecoveryReminderModalAction = {
  type: 'PASSWORD_RECOVERY_REMINDER_MODAL/HIDE_PASSWORD_RECOVERY_REMINDER_MODAL'
}

export type PasswordRecoveryReminderModalAction =
  | UpdatePasswordRecoveryReminderModalAction
  | ShowPasswordRecoveryReminderModalAction
  | HidePasswordRecoveryReminderModalAction

export const checkPasswordRecovery = () => async (dispatch: Dispatch, getState: GetState) => {
  const state = getState()
  const settings = state.ui.settings
  const account = state.core.account
  const passwordRecoveryRemindersShown = settings.passwordRecoveryRemindersShown
  const isPasswordRecoverySetup = !!account.recoveryKey
  if (isPasswordRecoverySetup) return
  const totalDollars = getTotalFiatAmount(state)
  for (const level in passwordRecoveryRemindersShown) {
    if (bns.lt(totalDollars, level)) return // if balance is not big enough to trigger then exit routine
    if (passwordRecoveryRemindersShown[level] === true) continue // if it's already been shown then go to higher level
    // now show the modal
    dispatch({ type: 'PASSWORD_REMINDER_MODAL/SHOW_PASSWORD_REMINDER_MODAL' })
    await setPasswordRecoveryRemindersAsync(account, level, true)
    dispatch({ type: 'PASSWORD_REMINDER_MODAL/UPDATE_PASSWORD_REMINDER_MODAL', data: { level, wasShown: true } })
    return
  }
}

export const onGoToPasswordRecoveryScene = () => (dispatch: Dispatch, getState: GetState) => {
  dispatch({ type: 'PASSWORD_REMINDER_MODAL/HIDE_PASSWORD_REMINDER_MODAL' })
  Actions[PASSWORD_RECOVERY_SCENE]()
}
