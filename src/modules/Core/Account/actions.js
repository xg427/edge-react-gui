// @flow

import { type EdgeAccount } from 'edge-core-js'

import { updateExchangeRates } from '../../ExchangeRates/action.js'
import { type Dispatch, type GetState } from '../../ReduxTypes.js'
import { updateWalletsRequest } from '../Wallets/action.js'

export type LoggedInAction = {
  type: 'ACCOUNT/LOGGED_IN',
  data: { account: EdgeAccount }
}

export type LoggedOutAction = {
  type: 'LOGGED_OUT'
}

export type AccountAction = LoggedInAction | LoggedOutAction

export const addAccount = (account: EdgeAccount) => (dispatch: Dispatch, getState: GetState) => {
  account.exchangeCache.on('update', () => {
    dispatch(updateExchangeRates())
  })
  account.watch('currencyWallets', () => {
    dispatch(updateWalletsRequest())
  })

  dispatch({
    type: 'ACCOUNT/LOGGED_IN',
    data: { account }
  })
}
