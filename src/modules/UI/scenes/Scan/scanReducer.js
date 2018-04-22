// @flow

import { combineReducers } from 'redux'
import type { EdgeParsedUri } from 'edge-core-js'

import type { Action } from '../../../ReduxTypes.js'

import * as WALLET_LIST_MODAL_ACTION from '../../components/WalletListModal/action.js'

import { manualInputModal } from './ManualInputModal/ManualInputModalReducer.js'
import { legacyAddressModal } from './LegacyAddressModal/LegacyAddressModalReducer.js'
import { walletSelectorModal } from './WalletSelectorModal/WalletSelectorModalReducer.js'
import { camera } from './Camera/CameraReducer.js'
// import { InvalidUriModalReducer as invalidUriModal } from './InvalidUriModal/InvalidUriModalReducer.js'
import { INPUT_CHANGED, INPUT_RESET, PARSE_URI_SUCCEEDED, PARSE_URI_FAILED } from './scanActions.js'

export const selectedWalletListModalVisibility = (state = false, action: Action) => {
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

export const scanToWalletListModalVisibility = (state = false, action: Action) => {
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

export const initialInputState = ''
export type InputState = string
export const input = (state: InputState = initialInputState, action: Action) => {
  switch (action.type) {
    case INPUT_CHANGED: {
      // $FlowExpectedError
      return action.data.input
    }
    case INPUT_RESET: {
      return initialInputState
    }
    default:
      return state
  }
}

export const initialUriState = null
export type UriState = EdgeParsedUri | null
export const uri = (state: UriState = initialUriState, action: Action) => {
  if (!action.data) return state
  switch (action.type) {
    case PARSE_URI_SUCCEEDED: {
      return action.data.parsedUri
    }
    case PARSE_URI_FAILED: {
      return initialUriState
    }
    default:
      return state
  }
}

export const scan = combineReducers({
  manualInputModal,
  legacyAddressModal,
  // invalidUriModal,
  camera,
  selectedWalletListModalVisibility,
  scanToWalletListModalVisibility,
  input,
  uri,
  walletSelectorModal
})

export default scan
