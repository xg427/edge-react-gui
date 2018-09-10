// @flow

import * as CORE_SELECTORS from '../modules/Core/selectors'
import type { Dispatch, GetState } from '../modules/ReduxTypes'

type DisableOtpResetAction = { type: 'OTP/DISABLE_OTP_RESET' }

export type OtpAction = DisableOtpResetAction

export const enableOtp = () => async (dispatch: Dispatch, getState: GetState) => {
  const state = getState()
  const account = CORE_SELECTORS.getAccount(state)
  try {
    await account.enableOtp()
    dispatch({
      type: 'SETTINGS/UPDATE_OTP_INFO',
      data: { enabled: true, otpKey: account.otpKey }
    })
  } catch (error) {
    console.log(error)
  }
}
export const disableOtp = () => async (dispatch: Dispatch, getState: GetState) => {
  const state = getState()
  const account = CORE_SELECTORS.getAccount(state)
  try {
    await account.disableOtp()
    dispatch({
      type: 'SETTINGS/UPDATE_OTP_INFO',
      data: { enabled: false, otpKey: null, otpResetPending: false }
    })
  } catch (error) {
    console.log(error)
  }
}
export const keepOtp = () => async (dispatch: Dispatch, getState: GetState) => {
  const state = getState()
  const account = CORE_SELECTORS.getAccount(state)
  try {
    await account.cancelOtpReset()
    dispatch({ type: 'OTP/DISABLE_OTP_RESET' })
  } catch (error) {
    console.log(error)
  }
}
