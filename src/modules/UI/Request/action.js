// @flow

type UpdateAmountRequestedInCryptoAction = {
  type: 'REQUEST/UPDATE_AMOUNT_REQUESTED_IN_CRYPTO',
  data: { amountSatoshi: number }
}

type UpdateAmountRequestedInFiatAction = {
  type: 'REQUEST/UPDATE_AMOUNT_REQUESTED_IN_FIAT',
  data: { amountFiat: number }
}

export type RequestAction = UpdateAmountRequestedInCryptoAction | UpdateAmountRequestedInFiatAction
