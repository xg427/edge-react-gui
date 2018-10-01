// @flow

import type { EdgeContext } from 'edge-core-js'

export const deleteLocalAccount = (context: EdgeContext, username: string) => {
  return context.deleteLocalAccount(username)
}

export const getUsernames = (context: EdgeContext) => {
  return context.localUsers.map(localUser => localUser.username)
}

export const getExchangeSwapRate = (context: EdgeContext, sourceCurrencyCode: string, targetCurrencyCode: string) => {
  return context.getExchangeSwapRate(sourceCurrencyCode, targetCurrencyCode)
}

export const getExchangeSwapInfo = (context: EdgeContext, sourceCurrencyCode: string, targetCurrencyCode: string) => {
  return context.getExchangeSwapInfo(sourceCurrencyCode, targetCurrencyCode)
}
