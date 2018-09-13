// @flow

import type { EdgeTransaction } from 'edge-core-js'

export const DISPLAY_TRANSACTION_ALERT = 'UI/components/TransactionAlert/DISPLAY_TRANSACTION_ALERT'
export const DISMISS_TRANSACTION_ALERT = 'UI/components/TransactionAlert/DISMISS_TRANSACTION_ALERT'

export const displayTransactionAlert = (edgeTransaction: EdgeTransaction) => ({
  type: DISPLAY_TRANSACTION_ALERT,
  data: { edgeTransaction }
})

export const dismissTransactionAlert = () => ({
  type: DISMISS_TRANSACTION_ALERT,
  data: { edgeTransaction: '' }
})
