// @flow

import type { EdgeCurrencyWallet, EdgeReceiveAddress } from 'edge-core-js'
import _ from 'lodash'

import type { Dispatch, GetState } from '../../ReduxTypes'
import * as SETTINGS_SELECTORS from '../../UI/Settings/selectors'
import { getReceiveAddresses } from '../../utils.js'
import * as CORE_SELECTORS from '../selectors'

export type UpdateWalletsAction = {
  type: 'CORE/WALLETS/UPDATE_WALLETS',
  data: {
    activeWalletIds: Array<string>,
    archivedWalletIds: Array<string>,
    currencyWallets: { [id: string]: EdgeCurrencyWallet },
    receiveAddresses: { [id: string]: EdgeReceiveAddress }
  }
}

export const updateWallets = (
  activeWalletIds: Array<string>,
  archivedWalletIds: Array<string>,
  currencyWallets: { [id: string]: EdgeCurrencyWallet },
  receiveAddresses: { [id: string]: EdgeReceiveAddress }
) => ({
  type: 'CORE/WALLETS/UPDATE_WALLETS',
  data: {
    activeWalletIds,
    archivedWalletIds,
    currencyWallets,
    receiveAddresses
  }
})

export const updateWalletsRequest = () => (dispatch: Dispatch, getState: GetState) => {
  const state = getState()
  const loginStatus = SETTINGS_SELECTORS.getLoginStatus(state)
  if (!loginStatus) return

  const account = CORE_SELECTORS.getAccount(state)
  const { activeWalletIds, archivedWalletIds, currencyWallets } = account

  getReceiveAddresses(currencyWallets).then(receiveAddresses => {
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
