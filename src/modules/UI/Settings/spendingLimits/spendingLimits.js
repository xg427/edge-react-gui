// @flow

import { combineReducers } from 'redux'
import { pathOr } from 'ramda'
import type { Action } from '../../../ReduxTypes.js'

// ACTIONS
import { ACCOUNT_INIT_COMPLETE } from '../../../../constants/indexConstants.js'

export const PREFIX = 'SPENDING_LIMITS/'

export const NEW_SPENDING_LIMITS = PREFIX + 'NEW_SPENDING_LIMITS'
export const newSpendingLimits = (spendingLimits: SpendingLimits) => ({
  type: NEW_SPENDING_LIMITS,
  data: { spendingLimits }
})

// REDUCERS
export const initialState = {
  transaction: {
    isEnabled: false,
    amount: 0
  }
}

export type SpendingLimits = {
  transaction: {
    isEnabled: boolean,
    amount: number
  }
}

export const isEnabled = (state: boolean = true, action: Action) => {
  switch (action.type) {
    case ACCOUNT_INIT_COMPLETE: {
      return pathOr(state, ['spendingLimits', 'transaction', 'isEnabled'], action)
    }
    case NEW_SPENDING_LIMITS: {
      return action.data.spendingLimits.transaction.isEnabled || state
    }
    default:
      return state
  }
}

export const amount = (state: number = 100, action: Action) => {
  switch (action.type) {
    case ACCOUNT_INIT_COMPLETE: {
      return pathOr(state, ['spendingLimits', 'transaction', 'amount'], action)
    }
    case NEW_SPENDING_LIMITS: {
      return action.data.spendingLimits.transaction.amount || state
    }
    default:
      return state
  }
}

export const transaction = combineReducers({
  isEnabled,
  amount
})

export const spendingLimits = combineReducers({
  transaction
})
