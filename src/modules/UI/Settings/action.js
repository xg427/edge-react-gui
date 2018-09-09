// @flow

import type { EdgeCurrencyPlugin } from 'edge-core-js'

import type { CustomTokenInfo, GuiTouchIdInfo } from '../../../types.js'

type UpdateSettingsAction = {
  type: 'SETTINGS/UPDATE_SETTINGS',
  data: { settings: Object }
}

type LoadSettingsAction = {
  type: 'SETTINGS/LOAD_SETTINGS',
  data: { settings: Object }
}

type SetPINModeAction = {
  type: 'SETTINGS/SET_PIN_MODE',
  data: { pinMode: boolean }
}

type SetPINAction = {
  type: 'SETTINGS/SET_PIN',
  data: { pin: number }
}

type SetOTPModeAction = {
  type: 'SETTINGS/SET_OTP_MODE',
  data: { otpMode: boolean }
}

type SetOTPAction = {
  type: 'SETTINGS/SET_OTP',
  data: { otp: string }
}

type SetAutoLogoutTimeInSecondsAction = {
  type: 'SETTINGS/SET_AUTO_LOGOUT_TIME',
  data: { autoLogoutTimeInSeconds: number }
}

type SetDefaultFiatAction = {
  type: 'SETTINGS/SET_DEFAULT_FIAT',
  data: { defaultFiat: string }
}

type TogglePinLoginEnabledAction = {
  type: 'SETTINGS/TOGGLE_PIN_LOGIN_ENABLED',
  data: { pinLoginEnabled: boolean }
}

type SetMerchantModeAction = {
  type: 'SETTINGS/SET_MERCHANT_MODE',
  data: { merchantMode: boolean }
}

type SetBluetoothModeAction = {
  type: 'SETTINGS/SET_BLUETOOTH_MODE',
  data: { bluetoothMode: boolean }
}
// settings lock
type SetSettingsLockAction = {
  type: 'SETTINGS/SET_SETTINGS_LOCK',
  data: boolean
}
// BTC Settings
type SetBitcoinOverrideServerAction = {
  type: 'SETTINGS/SET_BITCOIN_OVERRIDE_SERVER',
  data: { overrideServer: string }
}

// Denomination
type SetDenominationKeyAction = {
  type: 'SETTINGS/SET_DENOMINATION_KEY',
  data: { currencyCode: string, denominationKey: string }
}

// Plugins
type AddCurrencyPluginAction = {
  type: 'SETTINGS/ADD_CURRENCY_PLUGIN',
  data: { pluginName: string, plugin: EdgeCurrencyPlugin, walletTypes: Array<string> }
}

// tokens

type SetCustomTokensAction = {
  type: 'SETTINGS/SET_CUSTOM_TOKENS',
  data: { customTokens: Array<CustomTokenInfo> }
}

// touch id settings
type AddTouchIdInfoAction = {
  type: 'SETTINGS/TOUCH_ID_SETTINGS',
  data: GuiTouchIdInfo
}

type UpdateTouchIdEnabledAction = {
  type: 'SETTINGS/CHANGE_TOUCH_ID_SETTINGS',
  data: { isTouchEnabled: boolean }
}

type UpdateOtpInfoAction = {
  // {enabled}
  type: 'SETTINGS/OTP_SETTINGS',
  data: Object
}

type SetAccountBalanceVisibilityAction = {
  type: 'SETTINGS/SET_ACCOUNT_BALANCE_VISIBILITY',
  data: { isAccountBalanceVisible: boolean }
}

type UpdateWalletFiatBalanceVisibilityAction = {
  type: 'SETTINGS/UPDATE_WALLET_FIAT_BALANCE_VISIBILITY',
  data: { isWalletFiatBalanceVisible: boolean }
}

export type SettingsAction =
  | AddCurrencyPluginAction
  | AddTouchIdInfoAction
  | LoadSettingsAction
  | SetAccountBalanceVisibilityAction
  | SetAutoLogoutTimeInSecondsAction
  | SetBitcoinOverrideServerAction
  | SetBluetoothModeAction
  | SetCustomTokensAction
  | SetDefaultFiatAction
  | SetDenominationKeyAction
  | SetMerchantModeAction
  | SetOTPAction
  | SetOTPModeAction
  | SetPINAction
  | SetPINModeAction
  | SetSettingsLockAction
  | TogglePinLoginEnabledAction
  | UpdateOtpInfoAction
  | UpdateSettingsAction
  | UpdateTouchIdEnabledAction
  | UpdateWalletFiatBalanceVisibilityAction
