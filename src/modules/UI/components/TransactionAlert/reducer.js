// @flow

import type { EdgeTransaction } from 'edge-core-js'
import { combineReducers } from 'redux'

import type { Action } from '../../../ReduxTypes.js'

const displayAlert = (state: boolean = false, action: Action) => {
  const { type } = action
  switch (type) {
    case 'TRANSACTION_ALERT/DISPLAY_TRANSACTION_ALERT':
      return true
    case 'TRANSACTION_ALERT/DISMISS_TRANSACTION_ALERT':
      return false
    default:
      return state
  }
}

type EdgeTransactionState = EdgeTransaction | ''

const edgeTransaction = (state: EdgeTransactionState = '', action: Action) => {
  switch (action.type) {
    case 'TRANSACTION_ALERT/DISPLAY_TRANSACTION_ALERT':
      if (action.data) {
        return action.data.edgeTransaction
      }
      return state
    case 'TRANSACTION_ALERT/DISMISS_TRANSACTION_ALERT':
      return ''
    default:
      return state
  }
}

export const transactionAlert = combineReducers({
  displayAlert,
  edgeTransaction
})

export default transactionAlert
