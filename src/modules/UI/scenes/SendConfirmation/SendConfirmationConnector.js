// @flow

import { connect } from 'react-redux'

import { getCurrencyConverter, getExchangeRate } from '../../../Core/selectors.js'
import type { Dispatch, State } from '../../../ReduxTypes'
import { convertNativeToExchange } from '../../../utils'
import { getExchangeDenomination, getSelectedCurrencyCode, getSelectedWallet } from '../../selectors.js'
import { getDisplayDenomination, getExchangeDenomination as settingsGetExchangeDenomination } from '../../Settings/selectors.js'
import { nativeAmountChanged, reset, uniqueIdentifierChanged, newPin, signBroadcastAndSaveRequested } from './action.js'
import { SendConfirmation } from './SendConfirmation.ui'
import type { SendConfirmationDispatchProps, SendConfirmationStateProps } from './SendConfirmation.ui'
import { convertCurrency } from '../../../Core/Account/api.js'
import { getAccount } from '../../../Core/selectors.js'

const mapStateToProps = (state: State): SendConfirmationStateProps => {
  const account = getAccount(state)
  const sceneState = state.ui.scenes.sendConfirmation
  let fiatPerCrypto = 0
  let secondaryExchangeCurrencyCode = ''
  const currencyConverter = getCurrencyConverter(state)
  const guiWallet = getSelectedWallet(state)
  const currencyCode = getSelectedCurrencyCode(state)
  const balanceInCrypto = guiWallet.nativeBalances[currencyCode]

  const isoFiatCurrencyCode = guiWallet.isoFiatCurrencyCode
  const exchangeDenomination = settingsGetExchangeDenomination(state, currencyCode)
  const balanceInCryptoDisplay = convertNativeToExchange(exchangeDenomination.multiplier)(balanceInCrypto)
  const balanceInFiat = convertCurrency(account, currencyCode, isoFiatCurrencyCode, parseFloat(balanceInCryptoDisplay))

  fiatPerCrypto = getExchangeRate(state, currencyCode, isoFiatCurrencyCode)
  secondaryExchangeCurrencyCode = isoFiatCurrencyCode

  const transaction = state.ui.scenes.sendConfirmation.transaction
  const nativeAmount = sceneState.nativeAmount
  let error = state.ui.scenes.sendConfirmation.error

  let errorMsg = null
  let resetSlider = false
  if (error && error.message === 'broadcastError') {
    error = null
    resetSlider = true
  }
  errorMsg = error ? error.message : ''

  const networkFee = transaction ? transaction.networkFee : null
  const parentNetworkFee = transaction && transaction.parentNetworkFee ? transaction.parentNetworkFee : null

  const uniqueIdentifier = sceneState.spendInfo ? sceneState.spendInfo.spendTargets[0].otherParams.uniqueIdentifier : null
  const destination = sceneState.destination

  const primaryExchangeDenomination = getExchangeDenomination(state, currencyCode)

  const defaultIsoFiat = state.ui.settings.defaultIsoFiat
  const spendingLimits = state.ui.settings.spendingLimits
  const primaryExchangeAmount = convertNativeToExchange(primaryExchangeDenomination.multiplier)(nativeAmount)
  const fiatAmount = transaction ? convertCurrency(account, transaction.currencyCode, defaultIsoFiat, parseFloat(primaryExchangeAmount)) : 0
  const pinIsRequired = fiatAmount >= spendingLimits.transaction.amount
  const pin = state.ui.scenes.sendConfirmation.pin
  const pending = state.ui.scenes.sendConfirmation.pending

  const out = {
    balanceInCrypto,
    balanceInFiat,
    currencyCode,
    currencyConverter,
    destination,
    errorMsg,
    fiatCurrencyCode: guiWallet.fiatCurrencyCode,
    fiatPerCrypto,
    isEditable: sceneState.isEditable,
    nativeAmount,
    networkFee,
    parentDisplayDenomination: getDisplayDenomination(state, guiWallet.currencyCode),
    parentExchangeDenomination: getExchangeDenomination(state, guiWallet.currencyCode),
    parentNetworkFee,
    pending,
    primaryDisplayDenomination: getDisplayDenomination(state, currencyCode),
    primaryExchangeDenomination,
    publicAddress: state.ui.scenes.sendConfirmation.publicAddress,
    resetSlider,
    secondaryExchangeCurrencyCode,
    sliderDisabled: !transaction || !!error || !!pending,
    uniqueIdentifier,
    pinIsRequired,
    pin,
    spendingLimits
  }
  return out
}

const mapDispatchToProps = (dispatch: Dispatch): SendConfirmationDispatchProps => ({
  updateAmount: (nativeAmount: string) => dispatch(nativeAmountChanged(nativeAmount)),
  uniqueIdentifierUpdated: uniqueIdentifier => dispatch(uniqueIdentifierChanged(uniqueIdentifier)),
  reset: () => dispatch(reset()),
  updateSpendPending: (pending: boolean): any => {},
  signBroadcastAndSave: () => dispatch(signBroadcastAndSaveRequested()),
  onChangePin: (pin: string) => dispatch(newPin(pin))
})

export default connect(mapStateToProps, mapDispatchToProps)(SendConfirmation)
