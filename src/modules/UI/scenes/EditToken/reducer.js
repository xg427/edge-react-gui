// @flow

import { combineReducers } from 'redux'

import type { Action } from '../../../ReduxTypes.js'

export const deleteTokenModalVisible = (state: boolean = false, action: Action) => {
  switch (action.type) {
    case 'EDIT_TOKEN/SHOW_DELETE_TOKEN_MODAL': {
      return true
    }

    case 'EDIT_TOKEN/HIDE_DELETE_TOKEN_MODAL': {
      return false
    }

    case 'WALLETS/DELETE_CUSTOM_TOKEN_SUCCESS': {
      return false
    }

    default:
      return state
  }
}

export const deleteCustomTokenProcessing = (state: boolean = false, action: Action) => {
  switch (action.type) {
    case 'WALLETS/DELETE_CUSTOM_TOKEN_START':
      return true
    case 'WALLETS/DELETE_CUSTOM_TOKEN_SUCCESS':
      return false
    case 'WALLETS/DELETE_CUSTOM_TOKEN_FAILURE':
      return false
    default:
      return state
  }
}

export const editCustomTokenProcessing = (state: boolean = false, action: Action) => {
  switch (action.type) {
    case 'WALLETS/EDIT_CUSTOM_TOKEN_START':
      return true
    case 'WALLETS/EDIT_CUSTOM_TOKEN_SUCCESS':
      return false
    case 'WALLETS/EDIT_CUSTOM_TOKEN_FAILURE':
      return false
    case 'WALLETS/ADD_NEW_TOKEN_THEN_DELETE_OLD_SUCCESS':
      return false
    case 'WALLETS/OVERWRITE_THEN_DELETE_TOKEN_SUCCESS':
      return false
    case 'WALLETS/UPDATE_EXISTING_TOKEN_SUCCESS':
      return false
    default:
      return state
  }
}

export const editToken = combineReducers({
  deleteTokenModalVisible,
  deleteCustomTokenProcessing,
  editCustomTokenProcessing
})

export default editToken
