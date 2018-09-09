// @flow

type ToggleSelectedWalletListModalAction = {
  type: 'TOGGLE_SELECTED_WALLET_LIST_MODAL'
}

type EnableSelectedWalletListModalAction = {
  type: 'ENABLE_SELECTED_WALLET_LIST_MODAL'
}

type DisableSelectedWalletListModalAction = {
  type: 'DISABLE_SELECTED_WALLET_LIST_MODAL'
}

type ToggleScanToWalletListModalAction = {
  type: 'TOGGLE_SCAN_TO_WALLET_LIST_MODAL'
}

type EnableScanToWalletListModalAction = {
  type: 'ENABLE_SCAN_TO_WALLET_LIST_MODAL'
}

type DisableScanToWalletListModalAction = {
  type: 'DISABLE_SCAN_TO_WALLET_LIST_MODAL'
}

type ToggleWalletListModalVisibilityAction = {
  type: 'TOGGLE_WALLET_LIST_MODAL_VISIBILITY'
}

type EnableWalletListModalVisibilityAction = {
  type: 'ENABLE_WALLET_LIST_MODAL_VISIBILITY'
}

type DisableWalletListModalVisibilityAction = {
  type: 'DISABLE_WALLET_LIST_MODAL_VISIBILITY'
}

type ToggleTransactionsWalletListModalAction = {
  type: 'TOGGLE_TRANSACTIONS_WALLET_LIST_MODAL'
}

type EnableTransactionsWalletListModalAction = {
  type: 'ENABLE_TRANSACTIONS_WALLET_LIST_MODAL'
}

type DisableTransactionsWalletListModalAction = {
  type: 'DISABLE_TRANSACTIONS_WALLET_LIST_MODAL'
}

export type WalletListModalAction =
  | ToggleSelectedWalletListModalAction
  | EnableSelectedWalletListModalAction
  | DisableSelectedWalletListModalAction
  | ToggleScanToWalletListModalAction
  | EnableScanToWalletListModalAction
  | DisableScanToWalletListModalAction
  | ToggleWalletListModalVisibilityAction
  | EnableWalletListModalVisibilityAction
  | DisableWalletListModalVisibilityAction
  | ToggleTransactionsWalletListModalAction
  | EnableTransactionsWalletListModalAction
  | DisableTransactionsWalletListModalAction
