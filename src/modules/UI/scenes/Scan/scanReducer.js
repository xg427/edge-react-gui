// @flow

import { combineReducers } from 'redux'

import * as WALLET_LIST_MODAL_ACTION from '../../components/WalletListModal/action.js'

import { addressModal } from './AddressModal/AddressModalReducer.js'
import { legacyAddressModal } from './LegacyAddressModal/LegacyAddressModalReducer.js'
import { camera } from './Camera/CameraReducer.js'
// import { InvalidUriModalReducer as invalidUriModal } from './InvalidUriModal/InvalidUriModalReducer.js'

const selectedWalletListModalVisibility = (state = false, action) => {
  switch (action.type) {
    case WALLET_LIST_MODAL_ACTION.TOGGLE_SELECTED_WALLET_LIST_MODAL:
      return !state
    case WALLET_LIST_MODAL_ACTION.TOGGLE_SCAN_TO_WALLET_LIST_MODAL:
      return false
    case WALLET_LIST_MODAL_ACTION.TOGGLE_TRANSACTIONS_WALLET_LIST_MODAL:
      return false
    case WALLET_LIST_MODAL_ACTION.DISABLE_WALLET_LIST_MODAL_VISIBILITY:
      return false
    default:
      return state
  }
}

const scanToWalletListModalVisibility = (state = false, action) => {
  switch (action.type) {
    case WALLET_LIST_MODAL_ACTION.TOGGLE_SCAN_TO_WALLET_LIST_MODAL:
      return !state
    case WALLET_LIST_MODAL_ACTION.TOGGLE_SCAN_FROM_WALLET_LIST_MODAL:
      return false
    case WALLET_LIST_MODAL_ACTION.TOGGLE_SELECTED_WALLET_LIST_MODAL:
      return false
    case WALLET_LIST_MODAL_ACTION.DISABLE_WALLET_LIST_MODAL_VISIBILITY:
      return false
    default:
      return state
  }
}

export const scan = combineReducers({
  addressModal,
  legacyAddressModal,
  // invalidUriModal,
  camera,
  selectedWalletListModalVisibility,
  scanToWalletListModalVisibility
})

export default scan
