// @flow

import { type EdgeReceiveAddress } from 'edge-core-js'

import * as CORE_SELECTORS from '../../../Core/selectors.js'
import * as WALLET_API from '../../../Core/Wallets/api.js'
import type { Dispatch, GetState } from '../../../ReduxTypes.js'
import * as UI_SELECTORS from '../../../UI/selectors.js'

type UpdateReceiveAddressStartAction = {
  type: 'REQUEST/UPDATE_RECEIVE_ADDRESS_START'
}

type UpdateReceiveAddressSuccessAction = {
  type: 'REQUEST/UPDATE_RECEIVE_ADDRESS_SUCCESS',
  data: { receiveAddress: EdgeReceiveAddress }
}

type UpdateReceiveAddressErrorAction = {
  type: 'REQUEST/UPDATE_RECEIVE_ADDRESS_ERROR',
  data: { error: Error }
}

type UpdateInputCurrencySelectedAction = {
  type: 'REQUEST/UPDATE_INPUT_CURRENCY_SELECTED',
  data: { inputCurrencySelected: string }
}

type UpdateAmountRequestedInCryptoAction = {
  type: 'REQUEST/UPDATE_AMOUNT_REQUESTED_IN_CRYPTO',
  data: { amountRequestedInCrypto: number }
}

type UpdateAmountReceivedInCryptoAction = {
  type: 'REQUEST/UPDATE_AMOUNT_RECEIVED_IN_CRYPTO',
  data: { amountReceivedInCrypto: number }
}

type UpdateAmountRequestedInFiatAction = {
  type: 'REQUEST/UPDATE_AMOUNT_REQUESTED_IN_FIAT',
  data: { amountRequestedInFiat: number }
}

export type RequestAction =
  | UpdateReceiveAddressStartAction
  | UpdateReceiveAddressSuccessAction
  | UpdateReceiveAddressErrorAction
  | UpdateInputCurrencySelectedAction
  | UpdateAmountRequestedInCryptoAction
  | UpdateAmountReceivedInCryptoAction
  | UpdateAmountRequestedInFiatAction

export const updateReceiveAddress = (walletId: string, currencyCode: string) => (dispatch: Dispatch, getState: GetState) => {
  const state = getState()
  const wallet = CORE_SELECTORS.getWallet(state, walletId)

  const onSuccess = receiveAddress => {
    dispatch({ type: 'REQUEST/UPDATE_RECEIVE_ADDRESS_SUCCESS', data: { receiveAddress } })
  }
  const onError = error => {
    dispatch({ type: 'REQUEST/UPDATE_RECEIVE_ADDRESS_ERROR', data: { error } })
  }

  WALLET_API.getReceiveAddress(wallet, currencyCode)
    .then(onSuccess)
    .catch(onError)
}

export const saveReceiveAddress = (receiveAddress: Object) => (dispatch: Dispatch, getState: GetState) => {
  const state = getState()
  const selectedWalletId = UI_SELECTORS.getSelectedWalletId(state)
  const selectedCurrencyCode = UI_SELECTORS.getSelectedCurrencyCode(state)
  const wallet = CORE_SELECTORS.getWallet(state, selectedWalletId)

  const onSuccess = () => {
    dispatch(updateReceiveAddress(selectedWalletId, selectedCurrencyCode))
  }
  const onError = e => {
    console.log(e)
  }

  wallet
    .saveReceiveAddress(receiveAddress)
    .then(onSuccess)
    .catch(onError)
}
