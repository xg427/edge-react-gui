// @flow

type ActionType =
  | 'CLOSE_DELETE_WALLET_MODAL'
  | 'CLOSE_GETSEED_WALLET_MODAL'
  | 'CLOSE_RENAME_WALLET_MODAL'
  | 'CLOSE_RESYNC_WALLET_MODAL'
  | 'CLOSE_SPLIT_WALLET_MODAL'
  | 'CLOSE_VIEW_XPUB_WALLET_MODAL'
  | 'LOCK_WALLET_SEED'
  | 'OPEN_DELETE_WALLET_MODAL'
  | 'OPEN_GETSEED_WALLET_MODAL'
  | 'OPEN_RENAME_WALLET_MODAL'
  | 'OPEN_RESYNC_WALLET_MODAL'
  | 'OPEN_SPLIT_WALLET_MODAL'
  | 'OPEN_VIEW_XPUB_WALLET_MODAL'
  | 'UNLOCK_WALLET_SEED'
  | 'selectFromWalletCryptoExchange'
  | 'selectToWalletCryptoExchange'
  | 'swapFromToCryptoWallets'
  | 'openWalletSelectorModal'
  | 'updateCryptoExchangeRate'
  | 'updateCryptoReverseExchangeRate'
  | 'updateCryptoExchangeInfo'
  | 'updateCryptoReverseExchangeInfo'
  | 'updateShiftTransactionFee'
  | 'invalidateShiftTransaction'
  | 'shiftCryptoCurrency'
  | 'shiftComplete'
  | 'shiftError'
  | 'openCryptoExecConfModal'
  | 'closeCryptoExecConfModal'
  | 'startMakeSpendCrypto'
  | 'doneMakeSpendCrypto'
  | 'setCryptoExchangeAmounts'
  | 'receivedTRansactionError'
  | 'receivedInsufficentFundsError'
  | 'genericShapeShiftError'
  | 'CHANGE_EXCHANGE_FEE'
  | 'onAvailableShapeShiftTokens'
  | 'START_SHIFT_TRANSACTION'
  | 'DONE_SHIFT_TRANSACTION'
  | string

type LegacyAction = {
  type: ActionType,
  data?: any
}

export type Action = LegacyAction
