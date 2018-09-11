// @flow

import type { EdgeAccount } from 'edge-core-js'
import { disableTouchId, enableTouchId } from 'edge-login-ui-rn'
import { Actions } from 'react-native-router-flux'

import type { Dispatch, GetState } from '../../../../../src/modules/ReduxTypes.js'
import * as actions from '../../../../actions/indexActions.js'
import * as Constants from '../../../../constants/indexConstants.js'
import s from '../../../../locales/strings.js'
import { convertCurrency, restoreWalletsRequest } from '../../../Core/Account/api.js'
import * as ACCOUNT_SETTINGS from '../../../Core/Account/settings.js'
import * as CORE_SELECTORS from '../../../Core/selectors'

type SetDefaultFiatStartAction = {
  type: 'SET_DEFAULT_FIAT_START',
  data: { defaultFiat: string }
}

type SetBluetoothModeStartAction = {
  type: 'SET_BLUETOOTH_MODE_START',
  data: { bluetoothMode: boolean }
}

type SetBitcoinOverrideServerStartAction = {
  type: 'SET_BITCOIN_OVERRIDE_SERVER_START',
  data: { overrideServer: string }
}

export type SettingsAction = SetDefaultFiatStartAction | SetBluetoothModeStartAction | SetBitcoinOverrideServerStartAction

export const setAutoLogoutTimeInMinutesRequest = (autoLogoutTimeInMinutes: number) => {
  const autoLogoutTimeInSeconds = autoLogoutTimeInMinutes * 60
  return setAutoLogoutTimeInSecondsRequest(autoLogoutTimeInSeconds)
}

export const setAutoLogoutTimeInSecondsRequest = (autoLogoutTimeInSeconds: number) => (dispatch: Dispatch, getState: GetState) => {
  const state = getState()
  const account = CORE_SELECTORS.getAccount(state)
  ACCOUNT_SETTINGS.setAutoLogoutTimeInSecondsRequest(account, autoLogoutTimeInSeconds)
    .then(() => dispatch({ type: 'SETTINGS/SET_AUTOLOGOUT_TIME_IN_SECONDS', data: { autoLogoutTimeInSeconds } }))
    .catch(error => {
      console.error(error)
    })
}

export const setDefaultFiatRequest = (defaultFiat: string) => (dispatch: Dispatch, getState: GetState) => {
  dispatch({ type: 'SetDefaultFiatStart', data: { defaultFiat } })

  const state = getState()
  const account = CORE_SELECTORS.getAccount(state)

  // PSEUDO_CODE
  // get spendingLimits
  const spendingLimits = state.ui.settings.spendingLimits
  const { transaction } = spendingLimits
  const previousDefaultIsoFiat = state.ui.settings.defaultIsoFiat

  Promise.resolve()
    .then(() => {
      // update default fiat in account settings
      ACCOUNT_SETTINGS.setDefaultFiatRequest(account, defaultFiat)
    })
    .then(() => {
      // update default fiat in settings
      dispatch({ type: 'SETTINGS/SET_DEFAULT_FIAT', data: { defaultFiat } })

      const nextDefaultIsoFiat = getState().ui.settings.defaultIsoFiat
      // convert from previous fiat to next fiat
      return convertCurrency(account, previousDefaultIsoFiat, nextDefaultIsoFiat, transaction.amount)
    })
    .then(transactionAmount => {
      const nextSpendingLimits = {
        transaction: {
          ...transaction,
          amount: parseFloat(transactionAmount.toFixed(2))
        }
      }

      // update spending limits in account settings
      ACCOUNT_SETTINGS.setSpendingLimits(account, nextSpendingLimits)
      // update spending limits in settings
      dispatch({ type: 'SPENDING_LIMITS/NEW_SPENDING_LIMITS', data: { nextSpendingLimits } })
    })
    .catch(e => console.log(e))
}

export const checkCurrentPassword = (arg: string) => async (dispatch: Dispatch, getState: GetState) => {
  const clearPasswordError = { confirmPasswordError: '' }
  dispatch(actions.dispatchActionObject(Constants.SET_CONFIRM_PASSWORD_ERROR, clearPasswordError))
  const state = getState()
  const account = CORE_SELECTORS.getAccount(state)
  const isPassword = await account.checkPassword(arg)
  dispatch({ type: 'SETTINGS/SET_SETTINGS_LOCK', data: !isPassword })
  if (!isPassword) {
    dispatch(actions.dispatchActionObject(Constants.SET_CONFIRM_PASSWORD_ERROR, { confirmPasswordError: s.strings.fragmet_invalid_password }))
  }
}

export const lockSettings = () => async (dispatch: Dispatch) => {
  dispatch({ type: 'SETTINGS/SET_SETTINGS_LOCK', data: true })
}

// Denominations
export const setDenominationKeyRequest = (currencyCode: string, denominationKey: string) => (dispatch: Dispatch, getState: GetState) => {
  const state = getState()
  const account = CORE_SELECTORS.getAccount(state)
  const onSuccess = () => dispatch({ type: 'SETTINGS/SET_DENOMINATION_KEY', data: { currencyCode, denominationKey } })
  const onError = e => console.log(e)

  return ACCOUNT_SETTINGS.setDenominationKeyRequest(account, currencyCode, denominationKey)
    .then(onSuccess)
    .catch(onError)
}

export const setBitcoinOverrideServerRequest = (overrideServer: string) => (dispatch: Dispatch) => {
  dispatch({ type: 'SetBitcoinOverrideServerStart', data: { overrideServer } })

  dispatch({ type: 'SETTINGS/SET_BITCOIN_OVERRIDE_SERVER', data: overrideServer })
}

// touch id interaction
export const updateTouchIdEnabled = (arg: boolean, account: EdgeAccount) => async (dispatch: Dispatch, getState: GetState) => {
  const folder = CORE_SELECTORS.getFolder(getState())
  // dispatch the update for the new state for
  dispatch({ type: 'SETTINGS/UPDATE_TOUCH_ID_ENABLED', data: arg })
  if (arg) {
    enableTouchId(folder, account)
  } else {
    disableTouchId(folder, account)
  }
}

export const restoreWallets = () => (dispatch: Dispatch, getState: GetState) => {
  const state = getState()
  const account = state.core.account
  restoreWalletsRequest(account).then(Actions.walletList)
}

export function togglePinLoginEnabled (pinLoginEnabled: boolean) {
  return (dispatch: Dispatch, getState: GetState) => {
    const state = getState()
    const context = CORE_SELECTORS.getContext(state)
    const account = CORE_SELECTORS.getAccount(state)

    dispatch({ type: 'SETTINGS/TOGGLE_PIN_LOGIN_ENABLED', data: pinLoginEnabled })
    return account.changePin({ enableLogin: pinLoginEnabled }).catch(async error => {
      const pinLoginEnabled = await context.pinLoginEnabled(account.username)

      // TODO: Make a proper error action so we can avoid the double dispatch:
      dispatch({ type: 'SETTINGS/TOGGLE_PIN_LOGIN_ENABLED', data: pinLoginEnabled })
      console.log(error)
      dispatch({ type: 'ERROR_ALERT/DISPLAY_ERROR_ALERT', data: { message: error.message } })
    })
  }
}
