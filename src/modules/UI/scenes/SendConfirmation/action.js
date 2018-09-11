// @flow

import { bns } from 'biggystring'
import type { EdgeMetadata, EdgeParsedUri, EdgeSpendInfo, EdgeTransaction } from 'edge-core-js'
import { Alert } from 'react-native'
import { Actions } from 'react-native-router-flux'

import { SEND_CONFIRMATION } from '../../../../constants/indexConstants'
import s from '../../../../locales/strings.js'
import { checkPin } from '../../../Core/Account/api.js'
import { getAccount, getWallet } from '../../../Core/selectors.js'
import {
  broadcastTransaction,
  getMaxSpendable,
  getPaymentProtocolInfo,
  makeSpend,
  makeSpendInfo,
  saveTransaction,
  signTransaction
} from '../../../Core/Wallets/api.js'
import type { Dispatch, GetState } from '../../../ReduxTypes'
import { getSelectedWalletId } from '../../selectors.js'
import { getAuthRequired, getSpendInfo, getTransaction } from './selectors'
import type { AuthType, GuiMakeSpendInfo } from './selectors'

type EdgePaymentProtocolUri = EdgeParsedUri & { paymentProtocolURL: string }

type UpdateIsKeyboardVisibleAction = {
  type: 'SEND_CONFIRMATION/UPDATE_IS_KEYBOARD_VISIBLE'
}

type UpdateSpendPendingAction = {
  type: 'SEND_CONFIRMATION/UPDATE_SPEND_PENDING',
  data: { pending: boolean }
}

type UpdatePaymentProtocolTransactionAction = {
  type: 'SEND_CONFIRMATION/UPDATE_PAYMENT_PROTOCOL_TRANSACTION',
  data: { transaction: EdgeTransaction }
}

type MakePaymentProtocolTransactionFailedAction = {
  type: 'SEND_CONFIRMATION/MAKE_PAYMENT_PROTOCOL_TRANSACTION_FAILED',
  data: { error: Error }
}

type UpdateTransactionAction = {
  type: 'SEND_CONFIRMATION/UPDATE_TRANSACTION',
  data: { transaction: ?EdgeTransaction, parsedUri: EdgeParsedUri, forceUpdateGui: ?boolean, error: ?Error }
}

type MakeSpendFailedAction = {
  type: 'SEND_CONFIRMATION/MAKE_SPEND_FAILED',
  data: { error: Error | null }
}

type NewSpendInfoAction = {
  type: 'SEND_CONFIRMATION/NEW_SPEND_INFO',
  data: { spendInfo: EdgeSpendInfo, authRequired: AuthType }
}

type ResetAction = {
  type: 'SEND_CONFIRMATION/RESET'
}

type NewPinAction = {
  type: 'SEND_CONFIRMATION/NEW_PIN',
  data: { pin: string }
}

export type SendConfirmationAction =
  | UpdateIsKeyboardVisibleAction
  | UpdateSpendPendingAction
  | UpdatePaymentProtocolTransactionAction
  | MakePaymentProtocolTransactionFailedAction
  | UpdateTransactionAction
  | MakeSpendFailedAction
  | NewSpendInfoAction
  | ResetAction
  | NewPinAction

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
      const authRequired = getAuthRequired(state, spendInfo)
      dispatch({ type: 'SEND_CONFIRMATION/NEW_SPEND_INFO', data: { spendInfo, authRequired } })

      return makeSpend(edgeWallet, spendInfo).then(
        edgeTransaction => {
          dispatch({ type: 'SEND_CONFIRMATION/UPDATE_PAYMENT_PROTOCOL_TRANSACTION/', data: { edgeTransaction } })
          Actions[SEND_CONFIRMATION]('fromScan')
        },
        error => {
          dispatch({ type: 'SEND_CONFIRMATION/MAKE_SPEND_FAILED', data: { error } })
          Actions[SEND_CONFIRMATION]('fromScan')
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

  const authRequired = getAuthRequired(state, spendInfo)
  dispatch({ type: 'SEND_CONFIRMATION/NEW_SPEND_INFO', data: { spendInfo, authRequired } })

  makeSpend(edgeWallet, spendInfo)
    .then(edgeTransaction =>
      dispatch({
        type: 'SEND_CONFIRMATION/UPDATE_TRANSACTION',
        data: {
          transaction: edgeTransaction,
          parsedUri: parsedUriClone,
          forceUpdateGui,
          error: null
        }
      })
    )
    .catch(error =>
      dispatch({
        type: 'SEND_CONFIRMATION/UPDATE_TRANSACTION',
        data: {
          transaction: null,
          parsedUri: parsedUriClone,
          forceUpdateGui,
          error
        }
      })
    )
}

export const updateMaxSpend = () => (dispatch: Dispatch, getState: GetState) => {
  const state = getState()
  const walletId = getSelectedWalletId(state)
  const edgeWallet = getWallet(state, walletId)
  const spendInfo = getSpendInfo(state)

  getMaxSpendable(edgeWallet, spendInfo)
    .then(nativeAmount => {
      const state = getState()
      const spendInfo = getSpendInfo(state, { nativeAmount })
      const authRequired = getAuthRequired(state, spendInfo)

      dispatch({ type: 'SEND_CONFIRMATION/RESET' })

      dispatch({ type: 'SEND_CONFIRMATION/NEW_SPEND_INFO', data: { spendInfo, authRequired } })
      dispatch(createTX({ nativeAmount }, true))
    })
    .catch(e => console.log(e))
}

export const signBroadcastAndSave = () => async (dispatch: Dispatch, getState: GetState) => {
  const state = getState()
  const account = getAccount(state)
  const selectedWalletId = getSelectedWalletId(state)
  const wallet = getWallet(state, selectedWalletId)
  const edgeUnsignedTransaction = getTransaction(state)
  const spendInfo = state.ui.scenes.sendConfirmation.spendInfo
  if (!spendInfo) throw new Error('Invalid Spend Request')
  const authRequired = getAuthRequired(state, spendInfo)
  const pin = state.ui.scenes.sendConfirmation.pin

  dispatch({ type: 'SEND_CONFIRMATION/UPDATE_SPEND_PENDING', data: { pending: true } })

  let edgeSignedTransaction = edgeUnsignedTransaction
  try {
    if (authRequired === 'pin') {
      const isAuthorized = await checkPin(account, pin)
      if (!isAuthorized) throw new IncorrectPinError()
    }

    edgeSignedTransaction = await signTransaction(wallet, edgeUnsignedTransaction)
    edgeSignedTransaction = await broadcastTransaction(wallet, edgeSignedTransaction)
    await saveTransaction(wallet, edgeSignedTransaction)
    dispatch({ type: 'SEND_CONFIRMATION/UPDATE_SPEND_PENDING', data: { pending: false } })
    Actions.pop()
    const successInfo = {
      success: true,
      title: 'Transaction Sent',
      message: 'Your transaction has been successfully sent.'
    }
    dispatch({
      type: 'AB_ALERT/OPEN_AB_ALERT',
      data: successInfo
    })
  } catch (e) {
    dispatch({ type: 'SEND_CONFIRMATION/UPDATE_SPEND_PENDING', data: { pending: false } })
    const errorInfo = {
      success: false,
      title: 'Transaction Failure',
      message: e.message
    }
    dispatch({
      type: 'SEND_CONFIRMATION/UPDATE_TRANSACTION',
      data: {
        transaction: edgeSignedTransaction,
        parsedUri: null,
        forceUpdateGui: true,
        error: new Error('broadcastError')
      }
    })
    dispatch({
      type: 'AB_ALERT/OPEN_AB_ALERT',
      data: errorInfo
    })
  }
}

const errorNames = {
  IncorrectPinError: 'IncorrectPinError'
}
export function IncorrectPinError (message: ?string = 'Incorrect Pin') {
  const error = new Error(message)
  error.name = errorNames.IncorrectPinError
  return error
}

export { createTX as updateMiningFees, createTX as updateParsedURI, createTX as uniqueIdentifierUpdated }
