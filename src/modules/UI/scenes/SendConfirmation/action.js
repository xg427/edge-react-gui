// @flow

import { bns } from 'biggystring'
import type { EdgeMetadata, EdgeParsedUri, EdgeTransaction, EdgeSpendInfo } from 'edge-core-js'
import { Alert } from 'react-native'
import { Actions } from 'react-native-router-flux'

import { OPEN_AB_ALERT } from '../../../../constants/indexConstants'
import { getWallet } from '../../../Core/selectors.js'
import {
  broadcastTransaction,
  getMaxSpendable,
  makeSpend,
  saveTransaction,
  signTransaction,
  getPaymentProtocolInfo,
  makeSpendInfo
} from '../../../Core/Wallets/api.js'
import type { Dispatch, GetState } from '../../../ReduxTypes'
import { openABAlert } from '../../components/ABAlert/action'
import { getSelectedWalletId } from '../../selectors.js'
import { getSpendInfo, getTransaction } from './selectors'
import type { GuiMakeSpendInfo } from './selectors'
import { getAccount } from '../../../Core/selectors.js'
import { checkPin } from '../../../Core/Account/api.js'
import { getExchangeDenomination } from '../../selectors.js'

import s from '../../../../locales/strings.js'

type EdgePaymentProtocolUri = EdgeParsedUri & { paymentProtocolURL: string }

const PREFIX = 'UI/SendConfimation/'
export const UPDATE_IS_KEYBOARD_VISIBLE = PREFIX + 'UPDATE_IS_KEYBOARD_VISIBLE'
export const UPDATE_SPEND_PENDING = PREFIX + 'UPDATE_SPEND_PENDING'
export const RESET = PREFIX + 'RESET'
export const UPDATE_PAYMENT_PROTOCOL_TRANSACTION = PREFIX + 'UPDATE_PAYMENT_PROTOCOL_TRANSACTION'
export const UPDATE_TRANSACTION = PREFIX + 'UPDATE_TRANSACTION'

export const updateAmount = (nativeAmount: string, exchangeAmount: string, fiatPerCrypto: string) => (dispatch: Dispatch, getState: GetState) => {
  const amountFiatString: string = bns.mul(exchangeAmount, fiatPerCrypto)
  const amountFiat: number = parseFloat(amountFiatString)
  const metadata: EdgeMetadata = { amountFiat }
  dispatch(createTX({ nativeAmount, metadata }, false))
}

export const paymentProtocolUriReceived = ({ paymentProtocolURL }: EdgePaymentProtocolUri) => (dispatch: Dispatch, getState: GetState) => {
  const state = getState()
  const walletId = getSelectedWalletId(state)
  const edgeWallet = getWallet(state, walletId)

  Promise.resolve(paymentProtocolURL)
    .then(paymentProtocolURL => getPaymentProtocolInfo(edgeWallet, paymentProtocolURL))
    .then(makeSpendInfo)
    .then(spendInfo => {
      dispatch(newSpendInfo(spendInfo))

      return makeSpend(edgeWallet, spendInfo).then(
        edgeTransaction => {
          dispatch(updatePaymentProtocolTransaction(edgeTransaction))
          Actions.sendConfirmation('fromScan')
        },
        error => {
          dispatch(makeSpendFailed(error))
          Actions.sendConfirmation('fromScan')
        }
      )
    })
    .catch((error: Error) => {
      console.log(error)
      setTimeout(
        () => Alert.alert(s.strings.scan_invalid_address_error_title, s.strings.scan_invalid_address_error_description, [{ text: s.strings.string_ok }]),
        500
      )
    })
}

export const createTX = (parsedUri: GuiMakeSpendInfo | EdgeParsedUri, forceUpdateGui?: boolean = true) => (dispatch: Dispatch, getState: GetState) => {
  const state = getState()
  const walletId = getSelectedWalletId(state)
  const edgeWallet = getWallet(state, walletId)
  const parsedUriClone = { ...parsedUri }
  const spendInfo = getSpendInfo(state, parsedUriClone)

  makeSpend(edgeWallet, spendInfo)
    .then(edgeTransaction => {
      dispatch(updateTransaction(edgeTransaction, parsedUriClone, forceUpdateGui, null))
    })
    .catch(e => {
      dispatch(updateTransaction(null, parsedUriClone, forceUpdateGui, e))
    })
}

export const updateMaxSpend = () => (dispatch: Dispatch, getState: GetState) => {
  const state = getState()
  const walletId = getSelectedWalletId(state)
  const edgeWallet = getWallet(state, walletId)
  const spendInfo = getSpendInfo(state)
  dispatch(newSpendInfo(spendInfo))
  dispatch(confirmSpendingLimits())

  getMaxSpendable(edgeWallet, spendInfo)
    .then(nativeAmount => {
      dispatch(createTX({ nativeAmount }, true))
    })
    .catch(e => {
      console.log(e)
    })
}

export const signBroadcastAndSave = () => async (dispatch: Dispatch, getState: GetState) => {
  dispatch(updateSpendPending(true))
  const state = getState()
  const selectedWalletId = getSelectedWalletId(state)
  const wallet = getWallet(state, selectedWalletId)
  const edgeUnsignedTransaction = getTransaction(state)
  let edgeSignedTransaction = edgeUnsignedTransaction

  try {
    edgeSignedTransaction = await signTransaction(wallet, edgeUnsignedTransaction)
    edgeSignedTransaction = await broadcastTransaction(wallet, edgeSignedTransaction)
    await saveTransaction(wallet, edgeSignedTransaction)
    dispatch(updateSpendPending(false))
    Actions.pop()
    const successInfo = {
      success: true,
      title: 'Transaction Sent',
      message: 'Your transaction has been successfully sent.'
    }
    dispatch(openABAlert(OPEN_AB_ALERT, successInfo))
  } catch (e) {
    dispatch(updateSpendPending(false))
    const errorInfo = {
      success: false,
      title: 'Transaction Failure',
      message: e.message
    }
    dispatch(updateTransaction(edgeSignedTransaction, null, true, new Error('broadcastError')))
    dispatch(openABAlert(OPEN_AB_ALERT, errorInfo))
  }
}

export const reset = () => ({
  type: RESET,
  data: {}
})

export const updatePaymentProtocolTransaction = (transaction: EdgeTransaction) => ({
  type: UPDATE_PAYMENT_PROTOCOL_TRANSACTION,
  data: { transaction }
})

export const updateTransaction = (
  transaction: ?EdgeTransaction,
  parsedUri: ?EdgeParsedUri,
  forceUpdateGui: ?boolean,
  error: ?Error,
  pinIsEnabled: boolean,
  pinAmount: number
) => ({
  type: UPDATE_TRANSACTION,
  data: { transaction, parsedUri, forceUpdateGui, error, pinIsEnabled, pinAmount }
})

export const updateSpendPending = (pending: boolean) => ({
  type: UPDATE_SPEND_PENDING,
  data: { pending }
})

export const INCORRECT_PIN = PREFIX + 'INCORRECT_PIN'
export const incorrectPin = () => ({
  type: INCORRECT_PIN,
  data: {}
})

export const MAKE_PAYMENT_PROTOCOL_TRANSACTION_FAILED = PREFIX + 'MAKE_SPEND_FAILED'
export const makeSpendFailed = (error: Error) => ({
  type: MAKE_PAYMENT_PROTOCOL_TRANSACTION_FAILED,
  data: { error }
})

export const NEW_SPEND_INFO = PREFIX + 'NEW_SPEND_INFO'
export const newSpendInfo = (spendInfo: EdgeSpendInfo) => ({
  type: NEW_SPEND_INFO,
  data: { spendInfo }
})

export const PIN_CHANGED = PREFIX + 'PIN_CHANGED'
export const pinChanged = (pin: string) => ({
  type: PIN_CHANGED,
  data: { pin }
})

export { createTX as updateMiningFees, createTX as updateParsedURI, createTX as uniqueIdentifierUpdated }

const confirmSpendingLimits = () => (dispatch: Dispatch, getState: GetState) => {
  const state = getState()
  const account = getAccount(state)
  const { convertCurrency } = getCurrencyConverter(state)
  const { isEnabled: pinIsEnabled, amount: pinAmount } = state.ui.settings.spendingLimits.transaction
  const spendInfo = state.ui.sendConfirmation.spendInfo
  const { nativeAmount, currencyCode } = spendInfo
  const isoFiatCurrencyCode = state.ui.settings.defaultIsoFiat
  const nativeToExchangeRatio = getExchangeDenomination(state, currencyCode)
  const exchangeAmount = convertNativeToExchange(nativeToExchangeRatio)(nativeAmount)
  const fiatAmount = convertCurrency(account, currencyCode, isoFiatCurrencyCode, exchangeAmount)
  const pinIsRequired = fiatAmount >= pinAmount

  return pinIsRequired
}
