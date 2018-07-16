// @flow

import { connect } from 'react-redux'

import { getCurrencyConverter, getExchangeRate } from '../../../Core/selectors.js'
import type { Dispatch, State } from '../../../ReduxTypes'
import { convertNativeToExchange } from '../../../utils'
import { getExchangeDenomination, getSelectedCurrencyCode, getSelectedWallet } from '../../selectors.js'
import { getDisplayDenomination, getExchangeDenomination as settingsGetExchangeDenomination } from '../../Settings/selectors.js'
import { reset, signBroadcastAndSave, updateAmount, updateSpendPending, uniqueIdentifierUpdated } from './action.js'
import { getError, getForceUpdateGuiCounter, getKeyboardIsVisible, getPending, getPublicAddress, getTransaction } from './selectors'
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

  const transaction = getTransaction(state)
  const pending = getPending(state)
  const nativeAmount = sceneState.nativeAmount
  let error = getError(state)

  let errorMsg = null
  let resetSlider = false
  if (error && error.message === 'broadcastError') {
    error = null
    resetSlider = true
  }
  errorMsg = error ? error.message : ''

  const networkFee = transaction ? transaction.networkFee : null
  const parentNetworkFee = transaction && transaction.parentNetworkFee ? transaction.parentNetworkFee : null

  const uniqueIdentifier = sceneState.parsedUri.uniqueIdentifier
  const destination = sceneState.destination

  const primaryExchangeDenomination = getExchangeDenomination(state, currencyCode)

  const defaultIsoFiat = state.ui.settings.defaultIsoFiat
  const spendingLimits = state.ui.settings.spendingLimits
  const primaryExchangeAmount = convertNativeToExchange(primaryExchangeDenomination.multiplier)(nativeAmount)
  const fiatAmount = convertCurrency(account, transaction.currencyCode, defaultIsoFiat, parseFloat(primaryExchangeAmount))
  const pinIsRequired = fiatAmount >= spendingLimits.transaction.amount

  const out = {
    balanceInCrypto,
    balanceInFiat,
    currencyCode,
    currencyConverter,
    destination,
    errorMsg,
    fiatCurrencyCode: guiWallet.fiatCurrencyCode,
    fiatPerCrypto,
    forceUpdateGuiCounter: getForceUpdateGuiCounter(state),
    isEditable: sceneState.isEditable,
    keyboardIsVisible: getKeyboardIsVisible(state),
    nativeAmount,
    networkFee,
    parentDisplayDenomination: getDisplayDenomination(state, guiWallet.currencyCode),
    parentExchangeDenomination: getExchangeDenomination(state, guiWallet.currencyCode),
    parentNetworkFee,
    pending,
    primaryDisplayDenomination: getDisplayDenomination(state, currencyCode),
    primaryExchangeDenomination,
    publicAddress: getPublicAddress(state),
    resetSlider,
    secondaryExchangeCurrencyCode,
    sliderDisabled: !transaction || !!error || !!pending,
    uniqueIdentifier,
    pinIsRequired: false,
    spendingLimits
  }
  return out
}

const mapDispatchToProps = (dispatch: Dispatch): SendConfirmationDispatchProps => ({
  updateAmount: (nativeAmount: string, exchangeAmount: string, fiatPerCrypto: string) => {
    return dispatch(updateAmount(nativeAmount, exchangeAmount, fiatPerCrypto))
  },
  uniqueIdentifierUpdated: uniqueIdentifier => dispatch(uniqueIdentifierUpdated({ uniqueIdentifier })),
  reset: () => dispatch(reset()),
  updateSpendPending: (pending: boolean): any => dispatch(updateSpendPending(pending)),
  signBroadcastAndSave: (): any => dispatch(signBroadcastAndSave())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SendConfirmation)
