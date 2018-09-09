// @flow

import * as actions from '../actions/indexActions'
import * as Constants from '../constants/indexConstants'
import * as CORE_SELECTORS from '../modules/Core/selectors'
import type { Dispatch, GetState } from '../modules/ReduxTypes'
export const enableOtp = () => async (dispatch: Dispatch, getState: GetState) => {
  const state = getState()
  const account = CORE_SELECTORS.getAccount(state)
  try {
    await account.enableOtp()
    dispatch({
      type: 'SETTINGS/UPDATE_OTP_INFO',
      data: { enabled: true, otpKey: account.otpKey }
    })
  } catch (e) {
    console.log(e)
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
  } catch (e) {
    console.log(e)
  }
}
export const keepOtp = () => async (dispatch: Dispatch, getState: GetState) => {
  const state = getState()
  const account = CORE_SELECTORS.getAccount(state)
  try {
    await account.cancelOtpReset()
    dispatch(actions.dispatchAction(Constants.DISABLE_OTP_RESET))
  } catch (e) {
    console.log(e)
  }
}
