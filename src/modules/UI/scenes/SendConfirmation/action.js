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
import type { Dispatch, GetState, State } from '../../../ReduxTypes'
import { openABAlert } from '../../components/ABAlert/action'
import { getSelectedWalletId } from '../../selectors.js'
import { getSpendInfo, getTransaction } from './selectors'
import type { GuiMakeSpendInfo, SpendOptions } from './selectors'
import { getAccount } from '../../../Core/selectors.js'
import { checkPin, convertCurrency } from '../../../Core/Account/api.js'
import { getExchangeDenomination } from '../../selectors.js'
import { convertNativeToExchange } from '../../../utils.js'

import s from '../../../../locales/strings.js'

type EdgePaymentProtocolUri = EdgeParsedUri & { paymentProtocolURL: string }

export const maxSpendRequested = () => (dispatch: Dispatch, getState: GetState) => {
  const state = getState()
  const walletId = getSelectedWalletId(state)
  const edgeWallet = getWallet(state, walletId)
  const spendInfo = state.ui.scenes.sendConfirmation.spendInfo
  if (!spendInfo) throw new Error('Invalid Max Spend Request')

  getMaxSpendable(edgeWallet, spendInfo).then(nativeAmount => dispatch(newNativeAmount(nativeAmount)))
}

export const paymentProtocolSpendRequested = (spendInfo: EdgeSpendInfo) => (dispatch: Dispatch, getState: GetState) => {
  dispatch(spendRequested(spendInfo, { lock: true, sign: false, broadcast: false, save: false }))
}

export const nativeAmountChanged = (nativeAmount: string) => (dispatch: Dispatch, getState: GetState) => {
  dispatch(newNativeAmount(nativeAmount))
  const state = getState()
  const spendInfo = getSpendInfo(state)
  dispatch(spendRequested(spendInfo))
}

export const networkFeesChanged = (networkFees: Object) => (dispatch: Dispatch, getState: GetState) => {
  dispatch(newNetworkFees(networkFees))
  const state = getState()
  const spendInfo = getSpendInfo(state)
  dispatch(spendRequested(spendInfo))
}

export const uniqueIdentifierChanged = (uniqueIdentifier: string) => (dispatch: Dispatch, getState: GetState) => {
  dispatch(newUniqueIdentifier(uniqueIdentifier))
  const state = getState()
  const spendInfo = getSpendInfo(state)
  dispatch(spendRequested(spendInfo))
}

export const spendRequested = (spendInfo: EdgeSpendInfo, options?: SpendOptions = { lock: false, sign: false, broadcast: false, save: false }) => (
  dispatch: Dispatch,
  getState: GetState
) => {
  const state = getState()
  const walletId = getSelectedWalletId(state)
  const edgeWallet = getWallet(state, walletId)
  const transaction = getTransaction(state)
  const pin = state.ui.scenes.sendConfirmation.pin

  Promise.resolve(spendInfo)
    .then(spendInfo => {
      const spendRequirements = getSpendRequirements(state, spendInfo)
      dispatch(newSpendRequest(spendInfo, { ...options, ...spendRequirements }))
      return options.sign ? transaction : makeSpend(edgeWallet, spendInfo)
    })
    .then(transaction => {
      dispatch(newTransaction(transaction))
      return transaction
    })
    .then(transaction => {
      if (!options.sign) return transaction

      return authorize(state, spendInfo, pin).then(isAuthorized => {
        if (!isAuthorized) throw new Error('Incorrect Pin')
        return signTransaction(edgeWallet, transaction).then(() => transaction)
      }
    })
    .then(transaction => options.broadcast ? broadcastTransaction(edgeEallet, transaction) : transaction)
    .then(transaction => options.save ? saveTransaction(edgeEallet, transaction) : transaction)
    .then(transaction => {
      if (options.sign) dispatch(spendSucceeded(transaction))
    })
    .catch(error => {
      switch (error.name) {
        case 'IncorrectPinError':
        case 'InsuffientFundsError':
        case 'DustSpendError': {
          dispatch(newError(error))
        }
        default:
          dispatch(unknownError(error))
      }
    })
}

export const spendSucceeded = (transaction: EdgeTransaction) => (dispatch: Dispatch) => {
  console.log(transaction)
  Actions.pop()
  const successInfo = {
    success: true,
    title: 'Transaction Sent',
    message: 'Your transaction has been successfully sent.'
  }
  dispatch(openABAlert(OPEN_AB_ALERT, successInfo))
}

const PREFIX = 'UI/SendConfimation/'

export const NEW_NATIVE_AMOUNT = PREFIX + 'NEW_NATIVE_AMOUNT'
export const newNativeAmount = (nativeAmount: string) => ({
  type: NEW_NATIVE_AMOUNT,
  data: { nativeAmount }
})

export const NEW_NETWORK_FEES = PREFIX + 'NEW_NETWORK_FEES'
export const newNetworkFees = ({
  customNetworkFee = {},
  networkFeeOption = 'standard'
}: {
  customNetworkFee: Object,
  networkFeeOption?: 'low' | 'standard' | 'high'
}) => ({
  type: NEW_NETWORK_FEES,
  data: { customNetworkFee, networkFeeOption }
})

export const NEW_UNIQUE_IDENTIFIER = PREFIX + 'NEW_UNIQUE_IDENTIFIER'
export const newUniqueIdentifier = (uniqueIdentifier: string) => ({
  type: NEW_UNIQUE_IDENTIFIER,
  data: { uniqueIdentifier }
})

export const NEW_TRANSACTION = PREFIX + 'NEW_TRANSACTION'
export const newTransaction = (transaction: EdgeTransaction) => ({
  type: NEW_TRANSACTION,
  data: { transaction }
})

export const NEW_SPEND_REQUEST = PREFIX + 'NEW_SPEND_REQUEST'
export const newSpendRequest = (spendInfo: EdgeSpendInfo, options: SpendOptions) => ({
  type: NEW_SPEND_REQUEST,
  data: { spendInfo, options }
})

export const NEW_PIN = PREFIX + 'NEW_PIN'
export const pin = (pin: string) => ({
  type: NEW_PIN,
  data: { pin }
})

export const NEW_ERROR = PREFIX + 'NEW_ERROR'
export const newError = (error: Error) => ({
  type: NEW_ERROR,
  data: { error }
})

export const UNKNOWN_ERROR = PREFIX + 'UNKNOWN_ERROR'
export const unknownError = (error: Error) => ({
  type: UNKNOWN_ERROR,
  data: { error }
})

export const RESET = PREFIX + 'RESET'
export const reset = () => ({
  type: RESET,
  data: {}
})

const authorize = (state, spendInfo, pin): Promise<boolean> => {
  const { isRequired, method } = getSpendRequirements(state, spendInfo)
  if (!isRequired) {
    return Promise.resolve(true)
  } else {
    const account = getAccount(state)
    if (method === 'pin') return checkPin(account, pin)
  }
  return Promise.resolve(false)
}

const authorize = (account, requirements, { pin, password }): Promise<boolean> => {
  const { isRequired, method } = getSpendRequirements(state, spendInfo)
  if (!isRequired) {
    return Promise.resolve(true)
  } else {
    const account = getAccount(state)
    if (method === 'pin') return checkPin(account, pin)
  }
  return Promise.resolve(false)
}

export type SpendRequirements = { isRequired: boolean, method: 'pin' }
export const getSpendRequirements = (state: State, spendInfo: EdgeSpendInfo): SpendRequirements => {
  const { nativeAmount, currencyCode } = spendInfo
  if (!nativeAmount || !currencyCode) throw new Error('Invalid EdgeSpendInfo')

  const account = getAccount(state)
  const { spendingLimits } = state.ui.settings

  const isoFiatCurrencyCode = state.ui.settings.defaultIsoFiat
  const nativeToExchangeRatio = getExchangeDenomination(state, currencyCode).multiplier
  const exchangeAmount = convertNativeToExchange(nativeToExchangeRatio)(nativeAmount)
  const fiatAmount = convertCurrency(account, currencyCode, isoFiatCurrencyCode, parseFloat(exchangeAmount))
  const isRequired = fiatAmount >= spendingLimits.transaction.amount
  const method = 'pin'

  return { isRequired, method }
}
