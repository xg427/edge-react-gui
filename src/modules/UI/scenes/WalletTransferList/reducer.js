// @flow

import { combineReducers } from 'redux'

const walletTransferList = (state = [], action) => {
  switch (action.type) {
    case 'WALLET_TRANSFER_LIST/UPDATE_WALLET_TRANSFER_LIST':
      return action.data
    default:
      return state
  }
}

const walletListModalVisible = (state = false, action) => {
  switch (action.type) {
    case 'WALLET_TRANSFER_LIST/TOGGLE_WALLET_LIST_MODAL_VISIBILITY':
      return !state
    default:
      return state
  }
}

export const walletTransferListReducer = combineReducers({
  walletTransferList,
  walletListModalVisible
})

export default walletTransferListReducer
