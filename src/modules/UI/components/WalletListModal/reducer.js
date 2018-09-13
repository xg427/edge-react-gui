// @flow

import { combineReducers } from 'redux'

import { UPDATE_CURRENT_SCENE_KEY } from '../../scenes/action.js'
import { CLOSE_ALL_WALLET_LIST_MODALS } from '../../Wallets/action.js'
import * as ACTION from './action'

const walletListModalVisible = (state = false, action) => {
  switch (action.type) {
    case ACTION.TOGGLE_WALLET_LIST_MODAL_VISIBILITY:
      return !state
    case ACTION.ENABLE_WALLET_LIST_MODAL_VISIBILITY:
      return true
    case ACTION.DISABLE_WALLET_LIST_MODAL_VISIBILITY:
      return false
    case ACTION.TOGGLE_SELECTED_WALLET_LIST_MODAL:
      return false
    case ACTION.TOGGLE_TRANSACTIONS_WALLET_LIST_MODAL:
      return false
    case CLOSE_ALL_WALLET_LIST_MODALS:
      return false

    case 'openWalletSelectorModal': {
      return true
    }

    case 'selectToWalletCryptoExchange': {
      return false
    }

    case 'selectFromWalletCryptoExchange': {
      return false
    }

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
