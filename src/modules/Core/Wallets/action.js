// @flow

import { type EdgeCurrencyWallet, type EdgeReceiveAddress, type EdgeTransaction } from 'edge-core-js'
import _ from 'lodash'

import { type Dispatch, type GetState } from '../../ReduxTypes'
import * as SETTINGS_SELECTORS from '../../UI/Settings/selectors'
import * as CORE_SELECTORS from '../selectors'

import { checkPasswordRecovery } from '../../UI/components/PasswordRecoveryReminderModal/PasswordRecoveryReminderModalActions.js'
import { newTransactionsRequest, refreshTransactionsRequest } from '../../UI/scenes/TransactionList/action.js'
import { refreshReceiveAddressRequest, refreshWallet, updateWalletLoadingProgress } from '../../UI/Wallets/action.js'
import { isReceivedTransaction, getReceiveAddresses } from '../../utils.js'

export type UpdateWalletsAction = {
  type: 'CORE/WALLETS/UPDATE_WALLETS',
  data: {
    activeWalletIds: Array<string>,
    archivedWalletIds: Array<string>,
    currencyWallets: { [id: string]: EdgeCurrencyWallet },
    receiveAddresses: { [id: string]: EdgeReceiveAddress }
  }
}

export const updateWalletsRequest = () => (dispatch: Dispatch, getState: GetState) => {
  const state = getState()
  const loginStatus = SETTINGS_SELECTORS.getLoginStatus(state)
  if (!loginStatus) return

  const account = CORE_SELECTORS.getAccount(state)
  const { activeWalletIds, archivedWalletIds, currencyWallets } = account

  for (const walletId: string of Object.keys(currencyWallets)) {
    const edgeWallet: EdgeCurrencyWallet = currencyWallets[walletId]
    if (edgeWallet.type === 'wallet:ethereum') {
      if (state.ui.wallets && state.ui.wallets.byId && state.ui.wallets.byId[walletId]) {
        const enabledTokens = state.ui.wallets.byId[walletId].enabledTokens
        const customTokens = state.ui.settings.customTokens
        const enabledNotHiddenTokens = enabledTokens.filter(token => {
          let isVisible = true // assume we will enable token
          const tokenIndex = _.findIndex(customTokens, item => item.currencyCode === token)
          // if token is not supposed to be visible, not point in enabling it
          if (tokenIndex > -1 && customTokens[tokenIndex].isVisible === false) isVisible = false
          return isVisible
        })
        edgeWallet.enableTokens(enabledNotHiddenTokens)
      }
    }
  }

  // $FlowExpectedError
  Object.values(currencyWallets).forEach((wallet: EdgeCurrencyWallet) => {
    const loadedWalletsIds = state.ui.wallets.activeWalletIds
    if (loadedWalletsIds.includes(wallet.id)) return

    subscribeToWallet(dispatch, wallet)
  })

  getReceiveAddresses(currencyWallets).then(receiveAddresses => {
    dispatch({
      type: 'CORE/WALLETS/UPDATE_WALLETS',
      data: {
        activeWalletIds,
        archivedWalletIds,
        currencyWallets,
        receiveAddresses
      }
    })
  })
}

export const subscribeToWallet = (dispatch: Dispatch, wallet: EdgeCurrencyWallet) => {
  wallet.on('newTransactions', () => (transactions: Array<EdgeTransaction>) => {
    console.log(`${wallet.id} - onNewTransactions: ${transactions.length}`)
    dispatch(refreshReceiveAddressRequest(wallet.id))
    dispatch(newTransactionsRequest(wallet.id, transactions))
    dispatch(refreshWallet(wallet.id))
    // now check if password recovery is set up
    const finalTxIndex = transactions.length - 1
    if (isReceivedTransaction(transactions[finalTxIndex])) {
      dispatch(checkPasswordRecovery())
    }
  })

  wallet.on('transactionsChanged', (transactions: Array<EdgeTransaction>) => {
    console.log(`${wallet.id} - onTransactionsChanged: ${transactions.length}`)
    dispatch(refreshReceiveAddressRequest(wallet.id))
    dispatch(refreshTransactionsRequest(wallet.id, transactions))
    dispatch(refreshWallet(wallet.id))
  })

  wallet.watch('syncRatio', (syncRatio: number) => {
    console.log(`${wallet.id} - onSyncRatioChanged: ${syncRatio}`)
    if (syncRatio > 0) {
      dispatch(updateWalletLoadingProgress(wallet.id, syncRatio))
    }
  })

  wallet.watch('balances', (balances: { [currencyCode: string]: string }) => {
    console.log(`${wallet.id} - onBalanceChanged: ${JSON.stringify(balances)}`)
    dispatch(refreshWallet(wallet.id))
  })

  wallet.watch('blockHeight', (blockHeight: number) => {
    console.log(`${wallet.id} - onBlockHeightChanged:${blockHeight}`)
    dispatch(refreshWallet(wallet.id))
  })

  wallet.watch('name', (name: string | null) => {
    console.log(`${wallet.id} - onNameChanged:${name || ''}`)
    dispatch(refreshWallet(wallet.id))
  })
}
