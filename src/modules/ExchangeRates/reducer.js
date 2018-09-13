// @flow

import type { Action } from '../ReduxTypes'
import * as ACTION from './action.js'

const initialState = 0

type ExchangeRateState = ?number
const exchangeRatesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION.UPDATE_EXCHANGE_RATES:
      return state + 1
    default:
      return state
  }
}

export const exchangeRates = (state: ExchangeRateState, action: Action) => {
  if (action.type === 'LOGOUT' || action.type === 'deepLinkReceived') {
    state = undefined
  }

  return exchangeRatesReducer(state, action)
}
