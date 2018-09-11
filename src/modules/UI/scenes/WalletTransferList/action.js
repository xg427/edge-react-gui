// @flow

type UpdateWalletTransferListAction = {
  type: 'WALLET_TRANSFER_LIST/UPDATE_WALLET_TRANSFER_LIST',
  data: any
}

type ToggleWalletListModalAction = {
  type: 'WALLET_TRANSFER_LIST/TOGGLE_WALLET_LIST_MODAL_VISIBILITY',
  data: any
}

export type WalletTransferListAction = UpdateWalletTransferListAction | ToggleWalletListModalAction
