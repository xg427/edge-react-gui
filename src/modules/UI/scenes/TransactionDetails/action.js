// @flow

import type { EdgeMetadata } from 'edge-core-js'
import { Actions } from 'react-native-router-flux'

import * as ACCOUNT_SETTINGS from '../../../Core/Account/settings.js'
import * as WALLET_API from '../../../Core/Wallets/api.js'
import type { Dispatch, GetState, State } from '../../../ReduxTypes'

type SetSubcategoriesAction = {
  type: 'TRANSACTION_DETAILS/SET_TRANSACTION_SUBCATEGORIES',
  data: { subcategories: Array<string> }
}

export type TransactionDetailsAction = SetSubcategoriesAction

export const setTransactionDetails = (txid: string, currencyCode: string, edgeMetadata: EdgeMetadata) => (dispatch: Dispatch, getState: GetState) => {
  const state = getState()
  const wallet = getSelectedWallet(state)
  const onSuccess = () => {
    Actions.pop()
  }
  const onError = () => {}
  WALLET_API.setTransactionDetailsRequest(wallet, txid, currencyCode, edgeMetadata)
    .then(onSuccess)
    .catch(onError)
}

export const getSubcategories = () => (dispatch: Dispatch, getState: GetState) => {
  const { account } = getState().core
  ACCOUNT_SETTINGS.getSyncedSubcategories(account).then(subcategories => {
    return dispatch({ type: 'TRANSACTION_DETAILS/SET_SUBCATEGORIES', data: { subcategories } })
  })
}

export const setNewSubcategory = (newSubcategory: string) => (dispatch: Dispatch, getState: GetState) => {
  const state = getState()
  const { account } = state.core
  const oldSubcats = state.ui.scenes.transactionDetails.subcategories
  const newSubcategories = [...oldSubcats, newSubcategory]
  return ACCOUNT_SETTINGS.setSubcategoriesRequest(account, { categories: newSubcategories.sort() })
    .then(() => {
      dispatch({ type: 'TRANSACTION_DETAILS/SET_SUBCATEGORIES', data: { subcategories: newSubcategories.sort() } })
    })
    .catch(error => {
      console.error(error)
    })
}

export const getSelectedWallet = (state: State) => {
  const { selectedWalletId } = state.ui.wallets
  const selectedWallet = state.core.wallets.byId[selectedWalletId]
  return selectedWallet
}
