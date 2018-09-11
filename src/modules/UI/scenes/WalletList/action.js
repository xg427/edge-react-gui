// @flow

import * as ACCOUNT_API from '../../../Core/Account/api.js'
import * as ACCOUNT_SETTINGS from '../../../Core/Account/settings.js'
import * as CORE_SELECTORS from '../../../Core/selectors.js'
import type { Dispatch, GetState } from '../../../ReduxTypes'

type UpdateActionWalletsOrderStart = {
  type: 'WALLET_LIST/UPDATE_ACTIVE_WALLETS_ORDER_START',
  data: { activeWalletIds: Array<string> }
}

type UpdateActionWalletsOrderSuccess = {
  type: 'WALLET_LIST/UPDATE_ACTIVE_WALLETS_ORDER_SUCCESS',
  data: { activeWalletIds: Array<string> }
}

type UpdateArchivedWalletsOrderStart = {
  type: 'WALLET_LIST/UPDATE_ARCHIVED_WALLETS_ORDER_START',
  data: { archivedWalletIds: Array<string> }
}

type UpdateArchivedWalletsOrderSuccess = {
  type: 'WALLET_LIST/UPDATE_ARCHIVED_WALLETS_ORDER_SUCCESS',
  data: { archivedWalletIds: Array<string> }
}

export type WalletListAction =
  | UpdateActionWalletsOrderStart
  | UpdateActionWalletsOrderSuccess
  | UpdateArchivedWalletsOrderStart
  | UpdateArchivedWalletsOrderSuccess

export const updateActiveWalletsOrder = (activeWalletIds: Array<string>) => (dispatch: Dispatch, getState: GetState) => {
  const state = getState()
  const { account } = state.core
  dispatch({ type: 'WALLET_LIST/UPDATE_ACTIVE_WALLETS_ORDER_START', data: { activeWalletIds } })
  ACCOUNT_API.updateActiveWalletsOrderRequest(account, activeWalletIds)
    .then(() => {
      dispatch({ type: 'WALLET_LIST/UPDATE_ACTIVE_WALLETS_ORDER_SUCCESS', data: { activeWalletIds } })
    })
    .catch(error => {
      console.log(error)
    })
}

export const toggleAccountBalanceVisibility = () => (dispatch: Dispatch, getState: GetState) => {
  const state = getState()
  const account = CORE_SELECTORS.getAccount(state)
  const currentAccountBalanceVisibility = state.ui.settings.isAccountBalanceVisible
  ACCOUNT_SETTINGS.setAccountBalanceVisibility(account, !currentAccountBalanceVisibility)
    .then(() => dispatch({ type: 'SETTINGS/SET_ACCOUNT_BALANCE_VISIBILITY', data: { isAccountBalanceVisible: !currentAccountBalanceVisibility } }))
    .catch(error => {
      console.error(error)
    })
}

export const toggleWalletFiatBalanceVisibility = () => (dispatch: Dispatch, getState: GetState) => {
  const state = getState()
  const account = CORE_SELECTORS.getAccount(state)
  const currentWalletFiatBalanceVisibility = state.ui.settings.isWalletFiatBalanceVisible
  ACCOUNT_SETTINGS.setWalletFiatBalanceVisibility(account, !currentWalletFiatBalanceVisibility)
    .then(() => dispatch({ type: 'SETTINGS/UPDATE_WALLET_FIAT_BALANCE_VISIBILITY', data: { isWalletFiatBalanceVisible: !currentWalletFiatBalanceVisibility } }))
    .catch(error => {
      console.error(error)
    })
}

export const updateArchivedWalletsOrder = (archivedWalletIds: Array<string>) => (dispatch: Dispatch, getState: GetState) => {
  const state = getState()
  const { account } = state.core

  dispatch({ type: 'WALLET_LIST/UPDATE_ARCHIVED_WALLETS_ORDER_START', data: { archivedWalletIds } })

  ACCOUNT_API.updateArchivedWalletsOrderRequest(account, archivedWalletIds)
    .then((archivedWalletIds: Array<string>) => {
      dispatch({ type: 'WALLET_LIST/UPDATE_ARCHIVED_WALLETS_ORDER_SUCCESS', data: { archivedWalletIds } })
    })
    .catch(error => {
      console.log(error)
    })
}
