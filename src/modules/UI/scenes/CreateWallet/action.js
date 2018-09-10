// @flow

import { Actions } from 'react-native-router-flux'

import * as Constants from '../../../../constants/indexConstants.js'
import * as ACCOUNT_API from '../../../Core/Account/api.js'
import * as CORE_SELECTORS from '../../../Core/selectors.js'
import type { Dispatch, GetState } from '../../../ReduxTypes'
import { selectWallet } from '../../Wallets/action'

type UpdateWalletNameAction = {
  type: 'CREATE_WALLET/UPDATE_WALLET_NAME',
  data: { waleltName: string }
}

type SelectWalletFiatAction = {
  type: 'CREATE_WALLET/SELECT_WALLET_FIAT'
}

type SelectWalletTypeAction = {
  type: 'CREATE_WALLET/SELECT_WALLET_TYPE',
  data: { walletType: string }
}

type SelectFiatAction = {
  type: 'CREATE_WALLET/SELECT_FIAT',
  data: { fiat: string }
}

export type CreateWalletAction = UpdateWalletNameAction | SelectWalletFiatAction | SelectFiatAction | SelectWalletTypeAction

export const createCurrencyWallet = (
  walletName: string,
  walletType: string,
  fiatCurrencyCode: string,
  popScene: boolean = true,
  shouldSelectWallet: boolean = false
) => (dispatch: Dispatch, getState: GetState) => {
  const state = getState()
  const account = CORE_SELECTORS.getAccount(state)

  dispatch({ type: 'WALLETS/CREATE_WALLET_START' })
  // Try and get the new format param from the legacy walletType if it's mentioned
  const [type, format] = walletType.split('-')
  return ACCOUNT_API.createCurrencyWalletRequest(account, type, {
    name: walletName,
    fiatCurrencyCode,
    keyOptions: format ? { format } : {}
  }).then(edgeWallet => {
    Actions.popTo(Constants.WALLET_LIST_SCENE)
    dispatch({ type: 'WALLETS/CREATE_WALLET_SUCCESS' })
    if (shouldSelectWallet) {
      dispatch(selectWallet(edgeWallet.id, edgeWallet.currencyInfo.currencyCode))
    }
  })
}
