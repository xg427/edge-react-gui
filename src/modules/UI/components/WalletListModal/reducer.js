// @flow

import { combineReducers } from 'redux'

import { OPEN_WALLET_SELECTOR_MODAL, SELECT_FROM_WALLET_CRYPTO_EXCHANGE, SELECT_TO_WALLET_CRYPTO_EXCHANGE } from '../../../../constants/indexConstants'
import { UPDATE_CURRENT_SCENE_KEY } from '../../scenes/action.js'

const walletListModalVisible = (state = false, action) => {
  switch (action.type) {
    case 'WALLET_LIST_MODAL/TOGGLE_WALLET_LIST_MODAL_VISIBILITY':
      return !state
    case 'WALLET_LIST_MODAL/ENABLE_WALLET_LIST_MODAL_VISIBILITY':
      return true
    case 'WALLET_LIST_MODAL/DISABLE_WALLET_LIST_MODAL_VISIBILITY':
      return false
    case 'WALLET_LIST_MODAL/TOGGLE_SELECTED_WALLET_LIST_MODAL':
      return false
    case 'WALLET_LIST_MODAL/TOGGLE_TRANSACTIONS_WALLET_LIST_MODAL':
      return false
    case 'WALLETS/CLOSE_ALL_WALLET_LIST_MODALS':
      return false
    case OPEN_WALLET_SELECTOR_MODAL:
      return true
    case SELECT_TO_WALLET_CRYPTO_EXCHANGE:
      return false
    case SELECT_FROM_WALLET_CRYPTO_EXCHANGE:
      return false
    case UPDATE_CURRENT_SCENE_KEY:
      return false
    default:
      return state
  }
}

export const walletListModal = combineReducers({
  walletListModalVisible
})

export default walletListModal
