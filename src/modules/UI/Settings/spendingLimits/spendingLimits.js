// @flow

import { combineReducers } from 'redux'
import { pathOr } from 'ramda'

// ACTIONS
import { ACCOUNT_INIT_COMPLETE } from '../../../../constants/indexConstants.js'

export const PREFIX = 'SPENDING_LIMITS/'

export const UPDATE = PREFIX + 'UPDATE'
export const update = (spendingLimits: SpendingLimits) => ({
  type: UPDATE,
  data: { spendingLimits }
})

// REDUCERS
export const initialState = {
  transaction: {
    isEnabled: true,
    amount: 100
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
      const result = pathOr(state, ['spendingLimits', 'transaction', 'isEnabled'], action)
      return result
    }
    case UPDATE: {
      const result = pathOr(state, ['data', 'spendingLimits', 'transaction', 'isEnabled'], action)
      return result
    }
    default:
      return state
  }
}

export const amount = (state: number = 100, action: Action) => {
  switch (action.type) {
    case ACCOUNT_INIT_COMPLETE: {
      const result = pathOr(state, ['spendingLimits', 'transaction', 'amount'], action)
      return result
    }
    case UPDATE: {
      const result = pathOr(state, ['data', 'spendingLimits', 'transaction', 'amount'], action)
      return result
    }
    default:
      return state
  }
}

export const transaction = (state, action) => ({
  isEnabled: isEnabled(state.isEnabled, action),
  amount: amount(state.amount, action)
})

export const spendingLimits = (state, action) => ({
  transaction: transaction(state.transaction, action)
})
